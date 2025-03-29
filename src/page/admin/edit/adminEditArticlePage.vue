<template>

  <div id="adminEditArticlePage">

    <!--标题-->
    <div id="header">
      <EditOutlined/>
      编辑文章
    </div>


    <!--信息填写主体-->
    <div class="editArticleBox">

      <a-form
          @submit="doEdit"
          class="ym-article-form"
          autocomplete="off"
          ref="formRef">
        <!--标题-->
        <a-form-item ref="name"
                     label="标题"
                     name="title">
          <a-input
              style="width: 40%"
              v-model:value="editArticle.articleTitle"
              placeholder="文章标题"
          />
        </a-form-item>
        <!--md编辑器 内容-->
        <a-form-item label="内容"
                     name="content">
          <div class="md-article">
            <MdEditor v-model="text"/>
          </div>
        </a-form-item>
        <!--简介-->
        <a-form-item label="文章简介"
                     name="introduction">
          <a-textarea
              v-model:value="editArticle.articleIntroduction"
              placeholder="请输入文章简介,默认取内容前30字符"
              :rows="4"/>
        </a-form-item>

        <!--文章标签-->
        <a-form-item label="文章标签">
          <!--标签-->
          <template v-for="(tag) in tagsState.tags" :key="tag">
            <a-tag closable @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
              v-if="tagsState.inputVisible"
              ref="inputRef"
              v-model:value="tagsState.inputValue"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
            <plus-outlined/>
            New Tag
          </a-tag>
        </a-form-item>

        <a-form-item label="文章分类">
          <a-input
              v-model:value="articleCategoryInput"
              style="width: 140px"
              :allowClear="true"
              placeholder="请输入文章分类"/>
        </a-form-item>

        <a-form-item label="是否加密">
          <div id="isEncrypt">
            <div id="tags">
              <a-tag class="tag" v-if="isEncrypt" color="red">是</a-tag>
              <a-tag class="tag" v-else color="green">否</a-tag>
            </div>
            <a-switch v-model:checked="isEncrypt"/>
            <a-input v-model:value="password" class="password" v-if="isEncrypt" placeholder="请输入密码"/>
          </div>
        </a-form-item>

        <a-form-item label="是否推荐">
          <div id="isEncrypt">
            <div id="tags">
              <a-tag class="tag" v-if="isRecommend" color="red">是</a-tag>
              <a-tag class="tag" v-else color="green">否</a-tag>
            </div>
            <a-switch v-model:checked="isRecommend"/>
          </div>
        </a-form-item>

        <a-form-item label="是否热门">
          <div id="isEncrypt">
            <div id="tags">
              <a-tag class="tag" v-if="isHot" color="red">是</a-tag>
              <a-tag class="tag" v-else color="green">否</a-tag>
            </div>
            <a-switch v-model:checked="isHot"/>
          </div>
        </a-form-item>

        <a-form-item label="文章状态">
          <a-space>
            <a-select
                v-model:value="articleStatusSelect"
                mode="combobox"
                :allowClear="true"
                style="width: 120px"
                placeholder="请选择文章状态"
                :options="articleStatusOptions"
            ></a-select>
          </a-space>
        </a-form-item>

        <a-form-item style="margin-bottom: 50px" label="文章封面">
          <YmUploadImage
              :imageData="imageData"
              :loading="uploadLoading"
              :beforeUpload="avatarBeforeUpload"
              :upload="avatarUpload"
              :clear-data="clearData"
          />
        </a-form-item>

        <a-form-item class="btn">
          <a-button type="primary"
                    html-type="submit">保存
          </a-button>
          <a-button type="primary" danger @click="doReset">重置</a-button>
        </a-form-item>
      </a-form>

    </div>


  </div>
</template>

