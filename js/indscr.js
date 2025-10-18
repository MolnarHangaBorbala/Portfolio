function home() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "index.html";
    }, 350);
}

function scratch() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "html/scratch.html";
    }, 350);
}

function games() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "html/games.html";
    }, 350);
}

function projects() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "html/projects.html";
    }, 350);
}

async function renderChart() {
    try {
        const res = await fetch("/.netlify/functions/countLines");
        let data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.error("No data received or invalid:", data);
            return;
        }

        // Sort by value descending (optional)
        data.sort((a, b) => b.value - a.value);

        // Colors for each language
        const colors = [
            "#f1e05a", "#563d7c", "#e34c26", "#3572A5", "#178600",
            "#b07219", "#c6538c", "#ffab70", "#00ADD8", "#701516"
        ];

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: "Lines of Code",
                    data: data.map(d => d.value),
                    backgroundColor: data.map((_, i) => colors[i % colors.length]),
                    borderColor: "#333",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        },
                        title: { display: true, text: "Lines of Code" }
                    },
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 30
                        }
                    }
                }
            }
        });

    } catch (err) {
        console.error("Failed to render chart:", err);
    }
}

renderChart();