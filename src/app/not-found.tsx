'use client';

import React from 'react';
import Link from 'next/link';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

/**
 * Custom 404 Page
 * صفحه 404 سفارشی فارسی
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8">
        {/* 404 Icon */}
        <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Error Number */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">۴۰۴</h1>

        {/* Error Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          <PersianText>صفحه مورد نظر یافت نشد</PersianText>
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          <PersianText>
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد. 
            ممکن است آدرس اشتباه وارد شده باشد یا صفحه حذف شده باشد.
          </PersianText>
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button variant="primary" size="lg" fullWidth>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <PersianText>بازگشت به داشبورد</PersianText>
            </Button>
          </Link>

          <Button 
            variant="outline" 
            size="lg" 
            fullWidth
            onClick={() => window.history.back()}
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <PersianText>بازگشت به صفحه قبل</PersianText>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            <PersianText>آیا به کمک نیاز دارید؟</PersianText>
          </p>
          
          <div className="flex justify-center gap-4">
            <Link href="/parts" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <PersianText>مدیریت قطعات</PersianText>
            </Link>
            <Link href="/boards" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <PersianText>طراحی برد</PersianText>
            </Link>
            <Link href="/devices" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <PersianText>ساخت دستگاه</PersianText>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 