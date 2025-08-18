/**
 * Інтерактив для hero-кнопок.
 * - Плавний скрол до цільових секцій
 * - Безпечний fallback: якщо JS вимкнено — працюють звичайні якорі
 */
class HeroNav {
  /**
   * @param {string} selector - CSS-селектор контейнера з кнопками
   */
  constructor(selector = '.hero__nav') {
    /** @type {HTMLElement|null} */
    this.root = document.querySelector(selector);
    if (!this.root) return;

    /** Внутрішні посилання-кнопки */
    this.links = Array.from(this.root.querySelectorAll('a.hero__btn'));
    this.bind();
  }

  bind() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        // дозволяємо звичайний перехід, якщо немає data-target
        const targetSel = link.getAttribute('data-target');
        if (!targetSel) return;

        const targetEl = document.querySelector(targetSel);
        if (!targetEl) return;

        // блокуємо миттєвий “якірний” стрибок — робимо плавний
        e.preventDefault();
        this.scrollTo(targetEl);
      }, { passive: false });
    });
  }

  /**
   * Плавний скрол з урахуванням прилиплих хедерів, safe-area тощо
   * @param {Element} el
   */
  scrollTo(el) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    // Можеш змінити відступ, якщо маєш sticky-меню
    const offset = 8;
    window.scrollTo({ top: Math.max(0, top - offset), behavior: 'smooth' });
  }
}

// ініціалізація після готовності DOM
document.addEventListener('DOMContentLoaded', () => {
  new HeroNav();
});
