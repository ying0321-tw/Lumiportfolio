const root = document.querySelector('#caseRoot');
const params = new URLSearchParams(window.location.search);
const id = params.get('id') || PROJECTS[0].id;
const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
const index = PROJECTS.findIndex(p => p.id === project.id);
const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
const next = PROJECTS[(index + 1) % PROJECTS.length];
document.title = `${project.title}｜TSOU CHIA YING`;

function esc(str=''){
  return String(str).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}
function renderTextBlock(section){
  const ps = section.text ? section.text.map(t=>`<p>${esc(t)}</p>`).join('') : '';
  const lis = section.list ? `<ul>${section.list.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>` : '';
  return `<div class="case-text"><h2>${esc(section.title)}</h2>${ps}${lis}</div>`;
}
function renderSections(){
  return project.sections.map((s,i)=>{
    const withImage = false;
    if(withImage){
      return `<section class="case-section"><div class="case-media"><img src="${project.image}" alt="${esc(project.title)}"></div>${renderTextBlock(s)}</section>`;
    }
    return `<section class="case-section full">${renderTextBlock(s)}</section>`;
  }).join('');
}
function renderVideos(){
  if(!project.videos) return '';
  const items = project.videos.items || [];
  const cards = items.length ? items.map(v=>`
    <div class="video-frame"><iframe src="https://www.youtube.com/embed/${v}" title="YouTube 影片" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  `).join('') : `
    <a class="video-card" href="${project.videos.channel}" target="_blank" rel="noopener">
      <span class="play-dot">▶</span>
      <strong>前往 YouTube 短影音</strong>
      <p>${esc(project.videos.note || '前往 YouTube 頻道觀看短影片。')}</p>
    </a>
  `;
  return `<section class="video-section"><div class="case-text"><h2>短影音作品</h2><p>可前往蛋舖 YouTube 頻道觀看短影音內容。若之後提供單支影片網址，也可以改成頁面內直接播放。</p></div><div class="video-grid">${cards}</div></section>`;
}
function renderSocials(){
  if(!project.socials) return '';
  return `<section class="case-section full"><div class="case-text"><h2>社群連結</h2><p>蛋舖品牌社群與影音內容延伸。</p><div class="social-links">${project.socials.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}</div></div></section>`;
}
function renderSourceBoard(){ return ''; }
root.innerHTML = `
  <section class="case-hero no-image">
    <p class="case-kicker">${labelOf(project.category)}</p>
    <h1>${esc(project.title)}</h1>
    <p class="case-subtitle">${esc(project.subtitle)}</p>
    
    <a class="back-link" href="index.html#works">← 返回作品列表</a>
  </section>
  <dl class="case-overview">${Object.entries(project.overview).map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  ${renderSections()}
  ${project.quote ? `<div class="quote-block"><p>${esc(project.quote)}</p></div>` : ''}
  ${renderVideos()}
  ${renderSocials()}
  ${renderSourceBoard()}
  <nav class="case-nav">
    <a href="work.html?id=${prev.id}"><span>上一個作品</span>${esc(prev.title)}</a>
    <a href="work.html?id=${next.id}"><span>下一個作品</span>${esc(next.title)}</a>
  </nav>
`;
function labelOf(id){ return (CATEGORIES.find(c=>c.id===id)||{}).label || id; }
