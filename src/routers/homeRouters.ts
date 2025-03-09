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
                meta:{
                    scrollNumber:800
                },
                component: () => import("@/page/home/homePage.vue")
            },
            {
                path:"/article/:id",
                name:"文章",
                component:()=>import("@/page/home/articlePage.vue")
            }
        ]
    },

]

export default homeRouters;