import {UserRoleEnums} from "@/enums/userRoleEnums.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import {userGetLoginInfoUsingGet} from "@/api/userController.ts";

/**
 * 校验 是否 为 管理员
 */
async function checkAdmin() {

    const result = await userGetLoginInfoUsingGet()
    if (result.data.code != 0) {
        // 未登录
        await message.error("未登录")
        // todo 这里可以操作
        await router.push("/login")
        return false
    }
    const userRole = result?.data?.data?.userRole
    if (userRole) {
        return UserRoleEnums.BOSS === userRole || UserRoleEnums.ADMIN === userRole;
    }

    return false


}

export default checkAdmin;