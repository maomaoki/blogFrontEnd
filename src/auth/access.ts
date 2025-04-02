import router from "@/routers";
import {useUserStores} from "@/stores/useUserStores.ts";
import {UserRoleEnums} from "@/enums/userRoleEnums.ts";
import {message} from "ant-design-vue";

let isFirst = true;


/**
 * 路由权限校验
 */
//@ts-ignore
router.beforeEach(async (to, from, next) => {
    const {getUserInfo, setUserInfo} = useUserStores();
    // todo 这里 刷新登录状态
    await setUserInfo()

    // 1.校验 是否需要登录
    const fullPath = to.fullPath;
    if (!fullPath.startsWith("/admin")) {
        next();
        return;
    }

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

    // 是否需要 最高权限
    if (to.meta.authBoss) {
        // 需要权限
        const userRole = getUserInfo().userRole;
        if (UserRoleEnums.BOSS === userRole) {
            next();
            return
        }
        message.error("没有权限,需要最高权限");
        // todo 到没有权限提示页面
        await router.push("/admin/home")
        return
    }


    // 3.校验是否需要管理员权限
    if (to.meta.authAdmin) {
        // 需要权限
        const userRole = getUserInfo().userRole;
        if (UserRoleEnums.BOSS === userRole || UserRoleEnums.ADMIN === userRole) {
            next();
            return
        }
        message.error("没有权限");
        // todo 到没有权限提示页面
        await router.push("/admin/home")
        return
    }

    // 4. 放行
    next();

})

