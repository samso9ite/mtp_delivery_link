import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps"
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueOtp2 from 'vue-otp-2';
// import NProgress from 'vue-nprogress'

var VueTruncate = require('vue-truncate-filter')
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAFbHM1j8bJmZ5cqqyFM48HkKMAldFq6qc",
    libraries: "places",
  },
}).use(PerfectScrollbar).use(VueOtp2).use(VueTruncate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
