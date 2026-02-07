// ===================================
// CYBERPUNK PORTFOLIO - JAVASCRIPT
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVIGATION
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
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
    
    
    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===================================
    // HERO STATS COUNTER
    // ===================================
    
    const statValues = document.querySelectorAll('.stat-value');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }
    
    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    
    // ===================================
    // SKILL BARS ANIMATION
    // ===================================
    
    const skillBars = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
        
        skillsAnimated = true;
    }
    
    // Trigger skill bars animation when about section is visible
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    
    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    
    // ===================================
    // TIMELINE ANIMATION
    // ===================================
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    
    // ===================================
    // PROJECT CARDS ANIMATION
    // ===================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    
    // ===================================
    // BLOG CARDS ANIMATION
    // ===================================
    
    const blogCards = document.querySelectorAll('.blog-card');
    
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    blogCards.forEach(card => {
        blogObserver.observe(card);
    });
    
    
    // ===================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this data to a server
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (for demonstration)
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    
    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ===================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ===================================
    
    const roleText = document.querySelector('.role-text');
    if (roleText) {
        const text = roleText.textContent;
        roleText.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                roleText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    
    // ===================================
    // CURSOR TRAIL EFFECT 
    // ===================================
    
    let cursorTrails = [];
    const maxTrails = 20;
    
    document.addEventListener('mousemove', function(e) {
        // Limit the number of trails for performance
        if (cursorTrails.length > maxTrails) {
            const oldTrail = cursorTrails.shift();
            oldTrail.remove();
        }
        
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'var(--primary-color)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.zIndex = '9999';
        trail.style.opacity = '0.5';
        trail.style.boxShadow = '0 0 10px var(--glow-color)';
        trail.style.transition = 'all 0.5s ease';
        
        document.body.appendChild(trail);
        cursorTrails.push(trail);
        
        // Fade out and remove
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 100);
        
        setTimeout(() => {
            trail.remove();
        }, 600);
    });
    
    
    // ===================================
    // PARALLAX EFFECT FOR SECTIONS
    // ===================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    
    // ===================================
    // GLITCH EFFECT ON HOVER
    // ===================================
    
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
    
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
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
    
    
    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    
    console.log('%c███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗', 'color: #00ff41; font-weight: bold;');
    console.log('%c██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝', 'color: #00ff41; font-weight: bold;');
    console.log('%c███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝ ', 'color: #00ff41; font-weight: bold;');
    console.log('%c╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝  ', 'color: #00ff41; font-weight: bold;');
    console.log('%c███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║   ', 'color: #00ff41; font-weight: bold;');
    console.log('%c╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝   ', 'color: #00ff41; font-weight: bold;');
    console.log('%c', '');
    console.log('%cWelcome to the matrix, hacker! 🔐', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%cLooking for vulnerabilities? Try the Konami Code! ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00d9ff; font-size: 12px;');
    
    
    // ===================================
    // KONAMI CODE EASTER EGG
    // ===================================
    
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Change color scheme temporarily
        document.documentElement.style.setProperty('--primary-color', '#ff006e');
        document.documentElement.style.setProperty('--secondary-color', '#00ff41');
        
        alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou\'ve unlocked the secret color scheme!');
        
        // Revert after 10 seconds
        setTimeout(() => {
            document.documentElement.style.setProperty('--primary-color', '#00ff41');
            document.documentElement.style.setProperty('--secondary-color', '#ff006e');
        }, 10000);
    }
    
    
    // ===================================
    // LAZY LOADING IMAGES (if images are added)
    // ===================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    
    // ===================================
    // LOADING ANIMATION
    // ===================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
});
