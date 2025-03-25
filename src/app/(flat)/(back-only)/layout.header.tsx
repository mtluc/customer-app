'use client'

import { Button } from '@/components/ui/button'
import { LucideChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const backPage = () => {
    try {
      const currentPath = window.location.pathname
      const previousUrl = document.referrer

      if (previousUrl) {
        const previousPath = new URL(previousUrl).pathname

        if (previousPath !== currentPath) {
          router.back()
          return
        }
      }

      router.back()
    } catch {
      router.push('/')
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-gray-50 px-1 py-2 shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex w-full max-w-4xl items-center">
        <Button
          variant="ghost"
          className="mr-2 gap-0 p-0 hover:bg-transparent"
          onClick={backPage}
        >
          <LucideChevronLeft className="!size-8 stroke-1" />
          Quay lại
        </Button>
      </div>
    </header>
  )
}

export default Header
