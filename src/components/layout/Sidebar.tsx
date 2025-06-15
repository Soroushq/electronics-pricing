'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { cn } from '@/utils/cn';

/**
 * Sidebar Component Props
 */
interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Navigation Item Interface
 */
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: number;
  subItems?: NavItem[];
  disabled?: boolean;
}

/**
 * Sidebar Component
 * 
 * Navigation sidebar with collapsible menu items and responsive design
 */
export const Sidebar: React.FC<SidebarProps> = ({
  className,
  isOpen = true,
  onClose
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard', 'parts']);
  const router = useRouter();
  const pathname = usePathname();

  // Navigation items configuration
  const navigationItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'داشبورد',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      ),
      href: '/'
    },
    {
      id: 'parts',
      label: 'مدیریت قطعات',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      subItems: [
        {
          id: 'parts-list',
          label: 'لیست قطعات',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
          href: '/parts',
          badge: 1380
        },
        {
          id: 'parts-add',
          label: 'افزودن قطعه',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ),
          href: '/parts/add'
        },
        {
          id: 'parts-categories',
          label: 'دسته‌بندی‌ها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          href: '/parts/categories'
        },
        {
          id: 'parts-import',
          label: 'وارد کردن CSV',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          ),
          href: '/parts/import'
        },
        {
          id: 'parts-advanced-search',
          label: 'جستجوی پیشرفته',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
          href: '/parts/advanced-search',
          disabled: true
        },
        {
          id: 'parts-analytics',
          label: 'آمار و تحلیل',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          href: '/parts/analytics',
          disabled: true
        },
        {
          id: 'parts-reports',
          label: 'گزارش‌گیری',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '/parts/reports',
          disabled: true
        },
        {
          id: 'parts-export',
          label: 'صدور فایل',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '/parts/export',
          disabled: true
        },
        {
          id: 'parts-backup',
          label: 'پشتیبان‌گیری',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          ),
          href: '/parts/backup',
          disabled: true
        },
        {
          id: 'parts-inventory',
          label: 'مدیریت موجودی',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          ),
          href: '/parts/inventory',
          disabled: true
        },
        {
          id: 'parts-orders',
          label: 'سفارش قطعات',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ),
          href: '/parts/orders'
        }
      ]
    },
    {
      id: 'api-management',
      label: 'مدیریت API',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      href: '/api-management'
    },
    {
      id: 'boards',
      label: 'طراحی برد',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      subItems: [
        {
          id: 'boards-list',
          label: 'لیست بردها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
          href: '/boards',
          badge: 67
        },
        {
          id: 'boards-designer',
          label: 'محاسبه‌گر برد',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
          href: '/boards/designer'
        },
        {
          id: 'boards-templates',
          label: 'قالب‌های آماده',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          ),
          href: '/boards/templates',
          disabled: true
        },
        {
          id: 'boards-clone',
          label: 'کپی برد',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          ),
          href: '/boards/clone',
          disabled: true
        },
        {
          id: 'boards-compare',
          label: 'مقایسه بردها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ),
          href: '/boards/compare',
          disabled: true
        },
        {
          id: 'boards-optimize',
          label: 'بهینه‌سازی قیمت',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          href: '/boards/optimize',
          disabled: true
        },
        {
          id: 'boards-export',
          label: 'صدور BOM',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '/boards/export',
          disabled: true
        },
        {
          id: 'boards-version',
          label: 'تاریخچه نسخه‌ها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/boards/version',
          disabled: true
        },
        {
          id: 'boards-orders',
          label: 'سفارش برد',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ),
          href: '/boards/orders'
        }
      ]
    },
    {
      id: 'devices',
      label: 'ساخت دستگاه',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      subItems: [
        {
          id: 'devices-list',
          label: 'لیست دستگاه‌ها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
          href: '/devices',
          badge: 18
        },
        {
          id: 'devices-builder',
          label: 'سازنده دستگاه',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          ),
          href: '/devices/builder'
        },
        {
          id: 'devices-orders',
          label: 'سفارش دستگاه',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ),
          href: '/devices/orders'
        }
      ]
    },
    {
      id: 'pricing',
      label: 'قیمت‌گذاری',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        {
          id: 'pricing-history',
          label: 'تاریخچه قیمت‌ها',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/pricing/history',
          disabled: true
        },
        {
          id: 'pricing-reports',
          label: 'گزارش‌های قیمت',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          href: '/pricing/reports',
          disabled: true
        }
      ]
    },
    {
      id: 'settings',
      label: 'تنظیمات',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/settings',
      disabled: true
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = pathname === item.href;
    const isDisabled = item.disabled;

    const handleClick = () => {
      if (isDisabled) return; // Don't do anything if disabled
      
            if (hasSubItems) {
              toggleExpanded(item.id);
      } else if (item.href) {
        router.push(item.href);
              onClose?.();
            }
    };

    const content = (
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 transition-colors duration-200 group",
          depth > 0 && "pr-8 text-sm",
          // Disabled styles
          isDisabled 
            ? "text-gray-400 cursor-not-allowed opacity-60" 
            : "text-gray-700 hover:bg-gray-100 cursor-pointer active:bg-gray-200",
          // Active styles (only when not disabled)
          !isDisabled && isActive && "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
        )}
        onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
            "flex-shrink-0 transition-colors duration-200",
            depth > 0 && "text-gray-500 group-hover:text-gray-700",
            // Disabled styles
            isDisabled 
              ? "text-gray-300" 
              : "text-gray-600 group-hover:text-gray-800",
            // Active styles (only when not disabled) 
            !isDisabled && isActive && "text-blue-600"
            )}>
              {item.icon}
            </div>
            <span className="font-medium">
              <PersianText>{item.label}</PersianText>
            </span>
            {item.badge && (
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              isDisabled 
                ? "bg-gray-100 text-gray-400" 
                : isActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
            )}>
                <PersianText>{item.badge.toString()}</PersianText>
              </span>
            )}
          </div>
          
          {hasSubItems && (
            <div className={cn(
            "transition-transform duration-200 text-gray-600"
          )}>
            <svg className={cn(
              "w-4 h-4 transition-transform duration-200",
              isExpanded && "rotate-180"
            )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
    );

    return (
      <div key={item.id}>
        {item.href && !hasSubItems && !isDisabled ? (
          <Link href={item.href}>
            {content}
          </Link>
        ) : (
          content
        )}

        {/* Sub Items */}
        {hasSubItems && isExpanded && (
          <div className="animate-fade-in">
            {item.subItems!.map(subItem => renderNavItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          // Base styles - mobile: fixed overlay, desktop: part of layout
          "bg-white border-l border-gray-200 transition-transform duration-300 ease-in-out",
          // Width
          "w-72",
          // Mobile: Fixed overlay that slides in/out
          "fixed top-16 right-0 h-[calc(100vh-64px)] z-40",
          isOpen ? "translate-x-0" : "translate-x-full",
          // Desktop: Static positioned, no overlay
          "lg:static lg:top-0 lg:h-full lg:z-auto lg:translate-x-0",
          !isOpen && "lg:hidden",
          className
        )}
      >
        <div className="h-full overflow-y-auto">
          <nav className="p-3">
            <div className="space-y-2">
              {navigationItems.map((item) => renderNavItem(item))}
          </div>
        </nav>

        {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                <PersianText>سیستم قیمت‌گذاری الکترونیک</PersianText>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                <PersianText>نسخه ۱.۰.۰</PersianText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 