'use client';

import { Card, CardHeader, CardTitle, CardSubtitle, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PersianText } from '@/components/ui/Farsisaz';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

// تایپ‌ها
interface QuickAccessAction {
  label: string;
  variant: 'primary' | 'outline' | 'secondary';
  path: string;
  disabled?: boolean;
}

// کامپوننت درونی برای کارت دسترسی سریع
function QuickAccessCard({ 
  title, 
  icon, 
  gradient, 
  actions, 
  onNavigate 
}: {
  title: string;
  icon: ReactNode;
  gradient: string;
  actions: QuickAccessAction[];
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            <PersianText>{title}</PersianText>
          </h3>
        </div>
      </div>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Button 
            key={index}
            size="sm" 
            variant={action.variant}
            fullWidth
            disabled={action.disabled}
            onClick={() => onNavigate(action.path)}
          >
            <PersianText>{action.label}</PersianText>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function QuickAccessMenu() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const quickAccessData = [
    {
      title: 'مدیریت قطعات',
      gradient: 'bg-gradient-success',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      actions: [
        { label: 'مشاهده قطعات', variant: 'outline' as const, path: '/parts' },
        { label: 'افزودن قطعه', variant: 'primary' as const, path: '/parts/add' },
        { label: 'سفارش قطعات', variant: 'outline' as const, path: '/parts/orders' }
      ]
    },
    {
      title: 'طراحی برد',
      gradient: 'bg-gradient-primary',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      actions: [
        { label: 'مشاهده بردها', variant: 'outline' as const, path: '/boards' },
        { label: 'محاسبه‌گر برد', variant: 'primary' as const, path: '/boards/designer' },
        { label: 'سفارش برد', variant: 'outline' as const, path: '/boards/orders' }
      ]
    },
    {
      title: 'ساخت دستگاه',
      gradient: 'bg-gradient-secondary',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      actions: [
        { label: 'مشاهده دستگاه‌ها', variant: 'outline' as const, path: '/devices' },
        { label: 'سازنده دستگاه', variant: 'primary' as const, path: '/devices/builder' },
        { label: 'سفارش دستگاه', variant: 'outline' as const, path: '/devices/orders' }
      ]
    },
    {
      title: 'ابزارها',
      gradient: 'bg-gradient-warning',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      actions: [
        { label: 'دسته‌بندی‌ها', variant: 'outline' as const, path: '/parts/categories' },
        { label: 'ورود CSV', variant: 'outline' as const, path: '/parts/import' },
        { label: 'تنظیمات', variant: 'outline' as const, path: '/settings', disabled: true }
      ]
    }
  ];

  return (
    <section className="mb-8">
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <div>
            <CardTitle size="lg">دسترسی سریع</CardTitle>
            <CardSubtitle>
              انجام سریع عملیات پرکاربرد سیستم
            </CardSubtitle>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessData.map((section, index) => (
              <QuickAccessCard
                key={index}
                title={section.title}
                icon={section.icon}
                gradient={section.gradient}
                actions={section.actions}
                onNavigate={navigateTo}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
} 