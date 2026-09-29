// Back-to-top button: appears after scrolling past the hero
(() => {
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('show', window.scrollY > 600);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
