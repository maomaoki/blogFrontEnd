import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import loginRouters from "@/routers/loginRouters.ts";

const routes: RouteRecordRaw[] = [...loginRouters]

/**
 *  路由 配置
 */
const router: Router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;