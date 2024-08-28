import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import RegiterForm from '@/components/RegiterForm.vue';
import LoginForm from '@/components/LoginForm.vue'; 


const routes = [
    {path:'/', component: HomePage},
    {path:'/login', component: LoginForm},
    {path:'/register', component: RegiterForm}
]



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router;