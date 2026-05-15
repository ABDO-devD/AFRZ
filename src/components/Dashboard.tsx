import { Users, ShoppingCart, DollarSign, TrendingUp, Package, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'إجمالي العملاء',
      value: '2,543',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'الطلبات الجديدة',
      value: '186',
      change: '+8%',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'المبيعات',
      value: '125,430 د.م',
      change: '+23%',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'المنتجات',
      value: '456',
      change: '+5%',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'أحمد محمد', product: 'هاتف ذكي', amount: '3,500 د.م', status: 'مكتمل', statusColor: 'bg-green-100 text-green-700' },
    { id: '#1235', customer: 'فاطمة العلوي', product: 'حقيبة يد', amount: '850 د.م', status: 'قيد التوصيل', statusColor: 'bg-blue-100 text-blue-700' },
    { id: '#1236', customer: 'يوسف الإدريسي', product: 'ساعة ذكية', amount: '1,200 د.م', status: 'قيد المعالجة', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: '#1237', customer: 'مريم السعدي', product: 'حذاء رياضي', amount: '650 د.م', status: 'مكتمل', statusColor: 'bg-green-100 text-green-700' },
    { id: '#1238', customer: 'خالد بنعلي', product: 'لابتوب', amount: '8,500 د.م', status: 'قيد المعالجة', statusColor: 'bg-yellow-100 text-yellow-700' },
  ];

  const topProducts = [
    { name: 'هاتف ذكي XYZ', sales: 245, revenue: '857,500 د.م' },
    { name: 'ساعة ذكية Pro', sales: 189, revenue: '226,800 د.م' },
    { name: 'سماعات لاسلكية', sales: 312, revenue: '187,200 د.م' },
    { name: 'حقيبة ظهر', sales: 156, revenue: '93,600 د.م' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">لوحة التحكم</h2>
        <p className="text-gray-500 mt-1">نظرة عامة على أداء المتجر</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={stat.textColor} size={24} />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <TrendingUp size={16} />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">أحدث الطلبات</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">المنتجات الأكثر مبيعاً</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.sales} مبيعة</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
        <div>
          <h4 className="font-medium text-yellow-900">تنبيهات المخزون</h4>
          <p className="text-sm text-yellow-700 mt-1">
            هناك 12 منتج على وشك النفاد من المخزون. يرجى إعادة التزويد قريباً.
          </p>
        </div>
      </div>
    </div>
  );
}
