import { addCustomer, Customer } from './customerService';
import { addProduct, Product } from './productService';
import { addOrder, Order } from './orderService';

/**
 * إضافة بيانات تجريبية إلى Firebase
 * استخدم هذه الدالة لملء قاعدة البيانات ببيانات تجريبية
 */

// عملاء تجريبيون
const sampleCustomers: Omit<Customer, 'id'>[] = [
  {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0612345678',
    location: 'الدار البيضاء',
    orders: 15,
    totalSpent: 12500,
    rating: 5,
    status: 'نشط'
  },
  {
    name: 'فاطمة العلوي',
    email: 'fatima@example.com',
    phone: '0623456789',
    location: 'الرباط',
    orders: 8,
    totalSpent: 6800,
    rating: 4,
    status: 'نشط'
  },
  {
    name: 'يوسف الإدريسي',
    email: 'youssef@example.com',
    phone: '0634567890',
    location: 'مراكش',
    orders: 22,
    totalSpent: 18900,
    rating: 5,
    status: 'نشط'
  },
  {
    name: 'مريم السعدي',
    email: 'mariam@example.com',
    phone: '0645678901',
    location: 'فاس',
    orders: 5,
    totalSpent: 3200,
    rating: 4,
    status: 'نشط'
  },
  {
    name: 'خالد بنعلي',
    email: 'khaled@example.com',
    phone: '0656789012',
    location: 'طنجة',
    orders: 12,
    totalSpent: 9400,
    rating: 5,
    status: 'نشط'
  },
  {
    name: 'سارة الحسني',
    email: 'sara@example.com',
    phone: '0667890123',
    location: 'أكادير',
    orders: 3,
    totalSpent: 2100,
    rating: 3,
    status: 'غير نشط'
  }
];

// منتجات تجريبية
const sampleProducts: Omit<Product, 'id'>[] = [
  {
    name: 'هاتف ذكي XYZ Pro',
    category: 'إلكترونيات',
    price: 3500,
    stock: 45,
    sold: 245,
    revenue: 857500,
    status: 'متوفر',
    trend: 'up',
    description: 'هاتف ذكي بمواصفات عالية'
  },
  {
    name: 'ساعة ذكية Pro Max',
    category: 'إلكترونيات',
    price: 1200,
    stock: 8,
    sold: 189,
    revenue: 226800,
    status: 'قريب من النفاذ',
    trend: 'up',
    description: 'ساعة ذكية متطورة'
  },
  {
    name: 'سماعات لاسلكية Premium',
    category: 'إكسسوارات',
    price: 600,
    stock: 0,
    sold: 312,
    revenue: 187200,
    status: 'نفاذ الكمية',
    trend: 'down',
    description: 'سماعات بجودة صوت عالية'
  },
  {
    name: 'حقيبة ظهر رياضية',
    category: 'حقائب',
    price: 350,
    stock: 67,
    sold: 156,
    revenue: 54600,
    status: 'متوفر',
    trend: 'up',
    description: 'حقيبة عملية ومريحة'
  },
  {
    name: 'لابتوب Dell Inspiron',
    category: 'إلكترونيات',
    price: 8500,
    stock: 23,
    sold: 78,
    revenue: 663000,
    status: 'متوفر',
    trend: 'up',
    description: 'لابتوب قوي للعمل والألعاب'
  },
  {
    name: 'كاميرا رقمية Canon',
    category: 'إلكترونيات',
    price: 4200,
    stock: 15,
    sold: 92,
    revenue: 386400,
    status: 'متوفر',
    trend: 'down',
    description: 'كاميرا احترافية'
  },
  {
    name: 'حذاء رياضي Nike',
    category: 'أحذية',
    price: 650,
    stock: 6,
    sold: 203,
    revenue: 131950,
    status: 'قريب من النفاذ',
    trend: 'up',
    description: 'حذاء رياضي مريح'
  },
  {
    name: 'تابلت Samsung',
    category: 'إلكترونيات',
    price: 2800,
    stock: 34,
    sold: 134,
    revenue: 375200,
    status: 'متوفر',
    trend: 'up',
    description: 'تابلت متعدد الاستخدامات'
  }
];

// طلبات تجريبية
const sampleOrders: Omit<Order, 'id'>[] = [
  {
    customerId: 'customer1',
    customerName: 'أحمد محمد',
    products: 'هاتف ذكي XYZ',
    quantity: 1,
    amount: 3500,
    status: 'مكتمل',
    payment: 'مدفوع',
    date: new Date('2024-01-20')
  },
  {
    customerId: 'customer2',
    customerName: 'فاطمة العلوي',
    products: 'حقيبة يد فاخرة',
    quantity: 1,
    amount: 850,
    status: 'قيد التوصيل',
    payment: 'مدفوع',
    date: new Date('2024-01-21')
  },
  {
    customerId: 'customer3',
    customerName: 'يوسف الإدريسي',
    products: 'ساعة ذكية Pro',
    quantity: 2,
    amount: 2400,
    status: 'قيد المعالجة',
    payment: 'قيد الانتظار',
    date: new Date('2024-01-21')
  },
  {
    customerId: 'customer4',
    customerName: 'مريم السعدي',
    products: 'حذاء رياضي Nike',
    quantity: 1,
    amount: 650,
    status: 'مكتمل',
    payment: 'مدفوع',
    date: new Date('2024-01-19')
  },
  {
    customerId: 'customer5',
    customerName: 'خالد بنعلي',
    products: 'لابتوب Dell Inspiron',
    quantity: 1,
    amount: 8500,
    status: 'قيد المعالجة',
    payment: 'مدفوع',
    date: new Date('2024-01-22')
  }
];

// دالة إضافة البيانات التجريبية
export const seedDatabase = async () => {
  console.log('🌱 بدء إضافة البيانات التجريبية...');
  
  try {
    // إضافة العملاء
    console.log('👥 إضافة العملاء...');
    for (const customer of sampleCustomers) {
      await addCustomer(customer);
    }
    console.log('✅ تم إضافة العملاء');

    // إضافة المنتجات
    console.log('🏪 إضافة المنتجات...');
    for (const product of sampleProducts) {
      await addProduct(product);
    }
    console.log('✅ تم إضافة المنتجات');

    // إضافة الطلبات
    console.log('📦 إضافة الطلبات...');
    for (const order of sampleOrders) {
      await addOrder(order);
    }
    console.log('✅ تم إضافة الطلبات');

    console.log('🎉 تمت إضافة جميع البيانات التجريبية بنجاح!');
    return true;
  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات:', error);
    return false;
  }
};

// تصدير البيانات للاستخدام المباشر
export { sampleCustomers, sampleProducts, sampleOrders };
