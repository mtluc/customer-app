/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";

const formSchema = z.object({
    lastName: z.string().min(1, "Họ không được để trống"),
    firstName: z.string().min(1, "Tên không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().regex(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(1, "Mật khẩu không được để trống"),
    confirmPassword: z.string().min(1, "Mật khẩu xác nhận không hợp lệ"),
    terms: z.literal(true)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            lastName: '',
            firstName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    useEffect(() => {
        document.title = "Đăng ký - JBB"
    }, [])
    return (
        <div className='min-h-[calc(100dvh-3.3rem)] bg-background p-4'>
            <h1 className='font-semibold text-2xl'>Đăng ký tài khoản</h1>
            <div className='my-1'>
                <span className='text-gray-500'>Đã có tài khoản?</span>
                <Link href="/login" className='text-primary ml-2'>Đăng nhập ngay</Link>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 space-y-4 mt-8">
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Họ (*)</FormLabel>
                                <FormControl>
                                    <Input {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} autoFocus />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Tên (*)</FormLabel>
                                <FormControl>
                                    <Input {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} autoFocus />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Email (*)</FormLabel>
                                <FormControl>
                                    <Input {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} autoFocus />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Số điện thoại (*)</FormLabel>
                                <FormControl>
                                    <Input {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} autoFocus />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Mật khẩu (*)</FormLabel>
                                <FormControl>
                                    <Input type="password"  {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, fieldState: { invalid } }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>Xác nhận mật khẩu (*)</FormLabel>
                                <FormControl>
                                    <Input type="password"  {...field} className={'border-t-0 border-x-0 shadow-none rounded-none focus-visible:ring-0 focus:border-[#0d6efd]' + (invalid ? ' border-red-500 focus:border-red-500' : '')} />
                                </FormControl>
                                <FormMessage className='text-xs italic' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className='items-center'>
                                <FormControl>
                                    <Checkbox checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className='text-foreground ml-2 font-normal'>Tôi đồng ý với chính sách & điều khoản của JBB</FormLabel>
                            </FormItem>
                        )}
                    />

                    <div className='my-4 space-y-2'>
                        <Button className='w-full'>Đăng nhập</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
