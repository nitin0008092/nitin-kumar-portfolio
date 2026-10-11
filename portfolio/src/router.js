import { renderHome } from './pages/Home.js';
import { renderAbout } from './pages/About.js';
import { renderProjects } from './pages/Projects.js';
import { renderCoaLab } from './pages/CoaLab.js';
import { renderIssPage, attachIssListeners } from './pages/IssPage.js';
import { renderConverterPage, attachConverterListeners } from './pages/ConverterPage.js';
import { renderSkills } from './pages/Skills.js';
import { renderEducation } from './pages/Education.js';
import { renderCertifications } from './pages/Certifications.js';
import { renderResumePage, attachResumeListeners } from './pages/ResumePage.js';
import { renderEmptyStatePage } from './pages/EmptyStatePage.js';
import { renderContact, attachContactListeners } from './pages/Contact.js';
import { renderNavbar, attachNavbarListeners } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';

export const routes = {
  '/': { render: renderHome, title: 'Nitin Kumar — CSE (AI) Student & Aspiring AI Developer' },
  '/about': { render: renderAbout, title: 'About Nitin Kumar — Background & Technical Focus' },
  '/projects': { render: renderProjects, title: 'Projects Archive — Nitin Kumar Portfolio' },
  '/coa-lab': { render: renderCoaLab, title: 'COA Lab — Computer Architecture Demonstration Tools' },
  '/coa-lab/instruction-set-simulator': {
    render: renderIssPage,
    attachListeners: attachIssListeners,
    title: 'Instruction Set Simulator — COA Lab'
  },
  '/coa-lab/number-system-converter': {
    render: renderConverterPage,
    attachListeners: attachConverterListeners,
    title: 'Number System Converter — COA Lab'
  },
  '/skills': { render: renderSkills, title: 'Skills & Technical Stack — Nitin Kumar' },
  '/education': { render: renderEducation, title: 'Education — Chandigarh University B.E. CSE (AI)' },
  '/certifications': { render: renderCertifications, title: 'Certifications — Microsoft AI-900 & AZ-900' },
  '/resume': { render: renderResumePage, attachListeners: attachResumeListeners, title: 'Resume & Curriculum Vitae — Nitin Kumar' },
  '/achievements': { render: () => renderEmptyStatePage('achievements'), title: 'Achievements — Nitin Kumar' },
  '/gallery': { render: () => renderEmptyStatePage('gallery'), title: 'Gallery — Nitin Kumar' },
  '/contact': { render: renderContact, attachListeners: attachContactListeners, title: 'Contact — Nitin Kumar' }
};

export function getCleanPath() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === '') return '/';
  return hash.length > 1 && hash.endsWith('/') ? hash.slice(0, -1) : hash;
}

export function handleRoute() {
  const path = getCleanPath();
  const route = routes[path] || routes['/'];

  document.title = route.title || 'Nitin Kumar — Portfolio';

  const appEl = document.getElementById('app');
  if (!appEl) return;

  const navbarHtml = renderNavbar(path);
  const pageHtml = route.render();
  const footerHtml = renderFooter();

  appEl.innerHTML = `
    ${navbarHtml}
    <main id="main-content">
      ${pageHtml}
    </main>
    ${footerHtml}
  `;

  attachNavbarListeners();

  if (route.attachListeners) {
    route.attachListeners();
  }

  window.scrollTo(0, 0);
}
