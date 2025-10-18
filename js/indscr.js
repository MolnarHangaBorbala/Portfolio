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
          "#00e3b2", "#00c9a7", "#00b4d8", "#0096c7",
          "#0077b6", "#005f73", "#38b000", "#70e000",
          "#80ed99", "#2ec4b6"
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
                    borderColor: "#00c9a7",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: "bottom", labels: { boxWidth: 20, padding: 10 } },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} LOC` } }
                },
                animation: { duration: 1200, easing: "easeOutCubic" }
            }
        });

    } catch (err) {
        console.error("Failed to render chart:", err);
    }
}


renderChart();
