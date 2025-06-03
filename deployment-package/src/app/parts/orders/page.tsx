'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';
import { Part } from '@/types/parts';
import { useExcelExport } from '@/hooks/useExcelExport';

interface OrderItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  category: string;
}

export default function PartsOrderPage() {
  const router = useRouter();
  const { exportPartsOrder } = useExcelExport();
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock parts data with proper Part interface
  const availableParts: Part[] = [
    {
      id: '1',
      name: 'مقاومت ۱۰کΩ',
      partNumber: 'R-10K-01',
      currentPrice: 500,
      categoryId: 'resistors',
      unitId: 'pcs',
      stockQuantity: 1500,
      minStockLevel: 100,
      supplierId: 'supplier1',
      specifications: [
        { name: 'مقاومت', value: '10kΩ', unit: 'Ω' },
        { name: 'توان', value: '0.25W', unit: 'W' }
      ],
      images: [],
      alternativeParts: [],
      tags: [],
      currency: 'IRR',
      isActive: true,
      isObsolete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'خازن ۱۰۰μF',
      partNumber: 'C-100UF-16V',
      currentPrice: 2000,
      categoryId: 'capacitors',
      unitId: 'pcs',
      stockQuantity: 800,
      minStockLevel: 50,
      supplierId: 'supplier2',
      specifications: [
        { name: 'ظرفیت', value: '100μF', unit: 'F' },
        { name: 'ولتاژ', value: '16V', unit: 'V' }
      ],
      images: [],
      alternativeParts: [],
      tags: [],
      currency: 'IRR',
      isActive: true,
      isObsolete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'IC LM358',
      partNumber: 'IC-LM358-DIP8',
      currentPrice: 8000,
      categoryId: 'ics',
      unitId: 'pcs',
      stockQuantity: 200,
      minStockLevel: 20,
      supplierId: 'supplier1',
      specifications: [
        { name: 'نوع', value: 'Op-Amp', unit: '' },
        { name: 'پکیج', value: 'DIP-8', unit: '' }
      ],
      images: [],
      alternativeParts: [],
      tags: [],
      currency: 'IRR',
      isActive: true,
      isObsolete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'ترانزیستور BC547',
      partNumber: 'TR-BC547',
      currentPrice: 1500,
      categoryId: 'transistors',
      unitId: 'pcs',
      stockQuantity: 500,
      minStockLevel: 50,
      supplierId: 'supplier2',
      specifications: [
        { name: 'نوع', value: 'NPN', unit: '' },
        { name: 'جریان کلکتور', value: '100mA', unit: 'A' }
      ],
      images: [],
      alternativeParts: [],
      tags: [],
      currency: 'IRR',
      isActive: true,
      isObsolete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      name: 'دیود 1N4007',
      partNumber: 'D-1N4007',
      currentPrice: 800,
      categoryId: 'diodes',
      unitId: 'pcs',
      stockQuantity: 1000,
      minStockLevel: 100,
      supplierId: 'supplier1',
      specifications: [
        { name: 'ولتاژ معکوس', value: '1000V', unit: 'V' },
        { name: 'جریان مستقیم', value: '1A', unit: 'A' }
      ],
      images: [],
      alternativeParts: [],
      tags: [],
      currency: 'IRR',
      isActive: true,
      isObsolete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const addToOrder = (part: Part, quantity: number) => {
    const existingItem = orderItems.find(item => item.partId === part.id);
    
    if (existingItem) {
      updateOrderQuantity(part.id, existingItem.quantity + quantity);
    } else {
      const newOrderItem: OrderItem = {
        partId: part.id,
        name: part.name,
        partNumber: part.partNumber,
        unitPrice: part.currentPrice,
        quantity: quantity,
        totalPrice: part.currentPrice * quantity,
        category: part.categoryId
      };
      
      setOrderItems(prev => [...prev, newOrderItem]);
    }
  };

  const updateOrderQuantity = (partId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(partId);
      return;
    }
    
    setOrderItems(prev =>
      prev.map(item =>
        item.partId === partId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.unitPrice * newQuantity
            }
          : item
      )
    );
  };

  const removeFromOrder = (partId: string) => {
    setOrderItems(prev => prev.filter(item => item.partId !== partId));
  };

  const calculateTotalCost = () => {
    return orderItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleExportExcel = () => {
    if (orderItems.length === 0) {
      alert('سبد خرید خالی است! ابتدا قطعاتی اضافه کنید.');
      return;
    }

    const success = exportPartsOrder(orderItems);
    if (success) {
      alert('فایل اکسل با موفقیت ایجاد شد!');
    } else {
      alert('خطا در ایجاد فایل اکسل!');
    }
  };

  const submitOrder = () => {
    if (orderItems.length === 0) {
      alert('لطفاً حداقل یک قطعه به سفارش اضافه کنید');
      return;
    }
    
    // Here you would submit to backend
    console.log('Submitting order:', orderItems);
    alert(`سفارش ${orderItems.length} نوع قطعه با موفقیت ثبت شد!`);
    setOrderItems([]);
  };

  const filteredParts = availableParts.filter(part => {
    const matchesCategory = selectedCategory === 'all' || part.categoryId === selectedCategory;
    const matchesSearch = !searchTerm || 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <PersianText>بازگشت</PersianText>
              </Button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  <PersianText>سفارش قطعات</PersianText>
                </h1>
                <p className="text-sm text-gray-600">
                  <PersianText>انتخاب و سفارش قطعات مورد نیاز</PersianText>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="secondary" 
                onClick={handleExportExcel}
                disabled={orderItems.length === 0}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <PersianText>خروجی اکسل</PersianText>
              </Button>
              
              <Button variant="outline" onClick={() => setOrderItems([])}>
                <PersianText>پاک کردن سبد</PersianText>
              </Button>
              
              <Button variant="primary" onClick={submitOrder}>
                <PersianText>ثبت سفارش</PersianText>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Sidebar - Available Parts */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3">
                <PersianText>قطعات موجود</PersianText>
              </h2>
              
              {/* Search */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="جستجو در قطعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              {/* Category Filter */}
              <div className="mb-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">همه دسته‌ها</option>
                  <option value="resistors">مقاومت‌ها</option>
                  <option value="capacitors">خازن‌ها</option>
                  <option value="ics">آی‌سی‌ها</option>
                  <option value="transistors">ترانزیستورها</option>
                  <option value="diodes">دیودها</option>
                </select>
              </div>
            </div>
            
            {/* Parts List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredParts.map((part) => (
                <div
                  key={part.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      <PersianText>{part.name}</PersianText>
                    </h3>
                    <p className="text-xs text-gray-600 font-mono">{part.partNumber}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    <PersianText>موجودی: {part.stockQuantity.toLocaleString('fa-IR')}</PersianText>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-green-600">
                      <PersianText>{part.currentPrice.toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(part, 1)}
                    >
                      <PersianText>+۱</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(part, 5)}
                    >
                      <PersianText>+۵</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(part, 10)}
                    >
                      <PersianText>+۱۰</PersianText>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Order Items */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <PersianText>سبد خرید ({orderItems.length} نوع قطعه)</PersianText>
              </h3>
              
              {/* Order Statistics */}
              {orderItems.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">
                        <PersianText>تعداد انواع:</PersianText>
                      </span>
                      <p className="font-bold text-blue-800">
                        <PersianText>{orderItems.length.toLocaleString('fa-IR')} نوع</PersianText>
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">
                        <PersianText>مجموع تعداد:</PersianText>
                      </span>
                      <p className="font-bold text-blue-800">
                        <PersianText>{calculateTotalItems().toLocaleString('fa-IR')} عدد</PersianText>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {orderItems.length === 0 ? (
                <Card className="p-8 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    <PersianText>سبد خرید خالی است</PersianText>
                  </h4>
                  <p className="text-gray-600">
                    <PersianText>از سایدبار سمت چپ قطعات مورد نیاز را انتخاب کنید</PersianText>
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <Card key={item.partId} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            <PersianText>{item.name}</PersianText>
                          </h4>
                          <p className="text-sm text-gray-600 font-mono">{item.partNumber}</p>
                          <p className="text-xs text-gray-500">
                            <PersianText>{item.unitPrice.toLocaleString('fa-IR')} ریال/عدد</PersianText>
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateOrderQuantity(item.partId, item.quantity - 1)}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </Button>
                            
                            <span className="w-16 text-center font-medium">
                              <PersianText>{item.quantity.toLocaleString('fa-IR')}</PersianText>
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateOrderQuantity(item.partId, item.quantity + 1)}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </Button>
                          </div>
                          
                          <div className="text-left w-28">
                            <p className="font-semibold text-green-600">
                              <PersianText>{item.totalPrice.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromOrder(item.partId)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                <PersianText>خلاصه سفارش</PersianText>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    <PersianText>تعداد انواع:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{orderItems.length.toLocaleString('fa-IR')} نوع</PersianText>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    <PersianText>مجموع قطعات:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{calculateTotalItems().toLocaleString('fa-IR')} عدد</PersianText>
                  </span>
                </div>

                <hr />

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      <PersianText>مجموع کل:</PersianText>
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      <PersianText>{calculateTotalCost().toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p><PersianText>• قیمت‌ها شامل مالیات</PersianText></p>
                  <p><PersianText>• هزینه حمل جداگانه محاسبه می‌شود</PersianText></p>
                  <p><PersianText>• امکان تغییر قیمت تا زمان تایید نهایی</PersianText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 