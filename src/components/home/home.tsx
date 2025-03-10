import { AppConfig } from '@/utils/config'
import { cache } from 'react'
import Sugguest from './sugguest/sugguest'
import TopBrand from './top-brand/top-brand'
import TopCategories from './top-categories/top-categories'
import TopSearch from './top-search/top-search'
import TopShop from './top-shop/top-shop'

const loadSugguest = cache(async (type: number) => {
  const res = await fetch(
    `${AppConfig.JBB_API}/api/v1/auctions/sugguest/${type}`,
    {
      next: { revalidate: 3 } // Cache trong 5 phút (300 giây)
    }
  )
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách sản phẩm đấu giá')
  }
  return res.json()
})

const loadTopShop = cache(async () => {
  const res = await fetch(`${AppConfig.JBB_API}/api/v1/common/topsellers`, {
    next: { revalidate: 1 * 24 * 60 * 60 }
  })
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách shop bán chạy')
  }
  return res.json()
})

const loadTopCategories = cache(async () => {
  const res = await fetch(
    `${AppConfig.JBB_API}/api/v1/common/popularcategories`,
    {
      next: { revalidate: 1 * 24 * 60 * 60 }
    }
  )
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách danh mục phổ biến')
  }
  return res.json()
})

const loadTopBands = cache(async () => {
  const res = await fetch(`${AppConfig.JBB_API}/api/v1/common/popularbrands`, {
    next: { revalidate: 1 * 24 * 60 * 60 }
  })
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách danh mục phổ biến')
  }
  return res.json()
})

const Home = async () => {
  const [auctionPoulars, auctionOneYens, topSellers, topCategories, topBands] =
    await Promise.all([
      loadSugguest(1),
      loadSugguest(2),
      loadTopShop(),
      loadTopCategories(),
      loadTopBands()
    ])

  return (
    <>
      <Sugguest
        key={'SUGGUEST_POPULAR'}
        keyOfList="SUGGUEST_POPULAR"
        title="Sản phẩm phổ biến"
        items={auctionPoulars}
      />
      <Sugguest
        key={'SUGGUEST_ONE_YEN'}
        keyOfList="SUGGUEST_ONE_YEN"
        title="Sản phẩm 1¥"
        className="mt-6"
        items={auctionOneYens}
      />
      <TopCategories items={topCategories} />
      <TopSearch />
      <TopBrand items={topBands} />
      <TopShop items={topSellers} />
    </>
  )
}
export default Home
