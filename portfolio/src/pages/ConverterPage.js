import { convertNumber } from '../lib/numberConverter.js';
import { showToast } from '../components/Toast.js';

export function renderConverterPage() {
  return `
    <div class="converter-page">
      <section class="section">
        <div class="container">
          <div style="margin-bottom: 1.5rem;">
            <a href="#/coa-lab" style="font-size: 0.875rem; color: var(--accent-cyan); text-decoration: none; font-weight: 600;">← Back to COA Lab</a>
            <h1 style="font-size: 2.3rem; margin-top: 0.5rem; color: var(--text-primary);">Number System Converter</h1>
          </div>

          <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 800px;">
            Converts numerical values between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16). Supports both integer and fractional values with optional step-by-step explanations.
          </p>

          <!-- Main Converter Card -->
          <div class="card-editorial" style="margin-bottom: 2rem;">
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: flex-end; margin-bottom: 1.5rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label for="src-base-select" class="form-label">From Base (Source):</label>
                <select id="src-base-select" class="form-control">
                  <option value="10" selected>Base 10 — Decimal</option>
                  <option value="2">Base 2 — Binary</option>
                  <option value="8">Base 8 — Octal</option>
                  <option value="16">Base 16 — Hexadecimal</option>
                </select>
              </div>

              <button id="swap-bases-btn" class="btn btn-secondary" title="Swap Source &amp; Destination Bases" style="padding: 0.75rem 1rem;">
                ⇄ Swap
              </button>

              <div class="form-group" style="margin-bottom: 0;">
                <label for="dest-base-select" class="form-label">To Base (Destination):</label>
                <select id="dest-base-select" class="form-control">
                  <option value="2" selected>Base 2 — Binary</option>
                  <option value="8">Base 8 — Octal</option>
                  <option value="10">Base 10 — Decimal</option>
                  <option value="16">Base 16 — Hexadecimal</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="converter-input" class="form-label">Input Value (Integer or Fraction, e.g. 45, 10.625, 101101, 2D):</label>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <input type="text" id="converter-input" class="form-control form-mono" value="10.625" placeholder="e.g. 10.625" style="flex: 1; min-width: 240px;" />
                <button id="converter-clear-btn" class="btn btn-secondary">Clear</button>
              </div>
            </div>

            <!-- Error Banner -->
            <div id="converter-error" style="display: none; margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.4); border-radius: var(--radius-md); color: #F87171; font-size: 0.9rem;">
            </div>

            <!-- Result Card -->
            <div style="margin-top: 1.5rem; padding: 1.25rem; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); border: 1px solid var(--border-cyan); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">CONVERSION RESULT:</span>
                <span id="result-exact-badge" class="badge badge-cyan">Exact</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
                <div id="converter-result" style="flex: 1; min-width: 200px; font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: 600; padding: 0.5rem 0;">
                  1010.101
                </div>
                <button id="copy-result-btn" class="btn btn-cyan btn-sm">
                  📋 Copy Result
                </button>
              </div>
            </div>

            <!-- Steps Toggle -->
            <div style="margin-top: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
              <input type="checkbox" id="show-steps-checkbox" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--accent-violet);" />
              <label for="show-steps-checkbox" style="font-size: 0.95rem; cursor: pointer; color: var(--text-primary); font-weight: 600;">
                Show step-by-step mathematical explanation
              </label>
            </div>
          </div>

          <!-- Step-by-Step Breakdown Panel -->
          <div id="steps-panel" class="card-editorial" style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-primary);">Conversion Step-by-Step Breakdown</h3>
            <div id="steps-content" class="code-panel" style="line-height: 1.8;">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- Educational Reference Section -->
          <div class="card-editorial">
            <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-primary);">Educational Reference: Base Systems</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
              <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-violet);">Binary (Base 2)</strong>
                <p style="font-size: 0.85rem; margin-top: 0.35rem; color: var(--text-secondary);">Uses digits 0 and 1. Fundamental unit of digital hardware and computer memory.</p>
              </div>
              <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-violet);">Octal (Base 8)</strong>
                <p style="font-size: 0.85rem; margin-top: 0.35rem; color: var(--text-secondary);">Uses digits 0 to 7. Compact representation for 3-bit binary groups.</p>
              </div>
              <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-cyan);">Decimal (Base 10)</strong>
                <p style="font-size: 0.85rem; margin-top: 0.35rem; color: var(--text-secondary);">Uses digits 0 to 9. Standard human numerical representation.</p>
              </div>
              <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-cyan);">Hexadecimal (Base 16)</strong>
                <p style="font-size: 0.85rem; margin-top: 0.35rem; color: var(--text-secondary);">Uses digits 0-9 and A-F. Compact representation for 4-bit binary nibbles and memory addresses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function attachConverterListeners() {
  const inputEl = document.getElementById('converter-input');
  const srcSelect = document.getElementById('src-base-select');
  const destSelect = document.getElementById('dest-base-select');
  const swapBtn = document.getElementById('swap-bases-btn');
  const clearBtn = document.getElementById('converter-clear-btn');
  const resultEl = document.getElementById('converter-result');
  const exactBadge = document.getElementById('result-exact-badge');
  const errorEl = document.getElementById('converter-error');
  const copyBtn = document.getElementById('copy-result-btn');
  const stepsCheckbox = document.getElementById('show-steps-checkbox');
  const stepsPanel = document.getElementById('steps-panel');
  const stepsContent = document.getElementById('steps-content');

  function updateConversion() {
    if (!inputEl || !srcSelect || !destSelect) return;
    const rawVal = inputEl.value;
    const srcBase = Number(srcSelect.value);
    const destBase = Number(destSelect.value);

    const conv = convertNumber(rawVal, srcBase, destBase);

    if (!conv.isValid) {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = `Error: ${conv.error}`;
      }
      if (resultEl) resultEl.textContent = '—';
      if (stepsContent) stepsContent.innerHTML = '<em>Fix input error to view steps.</em>';
      return;
    }

    if (errorEl) errorEl.style.display = 'none';
    if (resultEl) resultEl.textContent = conv.result;
    if (exactBadge) {
      exactBadge.textContent = conv.isExact ? 'Exact' : 'Rounded';
    }

    if (stepsContent) {
      stepsContent.innerHTML = conv.steps.map(s => `<div>${s}</div>`).join('');
    }
  }

  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const temp = srcSelect.value;
      srcSelect.value = destSelect.value;
      destSelect.value = temp;
      updateConversion();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (inputEl) inputEl.value = '';
      updateConversion();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (resultEl && resultEl.textContent !== '—') {
        navigator.clipboard.writeText(resultEl.textContent.trim()).then(() => {
          showToast("Conversion result copied!");
        });
      }
    });
  }

  if (stepsCheckbox && stepsPanel) {
    stepsCheckbox.addEventListener('change', () => {
      stepsPanel.style.display = stepsCheckbox.checked ? 'block' : 'none';
    });
  }

  [inputEl, srcSelect, destSelect].forEach(el => {
    if (el) el.addEventListener('input', updateConversion);
  });

  updateConversion();
}
