import { memo } from "react";

interface AutionItemProps {
    /**
     * key của danh sách trong store
     */
    keyOfList: string,

    /**
     * mã sp đấu giá
     */
    code: string
}

const AutionItem = ({ keyOfList, code }: AutionItemProps) => {
    
    return <></>
}

export default memo(AutionItem);