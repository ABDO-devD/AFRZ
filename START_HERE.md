# 🚀 ابدأ هنا - دليل 60 ثانية

## ⚡ البدء الفوري (بدون Firebase)

```bash
npm install
npm run dev
```

1. افتح المتصفح
2. في صفحة Login، اضغط: **"الدخول بدون مصادقة"**
3. 🎉 **جاهز!** استكشف النظام

---

## 🔥 مع Firebase (15 دقيقة)

### خطوة 1: إنشاء مشروع
1. اذهب إلى [console.firebase.google.com](https://console.firebase.google.com)
2. أنشئ مشروع جديد

### خطوة 2: تفعيل الخدمات
- ✅ **Authentication** → Email/Password
- ✅ **Firestore Database** → Test mode

### خطوة 3: نسخ البيانات
1. Project Settings → General
2. انسخ `firebaseConfig`
3. الصق في `src/firebase/config.ts`

### خطوة 4: التشغيل
```bash
npm run dev
```

### خطوة 5: إضافة بيانات
1. سجل دخول (أو أنشئ مستخدم من Firebase Console)
2. اذهب إلى "الإعدادات"
3. اضغط "إضافة البيانات التجريبية"

✅ **انتهى!**

---

## 📚 الملفات المهمة

| اقرأ هذا إذا... | الملف |
|-----------------|-------|
| 🏃 تريد البدء فوراً | `QUICK_START.md` |
| 🔥 تريد إعداد Firebase | `FIREBASE_SETUP.md` |
| 💻 تريد التطوير | `API_DOCUMENTATION.md` |
| 📋 تريد معرفة الميزات | `FEATURES.md` |
| 📖 تريد الدليل الكامل | `README.md` |

---

## 🎯 ماذا بعد؟

### تجربة النظام
- استكشف جميع الأقسام
- جرّب البحث والتصفية
- اطّلع على التحليلات

### مع Firebase
- أضف عملاء جدد
- احذف بيانات
- راقب التحديثات الفورية

### التطوير
- راجع الكود في `src/components/`
- استخدم الخدمات في `src/firebase/`
- أضف ميزات جديدة

---

## ❓ مشكلة؟

**التطبيق لا يعمل؟**
```bash
rm -rf node_modules
npm install
npm run dev
```

**خطأ Firebase؟**
- راجع `FIREBASE_SETUP.md`
- أو استخدم "الدخول بدون مصادقة"

**سؤال آخر؟**
- راجع `README.md` للدليل الشامل

---

## 🎉 استمتع!

لديك الآن نظام CRM كامل جاهز!

**اختر طريقتك:**
- 🏃 سريع: Demo Mode
- 🔥 كامل: Firebase Mode

**ابدأ الآن! 💪**
