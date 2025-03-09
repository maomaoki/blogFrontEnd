<template>

  <div id="articlePage">

    <header class="post-bg" id="page-header">

      <div class="articleImage">
        <!--bg img-->
        <img :src="article?.articleBgImage" alt="背景图">
        <div id="bannerWave1"></div>
        <div id="bannerWave2"></div>
      </div>

      <div class="articleInfo">
        <!-- 分类 + 标签-->
        <div class="articleType">

          <div class="articleCategory">
            {{ article?.articleCategory }}
          </div>

          <div class="articleTags">
            <div class="tag"
                 v-if="article?.articleTags"
                 v-for="tag in JSON.parse(article?.articleTags)"
                 :key="tag"
            >
              <i class="iconfont icon-jinghao"></i>
              {{ tag }}
            </div>
          </div>
        </div>

        <!--标题-->
        <h1 class="articleTitle">
          {{ article?.articleTitle }}
        </h1>
        <!--时间-->
        <div class="articleTime">
          <div class="timeItem">
            <i class="iconfont icon-rili"></i>
            <span>发表于: {{ dayjs(article?.createTime).format('YYYY-MM-DD') }}</span>
          </div>
          <div class="timeItem">
            <i class="iconfont icon-zuixingengxin"></i>
            <span>更新于: {{ dayjs(article?.editTime).format('YYYY-MM-DD') }}</span>
          </div>
        </div>
        <!--文章其余信息-->
        <div class="articleOtherInfo">
          <div class="infoItem">
            <i class="iconfont icon-zishu"></i>
            <span>字数总计: {{ article?.articleContent ? article?.articleContent.length : '00' }}</span>
          </div>
          <div class="infoItem">
            <i class="iconfont icon-shizhong"></i>
            <span>阅读时间: 2分钟</span>
          </div>
          <div class="infoItem">
            <i class="iconfont icon-yueduliang"></i>
            <span>阅读量: {{ article?.articleLookNumber }}</span>
          </div>
          <div class="infoItem">
            <i class="iconfont icon-dingwei"></i>
            <span>{{ '学校' }}</span>
          </div>
          <div class="infoItem">
            <i class="iconfont icon-pinglun"></i>
            <span>评论数: {{ article?.articleCommentNumber }}</span>
          </div>
        </div>
      </div>


    </header>


    <div class="layout">

      <div class="article-content">
        <div class="content">
          <MdPreview
              @GetCatalog="getCatalog"
              :id="id" :modelValue="article?.articleContent"/>
        </div>
      </div>

      <div class="aside-content">
        <div class="sticky_layout">
          <div class="catalogue">
            <div class="item-headline">
              <i class="iconfont icon-mulu"></i>
              <span>文章目录</span>
            </div>
            <div class="toc-content">
              <ol class="toc">
                <li v-for="catalog in CatalogList"
                    :class="[
                        catalog.level >= maxLevel ? 'toc-right' : '',
                        currentAnchorText == catalog.text ? 'toc-active' : ''
                    ]"
                    :key="catalog.text">
                  <a @click="handleAnchorClick(catalog.text)">
                    <span>{{ catalog.text }}</span>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {type HeadList, MdPreview} from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';


import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getArticleByIdUsingGet} from "@/api/articleController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import dayjs from "dayjs";

const route = useRoute();

const article = ref<API.ArticleVo>()


onMounted(async () => {
  const result = await getArticleByIdUsingGet({
    id: route.params.id as string
  })

  if (result.data.code != 0) {
    message.error("获取文章失败")
    await router.push({
      path: "/home"
    })
    return
  }
  article.value = result.data.data
})

/**
 *  目录 数据
 */
const CatalogList = ref<HeadList[]>([])

/**
 * 最大等级 (等级 越大 说明 越小阶层)
 */
const maxLevel = ref(0)

/**
 * 当前 选中 的 标题 索引
 */
const currentAnchorText = ref<string>("")


/**
 * 获取 目录
 */
function getCatalog(list: HeadList[]) {
  CatalogList.value = list
  maxLevel.value = list.reduce((max, item) => Math.max(max, item.level), 0)
  console.log(CatalogList.value)
  console.log(maxLevel.value)
  if (list.length > 0) {
    currentAnchorText.value = list[0].text
  }

}


/**
 * 点击 跳到 对应 标题
 */
