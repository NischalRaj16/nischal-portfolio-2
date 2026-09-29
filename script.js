const root = document.documentElement;
root.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ----- Mobile menu -----
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  links.classList.toggle('open', !open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    links.classList.remove('open');
  })
);

// ----- Active nav link -----
const navMap = new Map([...links.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navMap.forEach(a => a.classList.remove('active'));
      navMap.get(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// ----- Reveal on scroll (staggered) -----
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const sibs = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    e.target.style.transitionDelay = `${Math.min(sibs.indexOf(e.target), 5) * 70}ms`;
    e.target.classList.add('in');
    reveal.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// ----- Scroll progress bar -----
const bar = document.getElementById('progress-bar');
function onScroll() {
  const max = root.scrollHeight - root.clientHeight;
  bar.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----- Rotating focus words -----
(() => {
  const el = document.getElementById('rot');
  const words = ['Machine Learning', 'AIoT', 'Network Security', 'NLP', 'Generative AI'];
  if (!el || reduceMotion) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    let t = el.textContent;
    const target = words[i];
    const del = setInterval(() => {
      t = t.slice(0, -1); el.textContent = t || ' ';
      if (!t) {
        clearInterval(del);
        let k = 0;
        const typ = setInterval(() => {
          el.textContent = target.slice(0, ++k);
          if (k >= target.length) clearInterval(typ);
        }, 55);
      }
    }, 30);
  }, 2800);
})();

// ----- Custom cursor (desktop only) -----
(() => {
  if (!finePointer || reduceMotion) return;
  root.classList.add('has-cursor');
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const label = ring.querySelector('span');
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
  window.addEventListener('mousedown', () => ring.classList.add('down'));
  window.addEventListener('mouseup', () => ring.classList.remove('down'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; });
  document.querySelectorAll('a, button, .tile').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const text = el.dataset.cursor;
      if (text) { label.textContent = text; ring.classList.add('label'); dot.classList.add('hide'); }
      else ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => { ring.classList.remove('hover', 'label'); dot.classList.remove('hide'); });
  });
})();

// ----- Magnetic buttons -----
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ----- 3D tilt cards -----
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-3px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// ----- Animated network background in the hero -----
(() => {
  const canvas = document.getElementById('net');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const colors = ['13, 148, 136', '2, 132, 199', '8, 145, 178', '249, 115, 22'];
  let w, h, nodes = [], raf, mouse = { x: -999, y: -999 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth; h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(64, (w * h) / 18000));
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      c: colors[i % colors.length]
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const max = 130;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < max) {
          ctx.strokeStyle = `rgba(${a.c}, ${0.18 * (1 - d / max)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 170) {
        ctx.strokeStyle = `rgba(${a.c}, ${0.35 * (1 - md / 170)})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    nodes.forEach(n => {
      ctx.fillStyle = `rgba(${n.c}, .55)`;
      ctx.beginPath(); ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2); ctx.fill();
    });
  }
  function step() {
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    draw();
    raf = requestAnimationFrame(step);
  }
  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });

  resize();
  if (reduceMotion) draw(); else step();
  new IntersectionObserver(([e]) => {
    if (reduceMotion) return;
    if (e.isIntersecting) { if (!raf) step(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }).observe(canvas);
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { resize(); draw(); }, 150); });
})();

document.getElementById('year').textContent = new Date().getFullYear();
