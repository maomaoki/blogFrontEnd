<template>
  <div id="timerListPage" class="top-150">

    <div id="timerContent">
      <div class="timer-title">
        <h1>{{ title }}</h1>
      </div>


      <div class="article-sort">
        <div
            v-for="(item,index) in articleList"
            class="article-sort-item">
          <a class="article-sort-item-img" @click="()=>router.push('/article/' + item.id)">
            <img :src="item.articleBgImage" alt="">
          </a>
          <div class="article-sort-item-info">
            <a
                @click="()=>router.push('/article/' + item.id)"
                class="article-sort-item-title">{{ item.articleTitle }}</a>
            <span class="article-sort-item-index">
            {{ (index + 1) + ((pageNumber - 1) * pageSize) }}
          </span>
            <div class="article-meta-wrap">
              <div class="article-sort-item-tags">
                <a
                    @click="()=>router.push('/categories/' + item.articleCategory)">
                  <span>
                    <i class="iconfont icon-jinghao"></i>
                    {{ item.articleCategory }}
                  </span>
                </a>
                <a
                    @click="()=>router.push('/tags/' + tag)"
                    v-for="tag in JSON.parse(item.articleTags as string)">
                  <span>
                    <i class="iconfont icon-jinghao"></i>
                    {{ tag }}
                  </span>
                </a>

              </div>
            </div>
          </div>

        </div>


        <pagination
            ref="paginationRef"
            :total="total"
            :change-page="changePage"
            :page-size="pageSize"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {pageArticleUsingPost} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import Pagination from "@/components/page/home/pagination.vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

const title = ref<string>()

const route = useRoute()


/**
 * 总条数
 */
const total = ref<number>(0)


/**
 * 一页 展示 多少 条 (默认10)
 */
const pageSize = ref<number>(1)

/**
 * 当前 第几页
 */
const pageNumber = ref<number>(1)

/**
 *  分页 获取 文章(日期 查询 前 10 条)
 */
const articleList = ref<API.ArticlePageVo[]>([])


const createStartTime = ref()
const createEndTime = ref()


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
  pageNumber.value = currentPage
  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    createStartTime: createStartTime.value,
    createEndTime: createEndTime.value,
    pageSize: pageSize.value,
    pageNum: pageNumber.value
  })
}


/**
 * 组件 挂载 时 刷新一次 后面 都由路由变化刷新
 */
onMounted(async () => {
  const year = route.params.year
  const month = route.params.month
  title.value = year + '-' + month
  createStartTime.value = `${year}-${month}-01 00:00:00`
  createEndTime.value = `${year}-${month}-31 23:59:59`

  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    createStartTime: createStartTime.value,
    createEndTime: createEndTime.value,
    pageSize: pageSize.value,
    pageNum: pageNumber.value
  })
})


/**
 * 获取 分页组件的 重置页面操作
 */
const paginationRef = ref<InstanceType<typeof Pagination>>()


/**
 * 路由 更新 刷新数据
 */
onBeforeRouteUpdate(async (to) => {

  const year = to.params.year
  const month = to.params.month
  title.value = year + '-' + month


  createStartTime.value = `${year}-${month}-01 00:00:00`
  createEndTime.value = `${year}-${month}-31 23:59:59`


  pageNumber.value = 1
  // 刷新也需要 重置页码
  paginationRef.value?.resetPageNumber(pageNumber.value)
  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    createStartTime: createStartTime.value,
    createEndTime: createEndTime.value,
    pageSize: pageSize.value,
    pageNum: pageNumber.value,
  })
})
</script>


<style lang="less">
#timerListPage {
  width: calc(100% - 300px);
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  justify-content: center;

  #category-bar {
    padding: .5rem 10px;
    background: #fff;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 50px;
    transition: all .3s ease 0s;
    animation: slide-in .6s .3s backwards;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    i {
      font-size: 16px;
      margin-right: 15px;
    }

    .catalog-list {
      display: flex;
      white-space: nowrap;
      overflow-x: hidden;

      .catalog-list-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 5px;


        span {
          font-size: 16px;
          font-weight: 700;
          color: #4c4948;
          transition: all .3s ease-in-out;
          display: flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 8px;
          height: 30px;
          line-height: 30px;
        }

        span.select {
          background: #425aef;
          color: #fff;
          border-radius: 8px;
        }

        &:hover span {
          background: #425aef;
          color: #fff;
          border-radius: 8px;
        }
      }

    }

    .category-bar-next {
      margin-left: 16px;
      cursor: pointer;
      display: flex;

      i {
        line-height: inherit;
        transition: all .3s ease 0s;
      }

      &:hover i {
        color: #425aef;
      }
    }

    .catalog-more {
      min-width: fit-content;
      font-weight: 700;
      color: #363636;
      margin-left: 10px;
      text-decoration: none;
      word-wrap: break-word;
      -webkit-transition: all .2s ease 0s;
      -moz-transition: all .2s ease 0s;
      -o-transition: all .2s ease 0s;
      -ms-transition: all .2s ease 0s;
      transition: all .2s ease 0s;
      overflow-wrap: break-word;

      &:hover {
        color: #425aef;
      }
    }
  }

  #timerContent {
    width: 100% !important;
    transition: all .3s ease 0s;
    border-radius: 12px;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    padding: 2rem 2.5rem;
    border: 1px solid #e3e8f7;
    align-self: flex-start;
    animation: slide-in .6s .1s backwards;

    .timer-title {
      margin: 10px 0 30px;


      h1 {
        font-size: 30px;
        position: relative;
        color: #1f2d3d;
        font-weight: 700;
        margin: 0;
      }
    }


    .article-sort {
      .article-sort-item {
        position: relative;
        display: flex;;
        align-items: center;
        transition: all .2s ease-in-out 0s;
        border: none;
        overflow: hidden;
        border-radius: 12px;
        margin-bottom: 18px;

        .article-sort-item-img {
          overflow: hidden;
          width: 151px;
          height: 80px;
          border-radius: 12px;
          min-width: 151px;
          min-height: 80px;
          background: #f7f7f9;
          mask-image: radial-gradient(center, #fff, #000);

          img {
            border-style: none;
            border-radius: 8px;
            max-width: 100%;
            width: 100%;
            height: 100%;
            transition: filter 375ms ease-in .2s, transform .6s;
            object-fit: cover;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .article-sort-item-info {
          padding: 0 14px;
          display: flex;
          flex-direction: column;
          max-height: 80px;
          height: 80px;
          justify-content: space-between;

          .article-sort-item-title {
            height: 30%;
            color: #4c4948;
            font-size: 17.5px;
            transition: all .3s;
            margin-right: auto;
            overflow: hidden;
            order: 0;
            font-weight: 700;
            line-height: 1.3;

            &:hover {
              color: #425aef;
            }
          }

          .article-sort-item-index {
            opacity: .5;
            position: absolute;
            top: 10px;
            right: 10px;
            font-style: italic;
            font-size: 36px;
            line-height: 24px;
          }

          .article-meta-wrap {
            height: 35%;

            .article-sort-item-tags {
              a {
                color: #363636;
                transition: .3s;
                margin-right: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 .2rem 0 0;

                span {
                  font-size: 13px;
                  margin-right: 3px;
                  pointer-events: none;
                  opacity: .6;

                  i {
                    font-size: 13px;
                  }
                }
              }
            }
          }
        }
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