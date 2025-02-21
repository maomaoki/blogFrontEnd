import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import loginRouters from "@/routers/loginRouters.ts";
import adminRouters from "@/routers/adminRouters.ts";
import homeRouters from "@/routers/homeRouters.ts";
const routes: RouteRecordRaw[] = [...loginRouters,...adminRouters,...homeRouters]

/**
 *  路由 配置
 */
const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;