import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductAdd from "@/views/product/add.vue";
import ProductIndex from "@/views/product/index.vue";
import { useGlobleStore } from "@/stores/globle";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/product",
      name: "product",
      redirect: "/product/index",
      children: [
        {
          path: "add",
          name: "productAdd",
          component: ProductAdd,
        },
        {
          path: "index",
          name: "productIndex",
          component: ProductIndex,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const globalStore = useGlobleStore();
  if (!globalStore.company) {
    await globalStore.getCompanyInfo();
  }
});
// console.log("before");
// next({ path: "product/add" });

export default router;
