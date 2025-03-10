/* eslint-disable @next/next/no-async-client-component */
'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useState } from 'react'

type Item = {
  id: string
  name: string
  hasChildren: boolean
}

export default function CategoriesPage() {
  const [loadedChildren, setLoadedChildren] = useState<{
    [key: string]: Item[]
  }>({})
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  // Giả lập API fetch dữ liệu con
  const fetchChildren = async (parentId: string) => {
    if (loadedChildren[parentId]) return // Nếu đã tải, không tải lại

    setLoading((prev) => ({ ...prev, [parentId]: true }))

    setTimeout(() => {
      // Giả lập dữ liệu mục con
      const fakeData: { [key: string]: Item[] } = {
        'item-1': [
          { id: 'sub-1.1', name: 'Danh mục con 1.1', hasChildren: true },
          { id: 'sub-1.2', name: 'Danh mục con 1.2', hasChildren: false }
        ],
        'sub-1.1': [
          {
            id: 'child-1.1.1',
            name: 'Danh mục cháu 1.1.1',
            hasChildren: false
          },
          { id: 'child-1.1.2', name: 'Danh mục cháu 1.1.2', hasChildren: true }
        ],
        'child-1.1.2': [
          {
            id: 'greatchild-1.1.2.1',
            name: 'Danh mục chắt 1.1.2.1',
            hasChildren: false
          }
        ]
      }

      setLoadedChildren((prev) => ({
        ...prev,
        [parentId]: fakeData[parentId] || []
      }))
      setLoading((prev) => ({ ...prev, [parentId]: false }))
    }, 1000)
  }

  // Render động theo cây dữ liệu
  const renderItems = (items: Item[], parentId?: string) => (
    <Accordion type="single" className={parentId ? 'pl-4' : ''}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger
            onClick={() => item.hasChildren && fetchChildren(item.id)}
          >
            {item.name}
          </AccordionTrigger>
          <AccordionContent>
            {loading[item.id] && <p>Đang tải...</p>}
            {loadedChildren[item.id] &&
              renderItems(loadedChildren[item.id], item.id)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  // Dữ liệu gốc (cấp 1)
  const rootItems: Item[] = [
    { id: 'item-1', name: 'Danh mục 1', hasChildren: true },
    { id: 'item-2', name: 'Danh mục 2', hasChildren: false }
  ]

  return <div className="w-full">{renderItems(rootItems)}</div>
}
