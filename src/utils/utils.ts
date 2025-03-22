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

export function formatDateTime(date: Date | string | number, format: string = "YYYY-MM-DD HH:mm:ss"): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
    if (isNaN(date.getTime())) return "Invalid Date";
  }

  const pad = (num: number): string => num.toString().padStart(2, "0");

  const map: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    AMPM: date.getHours() >= 12 ? "PM" : "AM",
    hh: pad(date.getHours() % 12 || 12)
  };

  return format.replace(/YYYY|MM|DD|HH|hh|mm|ss|AMPM/g, (match) => map[match]);
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