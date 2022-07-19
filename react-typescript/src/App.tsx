import React from 'react'
import Header from './components/header/Header'
import { Main } from 'components/main/Main'
import { IResponse } from 'core/interfaces'
import '../node_modules/normalize.css/normalize.css'
import './global.scss'
// import './App.css'

const App = ({ response }: { response: IResponse }) => {
  const data = response
  const resp: Array<IResponse> = Object.values(data)
  let uniqCategories: Array<string> = []

  function searchUniqCategories() {
    let allCategories: Array<string> = []
    resp.forEach((item) => {
      allCategories.push(item.category)
    })
    uniqCategories = [...new Set(allCategories)]
  }

  searchUniqCategories()
  return (
    <div className="App">
      <div className="container">
        <Main data={data} uniqCategories={uniqCategories} />
      </div>
    </div>
  )
}

export default App
