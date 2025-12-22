import { Model } from 'mongoose';
import { PeriodicReport, ReportType } from '../schemas/cms/periodic-report.schema';

export async function seedPeriodicReports(
    periodicReportModel: Model<PeriodicReport>,
) {

    // Use relative paths - schema toJSON will add the base URL
    const reports: Partial<PeriodicReport>[] = [
        // ==================== Board Reports (2015-2024) ====================
        // All board reports have only one file - used for both languages
        ...Array.from({ length: 10 }, (_, i) => {
            const year = 2024 - i;
            const fileUrl = `/uploads/reports/management/board-report-${year}.pdf`;
            return {
                title: {
                    ar: `تقرير مجلس الإدارة ${year}`,
                    en: `Board of Directors Report ${year}`,
                },
                type: ReportType.BOARD_REPORT,
                year,
                fileUrl,           // Backward compatibility
                fileUrlAr: fileUrl, // Same file for both languages
                fileUrlEn: fileUrl,
                publishDate: new Date(`${year}-12-31`),
                isActive: true,
            };
        }),

        // ==================== Financial Statements ====================

        // 2024 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2024', en: 'Financial Statements 2024' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2024,
            fileUrl: `/uploads/reports/financial-statements/NOMW Capital - FS - 2024  (AR).pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/NOMW Capital - FS - 2024  (AR).pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/NOMW Capital - FS - 2024  (EN).pdf`,
            publishDate: new Date('2024-12-31'),
            isActive: true,
        },

        // 2023 - Arabic only
        {
            title: { ar: 'القوائم المالية 2023', en: 'Financial Statements 2023' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2023,
            fileUrl: `/uploads/reports/financial-statements/financial-statement-2023-ar.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/financial-statement-2023-ar.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/financial-statement-2023-ar.pdf`,
            publishDate: new Date('2023-12-31'),
            isActive: true,
        },

        // 2022 - Arabic only
        {
            title: { ar: 'القوائم المالية 2022', en: 'Financial Statements 2022' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2022,
            fileUrl: `/uploads/reports/financial-statements/Signed FS 2022 - Arabic.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/Signed FS 2022 - Arabic.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed FS 2022 - Arabic.pdf`,
            publishDate: new Date('2022-12-31'),
            isActive: true,
        },

        // 2021 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2021', en: 'Financial Statements 2021' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2021,
            fileUrl: `/uploads/reports/financial-statements/Signed FS 2021 - Arabic.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/Signed FS 2021 - Arabic.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed FS 2021 - English.pdf`,
            publishDate: new Date('2021-12-31'),
            isActive: true,
        },

        // 2020 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2020', en: 'Financial Statements 2020' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2020,
            fileUrl: `/uploads/reports/financial-statements/Signed FS 2020 - Arabic.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/Signed FS 2020 - Arabic.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed FS 2020 - English.pdf`,
            publishDate: new Date('2020-12-31'),
            isActive: true,
        },

        // 2019 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2019', en: 'Financial Statements 2019' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2019,
            fileUrl: `/uploads/reports/financial-statements/Signed FS 2019 - Arabic.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/Signed FS 2019 - Arabic.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed FS 2019 - English.pdf`,
            publishDate: new Date('2019-12-31'),
            isActive: true,
        },

        // 2018 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2018', en: 'Financial Statements 2018' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2018,
            fileUrl: `/uploads/reports/financial-statements/Signed FS 2018 - Arabic.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/Signed FS 2018 - Arabic.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed FS 2018 - English.pdf`,
            publishDate: new Date('2018-12-31'),
            isActive: true,
        },

        // 2017 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2017', en: 'Financial Statements 2017' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2017,
            fileUrl: `/uploads/reports/financial-statements/NOMW Capital Consolidated - Arabic_2017.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/NOMW Capital Consolidated - Arabic_2017.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/NOMW Capital Consolidated - English_2017.pdf`,
            publishDate: new Date('2017-12-31'),
            isActive: true,
        },

        // 2016 - Has both Arabic and English versions
        {
            title: { ar: 'القوائم المالية 2016', en: 'Financial Statements 2016' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2016,
            fileUrl: `/uploads/reports/financial-statements/financial-statement-2016-ar.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/financial-statement-2016-ar.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/Signed consolidated FS (English) 2016.pdf`,
            publishDate: new Date('2016-12-31'),
            isActive: true,
        },

        // 2015 - Arabic only
        {
            title: { ar: 'القوائم المالية 2015', en: 'Financial Statements 2015' },
            type: ReportType.FINANCIAL_STATEMENT,
            year: 2015,
            fileUrl: `/uploads/reports/financial-statements/financial-statement-2015-ar.pdf`,
            fileUrlAr: `/uploads/reports/financial-statements/financial-statement-2015-ar.pdf`,
            fileUrlEn: `/uploads/reports/financial-statements/financial-statement-2015-ar.pdf`,
            publishDate: new Date('2015-12-31'),
            isActive: true,
        },

        // ==================== Pillar Three Reports (2015-2021) ====================
        // All pillar three reports have only one file - used for both languages
        ...Array.from({ length: 7 }, (_, i) => {
            const year = 2021 - i;
            const fileUrl = `/uploads/reports/pillar-three/Pillar-III-Report-${year}.pdf`;
            return {
                title: {
                    ar: `تقرير الركيزة الثالثة ${year}`,
                    en: `Pillar III Report ${year}`,
                },
                type: ReportType.PILLAR_THREE,
                year,
                fileUrl,           // Backward compatibility
                fileUrlAr: fileUrl, // Same file for both languages
                fileUrlEn: fileUrl,
                publishDate: new Date(`${year}-12-31`),
                isActive: true,
            };
        }),
    ];

    await periodicReportModel.insertMany(reports);
    console.log(`✅ Periodic Reports seeded successfully: ${reports.length} reports`);
    console.log(`   - Board Reports: 10`);
    console.log(`   - Financial Statements: 10`);
    console.log(`   - Pillar III Reports: 7`);
}
