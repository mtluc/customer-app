

import { Metadata } from 'next'
import CategoryClient from './categoryClient'

export type CategoryPageProps = {
    params: Promise<{
        code: string
    }>
    searchParams: Promise<{
        cname: string
    }>
}

export async function generateMetadata({ searchParams }: CategoryPageProps) {
    return {
        title: `Danh mục: ${(await searchParams).cname}`,
        description: `Danh mục: ${(await searchParams).cname}`
    } as Metadata
}

export default async function CategoryPage({
    params,
    searchParams
}: CategoryPageProps) {
    const code = (await params).code
    const cname = (await searchParams).cname
    return <CategoryClient code={code} cname={cname} />
}