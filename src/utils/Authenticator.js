import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'
import firebaseApp from './firebase-init'

class Authenticator {
  constructor () {
    this.auth = getAuth(firebaseApp)
    this.defualtDisplayName = 'Luka'
    this.defaultPic =
      'https://s3media.247sports.com/Uploads/Assets/322/792/8792322.jpg'

    this.storage = getStorage(
      firebaseApp,
      'gs://itc-microblogging-85128.appspot.com/'
    )
    this.storageRef = ref(this.storage)
  }
  async createNewUser ({ email, password }) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      updateProfile(this.auth.currentUser, {
        displayName: this.defualtDisplayName,
        photoURL: this.defaultPic
      })
      console.log('signed in')
      console.log('new user cred=', cred.user)
    } catch (error) {
      console.log(error.message)
    }
  }

  async login ({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password)
      console.log('logged in!')
      console.log('user cred=', cred)
      console.log('user =', cred.user)
    } catch (error) {
      console.log(error.message)
    }
  }

  async logout () {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.log(error.message)
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
