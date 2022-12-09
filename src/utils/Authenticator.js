import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
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

  updateCurrentUser (setCurrentUser) {
    onAuthStateChanged(this.auth, user => {
        console.log('updating user signIn status')
      if (user) {
        console.log('getting current user to context - user:', user.displayName)
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
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

  async signIn ({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password)
      console.log('signed in!')
      console.log('user cred=', cred)
      console.log('user =', cred.user)
    } catch (error) {
      console.log(error.message)
    }
  }

  async signOut () {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.log(error.message)
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
