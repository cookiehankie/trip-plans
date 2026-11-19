// 2026 Thanksgiving LA & Death Valley Cybertruck Road Trip
const MAIN_DAYS = [
  {
    date: '11.26',
    weekday: '周四 · 感恩节 · 第 1 天',
    title: '抵港汇合与休整 · LAX → Hyatt Regency LAX',
    body: '这天只做两件事：三个人在机场碰头，住进套房早睡倒时差，不在城里折腾。',
    steps: [
      ['白天 · 湾区南下', '我从 San Jose 开 Cybertruck 走 I-5 S 到洛杉矶（约 345 英里，中途 Kettleman City / Tejon 超充），赶在傍晚前到机场。'],
      ['傍晚 · LAX 汇合', '<b>DL0738</b> 落地 LAX，两位纽约朋友拿完行李，在航站楼外直接上车。', true],
      ['18:30 · 泊车慢充', '到 <b>Hyatt Regency LAX</b>，把车交给 Valet 停放并插上 Level 2 慢充桩（用自带的 J1772 转接头）。'],
      ['19:00 · 入住早睡', '入住 <b>Regency Suite King</b> 套房（主卧 King 大床 + 客厅折叠床），早点睡准备第二天早起。', true],
    ],
    drive: 'LA 段约 2 英里 · San Jose 南下约 345 英里',
    stay: '住 Hyatt Regency LAX · 第 1 晚',
    charge: 'Valet Level 2 慢充过夜',
    risk: '感恩节傍晚机场环道车多，提前约好航站楼柱号方便接人'
  },
  {
    date: '11.27',
    weekday: '周五 · 黑五 · 第 2 天',
    title: 'GTA 5 巡礼、海边落日、割烹晚饭与进谷采买',
    body: '趁黑五清晨空路看完天文台日出，回酒店吃早饭补觉避开上午堵车；下午走滨海平路逛完威尼斯和圣莫尼卡，晚上吃割烹顺手买齐进谷物资。',
    steps: [
      ['05:45 - 07:20', '开车上<b>格里菲斯天文台</b>（GTA 5 伽利略天文台原型），看洛杉矶盆地日出。', true],
      ['07:30 - 09:30', '回酒店在 <b>unity la</b> 吃环球客免费全自助热食早餐。'],
      ['09:30 - 12:30', '回套房补觉 3 小时，跳过黑五上午最堵的时段。'],
      ['12:35 - 13:00', '沿 <b>Pershing Dr</b> 滨海北上（绕开 I-405），停 Venice Beach Parking Lot（2100 Ocean Front Walk 露天大车场）。'],
      ['13:10 - 14:15', '逛 Abbot Kinney Blvd，在 <b>Gjusta</b> 阳光后院吃烘焙轻食咖啡（或者去 Erewhon 热餐台）。'],
      ['14:15 - 15:30', '逛<b>威尼斯运河历史街区</b>（GTA 5 威斯普奇运河原型），走木栈桥看水岸房子。'],
      ['15:45 - 16:00', '走平路开 8 分钟到圣莫尼卡海滩南侧平地车场（<b>Beach Parking Lot 4 South, 2030 Ocean Ave</b>），避开市区商圈堵点。'],
      ['16:45 - 17:15', '到海滩开阔处看 <b>16:45 太平洋落日</b>。', true],
      ['17:15 - 18:30', '走木栈道去<b>圣莫尼卡码头</b>（GTA 5 佩罗码头），在引桥连接处俯拍麦克卢尔隧道冲进加州 1 号公路的红光弯道和黄土悬崖。', true],
      ['19:05 - 19:25', '取车走平路去 Sawtelle，停 <b>Mississippi Ave 露天车场</b>。'],
      ['19:45 - 21:45', '在 <b>KOJIMA</b> 吃米其林一星板前割烹（确认号见个人 Tock App / 邮件）。', true],
      ['21:45 - 22:30', '下 1 楼 <b>Nijiya Market</b> 买 2 大箱矿泉水（48 瓶）、宝矿力水特和高热量干粮，锁进 Cybertruck 封闭后斗。'],
      ['22:45', '回 Hyatt Regency LAX，把车交 Valet 慢充，回房休息。'],
    ],
    drive: '城区累计约 62 英里 · 以平路为主',
    stay: '住 Hyatt Regency LAX · 第 2 晚',
    charge: 'Valet Level 2 慢充至满电',
    risk: '天文台清晨和海边落日后风凉；19:05 准时从圣莫尼卡走，别耽误 KOJIMA 入座'
  },
  {
    date: '11.28',
    weekday: '周六 · 第 3 天',
    title: '西线进死亡谷 · CA-14 / US-395 → 扎布里斯基角落日',
    body: '周六走西线绕开 I-15 堵车，在 Coso Junction 充够电吃午饭，白天翻过 Towne Pass 进谷，赶在 16:38 前到观景台看日落。',
    steps: [
      ['07:30 - 08:30', '在 unity la 吃早餐，用凯悦 App 退房。'],
      ['08:45 - 09:00', '提满电 Cybertruck，走 <b>CA-14 N / US-395 N</b> 出城（绕开 I-15 堵点）。'],
      ['11:45 - 12:45', '到 <b>Coso Junction 特斯拉超充</b>充到 <b>90%-95%</b>，顺便就地吃午饭。', true],
      ['12:45 - 15:15', '转上 <b>CA-190 E</b>，白天翻 <b>Towne Pass（海拔 4,956 英尺陡坡山路）</b>进谷。', true],
      ['15:15 - 15:45', '到 <b>The Ranch at Death Valley</b> 办 Cottage 入住，把车接上园区 Level 2 慢充桩。'],
      ['16:00 - 17:00', '开 8 分钟去<b>扎布里斯基角（Zabriskie Point）</b>看 <b>16:38 日落</b>，泥岩丘陵会染成金黄色。', true],
      ['17:30', '回绿洲，在 <b>The Last Kind Words Saloon</b> 吃美式牛排晚饭。'],
    ],
    drive: '约 279 英里 · 纯驾驶约 5 小时（另含超充午饭 1h）',
    stay: '住 The Ranch at Death Valley · 第 1 晚',
    charge: 'Coso Junction 超充 90-95% + 园区 L2',
    risk: '过 Lone Pine 后谷里几乎没手机信号，离线地图和公园年卡务必提前准备好'
  },
  {
    date: '11.29',
    weekday: '周日 · 第 4 天',
    title: '谷内看地貌与银河 · 恶水盆地、艺术家大道与沙丘',
    body: '这天不赶长途，上午和中午把南线盐滩和彩色岩壁走完并就地野餐，下午去沙丘看日落，晚上抬头看银河。',
    steps: [
      ['08:30 - 11:30', '去<b>恶水盆地（Badwater Basin，海拔 -86 米）</b>，走上六边形盐结晶硬壳。', true],
      ['11:30 - 13:30', "开单向<b>艺术家大道（Artist's Drive）</b>看多彩岩壁（<b>Artist's Palette</b>），直接拿出后斗里的水粮野餐。", true],
      ['15:30 - 17:00', '去<b>梅斯基特平沙丘（Mesquite Flat Sand Dunes）</b>拍日落斜光下的沙脊线。', true],
      ['晚间 · 观星', '炉溪绿洲吃晚饭，天黑后在暗夜保护区看银河。'],
      ['睡前操作', '把车接上园区慢充桩，在特斯拉 App 里把充电限额改成 <b>100% 满电</b>。', true],
    ],
    drive: '谷内约 92 英里 · 纯驾驶约 2.2 小时',
    stay: '住 The Ranch at Death Valley · 第 2 晚',
    charge: '睡前园区 Level 2 限额调成 100%',
    risk: '谷里没信号；太阳落山后掉温快，看星空多穿一层防风衣服'
  },
  {
    date: '11.30',
    weekday: '周一 · 第 5 天',
    title: '登丹特观景台、走东南环线回 LA 与红眼航班',
    body: '上午满电上山顺光看盐滩全貌，随后一路下坡回电走 CA-127 S 去 Baker 补电，周一走 I-15 S 回 LA 吃告别晚饭再送机。',
    steps: [
      ['08:00 - 08:45', 'The Ranch 吃早饭退房，拔下满电的 Cybertruck。'],
      ['08:45 - 09:25', '沿 CA-190 E 爬坡进黑山山脉（约 25 英里）。'],
      ['09:25 - 10:20', "登顶<b>丹特观景台（Dante's View）</b>，上午顺光俯瞰 5,500 英尺下的恶水雪白盐滩（山顶强风 5°C-8°C）。", true],
      ['10:20 - 12:20', '长下坡动能回收回电，沿 CA-190 E 接 CA-127 S 开 114 英里到贝克，闭合环线不走回头路。'],
      ['12:20 - 13:30', '到<b>贝克（Baker）</b>，接入 <b>Baker Supercharger</b> 充到 <b>85%-90%</b>，吃午饭顺便打卡世界最高温度计。', true],
      ['13:30 - 16:45', '走 <b>I-15 S</b>（周一工作日车少顺畅）回洛杉矶（约 190 英里，约 3 小时 15 分钟）。'],
      ['17:00 - 19:30', '西区卸行李、交接东西、三个人吃告别晚饭。'],
      ['20:00', '到 LAX 办托运，两位纽约朋友进<b>达美休息室洗澡歇脚</b>。'],
      ['22:00+', '坐 <b>DL0676（Delta Premium Select）</b>红眼直飞回纽约 JFK。', true],
    ],
    drive: '约 329 英里 · 纯驾驶约 5.9 小时（不含超充和午饭）',
    stay: 'DL0676 飞纽约 JFK / 车主返湾区',
    charge: '100% 出发 → 下坡回电 → Baker 超充 85-90%',
    risk: "Dante's View 山顶很冷；13:30 准时离开 Baker，给进城留余量确保 20:00 到机场"
  }
];

