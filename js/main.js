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
