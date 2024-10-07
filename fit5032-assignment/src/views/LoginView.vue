<template>
  <div class="login">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Login</h1>

        <form @submit.prevent="login" class="card p-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
            />
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()


    const login = () => {
      signInWithEmailAndPassword(getAuth(),email.value,password.value)
      .then((data) => {
        console.log("Login Successful")
        router.push("/home")
        console.log(auth.currentUser)
      }).catch((error) => {
        console.log(error.code)
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
