// src/GlobalStore.ts

// Khai báo kiểu dữ liệu cho Store
type Store = {
    getStoreValue: () => number;
    subscribe: (callback: () => void) => () => void;
    setStoreValue: (value: number) => void;
};

// Tạo store đơn giản
let storeValue: number = 0;
const listeners: Set<() => void> = new Set();

// Hàm lấy giá trị store
function getStoreValue(): number {
    return storeValue;
}

// Hàm đăng ký listener
function subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

// Hàm thay đổi giá trị store
function setStoreValue(value: number): void {
    storeValue = value;
    listeners.forEach((listener) => listener());
}

// Tạo GlobalStore với các method
export const GlobalStore: Store = {
    getStoreValue,
    subscribe,
    setStoreValue,
};