<script setup lang="ts">
import {EditOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {useRoute} from "vue-router";
import {nextTick, onMounted, reactive, ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {message} from "ant-design-vue";
import YmUploadImage from "@/components/ym/YmUploadImage/YmUploadImage.vue";
import PictureConstant from "@/constants/pictureConstant.ts";
import {uploadPictureUsingPost} from "@/api/pictureController.ts";
import {
  adminEditArticleUsingPost,
  adminGetEditArticleByIdUsingGet,
  getArticleCategoryListUsingGet
} from "@/api/articleController.ts";
import router from "@/routers";

/**
 * 编辑 文章 数据 ref
 */
let editArticle = ref<API.Article>({})


/**
 * md 文档数据
 */
const text = ref('Hello Editor!');


/**
 * 标签 输入框 ref
 */
const inputRef = ref();

/**
 * 标签数据
 */
const tagsState = reactive({
  tags: [],
  inputVisible: false,
  inputValue: '',
});

/**
 * 删除 tags
 * @param removedTag
 */
const handleClose = (removedTag: string) => {
  tagsState.tags = tagsState.tags.filter(tag => tag !== removedTag);
};

/**
 * 显示 输入
 */
const showInput = () => {
  tagsState.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

/**
 * 确认输入
 */
const handleInputConfirm = () => {
  const inputValue = tagsState.inputValue;
  let tags = tagsState.tags;
  // @ts-ignore
  if (inputValue && tags.indexOf(inputValue) === -1) {
    // @ts-ignore
    tags = [...tags, inputValue];
  }
  // 重新赋值
  Object.assign(tagsState, {
    tags,
    inputVisible: false,
    inputValue: '',
  });
};


/**
 * 文章分类 数据
 */
const articleCategoryInput = ref<string>()

/**
 * 是否加密
 */
const isEncrypt = ref<boolean>(false)

/**
 * 是否推荐
 */
const isRecommend = ref<boolean>(false)


/**
 * 是否热门
 */
const isHot = ref<boolean>(false)

/**
 * 文章状态 默认分组
 */
const articleStatusOptions = [
  {
    value: "0",
    label: "草稿"
  },
  {
    value: "1",
    label: "未发布"
  },
  {
    value: "2",
    label: "已发布"
  }
]

/**
 * 文章状态 数据
 */
const articleStatusSelect = ref<string>()

// 图片数据
const imageData = ref<API.UploadPictureVo>({})


// 上传loading
const uploadLoading = ref<boolean>(false)

// 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
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

// 图片上传逻辑
async function avatarUpload(file: File) {
  uploadLoading.value = true

  // 上传 文件, 类型是文章
  const result = await uploadPictureUsingPost({
    pictureCategory: PictureConstant.PICTURE_CATEGORY_ARTICLE
  }, {}, file)
  // @ts-ignore
  if (result.data.code != 0) {
    // @ts-ignore
    message.error("上传文件失败:" + result.data.msg)
    uploadLoading.value = false
    return
  }
  // @ts-ignore
  imageData.value = result.data.data;
  uploadLoading.value = false
  message.success("上传成功")
}

// 清除照片数据
function clearData() {
  imageData.value = {}
}


/**
 * 加密的密码（后端加密）
 */
const password = ref()


/**
 * 组件挂载后渲染数据
 */
onMounted(async () => {
  const route = useRoute();
  // 利用 文章 id查询数据回显
  const result = await adminGetEditArticleByIdUsingGet({
    id: route.params?.id as string
  });

  if (result.data.code != 0) {
    message.error("文章查询失败：" + result.data.msg)
    // router.go(-1);
    return
  }

  // 数据渲染
  // @ts-ignore
  editArticle.value = result.data.data
  text.value = editArticle.value.articleContent as string
  if (editArticle.value.articleTags) {
    tagsState.tags = JSON.parse(editArticle.value.articleTags)
  }
  articleCategoryInput.value = editArticle.value.articleCategory
  isEncrypt.value = !!editArticle.value.isEncrypt
  isRecommend.value = !!editArticle.value.isRecommend
  isHot.value = !!editArticle.value.isHot
  articleStatusSelect.value = editArticle.value.articleStatus + ''
  imageData.value.pictureUrl = editArticle.value.articleBgImage
})


/**
 * 校验 标题
 */
const checkTitle = () => {
  if (!editArticle.value.articleTitle) {
    message.error("文章内容不能为空")
    return false
  }
  return true;
};


/**
 * 校验 内容
 */
const checkContent = () => {
  if (!text.value) {
    message.error('文章内容不能为空')
    return false;
  }
  if (text.value.length < 8) {
    message.error('文章内容长度不能小于8')
    return false;
  }
  return true;
};


/**
 * 编辑按钮
 */
async function doEdit() {
  // 手动校验内容
  if (!checkContent() || !checkTitle()) {
    return
  }
  // 补充数据,然后提交
  const editArticlePost: API.AdminEditArticleDto = {}
  editArticlePost.id = editArticle.value.id;
  editArticlePost.articleTitle = editArticle.value.articleTitle;
  editArticlePost.articleContent = text.value
  editArticlePost.articleIntroduction = editArticle.value.articleIntroduction
  editArticlePost.articleTags = JSON.stringify(tagsState.tags)
  editArticlePost.articleCategory = articleCategoryInput.value
  editArticlePost.isEncrypt = isEncrypt.value ? 1 : 0
  editArticlePost.encryptPassword = isEncrypt.value ? password.value : ""
  editArticlePost.isRecommend = isRecommend.value ? 1 : 0
  editArticlePost.isHot = isHot.value ? 1 : 0
  editArticlePost.articleStatus = Number.parseInt(articleStatusSelect.value as string)

  // 只有上传了图片才会有url
  if (imageData.value.pictureUrl) {
    editArticlePost.articleBgImage = imageData.value.pictureUrl
    editArticlePost.imageId = imageData.value.id
  }


  const result = await adminEditArticleUsingPost(editArticlePost);
  if (result.data.code != 0) {
    message.error("编辑文章失败:" + result.data.msg)
    return
  }

  message.success("编辑成功!")

  router.go(-1)

}

/**
 * 重置按钮
 */
function doReset() {

  editArticle.value = {}

}
</script>

<style lang="less">
#adminEditArticlePage {

  #header {
    width: 100%;
    background: var(--admin_content_bg_color);
    font-size: 26px;
    padding: 15px 10px;
    border-radius: 5px;
    margin-bottom: 25px;
  }

  .editArticleBox {
    width: 100%;
    background: var(--admin_content_bg_color);

    .ym-article-form {
      padding: 20px 25px;

      .inputTitle {
        max-width: 250px;
      }

      .md-article {
        #md-editor-v-0 {
          width: 100%;
          height: 640px;
          background: var(--admin_content_bg_color);
        }

        svg.md-editor-icon {
          width: 24px;
          height: 24px;
        }
      }

      #isEncrypt {
        display: flex;
        align-items: center;

        #tags {
          .tag {
            height: 26px;
            line-height: 24px;
            text-align: center;
          }

          margin-right: 10px;
        }

        .password {
          margin-left: 20px;
          max-width: 180px;
        }


      }

      .btn {
        button {
          width: 100%;
          margin-bottom: 25px;
          padding: 15px 15px;
          height: auto;
        }
      }

    }
  }


}
</style>