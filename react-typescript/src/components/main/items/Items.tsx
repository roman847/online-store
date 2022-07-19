import React from 'react'
import { IResponse, IState } from 'core/interfaces'
import classes from './items.module.scss'
import { Button } from '../button/Button'

export const Item = ({
  item,
  index,
  state,
  setCount,
  basketCount,
}: {
  item: IResponse
  index: number
  state: IState
  setCount: Function
  basketCount: number
}) => {
  const [isClick, setClick] = React.useState(true)
  const handleButtonAddInBasket = () => {
    setClick(!isClick)
    isClick ? setCount(basketCount + 1) : setCount(basketCount - 1)
  }
  return (
    <div className={classes.containerItems__item}>
      <div className={classes.item__title}>
        <h3>{item.title}</h3>
      </div>
      <figure className={'figure'}>
        <img
          src={item.image}
          className="figure-img img-fluid rounded"
          alt="good"
        />
        <figcaption className="figure-caption">
          Category: {item.category}
        </figcaption>
        <figcaption className="figure-caption">
          Rate: {item.rating.rate}
        </figcaption>
        <figcaption className="figure-caption">Price: {item.price}</figcaption>
      </figure>
      <div className={classes.container__btn}>
        <Button
          state={state}
          text={'Add'}
          index={index}
          handle={handleButtonAddInBasket}
        />
      </div>
    </div>
  )
}
