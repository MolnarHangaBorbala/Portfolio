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
        const data = await res.json();

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "line", // or 'bar', 'pie', etc.
            data: {
                labels: data.map(d => d.label),   // adjust according to your JSON
                datasets: [{
                    label: "My Dataset",
                    data: data.map(d => d.value),   // adjust according to your JSON
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
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