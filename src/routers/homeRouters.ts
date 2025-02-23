import type {RouteRecordRaw} from "vue-router";

/**
 *  页面 路由
 */
const homeRouters: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: "/home",
        component: () => import("@/layout/homeLayoutPage.vue"),
        children: [
            {
                path: "/home",
                name: "主页",
                component: () => import("@/page/home/homePage.vue")
            }
        ]
    }
]

export default homeRouters;