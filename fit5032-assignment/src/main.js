import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { createApp } from 'vue'
import App from "./App.vue";
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'


  
// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App);
app.use(router);
app.use(PrimeVue, {theme:{preset: Aura}});
app.mount('#app')