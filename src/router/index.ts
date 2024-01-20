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
import ChangeShelveView from "@/views/Warehouse/Items/ChangeShelveView.vue";
import SparepartsView from "@/views/Warehouse/Spareparts/SparepartsView.vue";
import OrdersView from "@/views/Warehouse/Spareparts/OrdersView.vue";
import CollectPackageView from "@/views/Warehouse/CollectPackages/CollectPackageView.vue";
import CollectPackagesCreateView from "@/views/Warehouse/CollectPackages/CollectPackagesCreateView.vue";
import CollectPackagesListView from "@/views/Warehouse/CollectPackages/CollectPackagesListView.vue";
import TaskMoveView from "@/views/Warehouse/Tasks/TaskMoveView.vue";
import AdminView from "@/views/Admin/AdminView.vue";
import AdminUsersView from "@/views/Admin/AdminUsersView.vue";
import AdminUserDetailsView from "@/views/Admin/AdminUserDetailsView.vue";
import decodeToken from "@/helpers/decodeToken";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    requiredRole?: string[];
    requiredModule?: string;
  }
}

const rmaRoles = ["Admin", "LS", "CC", "TECH"];
const rmaAddRoles = ["Admin", "CC", "TECH"];
const dictionaryRoles = ["Admin"];
const warehouseRoles = ["Admin", "LS", "TECH"];
const warehouseLSRoles = ["Admin", "LS"];
const adminRoles = ["Admin"];

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
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: {
      requiresAuth: true,
      requiredRole: adminRoles,
    },
    children: [
      {
        path: "users",
        name: "usersList",
        components: {
          default: AdminView,
          innerView: AdminUsersView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: adminRoles,
        },
      },
      {
        path: "users/:id",
        name: "userDetails",
        components: {
          default: AdminView,
          innerView: AdminUserDetailsView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: adminRoles,
        },
      },
    ],
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
      requiredModule: "warehouse",
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
          requiredModule: "warehouse",
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
          requiredModule: "warehouse",
        },
      },
      {
        path: "collect/add",
        name: "addCollectPackages",
        components: {
          default: WarehouseView,
          innerView: CollectPackagesCreateView,
        },
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
          requiredModule: "warehouse",
        },
      },
      {
        path: "collect/:id",
        name: "collectPackage",
        components: {
          default: WarehouseView,
          innerView: CollectPackageView,
        },
        props: true,
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
          requiredModule: "warehouse",
        },
      },
      {
        path: "collect",
        name: "collectPackagesList",
        components: {
          default: WarehouseView,
          innerView: CollectPackagesListView,
        },
        props: true,
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
          requiredModule: "warehouse",
        },
      },
      {
        path: "tasks/move",
        name: "taskMove",
        components: {
          default: WarehouseView,
          innerView: TaskMoveView,
        },
        props: true,
        meta: {
          requiresAuth: true,
          requiredRole: warehouseLSRoles,
          requiredModule: "warehouse",
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
          requiredModule: "spareparts",
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
          requiredModule: "spareparts",
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
  const warehouseModuleActive =
    JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;
  const sparepartsModuleActive =
    JSON.parse(process.env.VUE_APP_MODULE_SPAREPARTS) || false;

  if (to.meta.requiredModule) {
    if (to.meta.requiredModule === "warehouse" && !warehouseModuleActive) {
      return "/";
    }

    if (to.meta.requiredModule === "spareparts") {
      if (!warehouseModuleActive || !sparepartsModuleActive) {
        return "/";
      }
    }
  }

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
