import React from 'react'
import classes from './logo.module.scss'

export const Logo: React.FC = () => {
  return (
    <div className={classes.logoTitle}>
      <img
        className={classes.logo}
        src={process.env.PUBLIC_URL + 'img/logo-header.png'}
        alt="logo"
      />
      <h1>Online Store</h1>
    </div>
  )
}
