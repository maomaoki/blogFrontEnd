<template>
  <div id="newsPage" class="top-150">

    <div id="newsContent">

      <div class="news-list">

        <div
            v-for="item in newsItem"
            :class="isActiveItem.name == item.name ?'active':''"
            class="item"
            @click="()=>{isActiveItem = item;refreshNewsList()}"
        >
          <img :src="item.icon" alt="">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="news-content">

        <div class="head">
          <img :src="isActiveItem.icon" alt="">
          <span>{{ isActiveItem.name }} · 热搜榜</span>
        </div>
        <div class="body">
          <div class="item" v-for="news in newsList">
            <span class="index">{{ news.index }}</span>
            <span class="title">
               <a :href="news.link"
                  target="_blank">
                  {{ news.title }}
               </a>
             </span>
            <span class="hot">
             {{ news.hotValue }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div id="link">
      <a href="https://go.itab.link/" target="_blank">灵感来源于 itab</a>
    </div>
  </div>
</template>


<script setup lang="ts">
import wxImage from "@/assets/images/icon/weixin.png"
import wbImage from "@/assets/images/icon/weibo.png"
import zhImage from "@/assets/images/icon/zhihu.png"
import {onMounted, ref} from "vue";
import {getNewsListUsingPost} from "@/api/blogSystemController.ts";
import {message} from "ant-design-vue";


/**
 * 新闻 标题 item 类型
 */
interface newsItemType {
  id: string,
  icon: any,
  name: string,
}


/**
 * 新闻 标题 item
 */
const newsItem = ref<newsItemType[]>([
  {
    name: "微博",
    icon: wbImage,
    id: "KqndgxeLl9"
  },
  {
    name: "微信",
    icon: wxImage,
    id: "WnBe01o371"
  },
  {
    name: "知乎",
    icon: zhImage,
    id: "mproPpoq6O"
  }
])


/**
 * 当前 选中 的 item
 */
const isActiveItem = ref<newsItemType>({
  id: "",
  icon: "",
  name: "",
})


/**
 * 新闻 数据 列表
 */
const newsList = ref<API.NewsVo[]>([])


/**
 * 请求数据 并且 渲染 方法
 */
async function refreshNewsList() {
  const result = await getNewsListUsingPost({
    id: isActiveItem.value.id,
    size: 50
  })

  if (result.data.code != 0) {
    message.error("请求新闻数据错误")
    newsList.value = []
    return
  }

  newsList.value = result.data.data || []

}


onMounted(async () => {
  /**
   * 默认 选中 列表 第一项
   */
  isActiveItem.value = newsItem.value[0]

  /**
   * 请求 数据
   */
  await refreshNewsList()

})
</script>


<style lang="less">
#newsPage {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px;

  #newsContent {
    width: 100%;
    transition: all .3s ease 0s;
    border-radius: 12px;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    border: 1px solid #e3e8f7;
    animation: slide-in .6s .1s backwards;
    display: flex;
    margin-bottom: 30px;


    .news-list {
      width: 240px;
      border-right: 1px solid #e3e8f7;
      padding: 20px 0;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        color: rgb(78, 89, 105);
        cursor: pointer;
        transition: all .3s;

        > img {
          width: 30px;
          height: 30px;
          border-radius: 5px;
        }

        > span {
          margin-left: 10px;
        }

      }

      .item.active {
        background-color: rgb(22, 93, 255);
        color: #fff
      }


      .item:not(.active):hover {
        span {
          color: rgb(22, 93, 255);
        }
      }
    }

    .news-content {
      width: calc(100% - 240px);

      .head {
        height: 60px;
        border-bottom: 1px solid #e3e8f7;
        display: flex;
        align-items: center;
        padding: 0 20px;

        > img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: block;
        }

        > span {
          font-size: 18px;
          margin-left: 10px;
        }
      }

      .body {
        padding: 20px;

        .item {
          display: flex;
          justify-content: space-between;
          color: rgb(78, 89, 105);
          margin-bottom: 10px;
          align-items: center;

          .index {
            background-color: rgb(242, 243, 245);
            width: 20px;
            height: 20px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
          }

          .title {
            width: 90%;

            a {
              color: rgb(78, 89, 105);
            }
          }

          .hot {
            white-space: nowrap;
          }

          &:nth-child(1) .index {
            background-color: #fe2d46;
            color: #fff;
          }

          &:nth-child(2) .index {
            background-color: #f60;
            color: #fff;
          }

          &:nth-child(3) .index {
            background-color: #faa90e;
            color: #fff;
          }
        }
      }
    }

  }

  #link {
    width: 100%;
    padding: 10px 0;
    text-align: center;

    a {
      color: #333333;
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