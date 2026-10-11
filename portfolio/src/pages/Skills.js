import { skillsData } from '../data/skills.js';
import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderSkills() {
  const renderSkillGrid = (items, badgeType = 'badge-violet', borderType = 'var(--border-subtle)') => items.map(item => `
    <div style="padding: 0.95rem 1.25rem; background: var(--card-bg); border: 1px solid ${borderType}; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-subtle);">
      <strong style="font-size: 0.985rem; color: var(--text-primary);">${item.name}</strong>
      <span class="badge ${badgeType}" style="font-size: 0.725rem;">${item.status}</span>
    </div>
  `).join('');

  const domainsHtml = skillsData.coreDomains.map(domain => `
    <div class="card-editorial" style="padding: 1.35rem; border-color: var(--border-hover);">
      <div style="color: var(--accent-cyan); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.35rem;">◆ Focus Domain</div>
      <h3 style="font-size: 1.1rem; color: var(--text-primary);">${domain}</h3>
    </div>
  `).join('');

  const interpersonalHtml = skillsData.interpersonal.map(skill => `
    <span class="badge badge-cyan" style="font-size: 0.85rem; padding: 0.5rem 1rem;">${skill}</span>
  `).join('');

  return `
    <div class="skills-page">
      <section class="section">
        <div class="container-narrow">
          ${renderSectionHeader(
            "Technical Matrix",
            "Skills & Technical Stack",
            "Full technical skillset verified from active development, coursework, and certifications."
          )}

          <!-- Programming Languages -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Programming Languages</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.programmingLanguages, 'badge-violet', 'var(--border-cyan)')}
            </div>
          </div>

          <!-- AI & Machine Learning -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Artificial Intelligence &amp; Machine Learning</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.aiAndMachineLearning, 'badge-cyan')}
            </div>
          </div>

          <!-- Cybersecurity -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Cybersecurity &amp; Application Security</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.cybersecurity, 'badge-violet')}
            </div>
          </div>

          <!-- Data & ML Tools -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Data Science &amp; ML Tooling</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.dataAndMlTools, 'badge-cyan')}
            </div>
          </div>

          <!-- Core CS -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Core Computer Science &amp; Systems</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.coreCs, 'badge-violet')}
            </div>
          </div>

          <!-- Cloud & DevOps -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Cloud, Tools &amp; DevOps</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              ${renderSkillGrid(skillsData.cloudAndDevOps, 'badge-cyan')}
            </div>
          </div>

          <!-- Interpersonal Skills -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Interpersonal &amp; Problem-Solving Skills</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              ${interpersonalHtml}
            </div>
          </div>

          <!-- Core Focus Domains -->
          <div>
            <h3 style="margin-bottom: 1rem; font-size: 1.35rem; color: var(--text-primary);">Core Focus Domains</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
              ${domainsHtml}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
