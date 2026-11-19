// Annotated starter template for a new trip inside cookiehankie/trip-plans.
// 1. Copy trips/_example/ to trips/<YYYY>-<short-name>/
// 2. Drop 3:2 JPEG photos (~960x640) into trips/<slug>/assets/
// 3. Replace all placeholder values below and run `node scripts/build.mjs`
// NOTE: This repo is public. Never put real booking confirmation codes, PNRs,
// emails, phone numbers, or credentials in data.js.

window.TRIP_DATA = {
  // Must match the folder name under trips/
  slug: '2027-example-trip',
  // Used by the portal to sort trips newest first (YYYY-MM-DD)
  sortDate: '2027-04-10',

  meta: {
    title: '示例行程｜城市与山海 4 日计划',
    shortTitle: '示例行程27',
    portalTitle: '2027 春季示例行程',
    description: '简短说明出行人数、核心路线和天数，会显示在首页卡片与浏览器元数据里。',
    dates: '2027.04.10 - 04.13',
    routeSummary: '起点城市 → 核心目的地 → 返程',
    coverImage: 'assets/cover.jpg',
    coverAlt: '封面照片描述',
    tags: ['4 天 3 晚', '2 人', '铁路 + 步行'],
    themeColor: '#122437',
    brandTitle: 'EXAMPLE TRIP',
    brandSubtitle: 'SPRING',
    brandYear: '2027',
    ctaLabel: '看每日安排',
    navLabels: {
      climate: '天气与准备',
      places: '沿途停靠',
      compare: '切换视角',
      map: '路线地图',
      plan: '每日安排',
      verify: '行前检查',
    }
  },

  hero: {
    eyebrow: '2027 SPRING TRIP',
    tag: '★ 2 人 · 4 日计划',
    titleHtml: '四月出发，<br><em>慢慢走完这条线。</em>',
    intro: '用两三句大白话说明大家怎么汇合、走哪条线、重点玩什么。',
    pills: ['04.10 - 04.13', '2 人', '起点 → 终点'],
    ctaLabel: '切换查看视角',
    bottomLabel: '2027 春季出行计划',
    scrollLabel: '向下滚动查看',
    artCaption: '35°00′ N / EXAMPLE DESTINATION',
    // Built-in presets: 'desert' | 'mountain' | 'coast' (or provide custom artSvg)
    artPreset: 'mountain'
  },

  climate: {
    eyebrow: '00 / 天气与准备',
    titleHtml: '白天温和，<br><em>早晚注意保暖。</em>',
    paragraphs: [
      '第一段写季节气温、穿衣和光线重点。',
      '第二段写交通、网络、预约或补能的关键提醒。'
    ],
    cards: [
      { icon: '☀', num: '01 / 区域一', title: 'City Center', body: '简短描述该区域天气与节奏。', chip: '15-20°C / 步行' },
      { icon: '✦', num: '02 / 区域二', title: 'Highland', body: '简短描述山区或海边体感与风力。', chip: '早晚偏凉' },
      { icon: '▲', num: '03 / 交通衔接', title: 'Transit & Hub', body: '简短描述跨城车次、停车或补能重点。', chip: '提前预约' }
    ],
    notice: {
      label: '行前提醒',
      html: '把最容易忘的一件关键装备或预约写在这里。'
    }
  },

  places: {
    eyebrow: '01 / 沿途停靠点',
    titleHtml: '全程核心停靠点<span class="period">.</span>',
    intro: '按时间顺序列出停靠点。点卡片左右箭头可在照片与现场要点之间切换。',
    stops: [
      {
        name: '示例停靠点 · Example Stop',
        kicker: '04.10 · 09:00-11:30',
        region: 'city',
        desc: '一句话说明为什么来这里以及怎么衔接下一站。',
        rating: '★★★★★',
        duration: '09:00-11:30 (2.5h)',
        weather: '晴朗 18°C',
        photo: 'assets/cover.jpg',
        caption: '照片底部说明',
        mapQuery: 'Example Stop, City',
        copyAddress: '123 Example St, City',
        brief: [
          ['交通与停车', '写清楚地铁口、停车场地址或接驳方式。'],
          ['时间建议', '写清楚开门时间、最佳光线或排队情况。'],
          ['餐饮补给', '顺路吃饭或买水的地方。']
        ],
        footLeft: 'Day 1 · 上午',
        footRight: '提前 15 分钟到'
      }
    ],
    transitNote: {
      label: '怎么汇合与住宿',
      html: '说明航班、车次和每晚酒店信息。'
    },
    highlightCard: {
      photo: 'assets/cover.jpg',
      alt: '重点补给或亮点图片',
      kicker: '补给与节奏',
      title: '把关键补给、交通或预约节奏讲清楚',
      body: '用一段话串联整趟行程最重要的后勤安排。',
      small: '补充一句容易遗漏的小动作。'
    },
    bookingArchiveTitle: '展开看航班、酒店与预约确认号速查表',
    bookingArchiveDesc: '所有确认号和关键时间收在一张表里。',
    bookingColumns: ['时间与项目', '具体安排', '确认号 / 备注'],
    bookingReference: [
      ['04.10 酒店', '示例酒店名称与房型', '确认号 EXAMPLE-001']
    ]
  },

  compare: {
    eyebrow: '02 / 切换视角',
    titleHtml: '同一份行程，<br><em>按角色或节奏切换。</em>',
    intro: '可以放 1 到 4 个视角（如完整主计划、不同出发地成员、单日细化）。',
    defaultPlan: 'v1',
    summaryNote: '不含吃饭、拍照和排队时间',
    warningLabel: '最容易出岔子的事',
    considerationsEyebrow: '关键提醒',
    considerationsTitle: '路上盯紧这几件事',
    droppedEyebrow: '主动避开的坑',
    droppedTitle: '不把时间浪费在排队和折返上。',
    plans: [
      {
        id: 'v1',
        shortLabel: '完整主计划',
        name: '4 日完整主计划',
        cardKicker: '默认视图 / 完整行程',
        cardTitle: '4 日完整主计划',
        cardLines: [
          '04.10 出发 · 04.13 返程',
          '<b>主要内容</b> 城市漫步 + 周边一日环线',
          '<b>节奏原则</b> 上午早出门避开人流'
        ],
        cardAction: '当前选中 ↗',
        eyebrow: '04 / 每日安排 · 4 天 3 晚',
        titleHtml: '04.10 出发，<br><em>04.13 轻松返程。</em>',
        miles: '全程约 180 公里',
        hours: '纯交通约 4 小时',
        warning: '这里写整趟最需要注意的一两件风险点。',
        days: [
          {
            date: '4.10',
            weekday: '周六 · 第 1 天',
            title: '抵达与市区初探',
            body: '一句话概括当天节奏，不要和下方 steps 逐条重复。',
            steps: [
              ['14:00 - 15:00', '抵达机场并入住酒店。', true],
              ['16:30 - 19:00', '逛周边街区并吃晚饭。']
            ],
            drive: '机场快线 45 分钟',
            stay: '住市中心酒店 · 第 1 晚',
            charge: '提前领好交通卡',
            risk: '留出入境与取行李时间'
          }
        ],
        dropped: ['高峰期跨城换乘', '绕远路打卡'],
        droppedNote: '按实际动线精简掉性价比低的点。',
        considerations: [
          ['确认号备查', '把酒店与餐厅确认号存到手机凭证页。'],
          ['离线资料', '进山区前用手机打开一次本页完成离线缓存。']
        ]
      }
    ]
  },

  map: {
    eyebrow: '03 / 路线地图',
    titleHtml: '看清每一站位置，<br><em>直接一键导航。</em>',
    intro: '支持拖拽缩放，点圆点查看备忘，下方卡片直接打开 Google Maps 分段路线。',
    ariaLabel: '行程路线地图',
    stopLegendLabel: '当前停留 / 观景点',
    hubLegendLabel: '交通枢纽 / 补能站',
    otherLegendLabel: '其他节点',
    overlayHint: '可拖拽平移或缩放；点圆点看备忘。',
    routeNote: '点下方链接可在 Google Maps 中分段加载导航。',
    fullRouteLabel: '在 Google Maps 打开整条路线 ↗',
    coordinates: {
      'Airport Hub': [35.0, 135.7],
      'Example Stop': [35.02, 135.76]
    },
    hubNodes: ['Airport Hub'],
    shortNames: {
      'Airport Hub': '机场枢纽',
      'Example Stop': '示例停靠点'
    },
    popupNotes: {
      'Airport Hub': '抵达与返程枢纽',
      'Example Stop': 'Day 1 核心停靠点'
    },
    routeLegs: {
      v1: [
        ['Airport Hub', 'Example Stop', '约 45 分钟', 'Day 1 抵达市区', 'Kyoto+Station/Kiyomizu-dera']
      ]
    },
    routePaths: {
      v1: ['Airport Hub', 'Example Stop']
    },
    routeStops: {
      v1: ['Airport Hub', 'Example Stop']
    }
  },

  customBuilder: {
    enabled: false
  },

  checklist: {
    eyebrow: '05 / 出发前检查清单',
    titleHtml: '临出发前，<em>逐项打钩。</em>',
    sub: '点一下卡片就能勾选，状态会自动留在当前浏览器里。',
    items: [
      { id: 'docs', title: '证件与预约号', desc: '确认护照、机票与酒店确认号已截屏。', html: '确认护照、机票与酒店确认号已截屏保存。' }
    ],
    sourceBarLabel: '行前实用链接',
    sources: [
      { label: '官方天气预报 ↗', url: 'https://www.weather.gov/' }
    ]
  },

  mobile: {
    regions: [
      { id: 'all', label: '全部停靠' },
      { id: 'city', label: '市区' }
    ],
    vaultTitle: '凭证与关键地址',
    vaultHint: '点一下就能复制',
    vaultItems: [
      { label: '酒店确认号', value: 'EXAMPLE-001', sub: '04.10 - 04.13 · 市中心', navQuery: 'Example Hotel, City' }
    ],
    progressTitle: '沿途关键节点',
    progressHint: '完成点一下打钩',
    progressSteps: [
      { id: 'p1', name: '机场汇合', target: '04.10 14:00 抵达航站楼' }
    ],
    checklistTitle: '出发前检查',
    checklistHint: '与完整版同步',
    stepActionRules: [
      { match: '酒店', copy: '123 Example St, City', copyLabel: '复制酒店地址', nav: 'Example Hotel, City' }
    ],
    offlineTip: {
      title: '离线查看提示',
      body: '出发前用手机打开一次本页或添加到主屏幕，没网时也能照常看时间表和确认号。',
      links: []
    }
  },

  footer: {
    brand: 'EXAMPLE TRIP',
    tagline: '2027 春季示例行程。',
    defaultRouteHtml: '起点 → 目的地 → 返程<br>2027.04.10 - 04.13',
    topLabel: '回到顶部 ↑'
  }
};
