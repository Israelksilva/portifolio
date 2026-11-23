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

// Galeria do projeto Barbearia
const barberMain = document.getElementById('barber-main');
document.querySelectorAll('.project-gallery button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!barberMain || btn.classList.contains('active')) return;
    document.querySelectorAll('.project-gallery button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    barberMain.style.opacity = '0';
    setTimeout(() => {
      barberMain.src = btn.dataset.src;
      barberMain.alt = btn.dataset.alt;
      barberMain.style.opacity = '1';
    }, 180);
  });
});

// Cursos e certificações (dados em cursos.js)
(function renderCursos() {
  const grid = document.getElementById('cursos-grid');
  const filtros = document.getElementById('cursos-filtros');
  if (!grid || typeof CURSOS === 'undefined') return;

  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const fmtData = d => { const [a, m] = d.split('-'); return `${meses[+m - 1]}/${a}`; };
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cursos = [...CURSOS].sort((a, b) => b.data.localeCompare(a.data));

  document.getElementById('cursos-total').textContent = cursos.length;
  document.getElementById('cursos-horas').textContent = cursos.reduce((t, c) => t + (+c.horas || 0), 0).toLocaleString('pt-BR') + 'h';
  document.getElementById('cursos-inst').textContent = new Set(cursos.map(c => c.instituicao)).size;

  grid.innerHTML = cursos.map(c => `
    <article class="course-card" data-area="${esc(c.area)}">
      <div class="course-top"><span class="course-area">${esc(c.area)}</span><span class="course-date">${fmtData(c.data)}</span></div>
      <h3>${esc(c.titulo)}</h3>
      <p class="course-inst">${esc(c.instituicao)} · ${esc(c.horas)}h</p>
      <div class="course-tags">${(c.temas || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      ${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noreferrer">Verificar certificado ↗</a>` : ''}
    </article>`).join('');

  const areas = ['Todos', ...new Set(cursos.map(c => c.area))];
  filtros.innerHTML = areas.map((a, i) => `<button type="button" class="${i ? '' : 'active'}" aria-pressed="${!i}" data-area="${esc(a)}">${esc(a)}</button>`).join('');
  filtros.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    filtros.querySelectorAll('button').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
    grid.querySelectorAll('.course-card').forEach(card => {
      card.hidden = btn.dataset.area !== 'Todos' && card.dataset.area !== btn.dataset.area;
    });
  });
})();
