import {userGetLoginInfoUsingGet} from "@/api/userController.ts";
import {useUserStores} from "@/stores/userStores.ts";


/**
 *  用户 是否 登录 并且 存入全局 仓库
 */
export async function userIsLogin() {
    const {setUserInfo} = useUserStores();
    const result = await userGetLoginInfoUsingGet();
    if (result.data.code != 0) {
        return null;
    }
    if (result.data.data) {
        setUserInfo(result.data.data);
    }
    return result.data.data;
}

