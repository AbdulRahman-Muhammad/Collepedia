// js/script.js

// --- Library Initializations ---

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    once: true,
    mirror: false,
    easing: 'ease-in-out',
});

// Initialize Typed.js for Hero Section
window.typed = new Typed('#typed-output', {
    strings: [
        "Innovative Media Solutions.",
        "Creative Content.",
        "Strategic Communication.",
        "Digital Presence Management.",
        "Your Brand Story.",
        "Measurable Impact.",
        "Future-Proof Communication." // Added another string
    ],
    typeSpeed: 40,
    backSpeed: 20,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true,
});


// --- Theme Color Scheme Toggle Logic ---
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

// Helper function to get RGB values from a hex string (Needed for rgba CSS)
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Function to set the color scheme ('default' or 'scheme-alt')
function setColorScheme(scheme) {
    const root = document.documentElement;
    if (scheme === 'scheme-alt') {
        body.classList.add('scheme-alt');
        // You might change the icon here if you have different icons for schemes
        // modeIcon.classList.remove('fa-palette'); // Example
        // modeIcon.classList.add('fa-star'); // Example

        // Optional: Update RGB variables for semi-transparent backgrounds if needed
        // const primaryAltRgb = hexToRgb('#ff00ff'); // Replace with actual hex from CSS
        // root.style.setProperty('--primary-color-rgb', `${primaryAltRgb.r},${primaryAltAltRgb.g},${primaryAltRgb.b}`);
        // const secondaryAltRgb = hexToRgb('#8a2be2'); // Replace with actual hex from CSS
        // root.style.setProperty('--secondary-color-rgb', `${secondaryAltRgb.r},${secondaryAltRgb.g},${secondaryAltRgb.b}`);

    } else { // Default scheme
        body.classList.remove('scheme-alt');
        // Reset icon if changed
        // modeIcon.classList.remove('fa-star'); // Example
        // modeIcon.classList.add('fa-palette'); // Example

        // Optional: Update RGB variables back to default if needed
        // const primaryDefaultRgb = hexToRgb('#00ffff'); // Replace with actual hex from CSS
        // root.style.setProperty('--primary-color-rgb', `${primaryDefaultRgb.r},${primaryDefaultRgb.g},${primaryDefaultRgb.b}`);
         // const secondaryDefaultRgb = hexToRgb('#00bfff'); // Replace with actual hex from CSS
        // root.style.setProperty('--secondary-color-rgb', `${secondaryDefaultRgb.r},${secondaryDefaultRgb.g},${secondaryDefaultRgb.b}`);
    }
    // Save the user's preference
    localStorage.setItem('collepediaColorScheme', scheme);
}

// Load color scheme preference on page load
const savedScheme = localStorage.getItem('collepediaColorScheme');

if (savedScheme) {
    setColorScheme(savedScheme);
} else {
     // Default to the base scheme defined in CSS :root
     setColorScheme('default');
}

// Add event listener to the mode toggle button
modeToggle.addEventListener('click', () => {
    const currentScheme = body.classList.contains('scheme-alt') ? 'scheme-alt' : 'default';
    setColorScheme(currentScheme === 'default' ? 'scheme-alt' : 'default');
});


// --- Mobile Menu Toggle Logic ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');
const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link-mobile');
const navbar = document.getElementById('navbar');

// Function to open the mobile menu
function openMobileMenu() {
    // Add a class to the body to prevent scrolling
    body.classList.add('menu-open');
    // Display the menu and overlay (CSS handles transform and opacity transition)
    mobileMenu.style.display = 'block'; // Make it block to allow transition
    mobileMenuOverlay.style.display = 'block'; // Make overlay block

    // Allow CSS transition to run
    setTimeout(() => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.style.opacity = '1';
    }, 10); // A small delay is often needed
}

// Function to close the mobile menu
function closeMobileMenu() {
    // Remove class from body
    body.classList.remove('menu-open');
    // Trigger CSS transition to hide
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.style.opacity = '0';

    // Hide elements completely after transition
    setTimeout(() => {
        mobileMenu.style.display = 'none';
        mobileMenuOverlay.style.display = 'none';
    }, 300); // Match CSS transition duration
}

// Add event listeners
mobileMenuButton.addEventListener('click', openMobileMenu);
closeMobileMenuButton.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu); // Close when clicking overlay

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Add a small delay to allow smooth scroll to start before closing menu
        setTimeout(closeMobileMenu, 300); // Match close transition duration
    });
});

// Close mobile menu on escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMobileMenu();
    }
});


// --- Smooth Scrolling for internal links ---
// (This is already included in the HTML <script> block, no changes needed here unless moving it)
// It's good practice to keep it in the main script.js file.
// Let's move it here for better organization.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust scroll position to account for fixed navbar
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// --- Custom Animations (Using AnimeJS) ---

// Example: Animate elements within sections as they appear (alternative or addition to AOS)
// Requires Intersection Observer
// const sectionsToAnimate = document.querySelectorAll('section');

// const sectionObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // Animate children elements (e.g., h2, p, cards)
//             const elementsToAnimate = entry.target.querySelectorAll('h2, p, .card, .icon-box');
//             anime({
//                 targets: elementsToAnimate,
//                 opacity: [0, 1],
//                 translateY: [50, 0],
//                 delay: anime.stagger(100, {start: 200}), // Stagger effect
//                 easing: 'easeOutExpo',
//                 duration: 800
//             });
//             observer.unobserve(entry.target); // Stop observing
//         }
//     });
// }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

// sectionsToAnimate.forEach(section => {
//     sectionObserver.observe(section);
// });


// Example: Pulse animation for the mode toggle button icon
// anime({
//     targets: '#mode-icon',
//     scale: [1, 1.1, 1],
//     opacity: [0.8, 1, 0.8],
//     easing: 'easeInOutSine',
//     duration: 1500,
//     loop: true,
//     direction: 'alternate',
// });


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


// --- Optional: Animate Navbar Background Opacity on Scroll ---
// If you add a '.scrolled' class to the navbar
// const navbar = document.getElementById('navbar');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });


