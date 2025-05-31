'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';

/**
 * Parts Management Page
 * 
 * صفحه اصلی مدیریت قطعات - فقط فرانت‌اند با داده‌های Mock
 */
export default function PartsPage() {
  const router = useRouter();
  
  // Mock data for demonstration
  const mockParts = [
    {
      id: '1',
      name: 'مقاومت ۱۰ کیلو اهم',
      nameEn: '10k Ohm Resistor',
      partNumber: 'R-10K-01',
      price: 500,
      stock: 1500,
      category: 'مقاومت‌ها',
      status: 'active'
    },
    {
      id: '2', 
      name: 'خازن ۱۰۰ میکروفاراد',
      nameEn: '100µF Capacitor',
      partNumber: 'C-100UF-16V',
      price: 2000,
      stock: 50,
      category: 'خازن‌ها',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'آی‌سی تقویت‌کننده LM358',
      nameEn: 'LM358 Op-Amp IC',
      partNumber: 'IC-LM358-DIP8',
      price: 8000,
      stock: 200,
      category: 'آی‌سی‌ها',
      status: 'active'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <PersianText>مدیریت قطعات</PersianText>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <PersianText>مدیریت و کنترل قطعات الکترونیکی</PersianText>
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <PersianText>وارد کردن CSV</PersianText>
            </Button>
            
            <Button 
              variant="primary"
              onClick={() => router.push('/parts/add')}
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <PersianText>افزودن قطعه جدید</PersianText>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در نام، شماره قطعه، توضیحات..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">همه دسته‌بندی‌ها</option>
                <option value="resistors">مقاومت‌ها</option>
                <option value="capacitors">خازن‌ها</option>
                <option value="ics">آی‌سی‌ها</option>
              </select>
              
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <PersianText>فیلترها</PersianText>
              </Button>
            </div>
          </div>
        </Card>

        {/* Parts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockParts.map((part) => (
            <Card key={part.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    <PersianText>{part.name}</PersianText>
                  </h3>
                  <p className="text-sm text-gray-500">{part.nameEn}</p>
                  <p className="text-sm font-mono text-gray-600 mt-1">{part.partNumber}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <PersianText>{part.category}</PersianText>
                  </span>
                  {part.status === 'low-stock' && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      <PersianText>موجودی کم</PersianText>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    <PersianText>قیمت</PersianText>
                  </p>
                  <p className="font-semibold text-green-600">
                    <PersianText>{part.price.toLocaleString('fa-IR')} ریال</PersianText>
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    <PersianText>موجودی</PersianText>
                  </p>
                  <p className={`font-semibold ${part.status === 'low-stock' ? 'text-orange-600' : 'text-blue-600'}`}>
                    <PersianText>{part.stock.toLocaleString('fa-IR')} عدد</PersianText>
                  </p>
                </div>
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

        {/* Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <PersianText>آمار سیستم</PersianText>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">
                <PersianText>کل قطعات</PersianText>
              </p>
              <p className="text-2xl font-bold text-blue-800">
                <PersianText>{mockParts.length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 mb-1">
                <PersianText>در دسترس</PersianText>
              </p>
              <p className="text-2xl font-bold text-green-800">
                <PersianText>{mockParts.filter(p => p.status === 'active').length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 mb-1">
                <PersianText>موجودی کم</PersianText>
              </p>
              <p className="text-2xl font-bold text-orange-800">
                <PersianText>{mockParts.filter(p => p.status === 'low-stock').length.toLocaleString('fa-IR')}</PersianText>
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 mb-1">
                <PersianText>ارزش کل</PersianText>
              </p>
              <p className="text-2xl font-bold text-purple-800">
                <PersianText>{mockParts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('fa-IR')} ریال</PersianText>
              </p>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        <Card className="p-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-medium text-green-800">
                <PersianText>سیستم مدیریت قطعات فعال است!</PersianText>
              </h3>
            </div>
            <p className="text-green-700 mt-2 text-sm">
              <PersianText>
                این نسخه شامل فرانت‌اند کامل با داده‌های Mock است. 
                در مراحل بعدی backend و API ها اضافه خواهند شد.
              </PersianText>
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
} 