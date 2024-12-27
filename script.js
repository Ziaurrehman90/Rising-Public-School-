// Toggle the navigation menu in mobile view
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Open/close the hamburger menu on click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('is-active'); // Toggle hamburger icon state
});

// Close the menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('is-active');
    });
});

// Smooth scroll for anchor links in the menu
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close the menu when clicking outside of it
document.addEventListener('click', event => {
    const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInside) {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('is-active');
    }
});

// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let autoSlideInterval; // Variable to store auto-slide interval

// Update the slider view
function updateSlider() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === slideIndex);
    });
}

// Show the next slide
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlider();
}

// Show the previous slide
function showPrevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

// Navigate to a specific slide
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index;
        updateSlider();
        resetAutoSlide(); // Reset auto-slide on manual interaction
    });
});

// Add click event listeners for navigation buttons
nextButton.addEventListener('click', () => {
    showNextSlide();
    resetAutoSlide(); // Reset auto-slide on manual interaction
});
prevButton.addEventListener('click', () => {
    showPrevSlide();
    resetAutoSlide(); // Reset auto-slide on manual interaction
});

// Auto-slide every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, 3000);
}

// Reset auto-slide when user interacts with controls
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start the carousel auto-slide on page load
startAutoSlide();

// EmailJS initialization
(function () {
    emailjs.init('A5O45WCJpy3bnnUlv'); // Replace with your public key
})();

// Handle form submission using EmailJS
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_1v53yj6', 'template_otrbhrv', this)
        .then(() => {
            alert('Message sent successfully!');
            this.reset(); // Clear form fields
        })
        .catch(error => {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        });
});
