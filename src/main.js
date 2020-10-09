import Vue from 'vue'
import * as firebase from 'firebase'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import { store } from './store'
import alertCmp from './components/shared/alert.vue'
import EditDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import editDateDialog from './components/Meetup/Edit/editMeetupDateDialog.vue'
import editTimeDialog from './components/Meetup/Edit/editMetupTimeDialog.vue'
import registerDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.config.productionTip = false
Vue.component('app-alert', alertCmp)
Vue.component('app-edit-dialog', EditDialog)
Vue.component('app-date-dialog', editDateDialog)
Vue.component('app-time-dialog', editTimeDialog)
Vue.component('register-dialog', registerDialog)

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
      storageBucket: "gs://devmeetup-3529a.appspot.com",
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }

}).$mount('#app')
