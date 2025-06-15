'use client';

import React, { useState } from 'react';
import { useBoards, useDevices, useParts, useProcesses } from '@/hooks/useApiData';
import ApiConnectionStatus from '@/components/api/ApiConnectionStatus';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ApiManagementPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // API Hooks
  const {
    boards,
    loading: boardsLoading,
    error: boardsError,
    refetch: refetchBoards
  } = useBoards();

  const {
    devices,
    loading: devicesLoading,
    error: devicesError,
    refetch: refetchDevices
  } = useDevices();

  const {
    parts,
    loading: partsLoading,
    error: partsError,
    refetch: refetchParts
  } = useParts();

  const {
    processes,
    loading: processesLoading,
    error: processesError,
    refetch: refetchProcesses
  } = useProcesses();

  const tabs = [
    { id: 'boards', label: 'بردها', count: boards.length },
    { id: 'devices', label: 'دستگاه‌ها', count: devices.length },
    { id: 'parts', label: 'قطعات', count: parts.length },
    { id: 'processes', label: 'پردازش‌ها', count: processes.length },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderApiData = (data: unknown[], loading: boolean, error: string | null, refetch: () => void) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="mr-2">در حال بارگذاری...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-red-800">خطا در دریافت داده‌ها</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
            <button
              onClick={refetch}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>هیچ داده‌ای یافت نشد</p>
          <button
            onClick={refetch}
            className="mt-2 text-blue-500 hover:text-blue-700 underline"
          >
            بارگذاری مجدد
          </button>
        </div>
      );
    }

          return (
        <div className="space-y-2">
          {data.slice(0, 5).map((item: unknown, index: number) => {
            const typedItem = item as { id?: number; name?: string; bname?: string; description?: string; price?: number };
            return (
              <div key={typedItem.id || index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {typedItem.name || typedItem.bname || `آیتم ${index + 1}`}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ID: {typedItem.id} {typedItem.description && `- ${typedItem.description}`}
                    </p>
                  </div>
                  {typedItem.price && (
                    <span className="text-sm font-medium text-green-600">
                      {typedItem.price.toLocaleString()} ریال
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {data.length > 5 && (
            <div className="text-center py-2">
              <span className="text-sm text-gray-500">
                و {data.length - 5} مورد دیگر...
              </span>
            </div>
          )}
        </div>
      );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مدیریت API</h1>
              <p className="mt-2 text-gray-600">
                اتصال و مدیریت داده‌های سیستم قیمت‌گذاری قطعات الکترونیکی
              </p>
            </div>
            <ApiConnectionStatus size="lg" />
          </div>
        </div>

        {/* API Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">وضعیت اتصال API</h2>
            <ApiConnectionStatus />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tabs.map((tab) => (
              <div key={tab.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{tab.count}</div>
                <div className="text-sm text-gray-600">{tab.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Data Sections */}
        <div className="space-y-6">
          {/* Boards Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('boards')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">بردها</h3>
                  <span className="mr-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {boards.length} مورد
                  </span>
                </div>
                {expandedSection === 'boards' ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === 'boards' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4">
                  {renderApiData(boards, boardsLoading, boardsError, refetchBoards)}
                </div>
              </div>
            )}
          </div>

          {/* Devices Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('devices')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">دستگاه‌ها</h3>
                  <span className="mr-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {devices.length} مورد
                  </span>
                </div>
                {expandedSection === 'devices' ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === 'devices' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4">
                  {renderApiData(devices, devicesLoading, devicesError, refetchDevices)}
                </div>
              </div>
            )}
          </div>

          {/* Parts Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('parts')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">قطعات</h3>
                  <span className="mr-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {parts.length} مورد
                  </span>
                </div>
                {expandedSection === 'parts' ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === 'parts' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4">
                  {renderApiData(parts, partsLoading, partsError, refetchParts)}
                </div>
              </div>
            )}
          </div>

          {/* Processes Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('processes')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">پردازش‌ها</h3>
                  <span className="mr-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {processes.length} مورد
                  </span>
                </div>
                {expandedSection === 'processes' ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === 'processes' && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4">
                  {renderApiData(processes, processesLoading, processesError, refetchProcesses)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 