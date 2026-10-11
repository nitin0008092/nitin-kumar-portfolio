export function renderSectionHeader(eyebrow, title, subtitle = '', alignLeft = false) {
  const alignClass = alignLeft ? 'text-left' : '';
  return `
    <div class="section-header ${alignClass}">
      ${eyebrow ? `<div class="section-eyebrow">◆ ${eyebrow}</div>` : ''}
      <h2 class="section-title">${title}</h2>
      <div class="section-divider"></div>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </div>
  `;
}
