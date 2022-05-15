import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store';
import mitt from 'mitt';

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// @ts-ignore
import { fas } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/views/Modal.vue'


library.add(fas)

const emitter = mitt();

const app = createApp(App)
    .component('fa', FontAwesomeIcon)
    .component('fal', FontAwesomeLayers)
    .component('fat', FontAwesomeLayersText)
    .component('Modal', Modal)
    .use(store)
    .use(router)

app.config.globalProperties.emitter = emitter;

app.mount('#app');

