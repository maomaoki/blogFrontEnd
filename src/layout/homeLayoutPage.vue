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
    <right-side-layout />
  </div>

</template>
<script setup lang="ts">
import NavLayoutBox from "@/components/layout/navLayout.vue"
import FooterLayout from "@/components/layout/footerLayout.vue";
import RightSideLayout from "@/components/layout/rightSideLayout.vue";


</script>

<style lang="less">
#homeLayoutPage {
}
</style>