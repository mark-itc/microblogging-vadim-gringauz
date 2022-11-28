import { useContext } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import ProfilePage from './views/ProfilePage'
import SettingsPage from './views/SettingsPage'
import HomePage from './views/HomePage'
import ErrorPage from './views/ErrorPage'
import './App.css'



function App () {
  const { userName } = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
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
