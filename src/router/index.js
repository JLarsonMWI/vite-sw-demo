import BasicInfo from "../views/BasicInfo.vue";
import BusinessName from "../views/BusinessName.vue";
import ContactInfo from "../views/ContactInfo.vue";
import OrderComplete from "../views/OrderComplete.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/basic-info",
      name: "BasicInfo",
      component: BasicInfo,
    },
    {
      path: "/contact-info",
      name: "ContactInfo",
      component: ContactInfo,
    },
    {
      path: "/business-name",
      name: "BusinessName",
      component: BusinessName,
    },
    {
      path: "/order-complete",
      name: "OrderComplete",
      component: OrderComplete,
    },
  ],
});

export default router;
