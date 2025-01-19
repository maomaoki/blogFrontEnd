import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import loginRouters from "@/routers/loginRouters.ts";
import adminRouters from "@/routers/adminRouters.ts";
const routes: RouteRecordRaw[] = [...loginRouters,...adminRouters]

/**
 *  路由 配置
 */
const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;