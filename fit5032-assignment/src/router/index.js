import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RegiterView from '@/views/RegiterView.vue';
import LoginView from '@/views/LoginView.vue'; 
import MyHealthView from '@/views/MyHealthView.vue';
import ServicesView from '@/views/ServicesView.vue';
import AboutUsView from '@/views/AboutUsView.vue';


const routes = [
    {path:'/', component: HomeView},
    {path:'/login', component: LoginView},
    {path:'/register', component: RegiterView},
    {path:'/about-us', component: AboutUsView},
    {path:'/my-health', component: MyHealthView},
    {path:'/services', component: ServicesView}
]



const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;