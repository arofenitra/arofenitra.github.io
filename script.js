// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Mobile Navigation Toggle - Improved
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const body = document.body;

navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (isActive) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
        
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
        
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect for Hero Subtitle
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Research Engineer', 'ML Engineer', 'Computer Vision Expert', 'Deep Learning Specialist'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

if (typedTextSpan) {
    setTimeout(type, newTextDelay + 250);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Counter Animation for Stats and Metrics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter, .counter-metric').forEach(counter => {
    counterObserver.observe(counter);
});

// Skill Progress Bar Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            setTimeout(() => {
                entry.target.style.width = progress + '%';
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Project Modal - Improved
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

const projectDetails = {
    1: {
        title: 'Adversarial Attack on Image Compression',
        fullDescription: `
            <div class="modal-project">
                <h2>Adversarial Attack on Image Compression</h2>
                <img src="images/decomp_fgsm_cheng2020-anchor_q6_eps0.03137254901960784_mse_kodim01.png" alt="Project" class="modal-img">
                
                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> Problem & Business Value</h3>
                    <p>Image Compression is found in digital technology and social media apps such as Facebook, Telegram, etc. Due to exponential growth of digital media, efficient Image Compression is needed. In this project, we design a model to trick AI Compression models, destroying reconstruction quality (useful for privacy protection from unwanted cameras). A defense mechanism is also implemented to protect users from perturbed images containing malicious perturbations.</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-code"></i> Technical Deep Dive</h3>
                    <ul class="modal-list">
                        <li><strong>Data:</strong> Scraped adversarial research articles from major journals and conferences. Handled smooth gradient flow and vanishing gradients to ensure backpropagation works effectively.</li>
                        <li><strong>Models:</strong> Compared FGSM (drop from 35dB to 10.9dB) against PGD (35dB to 11.7dB) with MSE loss, maintaining average image perturbation up to 3%.</li>
                        <li><strong>Loss Functions:</strong> MSE, PSNR, and SSIM. Achieved best result: drop from 35dB to 6dB in SSIM with PGD.</li>
                        <li><strong>Code Quality:</strong> Customizable architecture with detailed documentation and type hints.</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-file-alt"></i> Research Output</h3>
                    <p><strong>Paper:</strong> "Robustness of AI Image Compression: Non-linear Perturbation"</p>
                    <p><strong>Status:</strong> Accepted for oral presentation at Neuroinformatics 2025 conference</p>
                    <p><strong>Authors:</strong> Arofenitra Rarivonjy, Anton Bibin, Razan Dibo, Aleksandr Kolomeitsev, Anh-Huy Phan, and Ivan Oseledets</p>
                </div>
            </div>
        `
    },
    2: {
        title: 'Real-time Clear Path Detection System',
        fullDescription: `
            <div class="modal-project">
                <h2>Real-time Clear Path Detection System</h2>
                <img src="images/navigation_analysis_1.png" alt="Project" class="modal-img">
                
                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> Problem & Business Value</h3>
                    <p>Developed an intelligent navigation assistance system combining object detection, depth estimation, and segmentation to identify clear paths for autonomous navigation. Applications include assistive technology for visually impaired users and autonomous robots.</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-code"></i> Technical Implementation</h3>
                    <ul class="modal-list">
                        <li><strong>Multi-Modal Fusion:</strong> Combined YOLOv8n object detection, YOLOv8n-seg segmentation, and MiDaS depth estimation.</li>
                        <li><strong>Path Extraction:</strong> Grid-based analysis evaluating 64-pixel groups across lower 30% of images using occupancy and depth thresholds.</li>
                        <li><strong>Real-time Processing:</strong> Time-based throttling system with 0.9-second intervals for smooth video display.</li>
                        <li><strong>IP Camera Integration:</strong> Robust network camera support with buffer management and error handling.</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-cogs"></i> System Architecture</h3>
                    <p><strong>Pipeline:</strong> Frame capture → resize to 640x640 → object detection → segmentation → depth estimation → path analysis → visualization</p>
                    <p><strong>Performance:</strong> GPU acceleration with automatic CUDA detection, minimal buffering, efficient memory management.</p>
                </div>
            </div>
        `
    },
    3: {
        title: 'AI Image and Video Compression Impact Study',
        fullDescription: `
            <div class="modal-project">
                <h2>AI Image and Video Compression Impact Study</h2>
                <img src="images/edge_detection_with_HED.png" alt="Project" class="modal-img">
                
                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> Research Overview</h3>
                    <p>Comprehensive research on how AI-based image and video compression affects downstream computer vision tasks including object detection, classification, OCR, and edge detection. Compared state-of-the-art neural compression models with traditional methods.</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-chart-line"></i> Key Findings</h3>
                    <ul class="modal-list">
                        <li><strong>Medical Imaging:</strong> Up to 20% accuracy degradation on compressed medical images (ISIC2018 dataset).</li>
                        <li><strong>OCR Enhancement:</strong> Counter-intuitive 12.3% improvement in license plate recognition using PaddleOCR on moderately compressed images (Q3 quality).</li>
                        <li><strong>Edge Detection:</strong> Implemented HED and compared with Canny edge detection on compressed video from MOT17 dataset.</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-flask"></i> Research Methodology</h3>
                    <p><strong>Datasets:</strong> Kodak, ISIC2018, COCO2017, MOT17, BSDS500, UCF101</p>
                    <p><strong>Models:</strong> Cheng2020-anchor, Cheng2020-attn (image), SSF2020 (video) vs JPEG/WebP</p>
                    <p><strong>Metrics:</strong> PSNR, SSIM, VIF, BPP, accuracy, F1-score, mAP</p>
                    <p><strong>Collaborators:</strong> QuocViet Pham and Thanakrit Lerdmatayakul</p>
                </div>
            </div>
        `
    }
};

// Open modal
viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            modalBody.innerHTML = project.fullDescription;
            modal.classList.add('active');
            body.style.overflow = 'hidden';
        }
    });
});

// Close modal function
function closeModal() {
    modal.classList.remove('active');
    body.style.overflow = '';
}

// Close modal events
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Particle Animation Canvas
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles
        connectParticles();
        
        requestAnimationFrame(animateParticles);
    }
    
    // Connect nearby particles
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Image lazy loading and optimization
document.querySelectorAll('img').forEach(img => {
    // Add fade-in effect when image loads
    if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        });
    }
    
    // Error handling for profile image - resize if too large
    if (img.classList.contains('profile-img')) {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23667eea%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22white%22 font-size=%2260%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EAR%3C/text%3E%3C/svg%3E';
        });
    }
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedHighlightNav = debounce(highlightNavigation, 100);
window.addEventListener('scroll', debouncedHighlightNav);

// Page load animation
window.addEventListener('load', () => {
    body.classList.add('loaded');
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn, .project-link, .contact-card').forEach(element => {
    element.addEventListener('click', createRipple);
});

// Console message
console.log('%c🚀 ML Engineer Portfolio', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 16px; color: #4a5568;');
console.log('%chttps://github.com/arofenitra', 'font-size: 14px; color: #764ba2; font-weight: bold;');

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #48bb78; font-weight: bold;');
    });
}