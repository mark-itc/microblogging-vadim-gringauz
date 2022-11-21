import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TweetsContext, TweetsContextProvider } from './contexts/TweetsContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <TweetsContextProvider>
    <React.StrictMode>
      <div className='main-container'>
        <App />
      </div>
    </React.StrictMode>
  </TweetsContextProvider>
)
