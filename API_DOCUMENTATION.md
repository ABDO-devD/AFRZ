# 📚 توثيق Firebase API

دليل شامل لاستخدام خدمات Firebase في النظام.

---

## 🔐 المصادقة (Authentication)

ملف: `src/firebase/authService.ts`

### تسجيل مستخدم جديد

```typescript
import { signUp } from './firebase/authService';

const result = await signUp(
  'user@example.com',    // البريد الإلكتروني
  'password123',         // كلمة المرور
  'اسم المستخدم'         // الاسم
);

if (result.success) {
  console.log('تم التسجيل بنجاح', result.user);
} else {
  console.error('خطأ:', result.error);
}
```

### تسجيل الدخول

```typescript
import { signIn } from './firebase/authService';

const result = await signIn(
  'user@example.com',
  'password123'
);

if (result.success) {
  console.log('تم الدخول بنجاح', result.user);
}
```

### تسجيل الخروج

```typescript
import { logout } from './firebase/authService';

await logout();
```

### الحصول على المستخدم الحالي

```typescript
import { getCurrentUser } from './firebase/authService';

const user = getCurrentUser();
console.log(user?.email);
```

### الاستماع لتغييرات المصادقة

```typescript
import { onAuthChange } from './firebase/authService';

const unsubscribe = onAuthChange((user) => {
  if (user) {
    console.log('المستخدم مسجل الدخول:', user.email);
  } else {
    console.log('لا يوجد مستخدم');
  }
});

// إلغاء الاستماع عند الانتهاء
unsubscribe();
```

---

## 👥 إدارة العملاء

ملف: `src/firebase/customerService.ts`

### نوع البيانات

```typescript
interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  rating: number;
  status: 'نشط' | 'غير نشط';
  createdAt?: Date;
}
```

### الحصول على جميع العملاء

```typescript
import { getAllCustomers } from './firebase/customerService';

const customers = await getAllCustomers();
console.log(customers);
```

### إضافة عميل جديد

```typescript
import { addCustomer } from './firebase/customerService';

const newCustomer = {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '0612345678',
  location: 'الدار البيضاء',
  orders: 0,
  totalSpent: 0,
  rating: 5,
  status: 'نشط' as const
};

const customerId = await addCustomer(newCustomer);
console.log('تم إضافة العميل برقم:', customerId);
```

### تحديث بيانات عميل

```typescript
import { updateCustomer } from './firebase/customerService';

const success = await updateCustomer('customer_id', {
  phone: '0698765432',
  orders: 5,
  totalSpent: 2500
});

if (success) {
  console.log('تم التحديث بنجاح');
}
```

### حذف عميل

```typescript
import { deleteCustomer } from './firebase/customerService';

const success = await deleteCustomer('customer_id');

if (success) {
  console.log('تم الحذف بنجاح');
}
```

---

## 🏪 إدارة المنتجات

ملف: `src/firebase/productService.ts`

### نوع البيانات

```typescript
interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  status: 'متوفر' | 'نفاذ الكمية' | 'قريب من النفاذ';
  trend: 'up' | 'down';
  description?: string;
  createdAt?: Date;
}
```

### الحصول على جميع المنتجات

```typescript
import { getAllProducts } from './firebase/productService';

const products = await getAllProducts();
```

### الحصول على منتجات حسب الفئة

```typescript
import { getProductsByCategory } from './firebase/productService';

const electronics = await getProductsByCategory('إلكترونيات');
```

### إضافة منتج جديد

```typescript
import { addProduct } from './firebase/productService';

const newProduct = {
  name: 'هاتف ذكي',
  category: 'إلكترونيات',
  price: 3500,
  stock: 50,
  sold: 0,
  revenue: 0,
  status: 'متوفر' as const,
  trend: 'up' as const,
  description: 'هاتف ذكي بمواصفات عالية'
};

const productId = await addProduct(newProduct);
```

### تحديث منتج

```typescript
import { updateProduct } from './firebase/productService';

await updateProduct('product_id', {
  price: 3200,
  stock: 45
});
```

### تحديث المخزون

```typescript
import { updateProductStock } from './firebase/productService';

// يحدث الحالة تلقائياً بناءً على الكمية
await updateProductStock('product_id', 5);
```

### حذف منتج

```typescript
import { deleteProduct } from './firebase/productService';

await deleteProduct('product_id');
```

---

## 📦 إدارة الطلبات

ملف: `src/firebase/orderService.ts`

### نوع البيانات

