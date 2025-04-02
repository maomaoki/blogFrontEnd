<template>
  <div id="adminEditBlogSystemInfoPage">

    <div class="blogSystemInfo-edit-content">

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">banner信息</span>
        </div>

        <div class="edit-content">
          <!--banner背景图-->
          <div class="info">
            <span>背景图</span>
            <ym-upload-image
                :image-data="bannerImageData"
                :loading="bannerUploadLoading"
                :upload="bannerUpload"
                :before-upload="bannerBeforeUpload"
                :clear-data="bannerClearData"/>
          </div>
          <!--更多背景图-->
          <div class="info">
            <span>更多-背景图</span>
            <ym-upload-image
                :image-data="moreImageData"
                :loading="moreUploadLoading"
                :upload="moreUpload"
                :before-upload="moreBeforeUpload"
                :clear-data="moreClearData"/>
          </div>
          <!--登录背景图-->
          <div class="info">
            <span>登录-背景图</span>
            <ym-upload-image
                :image-data="loginImageData"
                :loading="loginUploadLoading"
                :upload="loginUpload"
                :before-upload="loginBeforeUpload"
                :clear-data="loginClearData"/>
          </div>
          <!--新闻-背景图-->
          <div class="info">
            <span>新闻-背景图</span>
            <ym-upload-image
                :image-data="newsBannerImageData"
                :loading="newsBannerUploadLoading"
                :upload="newsBannerUpload"
                :before-upload="newsBannerBeforeUpload"
                :clear-data="newsBannerClearData"/>
          </div>
          <!--打印文字列表-->
          <div class="info">
            <span>打印文字列表</span>
            <span>
              <a-textarea
                  v-model:value="blogSystemInfo.homeBannerPrintText"
                  placeholder="请输入打印文字以中文句号。隔开"
                  :rows="4"/>
            </span>
          </div>
          <!--标题-->
          <div class="info">
            <span>标题</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.homeBannerTitle"
                  placeholder="banner标题"
              />
						</span>
          </div>
          <!--更多 - 标题-->
          <div class="info">
            <span>更多-标题</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.moreTitle"
                  placeholder="更多de标题"
              />
						</span>
          </div>
          <!--更多 - 内容-->
          <div class="info">
            <span>更多-内容</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.moreContent"
                  placeholder="更多de内容"
              />
						</span>
          </div>
          <!--随便看看 - 内容-->
          <div class="info">
            <span>随便看看-内容</span>
            <span>
              <a-textarea
                  style="width: 40%"
                  v-model:value="blogSystemInfo.slideWrapTitle"
                  placeholder="随便看看de内容,以中文。分割"
              />
						</span>
          </div>
          <!--随便看看 - url-->
          <div class="info">
            <span>随便看看-url</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.slideWrapUrl"
                  placeholder="随便看看deUrl"
              />
						</span>
          </div>
          <!--新闻 - 标题-->
          <div class="info">
            <span>新闻-标题</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.newsBannerTitle"
                  placeholder="新闻de标题"
              />
						</span>
          </div>
          <!--新闻 - 内容-->
          <div class="info">
            <span>新闻banner-打印文字</span>
            <span>
              <a-textarea
                  :rows="4"
                  v-model:value="blogSystemInfo.newsBannerPrintText"
                  placeholder="新闻de内容,以中文。隔开"
              />
						</span>
          </div>
        </div>
      </div>

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">名片信息</span>
        </div>

        <div class="edit-content">
          <!--名片头像-->
          <div class="info">
            <span>头像</span>
            <span>
              <ym-avatar
                  :image-data="avatarImageData"
                  :loading="avatarUploadLoading"
                  :upload="avatarUpload"
                  :before-upload="avatarBeforeUpload"
                  :clear-data="avatarClearData"/>
            </span>

          </div>
          <!--顶部展示文字-->
          <div class="info">
            <span>顶部展示文字</span>
            <span>
               <a-input
                   style="width: 40%"
                   v-model:value="blogSystemInfo.businessCardTop"
                   placeholder="顶部展示文字"
               />
              </span>
          </div>
          <!--名片展示文字-->
          <div class="info">
            <span>展示内容</span>
            <span>
              <a-textarea
                  v-model:value="blogSystemInfo.businessCardText"
                  placeholder="请输入展示内容,高亮以<b></b>可以使用html文档格式"
                  :rows="4"/>
              </span>
          </div>
          <!--标题-->
          <div class="info">
            <span>名片标题</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.businessCardTitle"
                  placeholder="名片标题"
              />
						</span>
          </div>
          <!--名片名称-->
          <div class="info">
            <span>名片名称</span>
            <span>
              <a-input
                  style="width: 40%"
                  v-model:value="blogSystemInfo.businessCardName"
                  placeholder="名片名称"
              />
						</span>
          </div>
          <!--名片关联的B站分享地址-->
          <div class="info">
            <span>B站分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.businessCardBiliUrl "
                   placeholder="B站分享地址"
               />
						</span>
          </div>
          <!--名片关联的GitHub分享地址-->
          <div class="info">
            <span>GitHub分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.businessCardGitHubUrl"
                   placeholder="GitHub分享地址"
               />
						</span>
          </div>
        </div>
      </div>

      <div class="edit-card">
        <div class="edit-title">
          <span class="text">博客系统信息</span>
        </div>

        <div class="edit-content">
          <!--博客系统管理员的名称-->
          <div class="info">
            <span>管理员的名称</span>
            <span>
               <a-input
                   style="width: 40%"
                   v-model:value="blogSystemInfo.blogSystemUserName"
                   placeholder="管理员的名称"
               />
              </span>
          </div>
          <!--博客的创建时间-->
          <div class="info">
            <span>创建时间</span>
            <span>
              <a-date-picker
                  show-time
                  v-model:value="blogCreate"
                  placeholder="博客的创建时间"/>
            </span>

          </div>
          <!--博客的备案号-->
          <div class="info">
            <span>备案号</span>
            <span>
               <a-input
                   style="width: 40%"
                   v-model:value="blogSystemInfo.blogRegistrationNumber"
                   placeholder="备案号"
               />
              </span>
          </div>
          <!--博客备案号地址-->
          <div class="info">
            <span>备案号地址</span>

            <span>
               <a-input
                   style="width: 40%"
                   v-model:value="blogSystemInfo.blogRegistrationNumberUrl"
                   placeholder="备案号地址"
               /></span>
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
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareBiliUrl"
                   placeholder="B站分享地址"
               />
              </span>
          </div>
          <div class="info">
            <span>GitHub分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareGitHubUrl"
                   placeholder="GitHub分享地址"
               />
              </span>
          </div>
          <div class="info">
            <span>Gitee分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareGiteeUrl"
                   placeholder="Gitee分享地址"
               />
              </span>
          </div>
          <div class="info">
            <span>Email分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareEmailUrl"
                   placeholder="Email分享地址"
               />
              </span>
          </div>
          <div class="info">
            <span>QQ分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareQQUrl"
                   placeholder="QQ分享地址"
               />
              </span>
          </div>
          <div class="info">
            <span>微信分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareWxUrl"
                   placeholder="微信分享地址"
               />
              </span>

          </div>
          <div class="info">
            <span>抖音分享地址</span>
            <span>
               <a-input
                   style="width: 80%"
                   v-model:value="blogSystemInfo.shareDyUrl"
                   placeholder="抖音分享地址"
               />
              </span>
          </div>
        </div>
      </div>

      <div class="btn">
        <a-button type="primary"
                  @click="doEdit"
        >保存
        </a-button>
        <a-button type="primary" danger @click="doReset">重置</a-button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";
