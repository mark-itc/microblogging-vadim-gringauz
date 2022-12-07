import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './views/ProfilePage'
import SettingsPage from './views/SettingsPage'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import ErrorPage from './views/ErrorPage'
import Temp from './views/Temp'
import './App.css'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/home',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/temp',
      element: <Temp />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/settings',
      element: <SettingsPage />
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
