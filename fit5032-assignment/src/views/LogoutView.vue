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
      
        localStorage.removeItem('currentUser');
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