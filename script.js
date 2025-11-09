// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link with pre-filled email
        const emailSubject = encodeURIComponent(subject || 'Contact from Portfolio');
        const emailBody = encodeURIComponent(
            `Hello,\n\n` +
            `You have received a message from your portfolio contact form.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n\n` +
            `---\nThis email was sent from your portfolio contact form.`
        );
        
        // Open default email client
        const mailtoLink = `mailto:adithyaa.kgm@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            alert('Your default email client should open. If it doesn\'t, please send an email to adithyaa.kgm@gmail.com');
        }, 500);
        
        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class styling for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Make skills clickable to open Wikipedia
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Map skill names to Wikipedia-friendly URLs
    const wikipediaMap = {
        'HTML5': 'HTML5',
        'CSS3': 'CSS',
        'JavaScript': 'JavaScript',
        'React': 'React_(JavaScript_library)',
        'Vue.js': 'Vue.js',
        'TypeScript': 'TypeScript',
        'Node.js': 'Node.js',
        'Python': 'Python_(programming_language)',
        'Express': 'Express.js',
        'MongoDB': 'MongoDB',
        'PostgreSQL': 'PostgreSQL',
        'REST APIs': 'REST',
        'Git': 'Git',
        'Docker': 'Docker_(software)',
        'AWS': 'Amazon_Web_Services',
        'Figma': 'Figma_(software)',
        'CI/CD': 'CI/CD',
        'Agile': 'Agile_software_development'
    };
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const skillName = tag.textContent.trim();
            
            // Get Wikipedia page name, fallback to skill name if not in map
            const wikiPage = wikipediaMap[skillName] || skillName.replace(/\s+/g, '_');
            
            // Open Wikipedia in new tab
            const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikiPage}`;
            window.open(wikipediaUrl, '_blank');
        });
    });

    // Make project cards clickable to open Wikipedia
    const projectCards = document.querySelectorAll('.project-card');
    
    // Map project types to Wikipedia pages
    const projectWikipediaMap = {
        'ecommerce': 'E-commerce',
        'task-management': 'Task_management',
        'weather-dashboard': 'Weather_forecasting'
    };
    
    projectCards.forEach(card => {
        // Make card look clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links inside the card
            if (e.target.tagName === 'A') {
                return;
            }
            
            const projectType = card.getAttribute('data-project');
            const wikiPage = projectWikipediaMap[projectType] || 'Web_application';
            
            // Open Wikipedia in new tab
            const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikiPage}`;
            window.open(wikipediaUrl, '_blank');
        });
    });
});

