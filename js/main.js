document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#workGrid');
  const filterButtons = document.querySelectorAll('.floating-work-filter button');
  const works = window.WORKS || [];

  function workCard(item){
    return `
      <a class="work-card" href="work.html?id=${item.id}" data-category="${item.categoryKey}">
        <img src="${item.thumb}" alt="${item.title}" onerror="this.classList.add('img-missing')" />
        <div class="work-line"></div>
        <p class="category">${item.category}</p>
        <h3>${item.title}</h3>
        <p class="desc">${item.desc || ''}</p>
      </a>
    `;
  }

  if(grid) grid.innerHTML = works.map(workCard).join('');

  function applyWorkFilter(filter){
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
    document.querySelectorAll('.work-card').forEach(card => {
      card.classList.toggle('hide', filter !== 'all' && card.dataset.category !== filter);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => applyWorkFilter(button.dataset.filter));
  });

  const floatingFilter = document.querySelector('#floatingWorkFilter');
  const worksSection = document.querySelector('#works');
  const contactSection = document.querySelector('#contact');

  function toggleFloatingFilter(){
    if(!floatingFilter || !worksSection) return;
    const worksRect = worksSection.getBoundingClientRect();
    const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;
    const hasReachedWorks = worksRect.top <= window.innerHeight * 0.62;
    const stillInWorks = contactRect ? contactRect.top > window.innerHeight * 0.72 : true;
    floatingFilter.classList.toggle('show', hasReachedWorks && stillInWorks);
  }

  window.addEventListener('scroll', toggleFloatingFilter, {passive:true});
  window.addEventListener('resize', toggleFloatingFilter);
  toggleFloatingFilter();
});
