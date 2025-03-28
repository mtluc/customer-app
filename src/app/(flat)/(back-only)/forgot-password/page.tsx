/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Alert from '@/components/alert/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import OTPInput from '@/components/verify/opt'
import { getResponError } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLoader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formStep1Schema = z.object({
  email: z.string().email('Email không hợp lệ')
})

const formStep3Schema = z.object({
  newPassword: z.string().min(1, 'Mật khẩu không được để trống')
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [, setTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const alertMessageRef = useRef<{
    message: string
    onClose?: () => void
  }>({
    message: ''
  })

  const formStep1 = useForm<z.infer<typeof formStep1Schema>>({
    resolver: zodResolver(formStep1Schema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  })

  const formStep3 = useForm<z.infer<typeof formStep3Schema>>({
    resolver: zodResolver(formStep3Schema),
    mode: 'onChange',
    defaultValues: {
      newPassword: ''
    }
  })

  async function onSubmitStep1(values: z.infer<typeof formStep1Schema>) {
    if (isLoading) return
    try {
      setTransition(() => setIsLoading(true))
      const res = await fetch(`/api/jbb/api/v1/appUsers/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (res.ok) {
        setStep((s) => s + 1)
      } else {
        throw getResponError(await res.json())
      }
    } catch (error: any) {
      alertMessageRef.current = {
        message: getResponError(error)
      }
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  async function verify() {
    if (isLoading) return
    try {
      setTransition(() => setIsLoading(true))
      if (otp?.length === 6) {
        const res = await fetch(
          `/api/jbb/api/v1/appUsers/forgot-password/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: formStep1.getValues().email,
              verificationCode: otp
            })
          }
        )
        if (res.ok) {
          setStep((s) => s + 1)
        } else {
          throw getResponError(await res.json())
        }
      } else {
        throw 'Vui lòng nhập mã xác thực'
      }
    } catch (error: any) {
      alertMessageRef.current = {
        message: getResponError(error)
      }
      setShowAlert(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmitStep3(values: z.infer<typeof formStep3Schema>) {
    if (isLoading) return
    try {
      setTransition(() => setIsLoading(true))
      const res = await fetch(`/api/jbb/api/v1/appUsers/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          verificationCode: otp,
          email: formStep1.getValues().email
        })
      })
      if (res.ok) {
        alertMessageRef.current = {
          message: 'Tài khoản của bạn đã được đổi sang mật khẩu mới!',
          onClose: () => {
            router.push('/login')
          }
        }
        setShowAlert(true)
      } else {
        throw getResponError(await res.json())
      }
    } catch (error: any) {
      alertMessageRef.current = {
        message: getResponError(error)
      }
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="min-h-[calc(100dvh-3.3rem)] bg-background p-4">
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu</h1>
        {step == 1 && (
          <>
            <div className="my-1 text-center">
              <span className="text-gray-500">
                Nhập email tài khoản của bạn
              </span>
            </div>
            <Form {...formStep1}>
              <form
                onSubmit={formStep1.handleSubmit(onSubmitStep1)}
                className="mt-10 grid w-full grid-cols-1 gap-8"
                suppressHydrationWarning
              >
                <FormField
                  control={formStep1.control}
                  name="email"
                  render={({ field, fieldState: { invalid } }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Email (*)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={
                            'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                            (invalid
                              ? ' border-red-500 focus:border-red-500'
                              : '')
                          }
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage className="text-xs italic" />
                    </FormItem>
                  )}
                />
                <div className="my-4">
                  <Button className="w-full">Tiếp theo</Button>
                </div>
              </form>
            </Form>
          </>
        )}

        {step == 2 && (
          <>
            <div className="my-1 text-center">
              <span className="text-gray-500">
                Vui lòng kiểm tra mã xác nhận đã được gửi tới email{' '}
                <strong>{formStep1.getValues().email}</strong> và nhập mã bên
                dưới.
              </span>
            </div>
            <div className="m-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 p-4">
              <OTPInput length={6} otp={otp} onOtpChange={(_) => setOtp(_)} />
            </div>
            <div className="my-4 text-center">
              <Button className="w-full max-w-40" onClick={verify}>
                Xác thực
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="my-1 text-center">
              <span className="text-gray-500">Nhập mật khẩu mới</span>
            </div>
            <Form {...formStep3}>
              <form
                onSubmit={formStep3.handleSubmit(onSubmitStep3)}
                className="mt-10 grid w-full grid-cols-1 gap-8"
                suppressHydrationWarning
              >
                <FormField
                  control={formStep3.control}
                  name="newPassword"
                  render={({ field, fieldState: { invalid } }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Mật khẩu mới (*)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className={
                            'rounded-none border-x-0 border-t-0 shadow-none focus:border-[#0d6efd] focus-visible:ring-0' +
                            (invalid
                              ? ' border-red-500 focus:border-red-500'
                              : '')
                          }
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage className="text-xs italic" />
                    </FormItem>
                  )}
                />
                <div className="my-4">
                  <Button className="w-full">Hoàn thành</Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>

      {isLoading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-35">
          <LucideLoader2 className="size-8 animate-spin stroke-1 text-white" />
        </div>
      )}

      <Alert
        open={showAlert}
        onOpenChanged={(open) => {
          setShowAlert(open)
          if (!open && alertMessageRef.current.onClose) {
            alertMessageRef.current.onClose()
          }
        }}
      >
        <div className="text-center">{alertMessageRef.current.message}</div>
      </Alert>
    </>
  )
}
