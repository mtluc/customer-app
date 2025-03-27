'use client'

import React, { PropsWithChildren } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

interface AlertProps extends PropsWithChildren {
    open: boolean,
    onOpenChanged: (open: boolean) => void,
    title?: string,
    buttons?: React.ReactNode
}
export default function Alert(props: AlertProps) {
    return <Dialog open={props.open} onOpenChange={props.onOpenChanged}>
        <DialogContent className='rounded-lg w-96 max-w-full'>
            <DialogHeader>
                <DialogTitle className="text-primary text-center mb-4">{props.title ?? 'Thông báo'}</DialogTitle>
                <DialogDescription hidden />
            </DialogHeader>
            <div>
                {
                    props.children
                }
            </div>
            <div className='flex flex-wrap items-center justify-center gap-2 overflow-hidden'>
                {
                    props.buttons ?? <Button className='w-52 max-w-full' onClick={() => props.onOpenChanged(false)}>Đóng</Button>
                }
            </div>
        </DialogContent>
    </Dialog>
} 