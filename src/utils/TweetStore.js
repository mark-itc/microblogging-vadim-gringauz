import firebaseApp from './firebase-init'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit
} from 'firebase/firestore'

class TweetStore {
  constructor () {
    const db = getFirestore(firebaseApp)
    this.tweetsCollection = collection(db, 'tweets')
    this.startingLimit = 10
  }

  async getTweetsRealTime (setTweets, currentLimit) {
    console.log(' starting real time tweets subscription ...')
    const q = query(
      this.tweetsCollection,
      orderBy('date', 'desc'),
      limit(currentLimit)
    )
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const { docs } = querySnapshot
      const fetchedTweets = docs.map(doc => doc.data())
      setTweets(fetchedTweets)
    })
    return unsubscribe
  }

  async getAll () {
    const tweetsSnapshot = await getDocs(this.tweetsCollection)
    const { docs } = tweetsSnapshot
    const fetchedTweets = docs.map(doc => doc.data())
    return fetchedTweets
  }

  async postNew (tweet) {
    const docRef = await addDoc(this.tweetsCollection, tweet)
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

const tweetStore = new TweetStore()
export default tweetStore
