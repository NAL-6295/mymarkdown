import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuex);
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
})
