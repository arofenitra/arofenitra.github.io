/* ═══════════════════════════════════════════════════════════
   AROFENITRA RARIVONJY — PORTFOLIO JS
   "The Annotated Manuscript" — Academic-Elite Editorial System
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── THEME TOGGLE ───
(function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const html   = document.documentElement;

    // Persist preference
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        // Update canvas colors when theme changes
        updateCanvasColors(next);
    });
})();

// ─── SCROLL PROGRESS BAR ───
const scrollBar = document.getElementById('scrollBar');
if (scrollBar) {
    window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        scrollBar.style.width = pct + '%';
    }, { passive: true });
}

// ─── CUSTOM CURSOR (pen-nib) ───
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .proj-card, .pub-card, .info-card, .contact-card-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width  = '40px';
            ring.style.height = '40px';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width  = '26px';
            ring.style.height = '26px';
        });
    });
} else {
    if (dot)  dot.style.display  = 'none';
    if (ring) ring.style.display = 'none';
}

// ─── CONSTELLATION CANVAS ───
// Adapts to dark/light theme. Low opacity, ink-on-paper star-chart aesthetic.
let canvasNodes = [];
let canvasAnimId;
let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

function updateCanvasColors(theme) {
    currentTheme = theme;
}

(function initConstellationCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W, H;
    const NODE_COUNT  = 30;
    const CONNECT_DIST = 140;
    const SPEED       = 0.14;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function createNodes() {
        canvasNodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            canvasNodes.push({
                x:  Math.random() * W,
                y:  Math.random() * H,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r:  Math.random() * 1.2 + 0.6,
            });
        }
    }

    function getColors() {
        // Dark theme: crimson lines on dark paper
        // Light theme: muted warm lines on light paper
        if (currentTheme === 'light') {
            return { line: 'rgba(168,52,40,', node: 'rgba(60,50,40,0.25)' };
        }
        return { line: 'rgba(194,87,74,', node: 'rgba(232,228,218,0.18)' };
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const { line, node } = getColors();

        for (const n of canvasNodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        }

        for (let i = 0; i < canvasNodes.length; i++) {
            for (let j = i + 1; j < canvasNodes.length; j++) {
                const dx   = canvasNodes[i].x - canvasNodes[j].x;
                const dy   = canvasNodes[i].y - canvasNodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.2;
                    ctx.beginPath();
                    ctx.strokeStyle = line + alpha + ')';
                    ctx.lineWidth   = 0.7;
                    ctx.moveTo(canvasNodes[i].x, canvasNodes[i].y);
                    ctx.lineTo(canvasNodes[j].x, canvasNodes[j].y);
                    ctx.stroke();
                }
            }
        }

        for (const n of canvasNodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = node;
            ctx.fill();
        }

        canvasAnimId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); createNodes(); });
    ro.observe(canvas.parentElement);

    resize();
    createNodes();

    if (!reduceMotion) {
        draw();
    } else {
        const { node } = getColors();
        for (const n of canvasNodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = node;
            ctx.fill();
        }
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
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
        const bars = hamburger.querySelectorAll('span');
        if (open) {
            bars[0].style.transform = 'rotate(45deg) translateY(6.5px)';
            bars[1].style.opacity   = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-6.5px)';
        } else {
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
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
            const el     = entry.target;
            const target = +el.getAttribute('data-count');
            const dur    = 1200;
            const start  = performance.now();

            function step(now) {
                const pct = Math.min((now - start) / dur, 1);
                el.textContent = Math.round(pct * target);
                if (pct < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            obs.unobserve(el);
        });
    }, { threshold: 0.3 });

    els.forEach(el => obs.observe(el));
})();

// ─── SKILL BAR ANIMATION ───
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.style.width = (el.getAttribute('data-w') || 0) + '%';
            obs.unobserve(el);
        });
    }, { threshold: 0.3 });

    fills.forEach(el => obs.observe(el));
})();

// ─── PROJECT FILTER ───
(function initProjectFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
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
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

// ─── PROJECT "READ MORE" ACCORDION ───
(function initReadMore() {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        const desc = btn.previousElementSibling;
        if (!desc || !desc.classList.contains('proj-desc-clamped')) return;

        requestAnimationFrame(() => {
            if (desc.scrollHeight - desc.clientHeight < 4) {
                btn.style.display = 'none';
            }
        });

        btn.addEventListener('click', () => {
            const expanded = desc.classList.toggle('expanded');
            btn.classList.toggle('expanded', expanded);
            btn.innerHTML = expanded
                ? 'Read less <i class="fas fa-chevron-down"></i>'
                : 'Read more <i class="fas fa-chevron-down"></i>';
        });
    });
})();

// ─── BACK TO TOP ───
(function initBackTop() {
    const btn = document.getElementById('backTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ─── SMOOTH ACTIVE NAV HIGHLIGHT ───
(function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.style.color = '');
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.style.color = 'var(--crimson)';
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => obs.observe(s));
})();

// ─── GSAP SCROLL-TRIGGERED REVEALS ───
(function initGsapReveals() {
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        gsap.set('.gsap-reveal, .gsap-reveal-side', { opacity: 1, y: 0, x: 0 });
        return;
    }

    // Hero entrance
    gsap.set('.hero-text .gsap-reveal', { opacity: 0, y: 22 });
    gsap.set('.hero-margin', { opacity: 0, x: 18 });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .to('.hero-text .gsap-reveal', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
        .to('.hero-margin', { opacity: 1, x: 0, duration: 0.9 }, '-=0.5');

    // Section heads
    gsap.utils.toArray('.section-head').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    // General reveals
    gsap.utils.toArray('.gsap-reveal').forEach(el => {
        if (el.closest('.hero')) return;
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
            opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // Project card stagger
    const grid = document.getElementById('projectsGrid');
    if (grid) {
        gsap.fromTo(grid.querySelectorAll('.proj-card'),
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.07,
                scrollTrigger: { trigger: grid, start: 'top 80%' }
            }
        );
    }

    // Timeline dot pop
    gsap.utils.toArray('.tl-dot').forEach(d => {
        gsap.fromTo(d, { scale: 0 }, {
            scale: 1, duration: 0.4, ease: 'back.out(3)',
            scrollTrigger: { trigger: d, start: 'top 90%' }
        });
    });
})();