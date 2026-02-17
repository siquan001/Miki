import { createApp } from 'vue'
import App from './App.vue'
import './base.scss';
import { isfullscreen, showTab } from './core/store';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import localforage from 'localforage';
import bus from './core/bus';

localforage.config({
    name:"Miki",
    storeName:"miki_note"
})

document.addEventListener("fullscreenchange",()=>{
    isfullscreen.value=!!document.fullscreenElement;
})

setInterval(()=>{
    if(showTab.value==1||showTab.value==3){
        bus.emit("save","auto");
    }
},5*60000)

const app=createApp(App)
app.mount('#app');
app.use(VCalendar, {});