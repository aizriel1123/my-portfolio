// Enhanced Navbar scroll effect with dropdown
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Show navbar when scrolling up, hide when scrolling down
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.remove('visible');
    } else {
        navbar.classList.add('visible');
    }
    
    // Add scrolled class for styling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
});

// Initialize navbar as visible
navbar.classList.add('visible');

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });

    skillPercentages.forEach((percent, index) => {
        const target = parseInt(percent.getAttribute('data-percent'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            percent.textContent = Math.round(current) + '%';
        }, 30);
    });
};

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Trigger skill bar animation on page load
window.addEventListener('load', () => {
    setTimeout(animateSkillBars, 500);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
});

// Tab Functionality
function initTabs() {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            const allButtons = button.parentElement.querySelectorAll('.tab-btn');
            allButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all tab contents
            const allTabContents = document.querySelectorAll('.tab-content');
            allTabContents.forEach(content => content.classList.remove('active'));

            // Show the selected tab content
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                tabContent.classList.add('active');
            }

            // Filter projects if applicable
            if (tabName === 'all' || ['web', 'design', 'research'].includes(tabName)) {
                filterProjects(tabName);
            }
        });
    });
}

// Filter Projects by Category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0.3';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

// Initialize tabs on page load
window.addEventListener('DOMContentLoaded', initTabs);

// Subtle parallax effect on hero section (capped, very small to avoid overlap)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    // apply a very small parallax shift and cap it so the hero can't move over the next section
    const shift = Math.min(scrolled * 0.02, window.innerHeight * 0.03); // max ~3% of viewport height
    hero.style.transform = `translateY(${shift}px)`;
});