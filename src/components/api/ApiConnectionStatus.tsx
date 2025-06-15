'use client';

import React from 'react';
import { useApiConnection } from '@/hooks/useApiData';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface ApiConnectionStatusProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ApiConnectionStatus({ 
  showLabel = true, 
  size = 'md',
  className = '' 
}: ApiConnectionStatusProps) {
  const { isConnected, testing, testConnection } = useApiConnection();

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getStatusColor = () => {
    if (testing) return 'text-yellow-500';
    if (isConnected === null) return 'text-gray-400';
    return isConnected ? 'text-green-500' : 'text-red-500';
  };

  const getStatusText = () => {
    if (testing) return 'در حال تست اتصال...';
    if (isConnected === null) return 'نامشخص';
    return isConnected ? 'متصل به سرور' : 'عدم اتصال';
  };

  const getStatusIcon = () => {
    const iconClass = `${iconSizes[size]} ${getStatusColor()}`;
    
    if (testing) {
      return <ArrowPathIcon className={`${iconClass} animate-spin`} />;
    }
    if (isConnected === null) {
      return <div className={`${iconSizes[size]} bg-gray-400 rounded-full`} />;
    }
    return isConnected ? 
      <CheckCircleIcon className={iconClass} /> : 
      <XCircleIcon className={iconClass} />;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {getStatusIcon()}
      {showLabel && (
        <span className={`${textSizes[size]} ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      )}
      {!testing && isConnected === false && (
        <button
          onClick={testConnection}
          className={`${textSizes[size]} text-blue-500 hover:text-blue-700 underline`}
          title="تست مجدد اتصال"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
} 