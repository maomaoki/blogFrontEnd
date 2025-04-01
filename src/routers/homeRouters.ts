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
                meta: {
                    navColorToBlack: true
                },
                component: () => import("@/page/home/articleCategoriesPage.vue")
            },
            {
                path: "/categories/:title",
                name: "分类列表",
                meta: {
                    navColorToBlack: true
                },
                component: () => import("@/page/home/articleCategoriesListPage.vue")
            },
            {
                path: "/tags",
                name: "标签",
                meta: {
                    navColorToBlack: true
                },
                component: () => import("@/page/home/articleTagPage.vue")
            },
            {
                path: "/tags/:title",
                name: "标签列表",
                meta: {
                    navColorToBlack: true
                },
                component: () => import("@/page/home/articleTagsListPage.vue")
            },
            {
                path: "/timer/:year/:month",
                name: "日期列表",
                meta: {
                    navColorToBlack: true
                },
                component: () => import("@/page/home/articleTimerListPage.vue")
            },
            {
                path: "/news",
                name: "新闻",
                component: () => import("@/page/home/newsPage.vue")
            },

        ]
    },

]

export default homeRouters;