// Smooth scroll behavior
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

// Intersection Observer for scroll animations
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

// Observe all pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    observer.observe(card);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Pricing card hover effects
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contact card click tracking
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('click', function (e) {
        // Add a ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic pricing highlight on scroll
const highlightPrices = () => {
    const prices = document.querySelectorAll('.price-value.highlight');
    prices.forEach(price => {
        const rect = price.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            price.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
};

window.addEventListener('scroll', highlightPrices);
highlightPrices(); // Initial call

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Feature item hover effect
const featureItems = document.querySelectorAll('.feature-item');

featureItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.check-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    item.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.check-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '0';
    indicator.style.left = '0';
    indicator.style.height = '3px';
    indicator.style.background = 'linear-gradient(90deg, #2962FF 0%, #00E676 100%)';
    indicator.style.zIndex = '9999';
    indicator.style.transition = 'width 0.1s ease';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// Button click effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Console easter egg
console.log('%c🚀 TradingView.vn', 'color: #2962FF; font-size: 24px; font-weight: bold;');
console.log('%cGiá tốt nhất thị trường! 💰', 'color: #00E676; font-size: 16px;');
console.log('%cLiên hệ: Zalo 0986595475 | Telegram @dinhtienvu', 'color: #B2B5BE; font-size: 12px;');

// First visit affiliate redirect with 30-day expiry
(function () {
    const AFF_URL = 'https://vn.tradingview.com/?aff_id=122256';
    const STORAGE_KEY = 'tv_aff_last_redirect';
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

    const shouldRedirect = () => {
        const lastRedirect = localStorage.getItem(STORAGE_KEY);
        if (!lastRedirect) return true;

        const now = Date.now();
        return (now - parseInt(lastRedirect)) > THIRTY_DAYS_MS;
    };

    // Function to open affiliate link with preservation of context
    const openAffiliate = () => {
        if (shouldRedirect()) {
            // Set current timestamp
            localStorage.setItem(STORAGE_KEY, Date.now().toString());

            // Get current URL
            const currentUrl = window.location.href;

            // Open current page in a new tab (so user doesn't lose our site)
            const newTab = window.open(currentUrl, '_blank');

            if (newTab) {
                // Redirect THE CURRENT ACTIVE TAB to the affiliate link
                window.location.href = AFF_URL;
            }
        }
    };

    // Listen for the first interaction
    const triggerEvents = ['click', 'touchstart'];

    const handleFirstInteraction = () => {
        if (shouldRedirect()) {
            openAffiliate();
        }
        // Remove listeners after first attempt
        triggerEvents.forEach(event => {
            document.removeEventListener(event, handleFirstInteraction);
        });
    };

    if (shouldRedirect()) {
        triggerEvents.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { passive: true });
        });
    }
})();
