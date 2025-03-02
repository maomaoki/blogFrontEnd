import {defineStore} from "pinia";
import {ref} from "vue";

/**
 *  组件 全局仓库
 */
export const componentStores = defineStore('component', () => {

    /**
     * 是否到达底部
     */
    const isArrive = ref<boolean>(false);


    /**
     * 获取 是否到达底部
     */
    function getIsArrive() {
        return isArrive.value;
    }


    /**
     * 设置 是否到达底部
     */
    function setIsArrive(is: boolean) {
        isArrive.value = is;
    }

    return {
        getIsArrive,
        setIsArrive
    }

})