```typescript
interface Order {
  id?: string;
  customerId: string;
  customerName: string;
  products: string;
  quantity: number;
  amount: number;
  status: 'قيد المعالجة' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  payment: 'مدفوع' | 'قيد الانتظار';
  date: Date;
  createdAt?: Date;
}
```

### الحصول على جميع الطلبات

```typescript
import { getAllOrders } from './firebase/orderService';

const orders = await getAllOrders();
```

### الحصول على طلبات حسب الحالة

```typescript
import { getOrdersByStatus } from './firebase/orderService';

const pending = await getOrdersByStatus('قيد المعالجة');
const completed = await getOrdersByStatus('مكتمل');
```

### الحصول على طلبات عميل معين

```typescript
import { getOrdersByCustomer } from './firebase/orderService';

const customerOrders = await getOrdersByCustomer('customer_id');
```

### إضافة طلب جديد

```typescript
import { addOrder } from './firebase/orderService';

const newOrder = {
  customerId: 'customer_id',
  customerName: 'أحمد محمد',
  products: 'هاتف ذكي XYZ',
  quantity: 1,
  amount: 3500,
  status: 'قيد المعالجة' as const,
  payment: 'مدفوع' as const,
  date: new Date()
};

const orderId = await addOrder(newOrder);
```

### تحديث طلب

```typescript
import { updateOrder } from './firebase/orderService';

await updateOrder('order_id', {
  status: 'قيد التوصيل',
  payment: 'مدفوع'
});
```

### تحديث حالة الطلب فقط

```typescript
import { updateOrderStatus } from './firebase/orderService';

await updateOrderStatus('order_id', 'مكتمل');
```

### حذف طلب

```typescript
import { deleteOrder } from './firebase/orderService';

await deleteOrder('order_id');
```

---

## 🌱 إضافة بيانات تجريبية

ملف: `src/firebase/seedData.ts`

### إضافة جميع البيانات التجريبية

```typescript
import { seedDatabase } from './firebase/seedData';

const success = await seedDatabase();

if (success) {
  console.log('تمت إضافة البيانات بنجاح');
}
```

### استخدام البيانات مباشرة

```typescript
import { 
  sampleCustomers, 
  sampleProducts, 
  sampleOrders 
} from './firebase/seedData';

// عرض البيانات
console.log(sampleCustomers);
console.log(sampleProducts);
console.log(sampleOrders);
```

---

## 🔄 الاستخدام في React Components

### مثال: عرض قائمة العملاء

```typescript
import { useEffect, useState } from 'react';
import { getAllCustomers, Customer } from './firebase/customerService';

function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getAllCustomers();
    setCustomers(data);
    setLoading(false);
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {customers.map(customer => (
        <div key={customer.id}>
          {customer.name} - {customer.email}
        </div>
      ))}
    </div>
  );
}
```

### مثال: إضافة عميل جديد

```typescript
import { useState } from 'react';
import { addCustomer } from './firebase/customerService';

function AddCustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCustomer = {
      ...formData,
      orders: 0,
      totalSpent: 0,
      rating: 5,
      status: 'نشط' as const
    };

    const id = await addCustomer(newCustomer);
    
    if (id) {
      alert('تم إضافة العميل بنجاح!');
      // إعادة تعيين النموذج
      setFormData({ name: '', email: '', phone: '', location: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* حقول النموذج */}
    </form>
  );
}
```

---

## ⚠️ معالجة الأخطاء

جميع الدوال تتضمن معالجة الأخطاء:

```typescript
import { addCustomer } from './firebase/customerService';

try {
  const id = await addCustomer(customerData);
  if (id) {
    console.log('نجح');
  } else {
    console.log('فشل');
  }
} catch (error) {
  console.error('خطأ:', error);
}
```

---

## 🔒 قواعد الأمان

للإنتاج، استخدم قواعد Firestore أكثر أماناً:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع، الكتابة للمصادقين فقط
    match /customers/{customerId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
```

---

## 📊 أفضل الممارسات

1. **التحقق من البيانات**: تحقق دائماً من البيانات قبل الإرسال
2. **معالجة الأخطاء**: استخدم try/catch للتعامل مع الأخطاء
3. **التحميل**: أظهر مؤشر تحميل أثناء العمليات
4. **التحديث الفوري**: حدّث الواجهة فوراً بعد العمليات
5. **الأمان**: لا تشارك ملف config.ts في Git

---

## 🎯 نصائح الأداء

- استخدم pagination للبيانات الكبيرة
- خزّن البيانات محلياً في state
- استخدم memo لتجنب إعادة التحميل
- أضف indices في Firestore للبحث السريع

---

✨ **جاهز للاستخدام!** استخدم هذا التوثيق كمرجع لبناء تطبيقك.
