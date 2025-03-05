import Auctions from '../auction/auctions'
import TopBrand from './top-brand'
import TopCategories from './top-categories'
import TopSearch from './top-search'
import TopShop from './top-shop'

const Home = async () => {
  const res = await (await fetch(`${process.env.JBB_API}/auction/searchByCategory?category=23140&pageSize=12&pageNo=1`)).json();
  return (
    <>
      <section>
        <div className="bg-white py-2">
          <h2 className="text-lg font-semibold px-2">Đề xuất cho bạn</h2>
          <Auctions items={res.items} />
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
