import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import LoadScript from 'vue-plugin-load-script'
import HeaderComp from "./components/HeaderComp";
Vue.component('HeaderComp', HeaderComp);

Vue.config.productionTip = false
Vue.use(LoadScript);

Vue.loadScript("https://unpkg.com/three@0.126.0/build/three.js")
.then(() => {
  Vue.loadScript("https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js")
  .then(() => {
    Vue.loadScript("webxr-geospatial.js")
    .then(() => {
      new Vue({
        router,
        render: h => h(App),
      }).$mount('#app')
    })
  })
})
