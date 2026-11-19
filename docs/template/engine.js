/* =========================================================================
   Trip Plans — Shared Trip-Agnostic Editorial & Pocket Mode Renderer
   Reads window.TRIP_DATA and renders Desktop + iPhone Pocket Mode + Leaflet
   ========================================================================= */
(function () {
  const DATA = window.TRIP_DATA;
  if (!DATA) {
    console.error('window.TRIP_DATA is missing.');
    return;
  }

  const slug = DATA.slug || 'trip';
  const STORAGE_PREFIX = `trip-plans:${slug}:`;
  const MODE_KEY = `${STORAGE_PREFIX}view-mode`;
  const CHECK_KEY = `${STORAGE_PREFIX}checklist-v1`;
  const PROGRESS_KEY = `${STORAGE_PREFIX}progress-v1`;

  const esc = s => String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const gMapsUrl = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const aMapsUrl = q => `https://maps.apple.com/?q=${encodeURIComponent(q)}`;

  const getStore = key => {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
  };
  const setStore = (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  };

  /* -----------------------------------------------------------------------
     Hero Art Presets (used when trip data does not supply custom hero.artSvg)
     ----------------------------------------------------------------------- */
  const HERO_PRESETS = {
    desert: `<svg viewBox="0 0 640 570" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="sunsetGlow" cx="68%" cy="28%" r="42%">
          <stop offset="0%" stop-color="#f7c89e" stop-opacity=".95"/>
          <stop offset="48%" stop-color="#e99a6c" stop-opacity=".35"/>
          <stop offset="100%" stop-color="#172d3d" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="duneGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e0c2a4"/>
          <stop offset="100%" stop-color="#b47b5c"/>
        </linearGradient>
      </defs>
      <rect width="640" height="570" fill="url(#sunsetGlow)"/>
      <g fill="#f7dec5" opacity=".72">
        <circle cx="95" cy="68" r="1.4"/><circle cx="172" cy="42" r="1.1"/><circle cx="246" cy="84" r="1.6"/>
        <circle cx="318" cy="36" r="1.2"/><circle cx="486" cy="52" r="1.5"/><circle cx="564" cy="96" r="1.3"/>
        <circle cx="140" cy="126" r="1"/><circle cx="520" cy="142" r="1.1"/>
      </g>
      <circle cx="430" cy="168" r="108" fill="#f3bd96"/>
      <path d="M0 390 L85 322 L162 348 L268 250 L345 308 L442 228 L545 304 L640 278 L640 570 L0 570 Z" fill="#5b7788" opacity=".78"/>
      <path d="M0 432 Q95 365 180 402 T378 338 Q465 306 545 365 L640 342 L640 570 L0 570 Z" fill="url(#duneGold)"/>
      <path d="M0 458 L112 426 L218 462 L348 398 L468 446 L580 412 L640 434 L640 570 L0 570 Z" fill="#1d394b"/>
      <path d="M0 510 Q180 448 358 492 T640 472 L640 570 L0 570 Z" fill="#122737"/>
    </svg>`,
    mountain: `<svg viewBox="0 0 640 570" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="peakGlow" cx="65%" cy="28%" r="45%">
          <stop offset="0%" stop-color="#f5cda8" stop-opacity=".92"/>
          <stop offset="55%" stop-color="#d88f68" stop-opacity=".28"/>
          <stop offset="100%" stop-color="#172d3d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="640" height="570" fill="url(#peakGlow)"/>
      <circle cx="420" cy="172" r="96" fill="#f2bc95"/>
      <path d="M0 410 L130 270 L250 360 L390 210 L520 330 L640 250 L640 570 L0 570 Z" fill="#4f6c7e" opacity=".82"/>
      <path d="M0 460 L170 340 L320 420 L490 295 L640 390 L640 570 L0 570 Z" fill="#234052"/>
      <path d="M0 510 Q200 465 400 495 T640 480 L640 570 L0 570 Z" fill="#122737"/>
    </svg>`,
    coast: `<svg viewBox="0 0 640 570" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="seaGlow" cx="66%" cy="32%" r="44%">
          <stop offset="0%" stop-color="#f7c89e" stop-opacity=".95"/>
          <stop offset="50%" stop-color="#e99a6c" stop-opacity=".34"/>
          <stop offset="100%" stop-color="#172d3d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="640" height="570" fill="url(#seaGlow)"/>
      <circle cx="425" cy="210" r="102" fill="#f3bd96"/>
      <path d="M0 370 Q170 330 340 360 T640 340 L640 570 L0 570 Z" fill="#355568"/>
      <path d="M0 435 Q160 400 320 430 T640 415 L640 570 L0 570 Z" fill="#1f3b4d"/>
      <path d="M0 495 Q190 465 380 490 T640 475 L640 570 L0 570 Z" fill="#122737"/>
    </svg>`
  };

  /* -----------------------------------------------------------------------
     Normalize plans array & lookup map
     ----------------------------------------------------------------------- */
  const rawPlans = Array.isArray(DATA.compare?.plans) ? DATA.compare.plans : [];
  const planMap = {};
  rawPlans.forEach(p => { planMap[p.id] = p; });
  const defaultPlanKey = DATA.compare?.defaultPlan || rawPlans[0]?.id || 'v1';

  /* -----------------------------------------------------------------------
     Build Main Document Shell
     ----------------------------------------------------------------------- */
  const meta = DATA.meta || {};
  const hero = DATA.hero || {};
  const climate = DATA.climate || {};
  const places = DATA.places || {};
  const compare = DATA.compare || {};
  const mapCfg = DATA.map || {};
  const customCfg = DATA.customBuilder || {};
  const checklist = DATA.checklist || {};
  const mobileCfg = DATA.mobile || {};
  const footer = DATA.footer || {};

  const navLabels = meta.navLabels || {
    climate: '行前与天气',
    places: '沿途停靠',
    compare: '切换视角',
    map: '路线地图',
    plan: '每日安排',
    verify: '行前检查',
  };

  const stopsList = Array.isArray(places.stops) ? places.stops : [];
  const bookingCols = places.bookingColumns || ['时间与项目', '具体安排', '确认号 / 备注'];
  const heroArtHtml = hero.artSvg || HERO_PRESETS[hero.artPreset || 'desert'] || HERO_PRESETS.desert;

  const rootEl = document.getElementById('trip-root');
  if (!rootEl) return;

  rootEl.innerHTML = `
    <header class="site-header">
      <div class="brand-group">
        <a class="portal-back" href="../../">← 所有行程</a>
        <a class="brand" href="#top">
          <span class="brand-icon">✦</span>
          <span>${esc(meta.brandTitle || 'TRIP PLAN')}<br>${esc(meta.brandSubtitle || '')} <small>${esc(meta.brandYear || '')}</small></span>
        </a>
      </div>
      <nav aria-label="页面导航">
        <a href="#climate">${esc(navLabels.climate)}</a>
        <a href="#places">${esc(navLabels.places)}</a>
        <a href="#compare">${esc(navLabels.compare)}</a>
        <a href="#map-section">${esc(navLabels.map)}</a>
        <a href="#plan">${esc(navLabels.plan)}</a>
        <a href="#verify">${esc(navLabels.verify)}</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="mode-toggle" id="mode-toggle" aria-pressed="false" aria-label="切换到手机随身版">手机版</button>
        <a class="header-cta" href="#plan">${esc(meta.ctaLabel || '看每日安排')} <span>↗</span></a>
      </div>
    </header>

    <section id="mobile-app" class="mobile-app" hidden aria-label="手机随身行程模式">
      <div id="mobile-map-bar" class="mobile-map-bar" hidden></div>
      <div id="mobile-content" class="mobile-content"></div>
    </section>

    <main id="top">
      <section class="hero">
        <div class="hero-orbit hero-orbit-one"></div>
        <div class="hero-orbit hero-orbit-two"></div>
        <div class="hero-inner container">
          <div class="hero-copy">
            <div class="eyebrow light"><span class="line"></span> ${esc(hero.eyebrow || '')}</div>
            ${hero.tag ? `<a class="hero-v1-tag" id="hero-v1-tag" href="#compare">${esc(hero.tag)}</a>` : ''}
            <h1>${hero.titleHtml || esc(meta.title || '')}</h1>
            <p id="hero-intro">${hero.intro || ''}</p>
            <div class="hero-pills">
              ${(hero.pills || []).map(p => `<span>${esc(p)}</span>`).join('')}
            </div>
            <a class="hero-link" href="#compare">${esc(hero.ctaLabel || '查看方案')} <span>↓</span></a>
          </div>
          <div class="hero-art" aria-hidden="true">
            ${heroArtHtml}
            ${hero.artCaption ? `<div class="art-caption">${esc(hero.artCaption)}</div>` : ''}
          </div>
        </div>
        <div class="hero-bottom container">
          <span>${esc(hero.bottomLabel || meta.title || '')}</span>
          <span>${esc(hero.scrollLabel || '向下滚动查看')} <b>↓</b></span>
        </div>
      </section>

      <section id="climate" class="climate section-pad">
        <div class="container split-intro">
          <div>
            <div class="eyebrow"><span class="line"></span> ${esc(climate.eyebrow || '00 / 天气与行前')}</div>
            <h2>${climate.titleHtml || ''}</h2>
          </div>
          <div class="intro-copy">
            ${(climate.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
        <div class="container climate-grid">
          ${(climate.cards || []).map(c => `
            <article class="climate-card">
              <span class="climate-icon">${esc(c.icon || '✦')}</span>
              <span class="card-num">${esc(c.num || '')}</span>
              <h3>${esc(c.title || '')}</h3>
              <p>${c.body || ''}</p>
              ${c.chip ? `<span class="weather-chip">${esc(c.chip)}</span>` : ''}
            </article>
          `).join('')}
        </div>
        ${climate.notice ? `
          <div class="container notice">
            <span>${esc(climate.notice.label || '提醒')}</span>
            <p>${climate.notice.html || ''}</p>
          </div>
        ` : ''}
      </section>

      <section id="places" class="original section-pad">
        <div class="container section-top">
          <div>
            <div class="eyebrow"><span class="line"></span> ${esc(places.eyebrow || '01 / 沿途停靠点')}</div>
            <h2>${places.titleHtml || ''}</h2>
          </div>
          <p>${places.intro || ''}</p>
        </div>

        <div class="container stop-gallery" id="stop-gallery"></div>

        ${places.transitNote ? `
          <div class="container transit-note">
            <b>${esc(places.transitNote.label || '交通说明')}</b>
            <p>${places.transitNote.html || ''}</p>
          </div>
        ` : ''}

        ${places.highlightCard ? `
          <div class="container crater-note">
            <img src="${esc(places.highlightCard.photo || '')}" alt="${esc(places.highlightCard.alt || '')}">
            <div>
              <span>${esc(places.highlightCard.kicker || '')}</span>
              <h3>${esc(places.highlightCard.title || '')}</h3>
              <p>${places.highlightCard.body || ''}</p>
              ${places.highlightCard.small ? `<small>${places.highlightCard.small}</small>` : ''}
            </div>
          </div>
        ` : ''}

        ${places.bookingReference && places.bookingReference.length ? `
          <details class="container original-archive">
            <summary>${esc(places.bookingArchiveTitle || '展开看预订与确认号速查表')}</summary>
            ${places.bookingArchiveDesc ? `<p>${esc(places.bookingArchiveDesc)}</p>` : ''}
            <div class="original-table-wrap">
              <table class="original-table">
                <thead>
                  <tr>${bookingCols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr>
                </thead>
                <tbody id="booking-rows">
                  ${places.bookingReference.map(([a, b, c]) => `<tr><th scope="row"><b>${esc(a)}</b></th><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </details>
        ` : ''}
      </section>

      <section id="compare" class="compare section-pad">
        <div class="container section-top">
          <div>
            <div class="eyebrow"><span class="line"></span> ${esc(compare.eyebrow || '02 / 切换视角')}</div>
            <h2>${compare.titleHtml || ''}</h2>
          </div>
          <p>${compare.intro || ''}</p>
        </div>

        <div class="container compare-grid" role="group" aria-label="选择行程视角">
          ${rawPlans.map((p, idx) => `
            <button type="button" class="compare-card plan-option ${idx === 0 ? 'v1-card' : ''} ${p.id === defaultPlanKey ? 'is-active' : ''}" data-plan="${esc(p.id)}" aria-pressed="${p.id === defaultPlanKey ? 'true' : 'false'}">
              ${idx === 0 ? '<span class="v1-star" aria-hidden="true">★</span>' : ''}
              <span class="compare-kicker">${esc(p.cardKicker || '')}</span>
              <strong>${esc(p.cardTitle || p.name || '')}</strong>
              ${(p.cardLines || []).map(line => `<span>${line}</span>`).join('')}
              <small>${esc(p.cardAction || '切换视图 ↗')}</small>
            </button>
          `).join('')}
        </div>

        ${customCfg.enabled ? `
          <div class="container custom-entry">
            <div>
              <span class="compare-kicker">${esc(customCfg.kicker || '临时想改路线')}</span>
              <h3>${esc(customCfg.title || '自定义路线微调')}</h3>
              <p>${esc(customCfg.desc || '')}</p>
            </div>
            <button id="custom-trigger" type="button" aria-pressed="false">打开编辑器 ↗</button>
          </div>

          <div class="container custom-builder" id="custom-builder" hidden>
            <div class="custom-builder-head">
              <div>
                <h3>${esc(customCfg.editorTitle || '逐日修改停靠点')}</h3>
                <p>${esc(customCfg.editorDesc || '先导入一套方案再增删停靠点，改动会自动保存在当前浏览器里。')}</p>
              </div>
              <div class="custom-builder-actions">
                <button type="button" id="custom-add-day">增加一天 ＋</button>
                <button type="button" id="custom-remove-day">减少一天 −</button>
              </div>
            </div>
            <div class="custom-reset-actions" role="group" aria-label="导入预设或清空">
              <button type="button" id="custom-clear">清空路线</button>
              ${(customCfg.importButtons || []).map(b => `<button type="button" data-import="${esc(b.id)}">${esc(b.label)}</button>`).join('')}
            </div>
            <div class="custom-start-row">
              <label for="custom-start">出发地点</label>
              <select id="custom-start"><option value="">请选择出发地点</option></select>
              ${customCfg.startHint ? `<small>${esc(customCfg.startHint)}</small>` : ''}
            </div>
            <div class="custom-totals">
              <strong id="custom-total-summary"></strong>
              <a href="#map-section">去看更新后的地图 ↓</a>
            </div>
            <div id="custom-day-list"></div>
            ${customCfg.estimateNote ? `<p class="custom-estimate-note">${esc(customCfg.estimateNote)}</p>` : ''}
          </div>
        ` : ''}
      </section>

      <section id="map-section" class="map-section section-pad">
        <div class="container section-top map-title">
          <div>
            <div class="eyebrow"><span class="line"></span> ${esc(mapCfg.eyebrow || '03 / 路线地图')}</div>
            <h2>${mapCfg.titleHtml || ''}</h2>
          </div>
          <p>${mapCfg.intro || ''}</p>
        </div>

        <div class="container map-shell">
          <div id="trip-map" role="img" aria-label="${esc(mapCfg.ariaLabel || '行程路线地图')}"></div>
          <div class="map-name-layer" id="map-name-layer"></div>
          <div class="map-overlay">
            <div class="map-overlay-title" id="map-plan-name"></div>
            <div><span class="legend-dot orange"></span> ${esc(mapCfg.stopLegendLabel || '当前停留 / 观景点')}</div>
            <div><span class="legend-dot blue"></span> ${esc(mapCfg.hubLegendLabel || '补能 / 交通枢纽')}</div>
            <div><span class="legend-dot grey"></span> ${esc(mapCfg.otherLegendLabel || '其他视图节点')}</div>
            <small>${esc(mapCfg.overlayHint || '可拖拽平移或缩放；点圆点看备忘。')}</small>
          </div>
          <div class="map-zoom-controls">
            <button type="button" id="zoom-in" aria-label="放大地图">＋</button>
            <button type="button" id="zoom-out" aria-label="缩小地图">−</button>
            <button type="button" id="zoom-reset" aria-label="重置视野">⟲</button>
          </div>
        </div>

        <div class="container route-grid" id="route-grid"></div>
        <div class="container route-note">
          <span id="route-estimate-explain">${esc(mapCfg.routeNote || '')}</span>
          <a id="full-route-link" target="_blank" rel="noopener">${esc(mapCfg.fullRouteLabel || '在 Google Maps 打开整条路线 ↗')}</a>
        </div>
      </section>

      <section id="plan" class="plan section-pad">
        <div class="container plan-heading">
          <div>
            <div class="eyebrow"><span class="line"></span> <span id="plan-eyebrow"></span></div>
            <h2 id="plan-title"></h2>
          </div>
          <div class="plan-summary">
            <span id="plan-miles"></span>
            <span id="plan-hours"></span>
            <small>${esc(compare.summaryNote || '不含休息、吃饭和拍照时间')}</small>
          </div>
        </div>

        <div class="container plan-warning">
          <span>${esc(compare.warningLabel || '最容易出岔子的事')}</span>
          <p id="plan-warning"></p>
        </div>

        <div class="container timeline" id="timeline"></div>

        <div class="container plan-considerations" id="plan-considerations">
          <div class="eyebrow"><span class="line"></span> ${esc(compare.considerationsEyebrow || '关键提醒')}</div>
          <h3>${esc(compare.considerationsTitle || '路上盯紧这几件事')}</h3>
          <ul id="plan-considerations-list"></ul>
        </div>

        <div class="container dropped" id="plan-dropped">
          <div class="eyebrow"><span class="line"></span> ${esc(compare.droppedEyebrow || '主动避开的坑')}</div>
          <h3>${esc(compare.droppedTitle || '不把时间耗在不必要的地方。')}</h3>
          <div class="tag-wrap" id="plan-dropped-tags"></div>
          <p id="plan-dropped-note"></p>
        </div>
      </section>

      <section id="verify" class="verify section-pad">
        <div class="container">
          <div class="eyebrow"><span class="line"></span> ${esc(checklist.eyebrow || '05 / 出发前检查清单')}</div>
          <h2>${checklist.titleHtml || ''}</h2>
          <p class="verify-sub">${esc(checklist.sub || '点一下卡片就能勾选，勾选结果会留在当前浏览器里。')}</p>
          <div class="verify-grid">
            ${(checklist.items || []).map((item, idx) => `
              <div class="verify-item" data-check="${esc(item.id)}" role="button" tabindex="0">
                <div class="verify-item-head"><b>${String(idx + 1).padStart(2, '0')}</b><span class="verify-check">✓</span></div>
                <h3>${esc(item.title)}</h3>
                <p>${item.html || esc(item.desc || '')}</p>
              </div>
            `).join('')}
          </div>

          ${checklist.sources && checklist.sources.length ? `
            <div class="source-bar">
              <span>${esc(checklist.sourceBarLabel || '行前实用链接')}</span>
              ${checklist.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}
            </div>
          ` : ''}
        </div>
      </section>
    </main>

    <footer>
      <div class="container footer-inner">
        <div>
          <span class="footer-mark">✦</span>
          <b>${esc(footer.brand || meta.brandTitle || '')}</b>
          <small>${esc(footer.tagline || '')}</small>
        </div>
        <span id="footer-route">${footer.defaultRouteHtml || ''}</span>
        <a href="#top">${esc(footer.topLabel || '回到顶部 ↑')}</a>
      </div>
    </footer>

    <nav id="mobile-tabbar" class="mobile-tabbar" hidden role="tablist" aria-label="手机模式导航">
      <button type="button" data-m-tab="plan" role="tab" aria-selected="true" class="is-active"><span class="m-tab-ico">◷</span><span>行程</span></button>
      <button type="button" data-m-tab="map" role="tab" aria-selected="false"><span class="m-tab-ico">◎</span><span>地图</span></button>
      <button type="button" data-m-tab="stops" role="tab" aria-selected="false"><span class="m-tab-ico">◈</span><span>停靠</span></button>
      <button type="button" data-m-tab="vault" role="tab" aria-selected="false"><span class="m-tab-ico">✓</span><span>凭证</span></button>
    </nav>
    <div id="mobile-toast" class="mobile-toast" role="status" aria-live="polite"></div>
  `;

  /* -----------------------------------------------------------------------
     Stop Gallery (3x3 Flip Cards)
     ----------------------------------------------------------------------- */
  const gallery = document.getElementById('stop-gallery');
  function renderSlide(stop, slideIndex) {
    if (slideIndex === 0) {
      return `<img src="${esc(stop.photo)}" alt="${esc(stop.caption || stop.name)}" loading="lazy"><figcaption>${esc(stop.caption || stop.name)}</figcaption>`;
    }
    return `<div class="stop-brief-slide">
      <div class="brief-kicker">现场要点</div>
      <ul>${(stop.brief || []).map(([k, v]) => `<li><b>${esc(k)}：</b>${esc(v)}</li>`).join('')}</ul>
      <div class="brief-foot"><span>${esc(stop.footLeft || '')}</span><span>${esc(stop.footRight || '')}</span></div>
    </div>`;
  }

  if (gallery && stopsList.length) {
    gallery.innerHTML = stopsList.map((stop, index) => `
      <article class="stop-card" data-stop="${index}" data-slide="0">
        <div class="stop-card-head">
          <span>${String(index + 1).padStart(2, '0')} / ${esc(stop.kicker || '')}</span>
          <h4>${esc(stop.name)}</h4>
          <p>${esc(stop.desc || '')}</p>
        </div>
        <figure class="stop-photo">${renderSlide(stop, 0)}</figure>
        <div class="stop-controls">
          <button type="button" class="stop-prev" aria-label="切换 ${esc(stop.name)} 上一视图">←</button>
          <span class="stop-count" aria-live="polite">1 / 2 · 照片</span>
          <button type="button" class="stop-next" aria-label="切换 ${esc(stop.name)} 下一视图">→</button>
        </div>
        <div class="stop-details">
          <span class="stop-rating">推荐度 <b>${esc(stop.rating || '★★★★★')}</b></span>
          <span>计划时段 <b>${esc(stop.duration || '')}</b></span>
          <span>气温与光线 <b>${esc(stop.weather || '')}</b></span>
        </div>
        <div class="stop-credit"><a href="${esc(stop.mapUrl || gMapsUrl(stop.mapQuery || stop.name))}" target="_blank" rel="noopener">打开 Google Maps ↗</a> · 点箭头看停车和要点</div>
      </article>
    `).join('');

    function toggleStopSlide(card, delta) {
      const stop = stopsList[Number(card.dataset.stop)];
      const next = (Number(card.dataset.slide) + delta + 2) % 2;
      card.dataset.slide = String(next);
      card.querySelector('.stop-photo').innerHTML = renderSlide(stop, next);
      card.querySelector('.stop-count').textContent = next === 0 ? '1 / 2 · 照片' : '2 / 2 · 现场要点';
    }

    gallery.addEventListener('click', event => {
      const btn = event.target.closest('button');
      if (!btn) return;
      toggleStopSlide(btn.closest('.stop-card'), btn.classList.contains('stop-next') ? 1 : -1);
    });

    gallery.querySelectorAll('.stop-card').forEach(card => {
      let touchX;
      card.querySelector('.stop-photo').addEventListener('touchstart', e => {
        touchX = e.changedTouches[0].screenX;
      }, { passive: true });
      card.querySelector('.stop-photo').addEventListener('touchend', e => {
        if (touchX === undefined) return;
        const dist = e.changedTouches[0].screenX - touchX;
        if (Math.abs(dist) > 45) toggleStopSlide(card, dist < 0 ? 1 : -1);
        touchX = undefined;
      }, { passive: true });
    });
  }

  /* -----------------------------------------------------------------------
     Interactive Leaflet Map with Staggered Labels & Leader Lines
     ----------------------------------------------------------------------- */
  const coordinates = mapCfg.coordinates || {};
  const hubNodes = new Set(mapCfg.hubNodes || []);
  const shortNames = mapCfg.shortNames || {};
  const popupNotes = mapCfg.popupNotes || {};
  const routeLegs = Object.assign({}, mapCfg.routeLegs || {});
  const routePaths = Object.assign({}, mapCfg.routePaths || {});
  const routeStops = Object.assign({}, mapCfg.routeStops || {});
  const hubBadgeText = mapCfg.hubPopupTag || '⚡ 补能 / 枢纽';
  const activeBadgeText = mapCfg.stopPopupTag || '★ 当前停留点';
  const otherBadgeText = mapCfg.otherPopupTag || '其他视图节点';

  let leafletMap = null;
  let routeLayerGroup = null;
  let activeMapKey = defaultPlanKey;
  const nameLayer = document.getElementById('map-name-layer');

  function initLeafletMap() {
    const mapContainer = document.getElementById('trip-map');
    if (!mapContainer || typeof window.L === 'undefined') return;

    const firstCoord = Object.values(coordinates)[0] || [35.0, -117.5];
    leafletMap = window.L.map(mapContainer, {
      center: firstCoord,
      zoom: 7,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false
    });

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(leafletMap);

    routeLayerGroup = window.L.layerGroup().addTo(leafletMap);

    leafletMap.on('moveend zoomend resize', () => {
      renderMapLabels(activeMapKey);
    });

    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => leafletMap.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => leafletMap.zoomOut());
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => fitPlanBounds(activeMapKey));
  }

  function fitPlanBounds(key) {
    if (!leafletMap) return;
    const names = (routePaths[key] && routePaths[key].length ? routePaths[key] : Object.keys(coordinates))
      .filter(n => coordinates[n]);
    if (!names.length) return;
    const pts = names.map(n => coordinates[n]);
    if (pts.length === 1) {
      leafletMap.setView(pts[0], 11);
      return;
    }
    const w = leafletMap.getSize().x || 900;
    const padLeft = w > 760 ? 275 : 36;
    leafletMap.fitBounds(window.L.latLngBounds(pts), {
      paddingTopLeft: [padLeft, 48],
      paddingBottomRight: [48, 48],
      maxZoom: 13
    });
  }

  function renderMapLabels(key) {
    if (!leafletMap || !nameLayer) return;
    const size = leafletMap.getSize();
    const width = size.x || 0;
    const height = size.y || 0;
    if (!width || !height) return;

    nameLayer.innerHTML = '';
    const lineSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lineSvg.setAttribute('class', 'map-name-lines');
    lineSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    nameLayer.append(lineSvg);

    const placed = [];
    const legend = document.querySelector('.map-overlay');
    if (legend) {
      placed.push({ x: -4, y: -4, w: legend.offsetWidth + 26, h: legend.offsetHeight + 26 });
    }

    const overlap = (a, b) =>
      a.x < b.x + b.w + 4 && a.x + a.w + 4 > b.x &&
      a.y < b.y + b.h + 3 && a.y + a.h + 3 > b.y;

    const stops = [...new Set(routeStops[key] || [])]
      .filter(n => coordinates[n])
      .map(name => ({ name, point: leafletMap.latLngToContainerPoint(coordinates[name]) }))
      .filter(({ point }) => point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height)
      .sort((a, b) => a.point.y - b.point.y);

    stops.forEach(({ name, point }) => {
      const label = document.createElement('span');
      label.className = 'map-name-label' + (hubNodes.has(name) ? ' is-charger' : '');
      label.textContent = shortNames[name] || name;
      nameLayer.append(label);
      const w = label.offsetWidth;
      const h = label.offsetHeight;
      const shifts = [0];
      for (let delta = 22; delta < height; delta += 22) shifts.push(-delta, delta);
      let choice;
      for (const shift of shifts) {
        for (const side of ['right', 'left']) {
          const rawX = side === 'right' ? point.x + 16 : point.x - 16 - w;
          const x = Math.max(6, Math.min(width - w - 6, rawX));
          const y = Math.max(6, Math.min(height - h - 6, point.y - h / 2 + shift));
          const box = { x, y, w, h, side };
          if (!placed.some(other => overlap(box, other))) {
            choice = box;
            break;
          }
        }
        if (choice) break;
      }
      if (!choice) {
        choice = {
          x: Math.max(6, Math.min(width - w - 6, point.x + 16)),
          y: Math.max(6, Math.min(height - h - 6, point.y - h / 2)),
          w, h, side: 'right'
        };
        label.classList.add('is-crowded');
      }
      label.style.left = `${choice.x}px`;
      label.style.top = `${choice.y}px`;
      placed.push(choice);

      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', point.x);
      ln.setAttribute('y1', point.y);
      ln.setAttribute('x2', choice.side === 'right' ? choice.x : choice.x + w);
      ln.setAttribute('y2', choice.y + h / 2);
      lineSvg.append(ln);
    });
  }

  function renderRoute(key) {
    activeMapKey = key;
    const plan = planMap[key] || planMap[defaultPlanKey];
    const legs = routeLegs[key] || [];
    const mapTitleEl = document.getElementById('map-plan-name');
    if (mapTitleEl && plan) mapTitleEl.textContent = plan.name || '';

    const routeGrid = document.getElementById('route-grid');
    if (routeGrid) {
      routeGrid.innerHTML = legs.length
        ? legs.map((leg, i) => `
          <a class="route-leg" href="https://www.google.com/maps/dir/${leg[4]}" target="_blank" rel="noopener">
            <b>${String(i + 1).padStart(2, '0')} · ${esc(leg[0])} → ${esc(leg[1])} ↗</b>
            <span>${esc(leg[2])}</span>
            <small>${esc(leg[3])}</small>
          </a>
        `).join('')
        : '<p class="route-empty">选好起点和每天的住宿后，这里会出现分段导航链接。</p>';
    }

    const fullRoute = document.getElementById('full-route-link');
    if (fullRoute) {
      fullRoute.hidden = !legs.length;
      if (legs.length) {
        fullRoute.href = `https://www.google.com/maps/dir/${legs.map((leg, i) => i === 0 ? leg[4] : leg[4].split('/').slice(1).join('/')).join('/')}`;
      }
    }

    if (!leafletMap || !routeLayerGroup) return;
    routeLayerGroup.clearLayers();

    const activeSet = new Set(routeStops[key] || []);
    const pathLatLngs = (routePaths[key] || [])
      .filter(n => coordinates[n])
      .map(n => coordinates[n]);

    if (pathLatLngs.length > 1) {
      window.L.polyline(pathLatLngs, { color: '#fffdf7', weight: 7.5, opacity: 0.92, lineJoin: 'round' }).addTo(routeLayerGroup);
      window.L.polyline(pathLatLngs, { color: '#c75f3b', weight: 3.6, opacity: 0.96, lineJoin: 'round' }).addTo(routeLayerGroup);
    }

    Object.entries(coordinates).forEach(([name, latlng]) => {
      const isActive = activeSet.has(name);
      const isHub = hubNodes.has(name);
      const cls = !isActive ? 'skip' : (isHub ? 'charger' : '');
      const icon = window.L.divIcon({
        className: 'pin-marker',
        html: `<div class="pin-dot ${cls}"></div>`,
        iconSize: [0, 0]
      });
      const tag = isHub ? hubBadgeText : (isActive ? activeBadgeText : otherBadgeText);
      const popupHtml = `<span class="popup-tag">${esc(tag)}</span><b>${esc(name)}</b><div>${esc(popupNotes[name] || '')}</div>`;
      window.L.marker(latlng, { icon, zIndexOffset: isActive ? (isHub ? 600 : 500) : 100 })
        .bindPopup(popupHtml)
        .addTo(routeLayerGroup);
    });

    // Leg midpoint duration badges (skip dense short city hops unless single-region zoom)
    const denseFilter = new Set(mapCfg.denseClusterNodes || []);
    const zoomDetailPlan = mapCfg.detailPlanId || '';
    legs.forEach((leg, i) => {
      if (leg[0] === leg[1] || !coordinates[leg[0]] || !coordinates[leg[1]]) return;
      if (key !== zoomDetailPlan && denseFilter.has(leg[0]) && denseFilter.has(leg[1])) return;
      const c1 = coordinates[leg[0]];
      const c2 = coordinates[leg[1]];
      const mid = [(c1[0] + c2[0]) / 2, (c1[1] + c2[1]) / 2];
      const badgeLabel = `${i + 1} · ${leg[2].replace('约 ', '').replace(' 小时', 'h').replace(' 分钟', 'm')}`;
      const badgeIcon = window.L.divIcon({
        className: 'route-badge-icon',
        html: `<span class="route-badge">${esc(badgeLabel)}</span>`,
        iconSize: [0, 0]
      });
      window.L.marker(mid, { icon: badgeIcon, interactive: false, zIndexOffset: 300 }).addTo(routeLayerGroup);
    });

    fitPlanBounds(key);
    setTimeout(() => renderMapLabels(key), 60);
  }

  /* -----------------------------------------------------------------------
     Timeline & Plan Switching
     ----------------------------------------------------------------------- */
  const renderDay = d => `
    <article class="day">
      <div class="day-date"><strong>${esc(d.date)}</strong><span>${esc(d.weekday || '')}</span></div>
      <div class="day-body">
        <div>
          <h3>${esc(d.title)}</h3>
          <p>${d.body || ''}</p>
          ${d.steps ? `<div class="day-steps">${d.steps.map(([t, desc, hi]) => `<div class="day-step ${hi ? 'is-highlight' : ''}"><time>${esc(t)}</time><span>${desc}</span></div>`).join('')}</div>` : ''}
        </div>
        <div class="day-aside">
          <b>${esc(d.drive || '')}</b>
          <span>${esc(d.stay || '')}</span>
          ${d.charge ? `<span class="aside-charge">⚡ ${esc(d.charge)}</span>` : ''}
          ${d.risk ? `<small class="day-risk">留意：${esc(d.risk)}</small>` : ''}
        </div>
      </div>
    </article>`;

  function showPlan(key) {
    const plan = planMap[key];
    if (!plan) return;
    document.getElementById('plan-eyebrow').textContent = plan.eyebrow || '';
    document.getElementById('plan-title').innerHTML = plan.titleHtml || '';
    document.getElementById('plan-miles').textContent = plan.miles || '';
    document.getElementById('plan-hours').textContent = plan.hours || '';
    document.getElementById('plan-warning').textContent = plan.warning || '';
    document.getElementById('timeline').innerHTML = plan.days && plan.days.length
      ? plan.days.map(renderDay).join('')
      : '<p class="plan-empty">选好起点和每天的住宿后，这里会生成每日安排。</p>';

    document.getElementById('plan-dropped-tags').innerHTML = (plan.dropped || [])
      .map(t => `<span class="drop-tag">${esc(t)} <b>✕</b></span>`).join('');
    document.getElementById('plan-dropped-note').textContent = plan.droppedNote || '';
    document.getElementById('plan-dropped').hidden = (key === 'custom' && !plan.ready) || !(plan.dropped && plan.dropped.length);

    const consider = document.getElementById('plan-considerations');
    const hasConsider = Boolean(plan.considerations && plan.considerations.length);
    consider.hidden = !hasConsider;
    if (hasConsider) {
      document.getElementById('plan-considerations-list').innerHTML = plan.considerations
        .map(([t, b]) => `<li><strong>${esc(t)}</strong><span>${esc(b)}</span></li>`).join('');
    }

    const footerRoute = document.getElementById('footer-route');
    if (footerRoute) {
      footerRoute.innerHTML = (footer.routeByPlan && footer.routeByPlan[key]) || footer.defaultRouteHtml || '';
    }

    document.querySelectorAll('.plan-option').forEach(b => {
      const active = b.dataset.plan === key;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    const cb = document.getElementById('custom-builder');
    const ct = document.getElementById('custom-trigger');
    if (cb) cb.hidden = key !== 'custom';
    if (ct) {
      ct.classList.toggle('is-active', key === 'custom');
      ct.setAttribute('aria-pressed', String(key === 'custom'));
    }

    renderRoute(key);
  }

  document.querySelectorAll('.plan-option').forEach(b => {
    b.addEventListener('click', () => showPlan(b.dataset.plan));
  });
  const heroTag = document.getElementById('hero-v1-tag');
  if (heroTag) heroTag.addEventListener('click', () => showPlan(defaultPlanKey));

  /* -----------------------------------------------------------------------
     Optional Custom Route Builder (Dijkstra over roadEdges)
     ----------------------------------------------------------------------- */
  if (customCfg.enabled) {
    const roadGraph = {};
    (customCfg.roadEdges || []).forEach(([a, b, m, h]) => {
      (roadGraph[a] ??= []).push({ to: b, miles: m, hours: h });
      (roadGraph[b] ??= []).push({ to: a, miles: m, hours: h });
    });

    function roadRoute(from, to) {
      if (from === to) return { nodes: [from], miles: 0, hours: 0 };
      const dist = { [from]: 0 };
      const prev = {};
      const pend = new Set(Object.keys(roadGraph));
      while (pend.size) {
        const cur = [...pend].reduce((b, n) => (dist[n] ?? Infinity) < (dist[b] ?? Infinity) ? n : b);
        if (dist[cur] === undefined) break;
        pend.delete(cur);
        if (cur === to) break;
        (roadGraph[cur] || []).forEach(e => {
          if (!pend.has(e.to)) return;
          const nxt = dist[cur] + e.hours;
          if (nxt < (dist[e.to] ?? Infinity)) {
            dist[e.to] = nxt;
            prev[e.to] = { from: cur, edge: e };
          }
        });
      }
      if (!prev[to]) return { nodes: [from, to], miles: 0, hours: 0 };
      const nodes = [to];
      let miles = 0;
      let hours = 0;
      while (nodes[0] !== from) {
        const s = prev[nodes[0]];
        miles += s.edge.miles;
        hours += s.edge.hours;
        nodes.unshift(s.from);
      }
      return { nodes, miles, hours };
    }

    const numLbl = n => Number(n.toFixed(1)).toString();
    const mapSearch = customCfg.mapSearch || {};
    const gPath = names => names.map(n => encodeURIComponent(mapSearch[n] || n)).join('/');
    const startPlaces = customCfg.startPlaces || [];
    const lodgingPlaces = customCfg.lodgingPlaces || [];
    const endPlaces = customCfg.endPlaces || [];
    const attractionPlaces = customCfg.attractionPlaces || [];
    const transitPlaces = customCfg.transitPlaces || [];
    const templates = customCfg.templates || {};
    const templateStarts = customCfg.templateStarts || {};
    const distUnit = customCfg.distanceUnit || '英里';

    let customStart = startPlaces[0] || '';
    let customDays = null;

    function loadCustomTemplate(k) {
      customStart = templateStarts[k] || startPlaces[0] || '';
      const src = templates[k] || templates[defaultPlanKey] || [];
      customDays = src.map(d => ({ stay: d.stay, stops: [...d.stops] }));
    }

    function buildCustomPlan() {
      const ready = Boolean(customStart && customDays.length && customDays.every(d => d.stay));
      if (!ready) {
        routeLegs.custom = [];
        routePaths.custom = customStart ? [customStart] : [];
        routeStops.custom = customStart ? [customStart] : [];
        planMap.custom = {
          id: 'custom',
          name: '自定义路线',
          ready: false,
          eyebrow: '04 / 每日安排 · 自定义',
          titleHtml: '自定义路线，<br><em>按自己的节奏改。</em>',
          miles: '里程待算',
          hours: '时间待算',
          warning: !customStart ? '先选出发地点，或者直接点上方按钮导入一套现有计划。' : '把每天的住宿选齐，下面就会自动算出里程和路线。',
          days: [],
          dropped: [],
          droppedNote: ''
        };
        return { dayEstimates: customDays.map(() => null) };
      }

      const legs = [];
      const path = [customStart];
      const active = new Set([customStart]);
      const days = [];
      const dayEstimates = [];
      let totalM = 0;
      let totalH = 0;
      let maxH = 0;

      customDays.forEach((d, idx) => {
        const origin = idx ? customDays[idx - 1].stay : customStart;
        const visits = [origin, ...d.stops, d.stay].filter((n, i, a) => i === 0 || n !== a[i - 1]);
        let dm = 0;
        let dh = 0;
        for (let i = 1; i < visits.length; i++) {
          const seg = roadRoute(visits[i - 1], visits[i]);
          dm += seg.miles;
          dh += seg.hours;
          path.push(...seg.nodes.slice(1));
        }
        visits.forEach(n => active.add(n));
        totalM += dm;
        totalH += dh;
        maxH = Math.max(maxH, dh);
        const m = Math.round(dm);
        const h = numLbl(dh);
        const chargeHint = visits.find(v => hubNodes.has(v));
        days.push({
          date: `Day ${idx + 1}`,
          weekday: '自定义',
          title: origin === d.stay ? `${origin} 周边` : `${origin} → ${d.stay}`,
          body: d.stops.length ? `顺路停 ${d.stops.join(' → ')}，晚上到 ${d.stay}。` : `直接从 ${origin} 前往 ${d.stay}。`,
          steps: d.stops.length ? d.stops.map((s, si) => [`停靠 ${si + 1}`, esc(s)]) : [['直达', `${esc(origin)} → ${esc(d.stay)}`]],
          drive: m ? `约 ${m} ${distUnit} · 纯交通 ${h} 小时` : '当地短途',
          stay: idx === customDays.length - 1 ? `终点 ${d.stay}` : `住 ${d.stay}`,
          charge: chargeHint ? `途经枢纽：${chargeHint}` : (customCfg.defaultDayCharge || ''),
          risk: customCfg.defaultDayRisk || '提前确认路况与离线地图'
        });
        dayEstimates.push({ miles: m, hours: h });
        legs.push([origin, d.stay, `约 ${h} 小时`, `约 ${m} ${distUnit} · Day ${idx + 1}`, gPath(visits)]);
      });

      routeLegs.custom = legs;
      routePaths.custom = path;
      routeStops.custom = [...active];
      const dropped = attractionPlaces.filter(n => !active.has(n));
      planMap.custom = {
        id: 'custom',
        name: '自定义路线',
        ready: true,
        eyebrow: `04 / 每日安排 · 自定义 · ${customDays.length} 天`,
        titleHtml: '自定义路线，<br><em>地图与里程已更新。</em>',
        miles: `约 ${Math.round(totalM)} ${distUnit}`,
        hours: `约 ${numLbl(totalH)} 小时纯交通`,
        warning: `最长的一天纯交通约 ${numLbl(maxH)} 小时。${customCfg.customWarningSuffix || ''}`,
        days,
        dropped: dropped.length ? dropped : ['已选全部景点'],
        droppedNote: '想恢复点上方导入按钮就行。'
      };
      return { dayEstimates };
    }

    function renderCustomEditor() {
      const est = buildCustomPlan().dayEstimates;
      const startSel = document.getElementById('custom-start');
      startSel.value = customStart;
      document.getElementById('custom-total-summary').textContent =
        `${customDays.length} 天 · ${planMap.custom.miles} · ${planMap.custom.hours}`;
      document.getElementById('custom-day-list').innerHTML = customDays.length ? customDays.map((d, i) => {
        const origin = i ? customDays[i - 1].stay : customStart;
        const last = i === customDays.length - 1;
        const staySel = last
          ? `<select class="custom-stay" data-day="${i}">${endPlaces.map(n => `<option value="${esc(n)}" ${n === d.stay ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>`
          : `<select class="custom-stay" data-day="${i}"><option value="">选住宿地</option>${lodgingPlaces.map(n => `<option value="${esc(n)}" ${n === d.stay ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>`;
        const stopOpts = `<option value="">选停靠点</option><optgroup label="景点">${attractionPlaces.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}</optgroup><optgroup label="枢纽与补给">${transitPlaces.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}</optgroup>`;
        const chips = d.stops.length
          ? d.stops.map((n, si) => `<div class="custom-stop-chip"><span>${si + 1}. ${esc(n)}</span><button type="button" data-action="up" data-day="${i}" data-stop="${si}" ${si === 0 ? 'disabled' : ''}>↑</button><button type="button" data-action="down" data-day="${i}" data-stop="${si}" ${si === d.stops.length - 1 ? 'disabled' : ''}>↓</button><button type="button" data-action="remove" data-day="${i}" data-stop="${si}">×</button></div>`).join('')
          : '<small class="custom-empty">这天还没加额外停靠点</small>';
        return `<article class="custom-day"><div class="custom-day-top"><div><b>Day ${i + 1}</b></div><strong>${est[i] ? `约 ${est[i].miles} ${distUnit} · ${est[i].hours} 小时` : '待算'}</strong></div><p class="custom-day-origin">从 ${esc(origin || '待选')} 出发</p><div class="custom-stop-list">${chips}</div><div class="custom-day-fields"><label>加停靠点<select class="custom-stop-select" data-day="${i}">${stopOpts}</select></label><button type="button" data-action="add-stop" data-day="${i}">添加 ↗</button><label>${last ? '终点' : '当晚住'}${staySel}</label></div></article>`;
      }).join('') : '<div class="custom-blank">还没安排天数，点上方导入按钮就能直接改。</div>';
      document.getElementById('custom-add-day').disabled = customDays.length >= 10;
      document.getElementById('custom-remove-day').disabled = customDays.length === 0;
    }

    function refreshCustom() {
      renderCustomEditor();
      showPlan('custom');
    }

    const startSelect = document.getElementById('custom-start');
    startSelect.innerHTML += startPlaces.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('');

    document.getElementById('custom-trigger').addEventListener('click', () => {
      if (!customDays) loadCustomTemplate(defaultPlanKey);
      refreshCustom();
    });
    document.getElementById('custom-clear').addEventListener('click', () => {
      customStart = '';
      customDays = [];
      refreshCustom();
    });
    document.querySelectorAll('[data-import]').forEach(b => {
      b.addEventListener('click', () => {
        loadCustomTemplate(b.dataset.import);
        refreshCustom();
      });
    });
    startSelect.addEventListener('change', e => {
      customStart = e.target.value;
      refreshCustom();
    });
    document.getElementById('custom-add-day').addEventListener('click', () => {
      if (customDays.length >= 10) return;
      if (!customDays.length) customDays.push({ stay: endPlaces[0] || '', stops: [] });
      else customDays.splice(-1, 0, { stay: '', stops: [] });
      refreshCustom();
    });
    document.getElementById('custom-remove-day').addEventListener('click', () => {
      if (!customDays.length) return;
      if (customDays.length === 1) customDays.pop();
      else customDays.splice(-2, 1);
      refreshCustom();
    });
    document.getElementById('custom-day-list').addEventListener('change', e => {
      if (e.target.matches('.custom-stay')) {
        customDays[Number(e.target.dataset.day)].stay = e.target.value;
        refreshCustom();
      }
    });
    document.getElementById('custom-day-list').addEventListener('click', e => {
      const b = e.target.closest('button[data-action]');
      if (!b) return;
      const di = Number(b.dataset.day);
      const si = Number(b.dataset.stop);
      const stops = customDays[di].stops;
      if (b.dataset.action === 'add-stop') {
        const v = b.closest('.custom-day-fields').querySelector('.custom-stop-select').value;
        if (v && !stops.includes(v)) stops.push(v);
      } else if (b.dataset.action === 'remove') {
        stops.splice(si, 1);
      } else if (b.dataset.action === 'up' && si > 0) {
        [stops[si - 1], stops[si]] = [stops[si], stops[si - 1]];
      } else if (b.dataset.action === 'down' && si < stops.length - 1) {
        [stops[si + 1], stops[si]] = [stops[si], stops[si + 1]];
      }
      refreshCustom();
    });
  }

  /* -----------------------------------------------------------------------
     Desktop Interactive Checklist
     ----------------------------------------------------------------------- */
  function syncDesktopChecklistUI() {
    const st = getStore(CHECK_KEY);
    document.querySelectorAll('.verify-item').forEach(el => {
      el.classList.toggle('is-done', Boolean(st[el.dataset.check]));
    });
  }

  document.querySelectorAll('.verify-item').forEach(el => {
    const toggle = () => {
      const st = getStore(CHECK_KEY);
      const id = el.dataset.check;
      st[id] = !st[id];
      setStore(CHECK_KEY, st);
      syncDesktopChecklistUI();
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
  syncDesktopChecklistUI();

  // Initialize Leaflet & Default Plan
  initLeafletMap();
  showPlan(defaultPlanKey);

  /* -----------------------------------------------------------------------
     iPhone / Mobile Chrome Pocket Mode
     ----------------------------------------------------------------------- */
  const mobileApp = document.getElementById('mobile-app');
  const modeToggle = document.getElementById('mode-toggle');
  const tabbar = document.getElementById('mobile-tabbar');
  const toastEl = document.getElementById('mobile-toast');

  const planLabels = rawPlans.map(p => [p.id, p.shortLabel || p.cardTitle || p.name]);
  const regions = mobileCfg.regions || [{ id: 'all', label: `全部 ${stopsList.length} 站` }];
  const vaultItems = mobileCfg.vaultItems || [];
  const progressSteps = mobileCfg.progressSteps || [];
  const stepActionRules = mobileCfg.stepActionRules || [];
  const checkItems = checklist.items || [];

  let currentPlan = defaultPlanKey;
  let currentTab = 'plan';
  let currentDayIdx = 0;
  let stopRegion = regions[0]?.id || 'all';
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2100);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); showToast(`已复制：${text}`); } catch { showToast('请长按手动复制'); }
    ta.remove();
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(`已复制：${text}`))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function detectInitialDay(days) {
    const now = new Date();
    const mmdd = `${now.getMonth() + 1}.${String(now.getDate()).padStart(2, '0')}`;
    const idx = days.findIndex(d => d.date === mmdd);
    return idx >= 0 ? idx : 0;
  }

  function stepActionsHtml(stepText) {
    for (const rule of stepActionRules) {
      if (stepText.includes(rule.match)) {
        const btns = [];
        if (rule.copy) {
          btns.push(`<button type="button" class="m-chip m-chip-copy" data-copy="${esc(rule.copy)}">${esc(rule.copyLabel || '复制')}</button>`);
        }
        if (rule.nav) {
          btns.push(`<a class="m-chip" href="${gMapsUrl(rule.nav)}" target="_blank" rel="noopener">Google 导航 ↗</a>`);
          btns.push(`<a class="m-chip m-chip-apple" href="${aMapsUrl(rule.nav)}" target="_blank" rel="noopener">Apple 导航 ↗</a>`);
        }
        return `<div class="m-step-actions">${btns.join('')}</div>`;
      }
    }
    return '';
  }

  function renderPlanPills() {
    if (planLabels.length <= 1) return '';
    return `<div class="m-plan-strip" role="group" aria-label="切换行程视角">${planLabels.map(([k, label]) =>
      `<button type="button" class="m-pill ${currentPlan === k ? 'is-active' : ''}" data-m-plan="${esc(k)}">${esc(label)}</button>`
    ).join('')}</div>`;
  }

  function renderMobilePlan() {
    const plan = planMap[currentPlan] || planMap[defaultPlanKey];
    const days = plan?.days || [];
    if (currentDayIdx >= days.length) currentDayIdx = 0;
    const d = days[currentDayIdx];
    if (!d) return `${renderPlanPills()}<p class="m-empty">当前自定义路线还没填完，切回完整版补充起点和住宿。</p>`;

    const dayTabs = days.map((day, idx) => {
      const shortW = (day.weekday || '').split('·')[0].trim();
      return `<button type="button" class="m-day-pill ${idx === currentDayIdx ? 'is-active' : ''}" data-m-day="${idx}"><b>${esc(day.date)}</b><span>${esc(shortW || `Day ${idx + 1}`)}</span></button>`;
    }).join('');

    const stepsHtml = (d.steps || []).map(([time, desc, hi]) => `
      <div class="m-step ${hi ? 'is-highlight' : ''}">
        <div class="m-step-time">${esc(time)}</div>
        <div class="m-step-body">
          <p>${desc}</p>
          ${stepActionsHtml(desc)}
        </div>
      </div>
    `).join('');

    const prevBtn = currentDayIdx > 0
      ? `<button type="button" class="m-nav-day" data-m-day="${currentDayIdx - 1}">← 上一天 (${esc(days[currentDayIdx - 1].date)})</button>`
      : '<span></span>';
    const nextBtn = currentDayIdx < days.length - 1
      ? `<button type="button" class="m-nav-day" data-m-day="${currentDayIdx + 1}">下一天 (${esc(days[currentDayIdx + 1].date)}) →</button>`
      : '<span></span>';

    return `
      ${renderPlanPills()}
      <div class="m-day-strip" role="tablist" aria-label="选择日期">${dayTabs}</div>
      <section class="m-day-card">
        <div class="m-day-head">
          <span class="m-day-meta">${esc(d.date)} · ${esc(d.weekday || '')}</span>
          <h2>${esc(d.title)}</h2>
          <p>${d.body || ''}</p>
        </div>
        <div class="m-meta-grid">
          <div><span>路程</span><b>${esc(d.drive || '')}</b></div>
          <div><span>住宿</span><b>${esc(d.stay || '')}</b></div>
        </div>
        ${d.charge ? `<div class="m-charge-bar">⚡ ${esc(d.charge)}</div>` : ''}
        <div class="m-steps">${stepsHtml}</div>
        ${d.risk ? `<div class="m-risk-box"><b>留意：</b>${esc(d.risk)}</div>` : ''}
        <div class="m-day-pager">${prevBtn}${nextBtn}</div>
      </section>
    `;
  }

  function renderMobileStops() {
    const filtered = stopsList
      .map((s, idx) => ({ s, idx }))
      .filter(({ s }) => stopRegion === 'all' || s.region === stopRegion);

    return `
      ${regions.length > 1 ? `
        <div class="m-plan-strip" role="group" aria-label="按区域筛选">
          ${regions.map(r => `<button type="button" class="m-pill ${stopRegion === r.id ? 'is-active' : ''}" data-m-region="${esc(r.id)}">${esc(r.label)}</button>`).join('')}
        </div>
      ` : ''}
      <div class="m-stops-list">
        ${filtered.map(({ s, idx }) => {
          const query = s.mapQuery || s.name;
          return `
            <article class="m-stop-card" data-m-stop="${idx}" data-m-view="photo">
              <div class="m-stop-top">
                <span>${String(idx + 1).padStart(2, '0')} · ${esc(s.kicker || '')}</span>
                <h3>${esc(s.name)}</h3>
              </div>
              <div class="m-stop-media">
                <img src="${esc(s.photo)}" alt="${esc(s.caption || s.name)}" loading="lazy">
                <div class="m-stop-brief" hidden>
                  <ul>${(s.brief || []).map(([k, v]) => `<li><b>${esc(k)}：</b>${esc(v)}</li>`).join('')}</ul>
                </div>
              </div>
              <p class="m-stop-desc">${esc(s.desc || '')}</p>
              <div class="m-stop-tags">
                <span>${esc(s.duration || '')}</span>
                <span>${esc(s.weather || '')}</span>
              </div>
              <div class="m-stop-actions">
                <button type="button" class="m-chip m-chip-toggle" data-m-flip="${idx}">看现场要点</button>
                <a class="m-chip" href="${gMapsUrl(query)}" target="_blank" rel="noopener">Google ↗</a>
                <a class="m-chip m-chip-apple" href="${aMapsUrl(query)}" target="_blank" rel="noopener">Apple ↗</a>
                ${s.copyAddress ? `<button type="button" class="m-chip m-chip-copy" data-copy="${esc(s.copyAddress)}">复制地址</button>` : ''}
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderMobileVault() {
    const checkState = getStore(CHECK_KEY);
    const progState = getStore(PROGRESS_KEY);
    const offlineTip = mobileCfg.offlineTip;

    return `
      ${vaultItems.length ? `
        <div class="m-vault-section">
          <div class="m-section-head">
            <h2>${esc(mobileCfg.vaultTitle || '凭证与关键地址')}</h2>
            <span>${esc(mobileCfg.vaultHint || '点一下就能复制')}</span>
          </div>
          <div class="m-vault-list">
            ${vaultItems.map(item => `
              <div class="m-vault-card">
                <div class="m-vault-info">
                  <span class="m-vault-label">${esc(item.label)}</span>
                  <strong>${esc(item.value)}</strong>
                  <small>${esc(item.sub || '')}</small>
                </div>
                <div class="m-vault-btns">
                  <button type="button" class="m-chip m-chip-copy" data-copy="${esc(item.copyAlt || item.value)}">复制</button>
                  ${item.navQuery ? `<a class="m-chip" href="${gMapsUrl(item.navQuery)}" target="_blank" rel="noopener">Google ↗</a><a class="m-chip m-chip-apple" href="${aMapsUrl(item.navQuery)}" target="_blank" rel="noopener">Apple ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${progressSteps.length ? `
        <div class="m-vault-section">
          <div class="m-section-head">
            <h2>${esc(mobileCfg.progressTitle || '沿途关键节点进度')}</h2>
            <span>${esc(mobileCfg.progressHint || '完成点一下打钩')}</span>
          </div>
          <div class="m-check-list">
            ${progressSteps.map((c, i) => `
              <button type="button" class="m-check-row ${progState[c.id] ? 'is-done' : ''}" data-m-prog="${esc(c.id)}">
                <span class="m-check-box">${progState[c.id] ? '✓' : i + 1}</span>
                <div><b>${esc(c.name)}</b><small>${esc(c.target)}</small></div>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${checkItems.length ? `
        <div class="m-vault-section">
          <div class="m-section-head">
            <h2>${esc(mobileCfg.checklistTitle || `出发前 ${checkItems.length} 项检查`)}</h2>
            <span>${esc(mobileCfg.checklistHint || '与完整版同步')}</span>
          </div>
          <div class="m-check-list">
            ${checkItems.map(item => `
              <button type="button" class="m-check-row ${checkState[item.id] ? 'is-done' : ''}" data-m-check="${esc(item.id)}">
                <span class="m-check-box">${checkState[item.id] ? '✓' : ''}</span>
                <div><b>${esc(item.title)}</b><small>${esc(item.desc || '')}</small></div>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${offlineTip ? `
        <div class="m-vault-section m-offline-tip">
          <b>${esc(offlineTip.title || '离线提醒')}</b>
          <p>${esc(offlineTip.body || '')}</p>
          ${offlineTip.links && offlineTip.links.length ? `
            <div class="m-quick-links">
              ${offlineTip.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}
            </div>
          ` : ''}
        </div>
      ` : ''}

      <a class="m-portal-back" href="../../">← 返回所有行程列表</a>
    `;
  }

  function refreshVisibleMap() {
    if (!leafletMap) return;
    setTimeout(() => {
      leafletMap.invalidateSize();
      renderRoute(currentPlan);
    }, 80);
  }

  function renderMobileView() {
    const content = document.getElementById('mobile-content');
    const mapBar = document.getElementById('mobile-map-bar');
    if (!content) return;

    document.body.classList.toggle('m-tab-map', currentTab === 'map');
    if (mapBar) {
      mapBar.hidden = currentTab !== 'map';
      if (currentTab === 'map') mapBar.innerHTML = renderPlanPills();
    }

    if (currentTab === 'plan') {
      content.hidden = false;
      content.innerHTML = renderMobilePlan();
    } else if (currentTab === 'stops') {
      content.hidden = false;
      content.innerHTML = renderMobileStops();
    } else if (currentTab === 'vault') {
      content.hidden = false;
      content.innerHTML = renderMobileVault();
    } else {
      content.hidden = true;
      refreshVisibleMap();
    }

    tabbar.querySelectorAll('[data-m-tab]').forEach(btn => {
      const active = btn.dataset.mTab === currentTab;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function setMobileMode(enable, savePref) {
    document.body.classList.toggle('mobile-mode', enable);
    mobileApp.hidden = !enable;
    tabbar.hidden = !enable;
    modeToggle.textContent = enable ? '完整版' : '手机版';
    modeToggle.setAttribute('aria-pressed', String(enable));
    modeToggle.setAttribute('aria-label', enable ? '切换到完整网页版' : '切换到手机随身版');
    if (savePref) {
      try { localStorage.setItem(MODE_KEY, enable ? 'mobile' : 'desktop'); } catch {}
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (enable) {
      renderMobileView();
    } else {
      document.body.classList.remove('m-tab-map');
      syncDesktopChecklistUI();
      refreshVisibleMap();
    }
  }

  mobileApp.addEventListener('click', e => {
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) { copyText(copyBtn.dataset.copy); return; }

    const planBtn = e.target.closest('[data-m-plan]');
    if (planBtn) {
      currentPlan = planBtn.dataset.mPlan;
      currentDayIdx = 0;
      showPlan(currentPlan);
      renderMobileView();
      return;
    }

    const dayBtn = e.target.closest('[data-m-day]');
    if (dayBtn) {
      currentDayIdx = Number(dayBtn.dataset.mDay);
      renderMobileView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const regionBtn = e.target.closest('[data-m-region]');
    if (regionBtn) {
      stopRegion = regionBtn.dataset.mRegion;
      renderMobileView();
      return;
    }

    const flipBtn = e.target.closest('[data-m-flip]');
    if (flipBtn) {
      const card = flipBtn.closest('.m-stop-card');
      const img = card.querySelector('img');
      const brief = card.querySelector('.m-stop-brief');
      const showingPhoto = card.dataset.mView === 'photo';
      card.dataset.mView = showingPhoto ? 'brief' : 'photo';
      img.hidden = showingPhoto;
      brief.hidden = !showingPhoto;
      flipBtn.textContent = showingPhoto ? '看照片' : '看现场要点';
      return;
    }

    const progBtn = e.target.closest('[data-m-prog]');
    if (progBtn) {
      const id = progBtn.dataset.mProg;
      const st = getStore(PROGRESS_KEY);
      st[id] = !st[id];
      setStore(PROGRESS_KEY, st);
      renderMobileView();
      return;
    }

    const checkBtn = e.target.closest('[data-m-check]');
    if (checkBtn) {
      const id = checkBtn.dataset.mCheck;
      const st = getStore(CHECK_KEY);
      st[id] = !st[id];
      setStore(CHECK_KEY, st);
      syncDesktopChecklistUI();
      renderMobileView();
      return;
    }
  });

  tabbar.addEventListener('click', e => {
    const btn = e.target.closest('[data-m-tab]');
    if (!btn) return;
    currentTab = btn.dataset.mTab;
    renderMobileView();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });

  document.querySelectorAll('.plan-option').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPlan = btn.dataset.plan;
      currentDayIdx = 0;
    });
  });

  modeToggle.addEventListener('click', () => {
    const next = !document.body.classList.contains('mobile-mode');
    setMobileMode(next, true);
  });

  // Determine initial mode: ?mode=mobile|desktop overrides saved preference, otherwise <= 768px auto
  const urlMode = new URLSearchParams(location.search).get('mode');
  const savedMode = (() => { try { return localStorage.getItem(MODE_KEY); } catch { return null; } })();
  const initialMobile = urlMode === 'mobile'
    ? true
    : (urlMode === 'desktop' ? false : (savedMode ? savedMode === 'mobile' : window.innerWidth <= 768));

  currentDayIdx = detectInitialDay((planMap[currentPlan] || planMap[defaultPlanKey])?.days || []);
  setMobileMode(initialMobile, false);

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