function handleAnchorClick(text: string) {
  // 直接 id 跳转
  document.getElementById(text)?.scrollIntoView({behavior: "smooth"})
  currentAnchorText.value = text
}

</script>


<style lang="less">
#articlePage {

  #page-header {
    position: relative;
    width: 100%;
    -webkit-transition: all .5s ease 0s;
    -moz-transition: all .5s ease 0s;
    -o-transition: all .5s ease 0s;
    -ms-transition: all .5s ease 0s;
    transition: all .5s ease 0s;
  }

  #page-header.post-bg {
    height: 31.25rem;
    transition: .6s;
    overflow: hidden;

    .articleImage {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    }

    .articleInfo {
      position: absolute;
      top: 0;
      left: calc((100% - 1400px + 3rem) / 2);
      width: calc(100% - (100% - 1400px + 3rem));
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      z-index: 3;

      .articleType {
        display: flex;
        white-space: nowrap;
        align-items: center;

        .articleCategory {
          border-radius: 8px;
          padding: 6px 20px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 15px;
          width: 100%;
          height: 100%;
          font-weight: 700;
          margin-left: 10px;
          text-align: center;
        }

        .articleTags {
          margin-left: 16px;
          display: flex;
          align-items: center;

          .tag {
            display: flex;
            align-items: center;
            margin-right: 10px;
            color: #fff;
            opacity: .8;
            font-size: 16px;

            i {
              opacity: .6;
              font-size: 14px;
              margin-right: 3px;
            }
          }
        }
      }

      .articleTitle {
        color: #fff;
        line-height: 1.5;
        font-weight: 700;
        font-size: 50px;
        text-align: left;
        letter-spacing: 2px;
        -webkit-line-clamp: 2;
        padding: 0;
        overflow: hidden;
        margin: 15px 0 15px 10px;
      }

      .articleTime {
        margin-left: 10px;
        display: flex;
        align-items: center;

        .timeItem {
          margin-right: 10px;
          color: #eee;

          i {
            margin-right: 4px;
          }
        }
      }

      .articleOtherInfo {
        margin-left: 10px;
        display: flex;
        align-items: center;

        .infoItem {
          margin-right: 15px;
          color: #fff;
          margin-top: 15px;
          text-align: center;

          i {
            margin-right: 2px;
          }
        }
      }
    }
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
    background: #f7f9fe;

    .article-content {
      transition: all .3s ease 0s;
      animation: slide-in .6s .1s backwards;
      padding: 20px 25px;
      border-radius: 12px;
      width: calc(100% - 300px);
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      background: #fff;

      .content {

        h2 {
          border-top: 1px dashed #4c384f23;
          padding-top: 25px;
          margin-top: 25px;
        }
      }

    }

    .aside-content {
      padding-left: 15px;
      width: 300px;
      animation: slide-in .6s .3s backwards;

      .sticky_layout {
        position: sticky;
        top: 80px;
        transition: top .3s;


        .catalogue {
          right: 0 !important;
          max-height: calc(100vh - 100px);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          margin-top: 20px;
          padding: 20px 24px;
          transition: .3s;
          box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
          background: #fff;
          border: 1px solid #e3e8f7;

          &:hover {
            li {
              span {
                opacity: 1 !important;
                -ms-filter: none !important;
                filter: none !important;
              }
            }
          }

          .item-headline {
            display: flex;
            align-items: center;

            i {
              font-size: 16px;
            }

            span {
              margin-left: 6px;
            }
          }

          .toc-content {
            margin: 0 -24px;
            max-height: calc(100vh - 120px);
            width: calc(100% + 48px);
            overflow-y: auto;

            .toc {
              margin: 0 20px !important;
              list-style: none;
              padding: 10px 0;

              li {
                list-style: none;
                padding: 5px 0;

                a {
                  padding: 0 10px;
                  border-left: 0 solid transparent;
                  border-radius: 12px;
                  color: rgba(60, 60, 67, 0.8);
                  cursor: pointer;
                  display: block;
                  margin: 4px 0;
                  font-size: 18px;
                  transition: all .2s ease-in-out;
                  overflow-wrap: break-word;

                  &:hover {
                    color: aqua;
                  }

                  span {
                    opacity: .6;
                    cursor: pointer;
                    filter: blur(1px);
                    transition: .3s;
                  }
                }
              }

              li.toc-right {
                padding-left: 10px;
              }

              li.toc-active {
                a {
                  color: aqua;
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

  @keyframes slide-in-op {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

}
</style>