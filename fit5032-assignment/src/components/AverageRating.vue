<template>
  <div>
    <h2>Average Rating</h2>
    <p v-if="averageRating !== null">{{ averageRating.toFixed(2) }} / 5</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const averageRating = ref(null)

const calculateAverageRating = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  
  // Extract ratings from user objects
  const ratings = users.map(user => user.rating).filter(rating => rating != null)
  
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
