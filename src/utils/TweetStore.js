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
  limit,
  getCountFromServer,
  startAt,
  where,
  getDoc
} from 'firebase/firestore'

class TweetStore {
  constructor () {
    this.db = getFirestore(firebaseApp)
    this.tweetsCollection = collection(this.db, 'tweets')
  }

  async getTweetsRealTime (setTweets, getCurrentLimit, setIsReachedLimit) {
    setIsReachedLimit(false)
    const q = query(
      this.tweetsCollection,
      orderBy('date', 'desc'),
      limit(getCurrentLimit())
    )
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const { docs } = querySnapshot
      const fetchedTweets = docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTweets(fetchedTweets)
    })
    return unsubscribe
  }

  async countTweets () {
    const snapshot = await getCountFromServer(this.tweetsCollection)
    return snapshot.data().count
  }

  async getTweets (startIndex, paginateBy) {
    const first = query(
      this.tweetsCollection,
      orderBy('date', 'desc'),
      limit(startIndex)
    )
    const tempSnapshot = await getDocs(first)

    const lastVisible = tempSnapshot.docs[tempSnapshot.docs.length - 1]

    const next = query(
      this.tweetsCollection,
      orderBy('date', 'desc'),
      startAt(lastVisible),
      limit(paginateBy)
    )
    const tweetsSnapshot = await getDocs(next)
    const { docs } = tweetsSnapshot
    const fetchedTweets = docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return fetchedTweets
  }

  async getTweetById (id) {
    const docRef = doc(this.db, 'tweets', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }

    return docSnap.data()
  }

  async postNew (tweet) {
    const docRef = await addDoc(this.tweetsCollection, tweet)
    return docRef
  }

  async deleteAll () {
    try {
      const { docs } = await getDocs(this.tweetsCollection)
      docs.map(async document => {
        await deleteDoc(doc(this.tweetsCollection, document.id))
      })
      return null
    } catch (error) {
      return error.message
    }
  }

  // async edit (id, newContect) {
  // }

  // async delete (id) {
  // }
}

const tweetStore = new TweetStore()
export default tweetStore
