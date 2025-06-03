'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Devices Management Page - Phase 5
 * صفحه مدیریت دستگاه‌ها - فاز ۵
 */
export default function DevicesPage() {
  const router = useRouter();

  // Mock devices data
  const mockDevices = [
    {
      id: '1',
      name: 'سیستم کنترل هوشمند خانگی',
      description: 'سیستم کامل کنترل روشنایی و دمای خانه',
      boardsCount: 4,
      totalPrice: 2850000,
      assemblyTime: 6,
      status: 'active'
    },
    {
      id: '2',
      name: 'دستگاه مانیتورینگ محیطی',
      description: 'نظارت بر دما، رطوبت و کیفیت هوا',
      boardsCount: 3,
      totalPrice: 1920000,
      assemblyTime: 4.5,
      status: 'prototype'
    },
    {
      id: '3',
      name: 'کنترلر موتور صنعتی',
      description: 'کنترل دقیق موتورهای AC/DC صنعتی',
      boardsCount: 5,
      totalPrice: 4200000,
      assemblyTime: 8,
      status: 'active'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <PersianText>مدیریت دستگاه‌ها</PersianText>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <PersianText>ساخت و مدیریت دستگاه‌های الکترونیکی</PersianText>
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="primary"
              onClick={() => router.push('/devices/builder')}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <PersianText>ساخت دستگاه جدید</PersianText>
            </Button>
          </div>
        </div>

        {/* Device Builder Feature */}
        <Card className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <PersianText>سازنده دستگاه آماده است!</PersianText>
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              <PersianText>
                با استفاده از سازنده دستگاه، می‌توانید بردهای ساخته شده را انتخاب کرده،
                تعداد هر برد را مشخص کنید و قیمت نهایی دستگاه را محاسبه کنید.
              </PersianText>
            </p>

            <Button 
              variant="primary" 
              size="lg"
              onClick={() => router.push('/devices/builder')}
              className="flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <PersianText>شروع ساخت دستگاه</PersianText>
            </Button>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ انتخاب بردها</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>استفاده از بردهای از پیش طراحی شده</PersianText>
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
              <PersianText>تعیین تعداد مورد نیاز از هر برد</PersianText>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ زمان‌بندی مونتاژ</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>محاسبه زمان و هزینه مونتاژ</PersianText>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <PersianText>✅ محاسبه قیمت کامل</PersianText>
            </h3>
            <p className="text-sm text-gray-600">
              <PersianText>قیمت نهایی شامل تمام هزینه‌ها</PersianText>
            </p>
          </Card>
        </div>

        {/* Devices List */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            <PersianText>دستگاه‌های موجود ({mockDevices.length} دستگاه)</PersianText>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockDevices.map((device) => (
              <Card key={device.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      <PersianText>{device.name}</PersianText>
                    </h4>
                    <p className="text-sm text-gray-600">{device.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      device.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      <PersianText>{device.status === 'active' ? 'فعال' : 'نمونه اولیه'}</PersianText>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      <PersianText>تعداد بردها</PersianText>
                    </p>
                    <p className="font-semibold text-blue-600">
                      <PersianText>{device.boardsCount} برد</PersianText>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      <PersianText>زمان مونتاژ</PersianText>
                    </p>
                    <p className="font-semibold text-purple-600">
                      <PersianText>{device.assemblyTime} ساعت</PersianText>
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    <PersianText>قیمت کل</PersianText>
                  </p>
                  <p className="font-bold text-lg text-green-600">
                    <PersianText>{device.totalPrice.toLocaleString('fa-IR')} ریال</PersianText>
                  </p>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <PersianText>ویرایش</PersianText>
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <PersianText>کپی</PersianText>
                    </Button>
                  </div>
                  
                  <Button variant="danger" size="sm">
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <PersianText>حذف</PersianText>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <PersianText>وضعیت پیاده‌سازی فاز ۵</PersianText>
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
                  <PersianText>انتخاب بردها از کتابخانه</PersianText>
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
                  <PersianText>تعیین تعداد بردها</PersianText>
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
                  <PersianText>محاسبه قیمت کل دستگاه</PersianText>
                </span>
              </div>
              <span className="text-green-600 text-sm font-semibold">تکمیل شده</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-1">
                  <PersianText>🎉 فاز ۵ تکمیل شد!</PersianText>
                </h4>
                <p className="text-green-800 text-sm">
                  <PersianText>
                    سازنده دستگاه با تمام ویژگی‌های مورد نیاز پیاده‌سازی شده و آماده استفاده است.
                    شما می‌توانید از بردهای ساخته شده، دستگاه‌های پیچیده بسازید و قیمت آن‌ها را محاسبه کنید.
                  </PersianText>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <PersianText>آمار سیستم</PersianText>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">
                <PersianText>کل دستگاه‌ها</PersianText>
              </p>
              <p className="text-2xl font-bold text-blue-800">
                <PersianText>{mockDevices.length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 mb-1">
                <PersianText>فعال</PersianText>
              </p>
              <p className="text-2xl font-bold text-green-800">
                <PersianText>{mockDevices.filter(d => d.status === 'active').length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 mb-1">
                <PersianText>نمونه اولیه</PersianText>
              </p>
              <p className="text-2xl font-bold text-orange-800">
                <PersianText>{mockDevices.filter(d => d.status === 'prototype').length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 mb-1">
                <PersianText>ارزش کل</PersianText>
              </p>
              <p className="text-2xl font-bold text-purple-800">
                <PersianText>{mockDevices.reduce((sum, d) => sum + d.totalPrice, 0).toLocaleString('fa-IR')} ریال</PersianText>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
} 