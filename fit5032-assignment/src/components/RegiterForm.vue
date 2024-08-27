<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="email"
        v-validate="required | email"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6)
      })
    })

    return {
      email,
      password,
      handleSubmit
    }
  }
})
</script>
