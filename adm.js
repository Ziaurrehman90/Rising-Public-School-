// Toggle the navigation menu in mobile view
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Open/close the hamburger menu on click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active'); // Toggle the menu
    hamburger.classList.toggle('is-active'); // Optionally change icon state (like cross icon)
});

// Close the menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active'); // Close the menu
        hamburger.classList.remove('is-active'); // Reset hamburger icon state
    });
});

// Smooth scroll for anchor links in the hamburger menu
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default jump

        const targetId = this.getAttribute('href').substring(1); // Extract ID
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // Smooth scroll effect
            });
        }
    });
});

// Optional: Close the menu when clicking outside of it (for better UX)
document.addEventListener('click', function (event) {
    const isClickInsideMenu = navLinks.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInsideMenu) {
        navLinks.classList.remove('nav-active'); // Close menu
        hamburger.classList.remove('is-active'); // Reset icon state
    }
});

// Optional functionality to redirect to another page on button click
document.querySelector('.learn-more-btn').addEventListener('click', function () {
    window.location.href = 'about-us.html'; // Redirect to About Us
});

// Carousel functionality
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Adjust slide positions
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${slideIndex * 100}vw)`;
    });

    // Update dots
    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[slideIndex].classList.add('active-dot');
}

// Auto-play carousel (optional)
setInterval(() => {
    plusSlides(1);
}, 3000); // Change slide every 3 seconds

// EmailJS initialization
(function () {
    emailjs.init('A5O45WCJpy3bnnUlv'); // Replace with your public key
})();

// Handle form submission using EmailJS
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default submission

    emailjs.sendForm('service_1v53yj6', 'template_otrbhrv', this)
        .then(function () {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset(); // Clear form
        })
        .catch(function (error) {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        });
});
