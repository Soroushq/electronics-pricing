'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';
import { useExcelExport } from '@/hooks/useExcelExport';

interface BoardPart {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  quantity: number;
}

interface Board {
  id: string;
  name: string;
  description: string;
  pcbCost: number;
  assemblyCost: number;
  totalCost: number;
  parts: BoardPart[];
}

interface OrderItem {
  boardId: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  parts: BoardPart[];
}

interface BOMItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  totalQuantity: number;
  totalCost: number;
  usedInBoards: string[];
}

export default function BoardsOrderPage() {
  const router = useRouter();
  const { exportBoardsOrder } = useExcelExport();
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock boards data
  const availableBoards: Board[] = [
    {
      id: '1',
      name: 'برد کنترل موتور',
      description: 'برد کنترل موتور استپر',
      pcbCost: 50000,
      assemblyCost: 25000,
      totalCost: 87000,
      parts: [
        { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 3 },
        { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 2 },
        { partId: '3', name: 'IC LM358', partNumber: 'IC-LM358-DIP8', unitPrice: 8000, quantity: 1 }
      ]
    },
    {
      id: '2',
      name: 'برد سنسور دما',
      description: 'برد اندازه‌گیری دمای محیط',
      pcbCost: 30000,
      assemblyCost: 15000,
      totalCost: 52500,
      parts: [
        { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 2 },
        { partId: '4', name: 'ترانزیستور BC547', partNumber: 'TR-BC547', unitPrice: 1500, quantity: 1 },
        { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 2 }
      ]
    },
    {
      id: '3',
      name: 'برد تغذیه',
      description: 'برد تنظیم ولتاژ ۵ ولت',
      pcbCost: 40000,
      assemblyCost: 20000,
      totalCost: 72000,
      parts: [
        { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 4 },
        { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 4 },
        { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 1 }
      ]
    }
  ];

  const addToOrder = (board: Board, quantity: number) => {
    const existingItem = orderItems.find(item => item.boardId === board.id);
    
    if (existingItem) {
      updateOrderQuantity(board.id, existingItem.quantity + quantity);
    } else {
      const newOrderItem: OrderItem = {
        boardId: board.id,
        name: board.name,
        quantity: quantity,
        unitCost: board.totalCost,
        totalCost: board.totalCost * quantity,
        parts: board.parts
      };
      
      setOrderItems(prev => [...prev, newOrderItem]);
    }
  };

  const updateOrderQuantity = (boardId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(boardId);
      return;
    }
    
    setOrderItems(prev =>
      prev.map(item =>
        item.boardId === boardId
          ? {
              ...item,
              quantity: newQuantity,
              totalCost: item.unitCost * newQuantity
            }
          : item
      )
    );
  };

  const removeFromOrder = (boardId: string) => {
    setOrderItems(prev => prev.filter(item => item.boardId !== boardId));
  };

  const calculateTotalCost = () => {
    return orderItems.reduce((total, item) => total + item.totalCost, 0);
  };

  const calculateTotalBoards = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate BOM (Bill of Materials) - aggregate parts needed for all ordered boards
  const calculateBOM = (): BOMItem[] => {
    const bomMap = new Map<string, BOMItem>();
    
    orderItems.forEach(orderItem => {
      orderItem.parts.forEach(part => {
        const totalPartQuantity = part.quantity * orderItem.quantity;
        const existingBOMItem = bomMap.get(part.partId);
        
        if (existingBOMItem) {
          existingBOMItem.totalQuantity += totalPartQuantity;
          existingBOMItem.totalCost = existingBOMItem.totalQuantity * existingBOMItem.unitPrice;
          existingBOMItem.usedInBoards.push(`${orderItem.name} (${orderItem.quantity}×)`);
        } else {
          bomMap.set(part.partId, {
            partId: part.partId,
            name: part.name,
            partNumber: part.partNumber,
            unitPrice: part.unitPrice,
            totalQuantity: totalPartQuantity,
            totalCost: totalPartQuantity * part.unitPrice,
            usedInBoards: [`${orderItem.name} (${orderItem.quantity}×)`]
          });
        }
      });
    });
    
    return Array.from(bomMap.values());
  };

  const handleExportExcel = () => {
    if (orderItems.length === 0) {
      alert('سبد خرید خالی است! ابتدا بردهایی اضافه کنید.');
      return;
    }

    const bom = calculateBOM();
    const success = exportBoardsOrder(orderItems, bom);
    if (success) {
      alert('فایل اکسل با موفقیت ایجاد شد!');
    } else {
      alert('خطا در ایجاد فایل اکسل!');
    }
  };

  const submitOrder = () => {
    if (orderItems.length === 0) {
      alert('لطفاً حداقل یک برد به سفارش اضافه کنید');
      return;
    }
    
    const bom = calculateBOM();
    console.log('Submitting board order:', { orderItems, bom });
    alert(`سفارش ${orderItems.length} نوع برد (${calculateTotalBoards()} عدد) با موفقیت ثبت شد!`);
    setOrderItems([]);
  };

  const filteredBoards = availableBoards.filter(board => {
    const matchesSearch = !searchTerm || 
      board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const bom = calculateBOM();

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
                  <PersianText>سفارش برد</PersianText>
                </h1>
                <p className="text-sm text-gray-600">
                  <PersianText>انتخاب برد و محاسبه قطعات مورد نیاز</PersianText>
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
          {/* Left Sidebar - Available Boards */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3">
                <PersianText>بردهای موجود</PersianText>
              </h2>
              
              {/* Search */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="جستجو در بردها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Boards List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredBoards.map((board) => (
                <div
                  key={board.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      <PersianText>{board.name}</PersianText>
                    </h3>
                    <p className="text-xs text-gray-600">{board.description}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    <PersianText>{board.parts.length} نوع قطعه</PersianText>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-green-600">
                      <PersianText>{board.totalCost.toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(board, 1)}
                    >
                      <PersianText>+۱</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(board, 5)}
                    >
                      <PersianText>+۵</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(board, 10)}
                    >
                      <PersianText>+۱۰</PersianText>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Order Items & BOM */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="p-4 space-y-4">
              {/* Ordered Boards */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  <PersianText>سبد خرید ({orderItems.length} نوع برد)</PersianText>
                </h3>
                
                {orderItems.length === 0 ? (
                  <Card className="p-6 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8L9 5l10 8" />
                    </svg>
                    <h4 className="text-md font-medium text-gray-900 mb-1">
                      <PersianText>سبد خرید خالی است</PersianText>
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <PersianText>از سایدبار سمت چپ بردهای مورد نیاز را انتخاب کنید</PersianText>
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <Card key={item.boardId} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              <PersianText>{item.name}</PersianText>
                            </h4>
                            <p className="text-sm text-gray-600">
                              <PersianText>قیمت واحد: {item.unitCost.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                            <p className="text-xs text-blue-600">
                              <PersianText>{item.parts.length} نوع قطعه</PersianText>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderQuantity(item.boardId, item.quantity - 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </Button>
                              
                              <span className="w-12 text-center font-medium">
                                <PersianText>{item.quantity.toLocaleString('fa-IR')}</PersianText>
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderQuantity(item.boardId, item.quantity + 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </Button>
                            </div>
                            
                            <div className="text-left w-28">
                              <p className="font-semibold text-green-600">
                                <PersianText>{item.totalCost.toLocaleString('fa-IR')} ریال</PersianText>
                              </p>
                            </div>
                            
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeFromOrder(item.boardId)}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* BOM Section */}
              {bom.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <PersianText>فهرست قطعات مورد نیاز (BOM)</PersianText>
                  </h3>
                  
                  <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>تعداد انواع قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{bom.length.toLocaleString('fa-IR')} نوع</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>مجموع قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{bom.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>هزینه قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{bom.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString('fa-IR')} ریال</PersianText>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {bom.map((item) => (
                      <Card key={item.partId} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              <PersianText>{item.name}</PersianText>
                            </h4>
                            <p className="text-xs text-gray-500 font-mono">{item.partNumber}</p>
                            <p className="text-xs text-gray-600">
                              <PersianText>استفاده در: {item.usedInBoards.join(', ')}</PersianText>
                            </p>
                          </div>
                          
                          <div className="text-left">
                            <p className="text-sm font-medium text-blue-600">
                              <PersianText>{item.totalQuantity.toLocaleString('fa-IR')} عدد</PersianText>
                            </p>
                            <p className="text-xs text-gray-500">
                              <PersianText>{item.unitPrice.toLocaleString('fa-IR')} ریال/عدد</PersianText>
                            </p>
                            <p className="text-sm font-semibold text-green-600">
                              <PersianText>{item.totalCost.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
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
                    <PersianText>تعداد انواع برد:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{orderItems.length.toLocaleString('fa-IR')} نوع</PersianText>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    <PersianText>مجموع بردها:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{calculateTotalBoards().toLocaleString('fa-IR')} عدد</PersianText>
                  </span>
                </div>

                {bom.length > 0 && (
                  <>
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>انواع قطعات:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{bom.length.toLocaleString('fa-IR')} نوع</PersianText>
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>مجموع قطعات:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{bom.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
                      </span>
                    </div>
                  </>
                )}

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
                  <p><PersianText>• شامل هزینه PCB و مونتاژ</PersianText></p>
                  <p><PersianText>• فهرست قطعات محاسبه شده</PersianText></p>
                  <p><PersianText>• هزینه حمل جداگانه</PersianText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 