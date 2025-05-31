import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Button Component Props
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  fullWidth?: boolean;
}

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'btn-base inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'btn-primary focus:ring-blue-500',
    secondary: 'btn-secondary focus:ring-gray-500',
    success: 'btn-success focus:ring-green-500',
    danger: 'btn-danger focus:ring-red-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    outline: 'btn-outline focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500'
  };

  const sizes = {
    sm: 'btn-sm text-sm',
    md: 'btn-md text-sm',
    lg: 'btn-lg text-base',
    xl: 'px-6 py-3 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="spinner" />
      )}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      
      {children && (
        <span className={cn(
          loading && 'opacity-0',
          'font-persian'
        )}>
          {children}
        </span>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
};

/**
 * Icon Button Component
 */
interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  className,
  size = 'md',
  ...props
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  return (
    <Button
      className={cn(
        'rounded-full p-0',
        iconSizes[size],
        className
      )}
      size={size}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
};

/**
 * Button Group Component
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'sm'
}) => {
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };

  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <div className={cn(
      'flex',
      orientationClasses[orientation],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
};

export default Button; 