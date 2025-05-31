/**
 * Part Category - دسته‌بندی قطعات
 */
export interface PartCategory {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  parentId?: string; // برای دسته‌بندی سلسله‌مراتبی
  color?: string; // رنگ برای نمایش در UI
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Part Unit - واحد اندازه‌گیری قطعات
 */
export interface PartUnit {
  id: string;
  name: string; // مثل: عدد، متر، کیلوگرم، لیتر
  nameEn?: string;
  symbol: string; // مثل: pcs, m, kg, L
  type: 'quantity' | 'length' | 'weight' | 'volume'; // نوع واحد
}

/**
 * Supplier - تامین‌کننده
 */
export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  isActive: boolean;
  rating?: number; // امتیاز 1-5
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Part Price History - تاریخچه قیمت قطعات
 */
export interface PartPriceHistory {
  id: string;
  partId: string;
  price: number;
  currency: string;
  supplierId?: string;
  date: Date;
  notes?: string;
  updatedBy?: string; // شناسه کاربر
}

/**
 * Part Specifications - مشخصات فنی قطعات
 */
export interface PartSpecification {
  name: string; // نام ویژگی مثل: voltage, resistance, capacitance
  value: string; // مقدار مثل: 5V, 10kΩ, 100µF
  unit?: string; // واحد
}

/**
 * Part - قطعه الکترونیکی
 */
export interface Part {
  id: string;
  
  // اطلاعات اصلی
  name: string; // نام فارسی
  nameEn?: string; // نام انگلیسی
  partNumber: string; // شماره قطعه (SKU)
  description?: string;
  
  // دسته‌بندی و واحد
  categoryId: string;
  unitId: string;
  
  // قیمت و موجودی
  currentPrice: number;
  currency: string;
  stockQuantity: number;
  minStockLevel: number; // حداقل موجودی برای هشدار
  maxStockLevel?: number;
  
  // اطلاعات تامین‌کننده
  supplierId?: string;
  supplierPartNumber?: string; // شماره قطعه نزد تامین‌کننده
  leadTime?: number; // زمان تحویل (روز)
  
  // مشخصات فنی
  specifications: PartSpecification[];
  
  // اطلاعات فیزیکی
  weight?: number; // وزن (گرم)
  dimensions?: {
    length?: number; // میلی‌متر
    width?: number;
    height?: number;
  };
  
  // تصاویر و فایل‌ها
  images: string[]; // آرایه URL تصاویر
  datasheet?: string; // لینک datasheet
  
  // وضعیت
  isActive: boolean;
  isObsolete: boolean; // منسوخ شده
  alternativeParts: string[]; // آرایه ID قطعات جایگزین
  
  // متادیتا
  tags: string[]; // برچسب‌ها برای جستجوی بهتر
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // شناسه کاربر
  updatedBy?: string;
}

/**
 * Part Search Filters - فیلترهای جستجو
 */
export interface PartFilters {
  search?: string; // جستجو در نام، شماره قطعه، توضیحات
  categoryIds?: string[];
  supplierIds?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  stockRange?: {
    min?: number;
    max?: number;
  };
  isActive?: boolean;
  isObsolete?: boolean;
  tags?: string[];
  hasLowStock?: boolean; // قطعاتی که موجودی کمتر از حداقل دارند
}

/**
 * Part Sort Options - گزینه‌های مرتب‌سازی
 */
export type PartSortField = 
  | 'name' 
  | 'partNumber' 
  | 'currentPrice' 
  | 'stockQuantity' 
  | 'createdAt' 
  | 'updatedAt';

export type SortDirection = 'asc' | 'desc';

export interface PartSortOptions {
  field: PartSortField;
  direction: SortDirection;
}

/**
 * Part Import/Export Types
 */
export interface PartImportResult {
  totalRows: number;
  successfulImports: number;
  failedImports: number;
  errors: Array<{
    row: number;
    field?: string;
    message: string;
  }>;
  importedParts: Part[];
}

export interface PartExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  fields: string[]; // فیلدهایی که باید export شوند
  filters?: PartFilters;
}

/**
 * CSV Import Mapping - نقشه‌برداری فیلدهای CSV
 */
export interface CSVFieldMapping {
  [csvColumn: string]: keyof Part | 'ignore';
}

export interface CSVImportOptions {
  file: File;
  mapping: CSVFieldMapping;
  hasHeader: boolean;
  delimiter: string; // معمولاً ',' یا ';'
  encoding: string; // معمولاً 'UTF-8'
  skipEmptyRows: boolean;
  validateOnly: boolean; // فقط اعتبارسنجی، وارد نکن
} 