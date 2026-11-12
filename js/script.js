/* ==========================================================================
   FAMILY RESTAURANT - Main JavaScript
   Vanilla JS implementing navigation, demo cart, filtering, search, and form validations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCart();
  initMenuFiltering();
  initMenuSearch();
  initGalleryFiltering();
  initFaqAccordion();
  initBookingForm();
  initContactForm();
  initNewsletterForm();
  initScrollTop();
  highlightActiveNav();
});

/* ==========================================================================
   1. Active Navigation Highlight
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true' || false;
    toggleBtn.setAttribute('aria-expanded', !expanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Demo Shopping Cart Functionality
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem('family_restaurant_cart')) || [];

function saveCart() {
  localStorage.setItem('family_restaurant_cart', JSON.stringify(cart));
  updateCartUI();
}

function initCart() {
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-trigger');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Toggle open
  cartToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Toggle close
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Clear cart
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      saveCart();
    });
  }

  // Demo Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items to explore our demo checkout.');
        return;
      }
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      alert(`[DEMO CHECKOUT]\n\nThank you for exploring our Family Restaurant demonstration!\n\nDemo Order Total: ₹${total}\n\nNotice: This is a front-end demonstration website. No payment has been processed and no food delivery will occur.`);
      cart = [];
      saveCart();
      closeCart();
    });
  }

  // Add to cart buttons across pages
  document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
      const btn = e.target.matches('.add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));

      addToCart(id, name, price);
      
      // Visual feedback on button
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Added';
      btn.classList.add('btn-accent');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-accent');
      }, 1200);
    }
  });

  updateCartUI();
}

function openCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  saveCart();
}

function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartUI() {
  const counterElements = document.querySelectorAll('.cart-counter');
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  counterElements.forEach(el => el.textContent = totalCount);

  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <div style="font-size: 3rem; margin-bottom: 0.5rem; opacity: 0.4;">🍽️</div>
        <p><strong>Your cart is currently empty</strong></p>
        <p style="font-size: 0.85rem;">Explore our delicious menu items and add them to test the ordering experience.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</span>
        </div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="updateQuantity('${item.id}', -1)" title="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateQuantity('${item.id}', 1)" title="Increase quantity">+</button>
          <button class="cart-qty-btn" onclick="removeFromCart('${item.id}')" title="Remove item" style="color: #b3261e; margin-left: 4px;">✕</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (totalEl) totalEl.textContent = `₹${subtotal}`;
}

// Expose functions globally for inline HTML click handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

/* ==========================================================================
   4. Menu Category Filtering & Search
   ========================================================================== */
function initMenuFiltering() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-item-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const searchInput = document.getElementById('menuSearchInput');
      const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

      applyMenuFilters(filter, searchTerm);
    });
  });
}

function initMenuSearch() {
  const searchInput = document.getElementById('menuSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const activeFilterBtn = document.querySelector('.menu-filter-btn.active');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    const searchTerm = searchInput.value.toLowerCase().trim();

    applyMenuFilters(filter, searchTerm);
  });
}

function applyMenuFilters(filter, searchTerm) {
  const menuCards = document.querySelectorAll('.menu-item-card');
  let visibleCount = 0;

  menuCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const itemName = card.querySelector('.menu-item-name')?.textContent.toLowerCase() || '';
    const itemDesc = card.querySelector('.menu-card-desc')?.textContent.toLowerCase() || '';

    const matchesCategory = (filter === 'all' || category === filter);
    const matchesSearch = (!searchTerm || itemName.includes(searchTerm) || itemDesc.includes(searchTerm));

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyMsg = document.getElementById('noMenuMatchMessage');
  if (emptyMsg) {
    emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

/* ==========================================================================
   5. Gallery Category Filtering
   ========================================================================== */
function initGalleryFiltering() {
  const galleryBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!galleryBtns.length || !galleryItems.length) return;

  galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-category');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other accordions
      faqItems.forEach(other => other.classList.remove('active'));
      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. Table Booking Form Validation (Demo Frontend Only)
   ========================================================================== */
function initBookingForm() {
  const bookingForm = document.getElementById('tableBookingForm');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset previous error indicators
    bookingForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    // Validate Full Name
    const nameInput = document.getElementById('bookingName');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name');
      isValid = false;
    }

    // Validate Phone Number
    const phoneInput = document.getElementById('bookingPhone');
    const phoneVal = phoneInput.value.trim();
    if (!phoneVal || !/^[0-9+ -]{8,15}$/.test(phoneVal)) {
      showError(phoneInput, 'Please enter a valid phone number (8-15 digits)');
      isValid = false;
    }

    // Validate Email
    const emailInput = document.getElementById('bookingEmail');
    const emailVal = emailInput.value.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Date
    const dateInput = document.getElementById('bookingDate');
    if (!dateInput.value) {
      showError(dateInput, 'Please select a reservation date');
      isValid = false;
    }

    // Validate Time
    const timeInput = document.getElementById('bookingTime');
    if (!timeInput.value) {
      showError(timeInput, 'Please select your preferred dining time');
      isValid = false;
    }

    // Validate Guests
    const guestsInput = document.getElementById('bookingGuests');
    if (!guestsInput.value || parseInt(guestsInput.value) < 1) {
      showError(guestsInput, 'Please specify at least 1 guest');
      isValid = false;
    }

    if (isValid) {
      const successBox = document.getElementById('bookingSuccessAlert');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      bookingForm.reset();
    }
  });
}

function showError(inputElement, message) {
  const parent = inputElement.closest('.form-group');
  if (parent) {
    parent.classList.add('has-error');
    const errorEl = parent.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
}

/* ==========================================================================
   8. Contact Form Validation (Demo Frontend Only)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    contactForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    const nameInput = document.getElementById('contactName');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    }

    const emailInput = document.getElementById('contactEmail');
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    }

    const subjectInput = document.getElementById('contactSubject');
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Please provide a subject');
      isValid = false;
    }

    const msgInput = document.getElementById('contactMessage');
    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      showError(msgInput, 'Please enter a message (at least 5 characters)');
      isValid = false;
    }

    if (isValid) {
      const successAlert = document.getElementById('contactSuccessAlert');
      if (successAlert) {
        successAlert.style.display = 'block';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      contactForm.reset();
    }
  });
}

/* ==========================================================================
   9. Newsletter Form (Frontend Demo)
   ========================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim()) {
        alert(`[DEMO NEWSLETTER]\n\nThank you for subscribing to FAMILY RESTAURANT updates with ${input.value}!\n\n(This is a frontend demo; no email has been stored or sent.)`);
        input.value = '';
      }
    });
  });
}

/* ==========================================================================
   10. Scroll to Top Button
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
