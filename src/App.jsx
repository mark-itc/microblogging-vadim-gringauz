import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ProfilePage from './views/ProfilePage'
import HomePage from './views/HomePage'
import ErrorPage from './views/ErrorPage'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
