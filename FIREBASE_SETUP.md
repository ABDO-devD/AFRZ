# 🔥 دليل إعداد Firebase

## الخطوات المطلوبة لربط Firebase بالنظام

### 1️⃣ إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "Add project" أو "إضافة مشروع"
3. أدخل اسم المشروع (مثلاً: crm-ecommerce)
4. اتبع الخطوات حتى إنشاء المشروع

### 2️⃣ إنشاء تطبيق ويب

1. في صفحة المشروع، انقر على أيقونة الويب `</>`
2. أدخل اسم التطبيق
3. انقر "Register app"
4. ستظهر لك بيانات الإعداد - احفظها!

### 3️⃣ نسخ بيانات الإعداد

من صفحة إعدادات Firebase، انسخ البيانات التالية:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 4️⃣ تحديث ملف الإعداد

افتح ملف `src/firebase/config.ts` والصق بياناتك:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // ضع apiKey هنا
  authDomain: "YOUR_AUTH_DOMAIN",   // ضع authDomain هنا
  projectId: "YOUR_PROJECT_ID",     // ضع projectId هنا
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5️⃣ تفعيل المصادقة (Authentication)

1. في Firebase Console، اذهب إلى **Authentication**
2. انقر على "Get started"
3. من تبويب **Sign-in method**:
   - فعّل **Email/Password**
   - احفظ التغييرات

### 6️⃣ إنشاء قاعدة البيانات (Firestore)

1. في Firebase Console، اذهب إلى **Firestore Database**
2. انقر "Create database"
3. اختر **Start in test mode** (للتجربة)
4. اختر منطقة قريبة منك
5. انقر "Enable"

### 7️⃣ إعداد قواعد Firestore

في تبويب **Rules**، استخدم هذه القواعد للتجربة:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة والكتابة للمستخدمين المصادقين فقط
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **ملاحظة:** هذه قواعد بسيطة للتجربة. في الإنتاج، استخدم قواعد أكثر أماناً!

### 8️⃣ إنشاء مستخدم للتجربة

لإنشاء مستخدم تجريبي:

1. اذهب إلى **Authentication** > **Users**
2. انقر "Add user"
3. أدخل:
   - Email: `demo@crm.com`
   - Password: `demo123456`
4. احفظ

أو يمكنك التسجيل من خلال التطبيق مباشرة!

---

## 📊 هيكل قاعدة البيانات

سيتم إنشاء المجموعات (Collections) التالية تلقائياً:

### `customers` - العملاء
```javascript
{
  name: string,
  email: string,
  phone: string,
  location: string,
  orders: number,
  totalSpent: number,
  rating: number,
  status: 'نشط' | 'غير نشط',
  createdAt: timestamp
}
```

### `products` - المنتجات
```javascript
{
  name: string,
  category: string,
  price: number,
  stock: number,
  sold: number,
  revenue: number,
  status: 'متوفر' | 'نفاذ الكمية' | 'قريب من النفاذ',
  trend: 'up' | 'down',
  description: string,
  createdAt: timestamp
}
```

### `orders` - الطلبات
```javascript
{
  customerId: string,
  customerName: string,
  products: string,
  quantity: number,
  amount: number,
  status: 'قيد المعالجة' | 'قيد التوصيل' | 'مكتمل' | 'ملغي',
  payment: 'مدفوع' | 'قيد الانتظار',
  date: timestamp,
  createdAt: timestamp
}
```

---

## 🚀 التشغيل

بعد إعداد Firebase:

```bash
npm run dev
```

---

## 🔐 الميزات المفعلة

✅ **تسجيل الدخول/الخروج** - Authentication  
✅ **إدارة العملاء** - CRUD operations  
✅ **قاعدة بيانات حقيقية** - Firestore  
✅ **تحديثات فورية** - Real-time data  

---

## 🎯 وضع التجربة

يمكنك استخدام النظام بدون إعداد Firebase:

1. في صفحة تسجيل الدخول، انقر "الدخول بدون مصادقة"
2. ستعمل البيانات التجريبية المحلية
3. للتبديل بين Firebase والوضع التجريبي، استخدم زر 🔥/📝 في الهيدر

---

## 📝 ملاحظات مهمة

- 🔒 **الأمان**: قواعد Firestore الحالية للتجربة فقط
- 💰 **التكلفة**: Firebase مجاني للاستخدام الخفيف
- 🌐 **الإنتاج**: قبل النشر، حدّث قواعد الأمان
- 🔑 **البيانات**: لا تشارك ملف config.ts في Git

---

## 🆘 حل المشاكل

### خطأ: "Firebase not configured"
- تأكد من تحديث ملف `config.ts` ببياناتك

### خطأ: "Permission denied"
- تأكد من تفعيل Authentication
- راجع قواعد Firestore

### خطأ: "User not found"
- أنشئ مستخدم من Firebase Console
- أو سجل من خلال التطبيق

---

## 📧 المساعدة

للمزيد من المعلومات، راجع:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Authentication Guide](https://firebase.google.com/docs/auth)

---

✨ **جاهز للبدء؟** اتبع الخطوات أعلاه وستكون جاهزاً في دقائق!
