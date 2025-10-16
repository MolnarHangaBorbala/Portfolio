const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function random() {
    let a = Math.floor((Math.random() * 5) + 1);

    if (a === 1) {
        window.location.href = "https://combined-games.netlify.app/rock-paper-scissors/rindex";
    }
    else if (a === 2) {
        window.location.href = "https://combined-games.netlify.app/tic-tac-toe/tindex";
    }
    else if (a === 3) {
        window.location.href = "https://combined-games.netlify.app/whack-a-mole/windex";
    }
    else if (a === 4) {
        window.location.href = "https://combined-games.netlify.app/snake/sindex";
    }
    else if (a === 5) {
        window.location.href = "https://combined-games.netlify.app/memory/mindex";
    }
}

// Particle Background
(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });

    const config = {
        baseColor: [249, 255, 162], // RGB for accent [0, 201, 167] (cyan-like). Use e.g. [255,255,255] for white
        backgroundAlpha: 1,         // trail / glow alpha effect
        particleMin: 40,            // min particles on very small screens
        particleMax: 120,           // max on large screens
        maxSize: 3.2,               // max particle radius
        minSize: 0.6,               // min particle radius
        speed: 0.45,                // base speed multiplier
        connectionDistance: 120,    // distance to draw faint lines between particles
        mouseRepelRadius: 50,       // radius of mouse repulsion
        reduceOnMobile: true,       // lower particle count on mobile
    };

    let particles = [];
    let w = 0, h = 0, DPR = Math.max(1, window.devicePixelRatio || 1);
    let mouse = { x: -9999, y: -9999, down: false };

    const rand = (min, max) => Math.random() * (max - min) + min;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    function resize() {
        w = canvas.clientWidth || window.innerWidth;
        h = canvas.clientHeight || window.innerHeight;
        canvas.width = Math.round(w * DPR);
        canvas.height = Math.round(h * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const area = (w * h) / 1000;
        let count = Math.round(area / 10);
        count = Math.max(config.particleMin, Math.min(config.particleMax, count));

        if (config.reduceOnMobile && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
            count = Math.round(count * 0.6);
        }

        if (Math.abs((particles.length || 0) - count) > 8) {
            initParticles(count);
        } else {
            particles.forEach(p => {
                p.x = Math.min(w, Math.max(0, p.x));
                p.y = Math.min(h, Math.max(0, p.y));
            });
        }
    }

    function initParticles(n = 80) {
        particles = Array.from({ length: n }, () => ({
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-0.5, 0.5) * config.speed,
            vy: rand(-0.3, 0.3) * config.speed,
            r: rand(config.minSize, config.maxSize),
            alpha: rand(0.3, 0.95)
        }));
    }

    function update(dt) {
        for (let p of particles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;

            const m = mouse;
            const d = Math.hypot(p.x - m.x, p.y - m.y);
            if (d < config.mouseRepelRadius) {
                const angle = Math.atan2(p.y - m.y, p.x - m.x);
                const force = (1 - d / config.mouseRepelRadius) * 3.4;
                p.vx += Math.cos(angle) * force * 0.06;
                p.vy += Math.sin(angle) * force * 0.06;
            }

            p.vx *= 0.995;
            p.vy *= 0.995;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = `rgba(10,10,10,${config.backgroundAlpha})`;
        ctx.fillRect(0,0,w,h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < config.connectionDistance) {
                    const lineAlpha = (1 - d / config.connectionDistance) * 0.08 * (p.alpha + q.alpha) * 0.7;
                    ctx.strokeStyle = `rgba(${config.baseColor.join(',')}, ${lineAlpha})`;
                    ctx.lineWidth = 1 * ((p.r + q.r) / (config.maxSize * 2));
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        for (let p of particles) {
            ctx.beginPath();
            const glow = Math.min(0.9, p.alpha);
            ctx.fillStyle = `rgba(${config.baseColor.join(',')}, ${glow})`;
            ctx.globalCompositeOperation = 'lighter';
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
    }

    let last = performance.now();
    let rafId;
    function loop(now) {
        const dt = (now - last) * 0.06;
        last = now;
        update(Math.min(dt, 4));
        draw();
        rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        clearTimeout(window._particleResizeTimeout);
        window._particleResizeTimeout = setTimeout(resize, 120);
    });

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            last = performance.now();
            rafId = requestAnimationFrame(loop);
        }
    });

    resize();
    last = performance.now();
    rafId = requestAnimationFrame(loop);

    window._zendevParticles = {
        setColor: (r, g, b) => { config.baseColor = [r, g, b]; },
        setCount: (n) => { initParticles(n); },
        destroy: () => { cancelAnimationFrame(rafId); particles = []; ctx.clearRect(0, 0, w, h); }
    };
})();
