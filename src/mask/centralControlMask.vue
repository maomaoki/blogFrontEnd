<template>

  <div id="centralControlMask"
       :class="getIsShowCentralControl()?'isShow':''">

    <div class="centralControl-card-group">

      <div class="centralControl-card-group-left">
        <div class="console-card" id="card-newest-comments">
          <div class="card-content">
            <div class="author-content-item-tips">
              互动
            </div>
            <div class="author-content-item-title">
              最新评论
            </div>
          </div>
          <div class="aside-list">
            <div
                @click="gotoComment(item.articleId,item.id)"
                v-for="item in commentList" class="aside-list-item">
              <a class="thumbnail">
                <img
                    :src="item.userCommentVo?.userAvatar"
                    alt="">
                <div class="name">
                  <span>{{ item.userCommentVo?.userName }}</span>
                </div>
              </a>
              <div class="content">
                <a class="comment"
                   :title="item.content">
                  {{ item.content }}
                </a>
                <time datetime="2025-03-02T14:44:38.473Z">{{ calculateDistance(new Date(item.createTime)) }}</time>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="centralControl-card-group-right">

        <div class="console-card tags">

          <div class="card-content">
            <div class="author-content-item-tips">
              兴趣点
            </div>
            <div class="author-content-item-title">
              寻找你喜欢的领域
            </div>
            <div class="card-tags">

              <div class="item-headline"></div>
              <div class="card-tag-cloud">
                <a @click="()=>{router.push('/tags/' + item.name);isNotShow()}" v-for="item in articleTagsList">
                  {{ item.name }}
                  <sup>{{ item.count }}</sup>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div class="console-card history">
          <div class="card-archives">

            <ul class="card-archive-list">

              <li v-for="item in articleTimeList" class="card-archive-list-item">
                <a @click="()=>{router.push('/timer/' + convertYearAndMonth(item.time));isNotShow()}"
                   class="card-archive-list-link">
                  <span class="card-archive-list-date">{{ convert(item.time) }}</span>
                  <div class="card-archive-list-count-group">
                    <span class="card-archive-list-count">
                      {{ item.count }}
                    </span>
                    <span>篇</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <div class="button-group">


      <div class="console-btn-item on">
        <a title="测试" href="#" class="darkmode_switchbutton">
          <i class="iconfont icon-yueliang"></i>
        </a>
      </div>
      <div class="console-btn-item">
        <a v-if="userInfo.id == undefined" title="登录" href="/login" class="darkmode_switchbutton">
          <span>login</span>
        </a>

        <a v-else title="个人后台" href="/admin/home" class="darkmode_switchbutton">
          <img :src="userInfo.userAvatar" alt="头像">
        </a>

      </div>


      <div
          v-if="userInfo.id != undefined"
          class="console-btn-item" @click="logout">
        <a title="注销" href="#" class="darkmode_switchbutton">
          <LoginOutlined/>
        </a>
      </div>
    </div>


    <div class="mask-bg" @click.stop="isNotShow"></div>
  </div>
</template>
<script setup lang="ts">

import {useComponentStores} from "@/stores/useComponentStores.ts";
import {onMounted, ref} from "vue";
import {LoginOutlined} from "@ant-design/icons-vue";
import {userLogoutUsingPost} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import {useUserStores} from "@/stores/useUserStores.ts";
import {getArticleTagsCountUsingGet, getArticleTimeCountUsingGet} from "@/api/articleController.ts";
import {commentListByLatestUsingGet} from "@/api/commentController.ts";
import calculateDistance from "@/utils/calculateDate.ts";

const {getIsShowCentralControl, setIsShowCentralControl} = useComponentStores();

/**
 *  关闭 遮罩
 */
function isNotShow() {

  setIsShowCentralControl(false)
}


/**
 * 用户 信息
 */
const userInfo = ref<API.UserVo>({})


const userStore = useUserStores()
const {getUserInfo, cleanUserInfo} = userStore

/**
 *  标签 列表
 */
const articleTagsList = ref<API.ArticleTagsCountVo[]>([])

