import {defineStore} from "pinia";
import {ref} from "vue";
import {userGetLoginInfoUsingGet} from "@/api/userController.ts";

/**
 *  用户 全局仓库
 */
export const useUserStores = defineStore('user', () => {

    /**
     *  用户 个人 信息
     */
    const userInfo = ref<API.UserVo>({})

    /**
     *  请求 设置个人信息
     */
    const setUserInfo = async () => {
        const result = await userGetLoginInfoUsingGet();
        if (result.data.code != 0) {
            userInfo.value = {}
            return false;
        }

        // @ts-ignore
        userInfo.value = result.data.data;
        return true;
    }

    /**
     * 获取 个人登录信息
     */
    const getUserInfo = () => {
        return userInfo.value;
    }

    /**
     * 清空 个人登录信息
     */
    const cleanUserInfo = () => {
        userInfo.value = {}
    }


    return {
        userInfo,
        setUserInfo,
        getUserInfo,
        cleanUserInfo
    }
})