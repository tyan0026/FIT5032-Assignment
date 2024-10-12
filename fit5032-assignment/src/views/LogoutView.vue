<template>
  <div></div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'

export default {
  setup() {
    const router = useRouter()

    const getUserDocumentByEmail = async (email) => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', email))

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

    const logout = () => {
      const auth = getAuth()

      const email = auth.currentUser.email

      signOut(auth)
        .then(async () => {
          console.log('User signed out successfully.')

          //update online status
          const userDocRef = await getUserDocumentByEmail(email)

          // Update the user's document with the rating value
          await updateDoc(userDocRef, {
            online: false
          })

          router.push({ name: 'Login' })
        })
        .catch((error) => {
          console.error('Error signing out:', error)
        })
    }

    onMounted(() => {
      logout()
    })

    return {
      logout
    }
  }
}
</script>
