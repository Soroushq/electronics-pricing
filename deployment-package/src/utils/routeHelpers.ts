/**
 * Route Helpers
 * Helper functions for route management and page status
 */

// List of defined menu routes with their display names
export const definedRoutes = {
  // Main routes (implemented)
  '/': 'داشبورد',
  '/parts': 'لیست قطعات',
  '/parts/add': 'افزودن قطعه',
  '/parts/categories': 'دسته‌بندی‌ها',
  '/parts/import': 'وارد کردن CSV',
  '/parts/orders': 'سفارش قطعات',
  '/boards': 'لیست بردها',
  '/boards/designer': 'محاسبه‌گر برد',
  '/boards/orders': 'سفارش برد',
  '/devices': 'لیست دستگاه‌ها',
  '/devices/builder': 'سازنده دستگاه',
  '/devices/orders': 'سفارش دستگاه',
  
  // Under construction routes (not implemented yet)
  '/parts/advanced-search': 'جستجوی پیشرفته قطعات',
  '/parts/analytics': 'آمار و تحلیل قطعات',
  '/parts/reports': 'گزارش‌گیری قطعات',
  '/parts/export': 'صدور فایل قطعات',
  '/parts/backup': 'پشتیبان‌گیری قطعات',
  '/parts/inventory': 'مدیریت موجودی',
  '/boards/templates': 'قالب‌های آماده برد',
  '/boards/clone': 'کپی برد',
  '/boards/compare': 'مقایسه بردها',
  '/boards/optimize': 'بهینه‌سازی قیمت برد',
  '/boards/export': 'صدور BOM',
  '/boards/version': 'تاریخچه نسخه‌های برد',
  '/pricing/history': 'تاریخچه قیمت‌ها',
  '/pricing/reports': 'گزارش‌های قیمت',
  '/settings': 'تنظیمات سیستم'
};

// Routes that are under construction (not implemented yet)
export const underConstructionRoutes = [
  '/parts/advanced-search',
  '/parts/analytics',
  '/parts/reports',
  '/parts/export',
  '/parts/backup',
  '/parts/inventory',
  '/boards/templates',
  '/boards/clone',
  '/boards/compare',
  '/boards/optimize',
  '/boards/export',
  '/boards/version',
  '/pricing/history',
  '/pricing/reports',
  '/settings'
];

/**
 * Check if a route is under construction
 */
export const isRouteUnderConstruction = (path: string): boolean => {
  return underConstructionRoutes.includes(path);
};

/**
 * Get the display name for a route
 */
export const getRouteDisplayName = (path: string): string => {
  return definedRoutes[path as keyof typeof definedRoutes] || 'صفحه نامشخص';
};

/**
 * Check if a route is defined in our menu system
 */
export const isDefinedRoute = (path: string): boolean => {
  return Object.keys(definedRoutes).includes(path);
}; 