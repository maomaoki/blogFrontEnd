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
     * 中控 遮罩 显示
     */
    const isShowCentralControl = ref<boolean>(false);


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


    /**
     * 获取 中控 遮罩 显示
     */
    function getIsShowCentralControl() {
        return isShowCentralControl.value;
    }

    /**
     * 设置 中控 遮罩 显示
     */
    function setIsShowCentralControl(is: boolean) {
        isShowCentralControl.value = is;
    }


    return {
        getIsArrive,
        setIsArrive,
        getIsShowCentralControl,
        setIsShowCentralControl
    }

})