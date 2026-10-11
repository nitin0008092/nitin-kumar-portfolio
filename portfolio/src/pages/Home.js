import { profileData } from '../data/profile.js';
import { projectsData } from '../data/projects.js';
import { renderProjectCard } from '../components/ProjectCard.js';
import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderHome() {
  const featuredProjects = projectsData.filter(p => p.featured);
  const projectCardsHtml = featuredProjects.map(renderProjectCard).join('');

  const focusCardsHtml = profileData.currentFocus.map(item => `
    <div class="card-editorial" style="padding: 1.6rem;">
      <div style="color: var(--accent-violet); font-size: 0.8rem; font-weight: 700; font-family: var(--font-sans); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.4rem;">
        ◆ Focus Domain
      </div>
      <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-primary);">${item.title}</h3>
      <p style="font-size: 0.925rem; line-height: 1.65; color: var(--text-secondary);">${item.desc}</p>
    </div>
  `).join('');

  // Profile photo or initials placeholder
  const avatarHtml = profileData.assets.avatar
    ? `<img src="${profileData.assets.avatar}" alt="Nitin Kumar portrait" class="profile-avatar-img" />`
    : `<div class="profile-avatar-placeholder">
        <div class="profile-avatar-initials">NK</div>
        <span style="font-size: 0.75rem; opacity: 0.7;">Nitin Kumar</span>
      </div>`;

  return `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="section" style="padding-top: clamp(3.5rem, 7vw, 6rem); padding-bottom: clamp(3.5rem, 7vw, 6rem);">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 3rem; align-items: center; max-width: 1060px;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.4rem 1rem; background: var(--accent-violet-muted); border: 1px solid var(--border-hover); border-radius: var(--radius-pill); font-size: 0.85rem; font-weight: 600; color: var(--accent-violet); margin-bottom: 1.5rem;">
                <span style="color: var(--accent-cyan);">●</span> Chandigarh University × Microsoft • B.E. CSE (AI) 2025–2029
              </div>
              
              <h1 style="margin-bottom: 1.25rem; font-family: var(--font-serif); color: var(--text-primary); line-height: 1.15;">
                Curious Mind. <span style="color: var(--accent-violet); font-style: italic;">Creative Code.</span><br />
                Future Innovator.
              </h1>
              
              <p style="font-size: clamp(1.1rem, 2vw, 1.25rem); font-weight: 500; color: var(--text-primary); margin-bottom: 1.25rem; line-height: 1.5;">
                I am <strong>${profileData.fullName}</strong> — ${profileData.headline}
              </p>
              
              <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 2.25rem; max-width: 680px; line-height: 1.7;">
                ${profileData.shortBio}
              </p>

              <!-- Hero Action Buttons -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; align-items: center; margin-bottom: 2.5rem;">
                <a href="#/projects" class="btn btn-primary">
                  Explore My Work →
                </a>
                <a href="#/coa-lab/instruction-set-simulator" class="btn btn-cyan">
                  ⚡ ISS Simulator
                </a>
                <a href="#/coa-lab/number-system-converter" class="btn btn-cyan">
                  🔢 Number Converter
                </a>
                <a href="#/resume" class="btn btn-secondary">
                  📄 View Resume
                </a>
                <a href="${profileData.assets.resumeUrl}" download="Nitin_Kumar_Resume.pdf" class="btn btn-outline-violet" title="Download Resume PDF">
                  📥 PDF
                </a>
                <a href="${profileData.assets.resumeDocxUrl}" download="Nitin_Kumar_Resume.docx" class="btn btn-outline-violet" title="Download Resume Word Document">
                  📝 Word (.docx)
                </a>
              </div>

              <!-- Stats Bar -->
              <div style="display: flex; flex-wrap: wrap; gap: 1.75rem; padding: 1.25rem 1.75rem; background: var(--card-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: var(--shadow-subtle);">
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-cyan); font-weight: 700; display: block;">Degree</span>
                  <strong style="color: var(--text-primary); font-size: 0.95rem;">B.E. CSE (AI)</strong>
                </div>
                <div style="width: 1px; background: var(--border-subtle);"></div>
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-cyan); font-weight: 700; display: block;">Institution</span>
                  <strong style="color: var(--text-primary); font-size: 0.95rem;">Chandigarh University × Microsoft</strong>
                </div>
                <div style="width: 1px; background: var(--border-subtle);"></div>
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-cyan); font-weight: 700; display: block;">Academic Score</span>
                  <strong style="color: var(--text-primary); font-size: 0.95rem;">CGPA: 8.0</strong>
                </div>
                <div style="width: 1px; background: var(--border-subtle);"></div>
                <div>
                  <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-violet); font-weight: 700; display: block;">Certifications</span>
                  <a href="#/certifications" style="color: var(--accent-violet); font-size: 0.95rem; font-weight: 700;">AI-900 &amp; AZ-900 ↗</a>
                </div>
              </div>
            </div>

            <!-- Profile Photo -->
            <div class="profile-avatar-frame" style="flex-shrink: 0;" id="hero-avatar">
              <div class="profile-avatar-inner">
                ${avatarHtml}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Editorial Intro Section (Tinted Background) -->
      <section class="section section-tinted">
        <div class="container">
          <div style="max-width: 880px;">
            ${renderSectionHeader(
              "Academic & Technical Orientation",
              "Hands-on Systems & Intelligent Software",
              "Bridging high-level artificial intelligence models with low-level computer organization, system architecture, and cybersecurity.",
              true
            )}
            <div class="card-editorial" style="border-left: 4px solid var(--accent-violet);">
              <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary);">
                ${profileData.careerObjective}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects Section -->
      <section class="section">
        <div class="container">
          ${renderSectionHeader(
            "Portfolio Highlights",
            "Featured Projects",
            "Real practical projects in artificial intelligence, cybersecurity, systems programming, and computer organization."
          )}

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.75rem;">
            ${projectCardsHtml}
          </div>

          <div style="text-align: center; margin-top: 3rem;">
            <a href="#/projects" class="btn btn-secondary">
              View Complete Project Archive →
            </a>
          </div>
        </div>
      </section>

      <!-- COA Lab Feature Callout -->
      <section class="section section-tinted">
        <div class="container">
          ${renderSectionHeader(
            "COA Interactive Tools",
            "Computer Organization & Architecture Tools",
            "Explore CPU instruction format transformations and multi-radix number system calculations."
          )}

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
            <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between; border-color: var(--border-hover);">
              <div>
                <span class="badge badge-violet" style="margin-bottom: 0.75rem;">Tool 1 • ISS Engine</span>
                <h3 style="font-size: 1.45rem; margin-bottom: 0.5rem; color: var(--text-primary);">Instruction Set Simulator</h3>
                <p style="font-size: 0.925rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.25rem;">
                  Converts arithmetic expressions into 3AC, 2AC, 1AC, and 0AC CPU instruction formats with instruction counting and real-time syntax checking.
                </p>
              </div>
              <a href="#/coa-lab/instruction-set-simulator" class="btn btn-primary btn-sm" style="width: 100%;">
                Open Instruction Simulator →
              </a>
            </div>

            <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between; border-color: var(--border-cyan);">
              <div>
                <span class="badge badge-cyan" style="margin-bottom: 0.75rem;">Tool 2 • Number Systems</span>
                <h3 style="font-size: 1.45rem; margin-bottom: 0.5rem; color: var(--text-primary);">Number System Converter</h3>
                <p style="font-size: 0.925rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.25rem;">
                  Converts integer and fractional numbers between Binary, Octal, Decimal, and Hexadecimal with step-by-step mathematical explanations.
                </p>
              </div>
              <a href="#/coa-lab/number-system-converter" class="btn btn-cyan btn-sm" style="width: 100%;">
                Open Number Converter →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Closing CTA (Dark Gradient Section) -->
      <section class="section" style="background: linear-gradient(135deg, #0F0B1A 0%, #12151D 50%, #0A0C10 100%); border-top: 1px solid var(--border-subtle);">
        <div class="container" style="text-align: center; max-width: 700px;">
          <div class="section-eyebrow" style="color: var(--accent-cyan);">◆ Get In Touch</div>
          <h2 style="font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; color: var(--text-primary);">
            Have an interesting idea to build?
          </h2>
          <div class="section-divider"></div>
          <p style="margin-bottom: 2.25rem; font-size: 1.1rem; color: var(--text-secondary);">
            Let's connect. Open to discussing computer architecture, AI developments, software engineering projects, and technical ideas.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="mailto:${profileData.email}" class="btn btn-primary">
              Send Email
            </a>
            <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              GitHub Profile ↗
            </a>
            <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-violet">
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}
