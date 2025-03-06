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

