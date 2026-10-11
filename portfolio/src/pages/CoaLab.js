import { renderSectionHeader } from '../components/SectionHeader.js';

export function renderCoaLab() {
  return `
    <div class="coa-lab-page">
      <section class="section">
        <div class="container">
          ${renderSectionHeader(
            "Priority Feature Hub",
            "Computer Organization & Architecture (COA) Lab",
            "Interactive demonstration tools for CPU instruction formats and digital number system representations."
          )}

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; margin-top: 2rem;">
            <!-- ISS Tool Card -->
            <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between; border-color: var(--border-hover);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <span class="badge badge-violet">Tool #1 • ISS Engine</span>
                  <span class="badge badge-cyan">Live Simulator</span>
                </div>
                <h3 style="font-size: 1.6rem; margin-bottom: 0.75rem; color: var(--text-primary);">
                  Instruction Set Simulator
                </h3>
                <p style="font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem; color: var(--text-secondary);">
                  Interactive CPU architecture engine that parses arithmetic expressions via Dijkstra's Shunting-Yard and generates assembly instructions across <strong style="color: var(--text-primary);">3-Address (3AC)</strong>, <strong style="color: var(--text-primary);">2-Address (2AC)</strong>, <strong style="color: var(--text-primary);">1-Address (1AC)</strong>, and <strong style="color: var(--text-primary);">0-Address (0AC)</strong> instruction formats while tracking total instruction counts.
                </p>
                <ul style="list-style: none; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.45rem;">
                  <li><span style="color: var(--accent-violet);">✔</span> Real-time infix expression validation</li>
                  <li><span style="color: var(--accent-violet);">✔</span> Side-by-side assembly code comparison</li>
                  <li><span style="color: var(--accent-violet);">✔</span> Instruction count analysis &amp; 1-click copy</li>
                </ul>
              </div>
              <div>
                <a href="#/coa-lab/instruction-set-simulator" class="btn btn-primary" style="width: 100%;">
                  Open Instruction Set Simulator →
                </a>
              </div>
            </div>

            <!-- Number Converter Tool Card -->
            <div class="card-editorial" style="display: flex; flex-direction: column; justify-content: space-between; border-color: var(--border-cyan);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <span class="badge badge-cyan">Tool #2 • Number Systems</span>
                  <span class="badge badge-cyan">Live Converter</span>
                </div>
                <h3 style="font-size: 1.6rem; margin-bottom: 0.75rem; color: var(--text-primary);">
                  Number System Converter
                </h3>
                <p style="font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem; color: var(--text-secondary);">
                  Multi-radix mathematical converter supporting <strong style="color: var(--text-primary);">Binary (Base 2)</strong>, <strong style="color: var(--text-primary);">Octal (Base 8)</strong>, <strong style="color: var(--text-primary);">Decimal (Base 10)</strong>, and <strong style="color: var(--text-primary);">Hexadecimal (Base 16)</strong> for both integer and fractional values with optional step-by-step mathematical explanations.
                </p>
                <ul style="list-style: none; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.45rem;">
                  <li><span style="color: var(--accent-cyan);">✔</span> Integer &amp; Fractional numbers (e.g. 101101, 10.625)</li>
                  <li><span style="color: var(--accent-cyan);">✔</span> BigInt precision &amp; exact radix calculation</li>
                  <li><span style="color: var(--accent-cyan);">✔</span> Step-by-step mathematical breakdown</li>
                </ul>
              </div>
              <div>
                <a href="#/coa-lab/number-system-converter" class="btn btn-cyan" style="width: 100%;">
                  Open Number System Converter →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
