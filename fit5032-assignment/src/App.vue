<script setup>
import HomePage from './components/HomePage.vue'
</script>

<template>
      <header class="header">
      <div>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="25" height="25" />
      </div>
      <nav class="navigation">
        <ul>
          <li><a href="#">Services</a></li>
          <li><a href="#">My Health</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </nav>
      <div>

      </div>
    </header>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <HomePage />
  </main>
</template>

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
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
