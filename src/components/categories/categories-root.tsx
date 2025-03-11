/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import categoriesSlice, { fetchCategoryOnRequest } from "@/store/slices/categories/categories.Slice";
import { useSelectSlice } from "@/store/store.hook";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const CategoriesRoot = () => {
    const ids = useSelectSlice(categoriesSlice, (s) => s.roots.ids)
    return <div className="h-full px-1 overflow-auto max-w-36">{
        ids.map((id) => {
            return <CategoriesItem key={id} code={id} />
        })
    }</div>
}
export default CategoriesRoot;

const CategoriesItem = ({ code }: { code: string }) => {
    const dispatch = useDispatch<any>();
    const { label } = useSelectSlice(categoriesSlice, (s) => s.roots.entities[code]);
    const actived = useSelectSlice(categoriesSlice, (s) => s.roots.idActived === code);
    const clickItem = () => {
        dispatch(fetchCategoryOnRequest(code))
    };
    return <Button className={"block h-auto w-full text-wrap min-h-16  my-1 hover:text-primary-foreground active:text-primary-foreground active:bg-primary" + (actived ? " bg-primary text-primary-foreground" : " text-foreground bg-gray-300")}
        onClick={clickItem}>
        {label} {actived}
    </Button>
}