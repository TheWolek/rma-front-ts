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
import decodeToken from "@/helpers/decodeToken";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    requiredRole?: string[];
  }
}

const rmaRoles = ["Admin", "LS", "CC", "TECH"];
const rmaAddRoles = ["Admin", "CC", "TECH"];
const dictionaryRoles = ["Admin"];
const warehouseRoles = ["Admin", "LS", "TECH"];
const warehouseLSRoles = ["Admin", "LS"];

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
    meta: {
      requiresAuth: true,
      requiredRole: rmaRoles,
    },
    children: [
      {
        path: "items",
        name: "rmaList",
        components: {
          default: RmaView,
          innerView: RmaListView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: rmaRoles,
        },
      },
      {
        path: "add",
        name: "rmaAdd",
        components: {
          default: RmaView,
          innerView: RmaAddView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: rmaAddRoles,
        },
      },
      {
        path: "ticket/:id",
        name: "rmaPage",
        components: {
          default: RmaView,
          innerView: RmaPageView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: rmaRoles,
        },
      },
      {
        path: "dictionary/:name",
        name: "dictionary",
        components: {
          default: RmaView,
          innerView: DictionariresView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: dictionaryRoles,
        },
      },
    ],
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: WarehouseView,
    meta: {
      requiresAuth: true,
      requiredRole: warehouseRoles,
    },
    children: [
      {
        path: "items",
        name: "items",
        components: {
          default: WarehouseView,
          innerView: ItemsView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
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
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
        },
      },
      {
        path: "spareparts",
        name: "spareparts",
        components: {
          default: WarehouseView,
          innerView: SparepartsView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: warehouseRoles,
        },
      },
      {
        path: "spareparts/orders",
        name: "sparepartsOrders",
        components: {
          default: WarehouseView,
          innerView: OrdersView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: warehouseRoles,
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

  if (to.meta.requiredRole) {
    const { userRole } = decodeToken();
    if (!userRole) {
      Cookies.remove("authToken");
      return "/logowanie";
    }
    const isAuthorized = to.meta.requiredRole.includes(userRole);

    if (!isAuthorized) {
      return "/";
    }
  }
});

export default router;
