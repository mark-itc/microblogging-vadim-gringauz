import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './views/ProfilePage'
import SettingsPage from './views/SettingsPage'
import HomePage from './views/HomePage'
import ErrorPage from './views/ErrorPage'
import './App.css'
import { API_KEY } from './globals'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'itc-microblogging-85128.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    'https://firestore.googleapis.com/v1/projects/itc-microblogging-85128/databases/(default)/documents/tweets/',
  projectId: 'itc-microblogging-85128',
  storageBucket: 'itc-microblogging-85128.appspot.com'
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // measurementId: "G-MEASUREMENT_ID",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'tweets')

async function getData () {
  const querySnapshot = await getDocs(collection(db, 'tweets'))
  querySnapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data())
  })
}

function App () {
  getData()

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
