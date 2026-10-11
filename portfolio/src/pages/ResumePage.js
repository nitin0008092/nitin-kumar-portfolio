import { profileData } from '../data/profile.js';
import { educationData } from '../data/education.js';
import { projectsData } from '../data/projects.js';
import { skillsData } from '../data/skills.js';
import { certificationsData } from '../data/certifications.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { showToast } from '../components/Toast.js';

export function renderResumePage() {
  const resumePdfUrl = profileData.assets.resumeUrl || '/assets/Nitin_Kumar_Resume.pdf';
  const resumeDocxUrl = profileData.assets.resumeDocxUrl || '/assets/Nitin_Kumar_Resume.docx';
  const resumePreviewImg = profileData.assets.resumePreview || '/assets/resume_preview.jpg';

  const languagesText = skillsData.programmingLanguages.map(l => l.name).join(', ');
  const cyberText = skillsData.cybersecurity.map(c => c.name).join(', ');
  const aiText = skillsData.aiAndMachineLearning.map(a => a.name).join(', ');
  const toolsText = skillsData.dataAndMlTools.map(t => t.name).join(', ');
  const coreCsText = skillsData.coreCs.map(c => c.name).join(', ');
  const cloudText = skillsData.cloudAndDevOps.map(c => c.name).join(', ');

  const projectsListHtml = projectsData.map(p => `
    <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; margin-bottom: 0.35rem;">
        <strong style="font-size: 1.05rem; color: var(--text-primary);">${p.title}</strong>
        <span class="badge badge-cyan" style="font-size: 0.7rem;">${p.category}</span>
      </div>
      <p style="font-size: 0.925rem; color: var(--text-secondary); margin-top: 0.25rem; line-height: 1.6;">
        ${p.description}
      </p>
      <div style="font-size: 0.825rem; color: var(--accent-violet); font-family: var(--font-mono); margin-top: 0.4rem;">
        Technologies: ${p.technologies.join(', ')}
      </div>
    </div>
  `).join('');

  const certsListHtml = certificationsData.map(c => `
    <div style="margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
      <div>
        <span style="font-weight: 600; color: var(--text-primary);">${c.title}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">(Issued: ${c.dateIssued})</span>
      </div>
      <span class="badge badge-cyan">Verification: ${c.verificationCode}</span>
    </div>
  `).join('');

  const educationListHtml = educationData.map(edu => `
    <div style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
        <div>
          <strong style="font-size: 1.05rem; color: var(--text-primary);">${edu.degree}</strong>
          <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.95rem;">${edu.institution}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${edu.timeline}</span>
          ${edu.cgpa ? `<p style="font-size: 0.85rem; color: var(--text-secondary);">CGPA: <strong style="color: var(--accent-cyan);">${edu.cgpa}</strong></p>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="resume-page">
      <section class="section">
        <div class="container-narrow">
          ${renderSectionHeader(
            "Curriculum Vitae",
            "Resume & Professional Profile",
            "Official academic background, software projects, certifications, and technical skills."
          )}

          <!-- Action Bar (View & Download) -->
          <div class="card-editorial" style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border-color: var(--border-hover);">
            <div>
              <h3 style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.25rem;">Nitin Kumar — Resume Document</h3>
              <p style="font-size: 0.875rem; color: var(--accent-violet);">
                Available in official PDF &amp; editable Word (.docx) formats
              </p>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="${resumePdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                👁 View PDF
              </a>
              <a href="${resumePdfUrl}" download="Nitin_Kumar_Resume.pdf" class="btn btn-primary btn-sm">
                📥 Download PDF
              </a>
              <a href="${resumeDocxUrl}" download="Nitin_Kumar_Resume.docx" class="btn btn-cyan btn-sm">
                📄 Download Word (.docx)
              </a>
            </div>
          </div>

          <!-- Printable / Web CV Card -->
          <div class="card-editorial" style="padding: clamp(2rem, 4vw, 3rem); margin-bottom: 2.5rem;">
            <!-- Header -->
            <div style="border-bottom: 2px solid var(--accent-violet); padding-bottom: 1.5rem; margin-bottom: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                  <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-primary); margin-bottom: 0.35rem;">
                    ${profileData.fullName}
                  </h2>
                  <p style="font-size: 1.05rem; font-weight: 600; color: var(--accent-violet); margin-bottom: 0.75rem;">
                    ${profileData.role} • Chandigarh University × Microsoft
                  </p>
                </div>
                <div class="profile-avatar-frame" style="width: 80px; height: 80px; padding: 3px; border-radius: var(--radius-lg);">
                  <div class="profile-avatar-inner" style="border-radius: calc(var(--radius-lg) - 2px);">
                    <img src="${profileData.assets.avatar}" alt="Nitin Kumar" class="profile-avatar-img" />
                  </div>
                </div>
              </div>
              
              <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.75rem;">
                <span>✉️ <a href="mailto:${profileData.email}" style="color: var(--accent-cyan); font-weight: 600;">${profileData.email}</a></span>
                <span>📞 <a href="tel:${profileData.phone}" style="color: var(--accent-cyan); font-weight: 600;">+91 ${profileData.phone}</a></span>
                <span>📍 ${profileData.location}</span>
                <span>💼 <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-violet); font-weight: 600;">LinkedIn ↗</a></span>
                <span>💻 <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-violet); font-weight: 600;">GitHub ↗</a></span>
              </div>
            </div>

            <!-- Career Objective -->
            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Career Objective
              </h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
                ${profileData.careerObjective}
              </p>
            </div>

            <!-- Education -->
            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Education
              </h3>
              ${educationListHtml}
            </div>

            <!-- Technical Skills -->
            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Technical Skills
              </h3>
              <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.925rem; color: var(--text-secondary);">
                <div><strong style="color: var(--text-primary);">Languages:</strong> ${languagesText}</div>
                <div><strong style="color: var(--text-primary);">Cybersecurity:</strong> ${cyberText}</div>
                <div><strong style="color: var(--text-primary);">AI / ML:</strong> ${aiText}</div>
                <div><strong style="color: var(--text-primary);">Data &amp; ML Tools:</strong> ${toolsText}</div>
                <div><strong style="color: var(--text-primary);">Core CS:</strong> ${coreCsText}</div>
                <div><strong style="color: var(--text-primary);">Cloud &amp; DevOps:</strong> ${cloudText}</div>
              </div>
            </div>

            <!-- Projects -->
            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Software &amp; Architecture Projects
              </h3>
              ${projectsListHtml}
            </div>

            <!-- Certifications -->
            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Certifications
              </h3>
              ${certsListHtml}
            </div>

            <!-- Interpersonal Skills -->
            <div>
              <h3 style="font-size: 1.1rem; color: var(--accent-violet); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); margin-bottom: 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-subtle);">
                Interpersonal Skills
              </h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary);">
                ${skillsData.interpersonal.join('  •  ')}
              </p>
            </div>
          </div>

          <!-- Uploaded Document Visual Scan -->
          <div class="card-editorial">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
              <h3 style="font-size: 1.25rem; color: var(--text-primary);">Original Document Reference</h3>
              <span class="badge badge-cyan">Document Scan</span>
            </div>
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; background: #000; text-align: center;">
              <img 
                src="${resumePreviewImg}" 
                alt="Nitin Kumar Resume Scan" 
                style="max-width: 100%; height: auto; display: block; margin: 0 auto; cursor: pointer;"
                onclick="window.open('${resumePreviewImg}', '_blank')"
                title="Click to view full scan"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function attachResumeListeners() {
  // Listeners if needed
}
