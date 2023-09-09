import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Route from './plugins/RouteController'

const app = createApp(App)

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;



app.use(Route)
app.mount('#app');