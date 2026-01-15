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

    // Initialize Interactive Features
    initCustomCursor();
    initTiltEffect();
    initParallax();
});

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (animation handled by CSS transition or simple keyframe, 
            // but for smoother effect we can use requestAnimationFrame or simple animate)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .app-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
}

function initTiltEffect() {
    const cards = document.querySelectorAll('.app-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

function initParallax() {
    const globes = document.querySelectorAll('.globe');

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        globes.forEach((globe, index) => {
            const speed = (index + 1) * 2;
            const xOffset = x * speed;
            const yOffset = y * speed;

            // Keep the float animation but add mouse offset
            // We can't easily combine keyframes with JS transform without a wrapper or complex logic,
            // so we'll apply it to the container or use a css variable if possible.
            // Simpler approach: Apply transform to the globe directly, it might override the float animation.
            // Better: The globes have 'animation: float'. Transform will override it.
            // Fix: Wrap globes in a container or use translate3d addition. 
            // Since we want to keep it simple, let's just move the background container slightly.
        });
    });

    // Alternative Parallax: Move the .background-globes container
    const bgContainer = document.querySelector('.background-globes');
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 50;
        const y = (window.innerHeight - e.pageY * 2) / 50;
        bgContainer.style.transform = `translate(${x}px, ${y}px)`;
    });
}

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
