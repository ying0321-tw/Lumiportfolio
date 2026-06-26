const grid = document.querySelector('#workGrid');
const filterNav = document.querySelector('#filterNav');
let activeCategory = 'all';

function renderFilters(){
  filterNav.innerHTML = CATEGORIES.map(cat => `<button type="button" class="${cat.id===activeCategory?'active':''}" data-category="${cat.id}">${cat.label}</button>`).join('');
  filterNav.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      activeCategory = btn.dataset.category;
      renderFilters();
      renderWorks();
    });
  });
}

function renderWorks(){
  const items = PROJECTS.filter(p => activeCategory === 'all' || p.category === activeCategory);
  grid.innerHTML = items.map(p => `
    <a class="work-card" href="work.html?id=${p.id}">
      <div class="thumb"><img src="${p.cover}" alt="${p.title}"></div>
      <div class="work-meta">
        <p class="cat">${labelOf(p.category)}</p>
        <h3>${p.title}</h3>
        <p>${p.subtitle}</p>
      </div>
    </a>
  `).join('');
}
function labelOf(id){ return (CATEGORIES.find(c=>c.id===id)||{}).label || id; }
renderFilters();
renderWorks();
