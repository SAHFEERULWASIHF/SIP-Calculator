function sip(P, years, growthRate, inflationRate = 0) {
    const r = growthRate / 12 / 100; // monthly growth rate
    const n = years * 12; // total months
    let fv;

    if (r !== 0) {
        fv = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    } else {
        fv = P * n;
    }

    if (inflationRate > 0) {
        const i = inflationRate / 12 / 100; // monthly inflation rate
        fv /= Math.pow(1 + i, n);
    }

    return fv;
}

function inflationAdjustedInvestment(P, years, inflationRate) {
    const i = inflationRate / 12 / 100; // monthly inflation rate
    const n = years * 12; // total months
    let total = 0;

    for (let k = 1; k <= n; k++) {
        total += P / Math.pow(1 + i, k);
    }

    return total;
}

function totalPaid(P, years) {
    return P * years * 12;
}

function calculator(monthlyInvestment, growthRate, years, inflationRate) {
    const normalFv = sip(monthlyInvestment, years, growthRate);
    const realFv = sip(monthlyInvestment, years, growthRate, inflationRate);
    const totalInvested = totalPaid(monthlyInvestment, years);
    const adjustedTotal = inflationAdjustedInvestment(monthlyInvestment, years, inflationRate);

    document.getElementById("sip-result").textContent = `SIP: ₹${normalFv.toFixed(2)}`;
    document.getElementById("sip-inflation-result").textContent = `SIP with Inflation: ₹${realFv.toFixed(2)}`;
    document.getElementById("total-invested-result").textContent = `Total Invested: ₹${totalInvested.toFixed(2)}`;
    document.getElementById("total-invested-inflation-result").textContent = `Total Invested with Inflation: ₹${adjustedTotal.toFixed(2)}`;
}

document.getElementById("calculate-btn").addEventListener("click", function () {
    const monthlyInvestment = parseFloat(document.getElementById("monthly-investment").value);
    const growthRate = parseFloat(document.getElementById("growth-rate").value);
    const years = parseInt(document.getElementById("years").value);
    const inflationRate = parseFloat(document.getElementById("inflation-rate").value) || 0;

    if (isNaN(monthlyInvestment) || isNaN(growthRate) || isNaN(years)) {
        alert("Please fill in all required fields.");
        return;
    }

    calculator(monthlyInvestment, growthRate, years, inflationRate);
});
