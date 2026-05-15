import { useState } from 'react';
import { Settings as SettingsIcon, Database, Loader, CheckCircle, XCircle } from 'lucide-react';
import { seedDatabase } from '../firebase/seedData';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeedData = async () => {
    setLoading(true);
    setResult(null);

    const success = await seedDatabase();

    setResult({
      success,
      message: success
        ? 'تمت إضافة البيانات التجريبية بنجاح! 🎉'
        : 'حدث خطأ أثناء إضافة البيانات. تأكد من إعداد Firebase.'
    });

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <SettingsIcon size={28} />
          الإعدادات
        </h2>
        <p className="text-gray-500 mt-1">إدارة إعدادات النظام</p>
      </div>

      {/* Firebase Setup */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Database size={20} />
          إعداد قاعدة البيانات
        </h3>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">إضافة بيانات تجريبية</h4>
            <p className="text-sm text-blue-700 mb-4">
              اضغط على الزر أدناه لإضافة بيانات تجريبية إلى قاعدة بيانات Firebase الخاصة بك.
              هذا مفيد عند البدء لأول مرة.
            </p>
            <p className="text-xs text-blue-600 mb-4">
              ⚠️ تأكد من إعداد Firebase بشكل صحيح قبل استخدام هذه الميزة.
            </p>

            <button
              onClick={handleSeedData}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  جاري الإضافة...
                </>
              ) : (
                <>
                  <Database size={20} />
                  إضافة البيانات التجريبية
                </>
              )}
            </button>
          </div>

          {/* Result Message */}
          {result && (
            <div
              className={`border rounded-lg p-4 flex items-start gap-3 ${
                result.success
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {result.success ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <XCircle size={20} className="flex-shrink-0" />
              )}
              <p className="text-sm">{result.message}</p>
            </div>
          )}

          {/* Data List */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">البيانات التي سيتم إضافتها:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>6</strong> عملاء تجريبيين
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>8</strong> منتجات متنوعة
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <strong>5</strong> طلبات نموذجية
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">الإصدار</p>
            <p className="font-semibold text-gray-900">1.0.0</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">التقنية</p>
            <p className="font-semibold text-gray-900">React + Firebase</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">قاعدة البيانات</p>
            <p className="font-semibold text-gray-900">Firestore</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">المصادقة</p>
            <p className="font-semibold text-gray-900">Firebase Auth</p>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">تحتاج مساعدة؟</h3>
        <p className="text-sm text-gray-700 mb-4">
          راجع الملفات التالية للحصول على مساعدة تفصيلية:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 text-blue-700">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded">README.md</code> - الدليل الشامل
          </li>
          <li className="flex items-center gap-2 text-purple-700">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded">FIREBASE_SETUP.md</code> - دليل إعداد Firebase
          </li>
          <li className="flex items-center gap-2 text-green-700">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded">QUICK_START.md</code> - البدء السريع
          </li>
        </ul>
      </div>
    </div>
  );
}
