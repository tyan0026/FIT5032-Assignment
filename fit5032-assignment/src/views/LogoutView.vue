<template>
  <div></div>
</template>


<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getAuth, signOut } from "firebase/auth";

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      const auth = getAuth();

      signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      router.push({ name: 'Login' });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });

    
     
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