export const servicesData = [
  // 1. إدارة الأصول
  {
    serviceId: 'assetManagement',
    icon: '/icons/briefcase.svg',
    title: {
      ar: 'إدارة الأصول',
      en: 'Asset Management',
    },
    description: {
      ar: 'توفر نمو المالية خدمات إدارة الأصول عبر الصناديق والمحافظ الاستثمارية، بهدف تحقيق نمو مستدام لرأس المال على المدى المتوسط والطويل. يشمل ذلك دراسة الفرص الاستثمارية بعناية، وإجراء الفحص النافي للجهالة، ثم جمع رؤوس الأموال خلال فترة طرح محددة، يليها تشغيل الصندوق والتخارج بعد تحقيق الأهداف.',
      en: 'Nomw Capital provides asset management services through investment funds and portfolios, aiming to achieve sustainable capital growth over the medium to long term. This involves carefully studying investment opportunities, conducting due diligence, and raising capital within a specified offering period. The fund is then operated and exited upon achieving its targeted objectives.',
    },
    types: [
      { ar: 'أنواع الصناديق التي نديرها', en: 'Types of Funds We Manage' },
    ],
    items: [
      { ar: 'صناديق الاستثمار العقاري', en: 'Real estate investment funds' },
      { ar: 'صناديق الملكية الخاصة', en: 'Private equity funds' },
      {
        ar: 'أسواق النقد وأسواق المال',
        en: 'Money Markets and Financial Markets',
      },
    ],
    hasSubServices: true,
    subServices: [
      {
        serviceId: 'realEstateInvestment',
        icon: '/icons/building.svg',
        title: {
          ar: 'صناديق الاستثمار العقاري',
          en: 'Real Estate Investment Funds',
        },
        description: {
          ar: 'تشمل الصناديق العامة والخاصة، مثل صناديق تطوير البنية التحتية، التطوير الإنشائي، والصناديق المدرة للدخل.',
          en: 'These include public and private funds focused on the development and acquisition of income-generating.',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'privateFunds',
        icon: '/icons/chart-line.svg',
        title: {
          ar: 'صناديق الملكية الخاصة',
          en: 'Private Equity Funds',
        },
        description: {
          ar: 'تستهدف الاستحواذ على حصص في شركات بمختلف القطاعات، مثل: الضيافة، الأغذية، الرعاية الصحية، التعليم، التطبيقات وتوصيل الطلبات، التقنيات الدفاعية، والحياة الفطرية.',
          en: 'These funds aim to acquire equity stakes in companies across various sectors such as healthcare, agriculture, education, logistics, defense technologies, and consumer goods.',
        },
        types: [],
        items: [
          { ar: 'الضيافة', en: 'Hospitality' },
          { ar: 'الأغذية', en: 'Food & Beverage' },
          { ar: 'الرعاية الصحية', en: 'Healthcare' },
          { ar: 'التعليم', en: 'Education' },
          { ar: 'التطبيقات وتوصيل الطلبات', en: 'Apps & Delivery' },
          { ar: 'التقنيات الدفاعية', en: 'Defense Technologies' },
          { ar: 'الحياة الفطرية', en: 'Wildlife' },
        ],
      },
      {
        serviceId: 'moneyMarkets',
        icon: '/icons/coins.svg',
        title: {
          ar: 'أسواق النقد وأسواق المال',
          en: 'Money Markets and Financial Markets',
        },
        description: {
          ar: 'تشمل إدارة المحافظ والصناديق التي تركز على أدوات أسواق النقد والمال.',
          en: 'This includes the management of portfolios and funds that focus on instruments in money markets and capital markets.',
        },
        types: [],
        items: [],
      },
    ],
    order: 1,
    isActive: true,
  },

  // 2. المصرفية الاستثمارية
  {
    serviceId: 'investmentBanking',
    icon: '/icons/chart-bar.svg',
    title: {
      ar: 'المصرفية الاستثمارية',
      en: 'Investment Banking',
    },
    description: {
      ar: 'تُقدم إدارة الخدمات المصرفية الاستثمارية في نمو المالية حلولًا متكاملة لتمكين العملاء من زيادة رأس المال عبر أدوات وأساليب مالية متنوعة، تشمل:',
      en: "Nomw Capital's investment banking division provides integrated solutions to empower clients to raise capital through various financial tools and methods, including:",
    },
    types: [],
    items: [
      { ar: 'الاكتتابات العامة والخاصة', en: 'Public and private offerings.' },
      { ar: 'شراء وبيع الأوراق المالية', en: 'Buying and selling securities.' },
      {
        ar: 'عمليات الاندماج والاستحواذ (M&A)',
        en: 'Mergers and acquisitions (M&A).',
      },
      {
        ar: 'إعادة هيكلة الشركات والتمويل',
        en: 'Corporate restructuring and financing.',
      },
    ],
    hasSubServices: true,
    subServices: [
      {
        serviceId: 'corporateFinance',
        icon: '/icons/building-2.svg',
        title: {
          ar: 'تمويل الشركات',
          en: 'Corporate Finance',
        },
        description: {
          ar: 'تقدّم نمو المالية حلولًا متوافقة مع مبادئ الشريعة الإسلامية لتمويل الشركات وتعزيز هيكلة رأس المال. وتشمل هذه الحلول:',
          en: "Corporates are financed to strengthen their capital structure through Sharia-compliant solutions. NOMW Capital's focus includes securing appropriate financing for business expansion through mergers and acquisitions, leveraged buyouts, general and budget financing, as well as asset financing and leasing.",
        },
        types: [],
        items: [
          {
            ar: 'تمويل التوسع عبر عمليات الاندماج والاستحواذ (M&A).',
            en: 'Expansion financing through M&A',
          },
          { ar: 'الاستحواذ بالرافعة المالية.', en: 'Leveraged buyouts' },
          {
            ar: 'التمويل العام وتمويل الميزانين (Mezzanine Financing)',
            en: 'General and mezzanine financing',
          },
          {
            ar: 'تمويل الأصول وتأجيرها وفق ضوابط شرعية',
            en: 'Asset financing and leasing',
          },
        ],
      },
      {
        serviceId: 'arrangementServices',
        icon: '/icons/settings.svg',
        title: {
          ar: 'خدمات الترتيب',
          en: 'Arrangement',
        },
        description: {
          ar: 'يتمتع فريق الخدمات المصرفية الاستثمارية في نمو المالية بخبرة عميقة ومتنوعة تُمكّنه من تقديم حلول استثمارية شاملة تشمل:',
          en: "NOMW Capital's investment banking team possesses strong and diverse investment experience, which enables it to provide a wide range of investment solutions. This also includes advisory services for capital raising through private and public offerings, issuance of Sharia-compliant sukuk and debt instruments, in addition to structuring various types of investments with optimal tax and legal advantages.",
        },
        types: [],
        items: [
          {
            ar: 'الاستشارات لرفع رأس المال من خلال الطرح العام والخاص',
            en: 'Advisory for capital raising',
          },
          { ar: 'إصدار أسهم حقوق أولوية', en: 'Rights issue' },
          {
            ar: 'إصدار الصكوك وأدوات الدين المتوافقة مع الشريعة',
            en: 'Sukuk and debt instruments',
          },
          {
            ar: 'هيكلة الاستثمارات بما يحقق أفضل المزايا الضريبية والقانونية للعملاء',
            en: 'Investment structuring',
          },
        ],
      },
      {
        serviceId: 'corporateRestructuring',
        icon: '/icons/refresh.svg',
        title: {
          ar: 'إعادة هيكلة الشركات',
          en: 'Corporate Restructuring',
        },
        description: {
          ar: 'نقدّم حلولًا لإعادة تنظيم الشركات ماليًا وتشغيليًا بهدف:',
          en: 'Corporate restructuring entails presenting options and alternatives for operational and financial reform in order to meet debt obligations and increase earnings, by analyzing the financial, legal, market, technical, and administrative aspects, as well as developing and implementing corporate exit or proper strategies in the event of bankruptcy.',
        },
        types: [],
        items: [
          { ar: 'تسوية المديونيات', en: 'Debt settlement' },
          {
            ar: 'تحسين الأداء وزيادة الربحية وذلك من خلال تحليل شامل للجوانب المالية، القانونية، السوقية، الفنية والإدارية، مع إعداد وتنفيذ استراتيجيات الخروج أو التعامل مع حالات الإفلاس بطريقة مهنية.',
            en: 'Performance improvement and profitability increase',
          },
        ],
      },
      {
        serviceId: 'strategicPlanning',
        icon: '/icons/target.svg',
        title: {
          ar: 'التخطيط الاستراتيجي والمالي',
          en: 'Strategic & Financial Planning',
        },
        description: {
          ar: 'نوفّر خدمات تخطيط مالي واستراتيجي شاملة تساعد الشركات على تحقيق أهدافها بسرعة وكفاءة، وتشمل:',
          en: 'Planning is an essential instrument for achieving business objectives swiftly and efficiently, which includes identifying appropriate strategies, developing financial models and business plans, and assisting with feasibility studies.',
        },
        types: [],
        items: [
          { ar: 'تحديد الاستراتيجيات المناسبة', en: 'Strategy identification' },
          {
            ar: 'إعداد النماذج المالية وخطط الأعمال',
            en: 'Financial modeling and business plans',
          },
          {
            ar: 'المساهمة في إعداد دراسات الجدوى الاقتصادية',
            en: 'Feasibility studies',
          },
        ],
      },
      {
        serviceId: 'privateEquityVenture',
        icon: '/icons/trending-up.svg',
        title: {
          ar: 'صناديق الملكية الخاصة ورأس المال الجريء',
          en: 'Private Equity & Venture Capital Funds',
        },
        description: {
          ar: 'تُعد استثمارات الملكية الخاصة ورأس المال الجريء من مجالات التركيز الرئيسية لدى "نمو المالية"، ويقدّم الفريق المتخصص باقة متكاملة تشمل:',
          en: 'Private equity investment is a core area of focus for NOMW Capital, thanks to the expertise of our specialized team. Services include: Fund formation, entity valuation, due diligence, governance, development of financial models, business plan, and proposal documents, as well as compliance with Capital Market Authority requirements, marketing opportunities, and arrangements with possible investors.',
        },
        types: [],
        items: [
          {
            ar: 'إنشاء الصناديق وتسجيلها',
            en: 'Fund formation and registration',
          },
          {
            ar: 'تقييم الكيانات وإجراء الفحص النافي للجهالة (Due Diligence) إعداد وثائق الحوكمة والنماذج المالية وخطط الأعمال',
            en: 'Entity valuation and due diligence',
          },
          {
            ar: 'التنسيق مع هيئة السوق المالية لاستيفاء المتطلبات التنظيمية',
            en: 'CMA compliance',
          },
          {
            ar: 'تسويق الفرص الاستثمارية الترتيب مع المستثمرين المحتملين',
            en: 'Marketing and investor arrangements',
          },
        ],
      },
    ],
    order: 2,
    isActive: true,
  },

  // 3. إدارة الثروات
  {
    serviceId: 'wealthManagement',
    icon: '/icons/chart-pie.svg',
    title: {
      ar: 'إدارة الثروات',
      en: 'Wealth Management',
    },
    description: {
      ar: 'تُقدِّم نمو المالية خدمات متكاملة في مجال إدارة الثروات تستهدف الأفراد ذوي الملاءة المالية العالية، إلى جانب الشركات والمؤسسات.\nوترتكز استراتيجيتنا على استقطاب الفرص الاستثمارية النوعية داخل المملكة العربية السعودية ومنطقة الشرق الأوسط، بعد إجراء تقييم دقيق للملاءة المالية للمستثمرين وفهم متطلباتهم وأهدافهم الاستثمارية، ومستويات المخاطر المحددة لكل مستثمر.\nكما نحرص على تصميم حلول استثمارية مخصصة تُحقق التوازن الأمثل بين العائد والمخاطر، وتُسهم في تنمية واستدامة الثروات على المدى الطويل.\nوتلتزم الشركة بأعلى معايير الشفافية والحوكمة، وتسعى إلى بناء شراكات استراتيجية طويلة المدة قائمة على الثقة والمصداقية والنمو المشترك.',
      en: "Nomw Capital provides comprehensive wealth management services targeting high-net-worth individuals, as well as corporations and institutions.\nOur strategy focuses on identifying and attracting high-quality investment opportunities within the Kingdom of Saudi Arabia and the Middle East, following a thorough assessment of each investor's financial standing, requirements, investment objectives, and defined risk levels.\nWe are committed to designing tailored investment solutions that achieve the optimal balance between return and risk, contributing to the growth and long-term sustainability of wealth.\nThe company adheres to the highest standards of transparency and governance and strives to build long-term strategic partnerships founded on trust, credibility, and mutual growth.",
    },
    types: [],
    items: [],
    hasSubServices: false,
    subServices: [],
    order: 3,
    isActive: true,
  },

  // 4. خدمات الحفظ
  {
    serviceId: 'custodyServices',
    icon: '/icons/shield.svg',
    title: {
      ar: 'خدمات الحفظ',
      en: 'Custody Services',
    },
    description: {
      ar: 'نمو المالية واحدة من اكبر مقدمي خدمات الحفظ في السوق السعودية لجميع أنواع الأصول الاستثمارية والأوراق المالية، المدرجة أو غير مدرجة، والمتوافقة مع مبادئ الشريعة الإسلامية، شاملة وتنافسية تتماشى مع افضل المعايير الدولية من خلال انظمة متطورة:',
      en: 'Nomw Capital provides a comprehensive range of securities custody and fund administration services designed to meet the needs of both public and private fund managers. These services ensure that all operations are executed efficiently and in full compliance with regulatory standards.\nNomw Capital is one of the leading custody service providers in the Saudi market, offering safekeeping for all types of investment assets and securities whether listed or unlisted in compliance with Sharia principles and in accordance with the highest international standards.\n\nThrough a fully developed and integrated system, the company provides:',
    },
    types: [],
    items: [
      {
        ar: 'فصل كامل لأصول العملاء',
        en: 'Full safekeeping of client assets.',
      },
      {
        ar: 'خدمات الحفظ في الأسواق السعودية والخليجية والدولية',
        en: 'Custody services in both local and GCC and international markets.',
      },
      {
        ar: 'خدمات إقراض واقتراض الأوراق المالية المدرجة في السوق السعودي لصالح العملاء',
        en: 'Lending and borrowing of securities in the Saudi market on behalf of clients.',
      },
      {
        ar: 'خدمات حفظ صناديق الاستثمار العقارية العامة والخاصة والمتداولة',
        en: 'Custody services for investment funds, including listed and traded funds.',
      },
      {
        ar: 'فتح و إدارة الحسابات المصرفية لدى البنوك المحلية واجراء عمليات الصندوق',
        en: 'Opening and managing investment accounts for fund operations.',
      },
      {
        ar: 'تأسيس الشركات ذات الاغراض الخاصة',
        en: 'Establishing special-purpose vehicles for fund operations.',
      },
      {
        ar: 'اعداد التقارير اللازمة لصالح العملاء',
        en: 'Preparing all required reports on behalf of clients.',
      },
    ],
    hasSubServices: false,
    subServices: [],
    order: 4,
    isActive: true,
  },

  // 5. خدمات تشغيل الصناديق
  {
    serviceId: 'securitiesOperations',
    icon: '/icons/file-text.svg',
    title: {
      ar: 'خدمات تشغيل الصناديق الاستثمارية الخاصة و العامة',
      en: 'Securities Custody Services',
    },
    description: {
      ar: 'نقدم خدمات تشغيل شاملة للصناديق الاستثمارية',
      en: 'We provide comprehensive fund administration services',
    },
    types: [],
    items: [
      {
        ar: 'إعداد صافي قيمة أصول الصندوق وحساب سعر الوحدة.',
        en: "Preparing the fund's Net Asset Value and per-unit price.",
      },
      {
        ar: 'إنشاء وإدارة الملفات المحاسبية ودفتر الأستاذ العام للصندوق.',
        en: 'Maintaining and reconciling accounting records for the fund.',
      },
      {
        ar: 'فتح و إدارة الحسابات المصرفية واجراء عمليات التسوية المصرفية للصندوق',
        en: "Managing subscriptions, redemptions, and transfers, and reconciling them with the fund's bank account.",
      },
      {
        ar: 'إعداد تقارير هيئة السوق المالية الدورية الخاصة بالصناديق.',
        en: 'Preparing regular financial statements and coordinating with fund managers and auditors.',
      },
      {
        ar: 'إعداد التقارير النصف سنوية/ السنوية في الوقت المناسب وفي الشكل والتفصيل المطلوب من قبل مدير الصندوق.',
        en: 'Preparing financial reports for submission to the Capital Market Authority.',
      },
      {
        ar: 'إعداد مسودة القوائم المالية بناء على معايير الهيئة السعودية للمراجعين والمحاسبين.',
        en: 'Assisting the fund manager during audits with external auditors.',
      },
      {
        ar: 'مساعدة مدير الصندوق في عملية المراجعة مع المراجع الخارجي.',
        en: 'Preparing Zakat and tax reports for the fund, as required by the Zakat, Tax, and Customs Authority.',
      },
      {
        ar: 'إعداد متطلبات الإقرار الزكوي للصندوق و إقرار ضريبة القيمة المضافة وضريبة الاستقطاع',
        en: "Maintaining the fund's investment records and data.",
      },
      {
        ar: 'الاحتفاظ ببيانات الاستثمار الخاصة بالصندوق',
        en: 'Maintaining investment data',
      },
    ],
    hasSubServices: false,
    subServices: [],
    order: 5,
    isActive: true,
  },
];
