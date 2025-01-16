import type {RouteRecordRaw} from "vue-router";

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
        ]
    }

]

export default adminRouters;