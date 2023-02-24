import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ListPersonagens from "../components/ListPersonagens.vue";
import EditCharacters from "../components/editCharacters.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "list",
    component: ListPersonagens,
  },
  {
    path: "/character/:id",
    name: "details",
    component: EditCharacters,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
