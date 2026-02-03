# 🏠 איפה עידן גרה?

אתר פשוט שמציג את התשובה לשאלה הנצחית, עם אפשרות לעדכן.

## מה יש פה?

- **עמוד ראשי** (`/`) - מציג את התשובה
- **עמוד ניהול** (`/admin`) - עדכון התשובה (מוגן בסיסמה)

---

## 🚀 העלאה ל-Vercel (חינם!)

### שלב 1: העלאה ל-GitHub

1. צור repository חדש ב-GitHub
2. העלה את כל הקבצים:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/idan-website.git
   git push -u origin main
   ```

### שלב 2: יצירת פרויקט ב-Vercel

1. היכנס ל-[vercel.com](https://vercel.com) וצור חשבון (חינם)
2. לחץ "Add New Project"
3. ייבא את ה-repository מ-GitHub
4. Vercel יזהה אוטומטית שזה Next.js

### שלב 3: הגדרת Database (Vercel KV)

1. בדשבורד של Vercel, לך ל-**Storage**
2. לחץ **Create Database** → בחר **KV**
3. תן שם (למשל `idan-kv`) ולחץ Create
4. לחץ **Connect to Project** ובחר את הפרויקט שלך

### שלב 4: הגדרת סיסמת אדמין

1. בפרויקט, לך ל-**Settings** → **Environment Variables**
2. הוסף משתנה:
   - Name: `ADMIN_PASSWORD`
   - Value: הסיסמה שתבחר
3. לחץ Save

### שלב 5: Deploy מחדש

1. לך ל-**Deployments**
2. לחץ על שלוש הנקודות ליד ה-deployment האחרון
3. בחר **Redeploy**

---

## ✨ זהו!

האתר שלך באוויר! תקבל כתובת כמו `idan-website.vercel.app`

**לעדכון התשובה:** היכנס ל-`yoursite.vercel.app/admin`

---

## 🌐 דומיין מותאם אישית (אופציונלי)

רוצה כתובת כמו `whereisidan.com`?

1. קנה דומיין (ב-Namecheap, GoDaddy, וכו')
2. ב-Vercel: Settings → Domains → Add
3. עקוב אחרי ההוראות להגדרת DNS

---

## 💻 הרצה מקומית

```bash
npm install
npm run dev
```

האתר יעלה ב-`http://localhost:3000`

> **הערה:** בהרצה מקומית ללא Vercel KV, התשובה תהיה קבועה (ברירת מחדל).
