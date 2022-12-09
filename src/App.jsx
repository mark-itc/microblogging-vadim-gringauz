import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './views/ProfilePage'
import SettingsPage from './views/SettingsPage'
import HomePage from './views/HomePage'
import SignInPage from './views/SignInPage'
import SignUpPage from './views/SignUpPage'
import ErrorPage from './views/ErrorPage'
import PrivateRoute from './utils/PrivateRoute'
import './App.css'

function App () {
  const router = createBrowserRouter([
    {
      // path: '/',
      element: <PrivateRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          errorElement: <ErrorPage />
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
      {/* <PrivateRoute>
      </PrivateRoute> */}
    </div>
  )
}

export default App
