/* ═══════════════════════════════════════════════════
   THEKKADY TRIPS — JavaScript (v3 Complete)
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── NAVBAR SCROLL & FLOATING BAR ───────────────── */
const navbar = document.getElementById('navbar');
const floatingBar = document.getElementById('floatingBar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    if (navbar) navbar.classList.add('scrolled');
    if (floatingBar) floatingBar.classList.add('visible');
  } else {
    if (navbar) navbar.classList.remove('scrolled');
    if (floatingBar) floatingBar.classList.remove('visible');
  }
}, { passive: true });

/* ─── INTERACTIVE ITINERARY ACCORDION ─────────────── */
function toggleItinerary(btn) {
  const content = btn.nextElementSibling;
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isExpanded);
  
  const icon = btn.querySelector('.accordion-chevron');
  if (isExpanded) {
    content.style.maxHeight = '0px';
    content.style.opacity = '0';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

/* ─── HAMBURGER MENU ────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Close mobile drawer when tapping outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* ─── HERO BG PARALLAX & PARTICLES ───────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  heroBg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrollY * 0.2}px)`;
    }
  }, { passive: true });
}

const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const COUNT = 14;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 16 + 12;
    const delay = Math.random() * 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
    `;
    particleContainer.appendChild(p);
  }
}

/* ─── SCROLL REVEAL ─────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

/* ─── SAFARI PACKAGE TAB CONTROLLER ─────────────── */
function switchSafari(schemeId, element) {
  // Update Tabs
  const allTabs = document.querySelectorAll('.safari-tab-btn');
  allTabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  if (element) {
    element.classList.add('active');
    element.setAttribute('aria-selected', 'true');
  }

  // Update Panels
  const allPanels = document.querySelectorAll('.safari-panel');
  allPanels.forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(`safari-${schemeId}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
}

/* ─── SAFARI COST CALCULATOR WIDGET ─────────────── */
let calcPaxCount = 2;

function changePassengers(delta) {
  calcPaxCount = Math.max(1, Math.min(6, calcPaxCount + delta));
  const paxEl = document.getElementById('calcPax');
  if (paxEl) paxEl.textContent = calcPaxCount;
  updateSafariCalculator();
}

function updateSafariCalculator() {
  const pkgSelect = document.getElementById('calcPackage');
  const dateInput = document.getElementById('calcDate');
  const totalEl = document.getElementById('calcTotalPrice');
  const breakdownEl = document.getElementById('calcBreakdown');
  const waBtn = document.getElementById('calcWaBtn');

  if (!pkgSelect) return;

  const selectedOpt = pkgSelect.options[pkgSelect.selectedIndex];
  const price = parseInt(selectedOpt.dataset.price || '2500', 10);
  const pkgName = selectedOpt.dataset.name || 'Gavi Deep Jungle Safari';
  const travelDate = (dateInput && dateInput.value) ? dateInput.value : 'Selected Date';

  const totalPrice = price * calcPaxCount;
  const formattedPrice = `₹${totalPrice.toLocaleString('en-IN')}`;

  if (totalEl) totalEl.textContent = formattedPrice;
  if (breakdownEl) {
    breakdownEl.innerHTML = `<strong>${pkgName}</strong><br/>${calcPaxCount} ${calcPaxCount === 1 ? 'Passenger' : 'Passengers'} • Forest permits & fuel included`;
  }

  if (waBtn) {
    const textMsg = `Hi! I want to inquire about ${pkgName} for ${calcPaxCount} people on ${travelDate}`;
    waBtn.href = `https://wa.me/917558876257?text=${encodeURIComponent(textMsg)}`;
  }
}

/* ─── INTERACTIVE BOOKING MODAL LOGIC ─────────────── */
function openBookingModal(packageName) {
  const modal = document.getElementById('bookingModal');
  const modalSelect = document.getElementById('modalPackage');

  if (modalSelect && packageName) {
    for (let i = 0; i < modalSelect.options.length; i++) {
      if (modalSelect.options[i].value.toLowerCase().includes(packageName.toLowerCase())) {
        modalSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) modal.classList.add('open');
}

function submitBookingModal(event) {
  event.preventDefault();
  const pkg = document.getElementById('modalPackage')?.value || 'Safari Inquiry';
  const pax = document.getElementById('modalPax')?.value || '2 Passengers';
  const date = document.getElementById('modalDate')?.value || 'Flexible';
  const location = document.getElementById('modalLocation')?.value || '';

  // Format date nicely
  let formattedDate = date;
  if (date && date !== 'Flexible') {
    try {
      const d = new Date(date);
      formattedDate = d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
    } catch(e) { formattedDate = date; }
  }

  const lines = [
    `Hi Thekkady Trips! I would like to plan a trip.`,
    ``,
    `*Package / Service:* ${pkg}`,
    `*No. of Guests:* ${pax}`,
    `*Travel Date:* ${formattedDate}`,
  ];
  if (location) lines.push(`*Pickup / Hotel:* ${location}`);
  lines.push(``, `Please confirm availability and share pricing details. Thank you!`);

  const message = lines.join('\n');
  const waUrl = `https://wa.me/917558876257?text=${encodeURIComponent(message)}`;

  window.open(waUrl, '_blank');
  showToast('WhatsApp message prepared! Sending your inquiry...');
  closeModal('bookingModal');
}

function submitQuickInquiry(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#heroName, #contactName')?.value || 'Guest';
  const phone = form.querySelector('#heroPhone, #contactPhone')?.value || '';
  const date = form.querySelector('#heroDate, #contactDate')?.value || 'Flexible';
  const service = form.querySelector('#heroService, #contactServiceSelect')?.value || 'Safari Inquiry';
  const msg = form.querySelector('#contactMsg')?.value || '';

  const message = `Hi Thekkady Trips!\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nService: ${service}${msg ? `\nNote: ${msg}` : ''}`;
  const waUrl = `https://wa.me/917558876257?text=${encodeURIComponent(message)}`;

  window.open(waUrl, '_blank');
  showToast('Opening WhatsApp... 🚀');
  form.reset();
}

/* ─── GENERAL MODALS ────────────────────────────── */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function openModal(e, modalId) {
  if (e) e.preventDefault();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ─── REVIEWS CAROUSEL ──────────────────────────── */
const track = document.getElementById('reviewsTrack');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('reviewPrev');
const nextBtn = document.getElementById('reviewNext');

let currentSlide = 0;
let cardsPerView = 3;
let autoPlay;

function getCardsPerView() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 900) return 1;
  return 3;
}

function getSlideCount() {
  if (!track) return 1;
  const cards = track.querySelectorAll('.review-card');
  return Math.max(1, cards.length - cardsPerView + 1);
}

function buildDots() {
  if (!dotsContainer || !track) return;
  dotsContainer.innerHTML = '';
  const count = getSlideCount();
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === currentSlide ? ' active' : '');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function goTo(idx) {
  if (!track) return;
  cardsPerView = getCardsPerView();
  const cards = track.querySelectorAll('.review-card');
  const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 300;
  const maxSlide = Math.max(0, cards.length - cardsPerView);
  currentSlide = Math.max(0, Math.min(idx, maxSlide));
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function next() { goTo(currentSlide + 1 >= getSlideCount() ? 0 : currentSlide + 1); }
function prev() { goTo(currentSlide - 1 < 0 ? getSlideCount() - 1 : currentSlide - 1); }

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(next, 5000);
}

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  buildDots();
  goTo(currentSlide);
});

