'use client';

import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import useSWR from 'swr';
import ShapeDisplay from '@/components/shared/ShapeDisplay';
import Pagination from '@/components/shared/Pagination';
import { formatTimestamp, colorMap } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ShapeTableProps {
  onEdit: (shape: any) => void;
  refreshTrigger: number;
}

export default function ShapeTable({ onEdit, refreshTrigger }: ShapeTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch shapes with SWR
  const { data, error, mutate } = useSWR(
    `/api/shapes?page=${currentPage}&limit=${itemsPerPage}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  // Refresh when parent triggers
  React.useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('🔄 [ShapeTable] Refreshing data');
      mutate();
    }
  }, [refreshTrigger, mutate]);

  // Handle delete
  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    console.log(`🗑️ [ShapeTable] Deleting shape ${id}`);

    try {
      const response = await fetch(`/api/shapes/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete shape');
      }

      console.log('✅ [ShapeTable] Shape deleted');
      mutate(); // Refresh data
    } catch (error: any) {
      console.error('❌ [ShapeTable] Delete error:', error);
      alert(`Failed to delete shape: ${error.message}`);
    }
  };

  if (error) {
    return (
      <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl">
        Failed to load shapes. Please refresh the page.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const shapes = data?.shapes || [];
  const pagination = data?.pagination || { totalPages: 1 };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Your Shapes</h2>

      {shapes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">¯\_(ツ)_/¯</div>
          <p className="text-2xl text-gray-600">No shapes yet!</p>
          <p className="text-gray-500 mt-2">Create your first shape above</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Preview
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Color
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Shape
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {shapes.map((shape: any) => (
                  <tr
                    key={shape.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <ShapeDisplay
                        shape={shape.shape}
                        color={shape.color}
                        size={40}
                      />
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {shape.name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: colorMap[shape.color] }}
                        />
                        <span className="capitalize">{shape.color}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 capitalize">{shape.shape}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 font-mono">
                      {formatTimestamp(shape.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            console.log('✏️ [ShapeTable] Edit clicked:', shape.id);
                            onEdit(shape);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(shape.id, shape.name)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}