import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'
import firebaseApp from './firebase-init'
import { Timestamp } from '@firebase/firestore'
<<<<<<< Updated upstream
import userStore from './UserStore'
=======
import userStore from '../utils/UserStore.js'

>>>>>>> Stashed changes

class Authenticator {
  constructor () {
    this.auth = getAuth(firebaseApp)
    this.provider = new GoogleAuthProvider()
    this.defualtDisplayName = 'Luka'
    this.defaultPic =
      'https://s3media.247sports.com/Uploads/Assets/322/792/8792322.jpg'

    this.storage = getStorage(
      firebaseApp,
      'gs://itc-microblogging-85128.appspot.com/'
    )
    this.storageRef = ref(this.storage)

    userStore.getAll()
  }

  updateCurrentUser (setCurrentUser) {
    this.unsubscribeAuth = onAuthStateChanged(this.auth, user => {
      if (user) {
        const currentUser = {
          userData: user,
          isUserRetrieved: true
        }
        setCurrentUser(currentUser)
      } else {
        setCurrentUser({ userData: null, isUserRetrieved: true })
      }
    })
  }

  async createNewUser ({ email, password, displayName = email }) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      updateProfile(this.auth.currentUser, {
        displayName: displayName,
        photoURL: null
      })
      userStore.createNewUser({
        uid: cred.user.uid,
        displayName: displayName,
        email: cred.user.email,
        lastSignedIn: Timestamp.fromDate(new Date()),
        createdIn: Timestamp.fromDate(new Date()),
        avatar: '',
        isAdmin: false,
        isVerified: false
      })
    } catch (error) {
      return error.message
    }
  }

  async signIn ({ email, password }) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password)
      console.log('signed in!')
      return cred.user
    } catch (error) {
      console.table('error code', error.code)
      return error.code
    }
  }

  async signOut () {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.log(error.message)
    }
  }

  isUserDetailsValid (details) {
    console.log('validating...')
    return true
  }

  async updateUserProfile ({ newDisplayName = null }) {
    const result = await updateProfile(this.auth.currentUser, {
      displayName: newDisplayName
    })
    console.log('result', result)
  }

  async signInWithGoogle () {
    try {
      const result = await signInWithPopup(this.auth, this.provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      const user = result.user

      if (!(await userStore.isEmailExists(user.email))) {
        userStore.createNewUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          lastSignedIn: Timestamp.fromDate(new Date()),
          createdIn: Timestamp.fromDate(new Date()),
          avatar: user.photoURL,
          isAdmin: false,
          isVerified: false
        })
      }

      return user
    } catch (error) {
      return error.message
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
