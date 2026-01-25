// ========================================
// Location Benne Bordeaux - JavaScript
// ========================================

'use strict';

// Toggle mobile menu
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', 
        nav.classList.contains('active') ? 'true' : 'false'
      );
    });
  }
}

// Form validation and submission
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateForm(data)) {
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
      // Here you would send the form data to your backend
      // For now, we'll just simulate a successful submission
      await simulateFormSubmission(data);
      
      // Show success message
      showMessage('Votre demande de devis a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.', 'success');
      form.reset();
    } catch (error) {
      showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Veuillez entrer un nom valide');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Veuillez entrer une adresse email valide');
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    errors.push('Veuillez entrer un numéro de téléphone valide');
  }
  
  if (!data.city || data.city.trim().length < 2) {
    errors.push('Veuillez entrer une ville');
  }
  
  if (errors.length > 0) {
    showMessage(errors.join('<br>'), 'error');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function simulateFormSubmission(data) {
  // Simulate network delay
  return new Promise(resolve => setTimeout(resolve, 1000));
}

function showMessage(message, type) {
  // Remove existing messages
  const existing = document.querySelector('.form-message');
  if (existing) {
    existing.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.innerHTML = message;
  
  const form = document.getElementById('quote-form');
  form.insertAdjacentElement('beforebegin', messageDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Lazy loading images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Add CSS for form messages
function addFormMessageStyles() {
  if (document.getElementById('form-message-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'form-message-styles';
  style.textContent = `
    .form-message {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      transition: opacity 0.3s ease;
      font-weight: 500;
    }
    .form-message-success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .form-message-error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `;
  document.head.appendChild(style);
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initQuoteForm();
  initSmoothScroll();
  initLazyLoading();
  addFormMessageStyles();
});

// Add back to top button functionality
window.addEventListener('scroll', () => {
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  }
});
