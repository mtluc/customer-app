import { AppConfig } from '@/utils/config'
import Auctions from '../auction/auctions'
import TopBrand from './top-brand'
import TopCategories from './top-categories'
import TopSearch from './top-search'
import TopShop from './top-shop'


async function LoadData() {
  return await fetch(`${AppConfig.JBB_API}/auction/searchByCategory?category=23140&pageSize=12&pageNo=1`).then(res => res.json());
}

const Home = () => {
  return (
    <>
      <section>
        <div className="bg-white py-2">
          <h2 className="text-lg font-semibold px-2">Đề xuất cho bạn</h2>
          <Auctions items={[]} />
        </div>
      </section>
      <TopCategories />
      <TopSearch />
      <TopBrand />
      <TopShop />
    </>
  )
}
export default Home
