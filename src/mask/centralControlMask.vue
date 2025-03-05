<template>

  <div id="centralControlMask" class="isShow">

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
            <div v-for="item in 6" class="aside-list-item">
              <a href="#" class="thumbnail">
                <img
                    src="https://weavatar.com/avatar/1d1162d86acadb2b36eec178f72c268dea951e6b0148d02a79ca8b963de5b91a?d=mp&r=G"
                    alt="">
                <div class="name">
                  <span>WinChin</span>
                </div>
              </a>
              <div class="content">
                <a class="comment"
                   title="昵称（请勿包含博客等字样）：WinChin网站地址（要求博客地址，请勿提交个人主页）：[链接]头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：[链接]描述：我们都是有故事的人-生而为赢">
                  昵称（请勿包含博客等字样）：WinChin网站地址（要求博客地址，请勿提交个人主页）：[链接]头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：[链接]描述：我们都是有故事的人-生而为赢
                </a>
                <time datetime="2025-03-02T14:44:38.473Z">两天前</time>

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
          </div>

        </div>

        <div class="console-card history"></div>
      </div>

    </div>


    <div class="mask-bg"></div>
  </div>
</template>
<script setup lang="ts">

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
  z-index: 2;

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

    .centralControl-card-group-left {
      margin-right: 15px;
      width: 40%;
      height: 100%;

      #card-newest-comments {
        height: 100%;
        min-height: 580px;

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

        .card-content{
          
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