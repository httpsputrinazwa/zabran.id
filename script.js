// ========================================
// Preloader
// ========================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// ========================================
// Navigation
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Hero Slider
// ========================================

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, 6000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        startSlideShow(); // Restart interval on manual click
    });
});

// Initialize Slider
if (slides.length > 0) {
    startSlideShow();
}

// ========================================
// Dark Mode Toggle
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save theme preference
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.material-symbols-outlined');
    if (body.classList.contains('dark-mode')) {
        icon.textContent = 'light_mode';
    } else {
        icon.textContent = 'dark_mode';
    }
}

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Back to Top Button
// ========================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
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

// ========================================
// Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Mengirim...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success message
        showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="material-symbols-outlined">
                ${type === 'success' ? 'check_circle' : 'error'}
            </span>
            <p>${message}</p>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            background: white;
            padding: 20px 30px;
            border-radius: 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        .notification.success {
            border-left: 4px solid #D4AF37;
        }
        
        .notification.error {
            border-left: 4px solid #DC2626;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification-content .material-symbols-outlined {
            font-size: 24px;
            color: #D4AF37;
        }
        
        .notification.error .material-symbols-outlined {
            color: #DC2626;
        }
        
        .notification-content p {
            margin: 0;
            font-size: 14px;
            color: #334155;
            font-weight: 500;
        }
        
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
    `;

    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ========================================
// Counter Animation
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isMoney = element.textContent.includes('$');
    const isPlus = element.textContent.includes('+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        let value = Math.floor(current);
        if (isMoney) {
            if (value >= 1000000000) {
                value = (value / 1000000000).toFixed(1) + 'B';
            } else if (value >= 1000000) {
                value = (value / 1000000).toFixed(1) + 'M';
            }
            value = '$' + value;
        }

        if (isPlus) value += '+';

        element.textContent = value;
    }, 16);
}

// Observe counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;

            // Extract number
            let number = parseInt(text.replace(/[^0-9]/g, ''));

            // Handle special cases
            if (text.includes('B')) {
                number = number * 1000000000;
            } else if (text.includes('M')) {
                number = number * 1000000;
            }

            animateCounter(element, number);
            counterObserver.unobserve(element);
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number, .stat-value').forEach(stat => {
    counterObserver.observe(stat);
});

// ========================================
// AOS (Animate On Scroll) Initialization
// ========================================

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
    });
}

// ========================================
// Parallax Effect
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }

    // Mission background parallax
    const missionBg = document.querySelector('.mission-background');
    if (missionBg) {
        const rect = missionBg.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            missionBg.style.transform = `translateY(${(scrolled - rect.top) * 0.2}px)`;
        }
    }
});

// ========================================
// Image Lazy Loading
// ========================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// Service Cards Hover Effect
// ========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// Partners Carousel (Auto Scroll)
// ========================================

const partnersGrid = document.querySelector('.partners-grid');
if (partnersGrid) {
    let isHovering = false;

    partnersGrid.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    partnersGrid.addEventListener('mouseleave', () => {
        isHovering = false;
    });
}

// ========================================
// Form Input Animation
// ========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });

    // Check if already has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ========================================
// Cursor Effect (Optional - for desktop)
// ========================================

if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX * 0.1;
        followerY += distY * 0.1;

        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor,
        .custom-cursor-follower {
            position: fixed;
            top: -5px;
            left: -5px;
            pointer-events: none;
            z-index: 10001;
        }
        
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: var(--gold);
            border-radius: 50%;
            mix-blend-mode: difference;
        }
        
        .custom-cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid var(--gold);
            border-radius: 50%;
            opacity: 0.5;
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
            transform: scale(1.5);
        }
    `;
    document.head.appendChild(cursorStyle);

    // Hide default cursor on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.style.cursor = 'none';
    });
}

// ========================================
// Console Message
// ========================================

console.log('%c PT Zabran Internasional Grup ', 'background: #010D21; color: #D4AF37; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c Global Business Excellence ', 'background: #D4AF37; color: #010D21; font-size: 14px; padding: 5px;');
console.log('%c Website developed with ❤️ ', 'font-size: 12px; color: #64748B;');

// ========================================
// Performance Monitoring
// ========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ========================================
// Prevent Right Click on Images (Optional)
// ========================================

// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showNotification('Image protection is enabled', 'info');
    });
});
*/

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Ctrl/Cmd + K for quick navigation (optional)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // You can implement a search or quick navigation feature here
    }
});

// ========================================
// Handle External Links
// ========================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ========================================
// Gallery Lightbox
// ========================================

const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            galleryModal.style.display = 'block';
            modalImage.src = img.src;
            modalCaption.innerHTML = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.style.display === 'block') {
            galleryModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Run any initialization code here
    highlightNavigation();

    // Log initialization
    console.log('Website initialized successfully');
});