<template>
    <div class="about-us">
      <!-- Header Section -->
      <section class="header">
        <div class="container">
          <h1>About Us</h1>
          <p>
            Dedicated to improving the health and well-being of the elderly, we are a charity committed to making a positive impact on our community.
          </p>
        </div>
      </section>
  
      <!-- Mission Section -->
      <section class="mission">
        <div class="container">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower elderly individuals to lead healthier, more fulfilling lives by providing them with accessible health resources, fostering a supportive community, and offering educational programs designed to meet their unique needs.
          </p>
        </div>
      </section>
  
      <!-- Vision Section -->
      <section class="vision">
        <div class="container">
          <h2>Our Vision</h2>
          <p>
            We envision a world where every elderly person has the resources and support they need to live a life of dignity, health, and joy. We strive to break down barriers and create a more inclusive society for all.
          </p>
        </div>
      </section>
  
      <!-- Values Section -->
      <section class="values">
        <div class="container">
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Compassion:</strong> We care deeply about the well-being of the elderly and work tirelessly to support them.
            </li>
            <li>
              <strong>Inclusion:</strong> We believe in creating a welcoming environment where everyone feels valued and supported.
            </li>
            <li>
              <strong>Empowerment:</strong> We empower the elderly by providing them with the tools and knowledge they need to take control of their health.
            </li>
            <li>
              <strong>Innovation:</strong> We embrace new technologies and approaches to continuously improve the services we offer.
            </li>
            <li>
              <strong>Community:</strong> We build strong, supportive communities that bring people together and foster a sense of belonging.
            </li>
          </ul>
        </div>
      </section>
  
      <!-- Team Section -->
      <section class="team">
        <div class="container">
          <h2>Meet Our Team</h2>
          <p>
            Our dedicated team of professionals is passionate about making a difference in the lives of elderly individuals. From healthcare experts to community leaders, our team is here to support you every step of the way.
          </p>
          <!-- Team Members (Example) -->
          <div class="team-members">
            <div class="team-member">
              
              <h3>Jane Doe</h3>
              <p>Chief Executive Officer</p>
            </div>
            <div class="team-member">
              
              <h3>John Smith</h3>
              <p>Director of Health Services</p>
            </div>
            <!-- Add more team members as needed -->
          </div>
        </div>
      </section>
  
      <!-- Call to Action Section -->
      <section class="call-to-action">
        <div class="container">
          <h2>Get Involved</h2>
          <p>
            Join us in our mission to improve the lives of the elderly. Whether through volunteering, donating, or simply spreading the word, your support makes a difference.
          </p>
          <router-link to="/get-involved" class="cta-button">Learn How You Can Help</router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutUsPage",
  };
  </script>
  
  <style scoped>
  .about-us-page {
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
  
  .mission, .vision, .values, .team {
    padding: 60px 0;
    text-align: center;
  }
  
  .mission h2, .vision h2, .values h2, .team h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .mission p, .vision p {
    font-size: 1.125rem;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .values ul {
    list-style-type: none;
    padding: 0;
    font-size: 1.125rem;
  }
  
  .values li {
    margin-bottom: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .team p {
    font-size: 1.125rem;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .team-members {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .team-member {
    max-width: 200px;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .team-member img {
    width: 100%;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  
  .team-member h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .call-to-action {
    background-color: #17a2b8;
    color: #fff;
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
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.25rem;
  }
  </style>
  