/**
 * 日期 列表
 */
const articleTimeList = ref<API.ArticleTimeCountVo[]>()

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
  const month = chineseNumbers[Number.parseInt(times[1] as string) - 1]
  return `${month}月 ${times[0]}`
}

/**
 * 转换 查询 年月日期
 */
function convertYearAndMonth(time: string) {
  // - 切割 拿到 年份 和 月份
  const times = time.split("-");
  const year = times[0];
  const month = times[1];
  return `${year}/${month}`
}


/**
 * 评论 列表
 */
const commentList = ref<API.CommentVo[]>([])


onMounted(async () => {

  const articleTagsResult = await getArticleTagsCountUsingGet()
  if (articleTagsResult.data.code != 0) {
    await message.error("标签获取错误")
  }

  const articleTimersListResult = await getArticleTimeCountUsingGet()
  if (articleTimersListResult.data.code != 0) {
    await message.error("日期分类获取失败")
  }


  articleTagsList.value = articleTagsResult.data.data || []
  articleTimeList.value = articleTimersListResult.data.data || []
  // 这里可以排个序
  articleTagsList.value = articleTagsList.value.sort((a, b) => parseInt(b.count + '') - parseInt(a.count + ''))
  userInfo.value = getUserInfo();


  // 获取 评论 列表
  const commentListResult = await commentListByLatestUsingGet({
    size: 6
  })
  if (commentListResult.data.code != 0) {
    await message.error("获取最新评论列表错误")
  }

  commentList.value = commentListResult.data.data || []

})

/**
 * 跳转到对应文章评论
 */
async function gotoComment(articleId?: number, commentId?: number) {

  // 关闭
  isNotShow()
  // 跳转
  await router.push(`/article/${articleId}#${commentId}`)

}


/**
 * 注销
 */
async function logout() {

  const result = await userLogoutUsingPost()
  if (result.data.code !== 0) {
    message.error("注销失败:" + result.data.msg);
    return;
  }
  message.success("注销成功");

  // 1. 需要清空一些东西
  localStorage.removeItem("tags_list");
  // 清空用户信息
  cleanUserInfo()
  // 2. 关闭 中控 遮罩
  isNotShow()
  // 3. 跳转到 主页
  await router.push("/home")
}


</script>

