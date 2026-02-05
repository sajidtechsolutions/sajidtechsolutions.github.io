document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Logic ---
    const textElements = {
        navbar: document.querySelector('.navbar'),
        mobileToggle: document.querySelector('.mobile-toggle'),
        navLinks: document.querySelector('.nav-links'),
        links: document.querySelectorAll('.nav-link')
    };

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            textElements.navbar.classList.add('nav-scrolled');
        } else {
            textElements.navbar.classList.remove('nav-scrolled');
        }
    });

    // Mobile Menu Toggle
    if (textElements.mobileToggle) {
        textElements.mobileToggle.addEventListener('click', () => {
            textElements.navLinks.classList.toggle('active');

            // Toggle Icon
            const icon = textElements.mobileToggle.querySelector('i');
            if (textElements.navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        textElements.links.forEach(link => {
            link.addEventListener('click', () => {
                textElements.navLinks.classList.remove('active');
                const icon = textElements.mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Smooth Scroll for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger sightly before element enters
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to cards and sections
    const animatedElements = document.querySelectorAll('.app-card, .feature-box, .section-title, .section-desc');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';

        // Add stagger effect if it's a card
        if (el.classList.contains('app-card') || el.classList.contains('feature-box')) {
            el.style.transitionDelay = `${(index % 3) * 100}ms`;
        }

        animateOnScroll.observe(el);
    });

    // --- Vanilla Tilt Effect Logic ---
    // Simple implementation of 3D tilt without external library
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleHover);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleHover(e) {
        const el = this;
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const rect = el.getBoundingClientRect();

        // Mouse relative to element
        const xVal = e.clientX - rect.left;
        const yVal = e.clientY - rect.top;

        // Calculate rotation (max 15deg)
        const yRotation = 15 * ((xVal - width / 2) / width);
        const xRotation = -15 * ((yVal - height / 2) / height);

        const string = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        el.style.transform = string;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
    }

    // --- Scroll Spy Logic ---
    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('.nav-link');

    // Use a large threshold array to track precise visibility
    const scrollSpyOptions = {
        root: null,
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-10% 0px -10% 0px"
    };

    const scrollSpy = new IntersectionObserver((entries) => {
        // Find the section that is most visible
        let maxRatio = 0;
        let activeId = '';

        // We need to track the current ratio of ALL sections, 
        // effectively we want to query the state, but observer is callback based.
        // A simpler robust approach for "active link" is to prioritize the entry with highest intersectionRatio

        entries.forEach(entry => {
            // We can check which element is currently "most" active if we have reference to all
            // But within this callback we only see changes.
            // Standard approach: just toggle class based on simple visibility or "active" zone center screen.
            // Let's stick to the "center of screen" logic which is 'isIntersecting' with a narrow rootMargin
        });

        // Better simplified logic for specific active state:
        // Identify the visible section closest to top/center

        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            // Check if section is taking up the middle of the viewport
            const viewportHeight = window.innerHeight;
            const middle = viewportHeight / 3;

            if (rect.top <= middle && rect.bottom >= middle) {
                activeId = sec.getAttribute('id');
            }
        });

        if (activeId) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] }); // Trigger often guarantees we catch the scroll

    // Optimization: The Observer loop above re-checks all sections on EVERY trigger.
    // This is okay for 4 sections. For huge sites, we'd cache stats.

    // Actually, `scroll` event is smoother for this specific "middle line" check than Observer 
    // because Observer fires on crossing thresholds, not continuously.
    // Let's switch to a straightforward scroll event listener for 100% accuracy.

    const onScrollSpy = () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;

            // Offset for fixed header (approx 150px)
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", onScrollSpy);
    onScrollSpy(); // Init

    // Cleanup Observer if we aren't using it (removing the previous block effectively)


});
