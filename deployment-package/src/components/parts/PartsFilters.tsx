'use client';

import React, { useState, useCallback } from 'react';
import { PersianText, PersianNumber } from '@/components/ui/Farsisaz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePartsStore } from '@/hooks/usePartsStore';
import { PartFilters, PartSortOptions, PartSortField } from '@/types/parts';
import { cn } from '@/utils/cn';

/**
 * Parts Filters Component Props
 */
interface PartsFiltersProps {
  className?: string;
  onFiltersChange?: (filters: PartFilters) => void;
  showAdvanced?: boolean;
}

/**
 * Parts Filters Component
 * 
 * جستجو و فیلترهای پیشرفته برای قطعات
 */
export const PartsFilters: React.FC<PartsFiltersProps> = ({
  className,
  onFiltersChange,
  showAdvanced = true
}) => {
  const {
    searchTerm,
    filters,
    sortOptions,
    categories,
    suppliers,
    setSearchTerm,
    setFilters,
    setSortOptions,
    clearFilters,
    totalItems
  } = usePartsStore();

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<PartFilters>(filters);

  // Debounced search
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      onFiltersChange?.({ ...filters, search: value });
    }, 300),
    [setSearchTerm, filters, onFiltersChange]
  );

  const handleFilterChange = (key: keyof PartFilters, value: unknown) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSortChange = (newSortOptions: PartSortOptions) => {
    setSortOptions(newSortOptions);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
    onFiltersChange?.({});
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onFiltersChange?.(localFilters);
    setIsAdvancedOpen(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در نام، شماره قطعه، توضیحات..."
                className="form-input pl-10 pr-4"
                defaultValue={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              className="form-input min-w-[120px]"
              value={sortOptions.field}
              onChange={(e) => handleSortChange({
                ...sortOptions,
                field: e.target.value as PartSortField
              })}
            >
              <option value="name">نام</option>
              <option value="partNumber">شماره قطعه</option>
              <option value="currentPrice">قیمت</option>
              <option value="stockQuantity">موجودی</option>
              <option value="createdAt">تاریخ ایجاد</option>
              <option value="updatedAt">آخرین بروزرسانی</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSortChange({
                ...sortOptions,
                direction: sortOptions.direction === 'asc' ? 'desc' : 'asc'
              })}
            >
              {sortOptions.direction === 'asc' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </Button>

            {showAdvanced && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={isAdvancedOpen ? "bg-blue-50 border-blue-200" : ""}
              >
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <PersianText>فیلترهای پیشرفته</PersianText>
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-600">
          <PersianText>
            <PersianNumber value={totalItems} /> قطعه یافت شد
          </PersianText>
        </div>
      </Card>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <Card className="p-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h3 className="font-medium text-gray-900">
              <PersianText>فیلترهای پیشرفته</PersianText>
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
            >
              <PersianText>پاک کردن همه</PersianText>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="form-label">
                <PersianText>دسته‌بندی</PersianText>
              </label>
              <select
                className="form-input"
                value={localFilters.categoryIds?.[0] || ''}
                onChange={(e) => handleFilterChange(
                  'categoryIds',
                  e.target.value ? [e.target.value] : undefined
                )}
              >
                <option value="">همه دسته‌بندی‌ها</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Supplier Filter */}
            <div>
              <label className="form-label">
                <PersianText>تامین‌کننده</PersianText>
              </label>
              <select
                className="form-input"
                value={localFilters.supplierIds?.[0] || ''}
                onChange={(e) => handleFilterChange(
                  'supplierIds',
                  e.target.value ? [e.target.value] : undefined
                )}
              >
                <option value="">همه تامین‌کنندگان</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="form-label">
                <PersianText>وضعیت</PersianText>
              </label>
              <select
                className="form-input"
                value={
                  localFilters.isActive === true ? 'active' :
                  localFilters.isActive === false ? 'inactive' :
                  localFilters.isObsolete === true ? 'obsolete' : ''
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'active') {
                    handleFilterChange('isActive', true);
                    handleFilterChange('isObsolete', undefined);
                  } else if (value === 'inactive') {
                    handleFilterChange('isActive', false);
                    handleFilterChange('isObsolete', undefined);
                  } else if (value === 'obsolete') {
                    handleFilterChange('isObsolete', true);
                    handleFilterChange('isActive', undefined);
                  } else {
                    handleFilterChange('isActive', undefined);
                    handleFilterChange('isObsolete', undefined);
                  }
                }}
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
                <option value="obsolete">منسوخ</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="form-label">
                <PersianText>حداقل قیمت</PersianText>
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={localFilters.priceRange?.min || ''}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...localFilters.priceRange,
                  min: e.target.value ? Number(e.target.value) : undefined
                })}
              />
            </div>

            <div>
              <label className="form-label">
                <PersianText>حداکثر قیمت</PersianText>
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="بدون محدودیت"
                value={localFilters.priceRange?.max || ''}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...localFilters.priceRange,
                  max: e.target.value ? Number(e.target.value) : undefined
                })}
              />
            </div>

            {/* Stock Range */}
            <div>
              <label className="form-label">
                <PersianText>حداقل موجودی</PersianText>
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={localFilters.stockRange?.min || ''}
                onChange={(e) => handleFilterChange('stockRange', {
                  ...localFilters.stockRange,
                  min: e.target.value ? Number(e.target.value) : undefined
                })}
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="border-t border-gray-200 pt-4">
            <label className="form-label mb-2">
              <PersianText>فیلترهای سریع</PersianText>
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={localFilters.hasLowStock ? "primary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('hasLowStock', !localFilters.hasLowStock)}
              >
                <PersianText>موجودی کم</PersianText>
              </Button>
            </div>
          </div>

          {/* Apply Filters */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsAdvancedOpen(false)}
            >
              <PersianText>انصراف</PersianText>
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
            >
              <PersianText>اعمال فیلترها</PersianText>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

// Debounce utility function
function debounce(
  func: (value: string) => void,
  wait: number
): (value: string) => void {
  let timeout: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
}

export default PartsFilters; 