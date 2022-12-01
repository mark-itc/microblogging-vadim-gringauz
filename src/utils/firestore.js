import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'

const firebaseConfig = {
  projectId: 'itc-microblogging-85128'
  // apiKey: API_KEY,
  // authDomain: 'itc-microblogging-85128.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  // databaseURL:
  //   'https://firestore.googleapis.com/v1/projects/itc-microblogging-85128/databases/(default)/documents/tweets/',
  // storageBucket: 'itc-microblogging-85128.appspot.com'
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // measurementId: "G-MEASUREMENT_ID",
}

initializeApp(firebaseConfig)
const db = getFirestore()
export const collectionRef = collection(db, 'tweets')
