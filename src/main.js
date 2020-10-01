import Vue from 'vue'
import * as firebase from 'firebase'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCEM7ZnXmq-cfRW_2ZcdWsdl8L9M1ncd24",
      authDomain: "devmeetup-3529a.firebaseapp.com",
      databaseURL: "https://devmeetup-3529a.firebaseio.com",
      projectId: "devmeetup-3529a",
      storageBucket: "devmeetup-3529a.appspot.com",
    })
  }
}).$mount('#app')
