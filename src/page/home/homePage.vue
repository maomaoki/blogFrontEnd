<template>

  <div id="homePage">
    <!--bg-->
    <div id="home-banner">

      <div class="banner-box">

        <img src="http://localhost:9999/api/images/other/1886398346918039554/e56db5c1ecfd48408e78e316eee398d8.jpg"
             alt="背景">
      </div>

      <div class="banner-info">
        <h1>
          <span>云猫博客</span>
        </h1>
        <div class="printer">
          <div>

          </div>
          <h3><span class="cursor">|</span></h3>
        </div>
        <div id="bannerWave1"></div>
        <div id="bannerWave2"></div>
        <i class="iconfont icon-xiangxia down">

        </i>
      </div>
    </div>

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
</script>


<style lang="less">
#homePage {

  #home-banner {

    .banner-box {
      animation: 2s ease 0s 1 normal none running header-effect;
      height: 50vh;
      width: 100vw;
      position: fixed;
      z-index: -1;

      &:before {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
        content: "";
      }

      img {
        vertical-align: top;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

    }

    .banner-info {
      height: 50vh;
      display: flex;
      flex-direction: column;
      position: relative;
      user-select: none;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      animation-name: hideToShow;

      h1 {
        color: var(--white);
        font-size: 40px;
      }

      .printer {
        cursor: pointer;
        color: var(--white);
        background: var(--translucent);
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;

        h3 {
          display: block;
          font-size: 1.17em;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
          unicode-bidi: isolate;
        }

        .cursor {
          margin-left: 1px;
          -webkit-animation: hideToShow .7s infinite;
          animation: hideToShow .7s infinite;
          font-weight: 200;
        }

      }

      .down {
        font-size: 40px;
        font-weight: 700;
        color: var(--white);
        position: absolute;
        bottom: 60px;
        -webkit-animation: my-shake 1.5s ease-out infinite;
        animation: my-shake 1.5s ease-out infinite;
        z-index: 15;
        cursor: pointer;
      }

      #bannerWave1 {
        position: absolute;
        bottom: 0;
        -webkit-animation: gradientBG 120s linear infinite;
        animation: gradientBG 120s linear infinite;
        height: 84px;
        background: var(--bannerWave1);
        width: 200%;
        z-index: 10;
      }

      #bannerWave2 {
        height: 100px;
        background: var(--bannerWave2);
        width: 400%;
        z-index: 5;
        position: absolute;
        bottom: 0;
        -webkit-animation: gradientBG 120s linear infinite;
        animation: gradientBG 120s linear infinite;
      }

    }


    @keyframes header-effect {
      0% {
        opacity: 0;
        transform: translateY(-50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes gradientBG {
      0% {
        background-position: 0 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }

    @keyframes hideToShow {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes my-shake {
      0% {
        opacity: 1;
        transform: translateY(0);
      }

      30% {
        opacity: .5;
        transform: translateY(25px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  #home-top {
    margin: 0 auto 0;
    padding: 0 1.5rem 0;
    max-width: 1400px;
    width: 100%;
    animation: slide-in .6s .1s backwards;
    overflow: hidden;

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