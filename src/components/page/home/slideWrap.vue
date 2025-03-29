<template>
  <div id="slideWrap">
    <div class="random-banner">

      <div class="banner-title">
        <div class="banner-title-big"
             v-if="getBlogSystemInfo()?.slideWrapTitle !== undefined"
             v-for="item in getBlogSystemInfo()?.slideWrapTitle?.split('。')">
          {{ item }}
        </div>
        <div class="banner-title-small">{{ getBlogSystemInfo().slideWrapUrl }}</div>
      </div>

      <div class="skills-tags-group-all">

        <div class="tags-group-wrapper">

          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background: #222">
              <img :src="reactIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #2c51db">
              <img :src="h3Icon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background: #2e3a41">
              <img :src="paIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #fff">
              <img :src="piniaIcon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#f7cb4f">
              <img :src="jsIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #e9572b">
              <img :src="h5Icon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#57b6e6">
              <img :src="dockerIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #fff">
              <img :src="javaIcon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#e65164">
              <img :src="apiFoxIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #df5b40">
              <img :src="juIcon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#4082c3">
              <img :src="psIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #333">
              <img :src="nodeIcon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#937df7">
              <img :src="viteIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #b8f0ae">
              <img :src="vueIcon" alt="">
            </div>
          </div>
          <div class="tags-group-icon-pair">
            <div class="tags-group-icon" style="background:#fff">
              <img :src="pythonIcon" alt="">
            </div>
            <div class="tags-group-icon" style="background: #4499e4">
              <img :src="flutterIcon" alt="">
            </div>
          </div>

        </div>
      </div>

      <div class="random-hover">

        <i class="iconfont icon-feiji"></i>

        <div class="bannerText">
          随便逛逛
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </div>
    </div>
    <div class="categoryGroup">

      <div class="categoryItem">

        <div class="c-button blue" @click="()=>router.push('/categories/' + articleCategoryList[0])">

          <span>{{ articleCategoryList[0] }}</span>
          <i class="iconfont icon-a-30"></i>
        </div>

      </div>
      <div class="categoryItem" @click="()=>router.push('/categories/' + articleCategoryList[1])">

        <div class="c-button red">
          <span>{{ articleCategoryList[1] }}</span>
          <i class="iconfont icon-kapianrehuo"></i>
        </div>

      </div>
      <div class="categoryItem" @click="()=>router.push('/categories/' + articleCategoryList[2])">

        <div class="c-button green">
          <span>{{ articleCategoryList[2] }}</span>
          <i class="iconfont icon-tushu"></i>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import piniaIcon from "@/assets/images/pair/pinia-logo.svg"
import dockerIcon from "@/assets/images/pair/docker.png"
import h3Icon from "@/assets/images/pair/h3.png"
import apiFoxIcon from "@/assets/images/pair/Apifox.webp"
import h5Icon from "@/assets/images/pair/h5.png"
import flutterIcon from "@/assets/images/pair/Flutter.png"
import javaIcon from "@/assets/images/pair/java.jpg"
import jsIcon from "@/assets/images/pair/js.png"
import juIcon from "@/assets/images/pair/ju.png"
import nodeIcon from "@/assets/images/pair/node-logo.svg"
import paIcon from "@/assets/images/pair/pa.png"
import psIcon from "@/assets/images/pair/ps.png"
import pythonIcon from "@/assets/images/pair/python.png"
import viteIcon from "@/assets/images/pair/vite-logo.svg"
import vueIcon from "@/assets/images/pair/vue-logo.png"
import reactIcon from "@/assets/images/pair/react.svg"
import {onMounted, ref} from "vue";
import {getArticleCategoryListUsingGet} from "@/api/articleController.ts";
import router from "@/routers";
import {useLayoutStores} from "@/stores/useLayoutStores.ts";


const articleCategoryList = ref<string[]>([
  "前端",
  "后端",
  "测试"
])

/**
 * 获取 系统信息
 */
const {getBlogSystemInfo} = useLayoutStores()

/**
 * 获取 分类 前三最多的
 */
onMounted(async () => {
  const result = await getArticleCategoryListUsingGet()
  if (result.data.code != 0) {
    // message.error("获取文章分类失败")
    return
  }

  // @ts-ignore
  // 降级处理
  if (result.data?.data.length < 3) articleCategoryList.value = result.data.data?.map(item => item.name)

  // @ts-ignore
  // 排序
  articleCategoryList.value = result.data.data.sort((a, b) => b.count - a.count).map(item => item.name).slice(0, 3)

})


</script>


