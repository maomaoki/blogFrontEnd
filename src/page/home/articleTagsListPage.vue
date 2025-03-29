<template>
  <div id="articleTagsListPage" class="top-150">

    <div id="articleTagsContent">
      <div id="tag-page-tags">
        <div
            @click="()=>router.push('/tags/'+item.name)"
            v-for="item in tagsList" class="tagsContent-content-item"
            :class="route.params.title === item.name ? 'select' : ''"
        >
          <span class="tags-punctuation">
            #
          </span>
          {{ item.name }}
          <span class="tagsPageCount">
            {{ item.count }}
          </span>
        </div>
      </div>
      <div class="tags-title">
        <h1>{{ route.params.title }}</h1>
      </div>
      <div class="article-sort">
        <div
            v-for="(item,index) in articleList"
            class="article-sort-item">
          <a
              @click="()=>router.push('/article/' + item.id)"
              class="article-sort-item-img">
            <img :src="item.articleBgImage" alt="">
          </a>
          <div class="article-sort-item-info">
            <a class="article-sort-item-title"
               @click="()=>router.push('/article/' + item.id)"
            >{{ item.articleTitle }}</a>
            <span class="article-sort-item-index">
            {{ (index + 1) + ((pageNumber - 1) * pageSize) }}
          </span>
            <div class="article-meta-wrap">
              <div class="article-sort-item-tags">
                <a
                    @click="()=>router.push('/tags/' + tag)"
                    v-for="tag in JSON.parse(item.articleTags as string)">
                  <span>
                    <i class="iconfont icon-jinghao"></i>
                    {{ tag }}
                  </span>
                </a>
                <a @click="()=>router.push('/categories/' + item.articleCategory)">
                  <span>
                    <i class="iconfont icon-jinghao"></i>
                    {{ item.articleCategory }}
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
import {
  getArticleCategoryListUsingGet,
  getArticleTagsCountUsingGet,
  pageArticleUsingPost
} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import Pagination from "@/components/page/home/pagination.vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";


const route = useRoute()
/**
 * 路由 参数
 */
const searchParams = ref<string[]>([route.params.title as string]);


/**
 * 标签 列表
 */
const tagsList = ref<API.ArticleTagsCountVo[]>([])
onMounted(async () => {
  const result = await getArticleTagsCountUsingGet()
  if (result.data.code != 0) {
    message.error("文章分类获取失败")
    return
  }
  //@ts-ignore
  tagsList.value = result.data.data
})


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
 *  分页 获取 文章(标签 查询 前 10 条)
 */
const articleList = ref<API.ArticlePageVo[]>([])


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
    articleTags: JSON.stringify(searchParams.value),
    pageSize: pageSize.value,
    pageNum: pageNumber.value
  })
}


/**
 * 组件 挂载 时 刷新一次 后面 都由路由变化刷新
 */
onMounted(async () => {
  const result = await getArticleCategoryListUsingGet()
  if (result.data.code != 0) {
    message.error("获取标签错误")
    return
  }


  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    articleTags: JSON.stringify(searchParams.value),
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
  searchParams.value[0] = to.params.title as string
  pageNumber.value = 1
  // 刷新也需要 重置页码
  paginationRef.value?.resetPageNumber(pageNumber.value)
  await doSearch({
    timeSortField: "editTime",
    timeSortOrder: "desc",
    articleTags: JSON.stringify(searchParams.value),
    pageSize: pageSize.value,
    pageNum: pageNumber.value,
  })
})
</script>


<style lang="less">
#articleTagsListPage {
  width: calc(100% - 300px);
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  justify-content: center;


  #articleTagsContent {
    width: 100% !important;
    transition: all .3s ease 0s;
    border-radius: 12px;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    padding: 2rem 2.5rem;
    border: 1px solid #e3e8f7;
    align-self: flex-start;
    animation: slide-in .6s .1s backwards;


    #tag-page-tags {
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 20px;

      > div {
        font-size: 14px;
        margin: 4px;
      }

      .tagsContent-content-item {
        line-height: 1.6;
        display: flex;
        align-items: center;
        color: #363636 !important;
        padding: 2px 8px;
        border-radius: 8px;
        border: 1px solid #e3e8f7;
        cursor: pointer;
        transition: all 0.3s ease 0s;

        .tags-punctuation {
          margin-right: 4px;
        }

        .tagsPageCount {
          padding: 3px 5px;
          background: #f7f7f9;
          border: 1px solid #e3e8f7;
          min-width: 22.5px;
          display: inline-block;
          border-radius: 4px;
          line-height: 10px;
          text-align: center;
          font-size: 11px;
          color: #363636;
          margin-left: 4px;
        }
      }

      .tagsContent-content-item:not(.select):hover {
        box-shadow: 0 8px 12px -3px #425aef23;
        color: #fff !important;
        background: #425aef;
        border: 1px solid transparent;
      }

      .tagsContent-content-item.select {
        box-shadow: 0 8px 12px -3px #425aef23;
        color: #fff !important;
        background: #425aef;
        border: 1px solid transparent;
      }

    }


    .tags-title {
      margin: 10px 0 30px;


      h1 {
        font-size: 32px;
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