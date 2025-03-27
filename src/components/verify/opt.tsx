"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
    otp?: string;
    length: number;
    onOtpChange?: (newOtp: string) => void;
}

export default function OTPInput({ otp, length, onOtpChange }: OTPInputProps) {
    const [otpArray, setOtpArray] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Cập nhật giá trị khi prop `otp` thay đổi
    useEffect(() => {
        if (otp?.length === length) {
            setOtpArray(otp.split(""));
        }
    }, [otp, length]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (/^\d$/.test(event.key)) {
            // Nếu là số 0-9, cập nhật giá trị và chuyển sang ô tiếp theo
            event.preventDefault();
            const newOtp = [...otpArray];
            newOtp[index] = event.key;
            setOtpArray(newOtp);
            onOtpChange?.(newOtp.join(""));

            // Focus vào ô tiếp theo nếu có
            const nextIndex = index + 1;
            if (nextIndex < length) {
                inputRefs.current[nextIndex]?.focus();
            }
        }
        else if (event.key === "Backspace" || event.key === "Delete") {
            const newOtp = [...otpArray];

            if (!otpArray[index] && index > 0) {
                newOtp[index - 1] = "";
                inputRefs.current[index - 1]?.focus();
            } else {
                newOtp[index] = "";
            }

            setOtpArray(newOtp);
            onOtpChange?.(newOtp.join(""));
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData("text").replace(/\D/g, ""); // Lấy số từ dữ liệu paste
        if (!pasteData) return;

        const newOtp = pasteData.slice(0, length).split("");
        setOtpArray(newOtp);
        onOtpChange?.(newOtp.join(""));

        // Focus vào ô cuối cùng sau khi paste
        const lastFilledIndex = newOtp.length - 1;
        if (inputRefs.current[lastFilledIndex]) {
            inputRefs.current[lastFilledIndex]?.focus();
        }
    };

    return (
        <>
            {otpArray.map((value, index) => (
                <Input
                    key={index}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    type="text"
                    value={value}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste} // Hỗ trợ paste OTP
                    className="w-12 h-12 text-center text-lg border border-gray-300 shadow-none rounded-lg"
                />
            ))}
        </>
    );
}
