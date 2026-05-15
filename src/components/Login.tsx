import { useState } from 'react';
import { signIn } from '../firebase/authService';
import { ShoppingCart, Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    setLoading(false);
  };

  // Demo credentials hint
  const useDemoCredentials = () => {
    setEmail('demo@crm.com');
    setPassword('demo123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg">
            <ShoppingCart className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">نظام CRM</h1>
          <p className="text-gray-500 mt-1">إدارة التجارة الإلكترونية</p>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center mb-2">
            <strong>للتجربة السريعة:</strong>
          </p>
          <button
            type="button"
            onClick={useDemoCredentials}
            className="text-sm text-blue-600 hover:text-blue-800 underline w-full"
          >
            استخدم بيانات تجريبية
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            💡 <strong>ملاحظة:</strong> للاستخدام الكامل، قم بإعداد Firebase Console وإضافة البيانات في ملف config.ts
          </p>
        </div>

        {/* Alternative: Skip login for demo */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onLoginSuccess}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            الدخول بدون مصادقة (وضع التجربة)
          </button>
        </div>
      </div>
    </div>
  );
}
