import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Customers from '../views/Customers.vue';
import Leads from '../views/leads.vue';
import Register from '../views/Register.vue';
import Users from '../views/Users.vue';

import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "defaultLayout",
      },
    },
    {
      path: "/leads",
      name: "leads",
      component: Leads,
      meta: {
        layout: "defaultLayout",
      },
    },
    {
      path: "/customers",
      name: "customers",
      component: Customers,
      meta: {
        layout: "defaultLayout",
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        layout: "defaultLayout",
      },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        layout: "defaultLayout",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        layout: "authLayout",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/email-verified"];
  const isPublic = publicPages.includes(to.path);

  const userStore = useUserStore();
  const loggedIn = userStore.isLogged;

  try {
    if (isPublic) {
      // Si la ruta es publica debe ir a la ruta
      return next();
    } else if (loggedIn) {
      // Si esta loggeado el usuario ir a la ruta solicitada
      return next();
    } else {
      // Si NO esta logueado debe ir al login
      return next({ name: "login" });
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
