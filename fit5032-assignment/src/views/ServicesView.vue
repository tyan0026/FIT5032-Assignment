<template>
  <div>
    <div class="services-page">
    <!-- Header Section -->
    <section class="header">
      <div class="container">
        <h1>Our Services</h1>
        <p>Explore the wide range of services we offer to support elderly health and well-being.</p>
      </div>
    </section>

    <!-- Service List Section -->
    <section class="service-list">
      <div class="container">
        <h2>What We Offer</h2>
        <div class="service-items">
          <div class="service-item">
            
            <h3>Health Checkups</h3>
            <p>Regular health screenings and checkups to monitor your well-being.</p>
            <router-link to="/services/health-checkups" class="service-button">Learn More</router-link>
          </div>
          <div class="service-item">
            
            <h3>Consultations</h3>
            <p>One-on-one consultations with healthcare professionals.</p>
            <router-link to="/services/consultations" class="service-button">Learn More</router-link>
          </div>
          <div class="service-item">
            
            <h3>Workshops & Classes</h3>
            <p>Educational workshops and classes on various health topics.</p>
            <router-link to="/services/workshops" class="service-button">Learn More</router-link>
          </div>
          <div class="service-item">
            
            <h3>Support Groups</h3>
            <p>Join a support group to connect with others who share similar experiences.</p>
            <router-link to="/services/support-groups" class="service-button">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact">
      <div class="container">
        <h2>Need Help? Contact Us</h2>
        <p>If you have any questions about our services or need assistance, feel free to reach out to us.</p>
        <router-link to="/contact" class="contact-button">Contact Us</router-link>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
export default {
  name: "ServicesPage",
};
</script>

<style scoped>
.services-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  background-color: #f8f9fa;
  padding: 60px 0;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.header p {
  font-size: 1.25rem;
  margin-bottom: 40px;
}

.service-list {
  padding: 60px 0;
  text-align: center;
}

.service-list h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.service-items {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.service-item {
  max-width: 300px;
  text-align: center;
  margin-bottom: 40px;
}

.service-item img {
  width: 80px;
  margin-bottom: 20px;
}

.service-item h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.service-button, .contact-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.125rem;
}

.contact {
  padding: 60px 0;
  text-align: center;
}
</style>
