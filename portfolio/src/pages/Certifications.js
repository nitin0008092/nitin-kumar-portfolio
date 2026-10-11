import { certificationsData } from '../data/certifications.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { showToast } from '../components/Toast.js';

export function renderCertifications() {
  const cardsHtml = certificationsData.map(cert => `
    <div class="card-editorial" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.5rem;">
            <span class="badge badge-cyan">${cert.issuer}</span>
            <span class="badge badge-violet" style="font-size: 0.75rem;">${cert.status}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">${cert.code}</span>
          </div>
          <h3 style="font-size: 1.45rem; color: var(--text-primary); margin-bottom: 0.35rem;">${cert.title}</h3>
          <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6; max-width: 680px;">${cert.description}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block;">Issued Date</span>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${cert.dateIssued}</strong>
        </div>
      </div>

      <!-- Certificate Image Preview & Verification Strip -->
      <div style="display: grid; grid-template-columns: minmax(260px, 440px) 1fr; gap: 1.5rem; align-items: center; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
        <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--border-cyan); aspect-ratio: 16/9; background: #000;">
          <img 
            src="${cert.image}" 
            alt="${cert.title} Official Certificate" 
            style="width: 100%; height: 100%; object-fit: contain; cursor: pointer; transition: transform var(--transition-normal);"
            class="cert-img-preview"
            onclick="window.open('${cert.image}', '_blank')"
            title="Click to view full certificate"
          />
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-violet); font-weight: 700; display: block;">Certiport Verification Code</span>
            <code style="font-size: 1.15rem; color: var(--accent-cyan); font-weight: 700; font-family: var(--font-mono); letter-spacing: 0.05em;">${cert.verificationCode}</code>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.65rem;">
            <a href="${cert.image}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              🔍 View Full Certificate ↗
            </a>
            <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-violet btn-sm">
              🌐 Verify on Certiport ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="certifications-page">
      <section class="section">
        <div class="container-narrow">
          ${renderSectionHeader(
            "Official Microsoft Credentials",
            "Certifications & Verified Badges",
            "Genuine professional certifications earned through Microsoft technical training with verified credential IDs."
          )}

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            ${cardsHtml}
          </div>
        </div>
      </section>
    </div>
  `;
}
