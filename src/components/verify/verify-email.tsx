/* eslint-disable @typescript-eslint/no-explicit-any */
import { getResponError } from '@/utils/utils'
import { LucideLoader2 } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState, useTransition } from 'react'
import Alert from '../alert/alert'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet'
import OTPInput from './opt'

export type VerifyEmailProps = {
  title: string
  open: boolean
  onOpenChanged: (isOpen: boolean) => void
  email: string
  sendCodeUrl?: string
  verifyUrl: string
  onVerifySuccess?: () => void
}

export default function VerifyEmail({
  title,
  email,
  open,
  sendCodeUrl,
  onOpenChanged,
  verifyUrl,
  onVerifySuccess
}: VerifyEmailProps) {
  const [sendCode, setSendCode] = useState(60)
  const [, setTransition] = useTransition()
  const [otp, setOtp] = useState('')
  const timoutRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const alertMessageRef = useRef<{
    message: string
    onClose?: () => void
  }>({
    message: ''
  })

  const reSendVerifyCode = async () => {
    if (isLoading || !sendCodeUrl) return
    try {
      setTransition(() => setIsLoading(true))
      const res = await fetch(sendCodeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      if (res.ok) {
        alertMessageRef.current = {
          message: 'Mã xác thực đã được gửi tới email của bạn'
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
      console.error(error)
    } finally {
      setIsLoading(false)
      setSendCode(60)
    }
  }
  useEffect(() => {
    const _timoutRef = timoutRef
    if (_timoutRef.current) {
      clearTimeout(_timoutRef.current)
    }
    if (sendCode > 0) {
      _timoutRef.current = setTimeout(() => {
        if (sendCode > 0) setSendCode(sendCode - 1)
      }, 1000)
    }

    return () => {
      if (_timoutRef.current) {
        clearTimeout(_timoutRef.current)
      }
    }
  }, [sendCode])

  const verify = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    try {
      setTransition(() => setIsLoading(true))
      if (otp?.length === 6) {
        const res = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            verificationCode: otp
          })
        })
        if (res.ok) {
          onVerifySuccess?.()
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
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChanged}>
        <SheetContent
          className="right-0 w-full !max-w-full p-0"
          showBtnClose={false}
        >
          <SheetHeader>
            <SheetTitle className="p-4 text-center shadow-md">
              {title}
            </SheetTitle>
            <SheetDescription hidden />
          </SheetHeader>
          <form onSubmit={verify} className="m-auto max-w-xl p-4 text-center">
            <div>
              Vui lòng kiểm tra mã xác nhận đã được gửi tới email{' '}
              <strong>{email}</strong> và nhập mã bên dưới.
            </div>
            {sendCodeUrl ? (
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={sendCode > 0}
                  onClick={reSendVerifyCode}
                >
                  Gửi lại mã
                  {sendCode > 0 && ` (${sendCode}s)`}
                </Button>
              </div>
            ) : null}
            <div className="m-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 p-4">
              <OTPInput length={6} otp={otp} onOtpChange={(_) => setOtp(_)} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                className="w-28"
                variant="outline"
                onClick={() => onOpenChanged?.(false)}
              >
                Bỏ qua
              </Button>
              <Button type="submit" className="w-28">
                Xác thực
              </Button>
            </div>
          </form>
          {isLoading && (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-500 bg-opacity-35">
              <LucideLoader2 className="size-8 animate-spin stroke-1 text-white" />
            </div>
          )}
        </SheetContent>
      </Sheet>

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
