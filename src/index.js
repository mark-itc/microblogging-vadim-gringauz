import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TweetsContextProvider } from './contexts/TweetsContext'
import { AuthContextProvider } from './contexts/AuthContext'
import VersionInfo from './components/VersionInfo'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <TweetsContextProvider>
      <React.StrictMode>
        <VersionInfo />
        <div className='main-container'>
          <App />
        </div>
      </React.StrictMode>
    </TweetsContextProvider>
  </AuthContextProvider>
)
