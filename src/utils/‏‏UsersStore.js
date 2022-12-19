
import firebaseApp from './firebase-init'
import {
  addDoc,
  updateDoc,
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'

class UserStore {
  constructor () {
    this.db = getFirestore(firebaseApp)
    this.usersCollection = collection(this.db, 'users')
  }

  getUsersRealTime (setUsers) {
    console.log(' starting real time users subscription ...')
    const unsubscribe = onSnapshot(this.usersCollection, usersSnapshot => {
      const { docs } = usersSnapshot
      const loadedUsers = docs.map(doc => doc.data())
      setUsers(loadedUsers)
    })
    return unsubscribe
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
    const usersSnapshot = await getDocs(this.usersCollection)
    const { docs } = usersSnapshot
    const fetchedUsers = docs.map(doc => doc.data())
    return { users: fetchedUsers, isFinishedLoading: true }
  }

  async createNewUser (user) {
    try {
      const docRef = await addDoc(this.usersCollection, user)
      return docRef
    } catch (error) {
      console.log('error', error)
    }
  }

  async editDispalyName (docId, newDisplayName) {
    const docRef = doc(this.db, 'users', docId)

    await updateDoc(docRef, {
      displayName: newDisplayName
    })
  }

  async editAvatarURL (docId, newAvatarURL) {
    // console.log('editing user avatar url...')
    const docRef = doc(this.db, 'users', docId)

    await updateDoc(docRef, {
      avatar: newAvatarURL
    })
  }

  async isEmailExists (email) {
    const emailQuery = query(this.usersCollection, where('email', '==', email))
    const querySnapshot = await getDocs(emailQuery)
    if (querySnapshot.docs.length > 0) return true
    return false
  }
}

const userStore = new UserStore()
export default userStore
