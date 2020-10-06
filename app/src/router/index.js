import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cities",
    name: "Cities",
    component: function() {
      return import("../views/Cities.vue");
    }
  },
  {
    path: "/coordinates",
    name: "Coordinates",
    component: function() {
      return import("../views/Coordinates.vue");
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
