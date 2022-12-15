import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  // signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'
import firebaseApp from './firebase-init'
import { Timestamp } from '@firebase/firestore'
import userStore from './UserStore'

class Authenticator {
  constructor () {
    this.auth = getAuth(firebaseApp)
    this.provider = new GoogleAuthProvider();
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
    onAuthStateChanged(this.auth, user => {
      console.log('updating user signIn status')
      if (user) {
        const currentUser = {
          userData: user,
          isUserRetrieved: true
        }
        console.log('getting current user to context - user:', user.displayName)
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
      console.log('user created + signed in!')
      console.log('new user cred=', cred.user)
      userStore.createNewUser({ 
        uid: cred.user.uid,
        displayName: displayName,
        email: cred.user.email,
        lastSignedIn: Timestamp.fromDate(new Date()),
        createdIn: Timestamp.fromDate(new Date()),
        avatar: null,
        isAdmin: false,
        isVerified: false,
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

  isUserDetailsValid(details) {
    console.log("validating...")
    return true
  }

  async updateUserProfile({ newDisplayName=null }) {
    console.log('updating profile')
    const result = await updateProfile(this.auth.currentUser, {
      displayName: newDisplayName,
    })
    console.log('result', result)
  }

  async signInWithGoogle () {
    try {
      const result = await signInWithRedirect(this.auth, this.provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log('token', token)
      console.log('signing in with google...')
      console.log('user', user)
      await userStore.createNewUser({uid: '0000'})
      // await userStore.createNewUser({
      //   uid: 'eeeee',
      //   // displayName: user.userData.displayName,
      //   // email: user.userData.email,
      //   // lastSignedIn: Timestamp.fromDate(new Date()),
      //   // createdIn: Timestamp.fromDate(new Date())
      //   // avatar: user.userData.photoURL
      // })
      // if (true) {
      // }
      return user
    } catch (error) {
      return error.message
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
