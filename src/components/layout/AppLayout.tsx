'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/utils/cn';

/**
 * App Layout Component Props
 */
interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
}

/**
 * App Layout Component
 * 
 * Main application layout with responsive header and sidebar
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className,
  showSidebar = true
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax/fade-in effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={cn(
        "transition-all duration-700 ease-out",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}>
        <Header 
          onMenuToggle={toggleSidebar}
          isMenuOpen={isSidebarOpen}
        />
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out overflow-hidden relative z-0",
          // Push content when sidebar is open on desktop
          showSidebar && isSidebarOpen && "flex-1 transition-all duration-300 ease-in-out overflow-hidden",
          className
        )}>
          <div className={cn(
            "p-4 sm:p-6 h-full overflow-y-auto transition-all duration-500 ease-out delay-200",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 