import { IState } from 'core/interfaces'
import React from 'react'
import classes from '../button/button.module.scss'

export const Button = ({
  text,
  index,
  handle,
  activeBtn,
  state,
}: {
  text: string
  handle: Function
  index: number
  activeBtn?: number | boolean
  state: IState
}) => {
  let [activeAddBtn, setActiveAddBtn] = React.useState(false)

  return (
    <div>
      <button
        onClick={() => {
          if (text.toLowerCase().trim() === 'add') {
            setActiveAddBtn(!activeAddBtn)
          }
          handle(text, index)
        }}
        className={`btn btn-warning  ${
          activeBtn === index || activeAddBtn === true
            ? 'activeBtn'
            : classes.btnBlock__btn
        }`}
      >
        {text}
      </button>
    </div>
  )
}
