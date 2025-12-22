import * as fs from 'fs';
import * as path from 'path';

// List of upload directories needed by the application
const uploadDirs = [
    'uploads',
    'uploads/awards',
    'uploads/hero-sections',
    'uploads/ceo-words',
    'uploads/board',
    'uploads/investment-opportunities',
    'uploads/reports',
    'uploads/management-team',
    'uploads/org-structure',
];

function ensureUploadDirectories() {
    console.log('🔧 Ensuring upload directories exist...\n');

    uploadDirs.forEach((dir) => {
        const dirPath = path.join(process.cwd(), dir);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`✅ Created: ${dir}`);

            // Create .gitkeep file to ensure directory is tracked by git
            const gitkeepPath = path.join(dirPath, '.gitkeep');
            fs.writeFileSync(gitkeepPath, '');
        } else {
            console.log(`✓ Exists: ${dir}`);
        }
    });

    console.log('\n✨ Upload directories ready!');
}

// Run when imported or executed directly
if (require.main === module) {
    ensureUploadDirectories();
}

export { ensureUploadDirectories };
