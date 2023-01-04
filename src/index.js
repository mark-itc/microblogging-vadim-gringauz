import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import MainContainer from './styled-components/MainContainer'
import GlobalStyle from './styled-components/GlobalStyle'
import VersionInfo from './components/VersionInfo'
import CssBaseline from '@mui/material/CssBaseline';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      {/* <CssBaseline /> */}
      <GlobalStyle />
      <VersionInfo />
      <MainContainer>
        <App />
      </MainContainer>
    </React.StrictMode>
  </AuthContextProvider>
)
