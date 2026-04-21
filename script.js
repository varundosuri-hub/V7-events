/* ==========================================================
   V7 Events & Productions — Vanilla JS
   ========================================================== */

// ---------- Scroll progress ----------
const progressEl = document.getElementById('scrollProgress');
function updateProgress() {
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
  progressEl.style.width = pct + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ---------- Navbar scrolled state ----------
const navbar = document.getElementById('navbar');
function onNavScroll() {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
document.addEventListener('scroll', onNavScroll, { passive: true });
onNavScroll();

// ---------- Mobile menu toggle ----------
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});
// close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => navbar.classList.remove('open'));
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => io.observe(el));

// ---------- Testimonials slider ----------
const TESTIMONIALS = [
  {
    name: 'Ananya & Rohan',
    role: 'Wedding, Hyderabad',
    rating: 5,
    text: 'V7 transformed our wedding into a cinematic dream. Every detail — from the mandap florals to the lighting — felt curated by true artists.',
  },
  {
    name: 'Karthik Reddy',
    role: 'CEO, NovaTech',
    rating: 5,
    text: 'Our product launch was flawless. V7 delivered a world-class experience that left our partners genuinely impressed.',
  },
  {
    name: 'Meera Sharma',
    role: 'Birthday Celebration',
    rating: 5,
    text: 'A milestone birthday deserves a milestone celebration. V7 understood that — the decor, flow, and photography were pure luxury.',
  },
  {
    name: 'Aditya & Priya',
    role: 'Destination Wedding',
    rating: 5,
    text: 'Professional, warm, and breathtakingly creative. Our guests are still talking about it months later. Worth every rupee.',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Annual Gala, Banjara Hills',
    rating: 5,
    text: 'From concept to execution, V7 operates at a level few agencies in Hyderabad can match. An absolute pleasure to work with.',
  },
];

const card = document.getElementById('testimonialCard');
const dotsWrap = document.getElementById('tDots');
const btnPrev = document.getElementById('tPrev');
const btnNext = document.getElementById('tNext');
let tIndex = 0;
let tTimer = null;

// build dots
TESTIMONIALS.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
  b.addEventListener('click', () => { setTestimonial(i); resetTimer(); });
  dotsWrap.appendChild(b);
});

function renderDots() {
  [...dotsWrap.children].forEach((d, i) => {
    d.classList.toggle('active', i === tIndex);
  });
}

function setTestimonial(i) {
  tIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
  const t = TESTIMONIALS[tIndex];
  card.classList.add('fade-out');
  setTimeout(() => {
    card.querySelector('.stars').textContent = '★'.repeat(t.rating);
    card.querySelector('.testimonial-text').textContent = `"${t.text}"`;
    card.querySelector('.t-name').textContent = t.name;
    card.querySelector('.t-role').textContent = t.role;
    card.classList.remove('fade-out');
    renderDots();
  }, 300);
}

function nextTestimonial() { setTestimonial(tIndex + 1); }
function prevTestimonial() { setTestimonial(tIndex - 1); }
function resetTimer() {
  clearInterval(tTimer);
  tTimer = setInterval(nextTestimonial, 6000);
}

btnNext.addEventListener('click', () => { nextTestimonial(); resetTimer(); });
btnPrev.addEventListener('click', () => { prevTestimonial(); resetTimer(); });
renderDots();
resetTimer();

// ---------- Contact form -> WhatsApp ----------
const WHATSAPP_NUMBER = '919000257818';
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const message = document.getElementById('fMessage').value.trim();

  if (!name || !phone || !message) {
    submitBtn.style.animation = 'shake 0.35s';
    setTimeout(() => (submitBtn.style.animation = ''), 400);
    return;
  }

  const text =
    `Hello V7 Events & Productions,\n\n` +
    `I'm interested in booking an event.\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Message: ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  submitBtn.textContent = 'Opening WhatsApp...';
  window.open(url, '_blank', 'noopener,noreferrer');
  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send via WhatsApp';
  }, 1200);
});

// Shake keyframe for invalid submit feedback
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}`;
document.head.appendChild(style);

// ---------- Smooth scroll (native via html scroll-behavior, but offset for fixed nav) ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
