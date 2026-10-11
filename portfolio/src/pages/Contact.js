import { profileData } from '../data/profile.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { showToast } from '../components/Toast.js';

export function renderContact() {
  return `
    <div class="contact-page">
      <section class="section">
        <div class="container" style="max-width: 960px;">
          ${renderSectionHeader(
            "Direct Communication",
            "Get In Touch",
            "Have a technical inquiry, collaboration proposal, or project discussion? Reach out directly via email, phone, or LinkedIn."
          )}

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 2rem;">
            <!-- Contact Info Card -->
            <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.4rem; margin-bottom: 1.5rem; color: var(--text-primary);">Contact Details</h3>

                <div style="display: flex; flex-direction: column; gap: 1.35rem;">
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 44px; height: 44px; background: var(--accent-violet-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid var(--border-hover); flex-shrink: 0;">
                      ✉️
                    </div>
                    <div>
                      <span style="font-size: 0.8rem; color: var(--text-muted); display: block; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</span>
                      <a href="mailto:${profileData.email}" style="font-weight: 600; font-size: 1rem; color: var(--accent-violet);">
                        ${profileData.email}
                      </a>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 44px; height: 44px; background: var(--accent-violet-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid var(--border-hover); flex-shrink: 0;">
                      📞
                    </div>
                    <div>
                      <span style="font-size: 0.8rem; color: var(--text-muted); display: block; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone Number</span>
                      <a href="tel:${profileData.phone}" style="font-weight: 600; font-size: 1rem; color: var(--accent-violet);">
                        +91 ${profileData.phone}
                      </a>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 44px; height: 44px; background: var(--accent-cyan-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid var(--border-cyan); flex-shrink: 0;">
                      💼
                    </div>
                    <div>
                      <span style="font-size: 0.8rem; color: var(--text-muted); display: block; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">LinkedIn Profile</span>
                      <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; font-size: 0.95rem; color: var(--accent-cyan);">
                        linkedin.com/in/nitin-kumar ↗
                      </a>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 44px; height: 44px; background: var(--accent-cyan-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid var(--border-cyan); flex-shrink: 0;">
                      💻
                    </div>
                    <div>
                      <span style="font-size: 0.8rem; color: var(--text-muted); display: block; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">GitHub Profile</span>
                      <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; font-size: 0.95rem; color: var(--accent-cyan);">
                        github.com/nitin0008092 ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); font-size: 0.85rem; color: var(--text-muted);">
                📍 Location: India • Chandigarh University CSE (AI)
              </div>
            </div>

            <!-- Mailto Form -->
            <div class="card-editorial">
              <h3 style="font-size: 1.4rem; margin-bottom: 1.5rem; color: var(--text-primary);">Send a Direct Email</h3>
              
              <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div class="form-group" style="margin: 0;">
                  <label for="contact-name" class="form-label">Your Name:</label>
                  <input type="text" id="contact-name" class="form-control" placeholder="e.g. Alex Smith" required />
                </div>

                <div class="form-group" style="margin: 0;">
                  <label for="contact-subject" class="form-label">Subject:</label>
                  <input type="text" id="contact-subject" class="form-control" placeholder="e.g. Project Inquiry / Discussion" required />
                </div>

                <div class="form-group" style="margin: 0;">
                  <label for="contact-message" class="form-label">Message:</label>
                  <textarea id="contact-message" class="form-control" rows="4" placeholder="Write your message here..." required></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                  Compose &amp; Send Email ↗
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function attachContactListeners() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const body = document.getElementById('contact-message').value.trim();

      const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nitin,\n\n${body}\n\nBest regards,\n${name}`)}`;
      
      showToast("Opening default mail client...");
      window.location.href = mailtoUrl;
    });
  }
}
