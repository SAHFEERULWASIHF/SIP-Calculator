document.addEventListener("DOMContentLoaded", function () {
    // Form elements
    const sipForm = document.getElementById("sip-form");
    const sipResult = document.getElementById("sip-result");
    const sipInflationResult = document.getElementById("sip-inflation-result");
    const totalInvestedResult = document.getElementById("total-invested-result");
    const totalInvestedInflationResult = document.getElementById("total-invested-inflation-result");

    // Initialize charts
    let leftChart, rightChart;

    function createChart(ctx, title, labels, data, colors) {
        return new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: colors,
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            },
        });
    }

    // Create default charts with initial data
    const leftChartCanvas = document.getElementById("left-chart").getContext("2d");
    const rightChartCanvas = document.getElementById("right-chart").getContext("2d");

    leftChart = createChart(
        leftChartCanvas,
        "SIP vs Total Invested",
        ["SIP", "Total Invested"],
        [0, 0],
        ["#4CAF50", "#FFC107"]
    );

    rightChart = createChart(
        rightChartCanvas,
        "SIP with Inflation vs Total Invested with Inflation",
        ["SIP with Inflation", "Total Invested with Inflation"],
        [0, 0],
        ["#2196F3", "#FF5722"]
    );

    // Update chart data
    function updateChart(chart, data) {
        chart.data.datasets[0].data = data;
        chart.update();
    }

    // SIP Calculation Functions
    function calculateSIP(P, years, growthRate, inflationRate = 0) {
        const r = growthRate / 12 / 100; // Monthly growth rate
        const n = years * 12; // Total months
        let fv;

        if (r !== 0) {
            fv = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        } else {
            fv = P * n;
        }

        if (inflationRate > 0) {
            const i = inflationRate / 12 / 100; // Monthly inflation rate
            fv /= Math.pow(1 + i, n);
        }

        return fv;
    }

    function calculateTotalInvested(P, years, inflationRate = 0) {
        const n = years * 12; // Total months
        if (inflationRate > 0) {
            const i = inflationRate / 12 / 100; // Monthly inflation rate
            let total = 0;
            for (let k = 1; k <= n; k++) {
                total += P / Math.pow(1 + i, k);
            }
            return total;
        } else {
            return P * n;
        }
    }

    // Handle form submission
    sipForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user inputs
        const monthlyInvestment = parseFloat(document.getElementById("monthly-investment").value);
        const growthRate = parseFloat(document.getElementById("growth-rate").value);
        const years = parseInt(document.getElementById("years").value);
        const inflationRate = parseFloat(document.getElementById("inflation-rate").value) || 0;

        if (isNaN(monthlyInvestment) || isNaN(growthRate) || isNaN(years)) {
            alert("Please fill in all required fields.");
            return;
        }

        // Perform calculations
        const sip = calculateSIP(monthlyInvestment, years, growthRate);
        const sipInflation = calculateSIP(monthlyInvestment, years, growthRate, inflationRate);
        const totalInvested = calculateTotalInvested(monthlyInvestment, years);
        const totalInvestedInflation = calculateTotalInvested(monthlyInvestment, years, inflationRate);

        // Update results
        sipResult.textContent = `SIP: ₹${sip.toFixed(2)}`;
        sipInflationResult.textContent = `SIP with Inflation: ₹${sipInflation.toFixed(2)}`;
        totalInvestedResult.textContent = `Total Invested: ₹${totalInvested.toFixed(2)}`;
        totalInvestedInflationResult.textContent = `Total Invested with Inflation: ₹${totalInvestedInflation.toFixed(2)}`;

        // Update charts
        updateChart(leftChart, [sip, totalInvested]);
        updateChart(rightChart, [sipInflation, totalInvestedInflation]);
    });
});
