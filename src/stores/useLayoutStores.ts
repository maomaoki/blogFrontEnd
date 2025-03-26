import {defineStore} from "pinia";
import {ref} from "vue";

/**
 *  layout 全局仓库
 */
export const useLayoutStores = defineStore('layout', () => {

    /**
     * blog信息存储
     */
    const blogSystemInfo = ref<API.BlogSystemInfoVo>({})


    /**
     * 获取 blog信息 存储
     */
    function getBlogSystemInfo() {
        return blogSystemInfo.value
    }

    /**
     * 设置 blog 信息 存储
     */
    function setBlogSystemInfo(data: API.BlogSystemInfoVo) {
        blogSystemInfo.value = data;
    }


    return {
        blogSystemInfo,
        getBlogSystemInfo,
        setBlogSystemInfo,
    }

})