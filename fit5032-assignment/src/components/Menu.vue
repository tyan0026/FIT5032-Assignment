<template>
<div class="header">
    <div>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="25" height="25" />
  </div>
  <nav class="navigation">
    <ul>
      <li> <router-link to="/" class="nav-link" active-class="active">Home</router-link></li>
      <li> <router-link to="/services" class="nav-link" active-class="active">Services</router-link></li>
      <li> <router-link to="/my-health" class="nav-link" active-class="active">My Health</router-link></li>
      <li> <router-link to="/about-us" class="nav-link" active-class="active">About Us</router-link></li>
    </ul>
  </nav>
</div>
</template>

<script>
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
}</style>
