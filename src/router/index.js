import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      name: "checkout",
      path: "/checkout",
      component: () => import("../views/CheckOut.vue"),
      meta: {
        title: "Checkout",
      },
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
