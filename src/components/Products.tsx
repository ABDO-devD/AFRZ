import { useState } from 'react';
import { Search, Plus, Edit, Trash2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  sold: number;
  revenue: string;
  status: 'متوفر' | 'نفاذ الكمية' | 'قريب من النفاذ';
  trend: 'up' | 'down';
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('الكل');

  const products: Product[] = [
    {
      id: 1,
      name: 'هاتف ذكي XYZ Pro',
      category: 'إلكترونيات',
      price: '3,500 د.م',
      stock: 45,
      sold: 245,
      revenue: '857,500 د.م',
      status: 'متوفر',
      trend: 'up'
    },
    {
      id: 2,
      name: 'ساعة ذكية Pro Max',
      category: 'إلكترونيات',
      price: '1,200 د.م',
      stock: 8,
      sold: 189,
      revenue: '226,800 د.م',
      status: 'قريب من النفاذ',
      trend: 'up'
    },
    {
      id: 3,
      name: 'سماعات لاسلكية Premium',
      category: 'إكسسوارات',
      price: '600 د.م',
      stock: 0,
      sold: 312,
      revenue: '187,200 د.م',
      status: 'نفاذ الكمية',
      trend: 'down'
    },
    {
      id: 4,
      name: 'حقيبة ظهر رياضية',
      category: 'حقائب',
      price: '350 د.م',
      stock: 67,
      sold: 156,
      revenue: '54,600 د.م',
      status: 'متوفر',
      trend: 'up'
    },
    {
      id: 5,
      name: 'لابتوب Dell Inspiron',
      category: 'إلكترونيات',
      price: '8,500 د.م',
      stock: 23,
      sold: 78,
      revenue: '663,000 د.م',
      status: 'متوفر',
      trend: 'up'
    },
    {
      id: 6,
      name: 'كاميرا رقمية Canon',
      category: 'إلكترونيات',
      price: '4,200 د.م',
      stock: 15,
      sold: 92,
      revenue: '386,400 د.م',
      status: 'متوفر',
      trend: 'down'
    },
    {
      id: 7,
      name: 'حذاء رياضي Nike',
      category: 'أحذية',
      price: '650 د.م',
      stock: 6,
      sold: 203,
      revenue: '131,950 د.م',
      status: 'قريب من النفاذ',
      trend: 'up'
    },
    {
      id: 8,
      name: 'تابلت Samsung',
      category: 'إلكترونيات',
      price: '2,800 د.م',
      stock: 34,
      sold: 134,
      revenue: '375,200 د.م',
      status: 'متوفر',
      trend: 'up'
    },
  ];

  const categories = ['الكل', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'الكل' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusStyle = (status: Product['status']) => {
    switch (status) {
      case 'متوفر':
        return 'bg-green-100 text-green-700';
      case 'قريب من النفاذ':
        return 'bg-yellow-100 text-yellow-700';
      case 'نفاذ الكمية':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h2>
          <p className="text-gray-500 mt-1">إجمالي المنتجات: {products.length}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          إضافة منتج جديد
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث عن منتج بالاسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
        <div>
          <h4 className="font-medium text-yellow-900">تنبيه المخزون</h4>
          <p className="text-sm text-yellow-700 mt-1">
            {products.filter(p => p.status === 'نفاذ الكمية').length} منتج نفذت كميته، 
            {' '}{products.filter(p => p.status === 'قريب من النفاذ').length} منتج قريب من النفاذ
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(product.status)}`}>
                {product.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">السعر</span>
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">المخزون</span>
                <span className={`font-semibold ${
                  product.stock === 0 ? 'text-red-600' : 
                  product.stock < 10 ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {product.stock} قطعة
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">المبيعات</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{product.sold}</span>
                  {product.trend === 'up' ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">إجمالي الإيرادات</span>
                <span className="text-lg font-bold text-purple-600">{product.revenue}</span>
              </div>
            </div>

            <div className="flex gap-2">
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إضافة منتج جديد</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>إلكترونيات</option>
                  <option>إكسسوارات</option>
                  <option>حقائب</option>
                  <option>أحذية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00 د.م"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الكمية في المخزون</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="وصف المنتج..."
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
