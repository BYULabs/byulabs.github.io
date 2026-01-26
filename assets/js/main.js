// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Highlight active navigation link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || currentPath.startsWith(href + '/') || (href === '/' && currentPath === '/'))) {
            link.classList.add('active');
        }
    });
});

// News carousel functionality
let currentNewsIndex = 0;
const newsItems = document.querySelectorAll('.news-item');
const totalNews = newsItems.length;

function showNews(index) {
    newsItems.forEach(item => {
        item.classList.add('hidden');
    });
    newsItems[index].classList.remove('hidden');
}

function nextNews() {
    currentNewsIndex = (currentNewsIndex + 1) % totalNews;
    showNews(currentNewsIndex);
}

function prevNews() {
    currentNewsIndex = (currentNewsIndex - 1 + totalNews) % totalNews;
    showNews(currentNewsIndex);
}

// Initialize first news item
if (newsItems.length > 0) {
    showNews(0);
    setInterval(nextNews, 5000); // Auto-rotate every 5 seconds
}

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        // Form submission logic would go here
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
        this.reset();
    });
}