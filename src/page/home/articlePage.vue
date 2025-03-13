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

        <div class="hr">
          <i class="iconfont icon-jiandao"></i>
        </div>

        <div class="articleComment">
          <div class="comment-header">

            <div class="comment-line">
              <i class="iconfont icon-pinglun11"></i>
              <span>评论</span>
            </div>
            <div class="comment-randomInfo">
              <a href="#">
                言论政策
              </a>
            </div>
          </div>
          <div class="comment-input">
            <div class="el-textarea">
              <textarea placeholder="请留下你的评论!"></textarea>
              <span class="font-number">0/2000</span>
              <div class="expression">
                <div class="item">
                  <i class="iconfont icon-smile"></i>
                </div>
                <div class="item">
                  <i class="iconfont icon-tupian"></i>
                </div>
              </div>
            </div>
            <div class="comment-button">
              <button class="isNotSrc">发送</button>
            </div>
          </div>
          <div class="comment-number">
            <div class="number">
              <span>99</span>
              条评论
            </div>
            <div class="renovate">
              <span>
                <i class="iconfont icon-shuaxin"></i>
              </span>
            </div>
          </div>
          <div class="comment-list">
            <div class="comment-item">
              <div class="comment-avatar">
                <img
                    src="http://localhost:9999/api/images/avatar/1893682464272867329/746e706659e5468896fd355e81ee78c6.jpeg"
                    alt="">
              </div>

              <div class="comment-main">
                <div class="comment-row">
                  <div class="comment-name">
                    <span class="name">张三</span>
                    <span class="check">审核中</span>
                    <span class="time">2022-10-11</span>
                  </div>

                  <div class="thumbs-up">
                    <span class="tuijian">
                      <i class="iconfont icon-tuijian"></i>
                      <span>1</span>
                    </span>
                    <span class="pinglun">
                      <i class="iconfont icon-pinglun"></i>
                    </span>
                  </div>


                </div>
                <div class="comment-content">
                  <p>
                    测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制测试字数多少会不会有限制</p>
                </div>
                <div class="comment-info">
                  <div class="info-item">
                    <i class="iconfont icon-daohang"></i>
                    <span>广东</span>
                  </div>
                  <div class="info-item window">
                    <i class="iconfont icon-window-n"></i>
                    <span>window 11</span>
                  </div>

                  <div class="info-item brower">
                    <i class="iconfont icon-chrome"></i>
                    <span>Chrome 115.0.0.0</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="aside-content">

        <card-info/>


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
          <div class="functionalRegional">
            <div class="item">
              <i class="iconfont icon-dianzan"></i>
            </div>
            <div class="item">
              <i class="iconfont icon-shoucang"></i>
            </div>
            <div class="item">
              <i class="iconfont icon-wangshang"></i>
            </div>
            <div class="item">
              <i class="iconfont icon-pinglun"></i>
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
import CardInfo from "@/components/page/home/cardInfo.vue";

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
  background: #f7f9fe;

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

      .hr {
        position: relative;
        margin: 40px auto;
        border: 2px dashed rgba(161, 172, 247, 0.137);
        width: calc(100% - 4px);

        &:hover {
          i {
            left: calc(95% - 20px);
          }
        }

        i {
          font-size: 30px;
          font-weight: 700;
          position: absolute;
          top: -16px;
          left: 5%;
          z-index: 1;
          color: rgba(123, 139, 244, 0.137);
          transition: all 1s ease-in-out;

        }
      }

      .articleComment {

        .comment-header {
          font-size: 14px !important;
          margin-bottom: 10px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-wrap: wrap;

          .comment-line {
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 20px;

            i {
              font-size: 20px;
              margin-right: 10px;
            }

            span {
              font-weight: 700;
              font-size: 20px;
            }
          }

          .comment-randomInfo {
            margin-left: auto;
            font-size: 13px;

            a {
              font-size: 13px;
              color: #817979;
              font-weight: 200;
              text-decoration: none;
              word-wrap: break-word;
              -webkit-transition: all .2s ease 0s;
              -moz-transition: all .2s ease 0s;
              -o-transition: all .2s ease 0s;
              -ms-transition: all .2s ease 0s;
              transition: all .2s ease 0s;
              overflow-wrap: break-word;

              &:hover {
                color: #409EFF;
              }
            }
          }
        }

        .comment-input {


          .el-textarea {
            position: relative;
            display: inline-block;
            width: 100%;
            vertical-align: bottom;
            font-size: 14px;
            margin-bottom: 10px;

            textarea {
              height: 121px;
              background-image: url("@/assets/images/bg/comment_bg.png");
              background-position: right bottom;
              background-repeat: no-repeat;
              min-height: 180px !important;
              border-radius: 15px;
              display: block;
              resize: vertical;
              padding: 16px 16px 40px 16px;
              line-height: 1.5;
              width: 100%;
              font-size: inherit;
              color: #363636;
              background-color: #f7f7f9;
              border: 1px solid #e3e8f7;
              transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
              outline-color: #3e5658;
            }

            textarea:focus {
              outline: 0;
              border-color: #3e5658;
            }

            textarea:focus-visible {
              outline: 0;
              border-color: #3e5658;
            }

            .font-number {
              position: absolute;
              font-size: 12px;
              bottom: 5px;
              right: 10px;
              color: #909399;
              background: transparent;
            }

            .expression {
              position: absolute;
              bottom: 10px;
              left: 10px;
              display: flex;
              align-items: center;

              .item {
                margin-right: 5px;
                cursor: pointer;

                &:hover {
                  i {
                    color: #0D68DF;
                  }
                }

                i {
                  font-size: 22px;

                }
              }
            }
          }

          .comment-button {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: right;


            button {
              background-color: #363636;
              border: 0 solid #3e5658;
              color: #f7f9fe;
              transition: 0.3s;
              width: 120px;
              height: 35px;
              line-height: 35px;
              border-radius: 12px;
              cursor: pointer;
              font-size: 16px;
              text-align: center;
            }

            button.isNotSrc {
              opacity: .3;
              cursor: not-allowed;
            }
          }
        }

        .comment-number {
          width: 100%;
          margin: 10px 0 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .number {
            font-size: 18px;
            font-weight: 800;
          }

          .renovate {
            i {
              font-size: 18px;
              font-weight: 600;
            }
          }
        }

        .comment-list {
          padding: 10px 0;

          .comment-item {
            color: #4c4948;
            display: flex;
            flex-direction: row;
            word-break: break-all;
            margin-top: 0 !important;
            margin-bottom: 10px !important;
            transition: .3s;
            border-radius: 12px;
            padding-top: 10px;
            border: none;
            border-top: 1px dashed #3e565823;

            .comment-avatar {
              border-radius: 50px;
              cursor: pointer;
              background-color: rgba(144, 147, 153, 0.13);
              flex-shrink: 0;
              height: 45px;
              width: 45px;
              overflow: hidden;
              text-align: center;
              margin-right: 10px;

              img {
                width: 45px;
                height: 45px;
                border-style: none;
                border-radius: 8px;
                max-width: 100%;
                transition: all .2s ease 0s;
                -webkit-user-drag: none;
              }
            }

            .comment-main {
              flex: 1;
              width: 0;

              .comment-row {
                padding-top: 11px;
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 14px;

                .comment-name {
                  display: flex;
                  align-items: center;

                  .name {
                    margin-right: 6px;
                    font-size: 18px;
                  }

                  .check {
                    background-color: rgba(230, 162, 60, 0.13);
                    border: 1px solid rgba(230, 162, 60, 0.5);
                    border-radius: 2px;
                    color: #e6a23c;
                    font-size: 13px;
                    padding: 3px 5px;
                    margin-right: 10px;
                  }

                  .time {
                    font-size: 14px;
                  }


                }

                .thumbs-up {
                  display: flex;
                  align-items: center;


                  .tuijian {
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    i {
                      font-size: 25px;
                      transition: all 0.3s;
                    }

                    span {
                      font-size: 12px;
                      color: #0D68DF;
                    }

                    &:hover {
                      i {
                        color: #0D68DF;
                      }
                    }
                  }

                  .pinglun {
                    i {
                      font-size: 20px;
                      transition: all 0.3s;
                    }

                    cursor: pointer;

                    &:hover {
                      i {
                        color: #0D68DF;
                      }
                    }
                  }
                }
              }

              .comment-content {
                margin-bottom: 10px;

                p {
                  font-weight: 400;
                  font-size: 18px;
                  line-height: 2;
                }
              }

              .comment-info {
                display: flex;
                align-items: center;

                .info-item {
                  background: #fff;
                  border: 1px solid #e3e8f7;
                  padding: 2px 10px;
                  border-radius: 8px;
                  margin-right: 8px;
                  color: rgba(60, 60, 67, 0.8);
                  margin-top: 6px;
                  font-size: .8rem;
                  display: flex;
                  align-items: center;

                  i {
                    font-size: 17px;
                  }

                  span {
                    font-size: 12px;
                    font-weight: 800;
                  }
                }

                .info-item.window {
                  padding: 3px 10px;

                  i {
                    font-size: 12px;
                    margin-right: 3px;
                  }

                  span {
                    font-size: 14px;
                  }
                }

                .info-item.brower {
                  padding: 3px 10px;

                  i {
                    font-size: 12px;
                    margin-right: 3px;
                  }

                  span {
                    font-size: 14px;
                  }
                }
              }
            }
          }
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

        .functionalRegional {
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

          display: flex;
          align-items: center;

          .item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: #333333;
            cursor: pointer;

            i {
              font-size: 18px;

              &:hover {
                color: rgba(22, 93, 255);
              }
            }

            i.active {
              color: rgba(22, 93, 255);
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