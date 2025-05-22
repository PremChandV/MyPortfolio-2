// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (!savedTheme) {
    applyTheme('dark');
}

// Set initial theme icon
const icon = themeToggle.querySelector('i');
icon.classList.remove('fa-moon');
icon.classList.add('fa-sun');

// Function to apply a given theme
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    localStorage.setItem('theme', theme);
}

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
});


// Mobile Menu Toggle
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

// Smooth scrolling for navigation links
navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Close mobile menu if open
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');

        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        navLinksItems.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});
const phone = document.getElementById('phone').value;
const phonePattern = /^\d{10}$/;
if (!phonePattern.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition) {
            bar.style.width = bar.parentElement.getAttribute('data-progress') + '%';
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Typewriter Effect
const typeWriter = (element, text, speed = 100, delay = 0) => {
    let i = 0;
    setTimeout(() => {
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }, delay);
};

// Multiple Designations Typewriter
const typeMultipleDesignations = (element, designations, speed = 100, delay = 0) => {
    let currentIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = speed;

    const type = () => {
        const currentDesignation = designations[currentIndex];

        if (isDeleting) {
            // Deleting text
            currentText = currentDesignation.substring(0, currentText.length - 1);
            typeSpeed = speed / 2; // Faster when deleting
        } else {
            // Adding text
            currentText = currentDesignation.substring(0, currentText.length + 1);
            typeSpeed = speed;
        }

        element.innerHTML = currentText;

        if (!isDeleting && currentText === currentDesignation) {
            // Pause at the end of typing
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            // Move to next designation
            isDeleting = false;
            currentIndex = (currentIndex + 1) % designations.length;
            typeSpeed = 500; // Pause before typing next designation
        }

        setTimeout(type, typeSpeed);
    };

    setTimeout(type, delay);
};

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.typewriter-text');
    const subtitleElement = document.querySelector('.typewriter-subtitle');

    // Clear initial content
    nameElement.innerHTML = '';
    subtitleElement.innerHTML = '';

    // Designations array
    const designations = [
        'Web Developer',
        'Software Engineer',
        'Tech Enthusiast',
        'Problem Solver'
    ];

    // Start typewriter effects
    typeWriter(nameElement, 'Prem Chand', 150);
    typeMultipleDesignations(subtitleElement, designations, 100, 2000); // Start after name is typed
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
