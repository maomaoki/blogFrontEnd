import {defineStore} from "pinia";
import {ref} from "vue";

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
    const setUserInfo = (info: API.UserVo) => {
        userInfo.value = info
    }

    /**
     * 获取 个人登录信息
     */
    const getUserInfo = () => {
        return userInfo.value;
    }


    return {
        userInfo,
        setUserInfo,
        getUserInfo
    }
})