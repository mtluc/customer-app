/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Alert from '@/components/alert/alert'
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
import VerifyEmail from '@/components/verify/verify-email'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
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
  const router = useRouter();
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

  const [, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVerifyEmail, setOpenVerifyEmail] = useState(false);
  const [openNotifyVerifyEmail, setNotifyVerifyEmail] = useState(false);
  const [openVerifyEmailSuccess, setOpenVerifyEmailSuccess] = useState(false);
  const verifyEmailOpenChange = (open: boolean) => {
    setOpenVerifyEmail(open);
    if (!open) {
      router.push("/login");
    }
  }

  const errorRef = useRef<string>('');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startTransition(() => setIsSubmitting(true));
      const res = await fetch(
        `/api/jbb/api/v1/appUsers/register`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        setNotifyVerifyEmail(true);
      } else {
        const error = await res.json();
        if (error) {
          if (error.errors?.[0]?.description) {
            throw error.errors?.[0]?.description
          } else if (error.detail) {
            throw error.detail
          } else {
            throw 'Có lỗi xảy ra!'
          }
        }
      }
    } catch (error: any) {
      errorRef.current = error;
      setOpen(true);
      console.error(error);
    } finally {
      startTransition(() => setIsSubmitting(false));
    }
  }

  useEffect(() => {
    document.title = 'Đăng ký - JBB'
  }, [])
  return (
    <>
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
              <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Đang đăng ký..." : "Đăng ký"}</Button>
            </div>
          </form>
        </Form>
      </div>



      <VerifyEmail email={form.getValues().email}
        sendCodeUrl={`/api/jbb/api/v1/appUsers/email/send-code`}
        verifyUrl='/api/jbb/api/v1/appUsers/email/verify'
        open={openVerifyEmail}
        title='Xác thực email của bạn'
        onOpenChanged={verifyEmailOpenChange}
        onVerifySuccess={() => setOpenVerifyEmailSuccess(true)}
      />

      <Alert open={openNotifyVerifyEmail} onOpenChanged={(_) => {
        setNotifyVerifyEmail(_);
        if (!_) {
          verifyEmailOpenChange(_);
        }
      }} title='Đăng ký tài khoản thành công' buttons={<>
        <Button className='w-52 max-w-full' variant='outline' onClick={() => {
          verifyEmailOpenChange(false);
        }}>Đăng nhập</Button>

        <Button className='w-52 max-w-full' onClick={() => {
          verifyEmailOpenChange(true);
        }}>Xác thực tài khoản</Button>
      </>}>
        <div className='text-center'>
          Chúc mừng bạn đăng ký tài khoản thành công! Xác thực tài khoản để nhận nhiều ưu đãi
        </div>
      </Alert>

      <Alert open={openVerifyEmailSuccess} onOpenChanged={(_) => {
        setOpenVerifyEmailSuccess(_);
        if (!_) {
          verifyEmailOpenChange(_);
        }
      }} title='Xác thực tài khoản thành công' buttons={<>
        <Button className='w-52 max-w-full' onClick={() => {
          setOpenVerifyEmailSuccess(false);
          verifyEmailOpenChange(false);
        }}>Đăng nhập</Button>
      </>}>
        <div className='text-center'>
          Đăng nhập ngay để trải nghiệm mua sắm
        </div>
      </Alert>

      <Alert open={open} onOpenChanged={setOpen}>
        <div className='text-center'>
          {errorRef.current}
        </div>
      </Alert>
    </>
  )
}
