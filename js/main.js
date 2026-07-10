/* ===== 图片数据 =====
 * 说明：file 字段路径是相对于各 HTML 文件的位置
 * 因为 HTML 与 imgs 文件夹同级，所以用 'imgs/分类名/文件名'
 * 请根据实际情况替换文件名
 */
const galleryData = [
  // 室内设计 interior
  { id: '01', category: 'interior', title: '现代客厅', issue: 'April 2023', file: 'imgs/interior/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_120.png' },
  { id: '02', category: 'interior', title: '主卧室', issue: 'April 2023', file: 'imgs/interior/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_121.png' },
  { id: '03', category: 'interior', title: '餐厅空间', issue: 'April 2023', file: 'imgs/interior/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_122.png' },

  // 建筑 architecture
  { id: '04', category: 'architecture', title: '海滨别墅', issue: 'April 2023', file: 'imgs/architecture/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_126.png' },
  { id: '05', category: 'architecture', title: '城市公寓', issue: 'April 2023', file: 'imgs/architecture/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_146.png' },

  // 家具 furniture
  { id: '06', category: 'furniture', title: '经典单椅', issue: 'April 2023', file: 'imgs/furniture/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_124.png' },
  { id: '07', category: 'furniture', title: '手工茶几', issue: 'April 2023', file: 'imgs/furniture/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_125.png' },

  // 生活方式 lifestyle
  { id: '08', category: 'lifestyle', title: '午后阅读', issue: 'April 2023', file: 'imgs/lifestyle/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_127.png' },
  { id: '09', category: 'lifestyle', title: '花艺时光', issue: 'April 2023', file: 'imgs/lifestyle/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_131.png' },

  // 广告灵感 ads
  { id: '10', category: 'ads', title: '品牌广告', issue: 'April 2023', file: 'imgs/ads/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_2.png' },
  { id: '11', category: 'ads', title: '产品广告', issue: 'April 2023', file: 'imgs/ads/1783387031394-1175ad76-08b7-4e33-bb17-6fc8791128ff_3.png' }
];

/* ===== 新闻数据 ===== */
const newsData = [
  { date: '2024.01.15', title: 'AD 杂志 2024 年度精选', summary: '本期精选收录了过去一年中最具影响力的室内设计作品，从纽约顶层公寓到加州海滨别墅，展现当代居住美学的多元可能。' },
  { date: '2024.02.08', title: '对话知名室内设计师', summary: '在米兰设计周开幕前夕，我们专访了多位活跃于国际舞台的室内设计师，探讨他们眼中的空间叙事与材质表达。' },
  { date: '2024.03.22', title: '可持续家具设计趋势', summary: '环保材料与模块化结构正在改变家具行业，本文梳理了本年度值得关注的可持续设计品牌与代表作品。' },
  { date: '2024.04.10', title: '建筑与自然的边界', summary: '当建筑不再是环境的入侵者，而是景观的延续，设计师如何运用在地材料与通透结构模糊室内外界限。' },
  { date: '2024.05.05', title: '生活方式专栏：慢下来的家', summary: '在快节奏的城市生活中，越来越多的人开始重新思考家的意义，打造一个可以让人真正放松的居住空间。' }
];

/* ===== 分类名称映射 ===== */
const categoryNames = {
  all: '全部',
  interior: '室内设计',
  architecture: '建筑',
  furniture: '家具',
  lifestyle: '生活方式',
  ads: '广告灵感'
};

/* ===== 工具函数：从 URL 获取参数 ===== */
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/* ===== 工具函数：导航高亮 ===== */
function highlightNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ===== 首页：轮播 Hero ===== */
function initHeroCarousel() {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!track || !dotsContainer) return;

  // 轮播图片：first_page.png + interior 分类中顺序取前 3 张
  const interiorImages = galleryData.filter(function (item) {
    return item.category === 'interior';
  });

  const selectedInterior = interiorImages.slice(0, 3);

  const slides = [
    { file: 'imgs/first_page.png', title: '封面' },
    ...selectedInterior.map(function (item) {
      return { file: item.file, title: item.title };
    })
  ];

  // 生成轮播项
  let trackHtml = '';
  slides.forEach(function (slide) {
    trackHtml += `<div class="carousel-slide" style="background-image: url('${slide.file}');" role="img" aria-label="${slide.title}"></div>`;
  });
  track.innerHTML = trackHtml;

  // 生成指示点
  let dotsHtml = '';
  slides.forEach(function (_, index) {
    dotsHtml += `<button data-index="${index}" aria-label="切换到第 ${index + 1} 张"></button>`;
  });
  dotsContainer.innerHTML = dotsHtml;

  const dots = dotsContainer.querySelectorAll('button');
  let current = 0;
  const total = slides.length;
  let timer = null;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }

  function next() {
    goTo((current + 1) % total);
  }

  function startAutoPlay() {
    timer = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      stopAutoPlay();
      goTo(parseInt(dot.getAttribute('data-index'), 10));
      startAutoPlay();
    });
  });

  // 鼠标悬停时暂停轮播
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  goTo(0);
  startAutoPlay();
}

/* ===== 首页：渲染分类入口 ===== */
function renderCategoryCards() {
  const container = document.getElementById('category-grid');
  if (!container) return;

  const categories = [
    { key: 'interior', name: '室内设计' },
    { key: 'architecture', name: '建筑' },
    { key: 'furniture', name: '家具' },
    { key: 'lifestyle', name: '生活方式' },
    { key: 'ads', name: '广告灵感' }
  ];

  let html = '';
  categories.forEach(function (cat) {
    const item = galleryData.find(function (g) {
      return g.category === cat.key;
    });
    const imgFile = item ? item.file : '';
    html += `
      <a class="category-card" href="magazine-window.html?filter=${cat.key}">
        ${imgFile ? `<img src="${imgFile}" alt="${cat.name}" loading="lazy">` : ''}
        <h3>${cat.name}</h3>
      </a>
    `;
  });
  container.innerHTML = html;
}

