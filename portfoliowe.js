// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileMenu()
  initScrollEffects()
  initBackToTop()
  initSmoothScrolling()
  initTypingEffect()
  initParticleEffect()
  initBinaryRain() // Add this line
  initLoadingScreen()
  initScrollAnimations()
})

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn")
  const navLinks = document.querySelector(".nav-links")
  const navItems = document.querySelectorAll(".nav-links a")

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Animate hamburger icon
      const icon = menuBtn.querySelector("i")
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })

    // Close menu when clicking on nav items
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        const icon = menuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active")
        const icon = menuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }
}

// Scroll Effects
function initScrollEffects() {
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Header background opacity
    if (scrollTop > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)"
      header.style.backdropFilter = "blur(20px)"
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Typing Effect for Hero Section
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-container h1")
  if (heroTitle) {
    const text = "Hi, I'm Heet Mehta"
    heroTitle.innerHTML = ""
    heroTitle.style.textAlign = "center"
    heroTitle.style.display = "block"
    heroTitle.style.width = "100%"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML = text.substring(0, i + 1)
        i++
        setTimeout(typeWriter, 150)
      } else {
        // Add blinking cursor
        heroTitle.innerHTML = text + '<span class="cursor">|</span>'

        // Remove cursor after 3 seconds
        setTimeout(() => {
          const cursor = heroTitle.querySelector(".cursor")
          if (cursor) cursor.remove()
        }, 3000)
      }
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1000)
  }
}

// Particle Effect Enhancement
function initParticleEffect() {
  const animatedBg = document.querySelector(".animated-background")

  // Remove old shapes and add coder elements
  animatedBg.innerHTML = ""

  const coderSymbols = [
    "</>",
    "{}",
    "[]",
    "()",
    "&&",
    "||",
    "=>",
    "!=",
    "++",
    "--",
    "===",
    "!==",
    "??",
    "...",
    "->",
    "<-",
    "//",
    "/*",
    "*/",
    "::",
  ]

  // Create 15 floating coder elements
  for (let i = 0; i < 15; i++) {
    const element = document.createElement("div")
    element.className = "coder-element"
    element.textContent = coderSymbols[i % coderSymbols.length]
    element.style.fontSize = `${Math.random() * 1 + 1.2}rem`
    element.style.top = `${Math.random() * 100}%`
    element.style.left = `${Math.random() * 100}%`
    element.style.animationDelay = `${Math.random() * 6}s`
    element.style.animationDuration = `${Math.random() * 4 + 6}s`

    animatedBg.appendChild(element)
  }

  // Add interactive hover effect for coder elements
  const coderElements = document.querySelectorAll(".coder-element")
  coderElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.opacity = "0.4"
      element.style.transform = "scale(1.3)"
      element.style.color = "var(--secondary-accent)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.opacity = "0.1"
      element.style.transform = "scale(1)"
      element.style.color = "var(--accent-color)"
    })
  })
}

// Add binary rain effect for extra coder vibe:
function initBinaryRain() {
  const binaryContainer = document.createElement("div")
  binaryContainer.className = "binary-rain"
  binaryContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
  `
  document.body.appendChild(binaryContainer)

  // Create binary columns
  for (let i = 0; i < 20; i++) {
    const column = document.createElement("div")
    column.style.cssText = `
      position: absolute;
      top: -100%;
      left: ${i * 5}%;
      width: 2px;
      height: 100px;
      background: linear-gradient(transparent, var(--accent-color), transparent);
      opacity: 0.05;
      animation: binary-fall ${Math.random() * 3 + 2}s linear infinite;
      animation-delay: ${Math.random() * 2}s;
    `
    binaryContainer.appendChild(column)
  }
}

// Loading Screen
function initLoadingScreen() {
  // Create loading screen
  const loadingScreen = document.createElement("div")
  loadingScreen.className = "loading"
  document.body.appendChild(loadingScreen)

  // Remove loading screen after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }, 1000)
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")

        // Add stagger effect for grid items
        const gridItems = entry.target.querySelectorAll(".education, .project, .experience, .volunteering")
        gridItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Add CSS for cursor animation
const style = document.createElement("style")
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: var(--accent-color);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .education, .project, .experience, .volunteering {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
`
document.head.appendChild(style)

// Add interactive hover effects
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".education, .project, .experience, .volunteering")

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
    } else {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    }
  })
})

// Add glitch effect to logo on hover
const logo = document.querySelector(".logo a")
if (logo) {
  logo.addEventListener("mouseenter", () => {
    logo.style.animation = "glitch 0.3s ease-in-out"
  })

  logo.addEventListener("animationend", () => {
    logo.style.animation = ""
  })
}

// Add glitch animation
const glitchStyle = document.createElement("style")
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`
document.head.appendChild(glitchStyle)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll-based animations can be added here
}, 16) // ~60fps

window.addEventListener("scroll", throttledScrollHandler)

// Add easter egg - Konami code
const konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s infinite"
    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)
  }
})

// Rainbow animation for easter egg
const rainbowStyle = document.createElement("style")
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(rainbowStyle)
