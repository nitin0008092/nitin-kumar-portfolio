import { profileData } from '../data/profile.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container footer-content">
        <div>
          <h3 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.25rem;">${profileData.fullName}</h3>
          <p style="font-size: 0.875rem; color: var(--accent-violet);">
            ${profileData.role} • Chandigarh University
          </p>
        </div>
        <div class="footer-socials">
          <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="mailto:${profileData.email}">Email</a>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          © ${currentYear} ${profileData.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}
