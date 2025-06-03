'use client';

import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PersianText } from '@/components/ui/Farsisaz';
import { useRouter } from 'next/navigation';

// کامپوننت درونی برای نمایش قطعات اخیر
function RecentPartItem({ name, code, price, stock }: { name: string; code: string; price: number; stock: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <h4 className="font-medium text-gray-900">
          <PersianText>{name}</PersianText>
        </h4>
        <p className="text-sm text-gray-500 font-mono">{code}</p>
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-green-600">
          <PersianText>{price.toLocaleString('fa-IR')} ریال</PersianText>
        </p>
        <p className="text-xs text-gray-500">
          <PersianText>موجودی: {stock.toLocaleString('fa-IR')}</PersianText>
        </p>
      </div>
    </div>
  );
}

// کامپوننت درونی برای نمایش بردهای اخیر
function RecentBoardItem({ name, parts, cost }: { name: string; parts: number; cost: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <h4 className="font-medium text-gray-900">
          <PersianText>{name}</PersianText>
        </h4>
        <p className="text-sm text-gray-500">
          <PersianText>{parts} قطعه</PersianText>
        </p>
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-blue-600">
          <PersianText>{cost.toLocaleString('fa-IR')} ریال</PersianText>
        </p>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const recentParts = [
    { name: 'مقاومت ۱۰کΩ', code: 'R-10K-01', price: 500, stock: 1500 },
    { name: 'خازن ۱۰۰μF', code: 'C-100UF-16V', price: 2000, stock: 50 },
    { name: 'IC LM358', code: 'IC-LM358-DIP8', price: 8000, stock: 200 }
  ];

  const recentBoards = [
    { name: 'برد کنترل موتور', parts: 15, cost: 87000 },
    { name: 'برد سنسور دما', parts: 8, cost: 52500 },
    { name: 'برد تغذیه', parts: 12, cost: 72000 }
  ];

  return (
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
              {recentParts.map((part, index) => (
                <RecentPartItem
                  key={index}
                  name={part.name}
                  code={part.code}
                  price={part.price}
                  stock={part.stock}
                />
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
              {recentBoards.map((board, index) => (
                <RecentBoardItem
                  key={index}
                  name={board.name}
                  parts={board.parts}
                  cost={board.cost}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
} 