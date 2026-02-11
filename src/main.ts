import { createApp } from 'vue'
import App from './App.vue'
import './base.scss';
import { isfullscreen } from './core/store';

document.addEventListener("fullscreenchange",()=>{
    isfullscreen.value=!!document.fullscreenElement;
})

createApp(App).mount('#app')