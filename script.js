/* ═══════════════════════════════════════════════════════════
   AROFENITRA RARIVONJY — PORTFOLIO JS
   "The Annotated Manuscript" — Academic-Elite Editorial System
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── AOS INIT (kept as a no-conflict fallback; GSAP drives the real reveals) ───
if (window.AOS) {
    AOS.init({ duration: 1, once: true, disable: true });
}

// ─── SCROLL PROGRESS BAR ───
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
});

// ─── CUSTOM CURSOR (pen-nib) ───
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
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .proj-card, .pub-card, .info-card, .contact-card-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = 'rgba(140,31,40,0.6)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '26px';
            ring.style.height = '26px';
            ring.style.borderColor = 'rgba(140,31,40,0.35)';
        });
    });
} else {
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
}

// ─── MANUSCRIPT CONSTELLATION CANVAS ───
// A quiet, sparse node-and-line field — evokes a citation graph / star chart
// rather than a "neural network" cliché. Crimson/ink on paper, low opacity.
(function initConstellationCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W, H, nodes = [], animId;

    const NODE_COUNT = 32;
    const CONNECT_DIST = 150;
    const SPEED = 0.12;

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
                r: Math.random() * 1.4 + 0.8,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        }

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.22;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(140,31,40,${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(28,27,25,0.38)';
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

    if (!reduceMotion) {
        draw();
    } else {
        // Render a single static frame, no animation loop.
        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(28,27,25,0.3)';
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
        const bars = hamburger.querySelectorAll('span');
        if (open) {
            bars[0].style.transform = 'rotate(45deg) translateY(6.5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-6.5px)';
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
            const duration = 1200;
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

        // If the description never actually overflows 3 lines, hide the button.
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
        // Respect the user's preference: show everything immediately, no motion.
        gsap.set('.gsap-reveal, .gsap-reveal-side', { opacity: 1, y: 0, x: 0 });
        return;
    }

    // Hero: one orchestrated entrance sequence on load.
    gsap.set('.hero-text .gsap-reveal', { opacity: 0, y: 22 });
    gsap.set('.hero-margin', { opacity: 0, x: 18 });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .to('.hero-text .gsap-reveal', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
        .to('.hero-margin', { opacity: 1, x: 0, duration: 0.9 }, '-=0.5');

    // Scroll-triggered reveals for everything below the fold.
    gsap.utils.toArray('.section-head').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.gsap-reveal').forEach(el => {
        if (el.closest('.hero')) return; // already animated above
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
            opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // Stagger project cards within the grid for a slightly orchestrated feel.
    const grid = document.getElementById('projectsGrid');
    if (grid) {
        gsap.fromTo(grid.querySelectorAll('.proj-card'),
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
                scrollTrigger: { trigger: grid, start: 'top 80%' }
            }
        );
    }

    // Timeline dots: a small "ink landing" pop as each entry arrives.
    gsap.utils.toArray('.tl-dot').forEach(dot => {
        gsap.fromTo(dot, { scale: 0 }, {
            scale: 1, duration: 0.4, ease: 'back.out(3)',
            scrollTrigger: { trigger: dot, start: 'top 90%' }
        });
    });
})();