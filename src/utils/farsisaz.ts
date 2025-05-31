/**
 * Farsisaz Utility Functions
 * 
 * This utility provides functions for:
 * - Converting English numbers to Persian numbers
 * - Converting Persian numbers to English numbers
 * - Formatting currency values
 * - Handling text direction (RTL/LTR)
 */

// Persian number mapping
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Convert English numbers to Persian numbers
 * @param input - String or number to convert
 * @returns String with Persian digits
 */
export function toPersianNumbers(input: string | number): string {
  const str = input.toString();
  return str.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
}

/**
 * Convert Persian numbers to English numbers
 * @param input - String with Persian digits
 * @returns String with English digits
 */
export function toEnglishNumbers(input: string): string {
  return input.replace(/[۰-۹]/g, (match) => {
    const index = persianDigits.indexOf(match);
    return englishDigits[index];
  });
}

/**
 * Format currency with Persian numbers and thousand separators
 * @param amount - Number to format
 * @param currency - Currency symbol (default: 'ریال')
 * @returns Formatted string with Persian numbers
 */
export function formatCurrency(amount: number, currency: string = 'ریال'): string {
  const formatted = amount.toLocaleString('fa-IR');
  return `${toPersianNumbers(formatted)} ${currency}`;
}

/**
 * Format number with thousand separators in Persian
 * @param num - Number to format
 * @returns Formatted string with Persian numbers
 */
export function formatPersianNumber(num: number): string {
  return toPersianNumbers(num.toLocaleString('fa-IR'));
}

/**
 * Parse Persian number string to JavaScript number
 * @param persianNumber - String with Persian digits
 * @returns JavaScript number
 */
export function parsePersianNumber(persianNumber: string): number {
  const englishNumber = toEnglishNumbers(persianNumber.replace(/,/g, ''));
  return parseFloat(englishNumber) || 0;
}

/**
 * Get text direction based on content
 * @param text - Text to analyze
 * @returns 'rtl' or 'ltr'
 */
export function getTextDirection(text: string): 'rtl' | 'ltr' {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text) ? 'rtl' : 'ltr';
}

/**
 * Add Persian thousand separators to a number
 * @param num - Number or string to format
 * @returns String with Persian thousand separators
 */
export function addPersianCommas(num: number | string): string {
  const numStr = num.toString();
  const parts = numStr.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toPersianNumbers(parts.join('.'));
}

/**
 * Truncate text with Persian ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with Persian ellipsis
 */
export function truncatePersianText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
} 