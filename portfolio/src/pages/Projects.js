import { projectsData } from '../data/projects.js';
import { renderProjectCard } from '../components/ProjectCard.js';
import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderProjects() {
  const cardsHtml = projectsData.map(renderProjectCard).join('');

  return `
    <div class="projects-page">
      <section class="section">
        <div class="container">
          ${renderSectionHeader(
            "Project Archive",
            "Software & Systems Projects",
            "Real practical software demonstrating artificial intelligence, cybersecurity, and computer architecture."
          )}

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.75rem;">
            ${cardsHtml}
          </div>
        </div>
      </section>
    </div>
  `;
}
