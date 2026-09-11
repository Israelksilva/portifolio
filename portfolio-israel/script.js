const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.desktop-nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = '☰';
}));

window.addEventListener('mousemove', (e) => {
  const card = document.querySelector('.code-card');
  if (window.innerWidth < 980 || !card) return;
  const x = (e.clientX / window.innerWidth - .5) * 8;
  const y = (e.clientY / window.innerHeight - .5) * 8;
  card.style.transform = `translate(${x}px, ${y}px)`;
});
