<template>
  <div id="adminBlogSystemInfoMangePage">

    <div class="blogSystemInfo-edit-content">

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">banner信息</span>
          <a href="/admin/adminSystemManage/edit" class="href">
            <EditOutlined/>
            编辑
          </a>
        </div>

        <div class="edit-content">
          <!--banner背景图-->
          <div class="info">
            <span>背景图</span>
            <a-image
                :src="blogSystemInfo?.homeBannerBgImageUrl"
                style="max-height: 600px;object-fit: contain"
            />
          </div>
          <div class="info">
            <span>更多-背景图</span>
            <a-image
                :src="blogSystemInfo?.moreImageUrl"
                style="max-height: 600px;object-fit: contain"
            />
          </div>
          <div class="info">
            <span>登录背景图</span>
            <a-image
                :src="blogSystemInfo?.loginImageUrl"
                style="max-height: 600px;object-fit: contain"
            />
          </div>
          <div class="info">
            <span>新闻背景图</span>
            <a-image
                :src="blogSystemInfo?.newsBannerBgImageUrl"
                style="max-height: 600px;object-fit: contain"
            />
          </div>
          <!--打印文字列表-->
          <div class="info">
            <span>打印文字列表</span>
            <div>
              <p v-for="item in cutPrintText(blogSystemInfo?.homeBannerPrintText)">
                {{ item + '。' }}
              </p>
            </div>
          </div>
          <!--标题-->
          <div class="info">
            <span>标题</span>
            <span>
							{{ blogSystemInfo?.homeBannerTitle }}
						</span>
          </div>
          <!--更多 标题-->
          <div class="info">
            <span>更多-标题</span>
            <span>
							{{ blogSystemInfo?.moreTitle }}
						</span>
          </div>
          <!--更多 内容-->
          <div class="info">
            <span>更多-内容</span>
            <span>
							{{ blogSystemInfo?.moreContent }}
						</span>
          </div>
          <!--随便看看 内容-->
          <div class="info">
            <span>随便看看-内容</span>
            <span>
							{{ blogSystemInfo?.slideWrapTitle }}
						</span>
          </div>
          <!--随便看看 url-->
          <div class="info">
            <span>随便看看-url</span>
            <span>
							{{ blogSystemInfo?.slideWrapUrl }}
						</span>
          </div>
          <!--news banner printText-->
          <div class="info">
            <span>新闻-打印文字列表</span>
            <div>
              <p v-for="item in cutPrintText(blogSystemInfo?.newsBannerPrintText)">
                {{ item + '。' }}
              </p>
            </div>
          </div>
          <!--news banner 标题-->
          <div class="info">
            <span>新闻页面-标题</span>
            <span>
							{{ blogSystemInfo?.newsBannerTitle }}
						</span>
          </div>
        </div>
      </div>

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">名片信息</span>
          <a href="#" class="href">
            <EditOutlined/>
            编辑
          </a>
        </div>

        <div class="edit-content">
          <!--名片头像-->
          <div class="info">
            <span>头像</span>
            <div class="avatar">
              <img class="avatar"
                   :src="blogSystemInfo?.businessCardAvatarUrl" alt="">
            </div>
          </div>
          <!--顶部展示文字-->
          <div class="info">
            <span>顶部展示文字</span>
            <span>{{ blogSystemInfo?.businessCardTop }}</span>
          </div>
          <!--名片展示文字-->
          <div class="info">
            <span>展示内容</span>
            <span>{{ blogSystemInfo?.businessCardText }}</span>
          </div>
          <!--标题-->
          <div class="info">
            <span>标题</span>
            <span>
							{{ blogSystemInfo?.businessCardTitle }}
						</span>
          </div>
          <!--名片名称-->
          <div class="info">
            <span>名称</span>
            <span>
							{{ blogSystemInfo?.businessCardName }}
						</span>
          </div>
          <!--名片关联的B站分享地址-->
          <div class="info">
            <span>B站分享地址</span>
            <span>
							{{ blogSystemInfo?.businessCardBiliUrl }}
						</span>
          </div>
          <!--名片关联的GitHub分享地址-->
          <div class="info">
            <span>GitHub分享地址</span>
            <span>
							{{ blogSystemInfo?.businessCardGitHubUrl }}
						</span>
          </div>
        </div>
      </div>

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">博客系统信息</span>
          <a href="#" class="href">
            <EditOutlined/>
            编辑
          </a>
        </div>

        <div class="edit-content">
          <!--博客系统管理员的名称-->
          <div class="info">
            <span>管理员的名称</span>
            <span>{{ blogSystemInfo?.blogSystemUserName }}</span>
          </div>
          <!--博客的创建时间-->
          <div class="info">
            <span>创建时间</span>
            <span>{{ dayjs(blogSystemInfo?.blogCreateTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
          </div>
          <!--博客的备案号-->
          <div class="info">
            <span>备案号</span>
            <span>{{ blogSystemInfo?.blogRegistrationNumber }}</span>
          </div>
          <!--博客备案号地址-->
          <div class="info">
            <span>备案号地址</span>
            <span>{{ blogSystemInfo?.blogRegistrationNumberUrl }}</span>
          </div>
        </div>
      </div>

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">分享地址</span>
        </div>

        <div class="edit-content">
          <div class="info">
            <span>B站分享地址</span>
            <span>{{ blogSystemInfo?.shareBiliUrl }}</span>
          </div>
          <div class="info">
            <span>GitHub分享地址</span>
            <span>{{ blogSystemInfo?.shareGitHubUrl }}</span>
          </div>
          <div class="info">
            <span>Gitee分享地址</span>
            <span>{{ blogSystemInfo?.shareGiteeUrl }}</span>
          </div>
          <div class="info">
            <span>Email分享地址</span>
            <span>{{ blogSystemInfo?.shareEmailUrl }}</span>
          </div>
          <div class="info">
            <span>QQ分享地址</span>
            <span>{{ blogSystemInfo?.shareQQUrl }}</span>
          </div>
          <div class="info">
            <span>微信分享地址</span>
            <span>{{ blogSystemInfo?.shareWxUrl }}</span>
          </div>
          <div class="info">
            <span>抖音分享地址</span>
            <span>{{ blogSystemInfo?.shareDyUrl }}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {EditOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
import {getBlogSystemInfoUsingGet} from "@/api/blogSystemController.ts";

/**
 * 获取 blog 系统 信息
 */
const blogSystemInfo = ref<API.BlogSystemInfoVo>()


onMounted(async () => {
  const result = await getBlogSystemInfoUsingGet();
  if (result.data.code !== 0) {
    message.error("获取blog系统信息错误")
    return
  }
  // @ts-ignore
  blogSystemInfo.value = result.data.data
})


/**
 * 切割 打印 文字
 */
function cutPrintText(text?: string): string[] {
  // @ts-ignore
  return (text == undefined) ? [] : text.split("。").slice(0, -1);
}


</script>


<style lang="less">
#adminBlogSystemInfoMangePage {
  width: 100%;

  .blogSystemInfo-header {
    width: 100%;
    background: var(--admin_content_bg_color);
    border-radius: 10px;
    padding: 15px 15px;
    margin-bottom: 20px;

    .blogSystemInfo-content {
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--admin_active_bg_color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

      }

      .blogSystemInfo-content-card {

        .userProfile {
          width: 150px;
          overflow: hidden; /* 隐藏超出范围的内容 */
          text-overflow: ellipsis; /* 使用省略号 */
          margin-bottom: 20px;
        }

        .tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          span {
            margin: 0 5px 5px 0;
          }
        }

      }
    }
  }

  .blogSystemInfo-edit-content {
    width: 100%;
    background: var(--admin_content_bg_color);
    border-radius: 10px;
    padding: 15px 15px;

    .edit-card {
      padding: 10px 0;

      .edit-title {
        width: 100%;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          font-size: 20px;
        }

        .href {
          color: var(--admin_link_color);
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s;

          &:hover {
            color: var(--admin_link_hover_color);
          }
        }
      }

      .edit-content {
        padding: 10px 15px;

        .info {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20px 0;
          text-align: left;

          > span:nth-child(1) {
            width: 11%;
            text-align: left;
            margin-right: 10px;
          }

          > span:nth-child(2) {
            width: 85%;
            // 换行
            word-wrap: break-word;
          }

          img {
            height: 180px;
          }

          .avatar {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              padding: 5px;
              object-fit: contain;
              border: 5px solid #F6F8FA;
            }
          }

        }

      }

      &:not(&:last-child) {
        border-bottom: 1px solid var(--admin_line_bg_color);
      }
    }


  }


}
</style>