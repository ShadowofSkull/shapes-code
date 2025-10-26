'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import ShapeDisplay from '@/components/shared/ShapeDisplay';
import Pagination from '@/components/shared/Pagination';
import { formatTimestamp } from '@/lib/utils';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShapeGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch shapes with SWR (auto-refresh every 5 seconds)
  const { data, error, isLoading } = useSWR(
    `/api/shapes?page=${currentPage}&limit=${itemsPerPage}`,
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: true,
    }
  );

  console.log('📊 [ShapeGrid] Data:', data);

  if (error) {
    console.error('❌ [ShapeGrid] Error:', error);
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600">Failed to load shapes</p>
        <p className="text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 mx-auto mb-4">
            <ShapeDisplay shape="triangle" color="blue" size={64} />
          </div>
          <p className="text-xl text-gray-600">Loading shapes...</p>
        </div>
      </div>
    );
  }

  const shapes = data?.shapes || [];
  const pagination = data?.pagination || { totalPages: 1 };

  return (
    <div className="max-w-7xl mx-auto">
      {shapes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">¯\_(ツ)_/¯</div>
          <p className="text-2xl text-gray-600">No shapes yet!</p>
          <p className="text-gray-500 mt-2">Be the first to add one</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shapes.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 duration-300"
                style={{ minHeight: '220px' }}
              >
                <div className="flex justify-center mb-4">
                  <ShapeDisplay shape={item.shape} color={item.color} size={100} />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 text-center font-mono">
                  🕐 {formatTimestamp(item.createdAt)}
                </p>
              </div>
            ))}
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