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
import appSlice from '@/store/slices/appSlice'
import { getResponError } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLoader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống')
})

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [, setTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const alertMessageRef = useRef<{
    message: string
    onClose?: () => void
  }>({
    message: ''
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return
    try {
      setTransition(() => setIsLoading(true))
      const result = await fetch(`/api/auth`, {
        method: 'POST',
        body: JSON.stringify(values)
      })

      if (result?.ok) {
        const user = await result.json()
        dispatch(
          appSlice.actions.setUserInfo({
            id: user.id,
            email: user.email,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            isVerified: user.isVerified
          })
        )
        const callbackUrl = await searchParams.get('callbackUrl')
        router.push(callbackUrl || '/')
      } else {
        throw getResponError(await result.json())
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

  useEffect(() => {
    document.title = 'Đăng nhập - JBB'
  }, [])

  return (
    <>
      <div className="min-h-[calc(100dvh-3.3rem)] bg-background p-4">
        <h1 className="text-2xl font-semibold">Đăng nhập</h1>
        <div className="my-1">
          <span className="text-gray-500">Chưa có tài khoản?</span>
          <Link href="/register" className="ml-2 text-primary">
            Tạo tài khoản ngay
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 grid w-full grid-cols-1 gap-8"
            suppressHydrationWarning
          >
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
              name="password"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Mật khẩu (*)
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

            <div className="text-right">
              <Link href="/forgot-password" className="text-primary">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="my-4">
              <Button className="w-full">Đăng nhập</Button>
            </div>
          </form>
        </Form>
      </div>

      {isLoading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-35">
          <LucideLoader2 className="size-8 animate-spin stroke-1 text-white" />
        </div>
      )}

      <Alert open={showAlert} onOpenChanged={setShowAlert}>
        <div className="text-center">{alertMessageRef.current.message}</div>
      </Alert>
    </>
  )
}
