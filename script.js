// Mobile menu functionality
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn i');
    
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
        mobileBtn.className = 'fas fa-bars';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = '#fbfdffff'; /* Dark blue */
        nav.style.padding = '1rem';
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        mobileBtn.className = 'fas fa-times';
    }
}

// Smooth scrolling for navigation links
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
        
        // Close mobile menu if open
        const nav = document.querySelector('.nav');
        if (nav.style.display === 'flex') {
            toggleMobileMenu();
        }
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('click', function(e) {
    if (e.target.type === 'submit') {
        e.preventDefault();
        if (validateForm()) {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
            
            // Log form data (in a real application, send to server)
            console.log('Form submitted:', data);
        }
    }
});

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
    `;
    
    // Insert before the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

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

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.value-item, .service-card, .industry-item, .benefit-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(243, 245, 248, 0.95)'; /* Dark blue with opacity */
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#eaedf0ff'; /* Dark blue */
        header.style.backdropFilter = 'none';
    }
});

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#2E6BB4'; /* Medium blue for error */
            isValid = false;
        } else {
            input.style.borderColor = '#4A90E2'; /* Light blue */
        }
    });
    
    // Email validation
    const email = form.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#2E6BB4'; /* Medium blue */
        isValid = false;
    }
    
    return isValid;
}

// Add real-time validation
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#2E6BB4'; /* Medium blue */
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.style.borderColor = emailRegex.test(this.value) ? '#4A90E2' : '#2E6BB4'; /* Light blue or medium blue */
        } else {
            this.style.borderColor = '#4A90E2'; /* Light blue */
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#f4f5f8ff'; /* Light text */
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4A90E2; /* Light blue */
        color: #1A2A44; /* Dark blue */
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTop();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(232, 234, 236, 0.95)'; /* Dark blue with opacity */
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#f1f4f8ff'; /* Dark blue */
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
const form = document.getElementById('contactForm');
const successMsg = document.querySelector('.success-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        successMsg.classList.add('show');
        form.reset();
    } else {
        alert("Oops! There was a problem submitting your form.");
    }
});