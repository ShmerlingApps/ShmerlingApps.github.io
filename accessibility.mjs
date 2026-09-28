// Accessibility statement (English and Hebrew), as Israel's accessibility regulations ask of a website
// (Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 2013, reg. 35).
// Update the date whenever the site or the statement changes.

const UPDATED_EN = '28 September 2026'
const UPDATED_HE = '28 בספטמבר 2026'

export function buildAccessibility({ page, doc, mail, SITE }) {
  page('accessibility/', {
    title: 'Accessibility statement | Shmerling Apps',
    description: 'How the Shmerling Apps website meets WCAG 2.1 AA and Israeli Standard 5568, the accessibility menu, known limitations and how to contact us.',
    nav: 'accessibility',
    body: doc(`
<h1>Accessibility statement</h1>
<p class="updated">Last updated: ${UPDATED_EN} &middot; <a href="#he" lang="he">להצהרה בעברית</a></p>

<p>${SITE.name} wants everyone, including people with disabilities, to be able to use this website and our apps independently and with ease.</p>

<h2>Standard</h2>
<p>This website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. That includes the requirements of Israeli Standard 5568 (WCAG 2.0 level AA) under the Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 2013.</p>

<h2>What we did</h2>
<ul>
  <li>A clear page structure with headings, landmarks, a "Skip to content" link and the page language set.</li>
  <li>Everything works with the keyboard alone, with a visible frame around the focused item.</li>
  <li>Text has a contrast ratio of at least 4.5:1 against its background.</li>
  <li>Every image has a text alternative; decorative images are hidden from screen readers.</li>
  <li>The sliding screenshots can be paused, and motion stops when your device asks for reduced motion.</li>
  <li>The pages adapt to phones, tablets and computers and can be zoomed to 200%.</li>
  <li>The Downabit promo video has no spoken words: its text is shown on screen. It plays only when you press play.</li>
</ul>

<h2>The accessibility menu</h2>
<p>The round button with the accessibility figure, at the bottom left of every page, opens the accessibility menu: larger text, high contrast, highlighted links, readable text, stop animations and a strong focus outline. Your choices are kept in your browser for your next visit, and "Reset all" returns to the normal view.</p>

<h2>How we checked</h2>
<p>Automated checks with axe-core against WCAG 2.1 levels A and AA, and manual checks with the keyboard, in Chrome on Windows at desktop and narrow (phone-sized) widths.</p>

<h2>Known limitations</h2>
<ul>
  <li>Screenshots of our TV apps are pictures of a TV screen. Each has a text description, but small text inside a picture cannot be enlarged on its own.</li>
  <li>Links to Google Play and the Amazon Appstore lead to pages we do not control.</li>
</ul>
<p>If something on the site is hard to use, please tell us and we will fix it.</p>

<h2>Our apps</h2>
<p>Our apps are made for the TV remote. Five Dice also works with the TV's screen reader (TalkBack) and has read aloud, high contrast and numbers on the dice.</p>

<h2>Accessibility contact</h2>
<p>If you meet an accessibility problem on this website or in our apps, or need information in another format, write to ${mail}. Please describe the problem, the page, and the browser or device you use.</p>
<p class="muted">This statement was prepared on ${UPDATED_EN}.</p>

<section id="he" lang="he" dir="rtl" class="doc-he">
<h2>הצהרת נגישות</h2>
<p class="updated">עודכן לאחרונה: ${UPDATED_HE}</p>
<p>${SITE.name} רוצה שכל אחד ואחת, כולל אנשים עם מוגבלות, יוכלו להשתמש באתר ובאפליקציות שלנו באופן עצמאי ונוח.</p>

<h3>רמת הנגישות</h3>
<p>האתר שואף לעמוד בהנחיות הנגישות לתוכן אינטרנט (WCAG) 2.1 ברמה AA, הכוללות את דרישות התקן הישראלי ת"י 5568 (WCAG 2.0 ברמה AA), בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.</p>

<h3>מה עשינו</h3>
<ul>
  <li>מבנה דף ברור עם כותרות, אזורי ניווט, קישור "דלג לתוכן" והגדרת שפת הדף.</li>
  <li>אפשר להשתמש בכל האתר עם המקלדת בלבד, עם מסגרת גלויה סביב הפריט שבמיקוד.</li>
  <li>ניגודיות הטקסט מול הרקע היא לפחות 4.5:1.</li>
  <li>לכל תמונה יש טקסט חלופי; תמונות קישוט מוסתרות מקוראי מסך.</li>
  <li>אפשר לעצור את צילומי המסך המתחלפים, והתנועה נעצרת כשהמכשיר מבקש הפחתת תנועה.</li>
  <li>הדפים מתאימים את עצמם לטלפונים, לטאבלטים ולמחשבים, ואפשר להגדיל אותם עד 200%.</li>
  <li>בסרטון של Downabit אין דיבור: הטקסט מוצג על המסך. הוא מתנגן רק כשלוחצים על הפעלה.</li>
</ul>

<h3>תפריט הנגישות</h3>
<p>הכפתור העגול עם סמל הנגישות, בפינה השמאלית התחתונה של כל דף, פותח את תפריט הנגישות: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים, טקסט קריא, עצירת אנימציות ומסגרת מיקוד מודגשת. הבחירות נשמרות בדפדפן לביקור הבא, ו-"Reset all" מחזיר לתצוגה הרגילה.</p>

<h3>איך בדקנו</h3>
<p>בדיקה אוטומטית עם axe-core מול WCAG 2.1 ברמות A ו-AA, ובדיקה ידנית עם המקלדת ב-Chrome ב-Windows, ברוחב מחשב וברוחב של טלפון.</p>

<h3>מגבלות ידועות</h3>
<ul>
  <li>צילומי המסך של אפליקציות הטלוויזיה הם תמונות של מסך טלוויזיה. לכל אחד יש תיאור טקסט, אבל אי אפשר להגדיל לבד טקסט קטן שבתוך התמונה.</li>
  <li>הקישורים ל-Google Play ול-Amazon Appstore מובילים לדפים שאינם בשליטתנו.</li>
</ul>
<p>אם משהו באתר קשה לשימוש, ספרו לנו ונתקן.</p>

<h3>האפליקציות שלנו</h3>
<p>האפליקציות שלנו מיועדות לשלט של הטלוויזיה. Five Dice עובד גם עם קורא המסך של הטלוויזיה (TalkBack) וכולל הקראה בקול, ניגודיות גבוהה ומספרים על הקוביות.</p>

<h3>פנייה בנושא נגישות</h3>
<p>נתקלתם בבעיית נגישות באתר או באפליקציות שלנו, או שאתם צריכים מידע בפורמט אחר? כתבו לנו: <span dir="ltr">${mail}</span>. נא לתאר את הבעיה, את הדף ואת הדפדפן או המכשיר.</p>
<p class="muted">ההצהרה נערכה ב-${UPDATED_HE}.</p>
</section>`),
  })
}
