// ============================== //
//     NAVBAR SCROLL EFFECT       //
// ============================== //
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================== //
//      MOBILE MENU TOGGLE        //
// ============================== //
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================== //
//     ACTIVE NAV LINK ON SCROLL  //
// ============================== //
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ============================== //
//   COUNTER ANIMATION (STATS)    //
// ============================== //
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);


// ============================== //
//     PORTFOLIO FILTER           //
// ============================== //
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});


// ============================== //
//      CAROUSEL SLIDER           //
// ============================== //
function changeSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const counter = carousel.closest('.carousel-viewer').querySelector('.current-slide');

    let currentIndex = 0;

    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });

    // Remove active from current slide
    slides[currentIndex].classList.remove('active');

    // Calculate new index
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    // Add active to new slide
    slides[newIndex].classList.add('active');

    // Update counter
    if (counter) {
        counter.textContent = newIndex + 1;
    }
}

// Initialize carousel counters
document.querySelectorAll('.carousel-slides').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalCounter = carousel.closest('.carousel-viewer').querySelector('.total-slides');
    if (totalCounter) {
        totalCounter.textContent = slides.length;
    }
});

// Touch/Swipe support for carousels
document.querySelectorAll('.carousel-viewer').forEach(viewer => {
    let startX = 0;
    let endX = 0;

    viewer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const carouselId = viewer.querySelector('.carousel-slides').id;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                changeSlide(carouselId, 1); // Swipe left → next
            } else {
                changeSlide(carouselId, -1); // Swipe right → prev
            }
        }
    }, { passive: true });
});


// ============================== //
//        IMAGE LIGHTBOX          //
// ============================== //
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});


// ============================== //
//       BACK TO TOP BUTTON       //
// ============================== //
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================== //
//      SCROLL REVEAL ANIMATION   //
// ============================== //
const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-item, .linkedin-card, .carousel-showcase, .testimonial-card, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ============================== //
//      CONTACT FORM HANDLER      //
// ============================== //
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // You can integrate with:
    // 1. EmailJS (free) - https://www.emailjs.com/
    // 2. Formspree (free) - https://formspree.io/
    // 3. Google Forms

    // For now, show a success message
    alert('Thank you for your message! I\'ll get back to you within 24 hours. 🚀');
    e.target.reset();

    // ============================================
    // TO USE FORMSPREE (EASIEST - FREE):
    // ============================================
    // 1. Go to https://formspree.io/
    // 2. Create a free account
    // 3. Create a new form → get your form URL
    // 4. Change the <form> tag in HTML to:
    //    <form action="https://formspree.io/f/YOUR_ID" method="POST">
    // 5. Remove this JavaScript submit handler
    // ============================================
});


// ============================== //
//     FLOATING PARTICLES EFFECT  //
// ============================== //
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }
}

// Add float animation dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(${Math.random() * 200 - 100}px, -500px) rotate(720deg); opacity: 0; }
    }
    .hero-particles {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
    }
`;
document.head.appendChild(styleSheet);

createParticles();