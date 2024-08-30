<script setup>
import { ref } from 'vue'
import LoginView from './LoginView.vue';
import router from '@/router';

//declare form data
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  isAdmin: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

//declare users variable - initialise it with the users array in local storage. If it doen't exist, initialise it with an empty array
const users = ref(JSON.parse(localStorage.getItem('users')) || [])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  //when username and password are valid
  if (!errors.value.username && !errors.value.password) {

    //add the newly registered user to the users list
    users.value.push({ ...formData.value })

    //update users in the database
    localStorage.setItem('users', JSON.stringify(users.value))
    clearForm()
    router.push({name : "Login"})
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    isAdmin: false,
    reason: '',
    gender: ''
  }
}

//define errors object
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  admin: null,
  gender: null,
  reason: null
})

//validate name when user removes cursor from the input field
const validateName = (blur) => {
  //check username length
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}


//validate password when user removes cursor from the input field
const validatePassword = (blur) => {
  //get password from formData
  const password = formData.value.password
  const minLength = 8
  //define a regular expression for uppercase letters and test if password matches it
  const hasUppercase = /[A-Z]/.test(password)
  //define a regular expression for lowercase letters and test if password matches it
  const hasLowercase = /[a-z]/.test(password)
  //define a regular expression for numbers and test if password matches it
  const hasNumber = /\d/.test(password)
  //define a regular expression for sepcial characters and test if password matches it
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  //set errors accordingly
  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = () => {
  const reasonText = formData.value.reason.toLowerCase()
  if (reasonText.includes('friend')) {
    errors.value.reason = 'Great to have a friend'
  } else {
    errors.value.reason = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Register</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAdmin"
                  v-model="formData.isAdmin"
                />
                <label class="form-check-label" for="isAdmin">Admin?</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @input="validateReason"
            ></textarea>
            <div v-if="errors.reason" class="text-success">{{ errors.reason }}</div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
#isAdmin:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
