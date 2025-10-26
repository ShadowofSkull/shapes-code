import FloatingBackground from '@/components/shared/FloatingBackground';
import ShapeGrid from '@/components/user/ShapeGrid';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <FloatingBackground />
      
      {/* Hero Section */}
      <div className="text-center mb-12 relative z-10">
        <span className='w-dvw flex justify-center '>
          <h1 className='text-6xl pr-2'>🎨</h1>
          <h1
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-4 h-20"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            Everyone's Favorite Shapes!
          </h1>
        </span>
        <p className="text-xl text-gray-600 mb-6">
          Discover what shapes people love ✨
        </p>
        <Link
          href="/admin/login"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🔐 Admin Login
        </Link>
      </div>

      {/* Shapes Grid */}
      <ShapeGrid />
    </div>
  );
}