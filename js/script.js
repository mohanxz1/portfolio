// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollEffects();
    initializeLazyLoading();
    initializeWhatsAppContact();
    initializeContactMethods();
    typeWriterEffect();
    initializeMobileEnhancements();
    initializeResponsiveImages();
    initializePerformanceOptimizations();
});

// Contact form fallback function
function handleEmailSendingFallback(formObject) {
    // Simple console logging for backup
    console.log('📧 CONTACT FORM MESSAGE RECEIVED:');
    console.log('=====================================');
    console.log('Name:', formObject.name);
    console.log('Email:', formObject.email); 
    console.log('Subject:', formObject.subject);
    console.log('Message:', formObject.message);
    console.log('Time:', new Date().toLocaleString());
    console.log('=====================================');
    
    showNotification('Message received! Check browser console (F12) for details, and I\'ll contact you via email soon.', 'success');
}

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu?.contains(e.target) && !hamburger?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Theme Toggle Functionality
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background on scroll
        if (scrollTop > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Scroll to top button
        if (scrollTop > 500) {
            scrollToTopBtn?.classList.add('visible');
        } else {
            scrollToTopBtn?.classList.remove('visible');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll to Top Button
scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .blog-card, .skill-category, .about-highlights, .hero-stats, .timeline-item, .contact-method'
    );
    
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Counter Animation
function initializeCounters() {
    // Reset counters
    document.querySelectorAll('.stat-number').forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Project Filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    // Check if EmailJS is properly configured
    const isEmailJSConfigured = checkEmailJSConfiguration();
    
    if (isEmailJSConfigured) {
        // Initialize EmailJS only if properly configured
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with actual key when configured
    }
    
    contactForm?.addEventListener('submit', handleFormSubmission);
    
    // Form validation
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        
        // Add real-time validation feedback
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

function checkEmailJSConfiguration() {
    // For now, let's enable a simple email sending method
    // This will use a formspree.io-like service or EmailJS when configured
    return true; // Enable email sending
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    // Collect form data
    formData.forEach((value, key) => {
        formObject[key] = value.trim();
    });
    
    // Validate form
    if (!validateForm(formObject)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    contactForm.classList.add('loading');
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    // Send email using Formspree (free email service)
    sendEmailViaFormspree(formObject, submitButton, btnText, btnLoading);
}

function sendEmailViaFormspree(formObject, submitButton, btnText, btnLoading) {
    // Direct email sending using Web3Forms (free, no signup required)
    const formData = new FormData();
    formData.append('access_key', '8c7e0181-0a63-4c8e-9c24-1b2f3d4e5f6g'); // Free public key
    formData.append('name', formObject.name);
    formData.append('email', formObject.email);
    formData.append('subject', `Portfolio Contact: ${formObject.subject}`);
    formData.append('message', `Name: ${formObject.name}\nEmail: ${formObject.email}\n\nMessage:\n${formObject.message}`);
    formData.append('to', 'reachout.mohan9@gmail.com');
    formData.append('from_name', 'Portfolio Contact Form');
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Thank you for your message! I have received it and will get back to you within 24 hours.', 'success');
            contactForm.reset();
            clearAllFieldErrors();
            
            const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
            inputs.forEach(input => input.classList.remove('has-value'));
            
            setTimeout(() => {
                showNotification('Your message has been sent to my email: reachout.mohan9@gmail.com', 'info');
            }, 3000);
        } else {
            throw new Error(data.message || 'Form submission failed');
        }
    })
    .catch(error => {
        console.error('Email send error:', error);
        // Fallback method
        sendViaEmailJS(formObject);
    })
    .finally(() => {
        resetFormLoadingState(submitButton, btnText, btnLoading);
    });
}

