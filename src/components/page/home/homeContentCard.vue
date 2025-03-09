<template>
  <div v-for="item in articleList"
       @click="()=>{router.push(`/article/${item.id}`)}"
       :key="item.id" id="homeContentCard">

    <div class="item-img">
      <img :src="item.articleBgImage" alt="文章背景图">
    </div>
    <div class="item-info">

      <div class="item-info-top">
        <div class="item-info-top-tips">
                          <span class="sticky-warp" v-if="item.isRecommend">
                            <i class="iconfont icon-tuijian"></i>
                            <span>推荐</span>
                          </span>
          <div class="article-categories-original">
            {{ item.articleCategory }}
          </div>

          <div class="newPost" v-if="isNowTime(item.editTime as string)">最新</div>

        </div>
        <span class="item-info-title">{{ item.articleTitle }}</span>


      </div>

      <div class="item-info-menu">

               <span class="info-menu-date">

                <i class="iconfont icon-rili"></i>
                 <span>{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</span>

              </span>
        <span class="info-menu-list">
                <span class="info-menu-item" v-if="item.articleTags"
                      v-for="tag in JSON.parse(item.articleTags)">
                  <i class="iconfont icon-biaoqian"></i>
                  <span>{{ tag }}</span>
                </span>
              </span>

      </div>
    </div>
  </div>


  <pagination
      :total="total"
      :change-page="changePage"
      :page-size="pageSize"
  />

</template>
<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {pageArticleUsingPost} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
import Pagination from "@/components/page/home/pagination.vue";
import router from "@/routers";

/**
 *  分页 获取 文章(默认 获取 推荐文章 前 10 条)
 */
const articleList = ref<API.ArticlePageVo[]>([])

/**
 * 总条数
 */
const total = ref<number>(0)


/**
 * 一页 展示 多少 条 (默认10)
 */
const pageSize = ref<number>(4)


/**
 *  搜索 函数
 */
async function doSearch(data: API.AdminPageArticleDto) {
  // 这是默认
  const result = await pageArticleUsingPost(data)
  if (result.data.code != 0) {
    message.error("获取文章失败")
    return
  }
  if (result.data.data) {
    articleList.value = result.data.data.records ?? [];
    // @ts-ignore
    total.value = Number.parseInt(result.data.data.total) ?? 0;
  }
}


/**
 * 页码 发生 变化 触发 函数
 */
async function changePage(currentPage: number) {
  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    sortField: "isRecommend",
    sortOrder: "desc",
    pageSize: pageSize.value,
    pageNum:currentPage
  })
}


onMounted(async () => {
  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    sortField: "isRecommend",
    sortOrder: "desc",
    pageSize: pageSize.value
  })

})

/**
 * 是否 为 最新 文章
 */
function isNowTime(time: string): boolean {
  // 将传入的日期字符串转换为 Date 对象
  const inputDate = new Date(time);
  // 获取当前时间
  const currentDate = new Date();
  // 计算当前时间的前三天的日期
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(currentDate.getDate() - 3);
  // 判断传入的日期是否在当前时间的前三天范围内
  return inputDate >= threeDaysAgo && inputDate <= currentDate;
}


</script>


<style lang="less">
#homeContentCard {
  margin-top: 20px;
  -webkit-animation: slide-in .6s .4s backwards;
  -moz-animation: slide-in .6s .4s backwards;
  -o-animation: slide-in .6s .4s backwards;
  -ms-animation: slide-in .6s .4s backwards;
  animation: slide-in .6s .4s backwards;
  will-change: transform;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #e3e8f7;
  box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
  user-select: none;
  display: flex;
  flex-direction: column;
  height: auto !important;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #425aef;

    .item-img {
      filter: brightness(.82) !important;
      transform: scale(1.03) !important;
    }

  }

  .item-img {
    overflow: hidden;
    width: 70%;
    height: 200px;

    img {
      border-radius: 0;
      height: 100%;
      width: 100%;
      -webkit-transition: all .6s ease 0s;
      -moz-transition: all .6s ease 0s;
      -o-transition: all .6s ease 0s;
      -ms-transition: all .6s ease 0s;
      transition: all .6s ease 0s;
      object-fit: cover;
    }
  }

  .item-info {
    height: 174px;
    width: 100%;
    cursor: pointer;
    position: relative;
    padding: 0;
    display: inline-block;
    overflow: hidden;
    margin-top: 0;

    .item-info-top {
      position: relative;
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -o-transition: .3s;
      -ms-transition: .3s;
      transition: .3s;
      padding: 0 32px;
      width: 100%;

      .item-info-top-tips {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 5px;


        .sticky-warp {
          line-height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;

          i {
            color: #ee3a05;
            font-size: 18px;
          }

          span {
            color: #ff7242;
            font-size: 14px;
          }
        }

        .article-categories-original {
          display: flex;
          color: rgba(60, 60, 67, 0.8);
          font-size: .75rem;
          position: relative;
          margin-right: 8px;
        }

        .newPost {
          display: flex;
          color: rgba(60, 60, 67, 0.8);
          font-size: .75rem;
          position: relative;
          margin-right: 8px;
        }
      }

      .item-info-title {
        font-size: 20px;
        -webkit-line-clamp: 2;
        line-height: 30px;
        margin-top: 0;
        font-weight: 700;
        color: #363636;
        margin-bottom: 0;
        width: 100%;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
    }

    .item-info-menu {
      color: #363636;
      font-size: .7rem;
      position: absolute;
      padding: 0 32px;
      transition: .3s;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 100%;
      left: 0;
      flex-direction: row-reverse;
      align-items: center;
      bottom: 30px;

      .info-menu-date {
        i {
          font-size: 15px;
          margin: 0 4px 0 0;
        }

        span {
          font-size: 15px;
        }

      }

      .info-menu-list {
        margin: 0 8px 0 0;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;

        .info-menu-item {
          color: #363636;
          font-size: 14px;
          margin-right: 5px;
          transition: .3s;

          i {
            margin: 0 4px 0 0;
          }

          &:hover {
            color: #425aef;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1201px) {
    margin-top: 1rem;
    display: flex;
    height: auto;
    width: 49%;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: auto !important;

    .item-img {
      width: 100%;
      height: 225px;
      -webkit-transition: 1s !important;
      -moz-transition: 1s !important;
      -o-transition: 1s !important;
      -ms-transition: 1s !important;
      transition: 1s !important;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>