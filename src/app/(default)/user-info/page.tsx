'use client'
import { Button } from '@/components/ui/button'
import appSlice from '@/store/slices/appSlice'
import { useSelectSlice } from '@/store/store.hook'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

export default function UserPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelectSlice(appSlice, (s) => s.user)

  const logout = async () => {
    const res = await fetch('/api/auth/logout')
    if (res.ok) {
      dispatch(appSlice.actions.setUserInfo())
      router.refresh()
    }
  }

  return (
    <div>
      <div>
        <div>{user ? 'Authed' : 'UnAuth'}</div>
        <div>{user?.name}</div>
        <div>{user?.email}</div>
      </div>
      <div>
        <Button onClick={logout}>Đăng xuất</Button>
      </div>
    </div>
  )
}
