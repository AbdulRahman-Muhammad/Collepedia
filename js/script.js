// js/script.js

// --- Library Initializations ---

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // animation duration in milliseconds
    once: true, // whether animation should only happen once - default
    mirror: false, // whether elements should animate out when scrolling past them
    easing: 'ease-in-out', // default easing for AOS animations
});

// Initialize Typed.js for Hero Section
// Make instances globally accessible if needed elsewhere
window.typedEn = new Typed('#typed-output', {
    strings: [
        "innovative media solutions.",
        "creative content.",
        "strategic communication.",
        "digital presence management."
    ],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true
});

// Note: The Arabic Typed.js instance will be initialized
// in index-ar.html's script block.


// --- Dark Mode Toggle Logic ---
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

// Function to set the theme based on mode ('light' or 'dark')
function setMode(mode) {
    if (mode === 'dark') {
        body.classList.add('dark-mode'); // Add dark mode class to body
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon'); // Change icon to moon
    } else { // Default to light mode
        body.classList.remove('dark-mode'); // Remove dark mode class
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun'); // Change icon to sun
    }
    // Save the user's preference in Local Storage
    localStorage.setItem('collepediaMode', mode);
}

// Load mode preference on page load
// Check system preference first, then local storage
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('collepediaMode');

if (savedMode) {
    // If a preference is saved, use it
    setMode(savedMode);
} else if (prefersDarkMode) {
    // If no preference is saved and system prefers dark, use dark
    setMode('dark');
} else {
    // Otherwise, default to light mode
    setMode('light');
}

// Add event listener to the mode toggle button
modeToggle.addEventListener('click', () => {
    // Determine the current mode and switch to the opposite
    const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    setMode(currentMode === 'light' ? 'dark' : 'light');
});


// --- Smooth Scrolling for internal links ---
// (This is already included in the HTML <script> block for simplicity,
// but can be moved here if preferred)


// --- Custom Animations (Example using AnimeJS) ---
// You can add specific AnimeJS animations here, triggered by events
// or when elements become visible (possibly integrated with AOS or ScrollTrigger if added)

// Example: Animate service icons on hover
document.querySelectorAll('#services .card i').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        anime({
            targets: icon,
            scale: [1, 1.1], // Scale up slightly
            translateY: [0, -5], // Move up slightly
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    icon.addEventListener('mouseout', () => {
        anime({
            targets: icon,
            scale: [1.1, 1], // Scale back down
            translateY: [-5, 0], // Move back down
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Example: Animate testimonial cards on hover
document.querySelectorAll('#testimonials .testimonial-card').forEach(card => {
     card.addEventListener('mouseover', () => {
         anime({
             targets: card,
             boxShadow: '0 8px 25px var(--testimonial-card-shadow)', // Enhance shadow
             duration: 300,
             easing: 'easeOutQuad'
         });
     });
     card.addEventListener('mouseout', () => {
          anime({
             targets: card,
             boxShadow: '0 4px 15px var(--testimonial-card-shadow)', // Revert shadow
             duration: 300,
             easing: 'easeOutQuad'
         });
     });
 });


// --- Optional: Simple Parallax Effect (JS based) ---
// Requires an element with class 'bg-parallax' and a background image
// Add this section ONLY if you use the .bg-parallax div in your HTML
// window.addEventListener('scroll', function() {
//     const parallax = document.querySelector('.bg-parallax');
//     if (parallax) {
//         let scrollPosition = window.pageYOffset;
//         // Adjust the '-0.5' value to control the speed of the parallax effect
//         parallax.style.transform = 'translateY(' + scrollPosition * -0.3 + 'px)';
//     }
// });


