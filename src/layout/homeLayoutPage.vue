<template>

  <div id="homeLayoutPage">

    <!--导航-->
    <NavLayoutBox/>

    <!--路由-->
    <div id="main">
      <router-view/>
    </div>

    <!--底部-->
    <FooterLayout/>


    <!--右边功能按钮-->
    <right-side-layout/>
  </div>

</template>
<script setup lang="ts">
import NavLayoutBox from "@/components/layout/navLayout.vue"
import FooterLayout from "@/components/layout/footerLayout.vue";
import RightSideLayout from "@/components/layout/rightSideLayout.vue";
import {onMounted, onUpdated} from "vue";
import {getBlogSystemInfoUsingGet} from "@/api/blogSystemController.ts";
import {message} from "ant-design-vue";
import {useLayoutStores} from "@/stores/useLayoutStores.ts";

const {setBlogSystemInfo} = useLayoutStores()

/**
 * 这里 请求 获取 blog 系统 信息
 */
onMounted(async () => {
  const result = await getBlogSystemInfoUsingGet()
  if (result.data.code != 0) {
    message.error("获取系统信息错误!")
    return
  }
  // 塞入 全局 仓库里面
  //@ts-ignore
  setBlogSystemInfo(result.data.data)

})


</script>

<style lang="less">
#homeLayoutPage {
}
</style>