<template>
  <div></div>
</template>


<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
        localStorage.setItem('isAuthenticated', false);
        router.push({ name: 'Login' });
     
    }

    onMounted(() => {
      logout(); 
    });

    return {
      logout
    }
  }
}
</script>