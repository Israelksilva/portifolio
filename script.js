const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Cursos e certificações (dados em cursos.js) ---------- */
(function renderCursos() {
  const grid = $('#cursos-grid');
  const filtros = $('#cursos-filtros');
  if (!grid || typeof CURSOS === 'undefined') return;

  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const fmtData = d => { if (!d) return ''; const [a, m] = d.split('-'); return m ? `${meses[+m - 1]}/${a}` : a; };
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cursos = [...CURSOS].sort((a, b) => (b.data || '0').localeCompare(a.data || '0') || b.horas - a.horas);

  const total = cursos.reduce((t, c) => t + (+c.horas || 0), 0);
  $('#cursos-total').dataset.count = cursos.length;
  $('#cursos-horas').dataset.count = total;
  $('#cursos-horas').dataset.suffix = 'h';
  $('#cursos-inst').dataset.count = new Set(cursos.map(c => c.instituicao)).size;
  const heroHoras = $('#hero-horas');
  if (heroHoras) {
    heroHoras.dataset.count = Math.floor(total / 100) * 100;
    heroHoras.textContent = (+heroHoras.dataset.count).toLocaleString('pt-BR');
  }

  grid.innerHTML = cursos.map(c => `
    <article class="course-card" data-area="${esc(c.area)}">
      <div class="course-top"><span class="course-area">${esc(c.area)}</span><span class="course-date">${fmtData(c.data)}</span></div>
      <h3>${esc(c.titulo)}</h3>
      <p class="course-inst">${esc(c.instituicao)} · ${esc(c.horas)}h</p>
      <div class="course-tags">${(c.temas || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      ${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noreferrer">Verificar certificado ↗</a>` : ''}
    </article>`).join('');

  const areas = ['Todos', ...new Set(cursos.map(c => c.area))];
  const count = a => a === 'Todos' ? cursos.length : cursos.filter(c => c.area === a).length;
  filtros.innerHTML = areas.map((a, i) =>
    `<button type="button" class="${i ? '' : 'active'}" aria-pressed="${!i}" data-area="${esc(a)}">${esc(a)} <small>${count(a)}</small></button>`).join('');

  // Mostra só os primeiros cursos até a pessoa pedir todos
  const LIMITE = 6;
  const more = $('#cursos-mais');
  let area = 'Todos', expanded = false;
  const apply = () => {
    let shown = 0;
    $$('.course-card', grid).forEach(card => {
      const match = area === 'Todos' || card.dataset.area === area;
      if (match) shown++;
      card.hidden = !match || (!expanded && shown > LIMITE);
    });
    const totalMatch = area === 'Todos' ? cursos.length : count(area);
    more.hidden = totalMatch <= LIMITE;
    more.textContent = expanded ? 'Mostrar menos ↑' : `Ver todos os ${totalMatch} cursos ↓`;
    more.setAttribute('aria-expanded', expanded);
  };
  apply();
  more.addEventListener('click', () => {
    expanded = !expanded;
    apply();
    if (!expanded) $('#cursos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  filtros.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || btn.classList.contains('active')) return;
    $$('button', filtros).forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
    area = btn.dataset.area;
    if (reduceMotion) return apply();
    grid.classList.add('filtering');
    setTimeout(() => { apply(); requestAnimationFrame(() => grid.classList.remove('filtering')); }, 200);
  });
})();

/* ---------- Revelar ao rolar (inclui entrada escalonada) ---------- */
['.about-cards', '.skills-grid', '.mini-grid', '.courses-grid', '.contact-grid'].forEach(sel => {
  const el = $(sel);
  if (!el) return;
  el.classList.remove('reveal');
  el.classList.add('stagger');
  [...el.children].forEach((child, i) => child.style.setProperty('--i', i));
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');
    revealObserver.unobserve(el);
    // depois da entrada, devolve aos cards suas transições normais de hover
    if (el.classList.contains('stagger')) {
      setTimeout(() => el.classList.remove('stagger', 'visible'), 700 + el.children.length * 55);
    }
  });
}, { threshold: 0.12 });
$$('.reveal, .stagger').forEach(el => revealObserver.observe(el));

/* ---------- Contadores animados ---------- */
function animateCount(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  if (reduceMotion || !target) { el.textContent = target.toLocaleString('pt-BR') + suffix; return; }
  const start = performance.now(), dur = 1400;
  const step = now => {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = Math.round(target * eased).toLocaleString('pt-BR') + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });
$$('[data-count]').forEach(el => countObserver.observe(el));

/* ---------- Menu mobile ---------- */
const menuBtn = $('.menu-btn');
const nav = $('.desktop-nav');
const closeMenu = () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = '☰'; };
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.textContent = open ? '✕' : '☰';
});
$$('a', nav).forEach(link => link.addEventListener('click', closeMenu));

/* ---------- Rolagem: progresso, cabeçalho, voltar ao topo ---------- */
const topbar = $('.topbar');
const progress = $('.progress-bar');
const toTop = $('.to-top');
let ticking = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  topbar.classList.toggle('scrolled', scrollY > 40);
  toTop.classList.toggle('show', scrollY > innerHeight * 0.9);
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

/* ---------- Menu destaca a seção atual ---------- */
const navLinks = $$('a', nav);
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));

/* ---------- Cargo alternando no hero ---------- */
const rotator = $('.role-rotator');
if (rotator && !reduceMotion) {
  const roles = ['FULL STACK', 'FRONT-END', 'BACK-END'];
  let r = 0;
  setInterval(() => {
    rotator.classList.add('out');
    setTimeout(() => { r = (r + 1) % roles.length; rotator.textContent = roles[r]; rotator.classList.remove('out'); }, 300);
  }, 2600);
}

/* ---------- Efeitos de ponteiro (só desktop com mouse) ---------- */
if (finePointer && !reduceMotion) {
  document.body.classList.add('has-pointer');
  const glow = $('.cursor-glow');
  const card = $('.code-card');

  $$('.about-cards article, .skill, .course-card, .mini-project, .contact-item, .project-row').forEach(el => el.classList.add('spot'));

  addEventListener('pointermove', e => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    if (card && innerWidth >= 980) {
      card.style.translate = `${(e.clientX / innerWidth - .5) * 10}px ${(e.clientY / innerHeight - .5) * 10}px`;
    }
    const spot = e.target.closest && e.target.closest('.spot');
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
  }, { passive: true });

  // Inclinação 3D nas imagens dos projetos
  $$('.project-art').forEach(art => {
    art.addEventListener('pointermove', e => {
      if (innerWidth < 980) return;
      const r = art.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      art.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });
    art.addEventListener('pointerleave', () => { art.style.transform = ''; });
  });

  // Botões magnéticos
  $$('.magnetic, .header-cta').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .25}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- Galeria do projeto Barbearia ---------- */
const barberMain = $('#barber-main');
const galleryBtns = $$('.project-gallery button');
function showBarber(btn) {
  if (!barberMain || btn.classList.contains('active')) return;
  galleryBtns.forEach(b => b.classList.toggle('active', b === btn));
  barberMain.style.opacity = '0';
  setTimeout(() => {
    barberMain.src = btn.dataset.src;
    barberMain.alt = btn.dataset.alt;
    barberMain.style.opacity = '1';
  }, 180);
}
galleryBtns.forEach(btn => btn.addEventListener('click', () => showBarber(btn)));

/* ---------- Lightbox ---------- */
const lb = $('.lightbox');
const lbImg = $('img', lb);
const lbCap = $('figcaption', lb);
let lbItems = [], lbIndex = 0, lbReturn = null;
function lbRender() {
  const it = lbItems[lbIndex];
  lbImg.src = it.src; lbImg.alt = it.alt;
  lbCap.textContent = lbItems.length > 1 ? `${it.alt} · ${lbIndex + 1}/${lbItems.length}` : it.alt;
}
function lbOpen(items, index) {
  lbItems = items; lbIndex = index; lbReturn = document.activeElement;
  lb.classList.toggle('single', items.length < 2);
  lbRender();
  lb.hidden = false;
  document.body.classList.add('lb-open');
  $('.lb-close', lb).focus();
}
function lbClose() {
  lb.hidden = true;
  document.body.classList.remove('lb-open');
  if (lbReturn) lbReturn.focus();
}
function lbStep(d) {
  if (lbItems.length < 2) return;
  lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
  lbRender();
  if (galleryBtns.length && lbItems === barberItems) showBarber(galleryBtns[lbIndex]);
}
const barberItems = galleryBtns.map(b => ({ src: b.dataset.src, alt: b.dataset.alt }));
$$('.project-art img').forEach(img => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  const open = () => {
    if (img === barberMain) lbOpen(barberItems, Math.max(0, galleryBtns.findIndex(b => b.classList.contains('active'))));
    else lbOpen([{ src: img.currentSrc || img.src, alt: img.alt }], 0);
  };
  img.addEventListener('click', open);
  img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});
$('.lb-close', lb).addEventListener('click', lbClose);
$('.lb-prev', lb).addEventListener('click', () => lbStep(-1));
$('.lb-next', lb).addEventListener('click', () => lbStep(1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowRight') lbStep(1);
  if (e.key === 'ArrowLeft') lbStep(-1);
  if (e.key === 'Tab') { // mantém o foco dentro do lightbox
    const f = $$('button', lb).filter(b => b.offsetParent);
    const i = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  }
});

/* ---------- Copiar e-mail ---------- */
const toast = $('.toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
const copyBtn = $('.copy-email');
if (copyBtn) copyBtn.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('E-mail copiado ✓');
  } catch {
    window.location.href = 'mailto:' + email;
  }
});
