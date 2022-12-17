import firebaseApp from './firebase-init'
import { getFirestore, collection, getDocs, doc, query, where } from 'firebase/firestore'
import { addDoc, updateDoc } from 'firebase/firestore'
// import { Timestamp } from 'firebase/firestore'

class UserStore {
  constructor () {
    this.db = getFirestore(firebaseApp)
    this.usersCollection = collection(this.db, 'users')
  }

  async loadUsers () {
    const usersSnapshot = await getDocs(this.usersCollection)
    const { docs } = usersSnapshot
    const loadedUsers = docs.map(doc => {
      const user = doc.data()
      user.docId = doc.id
      return user
    })
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
    try {
      console.log('creating new user...')
      const docRef = await addDoc(this.usersCollection, user)
      return docRef
    } catch (error) {
      console.log('error', error)
    }
  }

  async editDispalyName (docId ,newDisplayName) {
    console.log('editing user displayName...')
    const docRef = doc(this.db, 'users', docId)

    await updateDoc(docRef, {
      displayName: newDisplayName
    })
  }

  async editAvatarURL (docId ,newAvatarURL) {
    console.log('editing user avatar url...')
    const docRef = doc(this.db, 'users', docId)

    await updateDoc(docRef, {
      avatar: newAvatarURL
    })
  }

  async isNewUser (uid) {
    // const usersSnapshot = await getDocs(this.usersCollection)
    // const { docs } = usersSnapshot
    // const fetchedUsers = docs.map(doc => doc.data())

    return true
  }

  async isEmailExists(email) {
    const emailQuery = query(this.usersCollection, where('email', '==', email))
    // console.log(emailQuery)
    const querySnapshot = await getDocs(emailQuery);
    console.log('querySnapshot', querySnapshot)
    if (querySnapshot.docs.length > 0) return true
    return false
  }
}

const userStore = new UserStore()
export default userStore
