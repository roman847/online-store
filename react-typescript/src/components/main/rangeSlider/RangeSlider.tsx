import { IResponse, IState } from 'core/interfaces'
import React from 'react'
// import Nouislider from 'nouislider-react'
import ReactSlider from 'react-slider'
import '../../../../node_modules/react-slider/dist/cjs'
import classes from './rangSlider.module.scss'

export const RangeSlider = ({
  intervalValues,
  step,
  handle,
  state,
  minMax,
  isFlag,
}: {
  intervalValues: Array<number>
  step: number
  handle: Function
  state: IState
  minMax: Array<number>
  isFlag: string
}) => {
  const [min, setMin] = React.useState(intervalValues[0])
  const [max, setMax] = React.useState(intervalValues[1])

  return (
    <div className={classes.container__slider}>
      <span>{min}</span>
      <ReactSlider
        defaultValue={[intervalValues[0], intervalValues[1]]}
        className={classes.slider}
        trackClassName={classes.tracker}
        min={minMax[0]}
        max={minMax[1]}
        minDistance={step}
        step={step}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => {
          return <div {...props} className={classes.thumb}></div>
        }}
        renderTrack={(props) => {
          return <div {...props} className={classes.track}></div>
        }}
        onChange={([min, max]) => {
          setMin(min)
          setMax(max)
          if (isFlag === 'price') {
            state.priceIntervalValue[0] = min
            state.priceIntervalValue[1] = max
          } else if (isFlag === 'rate') {
            state.rateIntervalValue[0] = min
            state.rateIntervalValue[1] = max
          }

          handle()
          localStorage.setItem('state', JSON.stringify(state))
        }}
      />
      <span>{max}</span>
    </div>
  )
}