const SJ_DRIVER_DAYS = [
  {
    ...MAIN_DAYS[0],
    title: 'San Jose → LAX 接机 · 白天南下汇合',
    body: '从湾区开去洛杉矶大约 345 英里，上午出发中途充一次电，赶在傍晚前到 LAX 接两位纽约朋友。',
    steps: [
      ['10:30 - 13:15', '从 <b>San Jose</b> 满电出发，走 US-101 / CA-152 转 <b>I-5 S</b> 南下（约 175 英里）。', true],
      ['13:15 - 13:55', '在 <b>Kettleman City Supercharger</b> 充到 85%-90%，顺便吃午饭喝杯咖啡。'],
      ['13:55 - 17:30', '继续沿 I-5 S 过 Grapevine 进洛杉矶，盯住 <b>DL0738</b> 落地时间到航站楼外接人。'],
      ['18:30 - 19:00', '到 <b>Hyatt Regency LAX</b> 交 Valet 插 Level 2 慢充，入住套房。', true],
    ],
    drive: '约 348 英里 · 纯驾驶约 5.5 小时（+1 次超充）',
    charge: 'Kettleman City SC → Hyatt Valet L2',
    risk: '感恩节当天中午 I-5 车流还好，还是留出 45 分钟余量防 Grapevine 和机场堵车'
  },
  MAIN_DAYS[1],
  MAIN_DAYS[2],
  MAIN_DAYS[3],
  {
    ...MAIN_DAYS[4],
    title: '死亡谷回 LA 送机 → 建议休整一晚再回 San Jose',
    body: '周一从死亡谷开回洛杉矶已经开了 329 英里，晚上 8 点送完机再连夜开 5 个半小时回湾区太累了，建议在 LA 睡一晚周二白天回。',
    steps: [
      ...MAIN_DAYS[4].steps.slice(0, 7),
      ['20:00 · 送机', '送两位朋友到 LAX 托运并进达美休息室，坐 22:00+ DL0676 回 JFK。'],
      ['返程建议', '当天已经开了 329 英里，<b>不建议晚上连夜开 I-5 回 San Jose</b>。在 LA 住一晚（或者先开 1.5 小时到 Bakersfield 住），周二白天经 Kettleman City 超充开回湾区更稳。', true],
    ],
    drive: '当日 329 英里 + 次日返 San Jose 345 英里',
    stay: '建议 LA 住一晚，次日回 San Jose',
    charge: 'Baker SC 85-90% → 次日 Kettleman SC 回湾区',
    risk: '避免送机后疲劳夜驾 I-5；如果周二上午有事，周一晚可先往北住到 Bakersfield'
  }
];

const NYC_FLIGHT_DAYS = [
  {
    date: '11.26',
    weekday: '周四 · 感恩节 · 纽约飞来',
    title: 'JFK ✈ LAX（DL0738）· 落地直接上车',
    body: '两位朋友不用在机场排队租车，落地提完行李直接坐上 San Jose 开过来的 Cybertruck，10 分钟到酒店倒时差。',
    steps: [
      ['傍晚 · 落地', '<b>DL0738</b> 落地 LAX，拿完行李到航站楼外与 San Jose 车主汇合。', true],
      ['18:30 - 19:00', '到 <b>Hyatt Regency LAX</b> 住 Regency Suite King（主卧大床 + 客厅折叠床），早点睡。'],
    ],
    drive: '落地零驾车 · 机场到酒店约 5 分钟',
    stay: '住 Hyatt Regency LAX · 第 1 晚',
    charge: '随身带一件防风外套',
    risk: '东岸 3 小时时差让第二天 05:45 早起反而轻松，晚上早点睡别熬夜'
  },
  MAIN_DAYS[1],
  MAIN_DAYS[2],
  MAIN_DAYS[3],
  {
    ...MAIN_DAYS[4],
    title: '丹特观景台、告别晚饭 → 休息室洗澡坐红眼回 JFK',
    body: '在沙漠里走两天身上都是沙尘，20:00 进达美休息室洗个澡再上 DL0676 红眼航班会舒服很多。',
    steps: [
      ['08:00 - 16:45', "登 Dante's View → Baker 吃午饭打卡最高温度计 → 走 I-15 S 回洛杉矶。"],
      ['17:00 - 19:30', '西区卸行李、三个人吃告别晚饭。'],
      ['20:00 · 洗澡休整', '到 LAX 办托运，进<b>达美休息室（Delta Sky Club）洗澡换衣服</b>。', true],
      ['22:00+ · 红眼直飞', '登机 <b>DL0676（Delta Premium Select）</b>直飞回纽约 JFK。', true],
    ],
    stay: 'DL0676 红眼直飞 JFK',
    charge: '换洗衣物提前放手提登机箱，方便进休息室淋浴',
    risk: '别把要换的衣服塞进托运行李里，留手提箱里才能在休息室洗完换上'
  }
];

const LA_DETAIL_DAYS = [
  {
    date: '11.27',
    weekday: '周五 · 黑五 · 上午',
    title: '05:45-12:30 · 天文台日出 + 早饭 + 回房补觉',
    body: '趁黑五上午大家还没出门先看完日出，回来吃免费早饭直接睡回笼觉，把最堵的上午跳过去。',
    steps: MAIN_DAYS[1].steps.slice(0, 3),
    drive: '往返约 44 英里 · 清晨不堵车',
    stay: 'Hyatt Regency LAX 补觉',
    charge: '回酒店期间继续 Valet 慢充',
    risk: '05:45 准时走才能赶在日出前到山顶'
  },
  {
    date: '11.27',
    weekday: '周五 · 黑五 · 下午',
    title: '12:35-16:00 · Pershing Dr → 威尼斯运河 → 圣莫尼卡南场',
    body: 'Cybertruck 车身宽，黑五尽量别钻市区多层地库。这半天走滨海平路，停的全是露天或平地大车场。',
    steps: MAIN_DAYS[1].steps.slice(3, 7),
    drive: '约 11 英里 · 避开 I-405',
    stay: '停车：2100 Ocean Front Walk → Lot 4 South',
    charge: '全程露天/平地车场',
    risk: '黑五圣莫尼卡商圈很堵，导航直接设 2030 Ocean Ave（Lot 4 South）'
  },
  {
    date: '11.27',
    weekday: '周五 · 黑五 · 傍晚与晚间',
    title: '16:45-22:45 · 落日 → 码头拍隧道 → KOJIMA 割烹 → Nijiya 采买',
    body: '看完 16:45 落日去码头引桥拍弯道车流，晚上去 Sawtelle 吃割烹，吃完下 1 楼把进谷的水和干粮一次买齐。',
    steps: MAIN_DAYS[1].steps.slice(7),
    drive: '约 15 英里 · 晚间回酒店顺畅',
    stay: '住 Hyatt Regency LAX · Valet 慢充',
    charge: 'Nijiya 48 瓶水 + 干粮锁进封闭后斗',
    risk: 'KOJIMA 19:45 入座（确认号见个人 Tock App），19:05 准时从圣莫尼卡出发'
  }
];

