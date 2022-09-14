import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductRecord from "@/views/product/record.vue";
import ProductIndex from "@/views/product/index.vue";
import ProductList from "@/views/product/list.vue";
import ProductInStore from "@/views/product/inStore.vue";
import ProductOutStore from "@/views/product/outStore.vue";
import ProductDetail from "@/views/product/detail.vue";
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
          path: "record",
          name: "productRecord",
          component: ProductRecord,
        },
        {
          path: "index",
          name: "productIndex",
          component: ProductIndex,
        },
        {
          path: "inStore/:eTag",
          name: "productInStore",
          component: ProductInStore,
          props: true,
        },
        {
          path: "outStore/:eTag",
          name: "productOutStore",
          component: ProductOutStore,
          props: true,
        },
        {
          path: "list/:type",
          name: "productList",
          component: ProductList,
          props: true,
        },
        {
          path: "detail/:eTag",
          name: "productDetail",
          component: ProductDetail,
          props: true,
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
      redirect: "/product",
      // component: HomeView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const globalStore = useGlobleStore();
  if (!globalStore.company?.uscc) {
    await globalStore.getCompanyInfo();
  }
});
// console.log("before");
// next({ path: "product/add" });

export default router;
