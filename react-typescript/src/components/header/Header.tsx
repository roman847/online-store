import React from 'react'
import { Basket } from './basket/Basket'
import { Logo } from './logo/Logo'

import classes from './header.module.scss'

const Header = ({ count }: { count: number }) => {
  return (
    <header>
      <div className={classes.header__container}>
        <Logo />
        <Basket count={count} />
      </div>
    </header>
  )
}

export default Header
