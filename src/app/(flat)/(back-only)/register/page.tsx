/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    lastName: z.string().min(1, 'Họ không được để trống'),
    firstName: z.string().min(1, 'Tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .regex(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/, 'Số điện thoại không hợp lệ'),
    password: z.string().min(1, 'Mật khẩu không được để trống'),
    confirmPassword: z.string().min(1, 'Mật khẩu xác nhận không hợp lệ'),
    terms: z.literal(true)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

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
      confirmPassword: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    document.title = 'Đăng ký - JBB'
  }, [])
  return (
    <div className="min-h-[calc(100dvh-3.3rem)] bg-background p-4">
      <h1 className="text-2xl font-semibold">Đăng ký tài khoản</h1>
      <div className="my-1">
        <span className="text-gray-500">Đã có tài khoản?</span>
        <Link href="/login" className="ml-2 text-primary">
          Đăng nhập ngay
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid w-full grid-cols-1 gap-8 sm:grid-cols-2"
          suppressHydrationWarning
        >
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">Họ (*)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                    autoFocus
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">Tên (*)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                    autoFocus
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email (*)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                    autoFocus
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Số điện thoại (*)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                    autoFocus
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">Mật khẩu (*)</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Xác nhận mật khẩu (*)
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                      (invalid ? ' border-red-500 focus:border-red-500' : '')
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs italic" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Checkbox
                    className="size-5 align-middle"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-2 align-middle font-normal text-foreground">
                  Tôi đồng ý với chính sách & điều khoản của JBB
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="my-4 sm:col-span-2">
            <Button className="w-full">Đăng ký</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
