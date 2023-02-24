import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ListPersonagens from "../components/ListPersonagens.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "list",
    component: ListPersonagens,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
