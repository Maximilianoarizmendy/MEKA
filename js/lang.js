/**
 * MEKA — lang.js
 * Sistema de idioma compartido para todas las páginas del sitio.
 * Lee mekaLang de localStorage y aplica el idioma correcto.
 */
(function () {
  const STORAGE_KEY = 'mekaLang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'es';

  function applyLang() {
    /* 1 — data-es / data-en elements */
    document.querySelectorAll('[data-es]').forEach(el => {
      const text = el.getAttribute('data-' + currentLang);
      if (!text) return;
      if (text.includes('<') && text.includes('>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    /* 2 — .lang-es / .lang-en visibility blocks */
    document.querySelectorAll('.lang-es, .lang-en').forEach(el => {
      el.style.display = el.classList.contains('lang-' + currentLang) ? '' : 'none';
    });

    /* 3 — html lang attribute */
    document.documentElement.lang = currentLang;

    /* 4 — update toggle button label */
    const $label = document.getElementById('langText');
    if ($label) $label.textContent = currentLang.toUpperCase();
  }

  function toggle() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_KEY, currentLang);
    applyLang();
  }

  /* Attach toggle to any button with id="langToggle" */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggle);
    applyLang();
  });

  /* Run immediately too (before DOMContentLoaded) for faster initial paint */
  if (document.readyState !== 'loading') applyLang();
})();