if (track) {
  cardsPerView = getCardsPerView();
  buildDots();
  autoPlay = setInterval(next, 5000);
}

/* ─── TOAST ─────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

/* ─── SMOOTH SCROLL ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ─── SET MIN DATE ──────────────────────────────── */
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = today;
  if (!input.value) input.value = today;
});

// Init Safari Calculator
if (document.getElementById('calcPackage')) {
  updateSafariCalculator();
}

/* ─── SAFARI DETAIL PAGE CONTROLLER ─────────────── */
let detailPaxCount = 2;

function changeDetailPax(delta, unitPrice, safariName) {
  detailPaxCount = Math.max(1, Math.min(12, detailPaxCount + delta));
  const paxEl = document.getElementById('detailPaxDisplay');
  const countEl = document.getElementById('detailPaxCountText');
  const totalEl = document.getElementById('detailTotalPrice');
  const waBtn = document.getElementById('detailWaBtn');
  const dateInput = document.getElementById('detailDateInput');
  const jeepTypeSelect = document.getElementById('detailJeepType');

  if (paxEl) paxEl.textContent = detailPaxCount;
  if (countEl) countEl.textContent = `${detailPaxCount} Person${detailPaxCount > 1 ? 's' : ''}`;

  let baseRate = unitPrice;
  if (jeepTypeSelect && jeepTypeSelect.value === 'open-top') {
    baseRate += 300;
  }

  const total = baseRate * detailPaxCount;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

  if (waBtn) {
    const travelDate = (dateInput && dateInput.value) ? dateInput.value : 'Upcoming Date';
    const vehicleChoice = (jeepTypeSelect && jeepTypeSelect.value === 'open-top') ? 'Open-Top Mahindra 4x4' : 'Standard 4x4 Jeep';
    const msg = `Hi Thekkady Trips! I want to book the *${safariName}* for *${detailPaxCount} people* on *${travelDate}* (${vehicleChoice}). Total estimated: ₹${total.toLocaleString('en-IN')}. Please confirm availability!`;
    waBtn.href = `https://wa.me/917558876257?text=${encodeURIComponent(msg)}`;
  }
}