<style lang="less">
#centralControlMask {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  justify-content: center;
  opacity: 0;
  transition: .3s ease-out, color 0s;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  margin: 0 !important;
  z-index: 999;

  &.isShow {
    opacity: 1;
    pointer-events: all;

    .mask-bg {
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transform: translateZ(0);
    }

    .centralControl-card-group {
      transform: translateY(0);
      opacity: 1;
      transition-delay: .1s;
    }
  }

  .centralControl-card-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    transform: translateY(20px);
    transition: .3s;
    opacity: 0;
    max-width: 80%;
    max-height: 70%;

    .console-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e3e8f7;
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      padding: 40px;
    }

    .card-content .author-content-item-tips {
      opacity: .8;
      font-size: 12px;
      margin-bottom: 15px;
      color: #4c4948;
    }

    .card-content .author-content-item-title {
      font-size: 27px;
      font-weight: 700;
      line-height: 1;
      color: #4c4948;
    }

    .centralControl-card-group-left {
      margin-right: 15px;
      width: 40%;
      height: 100%;

      #card-newest-comments {
        height: 100%;
        min-height: 580px;


        .aside-list {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 15px;

          .aside-list-item {
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e3e8f7;
            padding: 12px 16px;
            width: 49%;
            display: flex;
            flex-direction: column;
            height: 150px;
            transition: .3s;
            cursor: pointer;

            &:hover {
              background: #425aef;
              color: #fff;

              .thumbnail {
                color: #fff;
              }

              .comment {
                color: #fff;
              }

              time {
                color: #fff !important;
              }
            }
          }

          .aside-list-item:not(:last-child) {
            margin-bottom: 15px;
          }

          .aside-list-item .thumbnail {
            display: flex;
            align-items: center;
            width: fit-content;
          }

          .aside-list-item .thumbnail img {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 20px;
          }

          .aside-list-item .thumbnail .name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 130px;
            font-weight: 700;
          }

          .aside-list-item .content {
            display: flex;
            flex-direction: column;
            height: 100%;
            margin-top: 15px;
          }

          .aside-list-item .content .comment {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            line-height: 24px;
            font-size: 14px;
            border-radius: 0;

          }

          .aside-list-item .content time {
            font-size: 12px;
            margin-top: auto;
            color: #363636;
          }

          a {
            color: #363636;
            text-decoration: none;
            word-wrap: break-word;
            -webkit-transition: all .2s ease 0s;
            -moz-transition: all .2s ease 0s;
            -o-transition: all .2s ease 0s;
            -ms-transition: all .2s ease 0s;
            transition: all .2s ease 0s;
            overflow-wrap: break-word;
          }

          img {
            border-style: none;
            border-radius: 8px;
            max-width: 100%;
            transition: all .2s ease 0s;
          }
        }
      }
    }

    .centralControl-card-group-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      width: 60%;
      overflow: hidden;
      min-width: 575px;


      .tags {
        height: calc(100% - 172px);

        .card-content {

          .card-tags {

            .card-tag-cloud {
              margin-top: 15px;
              display: flex;
              flex-wrap: wrap;
              max-height: 230px;
              overflow: hidden;
            }

            .card-tag-cloud a {
              color: #363636 !important;
              margin: 6px 4px;
              padding: 8px 8px;
              border-radius: 8px;
              background: #f7f7f9;
              border: 1px solid #e3e8f7;
              font-size: 14px !important;
              font-weight: 700;
              transition: all .2s ease 0s;
            }

            .card-tag-cloud a sup {
              opacity: .6;
              font-size: 75%;
              top: -.5em;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
            }


            .card-tag-cloud a:hover {
              background: #425aef;
              color: #fff !important;
            }

          }
        }
      }


      .history {
        margin-top: 8px;
        padding: 0;
        background: 0 0;
        box-shadow: none;
        border: none;
        overflow: hidden;
        min-width: 575px;


        .card-archives {

          .card-archive-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: -3px;

            .card-archive-list-item {
              list-style: none;
              flex: 0 0 25%;
              width: 100%;
              -webkit-box-flex: 1;
            }

            .card-archive-list-item a {
              transition: all .2s ease 0s;
              overflow-wrap: break-word;
              color: #363636;
              text-decoration: none;
              border-radius: 8px;
              margin: 4px;
              display: flex;
              flex-direction: column;
              align-content: space-between;
              border: 1px solid #e3e8f7;
              background: #fff;
              padding: 8px 16px;
            }

            .card-archive-list-item a:hover {
              background: #425aef;
              color: #fff !important;
            }

            .card-archive-list-item .card-archive-list-date {
              font-size: 13px;
              opacity: .6;
            }

            .card-archive-list-item .card-archive-list-count-group {
              display: flex;
              flex-direction: row;
              align-items: baseline;
              padding: 12px 0;
            }

            .card-archive-list-count {
              width: auto;
              text-align: left;
              font-size: 18px;
              line-height: .9;
              font-weight: 700;
            }


          }
        }
      }

    }
  }

  .button-group {
    display: flex;
    margin: 1rem auto 0 auto;
    justify-content: center;
    width: fit-content;

    .console-btn-item {
      width: 60px;
      height: 60px;
      transition: .3s;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: .5rem;
      }

      a {
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #e3e8f7;
        border-radius: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #363636;
        transition: all .2s ease 0s;
        overflow-wrap: break-word;

        &:hover {
          background: #425aef !important;
          color: #fff;
        }

        i {
          font-size: 18px;
          font-weight: 700;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 60px;

        }
      }


    }


    .console-btn-item.on {
      a {
        background: #e38100;
        color: #fff;
        transition: .3s;
      }
    }
  }

  .mask-bg {
    background: rgba(255, 255, 255, 0.85);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    transition: .3s;
    margin: 0 !important;
  }
}
</style>