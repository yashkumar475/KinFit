document.addEventListener("DOMContentLoaded", function () {
    const chartData = [
        { id: "chart1", title: "RPM", value: 75 },
        { id: "chart3", title: "Temperature", value: 45 },
        { id: "chart5", title: "Current", value: 50 },
        { id: "chart4", title: "Voltage", value: 85 },
        { id: "chart6", title: "Total Energy", value: 50 }
    ];

    let charts = {};

    chartData.forEach(data => {
        var options = {
            series: [data.value],
            chart: {
                type: 'radialBar',
                height: 250
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 270,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                    },
                    dataLabels: {
                        name: { offsetY: 20, show: true, fontSize: '16px' },
                        value: { offsetY: 20, fontSize: '18px', formatter: val => val }
                    }
                }
            },
            labels: [data.title],
            colors: ["#008FFB"]
        };

        let chartElement = document.getElementById(data.id);
        var chart = new ApexCharts(chartElement, options);
        chart.render();

        charts[data.id] = chart; // Store the chart instance
    });

    // Fetch new data and update charts and table
    async function fetchData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        const tbody = document.getElementById('data-body');
        tbody.innerHTML = '';

        data.slice(0, 10).forEach((item, index) => {
            const rpm = Math.floor(Math.random() * 300);
            const voltage = (Math.random() * 50).toFixed(2);
            const temperature = (Math.random() * 45).toFixed(2);
            const current = (Math.random() * 10).toFixed(2);
            const timestamp = new Date().toLocaleString();

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>EQP-${1000 + index}</td>
                <td>${rpm}</td>
                <td>${voltage}</td>
                <td>${timestamp}</td>
                <td>${temperature}</td>
                <td>${current}</td>
            `;

            tbody.appendChild(row);

            // Update charts
            charts["chart1"].updateSeries([rpm]); // RPM
            charts["chart3"].updateSeries([temperature]); // Temperature
            charts["chart5"].updateSeries([current]); // Current
            charts["chart4"].updateSeries([voltage]); // Voltage
            charts["chart6"].updateSeries([voltage]); // Voltage
        });
    }

    // Fetch data every 5 seconds
    setInterval(fetchData, 5000);
    fetchData();
});
