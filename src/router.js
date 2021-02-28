import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("./views/Welcome/Welcome.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("./views/List/List.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("./views/New/New.vue"),
    },
    {
      path: "/expense/:expenseId/edit",
      name: "edit",
      component: () => import("./views/Edit/Edit.vue"),
      props: true,
    },
    {
      path: "/expense/:expenseId",
      name: "expense",
      component: () => import("./views/ExpenseDetail/ExpenseDetail.vue"),
      props: true,
    },
    {
      path: "/new-category",
      name: "new-category",
      component: () => import("./views/NewCategory/NewCategory.vue"),
      props: true,
    },
  ],
});

export default router;
