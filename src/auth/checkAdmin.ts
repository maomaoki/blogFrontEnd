import {useUserStores} from "@/stores/useUserStores.ts";
import {UserRoleEnums} from "@/enums/userRoleEnums.ts";
import {message} from "ant-design-vue";
import router from "@/routers";

/**
 * 校验 是否 为 管理员
 */
async function checkAdmin() {

    const userStore = useUserStores();
    const userInfo = userStore.getUserInfo();
    const userRole = userInfo.userRole;
    if (userRole) {
        return UserRoleEnums.BOSS === userRole || UserRoleEnums.ADMIN === userRole;
    } else {
        // 未登录
        await message.error("未登录")
        // todo 这里可以操作
        await router.push("/login")
        return false;
    }

}

export default checkAdmin;