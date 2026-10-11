import { PRESET_EXPRESSIONS, simulateExpression } from '../lib/issEngine.js';
import { showToast } from '../components/Toast.js';

export function renderIssPage() {
  const presetButtonsHtml = PRESET_EXPRESSIONS.map(expr => `
    <button class="btn btn-secondary btn-sm preset-btn" data-expr="${expr}">
      ${expr}
    </button>
  `).join('');

  return `
    <div class="iss-page">
      <section class="section">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <a href="#/coa-lab" style="font-size: 0.875rem; color: var(--accent-cyan); text-decoration: none; font-weight: 600;">← Back to COA Lab</a>
              <h1 style="font-size: 2.3rem; margin-top: 0.5rem; color: var(--text-primary);">Instruction Set Simulator</h1>
            </div>
            <a href="https://github.com/nitin0008092/coa-project" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              View Source on GitHub ↗
            </a>
          </div>

          <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 800px;">
            Translates arithmetic expressions into assembly code across four foundational CPU architectures: Three-Address, Two-Address, One-Address (Accumulator), and Zero-Address (Stack-based).
          </p>

          <!-- Input Workspace Card -->
          <div class="card-editorial" style="margin-bottom: 2rem;">
            <div class="form-group">
              <label for="iss-input" class="form-label">Arithmetic Expression (A-Z Variables, +, -, *, /, parenthesis):</label>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <input type="text" id="iss-input" class="form-control form-mono" value="(A+B)*(C-D)/E" placeholder="e.g. (A+B)*(C-D)/E" style="flex: 1; min-width: 260px;" />
                <button id="iss-run-btn" class="btn btn-primary">
                  Run Simulator
                </button>
                <button id="iss-clear-btn" class="btn btn-secondary">
                  Clear
                </button>
              </div>
            </div>

            <div style="margin-top: 1rem;">
              <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; margin-right: 0.5rem;">Preset Expressions:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                ${presetButtonsHtml}
              </div>
            </div>

            <!-- Error Banner -->
            <div id="iss-error-banner" style="display: none; margin-top: 1.25rem; padding: 0.85rem 1.25rem; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.4); border-radius: var(--radius-md); color: #F87171; font-size: 0.9rem;">
            </div>
          </div>

          <!-- Simulation Outputs Grid -->
          <div id="iss-outputs-container">
            <!-- Rendered via JS -->
          </div>
        </div>
      </section>
    </div>
  `;
}

export function attachIssListeners() {
  const inputEl = document.getElementById('iss-input');
  const runBtn = document.getElementById('iss-run-btn');
  const clearBtn = document.getElementById('iss-clear-btn');
  const errorBanner = document.getElementById('iss-error-banner');
  const outputsContainer = document.getElementById('iss-outputs-container');
  const presetBtns = document.querySelectorAll('.preset-btn');

  function updateSimulation() {
    if (!inputEl) return;
    const expr = inputEl.value;
    const sim = simulateExpression(expr);

    if (!sim.isValid) {
      if (errorBanner) {
        errorBanner.style.display = 'block';
        errorBanner.textContent = `Error: ${sim.error}`;
      }
      if (outputsContainer) outputsContainer.innerHTML = '';
      return;
    }

    if (errorBanner) errorBanner.style.display = 'none';

    // Format code blocks
    const format3AC = sim.threeAddress.instructions.map(i => i.code).join('\n');
    const format2AC = sim.twoAddress.instructions.map(i => i.code).join('\n');
    const format1AC = sim.oneAddress.instructions.map(i => i.code).join('\n');
    const format0AC = sim.zeroAddress.instructions.map(i => i.code).join('\n');

    outputsContainer.innerHTML = `
      <div style="margin-bottom: 1.75rem; padding: 1rem 1.35rem; background: var(--card-bg); border: 1px solid var(--border-cyan); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-subtle);">
        <div>
          <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Expression Postfix (RPN):</span>
          <code style="margin-left: 0.5rem; color: var(--accent-cyan); font-size: 1.1rem; font-weight: 600;">${sim.postfix}</code>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          Total 3AC: <strong style="color: var(--accent-violet);">${sim.threeAddress.count}</strong> |
          2AC: <strong style="color: var(--accent-violet);">${sim.twoAddress.count}</strong> |
          1AC: <strong style="color: var(--accent-violet);">${sim.oneAddress.count}</strong> |
          0AC: <strong style="color: var(--accent-violet);">${sim.zeroAddress.count}</strong>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <!-- 3AC Card -->
        <div class="card-editorial">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-primary);">1. Three-Address Code</h3>
            <span class="badge badge-violet">Count: ${sim.threeAddress.count}</span>
          </div>
          <div class="code-panel" style="margin-bottom: 1rem; min-height: 140px;">
            <pre>${format3AC}</pre>
          </div>
          <button class="btn btn-secondary btn-sm copy-btn" data-code="${encodeURIComponent(format3AC)}" style="width: 100%;">
            📋 Copy 3AC Assembly
          </button>
        </div>

        <!-- 2AC Card -->
        <div class="card-editorial">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-primary);">2. Two-Address Code</h3>
            <span class="badge badge-violet">Count: ${sim.twoAddress.count}</span>
          </div>
          <div class="code-panel" style="margin-bottom: 1rem; min-height: 140px;">
            <pre>${format2AC}</pre>
          </div>
          <button class="btn btn-secondary btn-sm copy-btn" data-code="${encodeURIComponent(format2AC)}" style="width: 100%;">
            📋 Copy 2AC Assembly
          </button>
        </div>

        <!-- 1AC Card -->
        <div class="card-editorial">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-primary);">3. One-Address Code</h3>
            <span class="badge badge-cyan">Count: ${sim.oneAddress.count}</span>
          </div>
          <div class="code-panel" style="margin-bottom: 1rem; min-height: 140px;">
            <pre>${format1AC}</pre>
          </div>
          <button class="btn btn-secondary btn-sm copy-btn" data-code="${encodeURIComponent(format1AC)}" style="width: 100%;">
            📋 Copy 1AC Assembly
          </button>
        </div>

        <!-- 0AC Card -->
        <div class="card-editorial">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-primary);">4. Zero-Address Code</h3>
            <span class="badge badge-cyan">Count: ${sim.zeroAddress.count}</span>
          </div>
          <div class="code-panel" style="margin-bottom: 1rem; min-height: 140px;">
            <pre>${format0AC}</pre>
          </div>
          <button class="btn btn-secondary btn-sm copy-btn" data-code="${encodeURIComponent(format0AC)}" style="width: 100%;">
            📋 Copy 0AC Assembly
          </button>
        </div>
      </div>
    `;

    outputsContainer.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.getAttribute('data-code'));
        navigator.clipboard.writeText(code).then(() => {
          showToast("Assembly code copied to clipboard!");
        });
      });
    });
  }

  if (runBtn) runBtn.addEventListener('click', updateSimulation);
  if (inputEl) inputEl.addEventListener('input', updateSimulation);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (inputEl) inputEl.value = '';
      updateSimulation();
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const expr = btn.getAttribute('data-expr');
      if (inputEl) inputEl.value = expr;
      updateSimulation();
    });
  });

  updateSimulation();
}
