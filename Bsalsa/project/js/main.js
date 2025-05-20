// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoader();
  initNavigation();
  initScrollEffects();
  initBackToTop();
  initSocialShare();
  initCookieConsent();
});

// Loading Screen
function initLoader() {
  const loader = document.getElementById('loader');
  
  // Simulate loading time (can be removed in production and replaced with actual loading check)
  setTimeout(() => {
    loader.classList.add('hide');
    // Remove loader from DOM after animation completes
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2000);
}

// Navigation Functionality
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const header = document.getElementById('header');
  const navItems = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking a nav item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Change header background on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Set active nav item based on scroll position
  window.addEventListener('scroll', highlightNavOnScroll);
  
  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navItems.forEach(item => {
          item.classList.remove('active');
        });
        
        // Add active class to current nav link
        const activeNavItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeNavItem) {
          activeNavItem.classList.add('active');
        }
      }
    });
  }
}

// Scroll Animation Effects
function initScrollEffects() {
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.about-content, .collection-item, .social-item, .contact-item');
  
  const fadeInOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);
  
  fadeElements.forEach(element => {
    element.classList.add('hidden');
    fadeInObserver.observe(element);
  });
  
  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });
  
  // Section title animations
  const sectionTitles = document.querySelectorAll('.section-title');
  
  const titleObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Social Share Functionality
function initSocialShare() {
  const shareBtn = document.getElementById('shareBtn');
  const shareOptions = document.getElementById('shareOptions');
  const shareFacebook = document.getElementById('shareFacebook');
  const shareTwitter = document.getElementById('shareTwitter');
  const shareWhatsapp = document.getElementById('shareWhatsapp');
  
  shareBtn.addEventListener('click', function() {
    shareOptions.classList.toggle('active');
  });
  
  // Set up share links
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  
  shareFacebook.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  shareTwitter.setAttribute('href', `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`);
  shareWhatsapp.setAttribute('href', `https://wa.me/?text=${pageTitle}%20${pageUrl}`);
  
  // Close share options when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('#socialShare')) {
      shareOptions.classList.remove('active');
    }
  });
  
  // Open share links in new window
  const shareLinks = document.querySelectorAll('.share-options a');
  
  shareLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'width=600,height=400');
    });
  });
}

// Cookie Consent
function initCookieConsent() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookies = document.getElementById('acceptCookies');
  
  // Check if user has already accepted cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
      cookieConsent.classList.add('active');
    }, 3000);
  }
  
  acceptCookies.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('active');
  });
}

// Helper Functions
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}