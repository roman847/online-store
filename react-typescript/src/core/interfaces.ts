export interface IResponse {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
}

export interface IState {
  currentCards: Array<IResponse>
  isPopular: boolean
  isHiddenSortPopup: boolean
  activeBtn: number
  sortValue: string
  selectValues: Array<string>
  priceIntervalValue: Array<number>
  rateIntervalValue: Array<number>
  basketCount: number
  activeCardsAdd: Array<number>
}
