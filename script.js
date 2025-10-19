// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
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

// Close mobile menu when clicking on a link
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards, skill categories, and achievement cards
const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .achievement-card, .contact-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
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
});

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 80);
// }

// Project metrics counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Handle percentage values
        if (element.textContent.includes('%')) {
            element.textContent = Math.round(current) + '%';
        } 
        // Handle decimal values
        else if (target < 1) {
            element.textContent = current.toFixed(2);
        }
        // Handle time values
        else if (element.textContent.includes('ms')) {
            element.textContent = Math.round(current) + 'ms';
        }
        // Handle regular numbers
        else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Observe metrics for counter animation
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const valueElement = entry.target.querySelector('.metric-value');
            const text = valueElement.textContent;
            
            // Extract numeric value
            let targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(targetValue)) {
                entry.target.dataset.animated = 'true';
                animateCounter(valueElement, targetValue, 1500);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric').forEach(metric => {
    metricObserver.observe(metric);
});

// Email obfuscation (anti-spam)
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add email tracking or verification here if needed
        console.log('Email link clicked');
    });
});

// Copy email to clipboard functionality (optional)
function addCopyEmailFeature() {
    emailLinks.forEach(link => {
        const email = link.getAttribute('href').replace('mailto:', '');
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋';
        copyBtn.className = 'copy-email-btn';
        copyBtn.style.cssText = `
            margin-left: 10px;
            padding: 5px 10px;
            background: var(--bg-secondary);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 2000);
            });
        });
        
        // Uncomment to add copy buttons next to email links
        // link.parentElement.appendChild(copyBtn);
    });
}

// Load animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

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

// Form validation (if you add a contact form)
function setupFormValidation() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Add your form submission logic here
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: var(--primary);
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Console Easter Egg
console.log('%c🚀 ML Engineer Portfolio', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #4a5568;');
console.log('%chttps://github.com/username', 'font-size: 12px; color: #764ba2;');

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();
    // addCopyEmailFeature(); // Uncomment if you want copy-to-clipboard feature
});