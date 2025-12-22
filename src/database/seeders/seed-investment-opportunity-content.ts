import { Model } from 'mongoose';
import { InvestmentOpportunityContent, OpportunityContentType } from '../schemas/cms/investment-opportunity-content.schema';

export async function seedInvestmentOpportunityContent(
    investmentOpportunityContentModel: Model<InvestmentOpportunityContent>,
    forceReseed: boolean = false,
) {
    const existingCount = await investmentOpportunityContentModel.countDocuments();

    if (forceReseed && existingCount > 0) {
        console.log(`🗑️  Force reseed enabled - deleting ${existingCount} existing items...`);
        await investmentOpportunityContentModel.deleteMany({});
    } else if (existingCount > 0) {
        console.log(`⏭️  Skipping investment opportunity content seeding - ${existingCount} items already exist`);
        return;
    }

    const items: Partial<InvestmentOpportunityContent>[] = [
        // ==================== Hero Section ====================
        {
            title: {
                ar: 'كيف نقتنص الفرص ونخلق القيمة؟',
                en: 'How do we seize opportunities and create value?',
            },
            description: {
                ar: 'في شركة نمو المالية، نمتلك وصولاً حصريًا إلى مجموعة واسعة من الفرص الاستثمارية المتميزة، بفضل شبكتنا القوية من العلاقات مع المساهمين والشركاء الاستراتيجيين.\nهذا الدعم الاستثنائي يتيح لنا الوصول إلى رؤوس الأموال والموارد اللازمة لهيكلة وتصميم فرص استثمارية مبتكرة تلبي تطلعات عملائنا.\nو تعد خبرة مساهمينا وسمعتهم العريقة في الأسواق إحدى الركائز الأساسية التي تقوم عليها أنشطتنا الاستثمارية و نجاحاتنا المتواصلة.',
                en: 'At Nomw Financial, we have exclusive access to a wide range of distinguished investment opportunities, thanks to our strong network of relationships with shareholders and strategic partners.\nThis exceptional support allows us to access the capital and resources needed to structure and design innovative investment opportunities that meet our clients\' aspirations.\nThe experience and prestigious reputation of our shareholders in the markets is one of the fundamental pillars on which our investment activities and ongoing successes are built.',
            },
            type: OpportunityContentType.HERO,
            image: '/images/investment-hero.png',
            order: 1,
            isActive: true,
        },

        // ==================== Section Title: Strategic Work ====================
        {
            title: {
                ar: 'خطة العمل الاستراتيجية',
                en: 'Strategic Work Plan',
            },
            description: {
                ar: 'نتبع منهجية عمل واضحة تضمن تحقيق أهدافنا الاستثمارية',
                en: 'We follow a clear methodology that ensures achieving our investment goals',
            },
            type: OpportunityContentType.STRATEGIC_WORK_TITLE,
            order: 1,
            isActive: true,
        },

        // ==================== Strategic Work ====================
        {
            title: {
                ar: 'النزاهة والمهنية',
                en: 'Integrity and Professionalism',
            },
            description: {
                ar: 'تمثلان حجر الأساس في أسلوب عملنا، وتشكلان الرابط الحقيقي بيننا وبين عملائنا، مما انعكس إيجابًا على مستوى رضا المستثمرين ونجاحنا في توسيع شبكة علاقاتنا والأسواق المستهدفة.',
                en: 'They represent the cornerstone of our work approach and form the real bond between us and our clients, which has positively reflected on investor satisfaction and our success in expanding our network and target markets.',
            },
            type: OpportunityContentType.STRATEGIC_WORK,
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'تعزيز شبكة العلاقات',
                en: 'Strengthening Network Relations',
            },
            description: {
                ar: 'نعمل باستمرار على تطوير شبكة علاقاتنا بما يدعم قدراتنا في استقطاب الكفاءات والمواهب، وتمكيننا من هيكلة أفضل الصفقات الاستثمارية في التوقيت المناسب.',
                en: 'We continuously work on developing our network of relationships to support our capabilities in attracting competencies and talents, enabling us to structure the best investment deals at the right time.',
            },
            type: OpportunityContentType.STRATEGIC_WORK,
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'استراتيجيات مبتكرة',
                en: 'Innovative Strategies',
            },
            description: {
                ar: 'نوظف استراتيجيات ذكية تتيح لنا اقتناص الفرص في الأسواق المتخصصة التي تتميز بانخفاض مستوى المنافسة.',
                en: 'We employ smart strategies that enable us to seize opportunities in specialized markets characterized by low competition levels.',
            },
            type: OpportunityContentType.STRATEGIC_WORK,
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'التكيّف والتنوّع',
                en: 'Adaptability and Diversity',
            },
            description: {
                ar: 'نتكيف مع احتياجات عملائنا المختلفة، ونوسع نطاق خدماتنا لنقدم حلولاً استثمارية متخصصة تلبي طموحاتهم وتنسجم مع تطلعاتهم.',
                en: 'We adapt to our clients\' different needs and expand the scope of our services to provide specialized investment solutions that meet their ambitions and align with their aspirations.',
            },
            type: OpportunityContentType.STRATEGIC_WORK,
            order: 4,
            isActive: true,
        },

        // ==================== Section Title: Experience ====================
        {
            title: {
                ar: 'خبرة عريقة وسجل حافل بالإنجازات',
                en: 'Rich Experience and Track Record of Achievements',
            },
            description: {
                ar: 'نفتخر بخبرتنا الواسعة في مجال الاستثمار وإدارة الأصول',
                en: 'We take pride in our extensive experience in investment and asset management',
            },
            type: OpportunityContentType.EXPERIENCE_TITLE,
            order: 1,
            isActive: true,
        },

        // ==================== Experience ====================
        {
            title: {
                ar: 'إدارة تعاملات مالية ضخمة',
                en: 'Managing Massive Financial Transactions',
            },
            description: {
                ar: 'حيث تجاوزت الأصول تحت الإدارة ٦ مليار ريال سعودي عبر أسواق المال.',
                en: 'Where assets under management exceeded SAR 6 billion across capital markets.',
            },
            type: OpportunityContentType.EXPERIENCE,
            image: '/images/investment/portfolio.png',
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'خبرة متقدمة في برامج الاستثمار',
                en: 'Advanced Expertise in Investment Programs',
            },
            description: {
                ar: 'خبرة متقدمة في برامج الاستثمار العقاري وبرامج توريق الأصول داخل السوق السعودي.',
                en: 'Advanced expertise in real estate investment programs and asset securitization programs within the Saudi market.',
            },
            type: OpportunityContentType.EXPERIENCE,
            image: '/images/investment/programs.png',
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'خبرة واسعة في هيكلة صناديق',
                en: 'Extensive Experience in Fund Structuring',
            },
            description: {
                ar: 'خبرة واسعة في هيكلة صناديق الملكية الخاصة ورأس المال الجريء، مع تركيز خاص على تطوير الأعمال داخل المملكة العربية السعودية.',
                en: 'Extensive experience in structuring private equity and venture capital funds, with special focus on business development within Saudi Arabia.',
            },
            type: OpportunityContentType.EXPERIENCE,
            image: '/images/investment/funds.png',
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'إدارة وتشغيل الصناديق',
                en: 'Fund Management and Operations',
            },
            description: {
                ar: 'تقديم خدمة إدارة وتشغيل الصناديق، لعدد من الفرص والمشاريع الاستثمارية الجديدة والقائمة، سواء بصفتنا مدير للصندوق أو مستشارًا لعدد من الفرص والمشاريع الاستثمارية الجديدة والقائمة.',
                en: 'Providing fund management and operation services for various new and existing investment opportunities and projects, whether as fund manager or advisor for new and existing investment opportunities and projects.',
            },
            type: OpportunityContentType.EXPERIENCE,
            image: '/images/investment/management.jpg',
            order: 4,
            isActive: true,
        },
    ];

    await investmentOpportunityContentModel.insertMany(items);
    console.log(`✅ Investment Opportunity Content seeded successfully: ${items.length} items`);
    console.log(`   - Hero: 1 item`);
    console.log(`   - Section Titles: 2 items`);
    console.log(`   - Strategic Work: 4 items`);
    console.log(`   - Experience: 4 items`);
}