<style lang="less">
#slideWrap {
  width: calc(100% - 600px - 2rem);
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .random-banner {
    display: flex;
    width: 100%;
    height: 76%;
    background: #fff;
    margin-bottom: .5rem;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;
    cursor: pointer;
    will-change: transform;

    .banner-title {
      animation: slide-in .6s .3s backwards;
      top: 2.9rem;
      left: 3rem;
      position: absolute;
      display: flex;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -o-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;

      .banner-title-big {
        font-size: 36px;
        line-height: 1;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .banner-title-small {
        font-size: 12px;
        line-height: 1;
        color: rgba(60, 60, 67, 0.8);
        margin-top: 8px;
        margin-bottom: .5rem;
      }
    }

    .skills-tags-group-all {
      display: flex;
      transition: .3s;
      -webkit-transform: rotate(-30deg);
      -moz-transform: rotate(-30deg);
      -o-transform: rotate(-30deg);
      -ms-transform: rotate(-30deg);
      transform: rotate(-30deg);

      .tags-group-wrapper {
        margin-top: 7rem;
        display: flex;
        flex-wrap: nowrap;
        animation: rowup 60s linear infinite;

        .tags-group-icon-pair {
          margin-left: 1rem;

          .tags-group-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 66px;
            font-weight: 700;
            box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
            width: 120px;
            height: 120px;
            border-radius: 30px;

            img {
              border-style: none;
              border-radius: 8px;
              max-width: 100%;
              transition: all .2s ease 0s;
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              -ms-user-drag: none;
              user-drag: none;
              width: 60px;
              margin: 0 auto !important;
            }

            &:nth-child(even) {
              margin-top: 1rem;
              transform: translate(-60px);
            }
          }
        }

        @keyframes rowup {
          0% {
            transform: translateX(0)
          }

          100% {
            transform: translateX(-50%)
          }
        }
      }
    }

    .random-hover {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #425aef;
      color: #fff;
      padding-left: .5rem;
      display: flex;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -o-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -moz-box-pack: center;
      -o-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      -webkit-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
      -moz-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
      -o-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
      -ms-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
      transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
      font-size: 60px;

      i {
        font-size: 80px;
        margin-left: 10px;
        line-height: 1;
      }

      .bannerText {
        display: flex;
        align-items: center;

      }

    }

    &:hover {
      -webkit-box-shadow: 0 8px 12px -3px #425aef23;
      box-shadow: 0 8px 12px -3px #425aef23;

    }

    &:hover .random-hover {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      padding-left: 2rem;
      background: #425aefdd;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -o-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transform-style: preserve-3d;
      -moz-transform-style: preserve-3d;
      -o-transform-style: preserve-3d;
      -ms-transform-style: preserve-3d;
      transform-style: preserve-3d;
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -o-transition: .3s;
      -ms-transition: .3s;
      transition: .3s;
      background-size: 200%;
      cursor: pointer;
    }


  }

  .categoryGroup {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 200px;
    height: 24%;
    width: 100%;
    animation: slide-in .6s .3s backwards;

    .categoryItem {
      overflow: hidden;
      transform: scale(1);
      transition: all .8s cubic-bezier(.65, .15, .37, 1.19);
      height: 100%;
      border-radius: 12px;
      width: calc(100% / 3 - .33rem);
      margin-right: .5rem;


      &:hover {
        width: 50%;
      }

      &:hover .c-button i {
        opacity: .8;
        transition: .8s;
        transition-delay: .15s;
        transform: scale(1.03);
        font-size: 2.5rem;
        filter: blur(0);
        top: 15%;
      }


      .c-button {
        height: 100%;
        width: 100%;
        background: #fff;
        border-radius: 12px;
        display: inline-block;
        text-align: left;
        line-height: 4em;
        font-weight: 700;
        font-size: 1.1rem;
        color: #fff;
        transition: all .8s cubic-bezier(.39, .575, .565, 1);
        transform: scale(1);
        overflow: hidden;
        font-family: inherit;
        cursor: pointer;

        span {
          padding-left: 21px;
        }

        i {
          font-size: 5rem;
          opacity: .2;
          position: absolute;
          right: 0;
          top: 20%;
          transition: .3s;
          width: 100px;
          text-align: center;
          filter: blur(2px);
          transform: scale(1) rotate(15deg);
        }

        &:after {
          top: 47px;
          width: 1rem;
          left: 21px;
          height: 2px;
          background: #fff;
          content: "";
          border-radius: 1px;
          position: absolute;
        }
      }

      .blue {
        background: linear-gradient(to right, #358bff, #15c6ff);
        background-size: 200%;
      }

      .red {
        background: linear-gradient(to right, #f65, #ffbf37);
        background-size: 200%;
      }

      .green {
        background: linear-gradient(to right, #18e7ae, #1eebeb);
        background-size: 200%;
      }

      &:nth-child(1) {
        box-shadow: 0 8px 12px -3px rgba(40, 109, 234, 0.2);
      }

      &:nth-child(2) {
        box-shadow: 0 8px 12px -3px rgba(238, 125, 121, 0.212);
      }

      &:nth-child(3) {
        box-shadow: 0 8px 12px -3px rgba(135, 238, 121, 0.212);
      }
    }


  }
}
</style>