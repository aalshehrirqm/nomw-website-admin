export const servicesData = [
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
    items: [],
    hasSubServices: true,
    subServices: [
      {
        serviceId: 'realEstateInvestment',
        icon: '/icons/building.svg',
        title: {
          ar: 'الاستثمار العقاري',
          en: 'Real Estate Investment',
        },
        description: {
          ar: 'استثمارات عقارية متنوعة',
          en: 'Diverse real estate investments',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'privateFunds',
        icon: '/icons/chart-line.svg',
        title: {
          ar: 'الصناديق الخاصة',
          en: 'Private Funds',
        },
        description: {
          ar: 'إدارة الصناديق الاستثمارية الخاصة',
          en: 'Private investment funds management',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'moneyMarkets',
        icon: '/icons/coins.svg',
        title: {
          ar: 'أسواق المال',
          en: 'Money Markets',
        },
        description: {
          ar: 'خدمات أسواق المال',
          en: 'Money market services',
        },
        types: [],
        items: [],
      },
    ],
    order: 1,
    isActive: true,
  },
  {
    serviceId: 'investmentBanking',
    icon: '/icons/chart-bar.svg',
    title: {
      ar: 'الخدمات المصرفية الاستثمارية',
      en: 'Investment Banking',
    },
    description: {
      ar: 'خدمات مصرفية استثمارية متكاملة',
      en: 'Comprehensive investment banking services',
    },
    types: [],
    items: [],
    hasSubServices: true,
    subServices: [
      {
        serviceId: 'corporateFinance',
        icon: '/icons/building-2.svg',
        title: {
          ar: 'التمويل المؤسسي',
          en: 'Corporate Finance',
        },
        description: {
          ar: 'حلول التمويل المؤسسي',
          en: 'Corporate financing solutions',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'arrangementServices',
        icon: '/icons/settings.svg',
        title: {
          ar: 'خدمات الترتيب',
          en: 'Arrangement Services',
        },
        description: {
          ar: 'خدمات ترتيب التمويل',
          en: 'Financing arrangement services',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'corporateRestructuring',
        icon: '/icons/refresh.svg',
        title: {
          ar: 'إعادة الهيكلة',
          en: 'Corporate Restructuring',
        },
        description: {
          ar: 'خدمات إعادة الهيكلة المؤسسية',
          en: 'Corporate restructuring services',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'strategicPlanning',
        icon: '/icons/target.svg',
        title: {
          ar: 'التخطيط الاستراتيجي',
          en: 'Strategic Planning',
        },
        description: {
          ar: 'استشارات التخطيط الاستراتيجي',
          en: 'Strategic planning consultancy',
        },
        types: [],
        items: [],
      },
      {
        serviceId: 'privateEquityVenture',
        icon: '/icons/trending-up.svg',
        title: {
          ar: 'الأسهم الخاصة والاستثمار الجريء',
          en: 'Private Equity & Venture Capital',
        },
        description: {
          ar: 'استثمارات الأسهم الخاصة ورأس المال الجريء',
          en: 'Private equity and venture capital investments',
        },
        types: [],
        items: [],
      },
    ],
    order: 2,
    isActive: true,
  },
  {
    serviceId: 'wealthManagement',
    icon: '/icons/chart-pie.svg',
    title: {
      ar: 'إدارة الثروات',
      en: 'Wealth Management',
    },
    description: {
      ar: 'خدمات إدارة الثروات الشخصية',
      en: 'Personal wealth management services',
    },
    types: [],
    items: [],
    hasSubServices: false,
    subServices: [],
    order: 3,
    isActive: true,
  },
  {
    serviceId: 'custodyServices',
    icon: '/icons/shield.svg',
    title: {
      ar: 'خدمات الحفظ',
      en: 'Custody Services',
    },
    description: {
      ar: 'خدمات حفظ الأوراق المالية',
      en: 'Securities custody services',
    },
    types: [],
    items: [],
    hasSubServices: false,
    subServices: [],
    order: 4,
    isActive: true,
  },
  {
    serviceId: 'securitiesOperations',
    icon: '/icons/file-text.svg',
    title: {
      ar: 'عمليات الأوراق المالية',
      en: 'Securities Operations',
    },
    description: {
      ar: 'خدمات عمليات الأوراق المالية',
      en: 'Securities operations services',
    },
    types: [],
    items: [],
    hasSubServices: false,
    subServices: [],
    order: 5,
    isActive: true,
  },
];
