/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    document.title = "Đăng nhập - JBB"
  }, [])

  return (
    <div className='min-h-[calc(100dvh-3.3rem)] bg-background p-4'>
      <h1 className='font-semibold text-2xl'>Đăng nhập</h1>
      <div className='my-1'>
        <span className='text-gray-500'>Chưa có tài khoản?</span>
        <Link href="/register" className='text-primary ml-2'>Tạo tài khoản ngay</Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-8 mt-10">
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

          <div className=' text-right'>
            <Link href="/forgot-password" className='text-primary'>Quên mật khẩu?</Link>
          </div>
          <div className='my-4'>
            <Button className='w-full'>Đăng nhập</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
