import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store';
import mitt from 'mitt';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// @ts-ignore
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

const emitter = mitt();

const app = createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(store)
    .use(router)

app.config.globalProperties.emitter = emitter;
app.mount('#app');

