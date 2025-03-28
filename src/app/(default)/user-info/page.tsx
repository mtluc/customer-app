/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from "@/components/ui/button";
import appSlice from "@/store/slices/appSlice";
import { useSelectSlice } from "@/store/store.hook";

export default function UserPage() {
    const user = useSelectSlice(appSlice,(s)=>s.user);
    const logout =()=>{
        
    }

    return <div>
        <div>
            <div>
                {user ? "Authed": "UnAuth"}
            </div>
            <div>
                {user?.name}
            </div>
            <div>
                {user?.email}
            </div>
        </div>
        <div>
            <Button onClick={logout}>Đăng xuất</Button>
        </div>
    </div>
}