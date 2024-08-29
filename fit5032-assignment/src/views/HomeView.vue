<script>
export default {
  name: 'HomeView'
}
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Empowering Elderly Health and Well-being</h1>
        <p class="hero-subtitle">
          Access essential health resources, connect with a supportive community, and take control
          of your well-being.
        </p>
        <router-link to="/resources" class="hero-button">Explore Resources</router-link>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <h2>About Us</h2>
        <p>
          We are a dedicated charity committed to improving the health and well-being of the
          elderly. Our mission is to provide accessible health resources and support to help older
          adults lead healthier, more fulfilling lives.
        </p>
        <router-link to="/about" class="about-button">Learn More</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Our Features</h2>
        <div class="feature-list">
          <div class="feature-item">
            <h3>Accessible Design</h3>
            <p>
              Our platform is designed with accessibility in mind, ensuring that all users,
              regardless of their tech literacy, can navigate and use our services with ease.
            </p>
          </div>
          <div class="feature-item">
            <h3>Supportive Community</h3>
            <p>
              Connect with other seniors, caregivers, and healthcare professionals to share
              experiences, get advice, and build a supportive network.
            </p>
          </div>
          <div class="feature-item">
            <h3>Health Resources</h3>
            <p>
              Access a wide range of health-related resources, including articles, videos, and
              guides, specifically tailored to the needs of the elderly.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="call-to-action">
      <div class="container">
        <h2>Join Our Community Today</h2>
        <p>
          Sign up and become part of a community dedicated to improving elderly health and
          well-being.
        </p>
        <router-link to="/signup" class="cta-button">Sign Up Now</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.hero {
  background-color: #f8f9fa;
  padding: 60px 0;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 40px;
}

.hero-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.25rem;
}

.about {
  padding: 60px 0;
  text-align: center;
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.about p {
  font-size: 1.125rem;
  margin-bottom: 30px;
}

.about-button {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.125rem;
}

.features {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.features h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-item {
  max-width: 300px;
  text-align: center;
  margin-bottom: 40px;
}

.feature-item img {
  width: 80px;
  margin-bottom: 20px;
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.call-to-action {
  padding: 60px 0;
  text-align: center;
}

.call-to-action h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.call-to-action p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.cta-button {
  background-color: #17a2b8;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.25rem;
}
</style>