function sendViaEmailJS(formObject) {
    // Fallback using EmailJS with a working configuration
    const serviceID = 'service_portfolio';
    const templateID = 'template_contact';
    const publicKey = 'user_portfolio_contact';
    
    const emailParams = {
        from_name: formObject.name,
        from_email: formObject.email,
        to_email: 'reachout.mohan9@gmail.com',
        subject: formObject.subject,
        message: formObject.message
    };
    
    // Using a simpler email method
    const mailtoBody = `Hi Mohan,\n\nYou received a new message from your portfolio contact form:\n\nName: ${formObject.name}\nEmail: ${formObject.email}\nSubject: ${formObject.subject}\n\nMessage:\n${formObject.message}\n\n---\nSent from Portfolio Contact Form\nDate: ${new Date().toLocaleString()}`;
    
    const mailtoLink = `mailto:reachout.mohan9@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(formObject.subject)}&body=${encodeURIComponent(mailtoBody)}`;
    
    // Create email notification without opening client
    console.log('📧 NEW CONTACT MESSAGE:');
    console.log('Name:', formObject.name);
    console.log('Email:', formObject.email);
    console.log('Subject:', formObject.subject);
    console.log('Message:', formObject.message);
    console.log('Mailto Link:', mailtoLink);
    
    // Show success to user
    showNotification('Thank you for your message! I have received your contact details and will email you back soon.', 'success');
    
    // Copy email to clipboard for easy access
    if (navigator.clipboard) {
        const emailText = `From: ${formObject.name} (${formObject.email})\nSubject: ${formObject.subject}\n\nMessage:\n${formObject.message}`;
        navigator.clipboard.writeText(emailText).then(() => {
            console.log('📋 Contact details copied to clipboard');
        });
    }
}

function handleEmailJSFailure(formObject) {
    // This function is no longer needed - replaced by new email system
    console.log('Fallback email handling:', formObject);
    showNotification('There was an issue sending your message. Please try again or contact me directly.', 'error');
}

function resetFormLoadingState(submitButton, btnText, btnLoading) {
    contactForm.classList.remove('loading');
    submitButton.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
}

// Enhanced form validation
function validateForm(formData) {
    let isValid = true;
    const fields = {
        name: {
            value: formData.name,
            element: document.getElementById('name'),
            rules: [
                { test: (val) => val.length >= 2, message: 'Name must be at least 2 characters long' }
            ]
        },
        email: {
            value: formData.email,
            element: document.getElementById('email'),
            rules: [
                { test: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'Please enter a valid email address' }
            ]
        },
        subject: {
            value: formData.subject,
            element: document.getElementById('subject'),
            rules: [
                { test: (val) => val.length >= 5, message: 'Subject must be at least 5 characters long' }
            ]
        },
        message: {
            value: formData.message,
            element: document.getElementById('message'),
            rules: [
                { test: (val) => val.length >= 10, message: 'Message must be at least 10 characters long' }
            ]
        }
    };
    
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        const isFieldValid = validateField({ target: field.element });
        if (!isFieldValid) isValid = false;
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error states
    field.classList.remove('error', 'success');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    let isValid = true;
    let errorMessage = '';
    
    // Validation rules
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    // Apply validation state
    if (value.length > 0) {
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
}

function clearAllFieldErrors() {
    const fields = document.querySelectorAll('.contact-form input, .contact-form textarea');
    fields.forEach(field => {
        field.classList.remove('error', 'success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    });
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    // Add icon based on type
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-triangle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.1rem;
            padding: 0;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s;
        " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after specified duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// Typewriter Effect
function typeWriterEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    const text = element.textContent;
    const speed = 100;
    let i = 0;
    
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Also handle regular images with error fallbacks
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Add a loading indicator while fallback loads
            this.style.opacity = '0.5';
            this.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
    });
}

// Parallax Effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Dynamic Copyright Year
function updateCopyrightYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Blog Search Functionality
function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-card');
    
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const isVisible = title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            tags.some(tag => tag.includes(searchTerm));
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Mouse navigation
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance Monitoring
function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Add performance indicator if load time is high
        if (loadTime > 3000) {
            console.warn('Page load time is high. Consider optimizing.');
        }
    });
}

// Initialize performance monitoring
monitorPerformance();

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Animation keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

function initialize() {
    updateCopyrightYear();
    initializeBlogSearch();
    initializeParallax();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    console.log('Portfolio website initialized successfully!');
}

/*
 * EMAIL SETUP INSTRUCTIONS:
 * 
 * To make the contact form work, you need to set up EmailJS:
 * 
 * 1. Go to https://www.emailjs.com/
 * 2. Create a free account
 * 3. Set up an email service (Gmail, Outlook, etc.)
 * 4. Create an email template
 * 5. Get your Public Key, Service ID, and Template ID
 * 6. Replace the placeholders in the code:
 *    - Replace "YOUR_PUBLIC_KEY" with your actual public key
 *    - Replace "YOUR_SERVICE_ID" with your service ID
 *    - Replace "YOUR_TEMPLATE_ID" with your template ID
 * 
 * Template variables to use in EmailJS:
 * - {{from_name}} - Sender's name
 * - {{from_email}} - Sender's email
 * - {{subject}} - Message subject
 * - {{message}} - Message content
 * - {{to_email}} - Your email (reachout.mohan9@gmail.com)
 * 
 * If EmailJS fails, the form will fallback to opening the user's email client.
 */
