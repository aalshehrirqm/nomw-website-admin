import { Model } from 'mongoose';
import { GovernanceContent, GovernanceContentType } from '../schemas/cms/governance-content.schema';

export async function seedGovernanceContent(
    governanceContentModel: Model<GovernanceContent>,
    forceReseed: boolean = false,
) {
    const existingCount = await governanceContentModel.countDocuments();

    if (forceReseed && existingCount > 0) {
        console.log(`🗑️  Force reseed enabled - deleting ${existingCount} existing governance items...`);
        await governanceContentModel.deleteMany({});
    } else if (existingCount > 0) {
        console.log(`⏭️  Skipping governance content seeding - ${existingCount} items already exist`);
        return;
    }

    const items: Partial<GovernanceContent>[] = [
        // ==================== Hero ====================
        {
            title: {
                ar: 'إطار حوكمة الشركة',
                en: 'Corporate Governance Framework',
            },
            description: {
                ar: 'تعد الحوكمة المؤسسية عنصراً أساسياً في نجاح واستدامة الشركات المحلية والدولية. وفي النمو المالية نولي أهمية قصوى لتطبيق مبادئ الحوكمة بما يتوافق مع متطلبات الجهات التنظيمية في المملكة العربية السعودية.\nوقد قمنا بتطبيق إطار حوكمة شامل يعزز من مستوى الشفافية، ويسهم في خلق بيئة عمل مسؤولة، ويساعد على تقليل المخاطر، وبناء الثقة مع أصحاب المصالح من مستثمرين وشركاء وموظفين.',
                en: 'Corporate governance is a fundamental element in the success and sustainability of local and international companies. At Nomw Financial, we place utmost importance on applying governance principles in compliance with regulatory requirements in Saudi Arabia.\nWe have implemented a comprehensive governance framework that enhances transparency, contributes to creating a responsible work environment, helps reduce risks, and builds trust with stakeholders including investors, partners, and employees.',
            },
            type: GovernanceContentType.HERO,
            order: 1,
            isActive: true,
        },

        // ==================== Pillars Title ====================
        {
            title: {
                ar: 'ركائز الحوكمة المؤسسية في النمو المالية',
                en: 'Pillars of Corporate Governance at Nomw Financial',
            },
            type: GovernanceContentType.PILLARS_TITLE,
            order: 1,
            isActive: true,
        },

        // ==================== Pillars ====================
        {
            title: {
                ar: 'إدارة فعّالة للعمليات والإشراف المؤسسي.',
                en: 'Effective management of operations and corporate oversight.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/settings.svg',
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'تحفيز اتخاذ قرارات مسؤولة وأخلاقية.',
                en: 'Encouraging responsible and ethical decision-making.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/target.svg',
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'افصاح متوازن وفي الوقت المناسب',
                en: 'Balanced and timely disclosure.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/scale.svg',
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'الاعتراف الكامل بحقوق جميع الأطراف ذات العلاقة',
                en: 'Full recognition of the rights of all stakeholders.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/users.svg',
            order: 4,
            isActive: true,
        },
        {
            title: {
                ar: 'تحديد وإدارة المخاطر بكفاءة وفعالية',
                en: 'Efficient and effective risk identification and management.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/chart-bar.svg',
            order: 5,
            isActive: true,
        },
        {
            title: {
                ar: 'تعزيز الأداء المؤسسي وتقديم حوافز وتعويضات عادلة ومنصفة',
                en: 'Enhancing corporate performance and providing fair and equitable incentives and compensation.',
            },
            type: GovernanceContentType.PILLAR,
            icon: '/icons/trending-up.svg',
            order: 6,
            isActive: true,
        },

        // ==================== Commitment ====================
        {
            title: {
                ar: 'التزامنا',
                en: 'Our Commitment',
            },
            description: {
                ar: 'تلتزم شركة النمو المالية بالتطبيق الصارم لمبادئ السلوك المهني في جميع مستويات الشركة، حيث يُلزم كل من أعضاء مجلس الإدارة والإدارة التنفيذية والموظفين باتباع ممارسات مهنية تتماشى مع مبادئ الحوكمة المؤسسية المعتمدة. كما تلتزم الشركة بعدم الدخول في أي عقود تحتوي على مصالح جوهرية مباشرة أو غير مباشرة لأي من أعضاء مجلس الإدارة أو كبار التنفيذيين، وذلك لضمان أعلى مستويات النزاهة والشفافية.',
                en: 'Nomw Financial is committed to the strict application of professional conduct principles at all levels of the company. Board members, executive management, and employees are required to follow professional practices aligned with approved corporate governance principles. The company is also committed to not entering into any contracts containing material direct or indirect interests for any board members or senior executives, to ensure the highest levels of integrity and transparency.',
            },
            type: GovernanceContentType.COMMITMENT,
            order: 1,
            isActive: true,
        },

        // ==================== Sections ====================
        {
            title: {
                ar: 'الالتزام والامتثال',
                en: 'Compliance and Adherence',
            },
            description: {
                ar: 'تعتمد النمو المالية على مجموعة من السياسات والإجراءات الشاملة التي تهدف إلى ضمان الامتثال الكامل لجميع القواعد و اللوائح الصادرة عن هيئة السوق المالية السعودية. إضافة إلى الأنظمة الصادرة عن الجهات التنظيمية الأخرى في الأسواق التي تنشط بها الشركة. وتتولى لجنة الالتزام والمخاطر دوراً محورياً في مراقبة الامتثال لهذه القوانين والأنظمة، وتحديث الإجراءات الداخلية بما يتماشى مع المستجدات التشريعية، لضمان جاهزية الشركة واستمرارية التوافق مع المعايير الرقابية.',
                en: 'Nomw Financial relies on a comprehensive set of policies and procedures aimed at ensuring full compliance with all rules and regulations issued by the Saudi Capital Market Authority, in addition to regulations issued by other regulatory bodies in markets where the company operates. The Compliance and Risk Committee plays a pivotal role in monitoring compliance with these laws and regulations, and updating internal procedures in line with legislative developments, to ensure the company\'s readiness and continued alignment with regulatory standards.',
            },
            type: GovernanceContentType.SECTION,
            order: 1,
            isActive: true,
        },
        {
            title: {
                ar: 'السلوك الأخلاقي، النزاهة والاستقلالية',
                en: 'Ethical Conduct, Integrity and Independence',
            },
            description: {
                ar: 'تؤمن النمو المالية بأن النزاهة والسلوك الأخلاقي يشكّلان الأساس الراسخ لنجاحها المؤسسي واستدامة أعمالها. وتلتزم الشركة بتطبيق أعلى معايير الأخلاقيات في جميع مستوياتها، حيث يتوجب على الموظفين الإبلاغ عن أي مخالفات فعلية أو محتملة للقوانين أو مدونة السلوك. بما في ذلك حالات غسل الأموال، من خلال إدارة المطابقة والالتزام. ولتعزيز هذه الثقافة، تطبّق الشركة سياسة "الإبلاغ السري" التي تتيح للموظفين تقديم بلاغاتهم بسرية تامة، مما يُسهم في تحسين بيئة العمل المهنية، وزيادة مستوى الوعي والامتثال التنظيمي داخل الشركة.',
                en: 'Nomw Financial believes that integrity and ethical conduct form the solid foundation for its institutional success and business sustainability. The company is committed to applying the highest ethical standards at all levels, where employees are required to report any actual or potential violations of laws or code of conduct, including money laundering cases, through the Compliance and Conformity Department. To reinforce this culture, the company applies a "Confidential Reporting" policy that allows employees to submit their reports in complete confidentiality, contributing to improving the professional work environment and increasing the level of awareness and regulatory compliance within the company.',
            },
            type: GovernanceContentType.SECTION,
            order: 2,
            isActive: true,
        },
        {
            title: {
                ar: 'مكافحة غسل الأموال وتمويل الإرهاب',
                en: 'Anti-Money Laundering and Terrorism Financing',
            },
            description: {
                ar: 'تلتزم النمو المالية بتطبيق إجراءات صارمة وفقاً لمتطلبات هيئة السوق المالية السعودية، وذلك من خلال منظومة "اعرف عميلك" (KYC) والتي تشمل:',
                en: 'Nomw Financial is committed to implementing strict procedures in accordance with the requirements of the Saudi Capital Market Authority, through the "Know Your Customer" (KYC) system, which includes:',
            },
            list: [
                { ar: 'التحقق من هوية العملاء ومصادر أموالهم', en: 'Verifying customer identity and sources of funds' },
                { ar: 'المراقبة المستمرة للعمليات الاستثمارية', en: 'Continuous monitoring of investment operations' },
                { ar: 'تقديم التقارير النظامية إلى الجهات الرقابية المختصة', en: 'Submitting regulatory reports to competent regulatory authorities' },
                { ar: 'إجراء مراجعات إضافية لتعزيز مستوى الالتزام بالمعايير التنظيمية', en: 'Conducting additional reviews to enhance compliance with regulatory standards' },
            ],
            type: GovernanceContentType.SECTION,
            order: 3,
            isActive: true,
        },
        {
            title: {
                ar: 'المسؤولية الاجتماعية',
                en: 'Social Responsibility',
            },
            description: {
                ar: 'انطلاقًا من التزامها الراسخ بمبادئ الشريعة الإسلامية وقيم المسؤولية الاجتماعية، تسعى النمو المالية إلى أن تكون شريكًا فاعلًا في خدمة المجتمع والمساهمة في تنميته المستدامة. وتتجسد جهود الشركة في مجموعة من المبادرات التي تهدف إلى بناء مجتمع معرفي منتج، من أبرزها:',
                en: 'Based on its firm commitment to Islamic Sharia principles and social responsibility values, Nomw Financial strives to be an active partner in serving the community and contributing to its sustainable development. The company\'s efforts are embodied in a range of initiatives aimed at building a productive knowledge society, most notably:',
            },
            list: [
                { ar: 'دعم تطوير الجيل القادم من الكفاءات الوطنية.', en: 'Supporting the development of the next generation of national talents.' },
                { ar: 'رعاية المبادرات التعليمية النوعية.', en: 'Sponsoring quality educational initiatives.' },
                { ar: 'دعم المؤسسات التعليمية المتميزة على مستوى المملكة.', en: 'Supporting distinguished educational institutions across the Kingdom.' },
            ],
            footer: {
                ar: 'وتؤكد هذه المبادرات حرص النمو المالية على الإسهام الإيجابي في بناء مجتمع مزدهر ومستدام، انسجامًا مع رؤية المملكة ٢٠٣٠ ودور القطاع الخاص في التنمية الشاملة.',
                en: 'These initiatives confirm Nomw Financial\'s commitment to positively contributing to building a prosperous and sustainable society, in line with Saudi Vision 2030 and the role of the private sector in comprehensive development.',
            },
            type: GovernanceContentType.SECTION,
            order: 4,
            isActive: true,
        },
    ];

    await governanceContentModel.insertMany(items);
    console.log(`✅ Governance Content seeded successfully: ${items.length} items`);
    console.log(`   - Hero: 1 item`);
    console.log(`   - Pillars Title: 1 item`);
    console.log(`   - Pillars: 6 items`);
    console.log(`   - Commitment: 1 item`);
    console.log(`   - Sections: 4 items`);
}
