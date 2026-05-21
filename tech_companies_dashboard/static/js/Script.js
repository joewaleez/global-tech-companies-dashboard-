let roots = [];

const COLORS = ["#00e5ff","#ff6b35","#7c3aed","#00ff9d","#ffd600","#ff4081","#69f0ae","#40c4ff","#ea80fc","#ffab40"];

fetch('/data').then(r => r.json()).then(fullData => {
    const years = [...new Set(fullData.map(d => d.Year))].sort();
    const sel = document.getElementById('yearSelect');
    years.forEach(y => { let o = document.createElement('option'); o.value = y; o.text = y; sel.add(o); });
    updateCharts(fullData, 'all');
    sel.onchange = () => updateCharts(fullData, sel.value);
});

function updateCharts(fullData, year) {
    roots.forEach(r => r.dispose()); roots = [];
    let data = year === 'all' ? averageData(fullData) : fullData.filter(d => d.Year == year);
    createRevenueBar(data);
    createEmployeesBar(data);
    createRndBar(data);
    createMarketCapPie(data);
}

function averageData(fullData) {
    const avg = {};
    fullData.forEach(r => {
        const c = r.Company;
        if (!avg[c]) avg[c] = {Company:c, Revenue_M:0, Employees:0, RnD_Spending_M:0, Market_Cap_M:0, Products:0, count:0};
        avg[c].Revenue_M += r.Revenue_M; avg[c].Employees += r.Employees;
        avg[c].RnD_Spending_M += r.RnD_Spending_M; avg[c].Market_Cap_M += r.Market_Cap_M;
        avg[c].Products += r.Products; avg[c].count++;
    });
    return Object.values(avg).map(g => ({
        Company: g.Company,
        Revenue_M: Math.round(g.Revenue_M / g.count),
        Employees: Math.round(g.Employees / g.count),
        RnD_Spending_M: Math.round(g.RnD_Spending_M / g.count),
        Market_Cap_M: Math.round(g.Market_Cap_M / g.count),
        Products: Math.round(g.Products / g.count)
    }));
}

function makeRoot(id) {
    let root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();
    roots.push(root);
    return root;
}

function darkAxis(renderer) {
    renderer.grid.template.setAll({ stroke: am5.color("#1e1e2e"), strokeWidth: 1 });
    renderer.labels.template.setAll({ fill: am5.color("#6b6b80"), fontSize: 10, fontFamily: "'Space Mono', monospace" });
}

// ✅ FIX: assign color per data item using colorField instead of adapter
function addColorField(data) {
    return data.map((d, i) => ({ ...d, columnSettings: { fill: am5.color(COLORS[i % COLORS.length]), stroke: am5.color(COLORS[i % COLORS.length]) } }));
}

function createBarChart(id, data, valueField, tooltipText) {
    let root = makeRoot(id);
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingLeft: 0
    }));

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 20 });
    darkAxis(xRenderer);
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Company",
        renderer: xRenderer
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    darkAxis(yRenderer);
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: yRenderer
    }));

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: valueField,
        categoryXField: "Company",
        tooltip: am5.Tooltip.new(root, { labelText: tooltipText })
    }));

    series.columns.template.setAll({
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        strokeOpacity: 0,
        templateField: "columnSettings"   // ✅ key fix: use templateField for per-bar colors
    });

    const coloredData = addColorField(data);

    // ✅ IMPORTANT: set xAxis data FIRST, then series data
    xAxis.data.setAll(coloredData);
    series.data.setAll(coloredData);

    chart.appear(1000, 100);
}

function createRevenueBar(data) {
    createBarChart("revenueChart", data, "Revenue_M", "{categoryX}: ${valueY}M");
}

function createEmployeesBar(data) {
    createBarChart("employeesChart", data, "Employees", "{categoryX}: {valueY} employees");
}

function createRndBar(data) {
    createBarChart("rndChart", data, "RnD_Spending_M", "{categoryX}: ${valueY}M R&D");
}

function createMarketCapPie(data) {
    let root = makeRoot("marketCapChart");
    let chart = root.container.children.push(am5percent.PieChart.new(root, {
        radius: am5.percent(85),
        innerRadius: am5.percent(45)
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "Market_Cap_M",
        categoryField: "Company",
        tooltip: am5.Tooltip.new(root, { labelText: "{category}: ${value}M" })
    }));

    series.labels.template.setAll({
        fontSize: 10,
        fontFamily: "'Space Mono', monospace",
        fill: am5.color("#6b6b80")
    });

    series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color("#0a0a0f")
    });

    series.get("colors").set("colors", COLORS.map(c => am5.color(c)));
    series.data.setAll(data);
    series.appear(1000);
}