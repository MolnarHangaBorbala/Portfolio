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

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }

    const config = {
        baseColor: [255, 248, 146],
        backgroundAlpha: 0.5,
        particleMin: 40,
        particleMax: 120,
        maxSize: 3.2,
        minSize: 0.6,
        speed: 0.45,
        connectionDistance: 120,
        mouseRepelRadius: 50,
        reduceOnMobile: true,
    };

    let particles = [];
    let w = 0, h = 0, DPR = Math.max(1, window.devicePixelRatio || 1);
    let mouse = { x: -9999, y: -9999, down: false };

    const rand = (min, max) => Math.random() * (max - min) + min;

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

            const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (d < config.mouseRepelRadius) {
                const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
                const force = (1 - d / config.mouseRepelRadius) * 3.4;
                p.vx += Math.cos(angle) * force * 0.06;
                p.vy += Math.sin(angle) * force * 0.06;
            }

            p.vx *= 0.995;
            p.vy *= 0.995;

            if (Math.abs(p.vx) < 0.02 && Math.abs(p.vy) < 0.02) {
                p.vx += (Math.random() - 0.5) * 0.2 * config.speed;
                p.vy += (Math.random() - 0.5) * 0.2 * config.speed;
            }
        }
    }

    function draw() {
        ctx.fillStyle = `rgba(0, 0, 0, ${config.backgroundAlpha})`;
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < config.connectionDistance) {
                    const lineAlpha = (1 - d / config.connectionDistance) * 0.5 * (p.alpha + q.alpha) * 0.7;
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
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
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
});

// EASTER EGG (TOAST + CONFETTI)
(function () {
    const SECRET = "747";
    let buffer = "";

    const toast = document.getElementById('egg-toast');
    const canvas = document.getElementById('egg-confetti');

    function triggerEgg() {
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
        }
        confettiBurst();
    }

    window.triggerEgg = triggerEgg;

    window.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        const ch = e.key;
        buffer += ch;
        if (buffer.length > SECRET.length) buffer = buffer.slice(-SECRET.length);

        if (buffer.toLowerCase() === SECRET) {
            buffer = "";
            triggerEgg();
        }
    });

    function confettiBurst() {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.style.display = 'block';
        canvas.width = innerWidth * devicePixelRatio;
        canvas.height = innerHeight * devicePixelRatio;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        const pieces = [];
        for (let i = 0; i < 60; i++) {
            pieces.push({
                x: Math.random() * innerWidth,
                y: -10 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 4 + 2,
                r: Math.random() * 6 + 4,
                color: `hsl(${Math.random() * 360}deg 80% 60%)`,
                rot: Math.random() * Math.PI * 2,
                scaleX: Math.random() * 0.7 + 0.3
            });
        }

        let t = 0;
        function frame() {
            t++;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let p of pieces) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.12;
                p.rot += 0.06;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.r * p.scaleX, -p.r / 2, p.r * 2 * p.scaleX, p.r);
                ctx.restore();
            }
            if (t < 160) requestAnimationFrame(frame);
            else {
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                canvas.style.display = 'none';
            }
        }
        requestAnimationFrame(frame);
    }
})();

// SECRET KEYPAD (MOBILE)
const title = document.querySelector('h1');
const keypad = document.getElementById('secret-keypad');
const display = keypad.querySelector('.keypad-display');
const buttons = keypad.querySelectorAll('button');

let pressTimer;
const SECRET_CODE = "747";
let inputCode = "";

title.addEventListener('touchstart', startHold);
title.addEventListener('mousedown', startHold);
title.addEventListener('touchend', cancelHold);
title.addEventListener('mouseup', cancelHold);
title.addEventListener('mouseleave', cancelHold);

function startHold() {
    pressTimer = setTimeout(() => {
        keypad.style.display = 'flex';
        inputCode = "";
        display.textContent = "_";
    }, 3000);
}

function cancelHold() {
    clearTimeout(pressTimer);
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent.trim();

        if (btn.classList.contains('clear')) {
            inputCode = inputCode.slice(0, -1);
        } else if (btn.classList.contains('ok')) {
            if (inputCode === SECRET_CODE) {
                keypad.style.display = 'none';
                window.triggerEgg?.();
            } else {
                display.textContent = "x";
                setTimeout(() => display.textContent = "_", 800);
                inputCode = "";
            }
            return;
        } else {
            inputCode += val;
        }

        display.textContent = inputCode || "_";
    });
});

document.addEventListener('click', e => {
    if (!keypad.contains(e.target) && e.target !== title) {
        keypad.style.display = 'none';
    }
});