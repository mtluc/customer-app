/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Seller from '@/components/seller/seller'
import { Button } from '@/components/ui/button'
import { IAuctionDetail } from '@/store/slices/auction/auction-detail.Slice'
import { ISeller } from '@/store/slices/seller/seller.Slice'
import { formatDateTime, formatNumber } from '@/utils/utils'
import {
  LucideChevronsDown,
  LucideChevronsUp,
  LucideHeart,
  LucideLanguages,
  LucideTruck
} from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import AuctionImageBox from './image-box'

const AuctionDetail = ({ item }: { item: IAuctionDetail }) => {
  const seller = {
    sellerCode: item.sellerCode,
    sellerName: item.sellerName,
    sellerIcon: item.sellerIcon,
    totalReviewOverall: item.sellerReview,
    goodRatingOverall: item.sellerRating
  } as ISeller
  return (
    <>
      <AuctionImageBox images={item.images} />
      <div className="flex bg-primary p-2 text-primary-foreground">
        <div>
          <div>Giá hiện tại</div>
          <div className="text-2xl font-semibold">¥ 681,000</div>
        </div>
        <div className="flex-1"></div>
        <div className="text-right">
          <div>Kết thúc trong</div>
          <div>01 ngày 22:16:40</div>
          <div>314 Lượt đấu</div>
        </div>
      </div>
      <div className="bg-background p-2">
        <div className="flex items-start">
          <h1 className="flex-1 pr-4 font-semibold">{item.name}</h1>
          <Button className="h-auto p-0" variant="ghost">
            <LucideHeart className="!size-8 stroke-1" />
          </Button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div>Giá mua ngay:</div>
            <div className="text-2xl font-semibold">¥ 1,681,000</div>
          </div>
          <div>
            <Button variant="outline" className="border-primary text-primary">
              MUA NGAY
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center rounded-md bg-orange-100 p-2">
          <LucideTruck className="stroke-1" />
          <div className="ml-2">
            <div>Phí vận chuyển nội địa</div>
            <div className="font-semibold">Không</div>
          </div>
        </div>
      </div>
      <div className="my-4 bg-background py-2">
        <div className="p-2 text-lg font-semibold">Thông tin sản phẩm</div>
        <div className="grid grid-cols-2 divide-y leading-7 [&>*]:px-2 [&>*]:py-1 [&>div>*:first-child]:text-sm [&>div>*:first-child]:text-gray-500">
          <div>
            <div>Trạng thái</div>
            <div>{item.situation}</div>
          </div>
          <div className="!border-t-0">
            <div>Số lượng</div>
            <div>{formatNumber(item.quantity, 0)}</div>
          </div>
          <div>
            <div>Thời gian bắt đầu</div>
            <div>{formatDateTime(item.startDate, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div>
            <div>Thời gian kết thúc</div>
            <div>{formatDateTime(item.endDate, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div>
            <div>Mở rộng thời gian thầu</div>
            <div>{item.automaticExtension ? 'Có' : 'Không'}</div>
          </div>
          <div>
            <div>Hoàn trả</div>
            <div>{item.returns ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Hạn chế thẩm định</div>
            <div>{item.bidderAppraisalRestriction ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Giới hạn xác thực</div>
            <div>{item.bidderVerificationLimit ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Giá khởi điểm</div>
            <div>¥ {formatNumber(item.startingPrice, 0)}</div>
          </div>

          <div>
            <div>Giá hiện tại</div>
            <div>¥ {formatNumber(item.price, 0)}</div>
          </div>
        </div>
      </div>

      <div className="my-4 bg-background py-4">
        <Seller seller={seller} viewShop />
      </div>

      <div className="my-4 bg-background p-2">
        <AuctionDescription description={item.description} code={item.code} />
      </div>
    </>
  )
}

export default AuctionDetail

const AuctionDescription = memo(
  ({ description, code }: { description: string; code: string }) => {
    const [showMore, setShowMore] = useState(false)

    const showTraslate = () => {
      let width = window.innerWidth - 32
      // eslint-disable-next-line prefer-const
      let height = window.innerHeight - 32
      if (width > 1024) {
        width = 1024
      }
      window.open(
        `/dich/aution/${code}`,
        '_blank',
        `location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
      )
    }

    const [originalContent, setOriginalContent] = useState('')
    const [translatedContent, setTranslatedContent] = useState('')
    const [isTranslated, setIsTranslated] = useState(false)

    useEffect(() => {
      // Kiểm tra nếu Google Translate chưa được nhúng
      if (!(window as any).googleTranslateElementInit) {
        const script = document.createElement('script')
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=vi'
        script.async = true
        document.body.appendChild(script)
        ;(window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'ja',
              includedLanguages: 'vi', // Hỗ trợ dịch sang Tiếng Việt, Pháp, Nhật
              layout: (window as any).google.translate.TranslateElement
                .InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element'
          )

          // Chờ 2s rồi tự động kích hoạt dịch sang Tiếng Việt
          setTimeout(() => {
            translateToVietnamese()
          }, 2000)
        }
      }
    }, [])

    // Hàm tự động dịch sang Tiếng Việt
    const translateToVietnamese = () => {
      debugger
      const frame: any = document.querySelector('iframe.goog-te-banner-frame')
      const select: any = document.querySelector('.goog-te-combo')

      if (select) {
        select.value = 'vi' // Chọn Tiếng Việt
        select.dispatchEvent(new Event('change')) // Kích hoạt dịch
      }

      // Ẩn banner Google Translate nếu có
      if (frame) {
        frame.style.display = 'none'
      }
    }

    const translateDiv = () => {
      const content = document.getElementById('translate-content')?.innerHTML
      if (!originalContent) {
        setOriginalContent(content || '') // Lưu nội dung gốc
      }

      // Tạo một div tạm thời để dịch nội dung
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = content || ''
      tempDiv.id = 'temp-translate'
      document.body.appendChild(tempDiv)

      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'ja',
          includedLanguages: 'vi',
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE
        },
        'temp-translate'
      )

      setTimeout(() => {
        setTranslatedContent(
          document.getElementById('temp-translate')?.innerHTML || ''
        )
        setIsTranslated(true)
        document.getElementById('temp-translate')?.remove()
      }, 2000)
    }

    const restoreOriginal = () => {
      setTranslatedContent(originalContent)
      setIsTranslated(false)
    }
    return (
      <div>
        <div className="flex p-2 text-lg font-semibold">
          <div className="flex-1">Mô tả</div>
          <Button
            className="text-primary"
            variant="secondary"
            onClick={translateDiv}
          >
            Dịch
            <LucideLanguages />
          </Button>
        </div>
        <div id="google_translate_element"></div>
        <div
          id="translate-content"
          className={
            'relative w-full overflow-x-auto overflow-y-hidden' +
            (showMore ? ' max-h-max' : ' max-h-80')
          }
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <div className="relative right-0 text-center">
          {!showMore && (
            <div className="absolute bottom-full left-0 h-40 w-full bg-gradient-to-t from-background to-transparent"></div>
          )}
          <Button
            className="m-0"
            variant="link"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                Thu gọn <LucideChevronsUp />
              </>
            ) : (
              <>
                Xem thêm <LucideChevronsDown />
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }
)

AuctionDescription.displayName = 'AuctionDescription'
