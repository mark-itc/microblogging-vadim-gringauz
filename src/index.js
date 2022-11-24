import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TweetsContextProvider } from './contexts/TweetsContext'
import { AuthContextProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <TweetsContextProvider>
      <React.StrictMode>
        <div className='main-container'>
        <h5 className='current-ver'>
          VG / ITC / React - Microblogging / Milestone-4 v1.0
        </h5>
          <App />
        </div>
      </React.StrictMode>
    </TweetsContextProvider>
  </AuthContextProvider>
)
