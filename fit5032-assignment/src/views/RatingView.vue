<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Rate Us</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="submitRating" class="card p-4 shadow-sm">
          <div class="mb-3">
            <label for="rating" class="form-label">Rate (1-5):</label>
            <input
              type="number"
              id="rating"
              v-model.number="rating"
              min="1"
              max="5"
              class="form-control"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="row mt-5">
    <h2>User Ratings</h2>
    <DataTable :value="userRatings" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="rating" header="Rating"></Column>
    </DataTable>
  </div>
  <div style="margin-top: 20px">
    <h2>Average Rating</h2>
    <p v-if="averageRating !== null">{{ averageRating.toFixed(2) }} / 5</p>
    <p v-else>No ratings yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { getAuth } from 'firebase/auth'
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'

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

const rating = ref(1)
const averageRating = ref(null)
const userRatings = ref([])

const calculateAverageRating = async () => {
  try {
    // Read the average rating from the 'metadata' collection in Firestore
    const averageRatingDoc = await getDoc(doc(db, 'metadata', 'ratings'))

    if (averageRatingDoc.exists) {
      averageRating.value = averageRatingDoc.data().averageRating
    } else {
      averageRating.value = null
    }
  } catch (error) {
    console.error('Error fetching average rating:', error)
    averageRating.value = null
  }
}

const updateRatingsTable = async () => {
  try {
    // Query the Firestore collection for all users
    const querySnapshot = await getDocs(collection(db, 'users'))

    // Extract users with ratings
    const ratings = []
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      if (userData.rating !== undefined) {
        ratings.push({
          username: userData.email || 'Unknown User', // Assuming the username is stored in Firestore
          rating: userData.rating
        })
      }
    })

    // Update the userRatings reactive variable
    userRatings.value = ratings
  } catch (error) {
    console.error('Error updating ratings table:', error)
  }
}

const submitRating = async () => {
  try {
    // Find the current user in Firestore based on email
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (!currentUser) {
      console.error('No authenticated user found.')
      return
    }

    // Get a reference to the Firestore document for the current user
    const userDocRef = await getUserDocumentByEmail()

    // Update the user's document with the rating value
    await updateDoc(userDocRef, {
      rating: rating.value
    })

    // Notify the user
    window.alert('Thanks for your rating.')

    // Update the ratings table and recalculate the average
    updateRatingsTable()
    calculateAverageRating()

    // Reset the rating input to default (1)
    rating.value = 1
  } catch (error) {
    console.error('Error updating user rating in Firestore:', error)
  }
}

onMounted(() => {
  //make sure this method is called when page load
  calculateAverageRating()
  updateRatingsTable()
})
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
