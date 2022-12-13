import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SettingsPage from './views/SettingsPage'
import PrivateRoute from './utils/PrivateRoute'
import ProfilePage from './views/ProfilePage'
import SignInPage from './views/SignInPage'
import SignUpPage from './views/SignUpPage'
import ErrorPage from './views/ErrorPage'
import HomePage from './views/HomePage'
import './App.css'

function App () {
  const router = createBrowserRouter([
    {
      element: <PrivateRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/home',
          element: <HomePage />
        },
        {
          path: '/profile',
          element: <ProfilePage />
        },
        {
          path: '/settings',
          element: <SettingsPage />
        }
      ]
    },
    {
      path: '/sign-in',
      element: <SignInPage />
    },
    {
      path: '/sign-up',
      element: <SignUpPage />
    },
  ])

  return (
    <div className='App'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
