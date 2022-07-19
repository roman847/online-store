import React from 'react'
import classes from './basket.module.scss'

export const Basket = ({ count }: { count: number }) => {
  return (
    <div className={classes.header__shopping}>
      <img
        className={classes.shopping__basket}
        src={process.env.PUBLIC_URL + 'img/basket.svg'}
        alt="basket"
      />
      <span>{count}</span>
    </div>
  )
}
