// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .about-card, .contact-card, .timeline-item'
);

animatedElements.forEach(el => {
    fadeInObserver.observe(el);
});

// Skill Progress Bar Animation
const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillProgressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillProgressObserver.observe(category);
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

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

const projectDetails = {
    1: {
        title: 'Adversarial Attack on Image Compression',
        fullDescription: `
            <h2>Adversarial Attack on Image Compression</h2>
            <img src="images/decomp_fgsm_cheng2020-anchor_q6_eps0.03137254901960784_mse_kodim01.png" alt="Project" style="width: 100%; border-radius: 12px; margin: 1.5rem 0;">
            
            <h3>Problem & Business Value</h3>
            <p>Image Compression is found in digital technology and social media apps such as Facebook, Telegram, etc. Due to exponential growth of digital media, efficient Image Compression is needed. In this project, we design a model to trick AI Compression models, destroying reconstruction quality (useful for privacy protection from unwanted cameras). A defense mechanism is also implemented to protect users from perturbed images containing malicious perturbations.</p>
            
            <h3>Technical Deep Dive</h3>
            <ul>
                <li><strong>Data:</strong> Scraped adversarial research articles from major journals and conferences. Handled smooth gradient flow and vanishing gradients to ensure backpropagation works effectively.</li>
                <li><strong>Models:</strong> Compared FGSM (drop from 35dB to 10.9dB) against PGD (35dB to 11.7dB) with MSE loss, maintaining average image perturbation up to 3%.</li>
                <li><strong>Loss Functions:</strong> MSE, PSNR, and SSIM. Achieved best result: drop from 35dB to 6dB in SSIM with PGD.</li>
                <li><strong>Code Quality:</strong> Customizable architecture with detailed documentation and type hints.</li>
            </ul>
            
            <h3>Research Output</h3>
            <p><strong>Paper:</strong> "Robustness of AI Image Compression: Non-linear Perturbation"</p>
            <p><strong>Status:</strong> Accepted for oral presentation at Neuroinformatics 2025 conference</p>
            <p><strong>Authors:</strong> Arofenitra Rarivonjy, Anton Bibin, Razan Dibo, Aleksandr Kolomeitsev, Anh-Huy Phan, and Ivan Oseledets</p>
        `
    },
    2: {
        title: 'Real-time Clear Path Detection System',
        fullDescription: `
            <h2>Real-time Clear Path Detection System</h2>
            <img src="images/navigation_analysis_1.png" alt="Project" style="width: 100%; border-radius: 12px; margin: 1.5rem 0;">
            
            <h3>Problem & Business Value</h3>
            <p>Developed an intelligent navigation assistance system combining object detection, depth estimation, and segmentation to identify clear paths for autonomous navigation. Applications include assistive technology for visually impaired users and autonomous robots.</p>
            
            <h3>Technical Implementation</h3>
            <ul>
                <li><strong>Multi-Modal Fusion:</strong> Combined YOLOv8n object detection, YOLOv8n-seg segmentation, and MiDaS depth estimation.</li>
                <li><strong>Path Extraction:</strong> Grid-based analysis evaluating 64-pixel groups across lower 30% of images using occupancy and depth thresholds.</li>
                <li><strong>Real-time Processing:</strong> Time-based throttling system with 0.9-second intervals for smooth video display.</li>
                <li><strong>IP Camera Integration:</strong> Robust network camera support with buffer management and error handling.</li>
            </ul>
            
            <h3>System Architecture</h3>
            <p><strong>Pipeline:</strong> Frame capture → resize to 640x640 → object detection → segmentation → depth estimation → path analysis → visualization</p>
            <p><strong>Performance:</strong> GPU acceleration with automatic CUDA detection, minimal buffering, efficient memory management.</p>
        `
    },
    3: {
        title: 'AI Image and Video Compression Impact Study',
        fullDescription: `
            <h2>AI Image and Video Compression Impact Study</h2>
            <img src="images/edge_detection_with_HED.png" alt="Project" style="width: 100%; border-radius: 12px; margin: 1.5rem 0;">
            
            <h3>Research Overview</h3>
            <p>Comprehensive research on how AI-based image and video compression affects downstream computer vision tasks including object detection, classification, OCR, and edge detection. Compared state-of-the-art neural compression models with traditional methods.</p>
            
            <h3>Key Findings</h3>
            <ul>
                <li><strong>Medical Imaging:</strong> Up to 20% accuracy degradation on compressed medical images (ISIC2018 dataset).</li>
                <li><strong>OCR Enhancement:</strong> Counter-intuitive 12.3% improvement in license plate recognition using PaddleOCR on moderately compressed images (Q3 quality).</li>
                <li><strong>Edge Detection:</strong> Implemented HED and compared with Canny edge detection on compressed video from MOT17 dataset.</li>
            </ul>
            
            <h3>Research Methodology</h3>
            <p><strong>Datasets:</strong> Kodak, ISIC2018, COCO2017, MOT17, BSDS500, UCF101</p>
            <p><strong>Models:</strong> Cheng2020-anchor, Cheng2020-attn (image), SSF2020 (video) vs JPEG/WebP</p>
            <p><strong>Metrics:</strong> PSNR, SSIM, VIF, BPP, accuracy, F1-score, mAP</p>
            
            <h3>Collaborators</h3>
            <p>QuocViet Pham and Thanakrit Lerdmatayakul</p>
        `
    }
};

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            modalBody.innerHTML = project.fullDescription;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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

