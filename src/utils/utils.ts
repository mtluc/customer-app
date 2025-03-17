/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AppConfig } from './config';
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, decimalPlaces: number = 2, locales: Intl.LocalesArgument = "vi-VN", currency: string = "USD", style: 'currency' | 'decimal' | 'percent' | 'unit' = "decimal") {
  return new Intl.NumberFormat(locales, {
    style: style,
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

/**
 * chuyển object sang querystring
 * @param obj
 * @returns
 */
export function parseObjectToQueryString(obj: any) {
  const queryString = Object.keys(JSON.parse(JSON.stringify(obj)))
    ?.map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    ?.join("&");
  if (queryString) {
    return "?" + queryString;
  }
  return queryString;
};

/**
 * Có phải đang ở client không
 * @returns boolean
 */
export function isClient() {
  return typeof window !== "undefined";
};

export function devLog(msg: any) {
  if (AppConfig.NODE_ENV == "development") {
    console.log(msg);
  }
};

export function newUUID() {
  return uuidv4();
}