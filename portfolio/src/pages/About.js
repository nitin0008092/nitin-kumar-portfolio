import { profileData } from '../data/profile.js';
import { educationData } from '../data/education.js';
import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderAbout() {
  const paragraphsHtml = profileData.aboutDetailed.map(p => `
    <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.25rem; color: var(--text-secondary);">
      ${p}
    </p>
  `).join('');

  return `
    <div class="about-page">
      <section class="section">
        <div class="container-narrow">
          ${renderSectionHeader("Editorial Overview", "About Nitin Kumar", "Computer Science & Artificial Intelligence Student at Chandigarh University × Microsoft")}
          
          <!-- Hero About Grid with Real Portrait -->
          <div class="card-editorial" style="margin-bottom: 2.5rem; display: grid; grid-template-columns: 240px 1fr; gap: 2.5rem; align-items: start;">
            <div style="text-align: center;">
              <div class="profile-avatar-frame" style="width: 200px; height: 200px; margin: 0 auto 1.25rem;">
                <div class="profile-avatar-inner">
                  <img src="${profileData.assets.avatar}" alt="${profileData.fullName} Portrait" class="profile-avatar-img" />
                </div>
              </div>
              <h4 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.25rem;">${profileData.fullName}</h4>
              <p style="font-size: 0.85rem; color: var(--accent-violet); font-weight: 600;">${profileData.role}</p>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">📍 ${profileData.location}</p>
              <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1rem;">
                <a href="${profileData.assets.resumeUrl}" download="Nitin_Kumar_Resume.pdf" class="btn btn-primary btn-sm" style="font-size: 0.785rem; padding: 0.45rem 0.85rem;">
                  📥 Resume
                </a>
                <a href="#/contact" class="btn btn-secondary btn-sm" style="font-size: 0.785rem; padding: 0.45rem 0.85rem;">
                  ✉️ Contact
                </a>
              </div>
            </div>

            <div>
              <div style="font-size: 1.15rem; font-weight: 500; color: var(--text-primary); margin-bottom: 1.25rem; line-height: 1.6; border-left: 3px solid var(--accent-violet); padding-left: 1rem;">
                "${profileData.headline}"
              </div>
              ${paragraphsHtml}
            </div>
          </div>

          <!-- Academic & Technical Cards -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div class="card-editorial">
              <div style="color: var(--accent-violet); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
                ◆ Academic Credentials
              </div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.85rem; color: var(--text-primary);">${educationData[0].institution}</h3>
              <ul style="list-style-type: square; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.75; font-size: 0.95rem;">
                <li>${educationData[0].degree}</li>
                <li>Timeline: ${educationData[0].timeline}</li>
                <li>Reported CGPA: <strong style="color: var(--accent-cyan);">${educationData[0].cgpa}</strong></li>
                <li>Location: ${educationData[0].location}</li>
              </ul>
            </div>

            <div class="card-editorial">
              <div style="color: var(--accent-violet); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
                ◆ Core Competencies
              </div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.85rem; color: var(--text-primary);">Technical Domains</h3>
              <ul style="list-style-type: square; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.75; font-size: 0.95rem;">
                <li>Artificial Intelligence &amp; Machine Learning (ML, DL, NLP, LLMs)</li>
                <li>Instruction Set Simulation &amp; COA Computer Architecture</li>
                <li>Cybersecurity &amp; OWASP Web Vulnerability Scanning</li>
                <li>Software Engineering in Python, C++, C &amp; DSA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
