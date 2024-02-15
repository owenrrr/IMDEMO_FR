import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import store from './store'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import {setObj} from './refresh.js'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Antd)

// Store state in localStorage before unload
window.addEventListener("beforeunload", () =>{
  console.log("refresh");
  setObj('store', store.state);
})

new Vue({
  el: "#app",
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
