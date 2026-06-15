/* ═══════════════════════════════════════════════════════════
   AROFENITRA RARIVONJY — PORTFOLIO JS
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── AOS INIT ───
AOS.init({
    duration: 700,
    easing: 'ease-out-quad',
    once: true,
    offset: 80,
});

// ─── SCROLL PROGRESS BAR ───
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
});

// ─── CUSTOM CURSOR ───
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .proj-card, .pub-card, .info-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '44px';
            ring.style.height = '44px';
            ring.style.borderColor = 'rgba(0,212,255,0.7)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '28px';
            ring.style.height = '28px';
            ring.style.borderColor = 'rgba(0,212,255,0.5)';
        });
    });
}

// ─── NEURAL NETWORK CANVAS ───
(function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, nodes = [], animId;

    const NODE_COUNT = 55;
    const CONNECT_DIST = 160;
    const SPEED = 0.35;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: Math.random() * 2 + 1,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Update
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            n.pulse += 0.02;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        }

        // Connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.35;
                    ctx.beginPath();
                    const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    grad.addColorStop(0, `rgba(124,58,237,${alpha})`);
                    grad.addColorStop(1, `rgba(0,212,255,${alpha})`);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Nodes
        for (const n of nodes) {
            const pulse = (Math.sin(n.pulse) * 0.5 + 0.5);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + pulse * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${0.4 + pulse * 0.5})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${0.04 + pulse * 0.06})`;
            ctx.fill();
        }

        animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
        resize();
        createNodes();
    });
    ro.observe(canvas.parentElement);

    resize();
    createNodes();
    draw();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, W, H);
    }
})();

// ─── TYPING EFFECT ───
(function initTyping() {
    const el = document.querySelector('.typed-text');
    if (!el) return;
    const phrases = [
        'AI Researcher',
        'LLM Engineer',
        'Computer Vision Engineer',
        'ML Engineer',
        'Deep Learning Specialist',
        'GenAI Engineer',
        'PhD Candidate',
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const current = phrases[pi];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
            setTimeout(type, 80);
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 40);
        }
    }
    type();
})();

// ─── NAVBAR ───
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
        // Animate bars
        const bars = hamburger.querySelectorAll('span');
        if (open) {
            bars[0].style.transform = 'rotate(45deg) translateY(7px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
})();

// ─── COUNTER ANIMATION ───
(function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.getAttribute('data-count');
            const duration = 1400;
            const start = performance.now();
            function step(now) {
                const pct = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor(easeOut(pct) * target);
                if (pct < 1) requestAnimationFrame(step);
                else el.textContent = target;
            }
            requestAnimationFrame(step);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    els.forEach(el => obs.observe(el));

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
})();

// ─── SKILL BAR ANIMATION ───
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.style.width = el.getAttribute('data-w') + '%';
            obs.unobserve(el);
        });
    }, { threshold: 0.3 });

    fills.forEach(el => obs.observe(el));
})();

// ─── PROJECT FILTER ───
(function initProjectFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.proj-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                if (filter === 'all' || cats.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInCard 0.35s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

// ─── BACK TO TOP ───
(function initBackTop() {
    const btn = document.getElementById('backTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ─── SMOOTH ACTIVE NAV HIGHLIGHT ───
(function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.style.color = '');
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.style.color = 'var(--cyan)';
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => obs.observe(s));
})();

// ─── CARD FADE IN KEYFRAME (injected) ───
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInCard {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();