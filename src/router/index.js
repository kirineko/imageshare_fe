import { createRouter, createWebHashHistory } from "vue-router";

const layout = () => import("../view/index.vue");
const scrolling = () => import("../components/Scrolling.vue");
const home = () => import("../components/Home.vue");
const navmenu = () => import("../components/NavMenu.vue");

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/Scrolling",
        name: "Scrolling",
        component: scrolling,
      },
      {
        path: "/Scrolling-upload",
        name: "Scrolling-upload",
        component: home,
      },
      {
        path: "/Scrolling-all",
        name: "Scrolling-all",
        component: home,
      },
    ],
  },
  {
    path: "/NavMenu",
    name: "NavMenu",
    component: navmenu,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
