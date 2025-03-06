"use client";
import { formatNumber } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, memo, PropsWithChildren, useMemo } from 'react';

interface NavItemProps extends PropsWithChildren {
    href: string,
    name: string,
    count?: number,
    Icon: ComponentType<{ className: string }>
}

const NavItem = ({ href, name, Icon, children, count }: NavItemProps) => {
    const pathname = usePathname();
    const isActived = useMemo(() => {
        return pathname === href || pathname.startsWith(href + "/");
    }, [pathname, href]);
    return <Link
        href={href}
        title={name}
        className="flex-1 p-2 text-center text-primary-foreground"
    >
        <div className={'relative w-8 h-8 border m-auto rounded-full' + (isActived ? ' bg-primary-foreground text-primary' : ' border-transparent')}  >
            <Icon className={'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' + (isActived ? ' w-8/12 stroke-2' : ' w-10/12 stroke-1')} />
            {
                count &&
                <div className="absolute left-6 -top-1 rounded-full bg-primary px-1 py-0 align-middle text-xs font-bold text-primary-foreground border border-primary-foreground">
                    {formatNumber(count, 0)}
                </div>
            }
        </div>
        <span className={'block text-sm' + (isActived ? ' font-semibold' : '')}>{name}</span>
        {children}
    </Link>
};
export default memo(NavItem);

