// GITHUB LANGUAGES CHART
async function renderChart() {
    try {
        const res = await fetch("/.netlify/functions/countLines");
        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error("Invalid data:", data);
            return;
        }

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: "Lines of Code (bytes)",
                    data: data.map(d => d.value),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    } catch (err) {
        console.error("Failed to render chart:", err);
    }
}

renderChart();