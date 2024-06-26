import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

app.use(router)
app.use(createPinia())
app.use(vuetify)

app.mount('#app')