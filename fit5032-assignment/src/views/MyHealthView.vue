<template>
    <div class="my-health">
      <!-- Header Section -->
      <section class="header">
        <div class="container">
          <h1>My Health</h1>
          <p>Your personalized health dashboard, where you can find resources, track your health, and get the support you need.</p>
        </div>
      </section>
  
      <!-- Health Resources Section -->
      <section class="health-resources">
        <div class="container">
          <h2>Health Resources</h2>
          <div class="resource-list">
            <div class="resource-item">
              
              <h3>Articles</h3>
              <p>Read our latest articles on elderly health, wellness, and nutrition.</p>
              <router-link to="/articles" class="resource-button">Read More</router-link>
            </div>
            <div class="resource-item">
              
              <h3>Videos</h3>
              <p>Watch informative videos on managing your health and well-being.</p>
              <router-link to="/videos" class="resource-button">Watch Now</router-link>
            </div>
            <div class="resource-item">
              
              <h3>Guides</h3>
              <p>Download our comprehensive health guides tailored to elderly needs.</p>
              <router-link to="/guides" class="resource-button">Download Guides</router-link>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Health Tracking Section -->
      <section class="health-tracking">
        <div class="container">
          <h2>Track Your Health</h2>
          <p>Monitor your health by tracking key indicators such as blood pressure, blood sugar, and more.</p>
          <router-link to="/health-tracker" class="track-button">Start Tracking</router-link>
        </div>
      </section>
  
      <!-- Support Section -->
      <section class="support">
        <div class="container">
          <h2>Get Support</h2>
          <p>Connect with healthcare professionals, caregivers, and community support groups.</p>
          <router-link to="/support" class="support-button">Find Support</router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyHealthPage",
  };
  </script>
  
  <style scoped>
  .my-health-page {
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
  
  .health-resources, .health-tracking, .support {
    padding: 60px 0;
    text-align: center;
  }
  
  .health-resources h2, .health-tracking h2, .support h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .resource-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .resource-item {
    max-width: 300px;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .resource-item img {
    width: 80px;
    margin-bottom: 20px;
  }
  
  .resource-item h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .resource-button, .track-button, .support-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.125rem;
  }
  </style>
  