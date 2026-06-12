/* ── Mobile nav toggle ── */
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const bars = toggle.querySelectorAll('span');
    const open = links.classList.contains('open');
    bars[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    bars[1].style.opacity   = open ? '0' : '1';
    bars[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}

/* ── Active nav link ── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ── Carousel ── */
(function () {
  const track  = document.getElementById('carouselTrack');
  const prev   = document.getElementById('carouselPrev');
  const next   = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const total  = slides.length;
  let current  = 0;

  // build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(n) {
    current = (n + total) % total;
    const slideWidth = slides[0].offsetWidth + 16; // 16 = margin
    track.style.transform = `translateX(${-current * slideWidth}px)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current));
  }

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));

  // touch / swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // mouse drag
  let dragging = false, dragStart = 0;
  track.addEventListener('mousedown',  e => { dragging = true; dragStart = e.clientX; });
  track.addEventListener('mouseup',    e => {
    if (!dragging) return; dragging = false;
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
  track.addEventListener('mouseleave', () => { dragging = false; });

  // recalc on resize
  window.addEventListener('resize', () => goTo(current));
})();

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
