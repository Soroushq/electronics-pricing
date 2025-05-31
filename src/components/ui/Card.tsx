import React from 'react';
import { cn } from '@/utils/cn';
import { PersianText } from './Farsisaz';

/**
 * Card Component Props
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

/**
 * Card Component
 * 
 * A flexible card container with different variants and styles
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick
}) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';

  const variants = {
    default: 'card-shadow border border-gray-200',
    bordered: 'border-2 border-gray-300',
    elevated: 'card-shadow-lg',
    ghost: 'border border-transparent'
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const hoverClasses = hover || clickable ? 'hover:card-shadow-hover hover-lift' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Card Header Component Props
 */
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  border?: boolean;
}

/**
 * Card Header Component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  actions,
  border = true
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between',
      border && 'pb-4 border-b border-gray-200 mb-4',
      className
    )}>
      <div className="flex-1">
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2 mr-4">
          {actions}
        </div>
      )}
    </div>
  );
};

/**
 * Card Title Component Props
 */
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Card Title Component
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <h3 className={cn(
      'font-bold text-gray-800',
      sizes[size],
      className
    )}>
      <PersianText>{children}</PersianText>
    </h3>
  );
};

/**
 * Card Subtitle Component Props
 */
interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card Subtitle Component
 */
export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  className
}) => {
  return (
    <p className={cn(
      'text-sm text-gray-600 mt-1',
      className
    )}>
      <PersianText>{children}</PersianText>
    </p>
  );
};

/**
 * Card Body Component Props
 */
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Body Component
 */
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  padding = 'none'
}) => {
  const paddings = {
    none: '',
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6'
  };

  return (
    <div className={cn(
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component Props
 */
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between';
}

/**
 * Card Footer Component
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  border = true,
  justify = 'end'
}) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={cn(
      'flex items-center gap-2',
      border && 'pt-4 border-t border-gray-200 mt-4',
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  );
};

/**
 * Stats Card Component Props
 */
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

/**
 * Stats Card Component
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className
}) => {
  return (
    <Card variant="elevated" className={cn('hover-lift', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            <PersianText>{title}</PersianText>
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            <PersianText>{value.toString()}</PersianText>
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500">
              <PersianText>{subtitle}</PersianText>
            </p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs mt-2',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={trend.isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}
                />
              </svg>
              <span>
                <PersianText>{Math.abs(trend.value)}%</PersianText>
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card; 