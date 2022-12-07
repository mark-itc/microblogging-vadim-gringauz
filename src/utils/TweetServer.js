import firebaseApp from './firebase-init'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'
import { addDoc, deleteDoc } from 'firebase/firestore'

class TweetServer {
  constructor () {
    const db = getFirestore(firebaseApp)
    this.tweetsCollection = collection(db, 'tweets')
  }

  async getAll () {
    console.log(' getting tweets collection from firestore...')
    const tweetsSnapshot = await getDocs(this.tweetsCollection)
    const { docs } = tweetsSnapshot
    const fetchedTweets = docs.map(doc => doc.data())
    return fetchedTweets
  }

  async postNew (tweet) {
    console.log('posting to tweet document to tweets collection...')
    const docRef = await addDoc(this.tweetsCollection, tweet)
    // console.log('docRef=', docRef)
    return docRef
  }

  async deleteAll () {
    try {
        console.log('Deleting all tweets for collection...')
        const { docs } = await getDocs(this.tweetsCollection)
        docs.map(async document => {
          await deleteDoc(doc(this.tweetsCollection, document.id))
        })
        return null
    } catch (error) {
        return error.message
    }
  }

  async edit (id, newContect) {
    console.log('Editing tweet...')
  }

  async delete (id) {
    console.log('Deleting tweet...')
  }
}

const tweetServer = new TweetServer()
export default tweetServer
