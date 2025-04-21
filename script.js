// script.js

// --- Library Initializations ---

// Initialize AOS
AOS.init({
    duration: 1000, // animation duration
    once: true, // whether animation should only happen once - default
    mirror: false, // whether elements should animate out when scrolling past them
});

// Initialize Typed.js for Hero Section
// Make Typed instances globally accessible if needed by language toggle
window.typedEn = new Typed('#typed-output', {
    strings: ["innovative media solutions.", "creative content.", "strategic communication."],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true
});

window.typedAr = new Typed('#typed-output-ar', {
    strings: ["حلول إعلامية مبتكرة.", "محتوى إبداعي.", "اتصال استراتيجي."],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
    // Set to false initially, will be started by language toggle
    // Alternatively, loop: true and start/stop based on language
    // Here, we will stop it immediately and start when language is toggled
});

// Stop Arabic typing initially
window.typedAr.stop();


// --- Custom Animations (Example using AnimeJS) ---
// You can add specific AnimeJS animations here
// Example: Animate the site icons on hover (using classes from HTML)
// const siteIcons = document.querySelectorAll('#sites .card i');
// siteIcons.forEach(icon => {
//     icon.addEventListener('mouseover', () => {
//         anime({
//             targets: icon,
//             scale: [1, 1.2],
//             rotate: [0, 10, -10, 0], // Slight wiggle effect
//             duration: 600,
//             easing: 'easeInOutSine'
//         });
//     });
// });


// Example: Animate hero section buttons on hover
// const heroButtons = document.querySelectorAll('#hero .btn-primary, #hero .btn-secondary');
// heroButtons.forEach(button => {
//     button.addEventListener('mouseover', () => {
//         anime({
//             targets: button,
//             translateY: [0, -5],
//             duration: 300,
//             easing: 'easeOutQuad'
//         });
//     });
//      button.addEventListener('mouseout', () => {
//         anime({
//             targets: button,
//             translateY: [-5, 0],
//             duration: 300,
//             easing: 'easeOutQuad'
//         });
//     });
// });


// Note: Language and Mode toggle logic is included directly in the HTML <script> tag
// for simplicity in this root-only file structure. For better organization,
// you would move those functions (setLanguage, setMode) and event listeners here.
// The smooth scrolling logic is also in the HTML for the same reason.


// --- Navbar Scroll Effect (Optional) ---
// Add a class to the navbar when scrolling down
// const navbar = document.querySelector('nav');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });
// Add CSS for the '.scrolled' class in style.css


