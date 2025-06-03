'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

interface BoardPart {
  id: string;
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  quantity: number;
  category: string;
  totalPrice: number;
}

interface AvailablePart {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  category: string;
  stock: number;
}

interface BoardData {
  name: string;
  description: string;
  pcbCost: number;
  assemblyCost: number;
  parts: BoardPart[];
}

export default function BoardCalculatorPage() {
  const router = useRouter();
  
  const [boardData, setBoardData] = useState<BoardData>({
    name: '',
    description: '',
    pcbCost: 50000,
    assemblyCost: 25000,
    parts: []
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock available parts data
  const availableParts: AvailablePart[] = [
    {
      id: '1',
      name: 'مقاومت ۱۰کΩ',
      partNumber: 'R-10K-01',
      price: 500,
      category: 'مقاومت‌ها',
      stock: 1500
    },
    {
      id: '2',
      name: 'خازن ۱۰۰μF',
      partNumber: 'C-100UF-16V',
      price: 2000,
      category: 'خازن‌ها',
      stock: 50
    },
    {
      id: '3',
      name: 'IC LM358',
      partNumber: 'IC-LM358-DIP8',
      price: 8000,
      category: 'آی‌سی‌ها',
      stock: 200
    },
    {
      id: '4',
      name: 'ترانزیستور BC547',
      partNumber: 'TR-BC547',
      price: 1500,
      category: 'ترانزیستورها',
      stock: 300
    },
    {
      id: '5',
      name: 'دیود 1N4007',
      partNumber: 'D-1N4007',
      price: 800,
      category: 'دیودها',
      stock: 500
    }
  ];

  const categories = [
    { id: 'all', name: 'همه قطعات' },
    { id: 'مقاومت‌ها', name: 'مقاومت‌ها' },
    { id: 'خازن‌ها', name: 'خازن‌ها' },
    { id: 'آی‌سی‌ها', name: 'آی‌سی‌ها' },
    { id: 'ترانزیستورها', name: 'ترانزیستورها' },
    { id: 'دیودها', name: 'دیودها' }
  ];

  const addPartToBoard = (part: AvailablePart) => {
    const existingPart = boardData.parts.find(p => p.partId === part.id);
    
    if (existingPart) {
      // Increase quantity if part already exists
      updatePartQuantity(existingPart.id, existingPart.quantity + 1);
    } else {
      // Add new part
      const newBoardPart: BoardPart = {
        id: `board_part_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        partId: part.id,
        name: part.name,
        partNumber: part.partNumber,
        unitPrice: part.price,
        quantity: 1,
        category: part.category,
        totalPrice: part.price
      };
      
      setBoardData(prev => ({
        ...prev,
        parts: [...prev.parts, newBoardPart]
      }));
    }
  };

  const updatePartQuantity = (boardPartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removePart(boardPartId);
      return;
    }
    
    setBoardData(prev => ({
      ...prev,
      parts: prev.parts.map(part =>
        part.id === boardPartId
          ? {
              ...part,
              quantity: newQuantity,
              totalPrice: part.unitPrice * newQuantity
            }
          : part
      )
    }));
  };

  const removePart = (boardPartId: string) => {
    setBoardData(prev => ({
      ...prev,
      parts: prev.parts.filter(part => part.id !== boardPartId)
    }));
  };

  const calculatePartsCost = () => {
    return boardData.parts.reduce((total, part) => total + part.totalPrice, 0);
  };

  const calculateTotalCost = () => {
    return calculatePartsCost() + boardData.pcbCost + boardData.assemblyCost;
  };

  const calculateTotalPartsCount = () => {
    return boardData.parts.reduce((total, part) => total + part.quantity, 0);
  };

  const saveBoard = () => {
    if (!boardData.name.trim()) {
      alert('لطفاً نام برد را وارد کنید');
      return;
    }
    
    // Here you would save to backend
    console.log('Saving board:', boardData);
    alert('برد با موفقیت ذخیره شد!');
    router.push('/boards');
  };

  const filteredParts = availableParts.filter(part => {
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
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
                  <PersianText>محاسبه قیمت برد</PersianText>
                </h1>
                <p className="text-sm text-gray-600">
                  <PersianText>افزودن قطعات و محاسبه قیمت نهایی برد</PersianText>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setBoardData(prev => ({ ...prev, parts: [] }))}>
                <PersianText>پاک کردن لیست</PersianText>
              </Button>
              
              <Button variant="primary" onClick={saveBoard}>
                <PersianText>ذخیره برد</PersianText>
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
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-right px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PersianText>{category.name}</PersianText>
                  </button>
                ))}
              </div>
            </div>

            {/* Parts List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredParts.map((part) => (
                <div
                  key={part.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        <PersianText>{part.name}</PersianText>
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">{part.partNumber}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-green-600">
                        <PersianText>{part.price.toLocaleString('fa-IR')} ریال</PersianText>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      <PersianText>موجودی: {part.stock.toLocaleString('fa-IR')}</PersianText>
                    </span>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => addPartToBoard(part)}
                    >
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <PersianText>افزودن</PersianText>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Board Configuration */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <PersianText>نام برد *</PersianText>
                  </label>
                  <input
                    type="text"
                    value={boardData.name}
                    onChange={(e) => setBoardData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="مثال: برد کنترل موتور"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <PersianText>توضیحات</PersianText>
                  </label>
                  <input
                    type="text"
                    value={boardData.description}
                    onChange={(e) => setBoardData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="توضیحات مختصر برد..."
                  />
                </div>
              </div>
            </div>

            {/* Parts List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <PersianText>قطعات برد ({boardData.parts.length} نوع قطعه)</PersianText>
                </h3>
                
                {/* Parts Statistics */}
                {boardData.parts.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-600 font-medium">
                          <PersianText>تعداد نوع قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-blue-800">
                          <PersianText>{boardData.parts.length.toLocaleString('fa-IR')} نوع</PersianText>
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">
                          <PersianText>مجموع کل قطعات:</PersianText>
                        </span>
                        <p className="font-bold text-blue-800">
                          <PersianText>{calculateTotalPartsCount().toLocaleString('fa-IR')} عدد</PersianText>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {boardData.parts.length === 0 ? (
                  <Card className="p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8L9 5l10 8" />
                    </svg>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      <PersianText>هنوز قطعه‌ای اضافه نشده</PersianText>
                    </h4>
                    <p className="text-gray-600">
                      <PersianText>از سایدبار سمت چپ قطعات مورد نیاز را انتخاب کنید</PersianText>
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {boardData.parts.map((part) => (
                      <Card key={part.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              <PersianText>{part.name}</PersianText>
                            </h4>
                            <p className="text-sm text-gray-500 font-mono">{part.partNumber}</p>
                            <p className="text-sm text-gray-600">
                              <PersianText>قیمت واحد: {part.unitPrice.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                            <p className="text-sm text-blue-600 font-medium">
                              <PersianText>تعداد: {part.quantity.toLocaleString('fa-IR')} عدد</PersianText>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePartQuantity(part.id, part.quantity - 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </Button>
                              
                              <span className="w-12 text-center font-medium">
                                <PersianText>{part.quantity.toLocaleString('fa-IR')}</PersianText>
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePartQuantity(part.id, part.quantity + 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </Button>
                            </div>
                            
                            <div className="text-left w-24">
                              <p className="font-semibold text-green-600">
                                <PersianText>{part.totalPrice.toLocaleString('fa-IR')} ریال</PersianText>
                              </p>
                            </div>
                            
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removePart(part.id)}
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
            </div>
          </div>

          {/* Right Sidebar - Price Calculation */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                <PersianText>محاسبه قیمت</PersianText>
              </h3>
              
              <div className="space-y-4">
                {/* Parts Cost */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      <PersianText>قیمت قطعات:</PersianText>
                    </span>
                    <span className="font-semibold text-green-600">
                      <PersianText>{calculatePartsCost().toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <PersianText>{boardData.parts.length} نوع قطعه</PersianText>
                    {boardData.parts.length > 0 && (
                      <>
                        <span className="mx-1">•</span>
                        <PersianText>{calculateTotalPartsCount()} عدد کل</PersianText>
                      </>
                    )}
                  </div>
                </div>

                {/* PCB Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <PersianText>هزینه PCB:</PersianText>
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={boardData.pcbCost}
                      onChange={(e) => setBoardData(prev => ({ ...prev, pcbCost: parseInt(e.target.value) || 0 }))}
                      className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-500">ریال</span>
                  </div>
                </div>

                {/* Assembly Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <PersianText>هزینه مونتاژ:</PersianText>
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={boardData.assemblyCost}
                      onChange={(e) => setBoardData(prev => ({ ...prev, assemblyCost: parseInt(e.target.value) || 0 }))}
                      className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-500">ریال</span>
                  </div>
                </div>

                <hr />

                {/* Total Cost */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      <PersianText>قیمت نهایی:</PersianText>
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      <PersianText>{calculateTotalCost().toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p><PersianText>• قیمت برای یک عدد برد محاسبه شده</PersianText></p>
                  <p><PersianText>• هزینه‌های PCB و مونتاژ قابل تغییر</PersianText></p>
                  <p><PersianText>• قیمت نهایی تقریبی است</PersianText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 