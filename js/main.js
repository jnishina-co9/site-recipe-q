/* ========================================
   MAIN.JS — Recipe Page Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIngredientCalculator();
  initCarousel();
  initMobileMenu();
  initBackToTop();
});

/* ========================================
   1. INGREDIENT CALCULATOR
   ======================================== */
function initIngredientCalculator() {
  const servingsInput = document.getElementById('servings');
  const resultElements = document.querySelectorAll('.item-result');
  const BASE_SERVINGS = 1;

  if (!servingsInput || resultElements.length === 0) return;

  const calculate = () => {
    const selectedServings = parseInt(servingsInput.value, 10);
    if (isNaN(selectedServings) || selectedServings < 1) return;
    
    const ratio = selectedServings / BASE_SERVINGS;

    resultElements.forEach(el => {
      const baseAmount = parseFloat(el.dataset.base);
      if (isNaN(baseAmount)) return;

      const newAmount = baseAmount * ratio;
      // Display clean numbers: integer if whole, else up to 2 decimals
      el.textContent = Number.isInteger(newAmount)
        ? newAmount
        : parseFloat(newAmount.toFixed(2));
    });
  };

  servingsInput.addEventListener('change', calculate);
  
  // Initial calculation
  calculate();
}

/* ========================================
   2. CAROUSEL
   ======================================== */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth <= 768 ? 2 : 4;
  }

  function getCards() {
    return track.querySelectorAll('.carousel-card');
  }

  function updateCarousel() {
    const cards = getCards();
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate offset based on card widths
    const gap = 16;
    const cardWidth = cards[0].offsetWidth + gap;
    const offset = currentIndex * cardWidth;

    track.style.transform = `translateX(-${offset}px)`;

    // Button visibility
    // Removed the opacity: 0.3 fade so buttons don't look gray/disabled
    prevBtn.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Initial state
  updateCarousel();
}

/* ========================================
   3. MOBILE MENU
   ======================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');

  if (!hamburger || !mobileNav || !overlay) return;

  function toggleMenu() {
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active')
      ? 'hidden'
      : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  
  const closeBtn = document.getElementById('mobileClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }
}


/* ========================================
   4. BACK TO TOP
   ======================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
