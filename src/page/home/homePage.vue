<template>

  <div id="homePage">
    <!--bg-->
    <homeBanner :banner-image="bannerImage"/>

    <div id="divide"></div>

    <now-time-news/>

    <div id="home-top">
      <home-top-container/>
    </div>

    <div class="layout">
      <div class="left">
        <category-bar-box/>

        <home-content-card/>

        <pagination/>
      </div>

      <div class="right">

        <card-info/>

        <sticky-layout/>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">

import NowTimeNews from "@/components/page/home/nowTimeNews.vue";
import HomeTopContainer from "@/components/page/home/homeTopContainer.vue";
import CategoryBarBox from "@/components/page/home/categoryBarBox.vue";
import HomeContentCard from "@/components/page/home/homeContentCard.vue";
import Pagination from "@/components/page/home/pagination.vue";
import CardInfo from "@/components/page/home/cardInfo.vue";
import StickyLayout from "@/components/page/home/stickyLayout.vue";
import HomeBanner from "@/components/page/home/homeBanner.vue";
import {onMounted, ref} from "vue";
import {getBannerPictureUsingGet} from "@/api/systemController.ts";
import {message} from "ant-design-vue";


/**
 *  背景图
 */
const bannerImage = ref<string>("")

/**
 *  获取 背景图
 */
async function getBannerImage() {
  const result = await getBannerPictureUsingGet();
  if (result.data.code != 0) {
    message.error("获取banner错误: " + result.data.msg);
    return
  }
  bannerImage.value = result.data.data as string;
}


/**
 * 组件挂载后加载数据
 */
onMounted(() => {
  getBannerImage()
})

</script>


<style lang="less">
#homePage {

  #home-top {
    margin: 0 auto 0;
    padding: 0 1.5rem 0;
    max-width: 1400px;
    width: 100%;
    animation: slide-in .6s .1s backwards;
    overflow: hidden;

  }

  #divide{
    width: 100%;
    height: 50px;
    margin-bottom: 30px;

  }

  .layout {
    max-width: 1400px;
    display: flex;
    box-flex: 1;
    flex: 1 auto;
    margin: 0 auto;
    padding: 1.25rem 1.5rem;
    width: 100%;
    justify-content: center;

    .left {
      width: calc(100% - 300px);
      -webkit-transition: all .3s ease 0s;
      -moz-transition: all .3s ease 0s;
      -o-transition: all .3s ease 0s;
      -ms-transition: all .3s ease 0s;
      transition: all .3s ease 0s;

    }

    .right {

      width: 300px;
      -webkit-animation: slide-in .6s .3s backwards;
      -moz-animation: slide-in .6s .3s backwards;
      -o-animation: slide-in .6s .3s backwards;
      -ms-animation: slide-in .6s .3s backwards;
      animation: slide-in .6s .3s backwards;


    }


    @media screen and (min-width: 1201px) {
      .left {
        -ms-flex-line-pack: start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
        display: flex;
        -webkit-box-lines: multiple;
        -moz-box-lines: multiple;
        -o-box-lines: multiple;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -moz-box-pack: justify;
        -o-box-pack: justify;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      }
    }

    @media screen and (min-width: 1200px) {
      .right {
        padding-left: 15px;
      }
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>