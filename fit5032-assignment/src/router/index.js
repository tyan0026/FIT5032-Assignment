import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegiterView from '@/views/RegiterView.vue'
import LoginView from '@/views/LoginView.vue'
import MyHealthView from '@/views/MyHealthView.vue'
import ServicesView from '@/views/ServicesView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import LogoutView from '@/views/LogoutView.vue'
import UsersView from '@/views/UsersView.vue'
import RatingView from '@/views/RatingView.vue'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegiterView },
  { path: '/about-us', name: 'AboutUs', component: AboutUsView },
  { path: '/rating', name: 'Rating', component: RatingView },
  { path: '/my-health', name: 'MyHealth', component: MyHealthView },
  { path: '/services', name: 'Services', component: ServicesView },
  { path: '/users', name: 'Users', component: UsersView },
  { path: '/logout', name: 'Logout', component: LogoutView },
  { path: '', name: 'DefaultLogin', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = getAuth();

  const user = auth.currentUser;  // Check the current authentication state

  if (!user && to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Logout') {
    // If the user is not authenticated and trying to access protected routes, redirect to login
    window.alert('Please login first.');
    next({ name: 'Login' });
  } else {
    // If authenticated or accessing public routes, allow the navigation
    next();
  }
});

export default router
