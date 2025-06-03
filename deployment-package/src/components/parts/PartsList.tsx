'use client';

import React, { useEffect } from 'react';
import { PersianText, PersianNumber, PersianPrice } from '@/components/ui/Farsisaz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePartsStore } from '@/hooks/usePartsStore';
import { Part } from '@/types/parts';
import { cn } from '@/utils/cn';

/**
 * Parts List Component Props
 */
interface PartsListProps {
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

/**
 * Part Card Component - کارت نمایش قطعه
 */
const PartCard: React.FC<{
  part: Part;
  onEdit: (part: Part) => void;
  onDelete: (part: Part) => void;
  onDuplicate: (part: Part) => void;
  showActions: boolean;
  compact: boolean;
}> = ({ part, onEdit, onDelete, onDuplicate, showActions, compact }) => {
  const { categories, units, suppliers } = usePartsStore();
  
  const category = categories.find(c => c.id === part.categoryId);
  const unit = units.find(u => u.id === part.unitId);
  const supplier = suppliers.find(s => s.id === part.supplierId);
  
  const isLowStock = part.stockQuantity < part.minStockLevel;

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      isLowStock && "border-orange-200 bg-orange-50",
      !part.isActive && "opacity-60",
      part.isObsolete && "border-red-200 bg-red-50"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                <PersianText>{part.name}</PersianText>
              </h3>
              {!part.isActive && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                  <PersianText>غیرفعال</PersianText>
                </span>
              )}
              {part.isObsolete && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                  <PersianText>منسوخ</PersianText>
                </span>
              )}
              {isLowStock && (
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                  <PersianText>موجودی کم</PersianText>
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 font-mono">
              {part.partNumber}
            </p>
            {part.nameEn && !compact && (
              <p className="text-sm text-gray-500">{part.nameEn}</p>
            )}
          </div>
          
          {category && (
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color || '#gray' }}
              />
              <span className="text-sm text-gray-600">
                <PersianText>{category.name}</PersianText>
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {part.description && !compact && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            <PersianText>{part.description}</PersianText>
          </p>
        )}

        {/* Main Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              <PersianText>قیمت</PersianText>
            </p>
            <p className="font-semibold text-green-600">
              <PersianPrice amount={part.currentPrice} currency={part.currency} />
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">
              <PersianText>موجودی</PersianText>
            </p>
            <p className={cn(
              "font-semibold",
              isLowStock ? "text-orange-600" : "text-blue-600"
            )}>
              <PersianNumber value={part.stockQuantity} /> {unit?.symbol || ''}
            </p>
          </div>
          
          {supplier && !compact && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-1">
                <PersianText>تامین‌کننده</PersianText>
              </p>
              <p className="text-sm text-gray-700">
                <PersianText>{supplier.name}</PersianText>
              </p>
            </div>
          )}
        </div>

        {/* Specifications */}
        {part.specifications.length > 0 && !compact && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">
              <PersianText>مشخصات</PersianText>
            </p>
            <div className="flex flex-wrap gap-2">
              {part.specifications.slice(0, 3).map((spec, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  <PersianText>{spec.name}: {spec.value} {spec.unit || ''}</PersianText>
                </span>
              ))}
              {part.specifications.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                  <PersianText>+ {part.specifications.length - 3} مورد دیگر</PersianText>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {part.tags.length > 0 && !compact && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {part.tags.slice(0, 4).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                >
                  <PersianText>{tag}</PersianText>
                </span>
              ))}
              {part.tags.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                  <PersianText>+{part.tags.length - 4}</PersianText>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(part)}
              >
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <PersianText>ویرایش</PersianText>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicate(part)}
              >
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <PersianText>کپی</PersianText>
              </Button>
            </div>
            
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(part)}
            >
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <PersianText>حذف</PersianText>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Parts List Component
 */
export const PartsList: React.FC<PartsListProps> = ({
  className,
  showActions = true,
  compact = false
}) => {
  const {
    getPaginatedParts,
    isLoading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    openEditModal,
    openDeleteModal,
    duplicatePart,
    initializeSampleData,
    parts
  } = usePartsStore();

  // Initialize sample data on mount if no parts exist
  useEffect(() => {
    if (parts.length === 0) {
      initializeSampleData();
    }
  }, [parts.length, initializeSampleData]);

  const paginatedParts = getPaginatedParts();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleEdit = (part: Part) => {
    openEditModal(part);
  };

  const handleDelete = (part: Part) => {
    openDeleteModal(part);
  };

  const handleDuplicate = (part: Part) => {
    duplicatePart(part.id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner" />
        <span className="mr-2 text-gray-600">
          <PersianText>در حال بارگذاری...</PersianText>
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <div className="text-red-600 mb-2">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <PersianText>{error}</PersianText>
        </div>
      </Card>
    );
  }

  if (paginatedParts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            <PersianText>هیچ قطعه‌ای یافت نشد</PersianText>
          </h3>
          <p className="text-gray-500">
            <PersianText>برای شروع، قطعه جدیدی اضافه کنید یا فیلترهای جستجو را تغییر دهید.</PersianText>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <PersianText>
            نمایش <PersianNumber value={(currentPage - 1) * itemsPerPage + 1} /> تا{' '}
            <PersianNumber value={Math.min(currentPage * itemsPerPage, totalItems)} /> از{' '}
            <PersianNumber value={totalItems} /> قطعه
          </PersianText>
        </div>
      </div>

      {/* Parts Grid */}
      <div className={cn(
        "grid gap-4",
        compact 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      )}>
        {paginatedParts.map((part) => (
          <PartCard
            key={part.id}
            part={part}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            showActions={showActions}
            compact={compact}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage <= 3 
              ? i + 1 
              : currentPage > totalPages - 2 
                ? totalPages - 4 + i 
                : currentPage - 2 + i;
                
            if (pageNumber < 1 || pageNumber > totalPages) return null;
            
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
              >
                <PersianNumber value={pageNumber} />
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PartsList; 