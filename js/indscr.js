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

        // Convert bytes → approximate lines of code
        const LOC_FACTOR = 50;
        data = data.map(d => ({
            label: d.label,
            value: Math.round(d.value / LOC_FACTOR)
        }));

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: "Lines of Code",
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