window.TRIP_DATA = {
  slug: '2026-thanksgiving-la-dv',
  sortDate: '2026-11-26',
  meta: {
    title: '感恩节，去死亡谷｜2026 洛杉矶与死亡谷自驾计划',
    shortTitle: 'LA·死亡谷26',
    portalTitle: '2026 感恩节：洛杉矶与死亡谷 Cybertruck 大环线',
    description: '2026 感恩节 3 人行程：2 位朋友从纽约飞 LAX（DL0738），我从 San Jose 开 Cybertruck 南下汇合，5 天走完洛杉矶 GTA 5 景点、KOJIMA 割烹与死亡谷大环线。',
    dates: '2026.11.26 - 11.30',
    routeSummary: 'San Jose / JFK → LAX → 洛杉矶西区 → US-395 → 死亡谷 → Baker → LAX',
    coverImage: 'assets/zabriskie-sunset.jpg',
    coverAlt: '扎布里斯基角日落照亮死亡谷泥岩丘陵',
    tags: ['5 天 4 晚', '3 人 Cybertruck', '洛杉矶 + 死亡谷', '含 iPhone 离线随身版'],
    themeColor: '#122437',
    brandTitle: 'LA & DEATH VALLEY',
    brandSubtitle: 'THANKSGIVING',
    brandYear: '2026',
    ctaLabel: '看每日安排',
    navLabels: {
      climate: '天气与充电',
      places: '沿途停靠',
      compare: '切换视角',
      map: '路线地图',
      plan: '每日安排',
      verify: '行前检查',
    }
  },

  hero: {
    eyebrow: '2026 THANKSGIVING ROAD TRIP',
    tag: '★ 3 人汇合 · Cybertruck 5 日计划',
    titleHtml: '感恩节，<br><em>开去死亡谷。</em>',
    intro: '11 月 26 日，两位朋友从纽约飞到 LAX（DL0738），我从加州 San Jose 开 Cybertruck 到洛杉矶接机。五天四晚，先在 LA 逛 GTA 5 景点和吃板前割烹，再去死亡谷走一圈大环线。',
    pills: ['11.26 - 11.30', '3 人 · Cybertruck', '纽约飞 LAX + San Jose 开车到 LA'],
    ctaLabel: '按角色切换视图',
    bottomLabel: '2026 感恩节自驾计划 · 洛杉矶与死亡谷',
    scrollLabel: '向下滚动查看',
    artCaption: '36°14′ N / ZABRISKIE POINT, DEATH VALLEY',
    artSvg: `<svg viewBox="0 0 640 570" preserveAspectRatio="xMidYMax slice">
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
      <g fill="#264354" opacity=".9">
        <rect x="64" y="394" width="68" height="16"/>
        <path d="M84 394 A14 14 0 0 1 112 394 Z"/>
        <path d="M68 394 A7 7 0 0 1 82 394 Z"/>
        <path d="M114 394 A7 7 0 0 1 128 394 Z"/>
      </g>
      <path d="M0 458 L112 426 L218 462 L348 398 L468 446 L580 412 L640 434 L640 570 L0 570 Z" fill="#1d394b"/>
      <path d="M0 510 Q180 448 358 492 T640 472 L640 570 L0 570 Z" fill="#122737"/>
      <g fill="#0e202e">
        <rect x="526" y="408" width="6" height="104"/>
        <path d="M529 412 C510 398 492 404 482 416 C498 412 512 412 529 418 Z"/>
        <path d="M529 412 C548 396 566 402 576 414 C560 410 546 411 529 418 Z"/>
        <path d="M529 410 C514 388 500 384 488 389 C504 394 516 400 529 414 Z"/>
        <path d="M529 410 C544 386 559 382 571 388 C554 393 542 400 529 414 Z"/>
        <rect x="568" y="440" width="4.5" height="74"/>
        <path d="M570 443 C556 433 544 437 536 446 C548 443 558 443 570 447 Z"/>
        <path d="M570 443 C584 432 596 436 604 445 C592 442 582 443 570 447 Z"/>
        <polygon points="154,485 186,472 222,477 224,485" fill="#d9c6b4" opacity=".88"/>
        <circle cx="168" cy="486" r="4.2" fill="#0d1d29"/><circle cx="210" cy="486" r="4.2" fill="#0d1d29"/>
      </g>
    </svg>`
  },

  climate: {
    eyebrow: '00 / 天气与充电',
    titleHtml: '白天穿短袖，<br><em>早晚风很冷。</em>',
    paragraphs: [
      "11 月底去死亡谷气温刚好，白天谷底大约 18-22°C，比夏天舒服得多。但<strong>清晨天文台、谷内夜间观星和海拔 5,500 英尺的 Dante's View 体感只有 5°C-8°C</strong>，而且山顶风大，每个人都要带抓绒或防风外套。",
      '开电车进谷主要盯住两件事：第一，<strong>公园里大部分路段没有手机信号</strong>，Google Maps 和特斯拉车机必须提前下离线地图；第二，靠 Hyatt Valet 慢充、Coso Junction 超充、园区慢充和 Baker 超充四站接力，中间不赌运气。<a href="https://www.nps.gov/deva/planyourvisit/conditions.htm" target="_blank" rel="noopener">NPS 死亡谷路况 ↗</a>'
    ],
    cards: [
      {
        icon: '☀',
        num: '01 / 洛杉矶与海边',
        title: 'Los Angeles & Coast',
        body: '下午晴暖，逛威尼斯运河和海滩很舒服。清晨山顶和 16:45 太阳落海后降温很快，海风会比较凉。',
        chip: '午后晴暖 / 16:45 日落'
      },
      {
        icon: '✦',
        num: '02 / 死亡谷谷底',
        title: 'Death Valley Floor',
        body: '恶水盆地和炉溪绿洲白天干爽少雨，但几乎全程没信号。天黑以后掉温快，抬头就能看银河。',
        chip: '干爽 18-22°C / 无信号 / 看星空'
      },
      {
        icon: '▲',
        num: '03 / 山口与观景台',
        title: "Towne Pass & Dante's View",
        body: '周六白天翻 4,956 英尺陡坡进谷，周一上午登 5,500 英尺观景台。山顶强风 5°C-8°C，下山长坡能回收不少电量。',
        chip: '5°C-8°C 强风 / 长下坡回电'
      }
    ],
    notice: {
      label: '充电接口提醒',
      html: 'Hyatt Regency LAX Valet 和 The Ranch 园区的慢充桩都是 <strong>J1772 接口</strong>，出发前确认车里带了官方 <strong>J1772 转 NACS 转接头</strong>。临行前再看一眼 <a href="https://quickmap.dot.ca.gov" target="_blank" rel="noopener">California QuickMap ↗</a> 和 <a href="https://www.nps.gov/deva/planyourvisit/conditions.htm" target="_blank" rel="noopener">NPS 封路信息 ↗</a>。'
    }
  },

  places: {
    eyebrow: '01 / 沿途停靠点',
    titleHtml: '五天要去的 9 个地方<span class="period">.</span>',
    intro: '按时间顺序列出全程 9 站。每张卡片点左右箭头（或左右滑动），可以在照片和现场停车、时间、机位提示之间切换。',
    stops: [
      {
        name: '格里菲斯天文台 · Griffith Observatory',
        kicker: '11.27 · 05:45-07:20',
        region: 'la',
        desc: 'GTA 5 伽利略天文台原型。趁黑五清晨路上没车，上山看洛杉矶日出，拍完直接回酒店吃早饭补觉。',
        rating: '★★★★★',
        duration: '05:45-07:20 (1.5h)',
        weather: '清晨 9-12°C，有风',
        photo: 'assets/griffith-sunrise.jpg',
        caption: '格里菲斯天文台 · 清晨俯瞰洛杉矶盆地',
        mapQuery: 'Griffith Observatory, Los Angeles, CA',
        copyAddress: '2800 E Observatory Rd, Los Angeles, CA',
        brief: [
          ['GTA 5 打卡', '游戏里的伽利略天文台原型。天刚亮时人少车少，不用抢车位。'],
          ['回程衔接', '07:20 下山回 Hyatt Regency LAX，07:30-09:30 去 unity la 吃免费热食自助早餐。'],
          ['穿衣提醒', '山顶清晨风凉，带一件防风外套；吃完早饭回套房睡 3 小时，避开黑五上午车流。'],
        ],
        footLeft: 'Day 2 · 黑五清晨',
        footRight: '海拔 1,134 ft'
      },
      {
        name: '威尼斯海滩与运河 · Venice Canals',
        kicker: '11.27 · 12:35-15:30',
        region: 'la',
        desc: '走 Pershing Dr 绕开 I-405，停露天大车场。逛 Abbot Kinney、在 Gjusta 吃午饭，再去 GTA 5 威斯普奇运河原型走木栈桥。',
        rating: '★★★★★',
        duration: '12:35-15:30 (3h)',
        weather: '午后晴暖 19-21°C',
        photo: 'assets/venice-canals.jpg',
        caption: '威尼斯运河历史街区 · 木栈桥与水岸洋房',
        mapQuery: '2100 Ocean Front Walk, Venice, CA',
        copyAddress: '2100 Ocean Front Walk, Venice, CA',
        brief: [
          ['路线与停车', '走 Pershing Dr 北上避开 I-405，直接停 2100 Ocean Front Walk 露天大车场，Cybertruck 好停。'],
          ['午饭选择', '13:10-14:15 逛 Abbot Kinney Blvd，吃 Gjusta 后院烘焙咖啡，或者去 Erewhon 热餐台。'],
          ['运河散步', '14:15-15:30 逛威尼斯运河历史街区（GTA 5 威斯普奇运河原型），拍木栈桥和水岸房子。'],
        ],
        footLeft: 'Day 2 · 下午',
        footRight: '2100 Ocean Front Walk'
      },
      {
        name: '圣莫尼卡码头与落日 · Santa Monica Pier',
        kicker: '11.27 · 15:45-18:30',
        region: 'la',
        desc: '停海滩南侧平地车场避开商圈堵点。16:45 在海滩看落日，再去码头引桥俯拍麦克卢尔隧道和加州 1 号公路弯道车流。',
        rating: '★★★★★',
        duration: '15:45-18:30 (2.7h)',
        weather: '16:45 日落，海风转凉',
        photo: 'assets/santa-monica-sunset.jpg',
        caption: '码头引桥视角 · 麦克卢尔隧道与加州 1 号公路弧形车流',
        mapQuery: 'Beach Parking Lot 4 South, 2030 Ocean Ave, Santa Monica, CA',
        copyAddress: '2030 Ocean Ave, Santa Monica, CA',
        brief: [
          ['停车避堵', '从威尼斯走平路开 8 分钟到 Beach Parking Lot 4 South（2030 Ocean Ave），别往商圈车库里钻。'],
          ['拍车流机位', '16:45 看落日；17:15-18:30 上码头（GTA 5 佩罗码头），在引桥连接处俯拍麦克卢尔隧道红光弯道。'],
          ['取车时间', '19:05 准时回南场取车开去 Sawtelle，给晚饭留够时间。'],
        ],
        footLeft: 'Day 2 · 傍晚',
        footRight: 'Lot 4 South (2030 Ocean Ave)'
      },
      {
        name: 'Sawtelle · KOJIMA 割烹与 Nijiya',
        kicker: '11.27 · 19:05-22:30',
        region: 'la',
        desc: '吃米其林一星板前割烹 KOJIMA，吃完直接下 1 楼 Nijiya Market 买齐进谷的 48 瓶水和干粮，锁进车后斗回酒店。',
        rating: '★★★★★',
        duration: '19:45-22:30 (2.7h)',
        weather: '晚间 13-15°C',
        photo: 'assets/sawtelle-kappo.jpg',
        caption: 'KOJIMA 板前割烹 · Sawtelle 19:45 入座',
        mapQuery: '2130 Sawtelle Blvd, Los Angeles, CA',
        copyAddress: '2130 Sawtelle Blvd, Los Angeles, CA',
        brief: [
          ['晚饭与停车', '停 Mississippi Ave 露天车场；19:45-21:45 入座 KOJIMA（确认号见个人 Tock App / 邮件）。'],
          ['采购清单', '21:45-22:30 下 1 楼 Nijiya Market 买 2 大箱矿泉水（48 瓶）、宝矿力水特和高热量干粮。'],
          ['回酒店充电', '买完锁进 Cybertruck 封闭后斗；22:45 回 Hyatt LAX 交 Valet 慢充过夜。'],
        ],
        footLeft: 'Day 2 · 晚间',
        footRight: 'Tock 已预约（19:45）'
      },
      {
        name: 'Coso Junction 超充与 Towne Pass',
        kicker: '11.28 · 08:45-15:15',
        region: 'dv',
        desc: '走 CA-14 N / US-395 N 绕开周六 I-15 堵车。在 Coso Junction 充到 90%-95% 并吃午饭，下午白天翻 4,956 英尺山路进谷。',
        rating: '★★★★☆',
        duration: '全段约 5.5h（含超充午饭）',
        weather: '晴朗干爽，山口风大',
        photo: 'assets/us395-towne-pass.jpg',
        caption: 'CA-190 E · 白天翻越海拔 4,956 英尺 Towne Pass 进谷',
        mapQuery: 'Coso Junction Tesla Supercharger, CA',
        copyAddress: 'Coso Junction Tesla Supercharger, CA',
        brief: [
          ['进谷前补电', '11:45-12:45 在 Coso Junction 特斯拉超充充到 90%-95%，顺便吃顿快餐午饭。'],
          ['白天翻山', '12:45-15:15 拐上 CA-190 E 翻 Towne Pass（4,956 英尺陡坡），白天开视野清楚，下坡也能回电。'],
          ['离线导航', '过 Lone Pine 往东基本就没手机信号了，进山前确认离线地图已经加载好。'],
        ],
        footLeft: 'Day 3 · 西线进谷',
        footRight: '超充 90%-95%'
      },
      {
        name: '扎布里斯基角 · Zabriskie Point',
        kicker: '11.28 · 16:00-17:00',
        region: 'dv',
        desc: '先在 The Ranch 办好入住插上慢充，再开 8 分钟来这里看 16:38 日落，泥岩丘陵被夕阳照成一片金黄，看完回绿洲吃牛排。',
        rating: '★★★★★',
        duration: '16:00-17:00 (1h)',
        weather: '16:38 日落，天黑降温快',
        photo: 'assets/zabriskie-sunset.jpg',
        caption: '扎布里斯基角 · 16:38 日落照亮泥岩丘陵',
        mapQuery: 'Zabriskie Point, Death Valley, CA',
        copyAddress: 'Zabriskie Point, Death Valley, CA',
        brief: [
          ['先住下再出门', '15:15-15:45 到 The Ranch 办 Cottage 入住，把车接上园区 Level 2 慢充桩。'],
          ['卡着日落去', '16:00 出发开 8 分钟就到，走一小段上坡看 16:38 日落，太阳落山前后 15 分钟颜色最好看。'],
          ['晚饭安排', '17:30 回绿洲，在 The Last Kind Words Saloon 吃美式牛排。'],
        ],
        footLeft: 'Day 3 · 傍晚',
        footRight: '距 The Ranch 8 分钟'
      },
      {
        name: '恶水盆地与艺术家大道 · Badwater & Palette',
        kicker: '11.29 · 08:30-13:30',
        region: 'dv',
        desc: "上午走海拔 -86 米的恶水盆地六边形盐壳，中午开单向 Artist's Drive 看彩色岩壁，直接拿出后斗里的水粮就地野餐。",
        rating: '★★★★★',
        duration: '08:30-13:30 (5h)',
        weather: '晴朗干爽 18-22°C',
        photo: 'assets/badwater-artists.jpg',
        caption: '恶水盆地（-86m）六边形盐结晶硬壳',
        mapQuery: 'Badwater Basin, Death Valley, CA',
        copyAddress: 'Badwater Basin, Death Valley, CA',
        brief: [
          ['恶水盆地', '08:30-11:30 往盐滩里面多走十来分钟，避开入口被踩碎的地方，六边形盐壳更完整。'],
          ['单向景观道', "11:30-13:30 拐进 9 英里单向 Artist's Drive，重点停在多彩岩壁 Artist's Palette。"],
          ['午饭野餐', '直接吃后斗里在 Nijiya 买的干粮、宝矿力和矿泉水，不用折返找餐厅。'],
        ],
        footLeft: 'Day 4 · 上午至中午',
        footRight: '海拔 -86m'
      },
      {
        name: '梅斯基特沙丘与星空 · Dunes & Dark Sky',
        kicker: '11.29 · 15:30-夜间',
        region: 'dv',
        desc: '下午去 Mesquite Flat 沙丘拍沙脊线日落，晚饭后在暗夜保护区看银河。睡前记得把园区慢充限额拉到 100%。',
        rating: '★★★★★',
        duration: '15:30-日落 + 夜间观星',
        weather: '夜间 5-9°C，记得加衣',
        photo: 'assets/mesquite-dunes.jpg',
        caption: '梅斯基特平沙丘 · 日落斜光下的沙脊线',
        mapQuery: 'Mesquite Flat Sand Dunes, Death Valley, CA',
        copyAddress: 'Mesquite Flat Sand Dunes, Death Valley, CA',
        brief: [
          ['拍沙脊线', '15:30-17:00 往沙丘深处走 15 分钟避开脚印，夕阳低角度照出来的明暗线条最清楚。'],
          ['晚上看银河', '回炉溪绿洲吃完晚饭，去暗一点的空地看暗夜保护区银河，穿上防风保暖外套。'],
          ['睡前别忘', '把 Cybertruck 接好园区慢充桩，在特斯拉 App 里把充电限额改成 100% 满电。'],
        ],
        footLeft: 'Day 4 · 傍晚与夜间',
        footRight: '睡前设 100% 满电'
      },
      {
        name: "丹特观景台与贝克返程 · Dante's View & Baker",
        kicker: '11.30 · 08:45-13:30',
        region: 'dv',
        desc: '满电爬坡 25 英里到 5,500 英尺顺光俯瞰恶水盐滩；下山动能回收，走 CA-127 S 到 Baker 超充吃午饭，不走回头路。',
        rating: '★★★★★',
        duration: '观景 1h + 开到 Baker 2h',
        weather: '山顶强风 5-8°C',
        photo: 'assets/dantes-view.jpg',
        caption: '丹特观景台（5,500 ft）· 上午顺光俯瞰恶水盐滩',
        mapQuery: 'Dantes View, Death Valley, CA',
        copyAddress: 'Dantes View, Death Valley, CA',
        brief: [
          ['山顶顺光与防风', "09:25-10:20 登顶 Dante's View（5,500 英尺），上午顺光看盐滩很通透，但风大体感 5°C-8°C。"],
          ['长下坡走环线', '10:20-12:20 下山长坡动能回收回电，走 CA-190 E 接 CA-127 S 共 114 英里到 Baker，不走回头路。'],
          ['Baker 补电', '12:20-13:30 在 Baker Supercharger 充到 85%-90%，吃午饭并打卡世界最高温度计，再走 I-15 S 回 LA。'],
        ],
        footLeft: 'Day 5 · 东南大环线',
        footRight: '5,500 ft · 超充 85%-90%'
      }
    ],
    transitNote: {
      label: '3 人怎么汇合',
      html: '总共 3 个人：两位朋友 11.26 傍晚坐 DL0738 从纽约飞到 LAX，11.30 晚上坐 DL0676 回 JFK；我白天从加州 San Jose 开 Cybertruck 南下到 LAX 航站楼外接人。洛杉矶住 Hyatt Regency LAX（Regency Suite King，主卧 King 大床加客厅折叠床），死亡谷住 The Ranch Cottage。'
    },
    highlightCard: {
      photo: 'assets/death-valley-night.jpg',
      alt: '死亡谷夜间星空',
      kicker: '补给与充电节奏',
      title: '先在 Nijiya 备好水粮，再按四站把电接上',
      body: '11.27 吃完 KOJIMA 直接下 1 楼 Nijiya Market，买 2 大箱矿泉水（48 瓶）、宝矿力水特和干粮，直接锁进 Cybertruck 封闭后斗。充电分四步走：在 Hyatt 交 Valet 充过夜，周六在 Coso Junction 超充到 90%-95% 再进谷，周日睡前把园区慢充限额调成 100%，周一登完观景台下山去 Baker 超充到 85%-90% 回 LA。',
      small: '周日晚上看星空前，记得顺手在特斯拉 App 里检查一下慢充是不是已经设成 100%。'
    },
    bookingArchiveTitle: '展开看航班、酒店、预约和充电速查表',
    bookingArchiveDesc: '把航班号、酒店、预约时段和各站充电目标收在一张表里（具体确认号见个人邮件 / App）。',
    bookingColumns: ['时间与项目', '具体安排', '预约状态 / 充电目标'],
    bookingReference: [
      ['11.26 去程航班', '两位朋友坐 DL0738 傍晚到 LAX，拿完行李到航站楼外上车', '航站楼外 3 人汇合'],
      ['11.26 湾区南下', '我白天从 San Jose 开 Cybertruck 走 I-5 S 到洛杉矶（约 345 英里）', '中途 Kettleman / Tejon 超充'],
      ['11.26-28 LA 酒店', 'Hyatt Regency LAX，Regency Suite King（主卧 King 大床 + 客厅折叠床）', '含 unity la 早餐 · App 退房'],
      ['11.26-27 LA 充电', '到店把车交给 Valet 插 Level 2 慢充，需要车上自带 J1772 转接头', '每晚充好，次日满电走'],
      ['11.27 晚宴预约', 'Sawtelle KOJIMA 板前割烹（19:45-21:45），停 Mississippi Ave 露天车场', 'Tock 已预约（确认号见个人邮件）'],
      ['11.27 进谷采买', '吃完直接下 1 楼 Nijiya Market 买 2 大箱矿泉水（48 瓶）、宝矿力和干粮', '锁进 Cybertruck 封闭后斗'],
      ['11.28 西线超充', '走 CA-14 N / US-395 N 到 Coso Junction 超充，顺便吃午饭', '充到 90%-95% 再翻 Towne Pass'],
      ['11.28-30 谷内住宿', 'The Ranch at Death Valley Cottage 两晚，晚上接园区 Level 2 慢充', '11.29 睡前 App 限额设 100%'],
      ['11.30 返程超充', "上完 Dante's View 下坡回电，走 CA-190 E / CA-127 S 到 Baker 超充吃午饭", '充到 85%-90% · 打卡温度计'],
      ['11.30 返程航班', '17:00-19:30 西区卸行李吃告别晚饭；20:00 进 LAX 达美休息室洗澡；22:00+ 飞 JFK', 'DL0676 (Delta Premium Select)']
    ]
  },

  compare: {
    eyebrow: '02 / 切换视角',
    titleHtml: '同一份行程，<br><em>按各自出发地看。</em>',
    intro: '默认显示 5 天主线。点下面卡片可以切到 San Jose 车主视角（含湾区往返）、纽约飞友视角，或者只看黑五洛杉矶城区路线，地图和下方时间表会一起变。',
    defaultPlan: 'v1',
    summaryNote: '不含充电、吃饭和拍照时间',
    warningLabel: '最容易出岔子的事',
    considerationsEyebrow: '关键提醒',
    considerationsTitle: '路上盯紧这四件事',
    droppedEyebrow: '主动避开的坑',
    droppedTitle: '不把时间耗在堵车和找车位上。',
    plans: [
      {
        id: 'v1',
        shortLabel: '5 日主计划',
        name: '5 日完整主计划',
        cardKicker: '默认视图 / 完整 5 天',
        cardTitle: '5 日完整主计划',
        cardLines: [
          '11.26 LAX 汇合 · 11.30 走东南环线回机场',
          '<b>主要内容</b> 洛杉矶 GTA 5 巡礼、KOJIMA 割烹、西线进死亡谷、盐滩沙丘星空、CA-127 不走回头路',
          '<b>避堵安排</b> 黑五上午补觉、走 Pershing Dr 绕 I-405、周六走 US-395 绕 I-15'
        ],
        cardAction: '当前选中 ↗',
        eyebrow: '04 / 每日安排 · 5 天 4 晚',
        titleHtml: '11 月 26 日 LAX 汇合，<br><em>30 日走环线返程。</em>',
        miles: 'LA+死亡谷约 765 英里',
        hours: '纯驾驶约 15.5 小时（另含 SJ 往返）',
        warning: '这趟最容易出岔子的两件事：一是死亡谷里大部分地方没手机信号，手机和车机必须提前下离线地图；二是 Hyatt 和 The Ranch 的慢充都是 J1772 接口，没带转接头晚上就充不上电。',
        days: MAIN_DAYS,
        dropped: ['黑五走 I-405 上午高峰', '圣莫尼卡市区多层窄车库', '周六走 I-15 出城堵车', '天黑后翻 Towne Pass', '走回头路返程', '进谷后靠在线导航'],
        droppedNote: '路线、车场和出门时间都按 Cybertruck 车身尺寸、充电节奏和黑五路况避开了麻烦点。',
        considerations: [
          ['3 人汇合与送机', '两位朋友 11.26 坐 DL0738 到 LAX，我从 San Jose 开车接机；11.30 吃完告别晚饭 20:00 送他们去机场坐 DL0676 回 JFK。'],
          ['四站把电接上', 'Hyatt Valet L2 充过夜 → Coso Junction 超充 90%-95% → The Ranch 园区 L2（周日睡前设 100%）→ 下山回电后 Baker 超充 85%-90%。'],
          ['预约和进谷水粮', 'KOJIMA 确认邮件与凯悦房单提前存手机离线查看；11.27 晚在 Nijiya 买 48 瓶水、宝矿力和干粮锁进后斗。'],
          ['无信号与山顶大风', "过 Lone Pine 后基本没信号，离线地图提前下好；清晨天文台、夜里看星和 5,500 英尺 Dante's View 都要穿防风保暖外套。"]
        ]
      },
      {
        id: 'sj_driver',
        shortLabel: 'San Jose 车主',
        name: 'San Jose 车主视角 · 含湾区往返',
        cardKicker: 'San Jose 车主视角',
        cardTitle: '含湾区往返自驾版',
        cardLines: [
          'San Jose → I-5 S → LAX → 死亡谷 → 回 San Jose',
          '<b>多出的路段</b> 11.26 白天从 San Jose 开约 345 英里到 LAX 接机（中途 Kettleman City 超充）',
          '<b>返程提醒</b> 11.30 当天已经开了 329 英里，送完机别连夜开回湾区，建议 LA 住一晚次日回'
        ],
        cardAction: '看车主完整路线 ↗',
        eyebrow: '04 / 每日安排 · San Jose 车主视角',
        titleHtml: '从 San Jose 开车南下，<br><em>跑完洛杉矶与死亡谷。</em>',
        miles: '含湾区往返约 1,455 英里',
        hours: '总计纯驾驶约 26.5 小时',
        warning: 'San Jose 到 LAX 单程约 345 英里（5.5 小时），周四白天开过去很从容。但周一从死亡谷回 LA 已经开了 329 英里，晚上送完机不要连夜硬开回湾区，在 LA 住一晚周二白天开回去更安全。',
        days: SJ_DRIVER_DAYS,
        dropped: ['11.30 送完机连夜开回 San Jose', '忘带 J1772 转接头', '黑五开进市区窄地库'],
        droppedNote: 'I-5 往返优先停 Kettleman City 或 Tejon Ranch 大站超充，桩多且车位宽。',
        considerations: [
          ['周四南下时间', '建议 10:30 前从 San Jose 满电出发，中途 Kettleman City 超充加午饭 40 分钟，傍晚前稳稳到 LAX。'],
          ['出门前摸一遍转接头', '离开 San Jose 前确认官方 J1772 → NACS 转接头在车里，后面四晚过夜慢充全靠它。'],
          ['后斗留出补给空间', '三个人行李放好后，留出一块地方给周五晚 Nijiya 买的 2 大箱矿泉水和干粮。'],
          ['周一晚别硬撑夜车', '20:00 送完机可以在 LA 西区多住一晚，或者往北开 1.5 小时住 Bakersfield，周二白天轻松回 San Jose。']
        ]
      },
      {
        id: 'nyc_flight',
        shortLabel: '纽约飞友',
        name: '纽约两位飞友视角 · JFK 往返',
        cardKicker: '纽约两位飞友视角',
        cardTitle: 'JFK 往返衔接版',
        cardLines: [
          '11.26 DL0738 落地 · 11.30 DL0676 红眼返程',
          '<b>衔接点</b> 落地航站楼外直接上车不用租车；靠东岸时差早起看日出；周一 20:00 进达美休息室洗澡',
          '<b>打包建议</b> 换洗衣物放登机箱，方便进休息室直接洗漱再登 Premium Select'
        ],
        cardAction: '看飞友视角 ↗',
        eyebrow: '04 / 每日安排 · 纽约飞友视角',
        titleHtml: '纽约飞到洛杉矶，<br><em>落地直接上车出发。</em>',
        miles: '随车约 765 英里',
        hours: 'DL0738 去程 · DL0676 返程',
        warning: '靠东西岸 3 小时时差，周五 05:45 起床看日出不会太难受，看完回酒店补 3 小时觉刚刚好。周一记得把换洗衣物放在手提箱里，晚上 8 点进 LAX 达美休息室洗个澡再坐红眼航班。',
        days: NYC_FLIGHT_DAYS,
        dropped: ['落地排队租车还车', '满身沙尘直接坐红眼航班', '黑五上午困着堵在路上'],
        droppedNote: '三个人在 LA 住 Regency Suite King（主卧大床加客厅折叠床），在死亡谷住 Cottage，晚上都能睡踏实。',
        considerations: [
          ['航班与接送时间', '11.26 傍晚 DL0738 落地航站楼外直接上车；11.30 20:00 到 LAX，22:00+ 坐 DL0676（Delta Premium Select）直飞 JFK。'],
          ['达美休息室洗澡', '走完盐滩和沙丘身上容易沾尘，20:00 进 Delta Sky Club 洗完澡再登机舒服很多。'],
          ['带一件防风抓绒', '从纽约冬装出发不用带太厚重的大衣，一件轻便防风抓绒就能应付早晚和 5,500 英尺山顶大风。'],
          ['确认邮件存手机', 'KOJIMA 预约邮件、酒店房单和航班信息提前截屏，进谷没信号也能查。']
        ]
      },
      {
        id: 'la_detail',
        shortLabel: '黑五 LA',
        name: 'Day 2 黑五洛杉矶避堵细化',
        cardKicker: '黑五当天细化',
        cardTitle: 'Day 2 洛杉矶避堵与停车',
        cardLines: [
          '11.27 全天 · 天文台 → 威尼斯 → 圣莫尼卡 → Sawtelle',
          '<b>停车原则</b> Cybertruck 车身宽，全程只停露天或平地大车场，不进市区多层窄车库',
          '<b>地图放大</b> 自动切到西洛杉矶城区视图，方便对照停车点地址和落日时间'
        ],
        cardAction: '放大看 LA 城区 ↗',
        eyebrow: '04 / 每日安排 · 11.27 大洛杉矶城区',
        titleHtml: '避开黑五车流，<br><em>从日出逛到割烹。</em>',
        miles: '城区约 62 英里',
        hours: '分段短途，走平路为主',
        warning: '地图已经放大到西洛杉矶。黑五下午 I-405 和圣莫尼卡商圈最容易堵死，这天靠「上午补觉、走 Pershing Dr、全停露天或平地车场」三招绕开堵点，也不愁 Cybertruck 停不进地库。',
        days: LA_DETAIL_DAYS,
        dropped: ['黑五走 I-405 北上', '钻进圣莫尼卡室内多层车库', '大中午去海滩暴晒'],
        droppedNote: '点上方地图里的洛杉矶圆点，能直接看每个露天停车场的地址和时间。',
        considerations: [
          ['GTA 5 三个原型点', '清晨格里菲斯天文台（伽利略）→ 下午威尼斯运河（威斯普奇）→ 傍晚圣莫尼卡码头（佩罗码头）。'],
          ['三个宽敞车场', '威尼斯停 2100 Ocean Front Walk，圣莫尼卡停 Lot 4 South（2030 Ocean Ave），Sawtelle 停 Mississippi Ave 露天场。'],
          ['隧道车流机位', '17:15-18:30 天刚暗时站在码头引桥连接处，朝东俯拍加州 1 号公路弧形车灯冲进麦克卢尔隧道。'],
          ['晚饭顺手买补给', 'KOJIMA 吃完（21:45）直接下 1 楼 Nijiya Market 买 48 瓶水、宝矿力和干粮，锁进后斗回酒店。']
        ]
      }
    ]
  },

  map: {
    eyebrow: '03 / 路线地图',
    titleHtml: '看清环线方向，<br><em>还有每个超充站。</em>',
    intro: '支持拖拽平移和右下角缩放。橙点是当前视图要停的地方，蓝点是特斯拉超充站，灰点是其他视图的点。点任意圆点看备忘，下面卡片能直接打开 Google Maps 分段导航。',
    ariaLabel: '2026 感恩节洛杉矶与死亡谷路线地图',
    stopLegendLabel: '当前停留 / 观景点',
    hubLegendLabel: '特斯拉超充站',
    otherLegendLabel: '其他视图节点',
    hubPopupTag: '⚡ 特斯拉超充站',
    stopPopupTag: '★ 当前停留点',
    otherPopupTag: '其他视图节点',
    overlayHint: '可拖拽平移或点右下角按钮缩放；点圆点看备忘。',
    routeNote: '死亡谷内大部分路段无手机信号，下面链接适合出发前预览或有网时分段加载。',
    fullRouteLabel: '在 Google Maps 打开整条路线 ↗',
    detailPlanId: 'la_detail',
    denseClusterNodes: ['LAX 航站楼', 'Hyatt Regency LAX', 'Santa Monica Pier', 'Griffith Observatory', 'Sawtelle · KOJIMA'],
    coordinates: {
      'San Jose': [37.3382, -121.8863],
      'Kettleman City SC': [35.9875, -119.9619],
      'LAX 航站楼': [33.9416, -118.4085],
      'Hyatt Regency LAX': [33.9462, -118.3961],
      'Griffith Observatory': [34.1184, -118.3004],
      'Venice Beach & Canals': [33.9845, -118.4695],
      'Santa Monica Pier': [34.0094, -118.4973],
      'Sawtelle · KOJIMA': [34.0398, -118.4426],
      'Coso Junction SC': [36.0457, -117.9465],
      'Lone Pine': [36.6060, -118.0629],
      'Towne Pass': [36.3853, -117.3676],
      'Mesquite Flat Sand Dunes': [36.6152, -117.1130],
      'The Ranch at Death Valley': [36.4583, -116.8669],
      'Zabriskie Point': [36.4201, -116.8110],
      'Badwater Basin': [36.2297, -116.7669],
      "Artist's Palette": [36.3627, -116.8035],
      "Dante's View": [36.2205, -116.7267],
      'Baker SC': [35.2651, -116.0744],
    },
    hubNodes: ['Kettleman City SC', 'Coso Junction SC', 'Baker SC'],
    shortNames: {
      'The Ranch at Death Valley': 'The Ranch 绿洲',
      'Mesquite Flat Sand Dunes': 'Mesquite 沙丘',
      'Hyatt Regency LAX': 'Hyatt LAX',
      'Griffith Observatory': '格里菲斯天文台',
      'Venice Beach & Canals': '威尼斯运河',
      'Santa Monica Pier': '圣莫尼卡码头',
      'Sawtelle · KOJIMA': 'Sawtelle · KOJIMA',
      'Coso Junction SC': '⚡ Coso Junction 超充',
      'Baker SC': '⚡ Baker 超充',
      'Kettleman City SC': '⚡ Kettleman 超充',
      'Zabriskie Point': 'Zabriskie 日落点',
      'Badwater Basin': '恶水盆地 (-86m)',
      "Artist's Palette": '艺术家调色盘',
      "Dante's View": '丹特观景台 (5,500ft)',
    },
    popupNotes: {
      'San Jose': '车主出发地 · 11.26 白天开 Cybertruck 走 I-5 S 到 LAX（约 345 英里）',
      'Kettleman City SC': 'I-5 超充大站 · 湾区南下中途补电吃午饭',
      'LAX 航站楼': '11.26 傍晚 DL0738 接机 · 11.30 22:00+ DL0676 飞回纽约 JFK',
      'Hyatt Regency LAX': '11.26-28 两晚 Regency Suite King · Valet L2 慢充',
      'Griffith Observatory': '11.27 05:45-07:20 看日出 · GTA 5 伽利略天文台原型',
      'Venice Beach & Canals': '11.27 12:35-15:30 · 停 2100 Ocean Front Walk · Gjusta + 威斯普奇运河',
      'Santa Monica Pier': '11.27 15:45-18:30 · 停 Lot 4 South · 16:45 落日和麦克卢尔隧道',
      'Sawtelle · KOJIMA': '11.27 19:45 KOJIMA 割烹（已预约）+ 1 楼 Nijiya 买 48 瓶水',
      'Coso Junction SC': '11.28 11:45-12:45 充到 90%-95% 并吃午饭',
      'Lone Pine': '西线备选补给镇 · 进谷前最后有稳定信号的地方',
      'Towne Pass': '11.28 下午白天翻 4,956 英尺陡坡进谷',
      'Mesquite Flat Sand Dunes': '11.29 15:30-17:00 看沙丘日落',
      'The Ranch at Death Valley': '11.28-30 两晚 Cottage · 园区 L2 慢充（11.29 睡前设 100%）',
      'Zabriskie Point': '11.28 16:00-17:00 看 16:38 日落',
      'Badwater Basin': '11.29 08:30-11:30 海拔 -86 米六边形盐壳',
      "Artist's Palette": '11.29 11:30-13:30 单向艺术家大道彩色岩壁 + 后斗野餐',
      "Dante's View": '11.30 09:25-10:20 5,500 英尺顺光俯瞰盐滩（5°C-8°C 强风）',
      'Baker SC': '11.30 12:20-13:30 充到 85%-90% · 吃午饭打卡最高温度计',
    },
    routeLegs: {
      v1: [
        ['LAX 航站楼', 'Hyatt Regency LAX', '约 10 分钟', '11.26 傍晚接 DL0738 入住', 'Los+Angeles+International+Airport/Hyatt+Regency+Los+Angeles+International+Airport'],
        ['Hyatt Regency LAX', 'Griffith Observatory', '约 35 分钟', '11.27 05:45 清晨看日出', 'Hyatt+Regency+Los+Angeles+International+Airport/Griffith+Observatory,+Los+Angeles,+CA'],
        ['Hyatt Regency LAX', 'Santa Monica Pier', '约 35 分钟', '11.27 走 Pershing Dr、威尼斯运河到 Lot 4 South', 'Hyatt+Regency+Los+Angeles+International+Airport/2100+Ocean+Front+Walk,+Venice,+CA/2030+Ocean+Ave,+Santa+Monica,+CA'],
        ['Santa Monica Pier', 'Sawtelle · KOJIMA', '约 20 分钟', '11.27 KOJIMA 晚饭 + Nijiya 采买回酒店', '2030+Ocean+Ave,+Santa+Monica,+CA/2130+Sawtelle+Blvd,+Los+Angeles,+CA/Hyatt+Regency+Los+Angeles+International+Airport'],
        ['Hyatt Regency LAX', 'Coso Junction SC', '约 2.8 小时', '11.28 走 CA-14 N / US-395 N · 约 165 英里', 'Hyatt+Regency+Los+Angeles+International+Airport/Coso+Junction+Tesla+Supercharger,+CA'],
        ['Coso Junction SC', 'The Ranch at Death Valley', '约 2.2 小时', '11.28 翻 Towne Pass 4,956 ft · 约 114 英里', 'Coso+Junction+Tesla+Supercharger,+CA/Towne+Pass,+CA/The+Ranch+at+Death+Valley,+CA'],
        ['The Ranch at Death Valley', 'Mesquite Flat Sand Dunes', '约 2.2 小时', '11.29 恶水盆地 → 艺术家大道 → 沙丘日落', 'The+Ranch+at+Death+Valley,+CA/Badwater+Basin,+CA/Artists+Palette,+CA/Mesquite+Flat+Sand+Dunes,+CA'],
        ['The Ranch at Death Valley', 'Baker SC', '约 2.6 小时', "11.30 登 Dante's View → CA-127 S · 约 139 英里", 'The+Ranch+at+Death+Valley,+CA/Dantes+View,+CA/Baker+Tesla+Supercharger,+Baker,+CA'],
        ['Baker SC', 'LAX 航站楼', '约 3.25 小时', '11.30 走 I-15 S 回 LA 吃晚饭送机 · 约 190 英里', 'Baker+Tesla+Supercharger,+Baker,+CA/Los+Angeles+International+Airport'],
      ],
      sj_driver: [
        ['San Jose', 'Kettleman City SC', '约 2.7 小时', '11.26 I-5 S 南下中途超充 · 约 175 英里', 'San+Jose,+CA/Tesla+Supercharger,+Kettleman+City,+CA'],
        ['Kettleman City SC', 'LAX 航站楼', '约 2.7 小时', '11.26 过 Grapevine 到机场接人 · 约 172 英里', 'Tesla+Supercharger,+Kettleman+City,+CA/Los+Angeles+International+Airport'],
        ['Hyatt Regency LAX', 'Coso Junction SC', '约 2.8 小时', '11.28 西线 US-395 进谷 · 约 165 英里', 'Hyatt+Regency+Los+Angeles+International+Airport/Coso+Junction+Tesla+Supercharger,+CA'],
        ['Coso Junction SC', 'The Ranch at Death Valley', '约 2.2 小时', '11.28 翻 Towne Pass 进谷 · 约 114 英里', 'Coso+Junction+Tesla+Supercharger,+CA/Towne+Pass,+CA/The+Ranch+at+Death+Valley,+CA'],
        ['The Ranch at Death Valley', 'Baker SC', '约 2.6 小时', "11.30 Dante's View + CA-127 S · 约 139 英里", 'The+Ranch+at+Death+Valley,+CA/Dantes+View,+CA/Baker+Tesla+Supercharger,+Baker,+CA'],
        ['Baker SC', 'LAX 航站楼', '约 3.25 小时', '11.30 I-15 S 回 LA 送机 · 约 190 英里', 'Baker+Tesla+Supercharger,+Baker,+CA/Los+Angeles+International+Airport'],
        ['LAX 航站楼', 'San Jose', '约 5.4 小时', '12.1 睡醒后走 I-5 N 回湾区 · 约 345 英里', 'Los+Angeles+International+Airport/Tesla+Supercharger,+Kettleman+City,+CA/San+Jose,+CA'],
      ],
      nyc_flight: [
        ['LAX 航站楼', 'Hyatt Regency LAX', '约 10 分钟', '11.26 DL0738 落地接机', 'Los+Angeles+International+Airport/Hyatt+Regency+Los+Angeles+International+Airport'],
        ['Hyatt Regency LAX', 'Santa Monica Pier', '约 1 小时', '11.27 天文台 → 威尼斯运河 → 码头落日', 'Hyatt+Regency+Los+Angeles+International+Airport/Griffith+Observatory,+CA/Venice+Canals,+CA/2030+Ocean+Ave,+Santa+Monica,+CA'],
        ['Hyatt Regency LAX', 'The Ranch at Death Valley', '约 5 小时', '11.28 经 Coso Junction 超充和 Towne Pass', 'Hyatt+Regency+Los+Angeles+International+Airport/Coso+Junction+Tesla+Supercharger,+CA/The+Ranch+at+Death+Valley,+CA'],
        ['The Ranch at Death Valley', 'Mesquite Flat Sand Dunes', '约 2.2 小时', '11.29 恶水盆地 → 艺术家大道 → 沙丘星空', 'The+Ranch+at+Death+Valley,+CA/Badwater+Basin,+CA/Artists+Palette,+CA/Mesquite+Flat+Sand+Dunes,+CA'],
        ['The Ranch at Death Valley', 'LAX 航站楼', '约 5.9 小时', "11.30 Dante's View → Baker 超充 → 达美休息室 DL0676", 'The+Ranch+at+Death+Valley,+CA/Dantes+View,+CA/Baker+Tesla+Supercharger,+Baker,+CA/Los+Angeles+International+Airport'],
      ],
      la_detail: [
        ['Hyatt Regency LAX', 'Griffith Observatory', '约 30 分钟', '05:45-07:20 清晨空路看日出（约 22 英里）', 'Hyatt+Regency+Los+Angeles+International+Airport/Griffith+Observatory,+Los+Angeles,+CA'],
        ['Hyatt Regency LAX', 'Venice Beach & Canals', '约 25 分钟', '12:35 走 Pershing Dr 绕 I-405 到露天大车场', 'Hyatt+Regency+Los+Angeles+International+Airport/Pershing+Dr,+Los+Angeles,+CA/2100+Ocean+Front+Walk,+Venice,+CA'],
        ['Venice Beach & Canals', 'Santa Monica Pier', '约 8 分钟', '15:45 平路开到 Lot 4 South（2030 Ocean Ave）', '2100+Ocean+Front+Walk,+Venice,+CA/2030+Ocean+Ave,+Santa+Monica,+CA'],
        ['Santa Monica Pier', 'Sawtelle · KOJIMA', '约 20 分钟', '19:05 平路去 Mississippi Ave 露天场', '2030+Ocean+Ave,+Santa+Monica,+CA/2130+Sawtelle+Blvd,+Los+Angeles,+CA'],
        ['Sawtelle · KOJIMA', 'Hyatt Regency LAX', '约 15 分钟', '22:30 买完东西回酒店交 Valet 慢充', '2130+Sawtelle+Blvd,+Los+Angeles,+CA/Hyatt+Regency+Los+Angeles+International+Airport'],
      ]
    },
    routePaths: {
      v1: ['LAX 航站楼', 'Hyatt Regency LAX', 'Griffith Observatory', 'Santa Monica Pier', 'Venice Beach & Canals', 'Sawtelle · KOJIMA', 'Hyatt Regency LAX', 'Coso Junction SC', 'Towne Pass', 'Mesquite Flat Sand Dunes', 'The Ranch at Death Valley', 'Zabriskie Point', 'Badwater Basin', "Artist's Palette", 'The Ranch at Death Valley', "Dante's View", 'Baker SC', 'LAX 航站楼'],
      sj_driver: ['San Jose', 'Kettleman City SC', 'LAX 航站楼', 'Hyatt Regency LAX', 'Coso Junction SC', 'Towne Pass', 'The Ranch at Death Valley', 'Zabriskie Point', 'Badwater Basin', "Dante's View", 'Baker SC', 'LAX 航站楼', 'Kettleman City SC', 'San Jose'],
      nyc_flight: ['LAX 航站楼', 'Hyatt Regency LAX', 'Santa Monica Pier', 'Coso Junction SC', 'Towne Pass', 'The Ranch at Death Valley', 'Zabriskie Point', 'Badwater Basin', "Artist's Palette", 'Mesquite Flat Sand Dunes', "Dante's View", 'Baker SC', 'LAX 航站楼'],
      la_detail: ['Hyatt Regency LAX', 'Griffith Observatory', 'Hyatt Regency LAX', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA', 'Hyatt Regency LAX'],
    },
    routeStops: {
      v1: ['LAX 航站楼', 'Griffith Observatory', 'Santa Monica Pier', 'Coso Junction SC', 'Towne Pass', 'Mesquite Flat Sand Dunes', 'The Ranch at Death Valley', 'Zabriskie Point', 'Badwater Basin', "Artist's Palette", "Dante's View", 'Baker SC'],
      sj_driver: ['San Jose', 'Kettleman City SC', 'LAX 航站楼', 'Coso Junction SC', 'Towne Pass', 'The Ranch at Death Valley', 'Badwater Basin', "Dante's View", 'Baker SC'],
      nyc_flight: ['LAX 航站楼', 'Santa Monica Pier', 'Coso Junction SC', 'Towne Pass', 'The Ranch at Death Valley', 'Zabriskie Point', 'Badwater Basin', 'Mesquite Flat Sand Dunes', "Dante's View", 'Baker SC'],
      la_detail: ['Hyatt Regency LAX', 'Griffith Observatory', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA'],
    }
  },

  customBuilder: {
    enabled: true,
    kicker: '临时想改路线',
    title: '自定义路线微调',
    desc: '如果想顺路加 Lone Pine、换停靠顺序，或者改起点终点，点这里导入现有计划直接改，里程和导航链接会跟着更新。',
    editorTitle: '逐日修改停靠点',
    editorDesc: '先导入一套方案再增删停靠点最省事，改动会自动存在当前浏览器里。',
    startHint: '起点可选 LAX、Hyatt LAX 或 San Jose；终点可选 LAX 或 San Jose。',
    estimateNote: '这里算的是纯驾驶粗估，没把充电、吃饭、拍照和黑五堵车算进去。',
    distanceUnit: '英里',
    defaultDayCharge: '酒店 Valet 慢充 / 沿途超充',
    defaultDayRisk: '死亡谷里没信号，离线地图提前下好',
    customWarningSuffix: '进出死亡谷建议保留 Coso Junction 和 Baker 两个超充站。',
    importButtons: [
      { id: 'v1', label: '导入 5 日主计划' },
      { id: 'sj_driver', label: '导入 San Jose 车主版' },
      { id: 'la_detail', label: '导入黑五 LA 细化版' }
    ],
    templateStarts: {
      v1: 'LAX 航站楼',
      sj_driver: 'San Jose',
      la_detail: 'Hyatt Regency LAX'
    },
    templates: {
      v1: [
        { stay: 'Hyatt Regency LAX', stops: [] },
        { stay: 'Hyatt Regency LAX', stops: ['Griffith Observatory', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA'] },
        { stay: 'The Ranch at Death Valley', stops: ['Coso Junction SC', 'Towne Pass', 'Zabriskie Point'] },
        { stay: 'The Ranch at Death Valley', stops: ['Badwater Basin', "Artist's Palette", 'Mesquite Flat Sand Dunes'] },
        { stay: 'LAX 航站楼', stops: ["Dante's View", 'Baker SC'] },
      ],
      sj_driver: [
        { stay: 'Hyatt Regency LAX', stops: ['Kettleman City SC', 'LAX 航站楼'] },
        { stay: 'Hyatt Regency LAX', stops: ['Griffith Observatory', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA'] },
        { stay: 'The Ranch at Death Valley', stops: ['Coso Junction SC', 'Towne Pass', 'Zabriskie Point'] },
        { stay: 'The Ranch at Death Valley', stops: ['Badwater Basin', "Artist's Palette", 'Mesquite Flat Sand Dunes'] },
        { stay: 'San Jose', stops: ["Dante's View", 'Baker SC', 'LAX 航站楼', 'Kettleman City SC'] },
      ],
      la_detail: [
        { stay: 'Hyatt Regency LAX', stops: ['Griffith Observatory', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA'] }
      ]
    },
    startPlaces: ['LAX 航站楼', 'San Jose', 'Hyatt Regency LAX', 'The Ranch at Death Valley'],
    lodgingPlaces: ['Hyatt Regency LAX', 'The Ranch at Death Valley', 'Lone Pine', 'Baker SC', 'Santa Monica Pier'],
    endPlaces: ['LAX 航站楼', 'San Jose', 'Hyatt Regency LAX'],
    attractionPlaces: ['Griffith Observatory', 'Venice Beach & Canals', 'Santa Monica Pier', 'Sawtelle · KOJIMA', 'Towne Pass', 'Zabriskie Point', 'Badwater Basin', "Artist's Palette", 'Mesquite Flat Sand Dunes', "Dante's View"],
    transitPlaces: ['Kettleman City SC', 'LAX 航站楼', 'Coso Junction SC', 'Lone Pine', 'Baker SC'],
    mapSearch: {
      'San Jose': 'San Jose, CA',
      'Kettleman City SC': 'Tesla Supercharger, Kettleman City, CA',
      'LAX 航站楼': 'Los Angeles International Airport, CA',
      'Hyatt Regency LAX': 'Hyatt Regency Los Angeles International Airport, CA',
      'Griffith Observatory': 'Griffith Observatory, Los Angeles, CA',
      'Venice Beach & Canals': '2100 Ocean Front Walk, Venice, CA',
      'Santa Monica Pier': '2030 Ocean Ave, Santa Monica, CA',
      'Sawtelle · KOJIMA': '2130 Sawtelle Blvd, Los Angeles, CA',
      'Coso Junction SC': 'Coso Junction Tesla Supercharger, CA',
      'Lone Pine': 'Lone Pine, CA',
      'Towne Pass': 'Towne Pass, CA-190, Death Valley, CA',
      'The Ranch at Death Valley': 'The Ranch at Death Valley, Furnace Creek, CA',
      'Zabriskie Point': 'Zabriskie Point, Death Valley, CA',
      'Badwater Basin': 'Badwater Basin, Death Valley, CA',
      "Artist's Palette": "Artist's Palette, Death Valley, CA",
      'Mesquite Flat Sand Dunes': 'Mesquite Flat Sand Dunes, Death Valley, CA',
      "Dante's View": "Dante's View, Death Valley, CA",
      'Baker SC': 'Baker Tesla Supercharger, Baker, CA',
    },
    roadEdges: [
      ['San Jose', 'Kettleman City SC', 175, 2.7], ['Kettleman City SC', 'LAX 航站楼', 172, 2.7], ['San Jose', 'LAX 航站楼', 345, 5.4],
      ['LAX 航站楼', 'Hyatt Regency LAX', 1.2, 0.1], ['Hyatt Regency LAX', 'Griffith Observatory', 22, 0.5],
      ['Hyatt Regency LAX', 'Venice Beach & Canals', 8, 0.3], ['Griffith Observatory', 'Venice Beach & Canals', 18, 0.6],
      ['Venice Beach & Canals', 'Santa Monica Pier', 3, 0.15], ['Santa Monica Pier', 'Sawtelle · KOJIMA', 5, 0.25],
      ['Sawtelle · KOJIMA', 'Hyatt Regency LAX', 10, 0.3], ['Sawtelle · KOJIMA', 'LAX 航站楼', 10, 0.3],
      ['Hyatt Regency LAX', 'Coso Junction SC', 165, 2.8], ['Coso Junction SC', 'Lone Pine', 36, 0.6],
      ['Coso Junction SC', 'Towne Pass', 70, 1.3], ['Lone Pine', 'Towne Pass', 52, 1.0], ['Towne Pass', 'Mesquite Flat Sand Dunes', 21, 0.4],
      ['Towne Pass', 'The Ranch at Death Valley', 44, 0.85], ['Mesquite Flat Sand Dunes', 'The Ranch at Death Valley', 24, 0.45],
      ['The Ranch at Death Valley', 'Zabriskie Point', 5, 0.15], ['The Ranch at Death Valley', 'Badwater Basin', 18, 0.35],
      ['Badwater Basin', "Artist's Palette", 14, 0.35], ["Artist's Palette", 'The Ranch at Death Valley', 12, 0.3],
      ["Artist's Palette", 'Mesquite Flat Sand Dunes', 34, 0.65], ['Zabriskie Point', "Dante's View", 20, 0.55],
      ['The Ranch at Death Valley', "Dante's View", 25, 0.65], ["Dante's View", 'Baker SC', 114, 2.0],
      ['The Ranch at Death Valley', 'Baker SC', 108, 1.9], ['Baker SC', 'LAX 航站楼', 190, 3.25], ['Baker SC', 'Hyatt Regency LAX', 190, 3.25],
    ]
  },

  checklist: {
    eyebrow: '05 / 出发前检查清单',
    titleHtml: '临出发前，<em>四件事逐项打钩。</em>',
    sub: '点一下卡片就能勾选，勾选结果会留在当前浏览器里。',
    items: [
      {
        id: 'offline-maps',
        title: '下载离线地图',
        desc: 'Google Maps 和特斯拉车机下满 Inyo County、Lone Pine、Death Valley、Baker。',
        html: '手机 Google Maps 和特斯拉车机都要提前下满 <strong>Inyo County、Lone Pine、Death Valley 和 Baker</strong> 的离线包。进谷之后大部分地方没信号。'
      },
      {
        id: 'j1772-adapter',
        title: '带 J1772 转接头',
        desc: 'Hyatt Valet 和 The Ranch 慢充桩都是 J1772 接口，没带充不上。',
        html: '确认 Cybertruck 车上放好了官方 <strong>J1772 转 NACS 转接头</strong>。Hyatt LAX Valet 和 The Ranch 园区慢充都是 J1772 口，没带就充不上。'
      },
      {
        id: 'park-pass',
        title: '年卡和预约确认邮件',
        desc: 'America the Beautiful 年卡（省 $30），预约邮件与航班信息存截屏。',
        html: '带上 <strong>America the Beautiful 国家公园年卡</strong>（省 $30 门票）。把 KOJIMA 预约确认邮件、凯悦房单和 DL0738 / DL0676 航班信息截屏存好。'
      },
      {
        id: 'windproof-layers',
        title: '防风保暖外套',
        desc: "3 人都带抓绒或防风外套，Dante's View 与夜里看星只有 5°C-8°C。",
        html: "三个人都要带抓绒或防风外套。清晨天文台、死亡谷晚上看星空，以及 5,500 英尺的 <strong>Dante's View 清晨体感只有 5°C-8°C</strong>，风吹着很冷。"
      }
    ],
    sourceBarLabel: '行前查路况与预订',
    sources: [
      { label: 'NPS 死亡谷路况 ↗', url: 'https://www.nps.gov/deva/planyourvisit/conditions.htm' },
      { label: 'California QuickMap ↗', url: 'https://quickmap.dot.ca.gov' },
      { label: 'Tesla 超充地图 ↗', url: 'https://www.tesla.com/findus' },
      { label: 'The Ranch 官网 ↗', url: 'https://www.oasisatdeathvalley.com/lodging/the-ranch-at-death-valley/' },
      { label: 'Hyatt Regency LAX ↗', url: 'https://www.hyatt.com/hyatt-regency/en-US/laxla-hyatt-regency-los-angeles-international-airport' }
    ]
  },

  mobile: {
    regions: [
      { id: 'all', label: '全部 9 站' },
      { id: 'la', label: '洛杉矶 4 站' },
      { id: 'dv', label: '死亡谷 5 站' }
    ],
    vaultTitle: '地址与航班速查',
    vaultHint: '点一下就能复制',
    vaultItems: [
      { label: 'KOJIMA 板前割烹', value: '2130 Sawtelle Blvd, Los Angeles, CA', sub: '11.27 19:45-21:45 · 确认号见个人 Tock App / 邮件', navQuery: '2130 Sawtelle Blvd, Los Angeles, CA' },
      { label: '纽约往返航班号', value: 'DL0738 / DL0676', sub: '11.26 傍晚到 LAX · 11.30 22:00+ 飞 JFK', copyAlt: 'DL0738' },
      { label: 'Hyatt Regency LAX', value: '6225 W Century Blvd, Los Angeles, CA', sub: 'Regency Suite King · Valet L2 慢充 · 确认号见个人 App', navQuery: 'Hyatt Regency Los Angeles International Airport' },
      { label: '威尼斯露天大车场', value: '2100 Ocean Front Walk, Venice, CA', sub: '11.27 13:00 · 走 Pershing Dr 避开 I-405', navQuery: '2100 Ocean Front Walk, Venice, CA' },
      { label: '圣莫尼卡南侧平地车场', value: '2030 Ocean Ave, Santa Monica, CA', sub: '11.27 15:45 · Lot 4 South 避开商圈堵点', navQuery: 'Beach Parking Lot 4 South, 2030 Ocean Ave, Santa Monica, CA' },
      { label: 'Sawtelle 露天车场', value: 'Mississippi Ave & Sawtelle Blvd, Los Angeles, CA', sub: '11.27 19:25 · KOJIMA + 1 楼 Nijiya 采买', navQuery: 'Mississippi Ave & Sawtelle Blvd, Los Angeles, CA' },
      { label: 'The Ranch at Death Valley', value: 'Highway 190, Furnace Creek, CA 92328', sub: '11.28-30 Cottage 两晚 · 园区 L2 慢充', navQuery: 'The Ranch at Death Valley, Furnace Creek, CA' }
    ],
    progressTitle: '四站充电进度',
    progressHint: '充完点一下打钩',
    progressSteps: [
      { id: 'c1', name: 'Hyatt LAX Valet 慢充', target: '11.26-27 每晚充过夜（带 J1772 转接头）' },
      { id: 'c2', name: 'Coso Junction 超充', target: '11.28 充到 90%-95% 再翻 Towne Pass' },
      { id: 'c3', name: 'The Ranch 园区慢充', target: '11.29 睡前在特斯拉 App 把限额调成 100%' },
      { id: 'c4', name: 'Baker 超充', target: '11.30 下山回电后充到 85%-90% 回 LA' }
    ],
    checklistTitle: '出发前 4 项检查',
    checklistHint: '与完整版同步',
    stepActionRules: [
      { match: 'KOJIMA', copy: '2130 Sawtelle Blvd, Los Angeles, CA', copyLabel: '复制餐厅地址', nav: '2130 Sawtelle Blvd, Los Angeles, CA' },
      { match: '2100 Ocean Front Walk', copy: '2100 Ocean Front Walk, Venice, CA', copyLabel: '复制车场地址', nav: '2100 Ocean Front Walk, Venice, CA' },
      { match: '2030 Ocean Ave', copy: '2030 Ocean Ave, Santa Monica, CA', copyLabel: '复制南场地址', nav: '2030 Ocean Ave, Santa Monica, CA' },
      { match: 'Mississippi Ave', copy: 'Mississippi Ave & Sawtelle Blvd, Los Angeles, CA', copyLabel: '复制车场地址', nav: 'Mississippi Ave & Sawtelle Blvd, Los Angeles, CA' },
      { match: '格里菲斯天文台', nav: 'Griffith Observatory, Los Angeles, CA' },
      { match: 'Kettleman City', nav: 'Tesla Supercharger, Kettleman City, CA' },
      { match: 'Coso Junction', nav: 'Coso Junction Tesla Supercharger, CA' },
      { match: 'Towne Pass', nav: 'Towne Pass, Death Valley, CA' },
      { match: 'The Ranch at Death Valley', nav: 'The Ranch at Death Valley, Furnace Creek, CA' },
      { match: 'Zabriskie Point', nav: 'Zabriskie Point, Death Valley, CA' },
      { match: 'Badwater Basin', nav: 'Badwater Basin, Death Valley, CA' },
      { match: "Artist's Drive", nav: 'Artists Palette, Death Valley, CA' },
      { match: 'Mesquite Flat', nav: 'Mesquite Flat Sand Dunes, Death Valley, CA' },
      { match: "Dante's View", nav: 'Dantes View, Death Valley, CA' },
      { match: 'Baker Supercharger', nav: 'Baker Tesla Supercharger, Baker, CA' },
      { match: 'DL0738', copy: 'DL0738', copyLabel: '复制航班 DL0738' },
      { match: 'DL0676', copy: 'DL0676', copyLabel: '复制航班 DL0676' },
      { match: 'Hyatt Regency LAX', copy: '6225 W Century Blvd, Los Angeles, CA', copyLabel: '复制酒店地址', nav: 'Hyatt Regency Los Angeles International Airport' }
    ],
    offlineTip: {
      title: '死亡谷无信号提醒',
      body: '进谷前用手机浏览器打开过本页（或添加到主屏幕）后，时间表、地址、照片和检查清单在没信号时也能照常看。',
      links: [
        { label: 'NPS 死亡谷路况 ↗', url: 'https://www.nps.gov/deva/planyourvisit/conditions.htm' },
        { label: '加州实时路况 ↗', url: 'https://quickmap.dot.ca.gov' },
        { label: 'Tesla 超充地图 ↗', url: 'https://www.tesla.com/findus' }
      ]
    }
  },

  footer: {
    brand: 'LA & DEATH VALLEY',
    tagline: '2026 感恩节 3 人行程 · 洛杉矶与死亡谷 Cybertruck 自驾。',
    defaultRouteHtml: '纽约飞 LAX + San Jose 开车到 LA → 死亡谷<br>2026.11.26 汇合 · 11.30 返程',
    routeByPlan: {
      sj_driver: 'San Jose → LAX → 死亡谷 → San Jose<br>2026.11.26 出发 · 11.30 送机 / 12.1 回湾区'
    },
    topLabel: '回到顶部 ↑'
  }
};
