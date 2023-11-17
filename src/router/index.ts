import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";
import HomeView from "../views/HomeView.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RmaView from "@/views/RMA/RmaView.vue";
import RmaAddView from "@/views/RMA/RmaAddView.vue";
import RmaListView from "@/views/RMA/RmaListView.vue";
import RmaPageView from "@/views/RMA/RmaPageView.vue";
import DictionariresView from "@/views/RMA/DictionariesView.vue";
import WarehouseView from "@/views/Warehouse/WarehouseView.vue";
import ItemsView from "@/views/Warehouse/Items/ItemsView.vue";
import ChangeShelveView from "@/views/Warehouse/Items/ChangeShelve.vue";
import SparepartsView from "@/views/Warehouse/Spareparts/SparepartsView.vue";
import OrdersView from "@/views/Warehouse/Spareparts/OrdersView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logowanie",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/rma",
    name: "rma",
    component: RmaView,
    children: [
      {
        path: "items",
        name: "rmaList",
        components: {
          default: RmaView,
          innerView: RmaListView,
        },
      },
      {
        path: "add",
        name: "rmaAdd",
        components: {
          default: RmaView,
          innerView: RmaAddView,
        },
      },
      {
        path: "ticket/:id",
        name: "rmaPage",
        components: {
          default: RmaView,
          innerView: RmaPageView,
        },
      },
      {
        path: "dictionary/:name",
        name: "dictionary",
        components: {
          default: RmaView,
          innerView: DictionariresView,
        },
      },
    ],
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: WarehouseView,
    children: [
      {
        path: "items",
        name: "items",
        components: {
          default: WarehouseView,
          innerView: ItemsView,
        },
      },
      {
        path: "items/changeshelve",
        name: "itemsChangeShelve",
        components: {
          default: WarehouseView,
          innerView: ChangeShelveView,
        },
        props: true,
      },
      {
        path: "spareparts",
        name: "spareparts",
        components: {
          default: WarehouseView,
          innerView: SparepartsView,
        },
      },
      {
        path: "spareparts/orders",
        name: "sparepartsOrders",
        components: {
          default: WarehouseView,
          innerView: OrdersView,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !Cookies.get("authToken")) {
    return "/logowanie";
  }
});

export default router;