/* ===== magazine-window.html：渲染分类标签 ===== */
function renderFilterTabs() {
  const container = document.getElementById('filter-tabs');
  if (!container) return;

  const categories = ['all', 'interior', 'architecture', 'furniture', 'lifestyle', 'ads'];
  let html = '';
  categories.forEach(function (cat) {
    html += `<button data-category="${cat}">${categoryNames[cat]}</button>`;
  });
  container.innerHTML = html;

  // 绑定点击事件
  const buttons = container.querySelectorAll('button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cat = btn.getAttribute('data-category');
      filterWorks(cat);

      // 更新按钮激活状态
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // 切换分类时更新 URL，但不刷新页面
      const newUrl = cat === 'all'
        ? window.location.pathname
        : `${window.location.pathname}?filter=${cat}`;
      window.history.replaceState({}, '', newUrl);
    });
  });

  // 从 URL 读取 filter 参数，默认"全部"
  const filterFromUrl = getUrlParam('filter');
  const defaultCategory = categories.includes(filterFromUrl) ? filterFromUrl : 'all';

  buttons.forEach(function (btn) {
    if (btn.getAttribute('data-category') === defaultCategory) {
      btn.classList.add('active');
    }
  });

  filterWorks(defaultCategory);
}

/* ===== magazine-window.html：渲染作品纵向列表 ===== */
function renderWorksList(items) {
  const container = document.getElementById('works-list');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#888;padding:80px 0;">暂无图片</p>';
    return;
  }

  let html = '';
  items.forEach(function (item) {
    html += `
      <article class="work-item">
        <a href="detail.html?cat=${item.category}&id=${item.id}">
          <div class="work-text">
            <span class="work-category">${categoryNames[item.category] || item.category}</span>
            <h2 class="work-brand">Architectural Digest USA - April 2023</h2>
            <p class="work-meta">${item.issue}</p>
            <span class="work-view">View →</span>
          </div>
          <div class="work-image">
            <img src="${item.file}" alt="${item.title}" loading="lazy">
          </div>
        </a>
      </article>
    `;
  });
  container.innerHTML = html;
}

/* ===== magazine-window.html：按分类筛选 ===== */
function filterWorks(category) {
  if (category === 'all') {
    renderWorksList(galleryData);
  } else {
    const filtered = galleryData.filter(function (item) {
      return item.category === category;
    });
    renderWorksList(filtered);
  }
}

/* ===== detail.html：渲染详情 ===== */
function renderDetail() {
  const imageContainer = document.getElementById('detail-image');
  const infoContainer = document.getElementById('detail-info');
  const relatedContainer = document.getElementById('related-grid');

  if (!imageContainer || !infoContainer) return;

  const category = getUrlParam('cat');
  const id = getUrlParam('id');

  // 查找对应图片
  const item = galleryData.find(function (g) {
    return g.category === category && g.id === id;
  });

  if (!item) {
    infoContainer.innerHTML = '<p style="text-align:center;color:#888;">未找到对应图片</p>';
    return;
  }

  // 渲染大图
  imageContainer.innerHTML = `<img src="${item.file}" alt="${item.title}">`;

  // 渲染信息
  infoContainer.innerHTML = `
    <p class="category">${categoryNames[item.category] || item.category}</p>
    <p class="source">图：Architectural Digest USA | ${item.issue}</p>
  `;

  // 渲染相关推荐（同分类其他 2 张，循环取）
  if (relatedContainer) {
    const sameCategory = galleryData.filter(function (g) {
      return g.category === item.category && g.id !== item.id;
    });

    const related = [];
    for (let i = 0; i < Math.min(2, sameCategory.length); i++) {
      related.push(sameCategory[i]);
    }

    // 如果同分类不足 2 张，从全部里补
    if (related.length < 2) {
      const others = galleryData.filter(function (g) {
        return g.id !== item.id && !related.includes(g);
      });
      for (let i = 0; i < Math.min(2 - related.length, others.length); i++) {
        related.push(others[i]);
      }
    }

    let html = '';
    related.forEach(function (r) {
      html += `
        <a class="gallery-item" href="detail.html?cat=${r.category}&id=${r.id}">
          <div class="img-wrap">
            <img src="${r.file}" alt="${r.title}" loading="lazy">
          </div>
          <p class="issue">${r.issue}</p>
        </a>
      `;
    });
    relatedContainer.innerHTML = html;
  }
}

/* ===== news.html：渲染新闻列表 ===== */
function renderNewsList() {
  const container = document.getElementById('news-list');
  if (!container) return;

  let html = '';
  newsData.forEach(function (news) {
    html += `
      <article class="news-item">
        <p class="date">${news.date}</p>
        <h3>${news.title}</h3>
        <p>${news.summary}</p>
      </article>
    `;
  });
  container.innerHTML = html;
}

/* ===== contact.html：表单提交 ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const type = form.querySelector('#project-type').value;
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('请填写完整信息');
      return;
    }

    const subject = encodeURIComponent(`项目咨询 - ${type} - ${name}`);
    const body = encodeURIComponent(
      `姓名：${name}\n邮箱：${email}\n项目类型：${type}\n\n留言：\n${message}`
    );

    window.location.href = `mailto:569122844@qq.com?subject=${subject}&body=${body}`;
  });
}

/* ===== 页面初始化 ===== */
document.addEventListener('DOMContentLoaded', function () {
  highlightNav();
  initHeroCarousel();
  renderCategoryCards();
  renderFilterTabs();
  renderDetail();
  renderNewsList();
  initContactForm();
});
