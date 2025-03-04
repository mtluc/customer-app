import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number,decimalPlaces: number = 2, locales: Intl.LocalesArgument = "vi-VN", currency: string = "USD", style: 'currency' | 'decimal' | 'percent' | 'unit' = "decimal") {
  return new Intl.NumberFormat(locales, {
    style: style,
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
} 