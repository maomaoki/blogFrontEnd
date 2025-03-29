<template>
  <div id="categoriesPage" class="top-150">

    <div id="categoriesContent">

      <div class="categories-title">
        <h1>分类</h1>
      </div>
      <div class="categories-content">
        <div v-for="item in categoriesList"
             class="categories-content-item"
             @click="()=>router.push('/categories/'+item.name)">
          <span class="tags-punctuation">
            #
          </span>
          {{ item.name }}
          <span class="tagsPageCount">
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getArticleCategoryListUsingGet} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";

const categoriesList = ref<API.ArticleTagsCountVo[]>([])

onMounted(async () => {
  const result = await getArticleCategoryListUsingGet()
  if (result.data.code != 0) {
    message.error("文章分类获取失败")
    return
  }
  //@ts-ignore
  categoriesList.value = result.data.data
})


</script>


<style lang="less">
#categoriesPage {
  max-width: 1400px;
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  width: 100%;
  justify-content: center;

  #categoriesContent {
    width: 100% !important;
    transition: all .3s ease 0s;
    border-radius: 12px;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    padding: 2rem 2.5rem;
    border: 1px solid #e3e8f7;
    align-self: flex-start;
    animation: slide-in .6s .1s backwards;

    .categories-title {
      margin: 8px 0 20px;

      h1 {
        position: relative;
        color: #1f2d3d;
        font-weight: 700;
      }
    }

    .categories-content {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      > div {
        font-size: 22px;
        margin: 5px 10px;
      }

      .categories-content-item {
        line-height: 1.6;
        display: flex;
        align-items: center;
        color: #363636 !important;
        padding: 3px 12px;
        margin: 10px;
        border-radius: 8px;
        border: 1px solid #e3e8f7;
        cursor: pointer;
        transition: all 0.3s ease 0s;

        .tags-punctuation {
          margin-right: 4px;
        }

        .tagsPageCount {
          padding: 4px 6px;
          background: #f7f7f9;
          border: 1px solid #e3e8f7;
          min-width: 22.5px;
          display: inline-block;
          border-radius: 4px;
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          color: #363636;
          margin-left: 6px;
        }
      }

      .categories-content-item:hover {
        box-shadow: 0 8px 12px -3px #425aef23;
        color: #fff !important;
        background: #425aef;
        border: 1px solid transparent;
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