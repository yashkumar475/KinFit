document.addEventListener("DOMContentLoaded", function () {
    const chartData = [
        { id: "chart1", title: "RPM", value: 75 },
        { id: "chart3", title: "Temperature", value: 45 },
        { id: "chart5", title: "Current", value: 50 },
        { id: "chart4", title: "Voltage", value: 85 }
    ];

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
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                    },
                    dataLabels: {
                        name: { offsetY: 20,show: true, fontSize: '16px' },
                        value: { offsetY: 30, fontSize: '22px', formatter: val => val + "%" }
                    }
                }
            },
            labels: [data.title],
            colors: ["#008FFB"]
        };

        let chartElement = document.createElement("div");
        chartElement.id = data.id;
        document.querySelector(".info-data").appendChild(chartElement);

        var chart = new ApexCharts(document.querySelector(`#${data.id}`), options);
        chart.render();
    });
});




// Table Script


async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    const tbody = document.getElementById('data-body');
    tbody.innerHTML = '';

    data.slice(0, 10).forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>EQP-${1000 + index}</td>
            <td>${Math.floor(Math.random() * 300)}</td>
            <td>${Math.floor(Math.random() * 500)}</td>
            <td>${(Math.random() * 50).toFixed(2)}</td>
            <td>${new Date().toLocaleString()}</td>
            <td>${(Math.random() * 45).toFixed(2)}</td>
            <td>${(Math.random() * 10).toFixed(2)}</td>
        `;

        row.addEventListener('click', () => {
            alert(`Equipment ID: EQP-${1000 + index}\nRPM: ${Math.floor(Math.random() * 300)}`);
        });

        tbody.appendChild(row);
    });
}

// Fetch data every 5 seconds (you can change the interval)
setInterval(fetchData, 5000);

// Initial fetch
fetchData();
