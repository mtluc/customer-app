import { Auction } from "./auctions.Slice";

export enum enumBidStatus {
    /**
     * 
     */
    none = 0,

    /**
     * Giá đấu cao nhất
     */
    HighestBid = 1,

    /**
     * Đã vượt quá
     */
    Exceeded = 2

}
export interface IAuctionDetail {
    automaticExtension: boolean,
    /**
     * Lượt đấu giá
     */
    bidNumb: number,

    /**
     * Trạng thái đấu giá
     * 
     */
    bidStatus: enumBidStatus,

    /**
     * Hạn chế thẩm định
     */
    bidderAppraisalRestriction: boolean,

    /**
     * Giới hạn xác thực
     */
    bidderVerificationLimit: boolean,

    /**
     * Giá mua ngay
     */
    buyNowPrice: number,

    /**
     * Danh sách danh mục
     */
    categories: { code: string, label: string }[],

    /**
     * Mã danh mục
     */
    categoryId: string,

    /**
     * Đường dẫn danh mục
     */
    categoryPath: string[],

    /**
     * Mã sản phẩm
     */
    code: string,

    /**
     * Mô tả sản phẩm
     * (html)
     */
    description: string,

    /**
     * Kết thúc sớm
     */
    earlyTermination: boolean,

    /**
     * Ngày kết thúc
     */
    endDate: Date,

    /**
     * Có người chiến thắng
     */
    hasWinner: boolean,

    /**
     * Danh sách ảnh
     */
    images: string[],

    /**
     * Đã kết thúc
     */
    isEndAuction: boolean,

    /**
     * Là cửa hàng
     */
    isStore: boolean,


    /**
     * Chiến thắng
     */
    isWinner: boolean,

    /**
     * Tên sản phẩm
     */
    name: string,

    /**
     * Giá đấu
     */
    price: number,

    /**
     * Số lượng
     */
    quantity: number,

    /**
     * Danh sách sản phẩm liên quan
     */
    relates: Auction[],

    /**
     * Trả lại
     */
    returns: boolean,

    /**
     * Mã người bán
     */
    sellerCode: string,

    /**
     * Icon người bán
     */
    sellerIcon: string,

    /**
     * Tên người bán
     */
    sellerName: string,

    /**
     * Tỷ lệ dánh giá người bán
     */
    sellerRating: number,

    /**
     * Số lượng đánh giá người bán
     */
    sellerReview: number,

    /**
     * Bước tăng giá
     */
    setPrice: number,

    /**
     * Phí vận chuyển nội địa
     */
    shippingFee: number,

    /**
     * Hình thức
     */
    situation: string,

    /**
     * Thời gian bắt đầu
     */
    startDate: Date,

    /**
     * Giá khởi điểm
     */
    startingPrice: number,

    /**
     * Danh sách sản phẩm gợi ý
     */
    suggests: Auction[],

    /**
     * Thuế
     */
    tax: number,
}