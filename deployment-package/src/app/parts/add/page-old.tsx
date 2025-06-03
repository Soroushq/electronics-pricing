'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppLayout } from '@/components/layout/AppLayout';

interface PartSpecification {
  name: string;
  value: string;
  unit: string;
}

interface PartFormData {
  name: string;
  nameEn: string;
  partNumber: string;
  description: string;
  categoryId: string;
  unitId: string;
  currentPrice: number;
  currency: string;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  supplierId: string;
  specifications: PartSpecification[];
  tags: string[];
  isActive: boolean;
  isObsolete: boolean;
  notes: string;
}

export default function AddPartPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState<PartFormData>({
    name: '',
    nameEn: '',
    partNumber: '',
    description: '',
    categoryId: '',
    unitId: '',
    currentPrice: 0,
    currency: 'ریال',
    stockQuantity: 0,
    minStockLevel: 0,
    maxStockLevel: 0,
    supplierId: '',
    specifications: [{ name: '', value: '', unit: '' }],
    tags: [],
    isActive: true,
    isObsolete: false,
    notes: '',
  });

  const [tagInput, setTagInput] = useState('');

  // Mock data for dropdowns
  const categories = [
    { id: '1', name: 'مقاومت‌ها' },
    { id: '2', name: 'خازن‌ها' },
    { id: '3', name: 'آی‌سی‌ها' },
    { id: '4', name: 'ترانزیستورها' },
    { id: '5', name: 'دیودها' },
  ];

  const units = [
    { id: '1', name: 'عدد', symbol: 'pcs' },
    { id: '2', name: 'متر', symbol: 'm' },
    { id: '3', name: 'کیلوگرم', symbol: 'kg' },
  ];

  const suppliers = [
    { id: '1', name: 'تامین‌کننده الکترونیک پارس' },
    { id: '2', name: 'شرکت قطعات ایران' },
    { id: '3', name: 'الکترونیک مدرن' },
  ];

  const currencies = ['ریال', 'تومان', 'دلار', 'یورو'];

  const handleInputChange = (field: keyof PartFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (index: number, field: keyof PartSpecification, value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '', unit: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the data to your backend
      console.log('Form Data:', formData);
      console.log('Uploaded Files:', uploadedFiles);
      
      // Show success message and redirect
      alert('قطعه با موفقیت اضافه شد!');
      router.push('/parts');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('خطا در ثبت قطعه');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
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
            <h1 className="text-2xl font-bold text-gray-900">
              <PersianText>افزودن قطعه جدید</PersianText>
            </h1>
            <p className="text-sm text-gray-600">
              <PersianText>اطلاعات کامل قطعه الکترونیکی را وارد کنید</PersianText>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>اطلاعات پایه</PersianText>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>نام قطعه (فارسی) *</PersianText>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: مقاومت ۱۰ کیلو اهم"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>نام انگلیسی</PersianText>
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange('nameEn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Example: 10k Ohm Resistor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>شماره قطعه *</PersianText>
                </label>
                <input
                  type="text"
                  required
                  value={formData.partNumber}
                  onChange={(e) => handleInputChange('partNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="مثال: R-10K-01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>دسته‌بندی *</PersianText>
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <PersianText>توضیحات</PersianText>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="توضیحات تکمیلی در مورد قطعه..."
              />
            </div>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>قیمت و انبارداری</PersianText>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>قیمت فعلی *</PersianText>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.currentPrice}
                    onChange={(e) => handleInputChange('currentPrice', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="px-3 py-2 border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>واحد شمارش *</PersianText>
                </label>
                <select
                  required
                  value={formData.unitId}
                  onChange={(e) => handleInputChange('unitId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">انتخاب واحد</option>
                  {units.map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>تامین‌کننده</PersianText>
                </label>
                <select
                  value={formData.supplierId}
                  onChange={(e) => handleInputChange('supplierId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">انتخاب تامین‌کننده</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>موجودی فعلی</PersianText>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>حداقل موجودی</PersianText>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minStockLevel}
                  onChange={(e) => handleInputChange('minStockLevel', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PersianText>حداکثر موجودی</PersianText>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxStockLevel}
                  onChange={(e) => handleInputChange('maxStockLevel', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* Specifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                <PersianText>مشخصات فنی</PersianText>
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <PersianText>افزودن مشخصه</PersianText>
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="نام مشخصه"
                    value={spec.name}
                    onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="مقدار"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="واحد"
                    value={spec.unit}
                    onChange={(e) => handleSpecificationChange(index, 'unit', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formData.specifications.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeSpecification(index)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>برچسب‌ها</PersianText>
            </h2>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="برچسب جدید..."
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <PersianText>افزودن</PersianText>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  <PersianText>{tag}</PersianText>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </Card>

          {/* File Uploads */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>فایل‌ها و مستندات</PersianText>
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">
                  <PersianText>فایل‌ها را اینجا رها کنید یا کلیک کنید</PersianText>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  <PersianText>PDF, DOC, XLS, JPG, PNG (حداکثر 10MB هر فایل)</PersianText>
                </p>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">
                  <PersianText>فایل‌های انتخاب شده:</PersianText>
                </h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <PersianText>حذف</PersianText>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Status Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <PersianText>تنظیمات وضعیت</PersianText>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="mr-2 block text-sm text-gray-900">
                  <PersianText>قطعه فعال است</PersianText>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isObsolete"
                  checked={formData.isObsolete}
                  onChange={(e) => handleInputChange('isObsolete', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isObsolete" className="mr-2 block text-sm text-gray-900">
                  <PersianText>قطعه منسوخ شده</PersianText>
                </label>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <PersianText>یادداشت‌های اضافی</PersianText>
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="یادداشت‌ها، نکات خاص، هشدارها..."
              />
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              <PersianText>لغو</PersianText>
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <PersianText>در حال ثبت...</PersianText>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <PersianText>ثبت قطعه</PersianText>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
} 