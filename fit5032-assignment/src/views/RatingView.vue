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
  <div style="margin-top: 20px;">
    <h2>Average Rating</h2>
    <p v-if="averageRating !== null">{{ averageRating.toFixed(2) }} / 5</p>
    <p v-else>No ratings yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const rating = ref(1)

//get current user from database
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

//get current user's username
const currentUsername = currentUser ? currentUser.username : ''

const submitRating = () => {
  //get all users from local storage
  const users = JSON.parse(localStorage.getItem('users')) || []

  //find current user in the user list
  const userIndex = users.findIndex((user) => user.username === currentUsername)

  //if user is found
  if (userIndex !== -1) {
    //add or update its reting value
    users[userIndex].rating = rating.value

    //write the updated users list back to local storage
    localStorage.setItem('users', JSON.stringify(users))

    //reset the reting in the input field back to default 1
    rating.value = 1

    //notify the user 
    window.alert('Thanks for your rating.')

    //calculate the average rating
    updateRatingsTable();
    calculateAverageRating()
  } else {
    console.error('Current user not found.')
  }
}

const averageRating = ref(null)
const userRatings = ref([])

const calculateAverageRating = () => {

  //get all existing users 
  const users = JSON.parse(localStorage.getItem('users')) || []

  // Extract ratings from user objects
  const ratings = users.map((user) => user.rating).filter((rating) => rating != null)

  if (ratings.length > 0) {
    //Calculate total value 
    const total = ratings.reduce((acc, curr) => acc + curr, 0)
    averageRating.value = total / ratings.length
  } else {
    averageRating.value = null
  }
}

const updateRatingsTable = () => {
  userRatings.value = JSON.parse(localStorage.getItem('users')).filter(a => a.rating != undefined) || []
}

onMounted(() => {
  //make sure this method is called when page load
  calculateAverageRating();
  updateRatingsTable();
})
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
