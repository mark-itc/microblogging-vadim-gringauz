import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'
import { addDoc, Timestamp, deleteDoc } from 'firebase/firestore'

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
const collectionRef = collection(db, 'tweets')

async function getAllTweets () {
  console.log(' getting tweets collection from firestore...')
  const tweetsSnapshot = await getDocs(collectionRef)
  const { docs } = tweetsSnapshot
  const fetchedTweets = docs.map(doc => doc.data())
  return fetchedTweets
}

async function postNewTweet (tweet) {
  console.log('posting to tweet document to tweets collection...')
  const docRef = await addDoc(collectionRef, tweet)
  // console.log('docRef=', docRef)
}

async function deleteAllTweets () {
  console.log('Deleting all tweets for collection...')
  const { docs } = await getDocs(collectionRef)
  docs.map(async document => {
    await deleteDoc(doc(collectionRef, document.id))
  })
}

async function editTweet(id, newContect) {
  console.log('Editing tweet...')
}

async function deleteTweet(id) {
  console.log('Deleting tweet...')
}
export { getAllTweets, postNewTweet, deleteAllTweets, editTweet, deleteTweet }
