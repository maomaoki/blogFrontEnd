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
        name: '首页',
        component: () => import('@/page/admin/adminPage.vue'),
        redirect: "/admin/userManage",
        children: [
            {
                path: '/admin/userManage', // 用户管理
                name: '用户管理',
                component: () => import('@/page/admin/adminUserManagePage.vue'),
            }
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