document.addEventListener('DOMContentLoaded', () => {
  // Language Toggle
  let currentLang = 'en';
  const langToggle = document.getElementById('langToggle');
  const langText = langToggle.querySelector('.lang-text');

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW';
    langText.textContent = lang === 'en' ? '中文' : 'EN';
    
    // Update all elements with data-en and data-zh attributes
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
      if (text) {
        // Check if the text contains HTML entities or tags
        if (text.includes('<') || text.includes('&lt;') || text.includes('&gt;')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Save preference
    localStorage.setItem('preferredLang', lang);
  }

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'zh' : 'en');
  });

  // Check for saved language preference (default to English)
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  if (savedLang !== 'en') {
    setLanguage(savedLang);
  }

  // Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatedElements = document.querySelectorAll('.section-title, .about-text, .stat-card, .timeline-item, .talk-card, .course-card, .award-item');
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
});

// Add scroll event for navbar styling
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
