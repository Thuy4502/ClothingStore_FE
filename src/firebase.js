import { initializeApp } from '@firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage' // Import necessary functions from Firebase Storage SDK

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQuvb-UADjk_62th2-n_pH7pVgTqGUmuI",
    authDomain: "clothing-e004e.firebaseapp.com",
    projectId: "clothing-e004e",
    storageBucket: "clothing-e004e.appspot.com",
    messagingSenderId: "380795401499",
    appId: "1:380795401499:web:7ae970c618c04017330fbe"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// Function to upload image to Firebase and get URL
export const uploadImageToFirebase = async (file) => {
  const storageRef = ref(storage, `images/products/${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
