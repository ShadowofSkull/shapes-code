'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FloatingBackground from '@/components/shared/FloatingBackground';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 [AdminLogin] Attempting login...');

    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      console.log('🔐 [AdminLogin] Result:', result);

      if (result?.error) {
        console.log('❌ [AdminLogin] Authentication failed');
        setError('Invalid username or password');
        setIsLoading(false);
        return;
      }

      console.log('✅ [AdminLogin] Authentication successful');
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      console.error('❌ [AdminLogin] Error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <FloatingBackground />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-10 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-2">
              🎨 Shape Studio
            </h2>
            <p className="text-gray-600">Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : '🚀 Login'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 font-medium block"
            >
              ← Back to Home
            </Link>
            <p className="text-sm text-gray-500">
              Demo: <code className="bg-gray-100 px-2 py-1 rounded">admin</code> /{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}