// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5KRbmyWWe5LqvXCjabiWHxvGQ1n-tfn0",
    authDomain: "fit5032assignment-5c240.firebaseapp.com",
    projectId: "fit5032assignment-5c240",
    storageBucket: "fit5032assignment-5c240.appspot.com",
    messagingSenderId: "1057174561304",
    appId: "1:1057174561304:web:6844306f5085f67963196d",
    measurementId: "G-6FH6LZH2XL"
  };

initializeApp(firebaseConfig)

const db = getFirestore()


const getUserDocumentByEmail = async () => {
  try {
    // Get the currently authenticated user
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new Error('No authenticated user found')
    }

    // Query Firestore for the user document where the email matches currentUser.email
    const q = query(collection(db, 'users'), where('email', '==', currentUser.email))

    // Execute the query and get the matching documents
    const querySnapshot = await getDocs(q)

    // Check if a matching document was found
    if (!querySnapshot.empty) {
      let userDocRef
      querySnapshot.forEach((doc) => {
        // doc.id gives the document ID, doc.data() gives the document data
        userDocRef = doc.ref // This is the document reference
        console.log('User document found:', doc.data())
      })
      return userDocRef // Return the document reference
    } else {
      console.log('No matching user document found')
      return null
    }
  } catch (error) {
    console.error('Error fetching user document by email:', error)
  }
}




export {db, getUserDocumentByEmail}