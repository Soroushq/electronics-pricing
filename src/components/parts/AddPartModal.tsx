'use client';

import React, { useState } from 'react';
import { PersianText } from '@/components/ui/Farsisaz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePartsStore } from '@/hooks/usePartsStore';
import { Part, PartSpecification } from '@/types/parts';

/**
 * Add Part Modal Component
 * 
 * Modal برای افزودن قطعه جدید
 */
export const AddPartModal: React.FC = () => {
  const {
    isAddModalOpen,
    closeAddModal,
    addPart,
    categories,
    units,
    suppliers
  } = usePartsStore();

  const [formData, setFormData] = useState<Partial<Part>>({
    name: '',
    nameEn: '',
    partNumber: '',
    description: '',
    categoryId: '',
    unitId: '',
    currentPrice: 0,
    currency: 'ریال',
    stockQuantity: 0,
    minStockLevel: 10,
    maxStockLevel: 1000,
    specifications: [],
    images: [],
    isActive: true,
    isObsolete: false,
    alternativeParts: [],
    tags: []
  });

  const [specifications, setSpecifications] = useState<PartSpecification[]>([]);
  const [newSpec, setNewSpec] = useState<PartSpecification>({
    name: '',
    value: '',
    unit: ''
  });

  const handleInputChange = (field: keyof Part, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSpecification = () => {
    if (newSpec.name && newSpec.value) {
      setSpecifications(prev => [...prev, newSpec]);
      setNewSpec({ name: '', value: '', unit: '' });
    }
  };

  const handleRemoveSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.partNumber || !formData.categoryId || !formData.unitId) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    const newPart = {
      ...formData,
      specifications,
      currentPrice: Number(formData.currentPrice) || 0,
      stockQuantity: Number(formData.stockQuantity) || 0,
      minStockLevel: Number(formData.minStockLevel) || 10,
      maxStockLevel: Number(formData.maxStockLevel) || 1000,
    } as Omit<Part, 'id' | 'createdAt' | 'updatedAt'>;

    addPart(newPart);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      nameEn: '',
      partNumber: '',
      description: '',
      categoryId: '',
      unitId: '',
      currentPrice: 0,
      currency: 'ریال',
      stockQuantity: 0,
      minStockLevel: 10,
      maxStockLevel: 1000,
      specifications: [],
      images: [],
      isActive: true,
      isObsolete: false,
      alternativeParts: [],
      tags: []
    });
    setSpecifications([]);
    setNewSpec({ name: '', value: '', unit: '' });
    closeAddModal();
  };

  if (!isAddModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="m-0">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                <PersianText>افزودن قطعه جدید</PersianText>
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <PersianText>اطلاعات اصلی</PersianText>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      <PersianText>نام قطعه *</PersianText>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>نام انگلیسی</PersianText>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.nameEn || ''}
                      onChange={(e) => handleInputChange('nameEn', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>شماره قطعه *</PersianText>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.partNumber || ''}
                      onChange={(e) => handleInputChange('partNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>دسته‌بندی *</PersianText>
                    </label>
                    <select
                      className="form-input"
                      value={formData.categoryId || ''}
                      onChange={(e) => handleInputChange('categoryId', e.target.value)}
                      required
                    >
                      <option value="">انتخاب دسته‌بندی</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>واحد *</PersianText>
                    </label>
                    <select
                      className="form-input"
                      value={formData.unitId || ''}
                      onChange={(e) => handleInputChange('unitId', e.target.value)}
                      required
                    >
                      <option value="">انتخاب واحد</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} ({unit.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>تامین‌کننده</PersianText>
                    </label>
                    <select
                      className="form-input"
                      value={formData.supplierId || ''}
                      onChange={(e) => handleInputChange('supplierId', e.target.value)}
                    >
                      <option value="">بدون تامین‌کننده</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="form-label">
                    <PersianText>توضیحات</PersianText>
                  </label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>

              {/* Price and Stock */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <PersianText>قیمت و موجودی</PersianText>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">
                      <PersianText>قیمت</PersianText>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.currentPrice || ''}
                      onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>موجودی فعلی</PersianText>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.stockQuantity || ''}
                      onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <PersianText>حداقل موجودی</PersianText>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.minStockLevel || ''}
                      onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <PersianText>مشخصات فنی</PersianText>
                </h3>
                
                {/* Add Specification */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="نام مشخصه"
                    value={newSpec.name}
                    onChange={(e) => setNewSpec(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="مقدار"
                    value={newSpec.value}
                    onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="واحد (اختیاری)"
                    value={newSpec.unit}
                    onChange={(e) => setNewSpec(prev => ({ ...prev, unit: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSpecification}
                  >
                    <PersianText>افزودن</PersianText>
                  </Button>
                </div>

                {/* Specifications List */}
                {specifications.length > 0 && (
                  <div className="space-y-2">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          <PersianText>{spec.name}: {spec.value} {spec.unit}</PersianText>
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveSpecification(index)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <PersianText>وضعیت</PersianText>
                </h3>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={formData.isActive || false}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    />
                    <PersianText>فعال</PersianText>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={formData.isObsolete || false}
                      onChange={(e) => handleInputChange('isObsolete', e.target.checked)}
                    />
                    <PersianText>منسوخ شده</PersianText>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                >
                  <PersianText>انصراف</PersianText>
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  <PersianText>افزودن قطعه</PersianText>
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddPartModal; 