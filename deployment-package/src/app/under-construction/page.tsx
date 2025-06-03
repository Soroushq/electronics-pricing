'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getRouteDisplayName } from '@/utils/routeHelpers';

/**
 * Under Construction Page Content
 */
function UnderConstructionContent() {
  const searchParams = useSearchParams();
  const path = searchParams.get('path') || '';
  const pageName = getRouteDisplayName(path);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center p-8">
        {/* Construction Icon */}
        <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          <PersianText>در دست ساخت</PersianText>
        </h1>

        {/* Page Name */}
        <h2 className="text-xl font-semibold text-orange-600 mb-4">
          <PersianText>صفحه {pageName}</PersianText>
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          <PersianText>
            این صفحه در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.
            لطفاً صبور باشید تا تیم توسعه آن را تکمیل کند.
          </PersianText>
        </p>

        {/* Features Coming Soon */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            <PersianText>ویژگی‌های در راه:</PersianText>
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <PersianText>رابط کاربری مدرن و کاربرپسند</PersianText>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <PersianText>عملکرد سریع و قابل اعتماد</PersianText>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <PersianText>پشتیبانی کامل از زبان فارسی</PersianText>
            </li>
          </ul>
        </div>

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

        {/* Progress Indicator */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">
            <PersianText>پیشرفت توسعه:</PersianText>
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          
          <p className="text-xs text-gray-500">
            <PersianText>۶۰٪ تکمیل شده</PersianText>
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            <PersianText>برای اطلاع از آخرین بهروزرسانی‌ها با تیم توسعه در تماس باشید</PersianText>
          </p>
        </div>
      </Card>
    </div>
  );
}

/**
 * Under Construction Page
 * صفحه در دست ساخت برای ویژگی‌های جدید
 */
export default function UnderConstructionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    }>
      <UnderConstructionContent />
    </Suspense>
  );
} 