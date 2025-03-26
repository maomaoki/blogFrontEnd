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
                meta: {
                    scrollNumber: 800
                },
                component: () => import("@/page/home/homePage.vue")
            },
            {
                path: "/article/:id",
                name: "文章",
                component: () => import("@/page/home/articlePage.vue")
            },
            {
                path: "/categories",
                name: "分类",
                meta:{
                    navColorToBlack:true
                },
                component: () => import("@/page/home/categoriesPage.vue")
            },
            {
                path: "/tags",
                name: "标签",
                meta:{
                    navColorToBlack:true
                },
                component: () => import("@/page/home/tagPage.vue")
            }
        ]
    },

]

export default homeRouters;