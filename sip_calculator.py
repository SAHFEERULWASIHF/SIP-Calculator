import tkinter as tk
from tkinter import messagebox

def calculate_sip():
    try:
        monthly_investment = float(entry_monthly_investment.get())
        growth_rate = float(entry_growth_rate.get())
        years = int(entry_years.get())
        inflation_rate = float(entry_inflation_rate.get())
        annual_increase_rate = float(entry_annual_increase_rate.get())

        months = years * 12
        total_invested = 0
        total_invested_with_inflation = 0
        sip_value = 0
        sip_value_with_inflation = 0

        for month in range(1, months + 1):
            annual_growth_multiplier = (1 + growth_rate / 100) ** (month / 12)
            sip_value += monthly_investment * annual_growth_multiplier
            total_invested += monthly_investment

            inflation_multiplier = (1 + inflation_rate / 100) ** (month / 12)
            sip_value_with_inflation += monthly_investment * annual_growth_multiplier / inflation_multiplier
            total_invested_with_inflation += monthly_investment / inflation_multiplier

            if month % 12 == 0:
                monthly_investment *= (1 + annual_increase_rate / 100)

        label_result.config(text=f"SIP: ₹{sip_value:,.0f}\n"
                                 f"SIP with Inflation: ₹{sip_value_with_inflation:,.0f}\n\n"
                                 f"Total Invested: ₹{total_invested:,.0f}\n"
                                 f"Total Invested with Inflation: ₹{total_invested_with_inflation:,.0f}")
    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid numeric values.")

# Create the GUI application
app = tk.Tk()
app.title("SIP Calculator")

# Input fields
tk.Label(app, text="Monthly Investment (₹):").grid(row=0, column=0, sticky="e")
entry_monthly_investment = tk.Entry(app)
entry_monthly_investment.grid(row=0, column=1)

tk.Label(app, text="Annual Growth Rate (%):").grid(row=1, column=0, sticky="e")
entry_growth_rate = tk.Entry(app)
entry_growth_rate.grid(row=1, column=1)

tk.Label(app, text="Years:").grid(row=2, column=0, sticky="e")
entry_years = tk.Entry(app)
entry_years.grid(row=2, column=1)

tk.Label(app, text="Inflation Rate (%):").grid(row=3, column=0, sticky="e")
entry_inflation_rate = tk.Entry(app)
entry_inflation_rate.grid(row=3, column=1)

tk.Label(app, text="Annual Increase Rate (%):").grid(row=4, column=0, sticky="e")
entry_annual_increase_rate = tk.Entry(app)
entry_annual_increase_rate.grid(row=4, column=1)

# Calculate button
btn_calculate = tk.Button(app, text="Calculate", command=calculate_sip)
btn_calculate.grid(row=5, columnspan=2)

# Result label
label_result = tk.Label(app, text="Results will appear here", justify="left")
label_result.grid(row=6, columnspan=2)

# Run the application
app.mainloop()
