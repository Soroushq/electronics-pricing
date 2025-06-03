'use client';

import React from 'react';
import { PersianText } from '@/components/ui/Farsisaz';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';

/**
 * Settings Page
 * 
 * صفحه تنظیمات سیستم
 */
export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <PersianText>تنظیمات</PersianText>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <PersianText>تنظیمات و پیکربندی سیستم</PersianText>
            </p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* General Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>تنظیمات عمومی</PersianText>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  <PersianText>واحد پول پیش‌فرض</PersianText>
                </label>
                <select className="form-input">
                  <option value="ريال">ریال ایران</option>
                  <option value="تومان">تومان</option>
                  <option value="دلار">دلار آمریکا</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>زبان سیستم</PersianText>
                </label>
                <select className="form-input">
                  <option value="fa">فارسی</option>
                  <option value="en">انگلیسی</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>فرمت تاریخ</PersianText>
                </label>
                <select className="form-input">
                  <option value="jalali">تقویم شمسی</option>
                  <option value="gregorian">تقویم میلادی</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Pricing Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>تنظیمات قیمت‌گذاری</PersianText>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  <PersianText>درصد سود پیش‌فرض</PersianText>
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>درصد مالیات</PersianText>
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="9"
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>هزینه حمل و نقل پیش‌فرض</PersianText>
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="50000"
                  min="0"
                />
              </div>
            </div>
          </Card>

          {/* Inventory Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>تنظیمات موجودی</PersianText>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  <PersianText>حداقل موجودی پیش‌فرض</PersianText>
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="10"
                  min="0"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox mr-2"
                  defaultChecked
                />
                <label className="text-sm text-gray-700">
                  <PersianText>ارسال هشدار در صورت کمبود موجودی</PersianText>
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox mr-2"
                />
                <label className="text-sm text-gray-700">
                  <PersianText>به‌روزرسانی خودکار قیمت‌ها</PersianText>
                </label>
              </div>
            </div>
          </Card>

          {/* System Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>تنظیمات سیستم</PersianText>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  <PersianText>نام شرکت</PersianText>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="شرکت الکترونیک پارس"
                />
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>آدرس شرکت</PersianText>
                </label>
                <textarea 
                  className="form-input" 
                  rows={3}
                  placeholder="آدرس کامل شرکت..."
                />
              </div>
              
              <div>
                <label className="form-label">
                  <PersianText>شماره تماس</PersianText>
                </label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="021-12345678"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn-base btn-primary">
            <PersianText>ذخیره تنظیمات</PersianText>
          </button>
        </div>
      </div>
    </AppLayout>
  );
} 