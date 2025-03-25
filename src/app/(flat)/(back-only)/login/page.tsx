import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <h1>Đăng nhập</h1>
      <div>
        <span>Chưa có tài khoản?</span>
        <Link href="/register">Tạo tài khoản ngay</Link>
      </div>
      <form>
        <div>
          <Button>Đăng nhập</Button>
        </div>
      </form>
    </>
  )
}
