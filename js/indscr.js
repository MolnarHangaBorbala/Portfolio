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

        // Sort by LOC descending
        data.sort((a, b) => b.value - a.value);

        const colors = [
            "#00e3b2", "#00a187ff", "#00b4d8", "#0096c7",
            "#0077b6", "#005f73", "#38b000", "#70e000",
            "#5ec476ff", "#2ec4b6"
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
                    borderColor: "#ccc",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#fff",
                            font: {
                                size: 16,
                                family: "'Segoe UI', sans-serif",
                                weight: "500"
                            },
                            padding: 16,
                            boxWidth: 18,
                            boxHeight: 18
                        }
                    }
                },
                animation: { duration: 1200, easing: "easeOutCubic" }
            }
        });

    } catch (err) {
        console.error("Failed to render chart:", err);
    }
}

renderChart();

async function renderWakaChart() {
    const res = await fetch("/.netlify/functions/fetchWakaData");
    const data = await res.json();

    if (!Array.isArray(data)) return console.error("Invalid data:", data);

    const ctx = document.getElementById("wakatimeChart").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: data.map(d => d.label),
            datasets: [{
                data: data.map(d => d.value),
                backgroundColor: [
                    "#00c9a7", "#00e3b2", "#00b4d8", "#0096c7", "#0077b6", "#38b000"
                ],
                borderWidth: 2,
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#00e3b2",
                        font: { size: 15 }
                    }
                }
            }
        }
    });
}

renderWakaChart();