const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// הגדרות
const inputFile = 'master.png'; // התמונה ששמרת
const outputDir = 'public/assets/icons'; // נתיב יעד (מותאם ל-Angular 17+)
// אם אתה בגרסה ישנה יותר של אנגולר, שנה ל: 'src/assets/icons'

// הגדלים הנדרשים לפי ה-manifest.json שבנינו
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	console.log(`🚀 מתחיל לייצר אייקונים מתוך ${inputFile}...`);

	try {
		// 2. לולאה על כל הגדלים
		for (const size of sizes) {
			await sharp(inputFile)
				.resize(size, size)
				.toFile(path.join(outputDir, `icon-${size}x${size}.png`));

			console.log(`✅ נוצר: icon-${size}x${size}.png`);
		}

		console.log('✨ כל האייקונים נוצרו בהצלחה בתיקייה: ' + outputDir);

	} catch (error) {
		console.error('❌ שגיאה:', error.message);
		console.log('טיפ: וודא שהקובץ master.png קיים בתיקייה הראשית');
	}
}

generateIcons();