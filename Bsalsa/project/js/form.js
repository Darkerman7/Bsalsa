// Form Handling JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Add input validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', function() {
      // Remove error styling when user starts typing
      if (input.classList.contains('error')) {
        input.classList.remove('error');
        
        const errorMessage = input.parentElement.querySelector('.form-feedback');
        if (errorMessage) {
          errorMessage.remove();
        }
      }
    });
  });
}

// Form Submission Handler
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  let isValid = true;
  
  // Validate all fields
  const formInputs = form.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showFormMessage(form, 'Please correct the errors in the form.', 'error');
    return;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.classList.add('loading');
  submitButton.innerHTML = 'Sending...';
  
  // Simulate form submission (replace with actual AJAX submission in production)
  setTimeout(() => {
    // Re-enable button and restore text
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
    submitButton.innerHTML = 'Send Message';
    
    // Show success message
    showFormMessage(form, 'Thank you! Your message has been sent.', 'success');
    
    // Reset form
    form.reset();
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      const successMessage = form.querySelector('.form-message');
      if (successMessage) {
        successMessage.remove();
      }
    }, 5000);
  }, 2000);
}

// Input Validation Function
function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const type = input.type;
  const name = input.name;
  const required = input.hasAttribute('required');
  let isValid = true;
  let errorMessage = '';
  
  // Skip validation if not required and empty
  if (!required && value === '') {
    return true;
  }
  
  // Validate based on input type
  switch (type) {
    case 'email':
      isValid = validateEmail(value);
      errorMessage = 'Please enter a valid email address.';
      break;
    case 'text':
      if (name === 'name') {
        isValid = value.length >= 2;
        errorMessage = 'Please enter your name.';
      }
      break;
    case 'textarea':
      isValid = value.length >= 10;
      errorMessage = 'Please enter a message with at least 10 characters.';
      break;
    default:
      isValid = value !== '';
      errorMessage = 'This field is required.';
  }
  
  // Handle validation result
  if (!isValid) {
    showInputError(input, errorMessage);
    return false;
  } else {
    clearInputError(input);
    return true;
  }
}

// Email Validation Helper
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Show Input Error
function showInputError(input, message) {
  // Clear any existing error
  clearInputError(input);
  
  // Add error class
  input.classList.add('error');
  
  // Create and add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'form-feedback error';
  errorElement.textContent = message;
  
  // Insert after input
  input.parentElement.appendChild(errorElement);
}

// Clear Input Error
function clearInputError(input) {
  input.classList.remove('error');
  
  const errorMessage = input.parentElement.querySelector('.form-feedback');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Show Form Message (success or error)
function showFormMessage(form, message, type) {
  // Remove any existing message
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  
  // Add before submit button
  const submitButton = form.querySelector('button[type="submit"]');
  form.insertBefore(messageElement, submitButton);
  
  // Scroll to message
  messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Create Toast Notification
function createToast(message, type = 'info', duration = 3000) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide and remove toast after duration
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}