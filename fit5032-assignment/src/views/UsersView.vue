<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Define reactive variables and functions inside setup
const users = ref([])

const getUsers = () => {
  users.value = JSON.parse(localStorage.getItem('users')) || []
}

// Use lifecycle hooks inside setup
onMounted(() => {
  getUsers()
})
</script>

<template>
  <div class="row mt-5">
    <h4>Users</h4>
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="isAustralian" header="Australian Resident"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
    </DataTable>
  </div>
</template>
