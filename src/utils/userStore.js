import firebaseApp from './firebase-init'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore'
import { addDoc, deleteDoc } from 'firebase/firestore'

class UserStore {
  constructor () {
    const db = getFirestore(firebaseApp)
    this.usersCollection = collection(db, 'users')
  }

  async getAll () {
    console.log(' getting users collection from firestore...')
    const usersSnapshot = await getDocs(this.usersCollection)
    const { docs } = usersSnapshot
    const fetchedUsers = docs.map(doc => doc.data())
    // console.log('fetchedUsers=', fetchedUsers)
    return { users: fetchedUsers, isFinishedLoading: true}
  }

  async createNewUser (user) {
    console.log('creating new user...')
    const docRef = await addDoc(this.usersCollection, user)
    // console.log('docRef=', docRef)
    return docRef
  }

  async editUser () {
    console.log('editing user...')
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
