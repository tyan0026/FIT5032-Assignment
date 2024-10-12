<template>
  <div class="login">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Login</h1>

        <form @submit.prevent="login" class="card p-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" class="form-control" v-model="email" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" required />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </form>

        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>

        <p class="text-center mt-3">
          Don't have an account?
          <a @click="goToRegister" class="text-primary">Register here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

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

    const login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(async (data) => {
          console.log('Login Successful')

          const userDocRef = await getUserDocumentByEmail()

          // Update the user's document with the rating value
          await updateDoc(userDocRef, {
            online: true
          })

          router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const goToRegister = () => {
      //redirect the user to register page
      router.push({ name: 'Register' })
    }

    return {
      email,
      password,
      errorMessage,
      login,
      goToRegister
    }
  }
}
</script>

<style scoped>
.login {
  padding-top: 50px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
}

.btn-primary {
  background-color: #275fda;
  border-color: #275fda;
}

.btn-primary:hover {
  background-color: #1d4ab8;
  border-color: #1d4ab8;
}

.text-danger {
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>
