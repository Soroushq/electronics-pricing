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

interface DeviceBoard {
  boardId: string;
  name: string;
  quantity: number;
  unitCost: number;
  parts: BoardPart[];
}

interface Device {
  id: string;
  name: string;
  description: string;
  testingCost: number;
  assemblyOverhead: number;
  totalCost: number;
  boards: DeviceBoard[];
}

interface OrderItem {
  deviceId: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  boards: DeviceBoard[];
}

interface BoardBOMItem {
  boardId: string;
  name: string;
  totalQuantity: number;
  unitCost: number;
  totalCost: number;
  usedInDevices: string[];
}

interface PartBOMItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  totalQuantity: number;
  totalCost: number;
  usedInBoards: string[];
}

export default function DevicesOrderPage() {
  const router = useRouter();
  const { exportDevicesOrder } = useExcelExport();
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock devices data
  const availableDevices: Device[] = [
    {
      id: '1',
      name: 'کنترلر هوشمند موتور',
      description: 'سیستم کنترل موتور با سنسور دما',
      testingCost: 30000,
      assemblyOverhead: 50000,
      totalCost: 219500,
      boards: [
        {
          boardId: '1',
          name: 'برد کنترل موتور',
          quantity: 1,
          unitCost: 87000,
          parts: [
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 3 },
            { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 2 },
            { partId: '3', name: 'IC LM358', partNumber: 'IC-LM358-DIP8', unitPrice: 8000, quantity: 1 }
          ]
        },
        {
          boardId: '2',
          name: 'برد سنسور دما',
          quantity: 1,
          unitCost: 52500,
          parts: [
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 2 },
            { partId: '4', name: 'ترانزیستور BC547', partNumber: 'TR-BC547', unitPrice: 1500, quantity: 1 },
            { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 2 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'منبع تغذیه تنظیمی',
      description: 'منبع تغذیه ۵ ولت با کنترل جریان',
      testingCost: 20000,
      assemblyOverhead: 30000,
      totalCost: 194000,
      boards: [
        {
          boardId: '3',
          name: 'برد تغذیه',
          quantity: 2,
          unitCost: 72000,
          parts: [
            { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 4 },
            { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 4 },
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 1 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'سیستم مانیتورینگ کامل',
      description: 'سیستم کنترل و نظارت چندمنظوره',
      testingCost: 50000,
      assemblyOverhead: 80000,
      totalCost: 342000,
      boards: [
        {
          boardId: '1',
          name: 'برد کنترل موتور',
          quantity: 1,
          unitCost: 87000,
          parts: [
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 3 },
            { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 2 },
            { partId: '3', name: 'IC LM358', partNumber: 'IC-LM358-DIP8', unitPrice: 8000, quantity: 1 }
          ]
        },
        {
          boardId: '2',
          name: 'برد سنسور دما',
          quantity: 2,
          unitCost: 52500,
          parts: [
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 2 },
            { partId: '4', name: 'ترانزیستور BC547', partNumber: 'TR-BC547', unitPrice: 1500, quantity: 1 },
            { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 2 }
          ]
        },
        {
          boardId: '3',
          name: 'برد تغذیه',
          quantity: 1,
          unitCost: 72000,
          parts: [
            { partId: '2', name: 'خازن ۱۰۰μF', partNumber: 'C-100UF-16V', unitPrice: 2000, quantity: 4 },
            { partId: '5', name: 'دیود 1N4007', partNumber: 'D-1N4007', unitPrice: 800, quantity: 4 },
            { partId: '1', name: 'مقاومت ۱۰کΩ', partNumber: 'R-10K-01', unitPrice: 500, quantity: 1 }
          ]
        }
      ]
    }
  ];

  const addToOrder = (device: Device, quantity: number) => {
    const existingItem = orderItems.find(item => item.deviceId === device.id);
    
    if (existingItem) {
      updateOrderQuantity(device.id, existingItem.quantity + quantity);
    } else {
      const newOrderItem: OrderItem = {
        deviceId: device.id,
        name: device.name,
        quantity: quantity,
        unitCost: device.totalCost,
        totalCost: device.totalCost * quantity,
        boards: device.boards
      };
      
      setOrderItems(prev => [...prev, newOrderItem]);
    }
  };

  const updateOrderQuantity = (deviceId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(deviceId);
      return;
    }
    
    setOrderItems(prev =>
      prev.map(item =>
        item.deviceId === deviceId
          ? {
              ...item,
              quantity: newQuantity,
              totalCost: item.unitCost * newQuantity
            }
          : item
      )
    );
  };

  const removeFromOrder = (deviceId: string) => {
    setOrderItems(prev => prev.filter(item => item.deviceId !== deviceId));
  };

  const calculateTotalCost = () => {
    return orderItems.reduce((total, item) => total + item.totalCost, 0);
  };

  const calculateTotalDevices = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate Board BOM - aggregate boards needed for all ordered devices
  const calculateBoardBOM = (): BoardBOMItem[] => {
    const boardBOMMap = new Map<string, BoardBOMItem>();
    
    orderItems.forEach(orderItem => {
      orderItem.boards.forEach(board => {
        const totalBoardQuantity = board.quantity * orderItem.quantity;
        const existingBoardBOM = boardBOMMap.get(board.boardId);
        
        if (existingBoardBOM) {
          existingBoardBOM.totalQuantity += totalBoardQuantity;
          existingBoardBOM.totalCost = existingBoardBOM.totalQuantity * existingBoardBOM.unitCost;
          existingBoardBOM.usedInDevices.push(`${orderItem.name} (${orderItem.quantity}×)`);
        } else {
          boardBOMMap.set(board.boardId, {
            boardId: board.boardId,
            name: board.name,
            totalQuantity: totalBoardQuantity,
            unitCost: board.unitCost,
            totalCost: totalBoardQuantity * board.unitCost,
            usedInDevices: [`${orderItem.name} (${orderItem.quantity}×)`]
          });
        }
      });
    });
    
    return Array.from(boardBOMMap.values());
  };

  // Calculate Part BOM - aggregate parts needed for all ordered devices
  const calculatePartBOM = (): PartBOMItem[] => {
    const partBOMMap = new Map<string, PartBOMItem>();
    
    orderItems.forEach(orderItem => {
      orderItem.boards.forEach(deviceBoard => {
        deviceBoard.parts.forEach(part => {
          const totalPartQuantity = part.quantity * deviceBoard.quantity * orderItem.quantity;
          const existingPartBOM = partBOMMap.get(part.partId);
          
          if (existingPartBOM) {
            existingPartBOM.totalQuantity += totalPartQuantity;
            existingPartBOM.totalCost = existingPartBOM.totalQuantity * existingPartBOM.unitPrice;
            if (!existingPartBOM.usedInBoards.includes(deviceBoard.name)) {
              existingPartBOM.usedInBoards.push(deviceBoard.name);
            }
          } else {
            partBOMMap.set(part.partId, {
              partId: part.partId,
              name: part.name,
              partNumber: part.partNumber,
              unitPrice: part.unitPrice,
              totalQuantity: totalPartQuantity,
              totalCost: totalPartQuantity * part.unitPrice,
              usedInBoards: [deviceBoard.name]
            });
          }
        });
      });
    });
    
    return Array.from(partBOMMap.values());
  };

  const handleExportExcel = () => {
    if (orderItems.length === 0) {
      alert('سبد خرید خالی است! ابتدا دستگاه‌هایی اضافه کنید.');
      return;
    }

    const boardBOM = calculateBoardBOM();
    const partBOM = calculatePartBOM();
    const success = exportDevicesOrder(orderItems, boardBOM, partBOM);
    if (success) {
      alert('فایل اکسل با موفقیت ایجاد شد!');
    } else {
      alert('خطا در ایجاد فایل اکسل!');
    }
  };

  const submitOrder = () => {
    if (orderItems.length === 0) {
      alert('لطفاً حداقل یک دستگاه به سفارش اضافه کنید');
      return;
    }
    
    const boardBOM = calculateBoardBOM();
    const partBOM = calculatePartBOM();
    console.log('Submitting device order:', { orderItems, boardBOM, partBOM });
    alert(`سفارش ${orderItems.length} نوع دستگاه (${calculateTotalDevices()} عدد) با موفقیت ثبت شد!`);
    setOrderItems([]);
  };

  const filteredDevices = availableDevices.filter(device => {
    const matchesSearch = !searchTerm || 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const boardBOM = calculateBoardBOM();
  const partBOM = calculatePartBOM();

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
                  <PersianText>سفارش دستگاه</PersianText>
                </h1>
                <p className="text-sm text-gray-600">
                  <PersianText>انتخاب دستگاه و محاسبه کامل BOM</PersianText>
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
          {/* Left Sidebar - Available Devices */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3">
                <PersianText>دستگاه‌های موجود</PersianText>
              </h2>
              
              {/* Search */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="جستجو در دستگاه‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Devices List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      <PersianText>{device.name}</PersianText>
                    </h3>
                    <p className="text-xs text-gray-600">{device.description}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    <PersianText>{device.boards.length} نوع برد</PersianText>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-green-600">
                      <PersianText>{device.totalCost.toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(device, 1)}
                    >
                      <PersianText>+۱</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(device, 5)}
                    >
                      <PersianText>+۵</PersianText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOrder(device, 10)}
                    >
                      <PersianText>+۱۰</PersianText>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Order Items & BOM */}
          <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Ordered Devices */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  <PersianText>سبد خرید ({orderItems.length} نوع دستگاه)</PersianText>
                </h3>
                
                {orderItems.length === 0 ? (
                  <Card className="p-6 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <h4 className="text-md font-medium text-gray-900 mb-1">
                      <PersianText>سبد خرید خالی است</PersianText>
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <PersianText>از سایدبار سمت چپ دستگاه‌های مورد نیاز را انتخاب کنید</PersianText>
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <Card key={item.deviceId} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              <PersianText>{item.name}</PersianText>
                            </h4>
                            <p className="text-sm text-gray-600">
                              <PersianText>قیمت واحد: {item.unitCost.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                            <p className="text-xs text-blue-600">
                              <PersianText>{item.boards.length} نوع برد</PersianText>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderQuantity(item.deviceId, item.quantity - 1)}
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
                                onClick={() => updateOrderQuantity(item.deviceId, item.quantity + 1)}
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
                              onClick={() => removeFromOrder(item.deviceId)}
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

              {/* Board BOM Section */}
              {boardBOM.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <PersianText>فهرست بردهای مورد نیاز</PersianText>
                  </h3>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700 font-medium">
                          <PersianText>تعداد انواع برد:</PersianText>
                        </span>
                        <p className="font-bold text-blue-800">
                          <PersianText>{boardBOM.length.toLocaleString('fa-IR')} نوع</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">
                          <PersianText>مجموع بردها:</PersianText>
                        </span>
                        <p className="font-bold text-blue-800">
                          <PersianText>{boardBOM.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">
                          <PersianText>هزینه بردها:</PersianText>
                        </span>
                        <p className="font-bold text-blue-800">
                          <PersianText>{boardBOM.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString('fa-IR')} ریال</PersianText>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {boardBOM.map((item) => (
                      <Card key={item.boardId} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              <PersianText>{item.name}</PersianText>
                            </h4>
                            <p className="text-xs text-gray-600">
                              <PersianText>استفاده در: {item.usedInDevices.join(', ')}</PersianText>
                            </p>
                          </div>
                          
                          <div className="text-left">
                            <p className="text-sm font-medium text-blue-600">
                              <PersianText>{item.totalQuantity.toLocaleString('fa-IR')} عدد</PersianText>
                            </p>
                            <p className="text-xs text-gray-500">
                              <PersianText>{item.unitCost.toLocaleString('fa-IR')} ریال/عدد</PersianText>
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

              {/* Part BOM Section */}
              {partBOM.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <PersianText>فهرست قطعات مورد نیاز (BOM کامل)</PersianText>
                  </h3>
                  
                  <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>تعداد انواع قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{partBOM.length.toLocaleString('fa-IR')} نوع</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>مجموع قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{partBOM.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-yellow-700 font-medium">
                          <PersianText>هزینه قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-yellow-800">
                          <PersianText>{partBOM.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString('fa-IR')} ریال</PersianText>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {partBOM.map((item) => (
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
                    <PersianText>تعداد انواع دستگاه:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{orderItems.length.toLocaleString('fa-IR')} نوع</PersianText>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    <PersianText>مجموع دستگاه‌ها:</PersianText>
                  </span>
                  <span className="font-medium">
                    <PersianText>{calculateTotalDevices().toLocaleString('fa-IR')} عدد</PersianText>
                  </span>
                </div>

                {boardBOM.length > 0 && (
                  <>
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>انواع برد:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{boardBOM.length.toLocaleString('fa-IR')} نوع</PersianText>
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>مجموع بردها:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{boardBOM.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
                      </span>
                    </div>
                  </>
                )}

                {partBOM.length > 0 && (
                  <>
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>انواع قطعه:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{partBOM.length.toLocaleString('fa-IR')} نوع</PersianText>
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        <PersianText>مجموع قطعات:</PersianText>
                      </span>
                      <span className="font-medium">
                        <PersianText>{partBOM.reduce((sum, item) => sum + item.totalQuantity, 0).toLocaleString('fa-IR')} عدد</PersianText>
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
                  <p><PersianText>• شامل همه هزینه‌های تولید</PersianText></p>
                  <p><PersianText>• BOM کامل محاسبه شده</PersianText></p>
                  <p><PersianText>• آماده تولید انبوه</PersianText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 