import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase-init'

class CloudStorage {
  constructor () {
    this.storageRef = ref(storage)
    this.avatarsRef = ref(this.storageRef, 'avatars')
  }

  async uploadAvatar (uid, newAvatarFile) {
    try {
      const imageRef = ref(storage, `${uid}/${newAvatarFile.name}`)
      const result = await uploadBytes(imageRef, newAvatarFile)
      const url = await getDownloadURL(result.ref)
      return url
    } catch (error) {
      console.log(error.message)
    }
  }
}

const cloudStorage = new CloudStorage()
export default cloudStorage
