'use client';

import { useRouter } from 'next/navigation';
import { PersianText } from '@/components/ui/Farsisaz';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardSubtitle, CardBody, StatsCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * Home Page Component
 * 
 * This is the main page of the Electronics Pricing System.
 */
export default function HomePage() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <AppLayout>
      {/* Stats Overview */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="کل قطعات"
            value={1380}
            subtitle="در انبار موجود"
            trend={{ value: 12.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />
          
          <StatsCard
            title="بردهای طراحی شده"
            value={67}
            subtitle="آماده تولید"
            trend={{ value: 8.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          
          <StatsCard
            title="دستگاه‌های نهایی"
            value={18}
            subtitle="محصولات کامل"
            trend={{ value: 3.1, isPositive: false }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          
          <StatsCard
            title="ارزش کل موجودی"
            value="۲۵۰,۰۰۰,۰۰۰"
            subtitle="ریال"
            trend={{ value: 15.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Quick Access Menu */}
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
              {/* Parts Quick Access */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                      <PersianText>مدیریت قطعات</PersianText>
                    </h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/parts')}
                  >
                    <PersianText>مشاهده قطعات</PersianText>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    fullWidth
                    onClick={() => navigateTo('/parts/add')}
                  >
                    <PersianText>افزودن قطعه</PersianText>
                  </Button>
                  <Button 
                size="sm"
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/parts/orders')}
                  >
                    <PersianText>سفارش قطعات</PersianText>
                  </Button>
                </div>
              </div>

              {/* Boards Quick Access */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                      <PersianText>طراحی برد</PersianText>
                    </h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/boards')}
                  >
                    <PersianText>مشاهده بردها</PersianText>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    fullWidth
                    onClick={() => navigateTo('/boards/designer')}
                  >
                    <PersianText>محاسبه‌گر برد</PersianText>
                  </Button>
                  <Button 
                size="sm"
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/boards/orders')}
                  >
                    <PersianText>سفارش برد</PersianText>
                  </Button>
                </div>
              </div>

              {/* Devices Quick Access */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                      <PersianText>ساخت دستگاه</PersianText>
                    </h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/devices')}
                  >
                    <PersianText>مشاهده دستگاه‌ها</PersianText>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    fullWidth
                    onClick={() => navigateTo('/devices/builder')}
                  >
                    <PersianText>سازنده دستگاه</PersianText>
                  </Button>
                  <Button 
                size="sm"
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/devices/orders')}
                  >
                    <PersianText>سفارش دستگاه</PersianText>
                  </Button>
                </div>
              </div>

              {/* Tools Quick Access */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-warning rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
        </div>
              <div>
                    <h3 className="font-semibold text-gray-900">
                      <PersianText>ابزارها</PersianText>
                    </h3>
              </div>
              </div>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/parts/categories')}
                  >
                    <PersianText>دسته‌بندی‌ها</PersianText>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigateTo('/parts/import')}
                  >
                    <PersianText>ورود CSV</PersianText>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    disabled
                  >
                    <PersianText>تنظیمات</PersianText>
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Recent Activity */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Parts */}
          <Card>
            <CardHeader>
              <CardTitle>آخرین قطعات اضافه شده</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigateTo('/parts')}
              >
                <PersianText>مشاهده همه</PersianText>
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[
                  { name: 'مقاومت ۱۰کΩ', code: 'R-10K-01', price: 500, stock: 1500 },
                  { name: 'خازن ۱۰۰μF', code: 'C-100UF-16V', price: 2000, stock: 50 },
                  { name: 'IC LM358', code: 'IC-LM358-DIP8', price: 8000, stock: 200 }
                ].map((part, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        <PersianText>{part.name}</PersianText>
                      </h4>
                      <p className="text-sm text-gray-500 font-mono">{part.code}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-600">
                        <PersianText>{part.price.toLocaleString('fa-IR')} ریال</PersianText>
                      </p>
                      <p className="text-xs text-gray-500">
                        <PersianText>موجودی: {part.stock.toLocaleString('fa-IR')}</PersianText>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Recent Boards */}
          <Card>
            <CardHeader>
              <CardTitle>آخرین بردهای طراحی شده</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigateTo('/boards')}
              >
                <PersianText>مشاهده همه</PersianText>
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[
                  { name: 'برد کنترل موتور', parts: 15, cost: 87000 },
                  { name: 'برد سنسور دما', parts: 8, cost: 52500 },
                  { name: 'برد تغذیه', parts: 12, cost: 72000 }
                ].map((board, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        <PersianText>{board.name}</PersianText>
                      </h4>
                      <p className="text-sm text-gray-500">
                        <PersianText>{board.parts} قطعه</PersianText>
                      </p>
                </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-blue-600">
                        <PersianText>{board.cost.toLocaleString('fa-IR')} ریال</PersianText>
                      </p>
                </div>
                </div>
                ))}
    </div>
          </CardBody>
        </Card>
        </div>
      </section>
    </AppLayout>
  );
}
