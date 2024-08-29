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
  <div>
    <h2>Average Rating</h2>
    <p v-if="averageRating !== null">{{ averageRating.toFixed(2) }} / 5</p>
    <p v-else>No ratings yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rating = ref(1)

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const currentUsername = currentUser ? currentUser.username : ''

const submitRating = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const userIndex = users.findIndex((user) => user.username === currentUsername)

  if (userIndex !== -1) {
    users[userIndex].rating = rating.value

    localStorage.setItem('users', JSON.stringify(users))

    rating.value = 1
    window.alert('Thanks for your rating.')
    calculateAverageRating()
  } else {
    console.error('Current user not found.')
  }
}

const averageRating = ref(null)

const calculateAverageRating = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []

  // Extract ratings from user objects
  const ratings = users.map((user) => user.rating).filter((rating) => rating != null)

  if (ratings.length > 0) {
    const total = ratings.reduce((acc, curr) => acc + curr, 0)
    averageRating.value = total / ratings.length
  } else {
    averageRating.value = null
  }
}

onMounted(() => {
  calculateAverageRating()
})
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
