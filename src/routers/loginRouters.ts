import type {RouteRecordRaw} from "vue-router";

/**
 *  登录 路由
 */
const loginRouters: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            path:"/login"
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/page/login/loginPage/loginPage.vue")
    }
]

export default loginRouters;