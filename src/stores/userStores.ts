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


    const setUserInfo = (user: API.UserVo) => {
        userInfo.value = user
    }

    const getUserInfo = () => {
        return userInfo.value;
    }

    return {
        userInfo,
        setUserInfo,
        getUserInfo
    }
})