import firebaseApp from './firebase-init'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'
import { addDoc, deleteDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'

class UserStore {
  constructor () {
    const db = getFirestore(firebaseApp)
    this.usersCollection = collection(db, 'users')
  }

  async loadUsers () {
    const usersSnapshot = await getDocs(this.usersCollection)
    const { docs } = usersSnapshot
    const loadedUsers = docs.map(doc => doc.data())
    return loadedUsers
  }

  async getAll () {
    console.log(' getting users collection from firestore...')
    const usersSnapshot = await getDocs(this.usersCollection)
    const { docs } = usersSnapshot
    const fetchedUsers = docs.map(doc => doc.data())
    // console.log('fetchedUsers=', fetchedUsers)
    return { users: fetchedUsers, isFinishedLoading: true }
  }

  async createNewUser (user) {
    const tempUser = {
      uid: 'qqqq'
      // displayName: 'test123',
      // email: 'a@b',
      // lastSignedIn: Timestamp.fromDate(new Date()),
      // createdIn: Timestamp.fromDate(new Date()),
      // avatar: user.photoURL,
      // group: 'admin'
    }
    try {
      console.log('creating new user...')
      const docRef = await addDoc(this.usersCollection, user)
      // console.log('docRef=', docRef)
      return docRef
    } catch (error) {
      console.log('error', error)
    }
  }

  async editUser () {
    console.log('editing user...')
  }

  async isNewUser (uid) {
    // const usersSnapshot = await getDocs(this.usersCollection)
    // const { docs } = usersSnapshot
    // const fetchedUsers = docs.map(doc => doc.data())

    return true
  }
  //   async deleteUser () {
  //     try {
  //       console.log('Deleting all tweets for collection...')
  //       const { docs } = await getDocs(this.tweetsCollection)
  //       docs.map(async document => {
  //         await deleteDoc(doc(this.tweetsCollection, document.id))
  //       })
  //       return null
  //     } catch (error) {
  //       return error.message
  //     }
  //   }
}

const userStore = new UserStore()
export default userStore
