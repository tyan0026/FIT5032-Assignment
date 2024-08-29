<template>
  <div class="header">
    <div>
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="25" height="25" />
    </div>
    <nav class="navigation">
      <ul>
        <li><router-link to="/" class="nav-link" active-class="active">Home</router-link></li>
        <li>
          <router-link to="/services" class="nav-link" active-class="active">Services</router-link>
        </li>
        <li>
          <router-link to="/my-health" class="nav-link" active-class="active"
            >My Health</router-link
          >
        </li>
        <li>
          <router-link to="/about-us" class="nav-link" active-class="active">About Us</router-link>
        </li>
        <li>
          <router-link to="/rating" class="nav-link" active-class="active">Rate Us</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/users" class="nav-link" active-class="active">Users</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const isLoggedIn = ref(false)
    const isAdmin = ref(false)

    const route = useRoute()

    const checkAuthStatus = () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      isLoggedIn.value = currentUser != null

      if (currentUser) {
        isAdmin.value = currentUser.isAdmin === 'true'
      }
    }

    // Watch for route changes and recheck authentication status
    watch(route, () => {
      checkAuthStatus()
    })

    onMounted(() => {
      checkAuthStatus()
    })

    return {
      isLoggedIn,
      isAdmin
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
