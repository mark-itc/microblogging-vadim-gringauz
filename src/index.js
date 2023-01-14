import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import GlobalStyle from './styled-components/GlobalStyle'
import VersionInfo from './components/VersionInfo'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    {/* <React.StrictMode> */}
      <GlobalStyle />
      <VersionInfo />
      <App />
    {/* </React.StrictMode> */}
  </AuthContextProvider>
)
