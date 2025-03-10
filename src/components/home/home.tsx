import { AppConfig } from '@/utils/config'
import { cache } from 'react'
import SugguestPopular from './sugguest/sugguest-popular'
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
});

const Home = async () => {
  const [auctionPoulars] = await Promise.all([loadSugguest(1)]);

  return (
    <>
      <SugguestPopular items={auctionPoulars} />
      {/* <section>
        <div className="bg-white py-2">
          <h2 className="px-2 text-lg font-semibold">Đề xuất cho bạn</h2>
          <Auctions items={[]} />
        </div>
      </section> */}
      <TopCategories />
      <TopSearch />
      <TopBrand />
      <TopShop />
    </>
  )
}
export default Home
