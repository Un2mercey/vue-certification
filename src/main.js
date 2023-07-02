import router from '@/router';
import { createApp } from 'vue';
import '../style.css';
import App from './App.vue';

const app = createApp(App);

app.use(router).mount('#app');
