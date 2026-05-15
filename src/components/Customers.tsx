import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Edit, Trash2, Star } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: string;
  rating: number;
  status: 'نشط' | 'غير نشط';
}

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const customers: Customer[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0612345678',
      location: 'الدار البيضاء',
      orders: 15,
      totalSpent: '12,500 د.م',
      rating: 5,
      status: 'نشط'
    },
    {
      id: 2,
      name: 'فاطمة العلوي',
      email: 'fatima@example.com',
      phone: '0623456789',
      location: 'الرباط',
      orders: 8,
      totalSpent: '6,800 د.م',
      rating: 4,
      status: 'نشط'
    },
    {
      id: 3,
      name: 'يوسف الإدريسي',
      email: 'youssef@example.com',
      phone: '0634567890',
      location: 'مراكش',
      orders: 22,
      totalSpent: '18,900 د.م',
      rating: 5,
      status: 'نشط'
    },
    {
      id: 4,
      name: 'مريم السعدي',
      email: 'mariam@example.com',
      phone: '0645678901',
      location: 'فاس',
      orders: 5,
      totalSpent: '3,200 د.م',
      rating: 4,
      status: 'نشط'
    },
    {
      id: 5,
      name: 'خالد بنعلي',
      email: 'khaled@example.com',
      phone: '0656789012',
      location: 'طنجة',
      orders: 12,
      totalSpent: '9,400 د.م',
      rating: 5,
      status: 'نشط'
    },
    {
      id: 6,
      name: 'سارة الحسني',
      email: 'sara@example.com',
      phone: '0667890123',
      location: 'أكادير',
      orders: 3,
      totalSpent: '2,100 د.م',
      rating: 3,
      status: 'غير نشط'
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة العملاء</h2>
          <p className="text-gray-500 mt-1">إجمالي العملاء: {customers.length}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          إضافة عميل جديد
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="البحث عن عميل بالاسم، البريد الإلكتروني أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{customer.name}</h3>
                  {renderStars(customer.rating)}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  customer.status === 'نشط'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>{customer.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">عدد الطلبات</p>
                <p className="text-lg font-bold text-gray-900">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">إجمالي الإنفاق</p>
                <p className="text-lg font-bold text-gray-900">{customer.totalSpent}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit size={16} />
                تعديل
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 size={16} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إضافة عميل جديد</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0612345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل المدينة"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
