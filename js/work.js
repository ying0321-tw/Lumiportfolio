document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'marketing1';
  const works = window.WORKS || [];
  const item = works.find(w => w.id === id) || works[0];
  const page = document.querySelector('#casePage');

  if(!item || !page){ return; }
  document.title = `${item.title}｜TSOU CHIA YING`;

  const defaultSections = [
    {kind:'text', eyebrow:'OVERVIEW', title:'專案背景', body:item.desc || '此段可放置專案背景、目標、需求與你的角色。'},
    {kind:'image', src:item.cover || item.thumb, caption:'主視覺／作品完整圖。'},
    {kind:'text', eyebrow:'APPROACH', title:'執行方式', body:'此段可說明你如何拆解問題、規劃方向、安排素材與完成設計。'},
    {kind:'image', src:item.thumb, caption:'細節圖或延伸應用，可自行替換。'},
    {kind:'text', eyebrow:'RESULTS', title:'成果整理', body:'此段可補充成效、學習、數據或專案後續應用。'}
  ];

  const sections = item.sections && item.sections.length ? item.sections : defaultSections;
  const currentIndex = works.findIndex(w => w.id === item.id);
  const next = works[(currentIndex + 1) % works.length];

  function infoRow(label, value){
    return value ? `<div><dt>${label}</dt><dd>${value}</dd></div>` : '';
  }

  function renderSection(section){
    if(section.kind === 'image'){
      return `
        <section class="case-section case-image-section">
          <img src="${section.src}" alt="${section.caption || item.title}" onerror="this.classList.add('img-missing')" />
          ${section.caption ? `<p class="case-caption">${section.caption}</p>` : ''}
        </section>
      `;
    }

    if(section.kind === 'split'){
      return `
        <section class="case-section case-split">
          <div>
            <p class="case-eyebrow">${section.eyebrow || ''}</p>
            <h2>${section.title || ''}</h2>
            <p>${section.body || ''}</p>
          </div>
          <img src="${section.src}" alt="${section.title || item.title}" onerror="this.classList.add('img-missing')" />
        </section>
      `;
    }

    return `
      <section class="case-section case-text-block">
        <p class="case-eyebrow">${section.eyebrow || ''}</p>
        <h2>${section.title || ''}</h2>
        <p>${section.body || ''}</p>
      </section>
    `;
  }

  page.innerHTML = `
    <a class="back-link" href="index.html#works">← WORKS</a>

    <section class="case-hero">
      <div class="case-cover">
        <img src="${item.cover || item.thumb}" alt="${item.title}" onerror="this.classList.add('img-missing')" />
      </div>
      <div class="case-intro">
        <p class="case-category">${item.category}</p>
        <h1>${item.title}</h1>
        <p class="case-desc">${item.desc || ''}</p>
        ${item.link ? `<a class="case-button" href="${item.link}" target="_blank" rel="noopener">觀看影片</a>` : ''}
        <dl class="case-meta">
          ${infoRow('YEAR', item.year)}
          ${infoRow('TYPE', item.type)}
          ${infoRow('ROLE', item.role)}
        </dl>
      </div>
    </section>

    <div class="case-body">
      ${sections.map(renderSection).join('')}
    </div>

    <section class="case-next">
      <p>NEXT PROJECT</p>
      <a href="work.html?id=${next.id}">${next.title} →</a>
    </section>
  `;
});
