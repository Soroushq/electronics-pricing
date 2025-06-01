'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { 
  StatsOverview, 
  QuickAccessMenu, 
  RecentActivity 
} from '@/components/dashboard';

/**
 * Home Page Component
 * 
 * This is the main page of the Electronics Pricing System.
 */
export default function HomePage() {
  return (
    <AppLayout>
      <StatsOverview />
      <QuickAccessMenu />
      <RecentActivity />
    </AppLayout>
  );
}
