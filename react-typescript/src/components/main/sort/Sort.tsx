import React from 'react'
import classes from './sort.module.scss'

export const Sort = ({
  handlerSort,
  sortValue,
  selectValues,
}: {
  handlerSort: Function
  sortValue: string
  selectValues: Array<string>
}) => {
  const sortRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <div ref={sortRef} className={classes.popup}>
      <select
        onInput={(e) => {
          handlerSort(e)
        }}
        className="form-select"
        aria-label="Default select example"
        value={sortValue}
      >
        {selectValues.map((item, index) => {
          return (
            <option value={index} key={`${index + item}`}>
              {item}{' '}
            </option>
          )
        })}
      </select>
    </div>
  )
}
