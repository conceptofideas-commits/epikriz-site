/** плавний скролл до секцій за data-target / href="#id" */
function enableSmoothScroll() {
  const links = document.querySelectorAll('a[data-target^="#"], .scroll-cue[data-target^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const sel = link.getAttribute('data-target') || link.getAttribute('href');
      if (!sel || !sel.startsWith('#')) return;
      const target = document.querySelector(sel);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top - 6), behavior: 'smooth' });
    }, { passive:false });
  });
}

/** заглушка для кнопки «Відкрити архів» */
function bindArchiveButton() {
  const btn = document.getElementById('open-archive');
  if (!btn) return;
  btn.addEventListener('click', () => {
    alert('Тут відкриватиметься ваш архів (PDF/список записів).');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  enableSmoothScroll();
  bindArchiveButton();
});
