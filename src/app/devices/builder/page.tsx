'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

interface DeviceBoard {
  id: string;
  boardId: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

interface AvailableBoard {
  id: string;
  name: string;
  description: string;
  price: number;
  partsCount: number;
  category: string;
}

interface DeviceData {
  name: string;
  description: string;
  assemblyTime: number; // hours
  hourlyRate: number; // per hour
  testingCost: number;
  enclosureCost: number;
  boards: DeviceBoard[];
}

export default function DeviceBuilderPage() {
  const router = useRouter();
  
  const [deviceData, setDeviceData] = useState<DeviceData>({
    name: '',
    description: '',
    assemblyTime: 4,
    hourlyRate: 150000,
    testingCost: 200000,
    enclosureCost: 500000,
    boards: []
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock available boards data (these would come from saved boards)
  const availableBoards: AvailableBoard[] = [
    {
      id: '1',
      name: 'برد کنترل موتور',
      description: 'برد کنترلی برای موتورهای DC',
      price: 450000,
      partsCount: 25,
      category: 'کنترل'
    },
    {
      id: '2',
      name: 'برد تغذیه',
      description: 'منبع تغذیه ۱۲ ولت ۵ آمپر',
      price: 320000,
      partsCount: 18,
      category: 'تغذیه'
    },
    {
      id: '3',
      name: 'برد سنسور',
      description: 'برد خواندن سنسورهای دما و رطوبت',
      price: 280000,
      partsCount: 15,
      category: 'سنسور'
    },
    {
      id: '4',
      name: 'برد نمایشگر',
      description: 'برد کنترل LCD و LED',
      price: 380000,
      partsCount: 22,
      category: 'نمایش'
    },
    {
      id: '5',
      name: 'برد ارتباطات',
      description: 'برد WiFi و Bluetooth',
      price: 520000,
      partsCount: 30,
      category: 'ارتباطات'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه بردها' },
    { id: 'کنترل', name: 'بردهای کنترل' },
    { id: 'تغذیه', name: 'بردهای تغذیه' },
    { id: 'سنسور', name: 'بردهای سنسور' },
    { id: 'نمایش', name: 'بردهای نمایش' },
    { id: 'ارتباطات', name: 'بردهای ارتباطات' }
  ];

  const addBoardToDevice = (board: AvailableBoard) => {
    const existingBoard = deviceData.boards.find(b => b.boardId === board.id);
    
    if (existingBoard) {
      // Increase quantity if board already exists
      updateBoardQuantity(existingBoard.id, existingBoard.quantity + 1);
    } else {
      // Add new board
      const newDeviceBoard: DeviceBoard = {
        id: `device_board_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        boardId: board.id,
        name: board.name,
        description: board.description,
        unitPrice: board.price,
        quantity: 1,
        totalPrice: board.price
      };
      
      setDeviceData(prev => ({
        ...prev,
        boards: [...prev.boards, newDeviceBoard]
      }));
    }
  };

  const updateBoardQuantity = (deviceBoardId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeBoard(deviceBoardId);
      return;
    }
    
    setDeviceData(prev => ({
      ...prev,
      boards: prev.boards.map(board =>
        board.id === deviceBoardId
          ? {
              ...board,
              quantity: newQuantity,
              totalPrice: board.unitPrice * newQuantity
            }
          : board
      )
    }));
  };

  const removeBoard = (deviceBoardId: string) => {
    setDeviceData(prev => ({
      ...prev,
      boards: prev.boards.filter(board => board.id !== deviceBoardId)
    }));
  };

  const calculateBoardsCost = () => {
    return deviceData.boards.reduce((total, board) => total + board.totalPrice, 0);
  };

  const calculateAssemblyCost = () => {
    return deviceData.assemblyTime * deviceData.hourlyRate;
  };

  const calculateTotalCost = () => {
    return calculateBoardsCost() + calculateAssemblyCost() + deviceData.testingCost + deviceData.enclosureCost;
  };

  const saveDevice = () => {
    if (!deviceData.name.trim()) {
      alert('لطفاً نام دستگاه را وارد کنید');
      return;
    }
    
    // Here you would save to backend
    console.log('Saving device:', deviceData);
    alert('دستگاه با موفقیت ذخیره شد!');
    router.push('/devices');
  };

  const filteredBoards = availableBoards.filter(board => {
    const matchesCategory = selectedCategory === 'all' || board.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description.toLowerCase().includes(searchTerm.toLowerCase());
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
                  <PersianText>سازنده دستگاه</PersianText>
                </h1>
                <p className="text-sm text-gray-600">
                  <PersianText>انتخاب بردها و محاسبه قیمت نهایی دستگاه</PersianText>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setDeviceData(prev => ({ ...prev, boards: [] }))}>
                <PersianText>پاک کردن لیست</PersianText>
              </Button>
              
              <Button variant="primary" onClick={saveDevice}>
                <PersianText>ذخیره دستگاه</PersianText>
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

            {/* Boards List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredBoards.map((board) => (
                <div
                  key={board.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        <PersianText>{board.name}</PersianText>
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">{board.description}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-green-600">
                        <PersianText>{board.price.toLocaleString('fa-IR')} ریال</PersianText>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      <PersianText>{board.partsCount} قطعه</PersianText>
                    </span>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => addBoardToDevice(board)}
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

          {/* Main Content - Device Configuration */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <PersianText>نام دستگاه *</PersianText>
                  </label>
                  <input
                    type="text"
                    value={deviceData.name}
                    onChange={(e) => setDeviceData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="مثال: سیستم کنترل هوشمند"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <PersianText>توضیحات</PersianText>
                  </label>
                  <input
                    type="text"
                    value={deviceData.description}
                    onChange={(e) => setDeviceData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="توضیحات مختصر دستگاه..."
                  />
                </div>
              </div>
            </div>

            {/* Boards List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <PersianText>بردهای دستگاه ({deviceData.boards.length} برد)</PersianText>
                </h3>
                
                {deviceData.boards.length === 0 ? (
                  <Card className="p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      <PersianText>هنوز بردی اضافه نشده</PersianText>
                    </h4>
                    <p className="text-gray-600">
                      <PersianText>از سایدبار سمت چپ بردهای مورد نیاز را انتخاب کنید</PersianText>
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {deviceData.boards.map((board) => (
                      <Card key={board.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              <PersianText>{board.name}</PersianText>
                            </h4>
                            <p className="text-sm text-gray-600">{board.description}</p>
                            <p className="text-sm text-gray-600">
                              <PersianText>قیمت واحد: {board.unitPrice.toLocaleString('fa-IR')} ریال</PersianText>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateBoardQuantity(board.id, board.quantity - 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </Button>
                              
                              <span className="w-12 text-center font-medium">
                                <PersianText>{board.quantity.toLocaleString('fa-IR')}</PersianText>
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateBoardQuantity(board.id, board.quantity + 1)}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </Button>
                            </div>
                            
                            <div className="text-left w-28">
                              <p className="font-semibold text-green-600">
                                <PersianText>{board.totalPrice.toLocaleString('fa-IR')} ریال</PersianText>
                              </p>
                            </div>
                            
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeBoard(board.id)}
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

          {/* Right Sidebar - Cost Calculation */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                <PersianText>محاسبه قیمت</PersianText>
              </h3>
              
              <div className="space-y-4">
                {/* Boards Cost */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      <PersianText>قیمت بردها:</PersianText>
                    </span>
                    <span className="font-semibold text-green-600">
                      <PersianText>{calculateBoardsCost().toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <PersianText>{deviceData.boards.length} برد</PersianText>
                  </div>
                </div>

                {/* Assembly Time & Cost */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      <PersianText>زمان مونتاژ (ساعت):</PersianText>
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={deviceData.assemblyTime}
                      onChange={(e) => setDeviceData(prev => ({ ...prev, assemblyTime: parseFloat(e.target.value) || 0 }))}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      <PersianText>نرخ ساعتی:</PersianText>
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={deviceData.hourlyRate}
                        onChange={(e) => setDeviceData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-xs text-gray-500">ریال</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      <PersianText>هزینه مونتاژ:</PersianText>
                    </span>
                    <span className="font-semibold text-blue-600">
                      <PersianText>{calculateAssemblyCost().toLocaleString('fa-IR')} ریال</PersianText>
                    </span>
                  </div>
                </div>

                {/* Testing Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <PersianText>هزینه تست:</PersianText>
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={deviceData.testingCost}
                      onChange={(e) => setDeviceData(prev => ({ ...prev, testingCost: parseInt(e.target.value) || 0 }))}
                      className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-500">ریال</span>
                  </div>
                </div>

                {/* Enclosure Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <PersianText>هزینه کیس:</PersianText>
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={deviceData.enclosureCost}
                      onChange={(e) => setDeviceData(prev => ({ ...prev, enclosureCost: parseInt(e.target.value) || 0 }))}
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
                  <p><PersianText>• قیمت برای یک دستگاه محاسبه شده</PersianText></p>
                  <p><PersianText>• زمان مونتاژ و نرخ ساعتی قابل تغییر</PersianText></p>
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