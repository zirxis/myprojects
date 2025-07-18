// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Update active navigation link on scroll
    function updateActiveNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector(".header");
    function updateHeaderBackground() {
        if (window.scrollY > 100) {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "none";
        }
    }

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll(".project-card, .social-link");
    fadeElements.forEach(el => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

    // Parallax effect for hero background
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector(".hero-background");
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after page load
    setTimeout(() => {
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);

    // Scroll event listeners
    window.addEventListener("scroll", function() {
        updateActiveNav();
        updateHeaderBackground();
        updateParallax();
    });

    // Initial calls
    updateActiveNav();
    updateHeaderBackground();

    // Add loading animation to page
    document.body.style.opacity = "0";
    window.addEventListener("load", function() {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "1";
    });

    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".nav");
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", function() {
            nav.classList.toggle("active");
        });
    }

    // Smooth reveal animation for sections
    const revealElements = document.querySelectorAll(".section-header, .hero-content");
    revealElements.forEach(el => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll(".cta-button, .project-btn, .social-link");
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement("style");
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-button, .project-btn, .social-link {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Scroll-dependent functions here
}, 16); // ~60fps

window.addEventListener("scroll", throttledScroll);


