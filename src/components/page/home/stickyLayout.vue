<template>
  <div id="sticky_layout">

    <div class="card-widget">

      <div class="card-tags">

        <div class="item-headers-line"></div>

        <div class="card-tags-content">
          <div class="tag-item"
               v-for="item in tagsList"
               :class="item.count == firstCount || item.count == secondCount?'active':''"
               :key="item.name">
            {{ item.name }}
            <sup>{{ item.count }}</sup>
          </div>
        </div>

        <hr/>

        <div class="article-count-content">

          <div v-for="item in timeList" class="article-count-item">

            <a href="">
              <span class="article-date">{{ convert(item.time) }}</span>

              <span class="article-num-group">

                      <span class="article-num">
                          {{ item.count }}
                      </span>
                      <span class="article-num-text">
                          篇
                      </span>
                    </span>
            </a>
          </div>
        </div>

        <hr/>

        <div class="web-info-content">

          <div class="web-info-item">
            <div class="info-item-left">
              <i class="iconfont icon-tushu"></i>
              <div class="item-name">
                文章总数
              </div>
            </div>
            <div class="info-item-right">
              {{ articleInfoCount?.articleCount }}
            </div>
          </div>
          <div class="web-info-item">
            <div class="info-item-left">
              <i class="iconfont icon-wenzi"></i>
              <div class="item-name">
                文章总字数
              </div>
            </div>
            <div class="info-item-right">
              {{ articleInfoCount?.articleWordCount }}
            </div>
          </div>
          <div class="web-info-item">
            <div class="info-item-left">
              <i class="iconfont icon-jianzhan"></i>
              <div class="item-name">
                建站天数
              </div>
            </div>
            <div class="info-item-right">
              999
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup="">
import {onMounted, ref} from "vue";
import {
  getArticleInfoCountUsingGet,
  getArticleTagsCountUsingGet,
  getArticleTimeCountUsingGet
} from "@/api/articleController.ts";
import {message} from "ant-design-vue";

const tagsList = ref<API.ArticleTagsCountVo[]>()

const firstCount = ref<number>(0)
const secondCount = ref<number>(0)


const timeList = ref<API.ArticleTimeCountVo[]>()


const articleInfoCount = ref<API.ArticleInfoCountVo>()


/**
 * 数字 中文 数组
 */
const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

/**
 * 转换 日期
 */
function convert(time: string) {

  // - 切割 拿到 年份 和 月份
  const times = time.split("-");
  const month = chineseNumbers[Number.parseInt(times[1] as string) + 1]
  return `${month}月 ${times[0]}`
}

/**
 * 获取 标签 统计
 */
async function tagsCountReq() {
  const tagsResult = await getArticleTagsCountUsingGet();
  if (tagsResult.data.code != 0) {
    message.error("文章标签获取失败")
    return
  }

  tagsList.value = []
  let newTagsList = tagsResult.data.data || []

  for (let i = 0; i < newTagsList.length; i++) {
    tagsList.value.push({
      name: newTagsList[i].name as string,
      count: newTagsList[i].count as number
    })
  }


  // 最多 前两个 改变颜色
  // 排序 拿到 前两个 最大的
  // @ts-ignore
  // todo 这里需要优化一下
  newTagsList.sort((a, b) => b.count - a.count)
  firstCount.value = newTagsList[0].count as number
  secondCount.value = newTagsList[1].count as number

}

/**
 * 获取 日期 统计
 */
async function timeCountReq() {
  // 获取 时间
  const timeResult = await getArticleTimeCountUsingGet();
  if (timeResult.data.code != 0) {
    message.error("文章时间获取失败")
    return
  }

  timeList.value = timeResult.data.data || []

}

/**
 * 获取 文字 信息 统计
 */
async function articleInfoCountReq() {

  // 获取 文章信息
  const articleInfoResult = await getArticleInfoCountUsingGet();
  if (articleInfoResult.data.code != 0) {
    message.error("文章信息获取失败")
    return
  }
  articleInfoCount.value = articleInfoResult.data.data || {}

}


onMounted(async () => {

  await tagsCountReq()

  await timeCountReq()

  await articleInfoCountReq()

})


</script>


<style lang="less">
#sticky_layout {
  display: flex;
  flex-direction: column;
  position: sticky;
  transition: top .3s;
  top: 60px;

  .card-widget {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    padding: 20px 24px;
    border-radius: 12px;
    -webkit-box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    background: #fff;
    border: 1px solid #e3e8f7;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;

    .card-tags {

      .item-headers-line {
        padding-bottom: 0;
        margin-left: 8px;
        font-size: 1em;
        font-weight: 700;
        display: flex;
        align-items: center;

      }

      .card-tags-content {
        display: flex;
        flex-wrap: wrap;


        .tag-item {
          line-height: 2;
          font-size: 1.05rem;
          border-radius: 8px;
          margin-right: 4px;
          padding: 1px 8px;
          color: #363636;
          width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease 0s;
          cursor: pointer;

          &:hover {
            background: #425aef;
            color: #fff !important;
            -webkit-box-shadow: 0 8px 12px -3px #425aef23;
            box-shadow: 0 8px 12px -3px #425aef23;
          }

          sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
            top: -0.5em;
            right: -2px;
            opacity: .4;
            margin-left: 2px;
          }
        }

        .tag-item.active {
          font-size: 1.05rem;
          font-weight: 500;
          color: #425aef;
        }

      }

      hr {
        width: calc(100% - 4px);
        display: flex;
        position: relative;
        margin: 1rem 0;
        border: 1px dashed #425aef23;

      }

      .article-count-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        .article-count-item {
          width: 100%;
          flex: 0 0 48%;
          line-height: 2;


          a {
            padding: 3px 10px;
            overflow-wrap: break-word;
            text-decoration: none;
            color: #4c4948;
            transition: all .2s;
            border-radius: 8px;
            margin: 4px 0;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            border: 1px solid #e3e8f7;

            &:hover {
              color: #fff;
              background-color: #425aef;
              border-radius: 8px;
              border: 1px solid transparent;
            }


            .article-date {
              font-size: 13px;
              opacity: .6;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: auto;
              flex: inherit;
            }

            .article-num-group {
              display: flex;
              flex-direction: row;
              align-items: baseline;

              .article-num {
                text-align: left;
                font-size: 1.1rem;
                line-height: .9;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: auto;
                flex: inherit;
              }

              .article-num-text {
                width: fit-content;
                margin-left: 4px;
                font-size: 0.95rem;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }

      }

      .web-info-content {
        .web-info-item {
          display: flex;
          align-items: center;
          padding: 2px 10px 0;
          justify-content: space-between;
          color: #4c4948;

          .info-item-left {
            display: flex;
            box-flex: 1;
            align-items: center;
            padding-right: 20px;

            i {
              line-height: 2;
              margin-right: 6px;
              width: 16px;
              text-align: center;
            }

          }

          .info-item-right {

            opacity: .8;
          }
        }
      }
    }
  }
}
</style>