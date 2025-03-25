import router from "@/routers";
import {useUserStores} from "@/stores/userStores.ts";
import {UserRoleEnums} from "@/enums/userRoleEnums.ts";
import {message} from "ant-design-vue";

let isFirst = true;


/**
 * 路由权限校验
 */
//@ts-ignore
router.beforeEach(async (to, from, next) => {

    // 1.校验 是否需要登录
    const fullPath = to.fullPath;
    if (!fullPath.startsWith("/admin")) {
        next();
        return;
    }

    const {getUserInfo, setUserInfo} = useUserStores();


    // 2.是否第一次进入页面
    if (isFirst) {
        // 如果 是就需要请求个人信息
        const isLogin = await setUserInfo();
        if (!isLogin) {
            message.error("未登录");
            await router.push("/login");
        }
        isFirst = false;
    }
    // 3.校验是否需要管理员权限
    if (to.meta.authAdmin) {
        // 需要权限
        const userRole = getUserInfo().userRole;
        if (UserRoleEnums.BOSS === userRole || UserRoleEnums.ADMIN === userRole) {
            next();
        } else {
            message.error("没有权限");
            // todo 到没有权限提示页面
            await router.push("/admin/home")
        }
    } else {
        // 4. 放行
        next();
    }


})

