import React from 'react';
import { 
  toPersianNumbers, 
  formatCurrency, 
  formatPersianNumber, 
  getTextDirection,
//   addPersianCommas,
  truncatePersianText 
} from '@/utils/farsisaz';

/**
 * Props for Farsisaz component
 */
interface FarsisazProps {
  children: React.ReactNode;
  className?: string;
  type?: 'text' | 'number' | 'currency' | 'price';
  currency?: string;
  truncate?: number;
  autoDirection?: boolean;
}

/**
 * Farsisaz Component
 * 
 * A reusable component that automatically handles Persian text formatting,
 * number conversion, and text direction for all content.
 * 
 * @param children - Content to be formatted
 * @param className - Additional CSS classes
 * @param type - Type of formatting to apply
 * @param currency - Currency symbol for currency type
 * @param truncate - Maximum text length (applies ellipsis if exceeded)
 * @param autoDirection - Automatically set text direction based on content
 */
export const Farsisaz: React.FC<FarsisazProps> = ({
  children,
  className = '',
  type = 'text',
  currency = 'ریال',
  truncate,
  autoDirection = true,
}) => {
  // Convert children to string for processing
  const content = React.Children.toArray(children).join('');
  
  // Apply formatting based on type
  const formatContent = (content: string): string => {
    switch (type) {
      case 'number':
        const num = parseFloat(content);
        return isNaN(num) ? content : formatPersianNumber(num);
      
      case 'currency':
      case 'price':
        const amount = parseFloat(content);
        return isNaN(amount) ? content : formatCurrency(amount, currency);
      
      case 'text':
      default:
        return toPersianNumbers(content);
    }
  };

  let formattedContent = formatContent(content);
  
  // Apply truncation if specified
  if (truncate && formattedContent.length > truncate) {
    formattedContent = truncatePersianText(formattedContent, truncate);
  }

  // Determine text direction
  const direction = autoDirection ? getTextDirection(formattedContent) : undefined;

  return (
    <span 
      className={`font-persian ${className}`}
      dir={direction}
      style={{ 
        fontFamily: 'var(--font-persian)',
        ...direction === 'rtl' ? { textAlign: 'right' } : {}
      }}
    >
      {formattedContent}
    </span>
  );
};

/**
 * Specialized components for common use cases
 */

// Component for displaying Persian numbers
export const PersianNumber: React.FC<{ value: number; className?: string }> = ({ 
  value, 
  className 
}) => (
  <Farsisaz type="number" className={className}>
    {value}
  </Farsisaz>
);

// Component for displaying prices in Persian
export const PersianPrice: React.FC<{ 
  amount: number; 
  currency?: string; 
  className?: string 
}> = ({ amount, currency, className }) => (
  <Farsisaz type="currency" currency={currency} className={className}>
    {amount}
  </Farsisaz>
);

// Component for Persian text with auto-direction
export const PersianText: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  truncate?: number;
}> = ({ children, className, truncate }) => (
  <Farsisaz type="text" className={className} truncate={truncate}>
    {children}
  </Farsisaz>
);

export default Farsisaz; 