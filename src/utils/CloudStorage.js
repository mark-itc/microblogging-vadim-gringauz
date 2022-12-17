import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase-init'

class CloudStorage {
  constructor () {
    this.storageRef = ref(storage)
    this.avatarsRef = ref(this.storageRef, 'avatars')
  }

  async getAvatarURLByUid (uid) {
    try {
      const fileName = '1.jpg'
      const fileRef = ref(this.avatarsRef, fileName)
      //   const path = fileRef.fullPath
      const url = await getDownloadURL(ref(storage, fileRef))
      return url
    } catch (error) {
      console.log(error.message)
    }
  }

  async uploadAvatar (uid, newAvatarFile) {
    try {
      const imageRef = ref(storage, `${uid}/${newAvatarFile.name}`)
      const result = await uploadBytes(imageRef, newAvatarFile)
      console.log('result of upload', result)
      const url = await getDownloadURL(result.ref)
      return url
    } catch (error) {
      console.log(error.message)
    }
  }
}

const cloudStorage = new CloudStorage()
export default cloudStorage
