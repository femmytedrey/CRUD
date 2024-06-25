import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("../components/HomePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "SignUp",
    path: "/sign-up",
    component: () => import("../components/SignUp.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../components/LoginPage.vue"),
  },
  {
    name: "AddPage",
    path: "/add",
    component: () => import("../components/AddPage.vue"),
  },
  {
    name: "UpdatePage",
    path: "/update/:id",
    component: () => import("../components/UpdatePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
