import { IState } from 'core/interfaces'
import { IResponse } from 'core/interfaces'

export const services = {
  categoriesFilter(
    name: string,
    state: IState,
    data: IResponse,
    callback: Function,
  ) {
    if (
      name.toLocaleLowerCase().trim() === 'all' ||
      name.toLocaleLowerCase().trim() === 'reset'
    ) {
      state.currentCards = Object.values(data)

      state.isPopular = false
      callback(state.currentCards)
      localStorage.setItem('state', JSON.stringify(state))
    } else {
      if (state.isPopular) {
        state.currentCards = Object.values(data)
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === name && card.rating.rate >= 4,
        )
        callback(state.currentCards)
        localStorage.setItem('state', JSON.stringify(state))
      } else {
        state.currentCards = Object.values(data)
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === name,
        )
        callback(state.currentCards)
        localStorage.setItem('state', JSON.stringify(state))
      }
    }
  },
  popularFilter(
    value: boolean,
    state: IState,
    filteredCards: Array<IResponse>,
    data: IResponse,
    activeBtn: Function,
    callback: Function,
  ) {
    state.isPopular = !state.isPopular
    if (value === true) {
      state.currentCards = [...filteredCards].filter(
        (card) => card.rating.rate >= 4,
      )
      callback(state.currentCards)
      localStorage.setItem('state', JSON.stringify(state))
    } else {
      this.identifyActiveCategory(state, data, callback)
      callback(state.currentCards)
      localStorage.setItem('state', JSON.stringify(state))
    }
  },

  identifyActiveCategory(state: IState, data: IResponse, callback?: Function) {
    state.currentCards = Object.values(data)
    switch (state.activeBtn) {
      case 0:
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === "men's clothing",
        )
        callback?.(state.currentCards)
        break
      case 1:
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === 'jewelery',
        )
        callback?.(state.currentCards)
        break
      case 2:
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === 'electronics',
        )
        callback?.(state.currentCards)
        break
      case 3:
        state.currentCards = [...state.currentCards].filter(
          (card) => card.category === "women's clothing",
        )
        callback?.(state.currentCards)
        break
      case 4:
        callback?.(state.currentCards)
        break
    }
  },
  identifyWhichOfSort(
    value: string,
    state: IState,
    setValue: Function,
    handleSortPriceUp: Function,
    handleSortPriceDown: Function,
    handleSortAZ: Function,
    handleSortZA: Function,
  ) {
    switch (value) {
      case '0':
        state.sortValue = '0'
        localStorage.setItem('state', JSON.stringify(state))
        setValue(state.sortValue)
        break
      case '1':
        state.sortValue = '1'
        handleSortPriceUp()
        localStorage.setItem('state', JSON.stringify(state))
        setValue(state.sortValue)
        break

      case '2':
        state.sortValue = '2'
        handleSortPriceDown()
        localStorage.setItem('state', JSON.stringify(state))
        setValue(state.sortValue)
        break
      case '3':
        state.sortValue = '3'
        handleSortAZ()
        localStorage.setItem('state', JSON.stringify(state))
        setValue(state.sortValue)
        break
      case '4':
        state.sortValue = '4'
        handleSortZA()
        localStorage.setItem('state', JSON.stringify(state))
        setValue(state.sortValue)
        break
    }
  },
}
