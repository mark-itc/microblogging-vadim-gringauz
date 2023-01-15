import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font'
import SettingsPage from './views/SettingsPage'
import PrivateRoute from './utils/PrivateRoute'
import ProfilePage from './views/ProfilePage'
import SignInPage from './views/SignInPage'
import SignUpPage from './views/SignUpPage'
import TweetPage from './views/TweetPage'
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
          element: <HomePage />
        },
        {
          path: '/home',
          element: <HomePage />
        },
        // {
        //   path: '/profile',
        //   element: <ProfilePage />
        // },
        {
          path: '/profile/:uid',
          element: <ProfilePage />
        },
        {
          path: '/tweet/:id',
          element: <TweetPage />
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
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
      <GoogleFontLoader
        fonts={[
          {
            font: 'Montserrat',
            weights: [400, '400i', 500, 600, 700, 800]
          }
        ]}
      />
    </div>
  )
}

export default App
