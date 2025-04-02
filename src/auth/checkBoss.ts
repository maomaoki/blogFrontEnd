import {useUserStores} from "@/stores/useUserStores.ts";
import {UserRoleEnums} from "@/enums/userRoleEnums.ts";


/**
 * 校验 是否 为 boss(走到这里必须是登录的 只需要 区分 boss 与管理员就行了 )
 */
function checkBoss() {

    const userStore = useUserStores();
    const userInfo = userStore.getUserInfo();
    const userRole = userInfo.userRole;
    if (userRole) {
        return UserRoleEnums.BOSS === userRole;
    }
    return false
}

export default checkBoss;