function toggleDetailFaq(button) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const drawer = button.nextElementSibling;
  
  // Close other open FAQs in same box
  const parent = button.closest('.faq-accordion-box');
  if (parent) {
    parent.querySelectorAll('.faq-header-btn').forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false');
        if (btn.nextElementSibling) {
          btn.nextElementSibling.style.maxHeight = '0px';
          btn.nextElementSibling.style.opacity = '0';
        }
      }
    });
  }

  button.setAttribute('aria-expanded', !isExpanded);
  if (!isExpanded) {
    drawer.style.maxHeight = drawer.scrollHeight + 'px';
    drawer.style.opacity = '1';
  } else {
    drawer.style.maxHeight = '0px';
    drawer.style.opacity = '0';
  }
}

/* ─── 3D SPATIAL TILT INTERACTION (DESKTOP ONLY) ─────────── */
function initSpatialTilt() {
  // Only activate on devices with a fine pointer/mouse hover capability
  const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isHoverable) return;

  const cards = document.querySelectorAll('.glass-card[data-tilt]');
  
  cards.forEach(card => {
    let rafId = null;
    let bounds = null;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      // Calculate normalized rotation (-1 to 1 range)
      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const maxTilt = 8; // max degrees
      const rotX = -(yPct * maxTilt).toFixed(2);
      const rotY = (xPct * maxTilt).toFixed(2);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      });
    }

    function onMouseLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

// Initialize on DOM ready
function initApp() {
  initSpatialTilt();
  
  // Safe Image Error Handling & Fallback
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.classList.add('img-error');
      if (this.classList.contains('nav-logo-img') || this.classList.contains('hero-logo-img') || this.classList.contains('footer-logo-img') || this.classList.contains('modal-logo') || this.classList.contains('form-card-logo')) {
        if (!this.src.endsWith('logo.png')) {
          this.src = './assets/logo.png';
        }
      } else {
        if (!this.src.endsWith('jeep_action.png') && !this.src.endsWith('hero_bg.png')) {
          this.src = './assets/jeep_action.png';
        }
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

console.log('%c Thekkady Trips — Spatial Bento Grid & 3D Glass UI Initialized!', 'color: #C59B42; font-size: 15px; font-weight: bold;');

