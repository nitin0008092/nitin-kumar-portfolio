export function renderEmptyStatePage(type) {
  let title = '';
  let subtitle = '';
  let message = '';
  let icon = '📁';
  let configHelp = '';

  if (type === 'resume') {
    title = 'Resume Unavailable';
    subtitle = 'Curriculum Vitae Asset Status';
    icon = '📄';
    message = 'No official resume PDF has been attached to this portfolio yet. Nitin\'s academic and technical summary is fully outlined on the About and Education pages.';
    configHelp = `
      <div style="margin-top: 1.5rem; text-align: left; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); font-size: 0.875rem;">
        <strong style="color: var(--accent-violet);">How to add a resume PDF:</strong>
        <p style="margin-top: 0.5rem; color: var(--text-secondary);">
          Place your resume file (e.g. <code>resume.pdf</code>) in the public folder and update <code>profileData.assets.resumeUrl</code> in <code>src/data/profile.js</code>.
        </p>
      </div>
    `;
  } else if (type === 'gallery') {
    title = 'Gallery Empty State';
    subtitle = 'Visual & Workshop Media';
    icon = '🖼️';
    message = 'No personal photos, project screenshots, or gallery media assets have been supplied yet. Fictional or stock portraits are deliberately omitted in accordance with the non-fabrication policy.';
    configHelp = `
      <div style="margin-top: 1.5rem; text-align: left; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); font-size: 0.875rem;">
        <strong style="color: var(--accent-violet);">How to add gallery images:</strong>
        <p style="margin-top: 0.5rem; color: var(--text-secondary);">
          Add image files to your project and configure gallery image objects with alt text in <code>src/data/profile.js</code>.
        </p>
      </div>
    `;
  } else if (type === 'achievements') {
    title = 'Achievements & Honors';
    subtitle = 'Competitions & Competition Records';
    icon = '🏆';
    message = 'No external competition or hackathon records have been supplied yet. Honest omissions are preserved until verified credentials become available.';
  }

  return `
    <div class="empty-state-page">
      <section class="section">
        <div class="container" style="max-width: 720px; text-align: center;">
          <div class="card-editorial" style="padding: 3.5rem 2rem;">
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">${icon}</div>
            <div style="color: var(--accent-cyan); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">◆ ${subtitle}</div>
            <h2 style="margin-top: 0.5rem; margin-bottom: 1rem; color: var(--text-primary);">${title}</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; max-width: 550px; margin: 0 auto;">
              ${message}
            </p>

            ${configHelp}

            <div style="margin-top: 2rem;">
              <a href="#/" class="btn btn-primary btn-sm">
                ← Return to Home Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
