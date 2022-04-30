import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/Home.view.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/launches",
    name: "Launches",
    // route level code-splitting
    // this generates a separate chunk (launches.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "launches" */ "../views/Launches.view.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    document.title = `${String(to.name)} ${
      to.params.title ? " - " + String(to.params.title) : ""
    } | ${process.env.VUE_APP_TITLE}`;

    next();
  }
);

export default router;
