import pandas as pd

base_data = {
    "Apple":     {"Revenue": 394328, "Employees": 164000, "RnD_Spending": 26251, "Market_Cap": 2640000, "Products": 24},
    "Microsoft": {"Revenue": 211915, "Employees": 221000, "RnD_Spending": 27195, "Market_Cap": 2480000, "Products": 30},
    "Google":    {"Revenue": 282836, "Employees": 190234, "RnD_Spending": 39500, "Market_Cap": 1840000, "Products": 27},
    "Amazon":    {"Revenue": 524897, "Employees": 1540000,"RnD_Spending": 85622, "Market_Cap": 1570000, "Products": 40},
    "Meta":      {"Revenue": 116609, "Employees": 86482,  "RnD_Spending": 35338, "Market_Cap": 910000,  "Products": 12},
    "NVIDIA":    {"Revenue": 60922,  "Employees": 29600,  "RnD_Spending": 7339,  "Market_Cap": 1220000, "Products": 15},
    "Tesla":     {"Revenue": 96773,  "Employees": 140473, "RnD_Spending": 3969,  "Market_Cap": 790000,  "Products": 8},
    "Samsung":   {"Revenue": 234050, "Employees": 270000, "RnD_Spending": 24000, "Market_Cap": 380000,  "Products": 35},
    "Intel":     {"Revenue": 54228,  "Employees": 131900, "RnD_Spending": 17528, "Market_Cap": 170000,  "Products": 20},
    "IBM":       {"Revenue": 61860,  "Employees": 288300, "RnD_Spending": 6300,  "Market_Cap": 130000,  "Products": 18},
}

years = [2020, 2021, 2022, 2023, 2024]
rows = []

for company, base in base_data.items():
    for year in years:
        g = 2024 - year
        rows.append([
            company, year,
            round(base["Revenue"]    / (1.08 ** g)),
            round(base["Employees"]  / (1.05 ** g)),
            round(base["RnD_Spending"]/ (1.07 ** g)),
            round(base["Market_Cap"] / (1.10 ** g)),
            base["Products"]
        ])

df = pd.DataFrame(rows, columns=["Company","Year","Revenue_M","Employees","RnD_Spending_M","Market_Cap_M","Products"])
df.to_excel("tech_companies_data.xlsx", index=False)
print("tech_companies_data.xlsx created!")