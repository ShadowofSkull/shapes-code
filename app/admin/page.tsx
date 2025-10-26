'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import FloatingBackground from '@/components/shared/FloatingBackground';
import ShapeForm from '@/components/admin/ShapeForm';
import ShapeTable from '@/components/admin/ShapeTable';

export default function AdminDashboard() {
  const [editingShape, setEditingShape] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    console.log('✅ [AdminDashboard] Form submitted successfully');
    setEditingShape(null);
    setRefreshTrigger((prev) => prev + 1);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleEdit = (shape: any) => {
    console.log('✏️ [AdminDashboard] Editing shape:', shape.id);
    setEditingShape(shape);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    console.log('👋 [AdminDashboard] Logging out...');
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen p-8">
      <FloatingBackground />

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-3xl shadow-2xl p-6 mb-8 relative z-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-4xl font-bold">🎨 Shape Studio</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white text-pink-500 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Shape Form */}
        <ShapeForm
          editingShape={editingShape}
          onSuccess={handleSuccess}
          onCancel={() => setEditingShape(null)}
        />

        {/* Shape Table */}
        <ShapeTable onEdit={handleEdit} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}