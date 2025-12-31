'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  domain: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  domain,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    startTransition(() => {
      router.push(`/${domain}?${params.toString()}`);
    });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }

    return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-slate-600">
        Showing <span className="font-semibold">{(currentPage - 1) * pageSize + 1}</span> to{' '}
        <span className="font-semibold">{Math.min(currentPage * pageSize, total)}</span> of{' '}
        <span className="font-semibold">{total}</span> {domain}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <GoChevronLeft className='mr-2 h-4 w-4' />
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              disabled={isPending}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${currentPage === pageNum
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <GoChevronRight className='ml-2 h-4 w-4' />
        </button>
      </div>
    </div>
  );
}