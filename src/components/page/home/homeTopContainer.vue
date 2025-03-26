<template>
  <div id="home-top-container">
    <slideWrap/>

    <div class="top-group" @mouseleave="mouseleaveLookCard">

      <div class="recent-post-item" v-for="item in hotArticleList">
        <div class="image-info">
          <span>热门</span>
          <img :src="item.articleBgImage" alt="文章背景图">
        </div>
        <div class="text-info">
          <span>{{ item.articleTitle }}</span>
        </div>
      </div>

      <div class="todayCard" :class="hide?'hide':''">
        <div class="todayCard-info">
          <span>{{getBlogSystemInfo().moreContent}}</span>
          <span>{{getBlogSystemInfo().moreTitle}}</span>
        </div>
        <img :src="getBlogSystemInfo().moreImageUrl"
             alt="">

        <div class="banner-group-button">

          <div class="banner-button" @click="look">
            <i class="iconfont icon-xieyou"></i>
            <span>查看热门</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {pageArticleUsingPost} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import SlideWrap from "@/components/page/home/slideWrap.vue";
import {useLayoutStores} from "@/stores/useLayoutStores.ts";

/**
 * 获取 更多 的 背景图
 */
const {getBlogSystemInfo} = useLayoutStores()


/**
 * true 展示 查看更多
 */
const hide = ref<boolean>(false);

/**
 * 查看更多 失焦 事件
 */
function mouseleaveLookCard() {
  if (!hide.value) {
    return;
  }
  hide.value = false;
}

/**
 * 查看 更多
 */
function look() {
  hide.value = true;
}


/**
 *  热门 文章
 */
const hotArticleList = ref<API.ArticlePageVo[]>([]);


onMounted(async () => {
  // 这是默认
  const result = await pageArticleUsingPost({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    isHot: 1,
    pageSize: 10
  })
  if (result.data.code != 0) {
    message.error("获取热门文章失败")
    return
  }
  if (result.data.data) {
    hotArticleList.value = result.data.data.records ?? [];
  }
})




</script>


<style lang="less">
#home-top-container {
  height: auto;
  width: 100%;
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  user-select: none;

  .top-group {
    height: 340px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(600px + 1.5rem);
    position: relative;
    align-content: space-between;

    .recent-post-item {
      display: flex;
      width: 200px;
      flex-direction: column;
      align-items: flex-start;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      min-width: 200px;
      height: 164px !important;
      max-height: 164px;
      border: 1px solid #e3e8f7;
      transition: .3s;
      position: relative;
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      margin-left: .5rem;
      margin-right: 0;
      margin-bottom: .5rem;
      cursor: pointer;

      .image-info {
        width: 100%;

        span {
          position: absolute;
          top: 0;
          left: -40px;
          display: flex;
          z-index: 1;
          background: #425aef;
          color: #fff;
          padding: 2px 8px;
          font-size: 12px;
          border-radius: 12px 0 12px 0;
          transition: .3s;
          cursor: pointer;
        }

        img {
          height: 100px;
          overflow: hidden;
          display: flex;
          object-fit: cover;
          width: 100%;
          background: #f7f7f9;
          border-radius: 12px 12px 0 0;
        }
      }

      .text-info {
        padding: .3rem .5rem .3rem .5rem;
        transition: .3s;

        span {
          -webkit-line-clamp: 2;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          line-height: 1.5;
          justify-content: center;
          align-items: flex-end;
          align-content: center;
          padding-top: .5rem;
          font-weight: 700;
          font-size: 1rem !important;
          padding: 0 !important;
          color: #363636;
        }
      }

      &:hover {

        .image-info span {
          left: 0;
        }

        .text-info span {
          color: #425aef;
        }
      }
    }


    .todayCard {
      position: absolute;
      width: calc(600px + 1rem);
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      background: #fff;
      border-radius: 12px;
      margin-left: .5rem;
      overflow: hidden;
      transition: .3s;
      display: flex;
      cursor: pointer;
      pointer-events: all;


      .todayCard-info {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        z-index: 2;
        color: #fff;
        max-width: 60%;
        transition: .3s;
        display: flex;
        flex-direction: column;


        span:nth-child(1) {
          opacity: .8;
          font-size: 14px;
          margin-bottom: 5px;
        }

        span:nth-child(2) {
          font-size: 28px;
          font-weight: 700;
          line-height: 36px;
        }
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 80px;
        background: #f7f7f9;
        border-radius: 12px 12px 0 0;
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        top: 0;
        left: 0;
        background-size: cover;
        z-index: -1;
        transition: .3s;
      }

      .banner-group-button {
        position: absolute;
        right: 2rem;
        bottom: 2rem;
        display: flex;
        transition: .3s;

        .banner-button {
          padding: 8px 12px;
          box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: #fff;
          display: flex;
          align-items: center;
          z-index: 1;
          transition: .3s;
          cursor: pointer;
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform: translateZ(0);
          height: 40px;
          width: 125px;
          justify-content: center;

          i {
            margin-right: 8px;
            font-size: 18px;
          }

          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:hover {
            background: #425aef;
            color: #fff;
          }
        }
      }
    }

    .todayCard.hide {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>