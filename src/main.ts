import { createApp } from 'vue'
import App from './App.vue'
import './base.scss';
import { isfullscreen } from './core/store';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

document.addEventListener("fullscreenchange",()=>{
    isfullscreen.value=!!document.fullscreenElement;
})

const app=createApp(App)
app.mount('#app');
app.use(VCalendar, {});