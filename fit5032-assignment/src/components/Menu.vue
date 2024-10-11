<template>
  <div class="header">
    <div>
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="25" height="25" />
    </div>
    <nav class="navigation">
      <ul>
        <li><router-link to="/home" class="nav-link" active-class="active">Home</router-link></li>
        <li>
          <router-link to="/services" class="nav-link" active-class="active">Services</router-link>
        </li>
        <li>
          <router-link to="/my-health" class="nav-link" active-class="active"
            >Caregivers</router-link
          >
        </li>
        <li>
          <router-link to="/about-us" class="nav-link" active-class="active">About Us</router-link>
        </li>
        <li>
          <router-link to="/rating" class="nav-link" active-class="active">Rate Us</router-link>
        </li>
        <li v-if="user && user.isAdmin">
          <router-link to="/users" class="nav-link" active-class="active">Users</router-link>
        </li>
        <li v-if="!user">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-if="user">
          <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init.js'

export default {
  setup() {
    const user = ref(null)
    const auth = getAuth()

    const route = useRoute()

    // Function to get a user by email
    const getUserByEmail = async (email) => {
      try {
        // Create a query against the collection.
        const q = query(collection(db, 'users'), where('email', '==', email))

        // Execute the query and get the documents
        const querySnapshot = await getDocs(q)

        // Check if any documents were returned
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            user.value = doc.data()
          })
        } else {
          console.log('No matching documents.')
        }
      } catch (error) {
        console.error('Error fetching user by email:', error)
      }
    }

    onMounted(() => {
      checkAuth()
    })

    const checkAuth = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            // Fetch the user data from Firestore by email
            await getUserByEmail(currentUser.email)
          } catch (error) {
            console.error('Error fetching user data:', error)
            user.value = null
          }
        } else {
          // User is signed out
          user.value = null
        }
      })
    }

    return {
      user
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
}

.navigation ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

.navigation li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
