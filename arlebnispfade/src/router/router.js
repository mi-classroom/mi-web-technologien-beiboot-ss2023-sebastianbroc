// src/router.js (Vue CLI 1.x & 2.x) oder src/router/index.js (Vue CLI 3.x oder neuer)

import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import ar from "../views/AR.vue";
import Browse from "../views/Browse.vue";
import Start from "../views/Start.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/ar",
      name: "ar",
      component: ar
    },
    {
      path: "/browse",
      name: "browse",
      component: Browse
    },{
      path: "/start",
      name: "start",
      component: Start
    }
  ]
});
