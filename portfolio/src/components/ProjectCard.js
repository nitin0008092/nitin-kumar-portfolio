export function renderProjectCard(project) {
  const techBadges = project.technologies.map(tech => `
    <span class="badge badge-violet">${tech}</span>
  `).join('');

  const primaryAction = project.isLabTool ? `
    <a href="#${project.labRoute}" class="btn btn-cyan btn-sm">
      Open Interactive Tool →
    </a>
  ` : `
    <a href="${project.repository}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      View Source on GitHub ↗
    </a>
  `;

  return `
    <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem;">
          <span class="badge badge-cyan">${project.category}</span>
          <span style="font-size: 0.75rem; color: var(--accent-violet); font-weight: 600;">● ${project.status}</span>
        </div>
        <h3 style="margin-bottom: 0.5rem; font-size: 1.45rem; color: var(--text-primary);">${project.title}</h3>
        <p style="font-size: 0.95rem; margin-bottom: 1rem; color: var(--accent-cyan); font-weight: 600; font-family: var(--font-sans);">
          ${project.tagline}
        </p>
        <p style="font-size: 0.925rem; line-height: 1.65; margin-bottom: 1.25rem; color: var(--text-secondary);">
          ${project.description}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.25rem;">
          ${techBadges}
        </div>
      </div>
      <div>
        ${primaryAction}
      </div>
    </div>
  `;
}
