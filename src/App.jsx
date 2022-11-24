import { useContext } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import { AuthContext } from './contexts/AuthContext'
import ProfilePage from './views/ProfilePage'
import HomePage from './views/HomePage'
import Settings from './views/Settings'
import ErrorPage from './views/ErrorPage'

function App () {
  const { userName } = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: userName === '' ? <ProfilePage /> : <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/settings',
      element: <Settings />
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
