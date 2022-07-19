import React from 'react'
import ReactDOM from 'react-dom/client'
import { IResponse } from 'core/interfaces'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

fetch(process.env.REACT_APP_UNSPLASH_KEY as string)
  .then((res: Response) => res.json())
  .then((response: IResponse) => {
    root.render(
      <React.StrictMode>
        <App response={response} />
      </React.StrictMode>,
    )
  })
