document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.reveal-text, .section-title, .about-photo, .about-copy, .work-card, .contact-title, .contact-info'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((target) => observer.observe(target));


  const filterButtons = document.querySelectorAll(
    '.filter-nav button, .floating-work-filter button'
  );

  const workCards = document.querySelectorAll('.work-grid .work-card');

  function applyWorkFilter(filter) {
    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    workCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.classList.remove('hide');
        card.classList.add('is-visible');
      } else {
        card.classList.add('hide');
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyWorkFilter(button.dataset.filter);

      const worksSection = document.querySelector('#works');
      if (worksSection) {
        worksSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  const floatingFilter = document.querySelector('#floatingWorkFilter');
  const worksSectionForFloating = document.querySelector('#works');
  const contactSectionForFloating = document.querySelector('#contact');

  function toggleFloatingFilter() {
    if (!floatingFilter || !worksSectionForFloating) return;

    const worksRect = worksSectionForFloating.getBoundingClientRect();
    const contactRect = contactSectionForFloating
      ? contactSectionForFloating.getBoundingClientRect()
      : null;

    const hasReachedWorks = worksRect.top <= window.innerHeight * 0.62;
    const stillInWorks = contactRect ? contactRect.top > window.innerHeight * 0.72 : true;

    floatingFilter.classList.toggle('show', hasReachedWorks && stillInWorks);
  }

  window.addEventListener('scroll', toggleFloatingFilter, { passive: true });
  window.addEventListener('resize', toggleFloatingFilter);
  toggleFloatingFilter();


  const worksData = {
    marketing1: {
      category: '行銷專案',
      title: '板橋 YELLOWSTONE｜整合行銷專案',
      type: 'image',
      media: 'files/work-03.jpg',
      desc: '從品牌策略、社群企劃、活動視覺到線上線下推廣，協助市場改建後重新建立與在地生活的連結。',
      contents: ['品牌定位', '社群內容企劃', '活動視覺整合', '專案成效整理'],
      info: { 年份: '2025', 類型: 'Marketing Project', 角色: '企劃 / 品牌整合' }
    },

    marketing2: {
      category: '行銷專案',
      title: '東森購物 MOD 商城｜雙11狂歡購',
      type: 'image',
      media: 'files/marketing02-detail.jpg',
      desc: '配合雙11檔期規劃活動溝通、版面素材與促購內容，強化檔期辨識度與購物動線。',
      contents: ['活動主軸規劃', '檔期視覺素材', '平台版面溝通', '促購資訊整理'],
      info: { 類型: 'Marketing Project' }
    },

    marketing3: {
      category: '行銷專案',
      title: '蛋舖官網｜會員回購機制',
      type: 'image',
      media: 'files/marketing03-detail.jpg',
      desc: '從會員回訪、消費誘因與日常互動出發，規劃能促進重複購買的官網機制。',
      contents: ['會員行為觀察', '回購機制設計', '活動流程規劃', '轉換情境整理'],
      info: { 類型: 'Marketing Project' }
    },

    marketing4: {
      category: '行銷專案',
      title: '蛋舖社群｜短影片內容策略',
      type: 'image',
      media: 'files/marketing04-detail.jpg',
      desc: '以社群平台特性與扭蛋商品特性為基礎，規劃短影片題材、鉤子與曝光節奏。',
      contents: ['內容題材分類', '短影音鉤子設計', '平台差異觀察', '社群互動優化'],
      info: { 類型: 'Social Strategy' }
    },

    marketing5: {
      category: '行銷專案',
      title: '香山濕地｜展場文字歸納',
      type: 'image',
      media: 'files/marketing05-detail.jpg',
      desc: '將環境、生態與展場資訊重新整理成更清楚易讀的內容架構，協助觀眾快速理解。',
      contents: ['資訊歸納', '展場文字整理', '內容層級規劃'],
      info: { 類型: 'Content Planning' }
    },

    graphic1: {
      category: '平面設計',
      title: '協助犬｜品牌視覺設計',
      type: 'image',
      media: 'files/dog-long.jpg',
      desc: '從品牌命名、標語、包裝到視覺系統，建立具有日常感與辨識度的品牌語言。',
      contents: ['品牌視覺方向', '包裝與延伸物設計', '版面與字級系統', '視覺應用整理'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    graphic2: {
      category: '平面設計',
      title: '西洋風味香料 美食特餐｜膠裝刊物設計',
      type: 'image',
      media: 'files/book-long.jpg',
      desc: '以西洋香料文化為主軸，結合料理與風味美學，透過編輯排版呈現多國經典香料特色與美食靈感。',
      contents: ['32頁膠裝刊物', '編輯排版設計', '收錄7個西洋經典風味主題', '介紹24種特色香料與料理文化'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    graphic3: {
      category: '平面設計',
      title: '包裝設計｜拉拉山水蜜桃商品',
      type: 'image',
      media: 'files/lala-long.jpg',
      desc: '以高山果實的純粹為核心，融合現代美學與在地農產特色，建立具禮品感的商品包裝。',
      contents: ['禮盒包裝設計', '插圖與視覺延伸', '品牌故事排版'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    graphic4: {
      category: '平面設計',
      title: '包裝設計｜沙茶匠',
      type: 'image',
      media: 'files/so-long.jpg',
      desc: '以職人匠心為核心，將傳統醬料轉化為精緻伴手禮，透過色彩與圖示提升選購便利性。',
      contents: ['系列包裝設計', '禮品結構規劃', '料理建議圖示', '手寫感品牌識別'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    graphic5: {
      category: '平面設計',
      title: '蛋舖周邊設計｜出貨袋與員工服',
      type: 'image',
      media: 'files/graphic05-detail.jpg',
      desc: '將品牌視覺延伸至出貨袋、員工服與門市接觸點，建立更一致的品牌印象。',
      contents: ['周邊設計', '門市視覺延伸', '品牌應用整理'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    graphic6: {
      category: '平面設計',
      title: '蛋舖｜門市海報設計',
      type: 'image',
      media: 'files/graphic06-detail.jpg',
      desc: '配合商品檔期與門市活動，製作可快速傳達訊息的活動海報。',
      contents: ['活動主視覺', '門市海報', '資訊排版'],
      info: { 工具: 'Illustrator / Photoshop' }
    },

    video1: {
      category: '短影片',
      title: '扭蛋開箱｜AED 迷你造型急救包',
      link: 'https://youtu.be/yR1RM2RJkBk',
      desc: '從腳本企劃、拍攝到剪輯節奏，呈現扭蛋玩家感受玩具的樂趣。',
      contents: ['短影音腳本企劃', '拍攝分鏡安排', '剪輯節奏設計'],
      info: { 類型: 'Short Video', 工具: 'CapCut' }
    },

    video2: {
      category: '短影片',
      title: '蛋舖雙11｜活動宣傳影片',
      link: 'https://youtu.be/',
      desc: '以活動促購為主軸，透過短影音快速傳達檔期優惠與參與動機。',
      contents: ['活動腳本', '商品拍攝', '節奏剪輯'],
      info: { 類型: 'Short Video' }
    },

    video3: {
      category: '短影片',
      title: '扭蛋開箱｜特攝系列電視播放機',
      link: 'https://youtu.be/qUu6v1Oc0Js',
      desc: '以產品功能與收藏亮點作為影片鉤子，強化觀看與收藏興趣。',
      contents: ['腳本企劃', '商品展示', '剪輯節奏'],
      info: { 類型: 'Short Video' }
    },

    video4: {
      category: '短影片',
      title: '扭蛋開箱｜ICE 敲冰塊遊戲組',
      link: 'https://youtu.be/d3u5aKXNcO0',
      desc: '用遊戲情境帶出商品玩法，讓觀眾快速理解趣味點。',
      contents: ['情境腳本', '拍攝', '剪輯'],
      info: { 類型: 'Short Video' }
    },

    video5: {
      category: '短影片',
      title: '扭蛋開箱｜鬼娃恰吉軟膠公仔',
      link: 'https://youtu.be/Y10-U7yfRO4',
      desc: '以角色記憶點與商品細節作為切入，提升短影音的吸引力。',
      contents: ['商品開箱', '鏡頭安排', '剪輯'],
      info: { 類型: 'Short Video' }
    },

    photo1: {
      category: '攝影',
      title: '猴硐貓村｜旅行攝影',
      type: 'image',
      media: 'files/work-05.jpg',
      desc: '用影像捕捉旅途中值得收藏的光線、場景與情緒。',
      contents: ['光線與構圖觀察', '場景情緒紀錄', '影像色調整理']
    },

    photo2: {
      category: '攝影',
      title: '攝影作品｜城市觀察',
      type: 'image',
      media: 'files/photo02-detail.jpg',
      desc: '從街景、建築與日常人物中捕捉城市節奏。',
      contents: ['影像拍攝', '色調整理', '素材挑選']
    },

    photo3: {
      category: '攝影',
      title: '攝影作品｜日常紀錄',
      type: 'image',
      media: 'files/photo03-detail.jpg',
      desc: '以自然視角記錄生活中的細節、光線與情緒。',
      contents: ['影像拍攝', '色調整理', '素材挑選']
    },

    uiux1: {
      category: 'UIUX',
      title: '迪士尼導覽 APP',
      type: 'image',
      media: 'files/disney-uiux.jpg',
      desc: '結合 GPS、同伴定位、活動推播的迪士尼導覽 APP，讓使用者在園區內獲得更即時、便利且個人化的遊玩體驗。',
      contents: ['使用者痛點整理', '資訊架構與流程設計', 'UI 視覺與元件規劃', 'APP 功能情境設計'],
      info: { 工具: 'Figma' }
    },

    uiux2: {
      category: 'UIUX',
      title: '官網設計｜和正農作',
      type: 'image',
      media: 'files/uiux-long.jpg',
      desc: '以自然職人風格重新建構品牌官網，整合購物打造更直覺且具溫度感的烘焙品牌。',
      contents: ['使用者流程規劃', 'UI 介面設計', '功能情境設計'],
      info: { 工具: 'Figma' }
    },

    uiux3: {
      category: 'UIUX',
      title: '蛋舖官網｜關於我們',
      type: 'image',
      media: 'files/91toy-long.jpg',
      desc: '以品牌展示與合作提案為核心，重新規劃網站視覺與資訊架構，強化品牌形象與市場吸引力。',
      contents: ['資訊架構規劃', 'UI 介面設計', '品牌展示頁設計'],
      info: { 工具: 'Figma' }
    }
  };


  const modal = document.querySelector('#workModal');
  const modalMedia = document.querySelector('#modalMedia');
  const modalCategory = document.querySelector('#modalCategory');
  const modalTitle = document.querySelector('#modalTitle');
  const modalDesc = document.querySelector('#modalDesc');
  const modalTags = document.querySelector('#modalTags');
  const closeBtn = document.querySelector('.modal-close');
  const modalBg = document.querySelector('.modal-bg');

  function getFallbackData(element) {
    const img = element.querySelector('img');
    const title = element.querySelector('h3');
    const category = element.querySelector('.category, .slider-info p');
    const desc = element.querySelector('.desc');

    return {
      category: category ? category.textContent : '',
      title: title ? title.textContent : '作品介紹',
      type: 'image',
      media: img ? img.getAttribute('src') : '',
      desc: desc ? desc.textContent : '此作品可再補充專案說明。',
      contents: ['專案內容可依需求補充'],
      info: { 類型: 'Portfolio Work' }
    };
  }

  function renderMedia(data) {
    if (data.embed) {
      return `
        <div class="video-wrap">
          <iframe
            class="embed-video"
            src="${data.embed}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            frameborder="0">
          </iframe>

          ${data.link ? `
            <a class="video-link" href="${data.link}" target="_blank" rel="noopener">
              若影片無法播放，點此開啟外部影片
            </a>
          ` : ''}
        </div>
      `;
    }

    if (data.link && data.link !== 'https://youtu.be/') {
      return `
        <div class="external-video-box">
          <a class="video-play-hotspot" href="${data.link}" target="_blank" rel="noopener" aria-label="播放影片">
            <span>▶</span>
          </a>
          <p class="video-mobile-note">點擊下方按鈕，開啟完整短影片作品。</p>
          <a class="video-cta-button" href="${data.link}" target="_blank" rel="noopener">
            播放影片
          </a>
        </div>
      `;
    }

    if (data.type === 'image' && data.media) {
      return `
        <img
          class="modal-image-file"
          src="${data.media}"
          alt="${data.title}">
      `;
    }

    return `
      <div class="media-error">
        此作品目前尚未設定媒體內容。
      </div>
    `;
  }

  function renderDetail(data) {
    const contentList = data.contents
      ? `
        <div class="modal-section">
          <h4>專案內容</h4>
          <ul>
            ${data.contents.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `
      : '';

    const infoList = data.info
      ? `
        <div class="modal-section">
          <h4>專案資訊</h4>
          <dl>
            ${Object.entries(data.info).map(([key, value]) => `
              <div>
                <dt>${key}</dt>
                <dd>${value}</dd>
              </div>
            `).join('')}
          </dl>
        </div>
      `
      : '';

    return contentList + infoList;
  }

  function openModal(key, element) {
    const data = worksData[key] || getFallbackData(element);

    if (!data || !modal || !modalMedia) return;

    modalMedia.innerHTML = renderMedia(data);
    modalCategory.textContent = data.category || '';
    modalTitle.textContent = data.title || '';
    modalDesc.textContent = data.desc || '';
    modalTags.innerHTML = renderDetail(data);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !modalMedia) return;

    modal.classList.remove('active');
    modalMedia.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach((item) => {
    item.addEventListener('click', () => {
      openModal(item.dataset.modal, item);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modalBg?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
