// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Set initial theme icon
const icon = themeToggle.querySelector('i');
icon.classList.remove('fa-moon');
icon.classList.add('fa-sun');

// Function to apply the theme
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

// Check saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (!savedTheme) {
    applyTheme('dark');
}

// Theme toggle on click
themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
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

// ===============| Typewriter Effect |=================
// Typewriter for a single name
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback(); // Start the subtitle after name finishes
        }
    }
    typing();
}

// Multiple Designations Typewriter (looping)
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

    type(); // Start typing loop
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

// Initialize Typewriter on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.typewriter-text');
    const subtitleElement = document.querySelector('.typewriter-subtitle');

    if (!nameElement || !subtitleElement) return;

    // Clear previous content
    nameElement.innerHTML = '';
    subtitleElement.innerHTML = '';

    // First type the name, then the looping designations
    typeWriter(nameElement, 'Prem Chand', 150, () => {
        const titles = [
            'Web Developer',
            'Software Engineer',
            'Tech Enthusiast',
            'Problem Solver'
        ];
        typeMultipleDesignations(subtitleElement, titles, 100, 2000);
    });
});
