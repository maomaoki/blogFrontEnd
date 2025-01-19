import type {RouteRecordRaw} from "vue-router";
import router from "@/routers/index.ts";
import {getLoginUserUsingGet} from "@/api/userController.ts";
import {message} from "ant-design-vue";

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
                    title: "用户管理"
                },
                component: () => import('@/page/admin/adminUserManagePage.vue'),
            },
            {
                path: '/admin/adminArticleManage',
                name: '文章管理',
                meta: {
                    title: "文章管理"
                },
                component: () => import('@/page/admin/adminArticleManagePage.vue'),
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
                component: () => import('@/page/admin/adminEditUserInfoPage.vue'),
            },
        ],
        // @ts-ignore
        beforeEnter: async (to, from) => {

            // 1. 校验 是否登录
            const result = await getLoginUserUsingGet();
            if (result.data.code !== 0) {
                // 没有登录
                message.error("没有登录,请登录!")
                // 2. 没有就返回
                router.push('login')
                return
            }

            // 3. 这里先自动放行


            // 4. todo 后面需要权限校验


        },
    }

]


export default adminRouters;