import dayjs, {Dayjs} from "dayjs";
import {adminEditBlogSystemInfoUsingPost, getBlogSystemInfoUsingGet} from "@/api/blogSystemController.ts";
import YmUploadImage from "@/components/ym/YmUploadImage/YmUploadImage.vue";
import PictureConstant from "@/constants/pictureConstant.ts";
import {uploadPictureUsingPost} from "@/api/pictureController.ts";
import YmAvatar from "@/components/ym/YmAvatar/YmAvatar.vue";
import router from "@/routers";

/**
 * 获取 blog 系统 信息
 */
const blogSystemInfo = ref<API.BlogSystemInfoVo>({})


// banner图片数据
const bannerImageData = ref<API.UploadPictureVo>({})

// banner上传loading
const bannerUploadLoading = ref<boolean>(false)

// banner上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
function bannerBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 3) {
    message.error("文件大小过大")
    return false
  }

  if (!PictureConstant.ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("文件类型错误")
    return false
  }
  return true;
}

// banner图片上传逻辑
async function bannerUpload(file: File) {
  bannerUploadLoading.value = true

  // 上传 文件, 类型是banner
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_BANNER
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    bannerUploadLoading.value = false
    return
  }
  // @ts-ignore
  bannerImageData.value = result.data.data;
  bannerUploadLoading.value = false
  message.success("上传成功")
}

// banner清除照片数据
function bannerClearData() {
  bannerImageData.value = {}
}


// avatar图片数据
const avatarImageData = ref<API.UploadPictureVo>({})

// avatar上传loading
const avatarUploadLoading = ref<boolean>(false)

// avatar上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
function avatarBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 3) {
    message.error("文件大小过大")
    return false
  }

  if (!PictureConstant.ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("文件类型错误")
    return false
  }
  return true;
}

// avatar图片上传逻辑
async function avatarUpload(file: File) {
  avatarUploadLoading.value = true

  // 上传 文件, 类型是banner
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_BANNER
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    avatarUploadLoading.value = false
    return
  }
  // @ts-ignore
  avatarImageData.value = result.data.data;
  avatarUploadLoading.value = false
  message.success("上传成功")
}

