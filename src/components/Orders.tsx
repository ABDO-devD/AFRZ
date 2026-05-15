import { useState } from 'react';
import { Search, Filter, Download, Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  products: string;
  quantity: number;
  amount: string;
  status: 'قيد المعالجة' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  date: string;
  payment: 'مدفوع' | 'قيد الانتظار';
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('الكل');

  const orders: Order[] = [
    {
      id: '#1234',
      customer: 'أحمد محمد',
      products: 'هاتف ذكي XYZ',
      quantity: 1,
      amount: '3,500 د.م',
      status: 'مكتمل',
      date: '2024-01-20',
      payment: 'مدفوع'
    },
    {
      id: '#1235',
      customer: 'فاطمة العلوي',
      products: 'حقيبة يد فاخرة',
      quantity: 1,
      amount: '850 د.م',
      status: 'قيد التوصيل',
      date: '2024-01-21',
      payment: 'مدفوع'
    },
    {
      id: '#1236',
      customer: 'يوسف الإدريسي',
      products: 'ساعة ذكية Pro',
      quantity: 2,
      amount: '2,400 د.م',
      status: 'قيد المعالجة',
      date: '2024-01-21',
      payment: 'قيد الانتظار'
    },
    {
      id: '#1237',
      customer: 'مريم السعدي',
      products: 'حذاء رياضي Nike',
      quantity: 1,
      amount: '650 د.م',
      status: 'مكتمل',
      date: '2024-01-19',
      payment: 'مدفوع'
    },
    {
      id: '#1238',
      customer: 'خالد بنعلي',
      products: 'لابتوب Dell Inspiron',
      quantity: 1,
      amount: '8,500 د.م',
      status: 'قيد المعالجة',
      date: '2024-01-22',
      payment: 'مدفوع'
    },
    {
      id: '#1239',
      customer: 'سارة الحسني',
      products: 'سماعات لاسلكية',
      quantity: 1,
      amount: '450 د.م',
      status: 'ملغي',
      date: '2024-01-18',
      payment: 'قيد الانتظار'
    },
    {
      id: '#1240',
      customer: 'عمر التازي',
      products: 'كاميرا رقمية Canon',
      quantity: 1,
      amount: '4,200 د.م',
      status: 'قيد التوصيل',
      date: '2024-01-22',
      payment: 'مدفوع'
    },
    {
      id: '#1241',
      customer: 'نادية الزهراني',
      products: 'تابلت Samsung',
      quantity: 1,
      amount: '2,800 د.م',
      status: 'قيد المعالجة',
      date: '2024-01-23',
      payment: 'مدفوع'
    },
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'قيد المعالجة':
        return <Clock className="text-yellow-600" size={18} />;
      case 'قيد التوصيل':
        return <Truck className="text-blue-600" size={18} />;
      case 'مكتمل':
        return <CheckCircle className="text-green-600" size={18} />;
      case 'ملغي':
        return <XCircle className="text-red-600" size={18} />;
    }
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'قيد المعالجة':
        return 'bg-yellow-100 text-yellow-700';
      case 'قيد التوصيل':
        return 'bg-blue-100 text-blue-700';
      case 'مكتمل':
        return 'bg-green-100 text-green-700';
      case 'ملغي':
        return 'bg-red-100 text-red-700';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'الكل' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusOptions = ['الكل', 'قيد المعالجة', 'قيد التوصيل', 'مكتمل', 'ملغي'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h2>
          <p className="text-gray-500 mt-1">إجمالي الطلبات: {orders.length}</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
          <Download size={20} />
          تصدير التقرير
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث برقم الطلب، اسم العميل أو المنتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[180px]"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">رقم الطلب</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">العميل</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">المنتج</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">الكمية</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">المبلغ</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">الحالة</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">الدفع</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">التاريخ</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{order.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{order.products}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.payment === 'مدفوع' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye size={16} />
                      <span className="text-sm">عرض</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={24} />
            <h3 className="font-semibold">قيد المعالجة</h3>
          </div>
          <p className="text-3xl font-bold">
            {orders.filter(o => o.status === 'قيد المعالجة').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Truck size={24} />
            <h3 className="font-semibold">قيد التوصيل</h3>
          </div>
          <p className="text-3xl font-bold">
            {orders.filter(o => o.status === 'قيد التوصيل').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={24} />
            <h3 className="font-semibold">مكتملة</h3>
          </div>
          <p className="text-3xl font-bold">
            {orders.filter(o => o.status === 'مكتمل').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <XCircle size={24} />
            <h3 className="font-semibold">ملغاة</h3>
          </div>
          <p className="text-3xl font-bold">
            {orders.filter(o => o.status === 'ملغي').length}
          </p>
        </div>
      </div>
    </div>
  );
}
