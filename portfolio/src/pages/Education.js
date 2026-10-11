import { educationData } from '../data/education.js';
import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderEducation() {
  const cardsHtml = educationData.map(item => `
    <div class="card-editorial" style="margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.45rem; color: var(--text-primary); margin-bottom: 0.25rem;">${item.degree}</h3>
          <p style="font-size: 1.1rem; color: var(--accent-violet); font-weight: 600;">${item.institution}</p>
        </div>
        <div style="text-align: right;">
          <span class="badge badge-violet">${item.timeline}</span>
          ${item.board ? `<span class="badge badge-cyan" style="margin-left: 0.5rem;">${item.board}</span>` : ''}
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">📍 ${item.location}</p>
        </div>
      </div>

      ${item.cgpa ? `
      <div style="margin-top: 1.25rem; padding: 1.1rem 1.35rem; background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary)); border-radius: var(--radius-md); border: 1px solid var(--border-cyan); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <span style="font-size: 0.95rem; color: var(--text-secondary);">Reported Academic Performance:</span>
        <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); font-family: var(--font-mono);">
          CGPA: <span style="color: var(--accent-cyan);">${item.cgpa}</span>
        </span>
      </div>
      ` : ''}

      <div style="margin-top: 1.5rem;">
        <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--text-primary);">Key Details:</h4>
        <ul style="list-style-type: square; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.75; font-size: 0.95rem;">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  return `
    <div class="education-page">
      <section class="section">
        <div class="container-narrow">
          ${renderSectionHeader(
            "Academic Timeline",
            "Education & Academic Credentials",
            "Pursuing a Bachelor of Engineering in Computer Science and Engineering (AI) at Chandigarh University × Microsoft Bytexl."
          )}

          ${cardsHtml}
        </div>
      </section>
    </div>
  `;
}
