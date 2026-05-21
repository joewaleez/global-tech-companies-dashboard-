# Tech Giants Dashboard

An interactive web dashboard visualizing key metrics for the world's top 10 technology companies from 2020 to 2024.

## 📊 Charts Included

- **Revenue** — Annual revenue in USD millions
- **Workforce Size** — Total number of employees
- **R&D Spending** — Research and development investment in USD millions
- **Market Capitalization** — Company market cap in USD millions

## 🏢 Companies Covered

Apple, Microsoft, Google, Amazon, Meta, NVIDIA, Tesla, Samsung, Intel, IBM

## 🗂️ Project Structure

```
tech_companies/
├── app.py                  # Flask application
├── generate_data.py        # Script to generate the Excel dataset
├── tech_companies_data.xlsx
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
pip install flask pandas openpyxl
```

### 2. Generate the dataset (optional — file is already included)

```bash
python generate_data.py
```

### 3. Run the app

```bash
python app.py
```

### 4. Open in browser

```
http://127.0.0.1:5000
```

## 🔍 Features

- Filter all charts by year (2020–2024) or view the 5-year average
- Animated interactive charts powered by amCharts 5
- Responsive 2-column grid layout
- Dark industrial theme

## 🛠️ Tech Stack

- **Backend:** Python, Flask, Pandas
- **Frontend:** HTML, CSS, JavaScript
- **Charts:** amCharts 5
- **Data:** Excel (.xlsx) via openpyxl
