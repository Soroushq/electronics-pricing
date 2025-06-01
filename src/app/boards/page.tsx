'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Boards Management Page - Phase 4
 * صفحه مدیریت بردها - فاز ۴
 */
export default function BoardsPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <PersianText>مدیریت بردها</PersianText>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <PersianText>طراحی و مدیریت بردهای مدار چاپی</PersianText>
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="primary"
              onClick={() => router.push('/boards/designer')}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <PersianText>طراح برد جدید</PersianText>
            </Button>
          </div>
        </div>

        {/* Board Calculator Feature */}
        <Card className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <PersianText>محاسبه‌گر قیمت برد آماده است!</PersianText>
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              <PersianText>
                با استفاده از محاسبه‌گر برد، می‌توانید قطعات مورد نیاز برای هر برد را انتخاب کرده،
                تعداد هر قطعه را مشخص کنید و قیمت نهایی برد را محاسبه کنید.
              </PersianText>
            </p>

            <Button 
              variant="primary" 
              size="lg"
              onClick={() => router.push('/boards/designer')}
              className="flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <PersianText>شروع محاسبه قیمت برد</PersianText>
            </Button>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ انتخاب قطعات</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>انتخاب آسان قطعات از کتابخانه و اضافه کردن به برد</PersianText>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v3m3-4h8m0 0h3a1 1 0 011 1v3M7 4v3a1 1 0 001 1h8a1 1 0 001-1V4M7 4H4a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1h-3" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ تنظیم تعداد</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>تعیین تعداد مورد نیاز از هر قطعه برای برد</PersianText>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ محاسبه قیمت</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>محاسبه خودکار قیمت نهایی شامل قطعات و هزینه‌ها</PersianText>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 0V4a2 2 0 00-2-2H9a2 2 0 00-2 2v3m1 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ ذخیره برد</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>ذخیره برد به عنوان آیتم برای استفاده در ساخت دستگاه</PersianText>
            </p>
          </Card>
        </div>

        {/* Implementation Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <PersianText>وضعیت پیاده‌سازی فاز ۴</PersianText>
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-green-900">
                  <PersianText>انتخاب قطعات از کتابخانه</PersianText>
                </span>
              </div>
              <span className="text-green-600 text-sm font-semibold">تکمیل شده</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-green-900">
                  <PersianText>تعیین تعداد قطعات</PersianText>
                </span>
              </div>
              <span className="text-green-600 text-sm font-semibold">تکمیل شده</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-green-900">
                  <PersianText>محاسبه قیمت خودکار</PersianText>
                </span>
              </div>
              <span className="text-green-600 text-sm font-semibold">تکمیل شده</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-green-900">
                  <PersianText>ذخیره برد</PersianText>
                </span>
              </div>
              <span className="text-green-600 text-sm font-semibold">تکمیل شده</span>
            </div>
          </div>

          {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  <PersianText>✅ فاز ۴ تکمیل شد!</PersianText>
                </h4>
                <p className="text-blue-800 text-sm">
                  <PersianText>
                    محاسبه‌گر قیمت برد با تمام ویژگی‌های مورد نیاز پیاده‌سازی شده و آماده استفاده است.
                    شما می‌توانید قطعات مورد نیاز برای هر برد را انتخاب کرده، تعداد آن‌ها را تعیین کنید و برد را ذخیره کنید.
                  </PersianText>
                </p>
              </div>
            </div>
          </div> */}
        </Card>
      </div>
    </AppLayout>
  );
} 