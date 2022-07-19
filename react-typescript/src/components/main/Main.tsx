import React, { useState } from 'react'
import { Item } from './items/Items'
import { Sort } from './sort/Sort'
import { RangeSlider } from './rangeSlider/RangeSlider'

import { IResponse } from 'core/interfaces'
import { IState } from 'core/interfaces'
import classes from './main.module.scss'
import { Button } from './button/Button'
import Header from 'components/header/Header'
import { services } from '../../services/services'

let state: IState = {
  currentCards: [],
  isPopular: false,
  isHiddenSortPopup: false,
  activeBtn: 4,
  sortValue: '0',
  selectValues: ['Sort', 'PriceUp', 'PriceDown', 'A-Z', 'Z-A'],
  priceIntervalValue: [0, 1000],
  rateIntervalValue: [0, 5],
  basketCount: 0,
  activeCardsAdd: [0],
}

export const Main = ({
  data,
  uniqCategories,
}: {
  data: IResponse
  uniqCategories: Array<string>
}) => {
  if (JSON.parse(localStorage.getItem('state') as string)) {
    state = JSON.parse(localStorage.getItem('state') as string)
  } else {
    state.currentCards = Object.values(data)
  }

  const [filteredCards, setFiltered] = React.useState(state.currentCards)
  const [activeBtn, setActiveBtn] = React.useState(state.activeBtn)
  const [selectValue, setValue] = React.useState(state.sortValue)
  const [basketCount, setCount] = React.useState(state.basketCount)

  state.activeBtn = activeBtn
  localStorage.setItem('state', JSON.stringify(state))

  const handleButton = (name: string, index: number) => {
    setActiveBtn(index)
    services.categoriesFilter(name, state, data, setFiltered)
    localStorage.setItem('state', JSON.stringify(state))

    services.identifyWhichOfSort(
      state.sortValue,
      state,
      setValue,
      handleSortPriceUp,
      handleSortPriceDown,
      handleSortAZ,
      handleSortZA,
    )
  }

  const handleSortPriceUp = () => {
    state.currentCards.sort((a, b) => {
      return a.price - b.price
    })
    setFiltered(state.currentCards)
    localStorage.setItem('state', JSON.stringify(state))
  }
  const handleSortPriceDown = () => {
    state.currentCards.sort((a, b) => {
      return a.price - b.price
    })
    setFiltered(state.currentCards.reverse())
    localStorage.setItem('state', JSON.stringify(state))
  }

  const handleSortAZ = () => {
    state.currentCards.sort((a, b) => {
      if (a.title[0] < b.title[0]) return -1
      if (a.title[0] > b.title[0]) return 1
      return 0
    })
    setFiltered(state.currentCards)
    localStorage.setItem('state', JSON.stringify(state))
  }
  const handleSortZA = () => {
    state.currentCards.sort((a, b) => {
      if (a.title[0] < b.title[0]) return -1
      if (a.title[0] > b.title[0]) return 1
      return 0
    })
    setFiltered(state.currentCards.reverse())
    localStorage.setItem('state', JSON.stringify(state))
  }

  function sortCards(e: InputEvent) {
    services.identifyWhichOfSort(
      (e.target as HTMLInputElement).value,
      state,
      setValue,
      handleSortPriceUp,
      handleSortPriceDown,
      handleSortAZ,
      handleSortZA,
    )
    setFiltered(state.currentCards)
    localStorage.setItem('state', JSON.stringify(state))
  }

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (!(e.target as HTMLInputElement).value) {
      state.currentCards = Object.values(data)
      services.identifyActiveCategory(state, data, setFiltered)
    } else {
      let cards: Array<IResponse> = state.currentCards.filter(
        (card) =>
          card.title
            .toLowerCase()
            .trim()
            .search(
              (e.target as HTMLInputElement).value.toLowerCase().trim(),
            ) !== -1,
      )

      state.currentCards = cards
      setFiltered(state.currentCards)
    }
    localStorage.setItem('state', JSON.stringify(state))
  }

  const handleRagePrice = () => {
    state.currentCards = Object.values(data)
    state.currentCards = state.currentCards.filter(
      (card) =>
        card.price >= state.priceIntervalValue[0] &&
        card.price <= state.priceIntervalValue[1],
    )
    setFiltered(state.currentCards)
    localStorage.setItem('state', JSON.stringify(state))
  }

  const handleRageRate = () => {
    state.currentCards = Object.values(data)
    state.currentCards = state.currentCards.filter((card) => {
      return (
        card.rating.rate >= state.rateIntervalValue[0] &&
        card.rating.rate <= state.rateIntervalValue[1]
      )
    })
    setFiltered(state.currentCards)
    localStorage.setItem('state', JSON.stringify(state))
  }

  const handleButtonResetStorage = () => {
    localStorage.removeItem('state')
  }

  return (
    <div>
      <Header count={basketCount} />
      <div className={classes.main__filters}>
        <div className={classes.filters__filter}>
          <div className={classes.filter__btnBlock}>
            <Button
              text="All"
              index={uniqCategories.length}
              handle={handleButton}
              activeBtn={activeBtn}
              state={state}
            />
            {uniqCategories.map((item, index) => {
              return (
                <Button
                  text={item}
                  index={index}
                  handle={handleButton}
                  activeBtn={activeBtn}
                  key={`${index}` + item}
                  state={state}
                />
              )
            })}
          </div>
          <label
            id="label-popular"
            className="form-check-label"
            htmlFor="popular"
          >
            Only popular
          </label>
          <input
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              services.popularFilter(
                (event.target as HTMLInputElement).checked,
                state,
                filteredCards,
                data,
                setActiveBtn,
                setFiltered,
              )
            }
            id="popular"
            className="form-check-input "
            type="checkbox"
            defaultChecked={state.isPopular}
          />
          <div className={classes.container__reset}>
            <Button
              text="Reset"
              index={uniqCategories.length}
              handle={handleButton}
              state={state}
            />
            <Button
              text="ResetStorage"
              index={uniqCategories.length}
              handle={handleButtonResetStorage}
              state={state}
            />
          </div>
        </div>
        <div className={classes.filters__filter}>
          <label id="label-search" htmlFor="search">
            {' '}
            <input
              className={`form-control ${classes.search__input}`}
              id="search"
              onInput={handleSearch}
              type="text"
              placeholder="Search..."
              autoFocus
            />
          </label>
          <Sort
            handlerSort={sortCards}
            sortValue={state.sortValue}
            selectValues={state.selectValues}
          />
          <h3>Price interval</h3>
          <RangeSlider
            intervalValues={state.priceIntervalValue}
            step={50}
            handle={handleRagePrice}
            state={state}
            minMax={[0, 1000]}
            isFlag={'price'}
          />
          <h3>Rate interval</h3>
          <RangeSlider
            intervalValues={state.rateIntervalValue}
            step={0.5}
            handle={handleRageRate}
            state={state}
            minMax={[0, 5]}
            isFlag={'rate'}
          />
        </div>
      </div>
      <div className={classes.containerItems}>
        {state.currentCards.map((item: IResponse, index: number) => {
          return (
            <Item
              item={item}
              key={index + item.title}
              index={index}
              state={state}
              setCount={setCount}
              basketCount={basketCount}
            />
          )
        })}
      </div>
    </div>
  )
}
