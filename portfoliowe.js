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
  // Add this inside the DOMContentLoaded event listener, after other initializations
  initCodingMascot()
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

// Add this function after the other function definitions
function initCodingMascot() {
  const mascot = document.getElementById("codingMascot")
  const speech = document.getElementById("mascotSpeech")
  const particles = document.getElementById("codeParticles")

  if (!mascot) return

  const messages = [
    "Hey there, coder! 👋",
    "Nice portfolio! 💻",
    "Keep coding! 🚀",
    "console.log('Hi!') 📝",
    "Ready to debug? 🐛",
    "Code never sleeps! ⚡",
    "function awesome() 🎯",
    "Git commit -m 'Cool!' 📦",
    "Drag me around! 🎯",
    "I'm portable! 📱",
    "New position! 📍",
  ]

  let messageIndex = 0
  let isTyping = false
  let isDragging = false
  const dragOffset = { x: 0, y: 0 }

  // Make mascot draggable
  function initDragging() {
    let startX, startY, initialX, initialY

    // Mouse events
    mascot.addEventListener("mousedown", startDrag)
    document.addEventListener("mousemove", drag)
    document.addEventListener("mouseup", endDrag)

    // Touch events for mobile
    mascot.addEventListener("touchstart", startDragTouch, { passive: false })
    document.addEventListener("touchmove", dragTouch, { passive: false })
    document.addEventListener("touchend", endDrag)

    function startDrag(e) {
      if (e.target.closest(".mascot-speech")) return // Don't drag when clicking speech bubble

      isDragging = true
      mascot.style.cursor = "grabbing"
      mascot.style.zIndex = "9999"

      const rect = mascot.getBoundingClientRect()
      startX = e.clientX - rect.left
      startY = e.clientY - rect.top

      // Get current position
      const computedStyle = window.getComputedStyle(mascot)
      initialX = Number.parseInt(computedStyle.right) || 20
      initialY = Number.parseInt(computedStyle.bottom) || 20

      // Switch to absolute positioning
      mascot.style.position = "fixed"
      mascot.style.right = "auto"
      mascot.style.bottom = "auto"
      mascot.style.left = rect.left + "px"
      mascot.style.top = rect.top + "px"

      e.preventDefault()
    }

    function startDragTouch(e) {
      if (e.target.closest(".mascot-speech")) return

      const touch = e.touches[0]
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      })
      startDrag(mouseEvent)
      e.preventDefault()
    }

    function drag(e) {
      if (!isDragging) return

      const newX = e.clientX - startX
      const newY = e.clientY - startY

      // Boundary checking
      const maxX = window.innerWidth - mascot.offsetWidth
      const maxY = window.innerHeight - mascot.offsetHeight

      const boundedX = Math.max(0, Math.min(newX, maxX))
      const boundedY = Math.max(0, Math.min(newY, maxY))

      mascot.style.left = boundedX + "px"
      mascot.style.top = boundedY + "px"

      e.preventDefault()
    }

    function dragTouch(e) {
      if (!isDragging) return

      const touch = e.touches[0]
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      })
      drag(mouseEvent)
      e.preventDefault()
    }

    function endDrag() {
      if (!isDragging) return

      isDragging = false
      mascot.style.cursor = "pointer"
      mascot.style.zIndex = "999"

      // Show "New position!" message
      speech.textContent = "New position! 📍"
      setTimeout(() => {
        speech.textContent = messages[messageIndex]
      }, 2000)

      // Save position to localStorage
      const rect = mascot.getBoundingClientRect()
      localStorage.setItem(
        "mascotPosition",
        JSON.stringify({
          x: rect.left,
          y: rect.top,
        }),
      )
    }
  }

  // Load saved position
  function loadSavedPosition() {
    const savedPosition = localStorage.getItem("mascotPosition")
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition)

      // Ensure position is still valid (in case screen size changed)
      const maxX = window.innerWidth - mascot.offsetWidth
      const maxY = window.innerHeight - mascot.offsetHeight

      const boundedX = Math.max(0, Math.min(x, maxX))
      const boundedY = Math.max(0, Math.min(y, maxY))

      mascot.style.position = "fixed"
      mascot.style.right = "auto"
      mascot.style.bottom = "auto"
      mascot.style.left = boundedX + "px"
      mascot.style.top = boundedY + "px"
    }
  }

  // Initialize dragging
  initDragging()

  // Load saved position after a short delay
  setTimeout(loadSavedPosition, 100)

  // Change message on click (but not when dragging)
  mascot.addEventListener("click", (e) => {
    if (isDragging || isTyping) return

    isTyping = true
    messageIndex = (messageIndex + 1) % messages.length
    speech.textContent = messages[messageIndex]

    // Add bounce effect
    mascot.style.transform = "scale(1.1)"
    setTimeout(() => {
      mascot.style.transform = "scale(1)"
      isTyping = false
    }, 200)

    // Create code particles
    createCodeParticles()
  })

  // Auto-change message every 15 seconds (increased from 10)
  setInterval(() => {
    if (!isTyping && !isDragging) {
      messageIndex = (messageIndex + 1) % messages.length
      speech.textContent = messages[messageIndex]
    }
  }, 15000)

  // Create floating code particles
  function createCodeParticles() {
    const symbols = ["{}", "[]", "()", "=>", "++", "--", "&&", "||", "!=", "==="]

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement("div")
        particle.className = "code-particle"
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
        particle.style.left = Math.random() * 100 + "px"
        particle.style.animationDelay = Math.random() * 1 + "s"

        particles.appendChild(particle)

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 2000)
      }, i * 100)
    }
  }

  // Random particle generation
  setInterval(() => {
    if (Math.random() < 0.3 && !isDragging) {
      // 30% chance every 3 seconds, but not while dragging
      createCodeParticles()
    }
  }, 3000)

  // Mascot follows mouse slightly when hovered (but not while dragging)
  mascot.addEventListener("mouseenter", () => {
    if (!isDragging) {
      mascot.style.transform = "scale(1.05)"
    }
  })

  mascot.addEventListener("mouseleave", () => {
    if (!isDragging) {
      mascot.style.transform = "scale(1)"
    }
  })

  // Add keyboard interaction
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.ctrlKey) {
      e.preventDefault()
      if (!isDragging) {
        mascot.click()
      }
    }

    // Reset position with Ctrl+R
    if (e.code === "KeyR" && e.ctrlKey && e.shiftKey) {
      e.preventDefault()
      localStorage.removeItem("mascotPosition")
      mascot.style.position = "fixed"
      mascot.style.right = "20px"
      mascot.style.bottom = "20px"
      mascot.style.left = "auto"
      mascot.style.top = "auto"
      speech.textContent = "Back to default! 🏠"
      setTimeout(() => {
        speech.textContent = messages[messageIndex]
      }, 2000)
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (mascot.style.position === "fixed" && mascot.style.left !== "auto") {
      const rect = mascot.getBoundingClientRect()
      const maxX = window.innerWidth - mascot.offsetWidth
      const maxY = window.innerHeight - mascot.offsetHeight

      const boundedX = Math.max(0, Math.min(rect.left, maxX))
      const boundedY = Math.max(0, Math.min(rect.top, maxY))

      mascot.style.left = boundedX + "px"
      mascot.style.top = boundedY + "px"
    }
  })

  // Add visual feedback for dragging
  mascot.style.cursor = "pointer"
  mascot.style.userSelect = "none"

  // Add a subtle hint about dragging
  setTimeout(() => {
    if (!localStorage.getItem("mascotPosition")) {
      speech.textContent = "Drag me around! 🎯"
      setTimeout(() => {
        speech.textContent = messages[0]
      }, 3000)
    }
  }, 5000)
}
