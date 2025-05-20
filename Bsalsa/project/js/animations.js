// Animations JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animation-related functionality
  initScrollAnimations();
  initParallaxEffects();
  initImageLazyLoad();
});

// Scroll Animations
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
  
  // Elements with custom animations
  const sectionElements = document.querySelectorAll('.section');
  const collectionItems = document.querySelectorAll('.collection-item');
  const socialItems = document.querySelectorAll('.social-item');
  
  // Create intersection observer for standard fade animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('fade-in')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Create intersection observer for section animations
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Animate children with staggered delay
        const children = entry.target.querySelectorAll('.collection-item, .social-item, .contact-item');
        
        if (children.length > 0) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('show');
            }, 200 * index);
          });
        }
        
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all elements that need animation
  animatedElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  sectionElements.forEach(element => {
    sectionObserver.observe(element);
  });
  
  // Add stagger animations to collection items
  collectionItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add stagger animations to social items
  socialItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });
}

// Parallax Effects
function initParallaxEffects() {
  const heroSection = document.getElementById('hero');
  
  // Only apply parallax on non-mobile devices
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      
      // Parallax for hero section
      if (heroSection) {
        const speed = 0.5;
        const yPos = scrollPosition * speed;
        heroSection.style.backgroundPositionY = `${yPos}px`;
      }
    });
  }
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add scroll behavior
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, targetId);
      }
    });
  });
}

// Image Lazy Loading
function initImageLazyLoad() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const imgOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px 200px 0px' // Load images when they're 200px from entering the viewport
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // If the image has a data-src attribute, move it to src
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Add a fade-in effect to the image
          img.classList.add('fade-in');
          
          // Stop observing the image
          observer.unobserve(img);
        }
      });
    }, imgOptions);
    
    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('fade-in');
    });
  }
}

// Hover Effects
document.addEventListener('mouseover', function(e) {
  // Add hover effects for social items
  if (e.target.closest('.social-item')) {
    const socialItem = e.target.closest('.social-item');
    const socialIcon = socialItem.querySelector('.social-icon');
    
    if (socialIcon) {
      socialIcon.style.transform = 'scale(1.1)';
    }
  }
  
  // Add hover effects for collection items
  if (e.target.closest('.collection-item')) {
    const collectionItem = e.target.closest('.collection-item');
    const collectionImage = collectionItem.querySelector('img');
    
    if (collectionImage) {
      collectionImage.style.transform = 'scale(1.05)';
    }
  }
});

document.addEventListener('mouseout', function(e) {
  // Remove hover effects for social items
  if (e.target.closest('.social-item')) {
    const socialItem = e.target.closest('.social-item');
    const socialIcon = socialItem.querySelector('.social-icon');
    
    if (socialIcon) {
      socialIcon.style.transform = 'scale(1)';
    }
  }
  
  // Remove hover effects for collection items
  if (e.target.closest('.collection-item')) {
    const collectionItem = e.target.closest('.collection-item');
    const collectionImage = collectionItem.querySelector('img');
    
    if (collectionImage) {
      collectionImage.style.transform = 'scale(1)';
    }
  }
});

// Custom animation functions
function fadeIn(element, duration = 300, delay = 0) {
  setTimeout(() => {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      }
    }
    
    window.requestAnimationFrame(animate);
  }, delay);
}

function fadeOut(element, duration = 300, delay = 0) {
  setTimeout(() => {
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(1 - (progress / duration), 0);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    
    window.requestAnimationFrame(animate);
  }, delay);
}

function slideIn(element, direction = 'left', duration = 300, delay = 0) {
  setTimeout(() => {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let startPos;
    if (direction === 'left') {
      element.style.transform = 'translateX(-50px)';
    } else if (direction === 'right') {
      element.style.transform = 'translateX(50px)';
    } else if (direction === 'top') {
      element.style.transform = 'translateY(-50px)';
    } else if (direction === 'bottom') {
      element.style.transform = 'translateY(50px)';
    }
    
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      element.style.opacity = percent;
      
      if (direction === 'left' || direction === 'right') {
        element.style.transform = `translateX(${direction === 'left' ? -50 + (percent * 50) : 50 - (percent * 50)}px)`;
      } else {
        element.style.transform = `translateY(${direction === 'top' ? -50 + (percent * 50) : 50 - (percent * 50)}px)`;
      }
      
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      }
    }
    
    window.requestAnimationFrame(animate);
  }, delay);
}