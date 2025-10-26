'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
      >
        ◀ Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
            currentPage === page
              ? 'bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-lg scale-110'
              : 'bg-white shadow-md hover:shadow-lg'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
      >
        Next ▶
      </button>
    </div>
  );
}