// avatar清除照片数据
function avatarClearData() {
  avatarImageData.value = {}
}


// more图片数据
const moreImageData = ref<API.UploadPictureVo>({})
// more上传loading
const moreUploadLoading = ref<boolean>(false)

// more上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
function moreBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 3) {
    message.error("文件大小过大")
    return false
  }

  if (!PictureConstant.ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("文件类型错误")
    return false
  }
  return true;
}

// more图片上传逻辑
async function moreUpload(file: File) {
  moreUploadLoading.value = true

  // 上传 文件, 类型是more
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_MORE
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    moreUploadLoading.value = false
    return
  }
  // @ts-ignore
  moreImageData.value = result.data.data;
  moreUploadLoading.value = false
  message.success("上传成功")
}

// more清除照片数据
function moreClearData() {
  moreImageData.value = {}
}


// login图片数据
const loginImageData = ref<API.UploadPictureVo>({})
// login上传loading
const loginUploadLoading = ref<boolean>(false)

// login上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
function loginBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 3) {
    message.error("文件大小过大")
    return false
  }

  if (!PictureConstant.ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("文件类型错误")
    return false
  }
  return true;
}

// login图片上传逻辑
async function loginUpload(file: File) {
  loginUploadLoading.value = true

  // 上传 文件, 类型是more
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_LOGIN
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    loginUploadLoading.value = false
    return
  }
  // @ts-ignore
  loginImageData.value = result.data.data;
  loginUploadLoading.value = false
  message.success("上传成功")
}

// login清除照片数据
function loginClearData() {
  loginImageData.value = {}
}


// newsBanner图片数据
const newsBannerImageData = ref<API.UploadPictureVo>({})
// newsBanner上传loading
const newsBannerUploadLoading = ref<boolean>(false)

// newsBanner上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
function newsBannerBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 3) {
    message.error("文件大小过大")
    return false
  }

  if (!PictureConstant.ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("文件类型错误")
    return false
  }
  return true;
}

// newsBanner图片上传逻辑
async function newsBannerUpload(file: File) {
  newsBannerUploadLoading.value = true

  // 上传 文件, 类型是more
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_NEWS_BANNER
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    newsBannerUploadLoading.value = false
    return
  }
  // @ts-ignore
  newsBannerImageData.value = result.data.data;
  newsBannerUploadLoading.value = false
  message.success("上传成功")
}

// newsBanner清除照片数据
function newsBannerClearData() {
  newsBannerImageData.value = {}
}


/**
 * 博客 创建日期
 */
const blogCreate = ref<Dayjs>()


onMounted(async () => {
  const result = await getBlogSystemInfoUsingGet();
  if (result.data.code !== 0) {
    message.error("获取blog系统信息错误")
    return
  }
  // @ts-ignore
  blogSystemInfo.value = result.data.data
  // banner
  bannerImageData.value.pictureUrl = blogSystemInfo.value?.homeBannerBgImageUrl
  // avatar
  avatarImageData.value.pictureUrl = blogSystemInfo.value?.businessCardAvatarUrl
  // more
  moreImageData.value.pictureUrl = blogSystemInfo.value?.moreImageUrl
  // login
  loginImageData.value.pictureUrl = blogSystemInfo.value?.loginImageUrl
  // news
  newsBannerImageData.value.pictureUrl = blogSystemInfo.value?.newsBannerBgImageUrl
  // blogCreateTime
  blogCreate.value = dayjs(blogSystemInfo.value.blogCreateTime)
})


/**
 * 触发 编辑
 */
async function doEdit() {

  // 刷新数据
  blogSystemInfo.value.homeBannerBgImageUrl = bannerImageData.value.pictureUrl
  blogSystemInfo.value.businessCardAvatarUrl = avatarImageData.value.pictureUrl
  blogSystemInfo.value.moreImageUrl = moreImageData.value.pictureUrl
  blogSystemInfo.value.loginImageUrl = loginImageData.value.pictureUrl
  blogSystemInfo.value.newsBannerBgImageUrl = newsBannerImageData.value.pictureUrl
  // @ts-ignore
  blogSystemInfo.value.blogCreateTime = blogCreate.value


	
  // 提交修改
  const result = await adminEditBlogSystemInfoUsingPost(blogSystemInfo.value)
  if (result.data.code != 0) {
    message.error("编辑错误:" + result.data.msg)
    return
  }
  message.success("编辑成功!")
  await router.push("/admin/adminSystemManage")
}

/**
 * 触发重置(这个功能不需要做,太麻烦了)
 */
function doReset() {

  message.warn("此功能不需要做!")
}

</script>


<style lang="less">
#adminEditBlogSystemInfoPage {
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

        }

      }

      &:not(&:last-child) {
        border-bottom: 1px solid var(--admin_line_bg_color);
      }

    }


    .btn {
      margin-top: 60px;

      button {
        width: 100%;
        margin-bottom: 25px;
        padding: 15px 15px;
        height: auto;
      }
    }


  }


}
</style>