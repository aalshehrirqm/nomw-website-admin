import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ManagementTeam } from '../schemas/cms/management-team.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

async function seedManagementTeam() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const managementTeamModel = app.get<Model<ManagementTeam>>(
    getModelToken(ManagementTeam.name),
  );

  console.log('🌱 Starting Management Team seeding...');

  try {
    // Clear existing data
    await managementTeamModel.deleteMany({});
    console.log('✅ Cleared existing management team data');

    // Team members data
    const members = [
      {
        name: {
          ar: 'تركي بن عبد العزيز بن مرشود',
          en: 'Turki Bin Abdulaziz bin Marshoud',
        },
        position: {
          ar: 'الرئيس التنفيذي والعضو المنتدب',
          en: 'Managing Director and CEO',
        },
        bio: {
          ar: 'الرئيس التنفيذي والعضو المنتدب لشركة نمو المالية. يمتلك الأستاذ تركي خبرة مهنية تمتد لأكثر من عشرين عامًا في مجالات الاستثمار، وإدارة المخاطر، والعمليات، والالتزام، ومكافحة غسل الأموال وتمويل الإرهاب، فقد شغل سابقًا منصب الرئيس التنفيذي للعمليات في شركة الإنماء للاستثمار لمدة تجاوزت ١١ عامًا، حيث لعب دورًا محوريًا في تطوير البنية التحتية للعمليات وتنظيم أنشطة الأوراق المالية. ويواصل الأستاذ تركي اليوم دوره الفعّال في القيادة التنفيذية لشركة نمو المالية، من خلال تقديم الاستشارات الاستثمارية، وهيكلة وإدارة صناديق الاستثمار العقاري، وصناديق الملكية الخاصة، والصناديق الوقفية، إلى جانب المشاركة في تأسيس وإطلاق الشركات داخل المملكة وخارجها. يحمل الأستاذ تركي درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود، إلى جانب عدد من الشهادات المهنية المتخصصة من جهات تنظيمية ودولية معتمدة، كما حصل على شهادات تنفيذية أخرى من كلية هارفارد للأعمال وغيرها من أبرز المؤسسات التعليمية.',
          en: "Mr. Turki brings over 20 years of professional experience in investment, risk management, operations, compliance, and anti-money laundering and counter-terrorist financing (AML/CTF). He previously served as Chief Operating Officer at Alinma Investment Company for more than 11 years, where he played a key role in developing the company's operational infrastructure and overseeing its securities activities. Today, Mr. Turki continues to lead as CEO of Nomw Capital, where he focuses on investment advisory, and the structuring and management of real estate investment funds, private equity funds, and endowment funds. He is also actively involved in founding and launching companies both in Saudi Arabia and internationally. He holds a bachelor's degree in Financial Management from King Saud University, along with a number of specialized professional certifications from recognized regulatory and international bodies, and has completed executive programs at Harvard Business School and other leading academic institutions.",
        },
        image:
          '/uploads/management-team/Turki-bin-Abdulaziz-bin-Oraifij-(CEO).png',
        order: 0,
        isActive: true,
      },
      {
        name: {
          ar: 'عبدالله بن عبد العزيز الغنام',
          en: 'Abdullah Bin Abdulaziz AlGhannam',
        },
        position: {
          ar: 'رئيس إدارة الاستثمار',
          en: 'Chief Investment Officer',
        },
        bio: {
          ar: 'يمتلك الأستاذ عبدالله الغنام خبرة واسعة في الاستثمارات البديلة وإدارة الأصول، حيث عمل سابقًا في قطاع الاستثمار العقاري، ويشرف حاليًا على محفظة صناديق استثمارية تتجاوز قيمتها ٦ مليارات ريال سعودي، تشمل مجالات الاستثمارات البديلة والملكية الخاصة. يحمل الأستاذ عبدالله درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود في الرياض، بالإضافة إلى عدد من الشهادات المهنية المعتمدة في إدارة الاستثمارات والثروات، حصل عليها من مؤسسات ومعاهد تدريبية مرموقة.',
          en: "Mr. Abdullah AlGhannam brings extensive experience in the field of alternative investments, with a particular focus on local and international real estate markets. He previously worked in real estate development and currently oversees the management of real estate and private equity investment funds. He manages an investment portfolio exceeding SAR 6 billion, covering a diverse range of alternative assets. Mr. Abdullah holds a Bachelor's degree in Financial Management from King Saud University in Riyadh and has obtained several accredited certifications in investment and wealth management from leading institutions.",
        },
        image: '/uploads/management-team/abdullah-alqasim.png',
        order: 1,
        isActive: true,
      },
      {
        name: {
          ar: 'عبدالله بن  مشبب الشهري',
          en: 'Abdullah Bin Mushabab AlShehri',
        },
        position: {
          ar: 'رئيس إدارة تطوير الأعمال',
          en: 'Head of Business Development',
        },
        bio: {
          ar: 'يشغل الأستاذ عبدالله الشهري حاليًا منصب رئيس إدارة تطوير الأعمال في شركة نمو المالية، ويُعد من الكفاءات البارزة في الشركة بخبرة تمتد لأكثر من ٩ سنوات في قطاع الخدمات المالية والإدارية. تولى سابقًا منصب مدير إدارة الحفظ والعمليات في الشركة خلال الفترة من عام ١٤٤١هـ حتى منتصف عام ١٤٤٦هـ، حيث أسهم في تطوير خدمات حفظ الأوراق المالية وتشغيل الصناديق الاستثمارية، مع التركيز على تعزيز الكفاءة التشغيلية وجودة الأداء. كما عمل سابقًا في شركة الإنماء للاستثمار بمنصب مسؤول أول في إدارة العمليات والمساندة، مما منحه خبرة تطبيقية عميقة في الأنظمة التشغيلية والاستثمارية. يحمل الأستاذ عبدالله شهادة الماجستير في الإدارة المالية من جامعة سانت توماس (الولايات المتحدة الأمريكية)، بالإضافة إلى درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود.',
          en: "Mr. Abdullah AlShehri currently serves as the Head of Business Development at Nomw Capital. He previously held the role of Head of Custody and Operations at the company from 2020 until mid-2025. With over 9 years of experience in financial and administrative services, Mr. AlShehri has developed strong expertise in securities custody and investment fund operations, gained through his tenure at Nomw Capital and his earlier role as Senior Officer in the Operations and Support Department at Alinma Investment. He holds a Master's degree in Financial Management from the University of St. Thomas in the United States and a Bachelor's degree in Financial Management from King Saud University.",
        },
        image: '/uploads/management-team/abdullah-alshehri.png',
        order: 2,
        isActive: true,
      },
      {
        name: {
          ar: 'محمد بن علي البارقي',
          en: 'Mohammed bin Ali Albarqi',
        },
        position: {
          ar: 'رئيس إدارة الحفظ و خدمات الاوراق المالية',
          en: 'Head of Custody & Securities Services',
        },
        bio: {
          ar: 'يتمتع بخبرة تزيد عن ١٧ عام في مجال اسواق المال، حيث شغل عدة مناصب مهمه خلال مسيرته المهنية، كان من ظمن الفريق المؤسس لخدمات الحفظ في البلاد المالية وعمل كمدير اول لحفظ الاوراق المالية فيها ، وكان يشغل مؤخراً منصب مدير إدارة حفظ الاوراق المالية والمقاصة في شركة الراجحي المالية، حيث شارك في تأسيس و اطلاق خدمات الاوراق المالية في شركة الراجحي المالية. حاصل على درجة البكالوريوس في الادارة المالية من جامعة تاكساس بالولايات المتحدة الامريكة ودبلوم من معهد الادارة العامة ، بالاضافة الى عدة شهادات مهنية في نفس المجال.',
          en: "Mr. Mohammed AlBarqi has more than 12 years of experience in the financial markets sector. During his professional career, he was part of the founding team for custody services at Albilad Financial Services and worked as a Senior Manager for Custody and Settlement Services. He later joined Al Rajhi Financial Company, where he established and launched securities custody services and served as their Head of Custody and Securities Services. Mr. Mohammed Al-Barqi holds a Bachelor's degree in Public Administration from Texas A&M University in the United States, in addition to several specialized certificates in the same field.",
        },
        image: '/uploads/management-team/mohammed-albarqi.png',
        order: 3,
        isActive: true,
      },
      {
        name: {
          ar: 'معاذ بن عبد العزيز القاسم',
          en: 'Moath Bin Abdulaziz Al-Qasem',
        },
        position: {
          ar: 'المدير المالي',
          en: 'Financial Manager',
        },
        bio: {
          ar: 'يشغل الأستاذ معاذ القاسم حاليًا منصب المدير المالي في شركة النمو المالية، حيث يتولى مسؤولية الإشراف الكامل على جميع الوظائف المالية، بما في ذلك المحاسبة، وإدارة الاستثمارات الخاصة بالشركة، وضمان كفاءة الأداء المالي والامتثال للمعايير المحاسبية والتنظيمية.يمتلك الأستاذ معاذ خبرة مهنية تزيد عن ٧ سنوات في القطاع المالي، عمل خلالها في مجالات متعددة تشمل الرقابة المالية، والمحاسبة، والتقارير التنظيمية. وقد شغل سابقًا منصب مشارك في الإدارة المالية لدى شركة الإنماء للاستثمار، حيث ساهم في دعم الأنشطة المالية وتطوير الكفاءة التشغيلية.يحمل الأستاذ معاذ درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود.',
          en: "Mr. Moath Al-Qasem currently serves as the Finance Manager at Nomw Capital, overseeing all financial functions of the company, including accounting and corporate investments. He brings over 7 years of experience in the financial sector, with a strong background in financial control and accounting. Prior to joining Nomw Capital, he held the position of Associate – Financial Management at Alinma Investment. Mr. Moath holds a Bachelor's degree in Financial Management from King Saud University.",
        },
        image: '/uploads/management-team/muath-alqasim.png',
        order: 4,
        isActive: true,
      },
      {
        name: {
          ar: 'مشبب بن سعد القحطاني',
          en: 'Mushabab Bin Saad AlQahtani',
        },
        position: {
          ar: 'رئيس المطابقة والإلتزام ومكافحة غسل الأموال',
          en: 'Head of Compliance & AML/TF',
        },
        bio: {
          ar: 'يمتلك الأستاذ مشبب القحطاني خبرة مهنية تمتد لأكثر من ١٩ عامًا في قطاع الخدمات المالية، مع تركيز خاص على الامتثال والمطابقة ومكافحة غسل الأموال وتمويل الإرهاب. شغل منصب مدير المطابقة والالتزام ومكافحة غسل الأموال وتمويل الإرهاب في إحدى الشركات المالية لمدة قاربت ٥ سنوات، حيث أسهم في تطوير وإدارة القسم، وتحديث السياسات والإجراءات بما يتوافق مع المتطلبات الرقابية والتشريعية. كما عمل لأكثر من ١٠ سنوات في شركة HSBC، وتدرّج في عدد من المناصب من بينها وسيط أسهم ثم مسؤول تطوير الأعمال، بالإضافة إلى عمله في بنك الرياض كمدير لحسابات الخدمة الذهبية. يحمل الأستاذ مشبب شهادة في المحاسبة، إلى جانب عدد من الشهادات المهنية المعتمدة من هيئة السوق المالية، وهو أيضًا عضو في جمعية الأخصائيين المعتمدين في مكافحة غسل الأموال (ACAMS) في الولايات المتحدة الأمريكية.',
          en: 'Mr. Mushabab AlQahtani brings over 16 years of experience in the financial and compliance sectors. He served as Director of Compliance, Anti-Money Laundering (AML), and Counter-Terrorist Financing (CTF) at a licensed financial institution for nearly five years, where he led the development and oversight of compliance frameworks and policy updates. His career spans over a decade at HSBC, where he held roles as a stockbroker and later as a Business Development Officer. He also worked at Riyad Bank as a Gold Service Account Manager. Mr. Mushabab holds a degree in Accounting and has earned multiple certifications from the Capital Market Authority (CMA). He is also a member of the Association of Certified Anti-Money Laundering Specialists (ACAMS), based in the United States.',
        },
        image: '/uploads/management-team/mushir-alqahtani.png',
        order: 5,
        isActive: true,
      },
      {
        name: {
          ar: 'عمرو بن محمد خيرعمر',
          en: 'Amr Mohammed KheirOmer',
        },
        position: {
          ar: 'رئيس العمليات و الخدمات المساندة',
          en: 'Chief Operating Officer',
        },
        bio: {
          ar: 'يشغل الأستاذ عمرو محمد خير عمر منصب رئيس العمليات في شركة النمو المالية، حيث يتولى الإشراف على إعداد تقارير الصناديق الاستثمارية، وتطوير وتنفيذ استراتيجية الشركة، وإدارة تقنية المعلومات، بالإضافة إلى الإشراف العام على الوظائف الإدارية. يمتلك الأستاذ عمرو خبرة مهنية تمتد لأكثر من ١٧ عامًا في مجالي الإدارة المالية والمراجعة، من بينها ٩ سنوات في القطاع المالي، شغل خلالها مناصب قيادية بارزة، من بينها منصب الرئيس المالي لكل من شركتي تنمية المالية ونمو المالية. كما عمل سابقًا كمساعد مدير لدى شركة إرنست ويونغ، يحمل الأستاذ عمرو درجة البكالوريوس في المحاسبة، وهو محاسب قانوني معتمد (FCCA) من المملكة المتحدة، بالإضافة إلى عدد من الشهادات المهنية المتخصصة في الشؤون المالية والمحاسبية.',
          en: "Mr. Amr serves as the Head of Operations at Nomw Capital, where he is responsible for overseeing investment fund reporting, strategy development, IT management, and general administrative functions. He brings over 17 years of combined experience in financial management and audit, including more than 9 years within the financial sector. Mr. Amr previously held senior leadership roles, including Chief Financial Officer at both Tanmeya Capital and Nomw Capital. He also previously also work as an Assistant Manager at Ernst & Young. Mr. Amr holds a Bachelor's degree in Accounting and is a Fellow of the Association of Chartered Certified Accountants (FCCA), United Kingdom. He also possesses multiple specialized professional certifications in finance.",
        },
        image: '/uploads/management-team/amr-mansour.png',
        order: 6,
        isActive: true,
      },
      {
        name: {
          ar: 'صالح بن عبدالرحمن الفريان',
          en: 'Saleh Bin Abdulrahman Alfaryan',
        },
        position: {
          ar: 'مدير إدارة الثروات',
          en: 'Head of Wealth Management',
        },
        bio: {
          ar: 'يشغل الاستاذ صالح بن عبدالرحمن الفريان منصب مدير إدارة الثروات في شركة نمو المالية حيث يتولى الإشراف على إدارة ثروات العملاء والبحث عن افضل الفرص الاستثمارية. يمتلك خبرة واسعة في مجال الاستثمار وإدارة الثروات والمجال القانوني لمدة تتجاوز ١٠ سنوات. يحمل الاستاذ صالح درجة البكالوريويس في الشريعة الاسلامية من جامعة الامام محمد بن سعود الاسلامية. كما يمتلك العديد من الخبرات الاستثمارية والقانونية والعديد من الشهادات المهنية في المجال المالي والقانوني من داخل وخارج المملكة.',
          en: "Mr. Saleh bin Abdulrahman Al-Faryan holds the position of Head of Wealth Management at Nomw Capital, where he oversees client wealth management and seeks the best investment opportunities. He possesses extensive experience in investment, wealth management, and legal affairs spanning over 10 years. Mr. Saleh holds a Bachelor's degree in Islamic Sharia from Imam Muhammad ibn Saud Islamic University. He also has extensive investment and legal expertise, along with numerous professional certifications in finance and law, obtained both within the Kingdom and internationally.",
        },
        image: '/uploads/management-team/saleh-alfaryan.png',
        order: 7,
        isActive: true,
      },
    ];

    // Insert all members
    const result = await managementTeamModel.insertMany(members);
    console.log(
      `✅ Successfully seeded ${result.length} management team members`,
    );

    console.log('\n📊 Seeded Members:');
    result.forEach((member, index) => {
      console.log(`   ${index + 1}. ${member.name.en} (${member.position.en})`);
    });

    console.log('\n🎉 Management Team seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding management team:', error);
    throw error;
  } finally {
    await app.close();
  }
}

seedManagementTeam()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
