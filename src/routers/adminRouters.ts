import type {RouteRecordRaw} from "vue-router";


/**
 * 后台页面 路由
 */
const adminRouters: RouteRecordRaw[] = [
    {
        path: '/admin',
        name: 'admin',
        meta: {
            title: "admin"
        },
        component: () => import('@/page/admin/adminPage.vue'),
        redirect: "/admin/home",
        children: [
            {
                path: '/admin/home',
                name: '首页',
                meta: {
                    title: "首页"
                },
                component: () => import('@/page/admin/adminHomePage.vue'),
            },
            {
                path: '/admin/userManage',
                name: '用户管理',
                meta: {
                    title: "用户管理",
                    authAdmin: true
                },
                component: () => import('@/page/admin/adminUserManagePage.vue'),
            },
            {
                path: '/admin/pictureManage',
                name: '图片管理',
                meta: {
                    title: "图片管理",
                    authAdmin: true
                },
                component: () => import('@/page/admin/adminPictureManagePage.vue'),
            },
            {
                path: '/admin/adminArticleManage',
                name: '文章管理',
                meta: {
                    title: "文章管理",
                    authAdmin: true
                },
                component: () => import('@/page/admin/adminArticleManagePage.vue'),
            },
            {
                path:"/admin/article/edit/:id",
                name:"编辑文章",
                meta: {
                    title: "编辑文章",
                    authAdmin: true
                },
                component: () => import('@/page/admin/edit/adminEditArticlePage.vue'),
            },
            {
                path:"/admin/article/add",
                name:"添加文章",
                meta: {
                    title: "添加文章",
                    authAdmin: true
                },
                component: () => import('@/page/admin/add/adminAddArticlePage.vue'),
            },
            {
                path: '/admin/adminUserInfo',
                name: '个人信息',
                meta: {
                    title: "个人信息"
                },
                component: () => import('@/page/admin/adminUserInfoPage.vue'),
            },
            {
                path: '/admin/userEdit',
                name: '修改信息',
                meta: {
                    title: "修改信息"
                },
                component: () => import('@/page/admin/edit/adminEditUserInfoPage.vue'),
            },
        ],
    },

]


export default adminRouters;