document.getElementById("calculate-btn").addEventListener("click", function () {
    const monthlyInvestment = parseFloat(document.getElementById("monthly-investment").value);
    const growthRate = parseFloat(document.getElementById("growth-rate").value);
    const years = parseInt(document.getElementById("years").value);
    const inflationRate = parseFloat(document.getElementById("inflation-rate").value) || 0;
    const annualIncreaseRate = parseFloat(document.getElementById("annual-increase-rate").value) || 0;

    if (isNaN(monthlyInvestment) || isNaN(growthRate) || isNaN(years)) {
        alert("Please fill in all required fields.");
        return;
    }

    let months = years * 12;
    let totalInvested = 0;
    let totalInvestedWithInflation = 0;
    let sipValue = 0;
    let sipValueWithInflation = 0;

    let currentMonthlyInvestment = monthlyInvestment;

    for (let month = 1; month <= months; month++) {
        let annualGrowthMultiplier = Math.pow(1 + growthRate / 100, month / 12);
        sipValue += currentMonthlyInvestment * annualGrowthMultiplier;
        totalInvested += currentMonthlyInvestment;

        let inflationMultiplier = Math.pow(1 + inflationRate / 100, month / 12);
        sipValueWithInflation += currentMonthlyInvestment * annualGrowthMultiplier / inflationMultiplier;
        totalInvestedWithInflation += currentMonthlyInvestment / inflationMultiplier;

        if (month % 12 === 0) {
            currentMonthlyInvestment *= (1 + annualIncreaseRate / 100);
        }
    }

    document.getElementById("sip-result").textContent = `SIP: ₹${sipValue.toFixed(2)}`;
    document.getElementById("sip-inflation-result").textContent = `SIP with Inflation: ₹${sipValueWithInflation.toFixed(2)}`;
    document.getElementById("total-invested-result").textContent = `Total Invested: ₹${totalInvested.toFixed(2)}`;
    document.getElementById("total-invested-inflation-result").textContent = `Total Invested with Inflation: ₹${totalInvestedWithInflation.toFixed(2)}`;
});
