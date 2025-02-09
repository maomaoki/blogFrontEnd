import {defineStore} from "pinia";
import {ref} from "vue";
import {userGetLoginInfoUsingGet} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";

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
        if (result.data.code !== 0) {
            message.error("未登录")
            // todo 这里偶联了
            await router.push("/login")
            return;
        }

        if (result.data.data) {
            userInfo.value = result.data.data;
        } else {
            await router.push("/login")
            return;
        }

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