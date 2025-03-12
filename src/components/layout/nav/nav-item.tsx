'use client'
import { formatNumber } from '@/utils/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentType, memo, PropsWithChildren, useMemo } from 'react'

interface NavItemProps extends PropsWithChildren {
  href: string
  name: string
  count?: number
  Icon: ComponentType<{ className: string }>
}

const NavItem = ({ href, name, Icon, children, count }: NavItemProps) => {
  const pathname = usePathname()
  const isActived = useMemo(() => {
    return pathname === href || pathname.startsWith(href + '/')
  }, [pathname, href])
  return (
    <Link
      href={href}
      title={name}
      className="flex-1 p-1 pb-2 text-center text-gray-900 hover:text-primary"
      prefetch={false}
    >
      <div
        className={
          'relative m-auto h-8 w-8' + (isActived ? ' text-primary' : '')
        }
      >
        <Icon
          className={
            'absolute left-1/2 top-1/2 w-8/12 -translate-x-1/2 -translate-y-1/2 stroke-1' +
            (isActived ? ' stroke-2' : '')
          }
        />
        {count && (
          <div className="absolute -top-1 left-6 rounded-full border border-primary-foreground bg-primary px-1 py-0 align-middle text-xs font-bold text-primary-foreground">
            {formatNumber(count, 0)}
          </div>
        )}
      </div>
      <span
        className={
          'block text-sm' + (isActived ? ' font-semibold text-primary' : '')
        }
      >
        {name}
      </span>
      {children}
    </Link>
  )
}
export default memo(NavItem)
