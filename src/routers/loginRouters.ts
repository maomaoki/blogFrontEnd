import type {RouteRecordRaw} from "vue-router";

/**
 *  登录 路由
 */
const loginRouters: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/page/login/loginPage.vue")
    }
]

export default loginRouters;