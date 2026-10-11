import { navLinks } from '../data/navigation.js';

export function renderNavbar(currentPath) {
  const linksHtml = navLinks.map(link => {
    const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
    const activeClass = isActive ? 'active' : '';
    const highlightClass = link.highlight ? 'nav-highlight' : '';
    return `
      <li class="nav-item">
        <a href="#${link.path}" class="${activeClass} ${highlightClass}">${link.label}</a>
      </li>
    `;
  }).join('');

  return `
    <header class="navbar">
      <div class="container navbar-container">
        <a href="#/" class="nav-brand">
          <span>Nitin</span> Kumar
        </a>
        <div class="nav-right-cluster">
          <ul class="nav-links" id="nav-links">
            ${linksHtml}
          </ul>
          <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle light/dark theme" title="Toggle theme">
            🌙
          </button>
          <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Toggle navigation menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  `;
}

export function attachNavbarListeners() {
  const mobileBtn = document.getElementById('mobile-toggle-btn');
  const links = document.getElementById('nav-links');
  const themeBtn = document.getElementById('theme-toggle-btn');

  // Mobile menu toggle
  if (mobileBtn && links) {
    mobileBtn.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }

  // Theme toggle
  if (themeBtn) {
    // Restore saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeBtn.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeBtn.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '🌙';
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '☀️';
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }
}
