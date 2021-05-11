import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const title = 'React with Webpack and Babel'

ReactDOM.render(
  <React.StrictMode>
    <App title={ title }/>
  </React.StrictMode>,
  document.getElementById('root')
)

module.hot.accept()

