// Smooth scrolling with floating effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 80; // Adjust this value based on your header height
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Responsive navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Reveal sections on scroll
const revealSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.add('fade-in');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

revealSections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Animated text in hero section
const animateHeroText = () => {
  const heroText = document.querySelectorAll('#hero .animated-text');
  heroText.forEach((text, index) => {
    setTimeout(() => {
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)';
    }, index * 500);
  });
};

window.addEventListener('load', animateHeroText);

// Hover effect for projects, experiences, and volunteering
const hoverElements = document.querySelectorAll('.project, .experience, .volunteering');

hoverElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateY(-10px)';
    element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateY(0)';
    element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Typing effect for hero section
// Typing effect for hero section
const typingEffect = () => {
  const text = "Hello, I'm Heet Mehta";
  const typingElement = document.querySelector('#hero h1');
  typingElement.textContent = ''; // Clear existing content
  let i = 0;

  const typing = setInterval(() => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
};

window.addEventListener('load', typingEffect);


