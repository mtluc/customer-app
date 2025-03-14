/* eslint-disable @typescript-eslint/no-explicit-any */
import categoriesSlice, {
  fetchCategoryOnRequest
} from '@/store/slices/categories/categories.Slice'
import { useSelectSlice } from '@/store/store.hook'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import { Button } from '../ui/button'

const CategoriesSub = () => {
  return (
    <div className="flex-1 overflow-auto p-1">
      <SubHeader />
      <Subs />
    </div>
  )
}

export default CategoriesSub

const SubHeader = () => {
  const category = useSelectSlice(categoriesSlice, (s) =>
    s.roots.idActived ? s.roots.entities[s.roots.idActived] : null
  )
  return (
    category && (
      <Button
        asChild
        variant="link"
        className="p-1 pr-4 text-foreground hover:text-primary"
      >
        <Link href={`/auction?category=${category.code}&cname=${encodeURIComponent(category.label)}`} prefetch={false}>
          {category.label}
        </Link>
      </Button>
    )
  )
}

const Subs = () => {
  const rootActiedId = useSelectSlice(categoriesSlice, (s) => s.roots.idActived)
  const isLoadRoot = useSelectSlice(categoriesSlice, (s) => s.isLoadRoot)
  return (
    rootActiedId &&
    (isLoadRoot ? (
      <div>Đang tải...</div>
    ) : (
      <SubsContent key={rootActiedId} parentId={rootActiedId} />
    ))
  )
}

const SubsContent = ({ parentId }: { parentId: string }) => {
  const subs = useSelectSlice(categoriesSlice, (s) =>
    s.roots.idActived ? s.subItems[parentId].ids : null
  )

  return (
    <Accordion type="single" collapsible className={parentId ? 'pl-4' : ''}>
      {subs?.map((code) => (
        <SubItem key={code} id={code} parentId={parentId} />
      ))}
    </Accordion>
  )
}

const SubItem = ({ id, parentId }: { id: string; parentId: string }) => {
  const dispatch = useDispatch<any>()
  const category = useSelectSlice(
    categoriesSlice,
    (s) => s.subItems[parentId].entities[id]
  )
  const isLoading = useSelectSlice(
    categoriesSlice,
    (s) => s.loadingChildren[id]
  )

  const clickAccordion = (code: string) => {
    dispatch(fetchCategoryOnRequest(code))
  }

  return (
    category && (
      <AccordionItem value={category.label} className="border-none">
        <div className="flex w-full items-center justify-between">
          <Button
            asChild
            variant="link"
            className="block h-auto overflow-hidden text-ellipsis p-1 py-2 text-foreground hover:text-primary"
          >
            <Link href={`/auction?category=${category.code}&cname=${encodeURIComponent(category.label)}`} prefetch={false}>
              {category.label}
            </Link>
          </Button>

          <AccordionTrigger
            className={category.isHasChild ? 'py-2 pl-8 pr-1' : 'collapse'}
            onClick={() => clickAccordion(category.code)}
          />
        </div>

        <AccordionContent className="pb-2">
          {isLoading ? (
            <p className="pl-4">Đang tải...</p>
          ) : (
            <SubsContent key={category.code} parentId={category.code} />
          )}
        </AccordionContent>
      </AccordionItem>
    )
  )
}