// Project Metrics Counter Animation
function animateCounter(element, target, duration = 1500) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const text = element.textContent;
        if (text.includes('%')) {
            element.textContent = Math.round(current) + '%';
        } else if (text.includes('ms')) {
            element.textContent = Math.round(current) + 'ms';
        } else if (text.includes('dB')) {
            element.textContent = Math.round(current) + 'dB';
        } else if (!isNaN(parseFloat(text))) {
            element.textContent = Math.round(current);
        }
    }, 16);
}

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const valueElement = entry.target.querySelector('.metric-value');
            const text = valueElement.textContent;
            
            let targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(targetValue) && targetValue > 0) {
                entry.target.dataset.animated = 'true';
                animateCounter(valueElement, targetValue, 1500);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric').forEach(metric => {
    metricObserver.observe(metric);
});

// Console Easter Egg
console.log('%c🚀 ML Engineer Portfolio', 'font-size: 24px; font-weight: bold; color: #667eea; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 16px; color: #4a5568;');
console.log('%chttps://github.com/arofenitra', 'font-size: 14px; color: #764ba2; font-weight: bold;');
console.log('%c\nLooking for an ML Engineer? Let\'s connect!', 'font-size: 14px; color: #48bb78;');

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// Performance optimization: Debounce scroll events
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

// Apply debounce to resource-intensive scroll handlers
const debouncedHighlightNav = debounce(highlightNavigation, 100);
window.addEventListener('scroll', debouncedHighlightNav);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// Add parallax effect to hero shapes (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add smooth hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Add ripple effect to buttons (optional enhancement)
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to all buttons
document.querySelectorAll('.btn, .project-link, .contact-card').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Enhanced scroll reveal with stagger effect
function staggerReveal(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Observe sections for stagger animations
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.skill-tag, .about-card');
            if (children.length > 0) {
                staggerReveal(children, 50);
                staggerObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-section, .about-section').forEach(section => {
    staggerObserver.observe(section);
});

// Add tilt effect to cards (3D hover effect)
document.querySelectorAll('.about-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText && footerText.textContent.includes('2025')) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Track user interactions for analytics (placeholder)
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Replace with actual analytics code (Google Analytics, etc.)
}

// Track project views
viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        trackEvent('Project', 'View Details', `Project ${projectId}`);
    });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External Link', 'Click', link.href);
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        });
    }
});

// Enhanced mobile menu with swipe gesture
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - close menu
        navMenu.classList.remove('active');
    }
    if (touchEndX > touchStartX + 50 && window.innerWidth <= 768) {
        // Swipe right - open menu (only on mobile)
        navMenu.classList.add('active');
    }
}

// Smooth scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Add focus styles for keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard navigation styles
const keyboardNavStyle = document.createElement('style');
keyboardNavStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardNavStyle);

// Lazy loading for images with intersection observer
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add custom cursor effect (optional - can be commented out)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animateCursor);
}

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .custom-cursor {
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
            transition: transform 0.15s ease;
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
            transform: scale(2);
        }
    `;
    document.head.appendChild(cursorStyles);
    animateCursor();
} else {
    cursor.remove();
    cursorFollower.remove();
}

// Add notification system for user feedback
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const notificationStyles = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.style.cssText = notificationStyles;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add notification animations
const notificationAnimStyle = document.createElement('style');
notificationAnimStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationAnimStyle);

// Example: Show notification when email is clicked
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            showNotification('Opening email client...', 'info', 2000);
        }, 100);
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #48bb78; font-weight: bold;');
    });
}

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✓ Portfolio Loaded Successfully', 'color: #48bb78; font-size: 16px; font-weight: bold;');
    
    // Additional initialization code can go here
    updateScrollProgress();
    highlightNavigation();
});

// Service Worker registration for PWA (optional - uncomment if needed)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(err => console.log('SW registration failed:', err));
    });
}
*/