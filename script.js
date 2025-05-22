document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll on link click (without setting 'active' manually)
    const navLinksItems = document.querySelectorAll('.nav-links a');

    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Close mobile menu
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            // Smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        const formData = { name, email, phone, message };
        console.log('Form submitted:', formData);

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (barPosition < screenPosition) {
                const percent = bar.style.width || bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1];
                if (percent) {
                    bar.style.width = percent;
                }
            }
        });
    };
    window.addEventListener('scroll', animateProgressBars);
    window.addEventListener('load', animateProgressBars);

    // Project hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Typewriter effect
    const nameElement = document.querySelector('.typewriter-text');
    const subtitleElement = document.querySelector('.typewriter-subtitle');

    if (nameElement && subtitleElement) {
        nameElement.innerHTML = '';
        subtitleElement.innerHTML = '';

        function typeWriter(element, text, speed = 100, callback) {
            let i = 0;
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                } else if (callback) {
                    callback();
                }
            }
            typing();
        }

        function typeMultipleDesignations(element, designations, speed = 100, pause = 2000) {
            let index = 0;
            let isDeleting = false;
            let text = '';

            function type() {
                const fullText = designations[index];

                if (isDeleting) {
                    text = fullText.substring(0, text.length - 1);
                } else {
                    text = fullText.substring(0, text.length + 1);
                }

                element.innerHTML = text;

                let delay = speed;
                if (!isDeleting && text === fullText) {
                    delay = pause;
                    isDeleting = true;
                } else if (isDeleting && text === '') {
                    isDeleting = false;
                    index = (index + 1) % designations.length;
                    delay = 500;
                }

                setTimeout(type, delay);
            }

            type();
        }

        typeWriter(nameElement, 'Prem Chand', 150, () => {
            const titles = ['Web Developer', 'Software Engineer', 'Tech Enthusiast', 'Problem Solver'];
            typeMultipleDesignations(subtitleElement, titles, 100, 2000);
        });
    }
});
