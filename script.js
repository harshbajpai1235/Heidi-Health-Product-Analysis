// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.overview-card, .feature-item, .insight-card, .contribution-card, .recommendation-card, .advantage-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Counter animation for hero stats
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(0) + (target === 2 ? 'x' : target === 65000 ? 'K' : '%');
        }, 20);
    };

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('50%')) {
                        animateCounter(stat, 50);
                    } else if (text.includes('$65K')) {
                        animateCounter(stat, 65);
                    } else if (text.includes('2x')) {
                        animateCounter(stat, 2);
                    }
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);

    // Add hover effects for cards
    const cards = document.querySelectorAll('.overview-card, .insight-card, .contribution-card, .recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for floating card
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            floatingCard.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.display = 'none';
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuToggle);
    
    // Show mobile menu toggle on small screens
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            document.querySelector('.nav-menu').style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            document.querySelector('.nav-menu').style.display = 'flex';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mobile menu functionality
    mobileMenuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '70px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navMenu.style.display = 'none';
        }
    });
});

// Add CSS for mobile menu toggle
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-toggle {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #1e40af;
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;
        transition: background 0.3s ease;
    }
    
    .mobile-menu-toggle:hover {
        background: rgba(30, 64, 175, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style); 