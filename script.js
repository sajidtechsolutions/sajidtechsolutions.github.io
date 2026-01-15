console.log('Sajid Tech Solutions website loaded.');

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const isVisible = navLinks.classList.contains('active');

            if (isVisible) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                navLinks.style.display = ''; // Reset to css default
            } else {
                navLinks.classList.add('active');
                menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                // Active styles are handled in CSS for cleaner separation, 
                // but we can enforce display block here if needed or rely on class
                navLinks.style.display = 'flex';
                styleMobileMenu(navLinks);
            }
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.app-card, .feature-item, .section-header, .hero-content, .hero-visual');
    animatedElements.forEach((el, index) => {
        // Add a small stagger delay if its a list
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        if (el.classList.contains('app-card')) {
            el.style.transitionDelay = `${index % 3 * 0.1}s`;
        }
        observer.observe(el);
    });
});

function styleMobileMenu(nav) {
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '80px';
    nav.style.left = '5%';
    nav.style.width = '90%';
    nav.style.background = 'rgba(15, 12, 41, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.padding = '30px';
    nav.style.borderRadius = '15px';
    nav.style.border = '1px solid rgba(255,255,255,0.1)';
    nav.style.zIndex = '999';
    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
}

// Add animation class helper
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
