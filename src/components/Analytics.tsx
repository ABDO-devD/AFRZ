import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('شهر');

  // Sales data
  const salesData = [
    { name: 'يناير', sales: 45000, orders: 120, customers: 85 },
    { name: 'فبراير', sales: 52000, orders: 145, customers: 95 },
    { name: 'مارس', sales: 48000, orders: 132, customers: 88 },
    { name: 'أبريل', sales: 61000, orders: 168, customers: 112 },
    { name: 'مايو', sales: 55000, orders: 151, customers: 98 },
    { name: 'يونيو', sales: 67000, orders: 186, customers: 125 },
  ];

  // Revenue by category
  const categoryData = [
    { name: 'إلكترونيات', value: 450000, percentage: 45 },
    { name: 'إكسسوارات', value: 250000, percentage: 25 },
    { name: 'حقائب', value: 150000, percentage: 15 },
    { name: 'أحذية', value: 100000, percentage: 10 },
    { name: 'أخرى', value: 50000, percentage: 5 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  // Top performing products
  const topProducts = [
    { name: 'هاتف ذكي XYZ', revenue: 857500, growth: 23 },
    { name: 'ساعة ذكية Pro', revenue: 226800, growth: 18 },
    { name: 'سماعات لاسلكية', revenue: 187200, growth: 15 },
    { name: 'لابتوب Dell', revenue: 663000, growth: 12 },
    { name: 'كاميرا Canon', revenue: 386400, growth: -5 },
  ];

  // Customer metrics
  const customerMetrics = [
    { metric: 'عملاء جدد', value: 245, change: 12 },
    { metric: 'عملاء متكررون', value: 1834, change: 8 },
    { metric: 'معدل الاحتفاظ', value: '88%', change: 5 },
    { metric: 'متوسط قيمة الطلب', value: '1,250 د.م', change: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">التحليلات والتقارير</h2>
          <p className="text-gray-500 mt-1">نظرة شاملة على أداء المبيعات</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>أسبوع</option>
            <option>شهر</option>
            <option>3 أشهر</option>
            <option>سنة</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} />
            <span className="bg-white/20 px-2 py-1 rounded text-sm">+23%</span>
          </div>
          <h3 className="text-sm opacity-90">إجمالي المبيعات</h3>
          <p className="text-3xl font-bold mt-1">348,000 د.م</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart size={32} />
            <span className="bg-white/20 px-2 py-1 rounded text-sm">+15%</span>
          </div>
          <h3 className="text-sm opacity-90">إجمالي الطلبات</h3>
          <p className="text-3xl font-bold mt-1">902</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users size={32} />
            <span className="bg-white/20 px-2 py-1 rounded text-sm">+12%</span>
          </div>
          <h3 className="text-sm opacity-90">العملاء النشطون</h3>
          <p className="text-3xl font-bold mt-1">2,079</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={32} />
            <span className="bg-white/20 px-2 py-1 rounded text-sm">+8%</span>
          </div>
          <h3 className="text-sm opacity-90">معدل التحويل</h3>
          <p className="text-3xl font-bold mt-1">3.2%</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">تطور المبيعات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="المبيعات" />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} name="الطلبات" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">الإيرادات حسب الفئة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name} ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">الأداء الشهري</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name="المبيعات" />
            <Bar dataKey="customers" fill="#10b981" name="العملاء" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products and Customer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">المنتجات الأكثر ربحية</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.revenue.toLocaleString()} د.م</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp size={16} className={product.growth < 0 ? 'rotate-180' : ''} />
                  <span className="font-semibold">{Math.abs(product.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">مقاييس العملاء</h3>
          <div className="space-y-4">
            {customerMetrics.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={14} className={item.change < 0 ? 'rotate-180' : ''} />
                    {Math.abs(item.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Revenue Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">الإيرادات التفصيلية حسب الفئة</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">الإيرادات</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">النسبة</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">المؤشر</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryData.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {category.value.toLocaleString()} د.م
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {category.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: COLORS[index]
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
