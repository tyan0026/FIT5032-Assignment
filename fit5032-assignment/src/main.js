import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { createApp } from 'vue'
import App from "./App.vue";
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5KRbmyWWe5LqvXCjabiWHxvGQ1n-tfn0",
    authDomain: "fit5032assignment-5c240.firebaseapp.com",
    projectId: "fit5032assignment-5c240",
    storageBucket: "fit5032assignment-5c240.appspot.com",
    messagingSenderId: "1057174561304",
    appId: "1:1057174561304:web:6844306f5085f67963196d",
    measurementId: "G-6FH6LZH2XL"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App);
app.use(router);
app.use(PrimeVue, {theme:{preset: Aura}});
app.mount('#app')