import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

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

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6Lfv03kjAAAAAJ3UeGywNG2S0DlY6JfHAQwhwN_P')
})

const storage = getStorage(firebaseApp)

export default firebaseApp
export { appCheck, storage }
