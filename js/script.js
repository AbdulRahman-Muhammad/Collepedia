// js/script.js

// --- Library Initializations ---

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200, // Increased animation duration slightly
    once: true, // Animation happens only once
    mirror: false, // Elements do not animate out
    easing: 'ease-in-out', // Animation timing function
    // delay: 50, // Add a small initial delay to all animations (optional)
});

// Initialize Typed.js for Hero Section
window.typed = new Typed('#typed-output', { // Single instance now
    strings: [
        "innovative media solutions.",
        "creative content.",
        "strategic communication.",
        "digital presence management.",
        "your brand story.", // Added another string
        "measurable impact." // Added another string
    ],
    typeSpeed: 40, // Slightly faster typing
    backSpeed: 20, // Slightly faster backspacing
    loop: true,
    showCursor: true,
    cursorChar: '|', // Custom cursor character
    autoInsertCss: true, // Let Typed.js inject cursor CSS (can be overridden in style.css)
});


// --- Dark Mode Toggle Logic ---
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

// Helper function to get a computed style property
function getCssVar(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Function to set the theme based on mode ('light' or 'dark')
function setMode(mode) {
    if (mode === 'dark') {
        body.classList.add('dark-mode'); // Add dark mode class
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon'); // Change icon to moon
         // Optional: Update navbar background RGB for better opacity transition
         // const darkRgb = hexToRgb(getCssVar('--navbar-bg')); // Requires hexToRgb helper
         // document.documentElement.style.setProperty('--navbar-bg-rgb', `${darkRgb.r},${darkRgb.g},${darkRgb.b}`);
    } else { // Default to light mode
        body.classList.remove('dark-mode'); // Remove dark mode class
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun'); // Change icon to sun
         // Optional: Update navbar background RGB
         // const lightRgb = hexToRgb(getCssVar('--navbar-bg')); // Requires hexToRgb helper
         // document.documentElement.style.setProperty('--navbar-bg-rgb', `${lightRgb.r},${lightRgb.g},${lightRgb.b}`);
    }
    // Save the user's preference
    localStorage.setItem('collepediaMode', mode);
}

// Simple Hex to RGB helper (needed if you use rgba with CSS variables)
// function hexToRgb(hex) {
//   const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//   hex = hex.replace(shorthandRegex, function(m, r, g, b) {
//     return r + r + g + g + b + b;
//   });
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16)
//   } : null;
// }


// Load mode preference on page load
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('collepediaMode');

if (savedMode) {
    setMode(savedMode);
} else if (prefersDarkMode) {
    setMode('dark');
} else {
     setMode('light');
}

// Add event listener to the mode toggle button
modeToggle.addEventListener('click', () => {
    const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    setMode(currentMode === 'light' ? 'dark' : 'light');
});


// --- Mobile Menu Toggle Logic ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');
const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link-mobile');


function openMobileMenu() {
    body.classList.add('menu-open');
    // mobileMenu.classList.remove('translate-x-full'); // CSS transition handles this
    // mobileMenuOverlay.classList.remove('hidden'); // CSS transition handles this
}

function closeMobileMenu() {
    body.classList.remove('menu-open');
     // mobileMenu.classList.add('translate-x-full'); // CSS transition handles this
     // mobileMenuOverlay.classList.add('hidden'); // CSS transition handles this
}

mobileMenuButton.addEventListener('click', openMobileMenu);
closeMobileMenuButton.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu); // Close when clicking overlay

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Add a small delay to allow smooth scroll to start before closing menu
        setTimeout(closeMobileMenu, 300);
    });
});

// Close mobile menu on escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMobileMenu();
    }
});


// --- Smooth Scrolling for internal links ---
// (This is already included in the HTML <script> block for simplicity,
// but can be moved here if preferred)


// --- Custom Animations (Example using AnimeJS) ---

// Example: Animate stats counters on scroll (Requires Intersection Observer for "in view" detection)
// Assuming you have elements like <span class="stat-value" data-target="250">0</span>
// function animateStatCounters() {
//     document.querySelectorAll('.stat-value').forEach(span => {
//         const targetValue = parseInt(span.getAttribute('data-target'));
//         anime({
//             targets: span,
//             innerText: [0, targetValue],
//             easing: 'easeOutQuad',
//             duration: 2000,
//             round: 1, // Round to nearest integer
//             // Add Intersection Observer logic here to trigger this animation when element is in view
//         });
//     });
// }
// // Call animateStatCounters when section is in view (using Intersection Observer)


// Example: Staggered animation for service cards on section entry
// AOS handles basic fade-up/zoom-in, but AnimeJS could do a more unique stagger
// const servicesSection = document.getElementById('services');
// const serviceCards = servicesSection ? servicesSection.querySelectorAll('.card') : [];

// const servicesObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             anime({
//                 targets: serviceCards,
//                 opacity: [0, 1],
//                 translateY: [50, 0],
//                 delay: anime.stagger(150), // Staggered delay
//                 easing: 'easeOutExpo',
//                 duration: 1000
//             });
//             observer.unobserve(entry.target); // Stop observing once animated
//         }
//     });
// }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

// if (servicesSection) {
//     servicesObserver.observe(servicesSection);
// }


// --- Optional: Simple Parallax Effect (JS based) ---
// Add this section ONLY if you use the .bg-parallax div in your HTML
// window.addEventListener('scroll', function() {
//     const parallax = document.querySelector('.bg-parallax');
//     if (parallax) {
//         let scrollPosition = window.pageYOffset;
//         // Adjust the '-0.3' value to control the speed
//         parallax.style.transform = 'translateY(' + scrollPosition * -0.3 + 'px)';
//     }
// });


// --- Optional: Lazy Loading Images ---
// Requires adding 'loading="lazy"' to your <img> tags in HTML
// and potentially a fallback for browsers that don't support it (more complex JS)
// Or use a library like vanilla-lazyload
// <img src="placeholder.jpg" data-src="path/to/your/image.jpg" alt="..." class="lazy">
// const lazyLoadInstance = new LazyLoad({
//     elements_selector: ".lazy"
// });


// --- Optional: Animate Navbar Background on Scroll ---
// Check if the 'scrolled' class logic is in HTML or here
// const navbar = document.getElementById('navbar');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });


