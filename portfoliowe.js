// Modern Portfolio JavaScript with Enhanced Animations

document.addEventListener('DOMContentLoaded', function() {
  // Loading animation
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);

  // Hide loading after page is fully loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.remove();
      }, 500);
    }, 1000);
  });

  // Create animated particles background
  createParticles();

  // Initialize all animations and interactions
  initScrollAnimations();
  initNavigation();
  initHeroAnimations();
  initCardAnimations();
  initBackToTop();
  initParallaxEffects();
});

// Particle system for background
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and animation timing
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particlesContainer.appendChild(particle);
  }
}

// Enhanced scroll animations
function initScrollAnimations() {
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (scrollY > lastScrollY && scrollY > 300) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
  });

  // Reveal sections with intersection observer
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Add stagger effect for child elements
        const children = entry.target.querySelectorAll('.project, .experience, .volunteering, .education, .certifications-list li');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Modern navigation
function initNavigation() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scrolling with enhanced easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced hero animations
function initHeroAnimations() {
  const heroSection = document.querySelector('#hero');
  const heroTitle = document.querySelector('#hero h1');
  const heroSubtitle = document.querySelector('#hero p');

  // Typing effect for hero title
  if (heroTitle) {
    const text = "Hello, I'm Heet Mehta";
    heroTitle.textContent = '';
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    let i = 0;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
        heroTitle.style.borderRight = '3px solid rgba(255,255,255,0.75)';
        heroTitle.style.animation = 'blink 1s infinite';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }
    }, 100);
  }

  // Animate hero subtitle
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 2000);
  }

  // Mouse movement parallax effect for hero shapes
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const shapes = heroSection.querySelectorAll('.shape');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
}

// Enhanced card animations
function initCardAnimations() {
  const cards = document.querySelectorAll('.project, .experience, .volunteering, .education, .certifications-list li');

  cards.forEach(card => {
    // Initially hide for stagger effect
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });

    // Add subtle animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    observer.observe(card);
  });
}

// Enhanced back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
  }

  const backToTop = document.getElementById('back-to-top');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'block';
      setTimeout(() => {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'scale(1)';
      }, 10);
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'scale(0.8)';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTop.style.display = 'none';
        }
      }, 300);
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Parallax effects
function initParallaxEffects() {
  const heroSection = document.querySelector('#hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');
    
    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Add CSS for blink animation
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
  @keyframes blink {
    0%, 50% { border-color: rgba(255,255,255,0.75); }
    51%, 100% { border-color: transparent; }
  }
`;
document.head.appendChild(blinkStyle);

// Add intersection observer for image lazy loading
function initLazyLoading() {
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
}

// Enhanced scrolling behavior
function smoothScrollBehavior() {
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Custom easing function for smoother scroll
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });
}

// Add performance monitoring
function initPerformanceMonitoring() {
  // Monitor scroll performance
  let ticking = false;
  
  function updateScrollEffects() {
    // Update scroll-based animations here
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
  // Recalculate positions and sizes if needed
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    particle.style.left = Math.random() * 100 + '%';
  });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Add focus management for accessibility
const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
focusableElements.forEach(element => {
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid #00d2ff';
    element.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', () => {
    element.style.outline = 'none';
  });
});

// Add theme detection (in case user prefers dark mode)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

console.log('Modern Portfolio loaded successfully! 🚀');


