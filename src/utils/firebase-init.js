import { initializeApp } from 'firebase/app'
import { API_KEY } from './globals'

const firebaseConfig = {
  apiKey: 'AIzaSyCalxdge7pIu6j7J0kCdmyZY17sMXzvoXs',
  authDomain: 'itc-microblogging-85128.firebaseapp.com',
  projectId: 'itc-microblogging-85128',
  storageBucket: 'itc-microblogging-85128.appspot.com',
  messagingSenderId: '682850978027',
  appId: '1:682850978027:web:b1ac58fcd6ff75ab5696ae',
  measurementId: 'G-Q0RQW8Z9T9'
}

const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
