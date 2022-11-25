import { useContext } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import { AuthContext } from './contexts/AuthContext'
import ProfilePage from './views/ProfilePage'
import HomePage from './views/HomePage'
import SettingsPage from './views/SettingsPage'
import ErrorPage from './views/ErrorPage'
// import Navbar from './components/Navbar'


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
      element: <SettingsPage />
    }
  ])

  return (
    <div className='App'>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
