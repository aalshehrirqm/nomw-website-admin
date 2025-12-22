import { Model } from 'mongoose';
import { BoardContent, BoardContentType } from '../schemas/cms/board-content.schema';

export async function seedBoardContent(
    boardContentModel: Model<BoardContent>,
    forceReseed: boolean = false,
) {
    const existingCount = await boardContentModel.countDocuments();

    if (forceReseed && existingCount > 0) {
        console.log(`🗑️  Force reseed enabled - deleting ${existingCount} existing board items...`);
        await boardContentModel.deleteMany({});
    } else if (existingCount > 0) {
        console.log(`⏭️  Skipping board content seeding - ${existingCount} items already exist`);
        return;
    }

    const items: Partial<BoardContent>[] = [
        // ==================== Hero ====================
        {
            title: {
                ar: 'مجلس الإدارة',
                en: 'Board of Directors',
            },
            description: {
                ar: 'يشرف مجلس إدارة شركة النمو المالية على تطبيق أعلى معايير الحوكمة والتطوير الاستراتيجي والامتثال التنظيمي، بما يضمن توجيه الشركة نحو تحقيق أهدافها بكفاءة وشفافية واستدامة.',
                en: 'The Board of Directors of Nomw Financial oversees the implementation of the highest standards of governance, strategic development, and regulatory compliance, ensuring the company is directed towards achieving its objectives with efficiency, transparency, and sustainability.',
            },
            type: BoardContentType.HERO,
            order: 1,
            isActive: true,
        },

        // ==================== Mission Title ====================
        {
            title: {
                ar: 'مهمتنا',
                en: 'Our Mission',
            },
            type: BoardContentType.MISSION_TITLE,
            order: 1,
            isActive: true,
        },

        // ==================== Mission Items ====================
        {
            title: {
                ar: 'وضع السياسات العامة والأهداف الاستراتيجية للشركة.',
                en: 'Setting the company\'s general policies and strategic objectives.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/document-text.svg',
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'تحديد المخاطر الاستثمارية وإدارتها بما يحقق توازن العوائد والمخاطر.',
                en: 'Identifying and managing investment risks to achieve a balance between returns and risks.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/shield-check.svg',
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'حماية حقوق المساهمين والحفاظ على أصول الشركة.',
                en: 'Protecting shareholders\' rights and preserving company assets.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/users.svg',
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'إعداد سياسات التعاقب الوظيفي للإدارة التنفيذية لضمان استمرارية الأعمال، والإشراف على تنفيذها.',
                en: 'Preparing succession policies for executive management to ensure business continuity and overseeing their implementation.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/briefcase.svg',
            order: 4,
            isActive: true,
        },
        {
            title: {
                ar: 'مراقبة تنفيذ السياسات واللوائح الداخلية والتأكد من الالتزام بها.',
                en: 'Monitoring the implementation of internal policies and regulations and ensuring compliance.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/chart-line.svg',
            order: 5,
            isActive: true,
        },
        {
            title: {
                ar: 'ترسيخ مبادئ النزاهة وتعزيز الالتزام بأعلى المعايير الأخلاقية في جميع تعاملات الشركة.',
                en: 'Establishing integrity principles and promoting commitment to the highest ethical standards in all company dealings.',
            },
            type: BoardContentType.MISSION_ITEM,
            icon: '/icons/badge-check.svg',
            order: 6,
            isActive: true,
        },

        // ==================== Members Section ====================
        {
            title: {
                ar: 'تعرف على أعضاء مجلس الإدارة',
                en: 'Meet the Board Members',
            },
            description: {
                ar: 'قيادة بخـــبرة ورؤية تصنع الفرق ...',
                en: 'Leadership with experience and vision that makes the difference...',
            },
            type: BoardContentType.MEMBERS_SECTION,
            order: 1,
            isActive: true,
        },

        // ==================== Members ====================
        {
            title: {
                ar: 'الأستاذ/ عبدالله بن محمد الغماس',
                en: 'Mr. Abdullah bin Mohammed Al-Ghamas',
            },
            position: {
                ar: 'رئيس مجلس الإدارة',
                en: 'Chairman of the Board',
            },
            description: {
                ar: 'رائد أعمال ومؤسس ومالك لعديد من الشركات في قطاعات العقار والأغذية. يمتلك سجلًا حافلًا بالنجاحات في تأسيس وإدارة الشركات، ويشغل منصب رئيس مجلس الإدارة في عدد من الكيانات التجارية البارزة. يحمل درجة الدبلوم.',
                en: 'An entrepreneur, founder, and owner of numerous companies in real estate and food sectors. He has an impressive track record of successes in establishing and managing companies, and serves as Chairman of the Board in several prominent business entities. He holds a diploma degree.',
            },
            type: BoardContentType.MEMBER,
            image: '/images/board/member-1.jpg',
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'الأستاذ/ تركي بن عبدالعزيز بن مرشود',
                en: 'Mr. Turki bin Abdulaziz bin Marshoud',
            },
            position: {
                ar: 'الرئيس التنفيذي و العضو المنتدب',
                en: 'CEO and Managing Director',
            },
            description: {
                ar: 'يمتلك الأستاذ تركي خبرة مهنية تمتد لأكثر من عشرين عامًا في مجالات الاستثمار، وإدارة المخاطر، والعمليات، والالتزام، ومكافحة غسل الأموال وتمويل الإرهاب، فقد شغل سابقًا منصب الرئيس التنفيذي للعمليات في شركة الإنماء للاستثمار لمدة تجاوزت ١١ عامًا، حيث لعب دورًا محوريًا في تطوير البنية التحتية للعمليات وتنظيم أنشطة الأوراق المالية. ويواصل الأستاذ تركي اليوم دوره الفعّال في القيادة التنفيذية لشركة نمو المالية، من خلال تقديم الاستشارات الاستثمارية، وهيكلة وإدارة صناديق الاستثمار العقاري، وصناديق الملكية الخاصة، والصناديق الوقفية، إلى جانب المشاركة في تأسيس وإطلاق الشركات داخل المملكة وخارجها. يحمل الأستاذ تركي درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود، إلى جانب عدد من الشهادات المهنية المتخصصة من جهات تنظيمية ودولية معتمدة، كما حصل على شهادات تنفيذية أخرى من كلية هارفارد للأعمال وغيرها من أبرز المؤسسات التعليمية.',
                en: 'Mr. Turki has professional experience spanning over twenty years in investment, risk management, operations, compliance, and anti-money laundering and terrorism financing. He previously served as Chief Operating Officer at Al Inma Investment for over 11 years, playing a pivotal role in developing the operational infrastructure and organizing securities activities. Today, Mr. Turki continues his effective role in the executive leadership of Nomw Financial, providing investment consultancy, structuring and managing real estate investment funds, private equity funds, and endowment funds, in addition to participating in establishing and launching companies inside and outside the Kingdom. Mr. Turki holds a Bachelor\'s degree in Financial Management from King Saud University, along with several specialized professional certificates from accredited regulatory and international bodies, as well as executive certificates from Harvard Business School and other leading educational institutions.',
            },
            type: BoardContentType.MEMBER,
            image: '/images/board/member-2.jpg',
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'الدكتور/ محمد بن عبدالرحمن الجبرين',
                en: 'Dr. Mohammed bin Abdulrahman Al-Jubreen',
            },
            position: {
                ar: 'نائب رئيس مجلس الإدارة',
                en: 'Vice Chairman of the Board',
            },
            description: {
                ar: 'يتمتع بخبرة تتجاوز ٢٥ عامًا في المجالين الأكاديمي والمالي. عمل أستاذًا مساعدًا في جامعة الملك سعود بين عامي ١٤١٩هـ و١٤٢٤هـ، ويشغل حاليًا منصب نائب الرئيس للشؤون الأكاديمية والبحث العلمي في جامعة الأمير سلطان، حيث أسس مركز "ثراء" للدراسات المالية. كما شغل منصب نائب الرئيس التنفيذي للشؤون المالية في شركة رنا للاستثمار، وتولى مسؤولية إدارة تمويل الشركات, يحمل درجة البكالوريوس في إدارة الأعمال من جامعة الملك سعود (١٤٠٥هـ)، ودرجة الدكتوراه في المالية من جامعة ليهاي (الولايات المتحدة الأمريكية).',
                en: 'He has over 25 years of experience in academic and financial fields. He worked as an assistant professor at King Saud University between 1419H and 1424H, and currently serves as Vice President for Academic Affairs and Scientific Research at Prince Sultan University, where he founded the "Tharaa" Center for Financial Studies. He also served as Executive Vice President for Financial Affairs at Rana Investment Company and was responsible for corporate finance management. He holds a Bachelor\'s degree in Business Administration from King Saud University (1405H) and a PhD in Finance from Lehigh University (USA).',
            },
            type: BoardContentType.MEMBER,
            image: '/images/board/member-3.jpg',
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'الأستاذ/ مهند بن صالح الخويلد',
                en: 'Mr. Muhannad bin Saleh Al-Khuwailid',
            },
            position: {
                ar: 'عضو مجلس إدارة مستقل',
                en: 'Independent Board Member',
            },
            description: {
                ar: 'مؤسس ومالك شركة "مسك الإنماء" للتطوير العقاري منذ عام ١٤٣٩هـ، والرئيس التنفيذي السابق لشركة "الخويلد للاستثمارات العقارية" (١٤٣٨هـ – ١٤٤١هـ). عضو معتمد في الهيئة السعودية للمقيمين المعتمدين (تقييم)، وسبق له العمل كعضو هيئة تدريس في قسم الاقتصاد بجامعة القصيم (١٤٣٧هـ – ١٤٣٩هـ). يحمل درجة البكالوريوس في إدارة الأعمال – تخصص اقتصاد من جامعة نيو برونزويك (كندا).',
                en: 'Founder and owner of "Misk Al Inmaa" for Real Estate Development since 1439H, and former CEO of "Al-Khuwailid Real Estate Investments" (1438H – 1441H). He is an accredited member of the Saudi Authority for Accredited Valuers (Taqeem), and previously worked as a faculty member in the Economics Department at Qassim University (1437H – 1439H). He holds a Bachelor\'s degree in Business Administration – Economics from the University of New Brunswick (Canada).',
            },
            type: BoardContentType.MEMBER,
            image: '/images/board/member-4.jpg',
            order: 4,
            isActive: true,
        },
        {
            title: {
                ar: 'الأستاذ/ إياد بن عبدالله الراشد',
                en: 'Mr. Eyad bin Abdullah Al-Rashid',
            },
            position: {
                ar: 'عضو مجلس إدارة مستقل',
                en: 'Independent Board Member',
            },
            description: {
                ar: 'يتمتع بخبرة تزيد عن ١٧ عامًا في المراجعة الداخلية، الحوكمة، الالتزام، تقييم المخاطر، والرقابة الداخلية. يشغل حاليًا منصب مدير التخطيط وضمان الجودة في الشركة الوطنية للإسكان، وسبق له العمل في عدة مناصب قيادية في الهيئة العامة للغذاء والدواء. يحمل درجة البكالوريوس في إدارة الأعمال من جامعة عمان الأهلية (الأردن)، ودرجة الماجستير في إدارة الأعمال من جامعة سانت توماس (الولايات المتحدة الأمريكية).',
                en: 'He has over 17 years of experience in internal audit, governance, compliance, risk assessment, and internal control. He currently serves as Planning and Quality Assurance Manager at the National Housing Company, and previously held several leadership positions at the Saudi Food and Drug Authority. He holds a Bachelor\'s degree in Business Administration from Al-Ahliyya Amman University (Jordan) and an MBA from the University of St. Thomas (USA).',
            },
            type: BoardContentType.MEMBER,
            image: '/images/board/member-5.jpg',
            order: 5,
            isActive: true,
        },

        // ==================== Committees Section ====================
        {
            title: {
                ar: 'لجان مجلس الإدارة',
                en: 'Board Committees',
            },
            description: {
                ar: 'تُعد اللجان المنبثقة عن مجلس الإدارة جزءاً جوهرياً من منظومة الحوكمة في النمو المالية، حيث تضطلع بأدوار تكاملية في دعم الإدارة التنفيذية، والإشراف على الجوانب التنظيمية والرقابية لضمان الكفاءة، والشفافية، والامتثال المستمر.',
                en: 'The committees emanating from the Board of Directors are an integral part of the governance system at Nomw Financial, playing complementary roles in supporting the executive management and overseeing regulatory and supervisory aspects to ensure efficiency, transparency, and continuous compliance.',
            },
            type: BoardContentType.COMMITTEES_SECTION,
            order: 1,
            isActive: true,
        },

        // ==================== Committees ====================
        {
            title: {
                ar: 'لجنة المراجعة',
                en: 'Audit Committee',
            },
            description: {
                ar: 'تُعد اللجنة جهة رقابة مستقلة تشرف على إعداد التقارير المالية، وتقييم نظم الرقابة الداخلية، وضمان الالتزام بالمعايير الأخلاقية المؤسسية. كما تعمل كحلقة وصل بين المراجع الخارجي والإدارات التنفيذية، مما يعزز مصداقية التقارير المالية وحوكمة الشركة.',
                en: 'The committee serves as an independent oversight body supervising the preparation of financial reports, evaluating internal control systems, and ensuring compliance with institutional ethical standards. It also serves as a link between the external auditor and executive departments, enhancing the credibility of financial reports and corporate governance.',
            },
            type: BoardContentType.COMMITTEE,
            icon: '/icons/document-text.svg',
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'لجنة الترشيحات والمكافآت',
                en: 'Nominations and Remuneration Committee',
            },
            description: {
                ar: 'تتولى اللجنة إعداد سياسة واضحة لمكافآت أعضاء مجلس الإدارة، والرئيس التنفيذي، وكبار التنفيذيين، إلى جانب وضع سياسات الحوافز والمكافآت بما يتماشى مع ثقافة الشركة وقيمها وأهدافها، ويُرسخ مبادئ العدالة والشفافية في التقييم والتحفيز.',
                en: 'The committee is responsible for preparing a clear policy for board members, CEO, and senior executives\' remuneration, as well as developing incentive and reward policies in line with the company\'s culture, values, and objectives, establishing principles of fairness and transparency in evaluation and motivation.',
            },
            type: BoardContentType.COMMITTEE,
            icon: '/icons/users.svg',
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'لجنة الالتزام و المخاطر',
                en: 'Compliance and Risk Committee',
            },
            description: {
                ar: 'تُعنى اللجنة بمتابعة التزام الشركة بكافة الأنظمة واللوائح المحلية والدولية، وتشرف على برامج مكافحة غسل الأموال وتمويل الإرهاب. كما تتولى متابعة تنفيذ برامج التدريب المستمر لموظفي الشركة في مجالات الامتثال وإدارة المخاطر.',
                en: 'The committee is responsible for monitoring the company\'s compliance with all local and international laws and regulations, and supervises anti-money laundering and terrorism financing programs. It also monitors the implementation of continuous training programs for company employees in compliance and risk management.',
            },
            type: BoardContentType.COMMITTEE,
            icon: '/icons/shield-check.svg',
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'لجنة الاستثمار',
                en: 'Investment Committee',
            },
            description: {
                ar: 'تسهم اللجنة في التوسع الاستراتيجي للشركة من خلال مراجعة الفرص الاستثمارية، وتوجيه قرارات الاستحواذ وتوزيع رأس المال، بما يضمن الالتزام بسياسات الاستثمار المتوافقة مع الشريعة الإسلامية، ويعزز تحقيق نمو مستدام وعوائد تنافسية للمستثمرين.',
                en: 'The committee contributes to the strategic expansion of the company by reviewing investment opportunities and guiding acquisition decisions and capital allocation, ensuring compliance with Sharia-compliant investment policies and promoting sustainable growth and competitive returns for investors.',
            },
            type: BoardContentType.COMMITTEE,
            icon: '/icons/trending-up.svg',
            order: 4,
            isActive: true,
        },
    ];

    await boardContentModel.insertMany(items);
    console.log(`✅ Board Content seeded successfully: ${items.length} items`);
    console.log(`   - Hero: 1 item`);
    console.log(`   - Mission Title: 1 item`);
    console.log(`   - Mission Items: 6 items`);
    console.log(`   - Members Section: 1 item`);
    console.log(`   - Members: 5 items`);
    console.log(`   - Committees Section: 1 item`);
    console.log(`   - Committees: 4 items`);
}
