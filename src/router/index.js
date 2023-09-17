import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const SearchView = () => import("../views/SearchView.vue");
const LibraryView = () => import("../views/LibraryView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/search",
      component: SearchView,
    },
    {
      path: "/library",
      component: LibraryView,
    },
  ],
});

export default router;
