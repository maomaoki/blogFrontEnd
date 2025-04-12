<template>

  <div id="adminCollectArticleManagePage">
    <!--上面是 搜索框-->
    <div class="ym-search-bar">
      <a-form
          class="ym-form"
          :model="searchParams"
          @finish="doSearch">
        <a-form-item label="文章标题">
          <a-input
              allow-clear
              v-model:value="searchParams.articleTitle"
              placeholder="输入文章标题"/>
        </a-form-item>
        <a-form-item label="文章标签">
          <a-select
              v-model:value="articleTagsSelect"
              mode="tags"
              style="width: 180px"
              placeholder="请输入文章标签"
              :max-tag-count=3
              :options="articleTagsOptions"
          ></a-select>
        </a-form-item>
        <a-form-item label="文章分类">
          <a-input
              v-model:value="articleCategoryInput"
              :allowClear="true"
              style="width: 140px"
              placeholder="请输入文章分类"
          >

          </a-input>
        </a-form-item>
        <a-form-item class="btn">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button type="primary" danger @click="doReset">重置</a-button>
        </a-form-item>
      </a-form>

    </div>

    <!--下面是表格-->
    <div class="ym-table">

      <!--表头提示-->
      <div class="table-header">
        <div class="table-title">收藏文章管理</div>
      </div>

      <!--表格数据-->
      <a-table
          rowKey="id"
          class="ym-table-content"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="dataList"
          :scroll="{ x: 1500 }"
          @resizeColumn="handleResizeColumn"
          :pagination="pagination"
          @change="doTableChange"
      >

        <template #bodyCell="{ column, record }">
          <!--文章id-->
          <template v-if="column.dataIndex === 'id'">
            <a @click="()=>router.push('/article/' + record.articlePageVo.id)">
              {{ record.articlePageVo.id }}
            </a>
          </template>
          <!--文章标题-->
          <template v-if="column.dataIndex === 'articleTitle'">
            <a-tooltip
                placement="topLeft"
                :arrow-point-at-center="false"
                v-if="record.articlePageVo.articleTitle">
              <template #title>{{ record.articlePageVo.articleTitle }}</template>
              <a @click="copyText(record.articlePageVo.articleTitle)">
                <CopyOutlined/>
              </a>{{ record.articlePageVo.articleTitle }}
            </a-tooltip>

            <span v-else style="text-align: center">null</span>
          </template>
          <!--文章背景图-->
          <template v-if="column.dataIndex === 'articleBgImage'">
            <div v-if="record.articlePageVo.articleBgImage" style="text-align: center">
              <a-image
                  style="text-align: center"
                  :src="record.articlePageVo.articleBgImage"
                  :width="80"/>
            </div>

            <div v-else style="text-align: center">null</div>
          </template>
          <!--文章主题-->
          <template v-if="column.dataIndex === 'articleIntroduction'">
            <a-tooltip
                placement="topLeft"
                :arrow-point-at-center="false"
                v-if="record.articlePageVo.articleIntroduction">
              <template #title>{{ record.articlePageVo.articleIntroduction }}</template>
              <a @click="copyText(record.articlePageVo.articleIntroduction)">
                <CopyOutlined/>
              </a>{{ record.articlePageVo.articleIntroduction }}
            </a-tooltip>

            <div v-else style="text-align: center">null</div>
          </template>
          <!--文章标签-->
          <template v-if="column.dataIndex === 'articleTags'">
            <div class="tags">
              <a-tag v-if="record.articlePageVo.articleTags" :color="tagsColor[index % tagsColor.length]"
                     v-for="(item,index) in jsonParse(record.articlePageVo.articleTags)" :key="item">
                {{ item }}
              </a-tag>
            </div>
          </template>
          <!--文章分类-->
          <template v-if="column.dataIndex === 'articleCategory'">
            <div class="tags">
              <a-tag v-if="record.articlePageVo.articleCategory"
                     :color="tagsColor[Math.floor(Math.random() * tagsColor.length)]">
                {{ record.articlePageVo.articleCategory }}
              </a-tag>
            </div>
          </template>
          <!--文章评论数-->
          <template v-if="column.dataIndex === 'articleCommentNumber'">
            <div class="role">
              {{ record.articlePageVo.articleCommentNumber }}
            </div>
          </template>
          <!--文章点赞数-->
          <template v-if="column.dataIndex === 'articleLikeNumber'">
            <div class="role">
              {{ record.articlePageVo.articleLikeNumber }}
            </div>
          </template>
          <!--文章观看数-->
          <template v-if="column.dataIndex === 'articleLookNumber'">
            <div class="role">
              {{ record.articlePageVo.articleLookNumber }}
            </div>
          </template>
          <!--文章收藏数-->
          <template v-if="column.dataIndex === 'articleCollectNumber'">
            <div class="role">
              {{ record.articlePageVo.articleCollectNumber }}
            </div>
          </template>
          <!--文章作者-->
          <template v-if="column.dataIndex === 'articleAuthor'">
            <div class="role">
              {{ record.articlePageVo.articleAuthor }}
            </div>
          </template>
          <!--文章加密状态-->
          <template v-if="column.dataIndex === 'isEncrypt'">
            <div class="status">
              <a-tag v-if="record.articlePageVo.isEncrypt == '0'" color="green">未加密</a-tag>
              <a-tag v-else-if="record.articlePageVo.isEncrypt == '1'" color="red">已加密</a-tag>
            </div>
          </template>
          <!--文章是否推荐状态-->
          <template v-if="column.dataIndex === 'isRecommend'">
            <div class="status">
              <a-tag v-if="record.articlePageVo.isRecommend == '0'" color="blue">未推荐</a-tag>
              <a-tag v-else-if="record.articlePageVo.isRecommend == '1'" color="green">已推荐</a-tag>
            </div>
          </template>
          <!--文章是否热门状态-->
          <template v-if="column.dataIndex === 'isHot'">
            <div class="status">
              <a-tag v-if="record.articlePageVo.isHot == '0'" color="green">未热门</a-tag>
              <a-tag v-else-if="record.articlePageVo.isHot == '1'" color="red">热门</a-tag>
            </div>
          </template>
          <!--文章状态-->
          <template v-if="column.dataIndex === 'articleStatus'">
            <div class="status">
              <a-tag v-if="record.articlePageVo.articleStatus == '0'" color="green">草稿</a-tag>
              <a-tag v-else-if="record.articlePageVo.articleStatus == '1'" color="red">未发布</a-tag>
              <a-tag v-else-if="record.articlePageVo.articleStatus == '2'" color="blue">已发布</a-tag>
            </div>
          </template>
          <!--创建时间-->
          <template v-else-if="column.dataIndex === 'createTime'">
            {{ dayjs(record.articlePageVo.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
          <!--更新时间-->
          <template v-else-if="column.dataIndex === 'updateTime'">
            {{ dayjs(record.articlePageVo.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
          <!--操作按钮-->
          <template v-else-if="column.key === 'operation'">
            <div class="operation">
              <a-button type="primary" danger @click="openDelete(record.articlePageVo.id)">删除</a-button>
            </div>
          </template>
        </template>
      </a-table>

      <a-modal
          v-model:open="open"
          title="取消收藏此文章"
          cancelText="取消"
          okText="确认"
          :confirm-loading="confirmLoading"
          @ok="handleOk">
        <p>确定取消收藏此文章吗?</p>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">

import dayjs from "dayjs";
import {CopyOutlined} from "@ant-design/icons-vue";
import {computed, onMounted, ref} from "vue";
import {message, type TableColumnsType, type TableProps} from "ant-design-vue";
import {getArticleCategoryListUsingGet} from "@/api/articleController.ts";
import {collectArticlePageUsingPost, deleteCollectArticleUsingPost} from "@/api/articleCollectController.ts";
import router from "@/routers";

const searchParams = ref<API.AdminPageArticleDto>({
  pageNum: 1,
  pageSize: 5,
})

/**
 *  表格列
 */
const columns = ref<TableColumnsType>([
  {
    title: '文章id',
    dataIndex: 'id',
    ellipsis: true,
    resizable: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    fixed: "left"
  },
  {
    title: '文章标题',
    dataIndex: 'articleTitle',
    ellipsis: true,
    resizable: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
  },
  {
    title: '文章封面',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleBgImage',
  },
  {
    title: '文章主题',
    dataIndex: 'articleIntroduction',
    ellipsis: true,
    resizable: true,
    width: 180,
    minWidth: 100,
    maxWidth: 500,
  },
  {
    title: '文章分类',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleCategory',
  },
  {
    title: '文章标签',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleTags',
  },
  {
    title: '文章评论数',
    ellipsis: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleCommentNumber',
  },
  {
    title: '文章观看数',
    ellipsis: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleLookNumber',
  },
  {
    title: '文章收藏数',
    ellipsis: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleCollectNumber',
  },
  {
    title: '文章作者',
    ellipsis: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleAuthor',
  },
  {
    title: '文章加密',
    ellipsis: true,
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'isEncrypt',
  },
  {
    title: '文章推荐',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'isRecommend',
  },
  {
    title: '文章热门',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'isHot',
  },
  {
    title: '文章状态',
    width: 130,
    minWidth: 100,
    maxWidth: 500,
    dataIndex: 'articleStatus',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 500,
    // 默认 升序
    defaultSortOrder: "ascend",
    // 排序
    sorter: (a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf(),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    ellipsis: true,
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 500,
    // 默认 升序
    defaultSortOrder: "ascend",
    // 排序
    sorter: (a, b) => dayjs(a.updateTime).valueOf() - dayjs(b.updateTime).valueOf(),
  },
  {
    title: '操作',
    key: 'operation',
    width: 100,
    minWidth: 100,
    fixed: "right",
  }
])
/**
 * 数据
 */
const dataList = ref<API.CollectArticleVo[]>([]);

/**
 * 标签颜色
 */
const tagsColor = [
  'pink',
  'red',
  'orange',
  'green',
  'cyan',
  'blue',
  'purple',]

/**
 * 转json
 * @param str
 */
function jsonParse(str: string) {
  return JSON.parse(str);
}

/**
 * 多选
 */
const rowSelection: TableProps['rowSelection'] = {
  // todo 后面再实现
};

/**
 * 修改列宽
 * @param w
 * @param col
 */
// @ts-ignore
function handleResizeColumn(w, col) {
  col.width = w;
}

/**
 * 复制文本
 * @param text
 */
// @ts-ignore
function copyText(text) {
  navigator.clipboard.writeText(text);
  message.success("复制成功");
}

// 条数
const total = ref(0)
// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.value.pageNum ?? 1,
    pageSize: searchParams.value.pageSize ?? 5,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.value.pageNum = page.current
  searchParams.value.pageSize = page.pageSize
  fetchData()
}

// 执行搜索
function doSearch() {

  // 重置页码
  searchParams.value.pageNum = 1
  fetchData()

}


/**
 * 标签 默认分组
 */
const articleTagsOptions = [
  {
    value: "前端"
  },
  {
    value: "后端"
  },
  {
    value: "Java"
  },
  {
    value: "Python"
  }
]

/**
 * 标签 数据
 */
const articleTagsSelect = ref<string[]>([])


/**
 * 文章分类 数据
 */
const articleCategoryInput = ref<string>()


/**
 * 文章状态 数据
 */
const articleStatusSelect = ref<string>()


/**
 *  重置
 */
const doReset = () => {
  searchParams.value.pageNum = 1
  searchParams.value.pageSize = 5
  searchParams.value.id = undefined
  searchParams.value.articleTitle = ""
  searchParams.value.articleCondition = ""
  searchParams.value.articleAuthor = ""
  searchParams.value.createStartTime = ""
  searchParams.value.createStartTime = ""
  articleTagsSelect.value = []
  articleStatusSelect.value = undefined
  articleCategoryInput.value = ""
  fetchData()
}


const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const deleteId = ref<number>()
/**
 * 打开删除 提示语
 * @param id
 */
const openDelete = (id: number) => {
  open.value = true
  deleteId.value = id
};

/**
 * 确认 删除
 */
async function handleOk() {
  confirmLoading.value = true;
  const result = await deleteCollectArticleUsingPost({
    articleId: deleteId.value
  })

  if (result.data.code != 0) {
    message.error("取消失败")
    confirmLoading.value = false;
    return
  }
  confirmLoading.value = false;
  open.value = false;
  message.success("取消成功")

  // 重新 请求一次数据
  await fetchData()

}


/**
 * 获取数据
 */
const fetchData = async () => {
// 一些 操作
  // 将tags 序列化
  if (articleTagsSelect.value) {
    searchParams.value.articleTags = JSON.stringify(articleTagsSelect.value)
  } else {
    searchParams.value.articleTags = ""
  }

  // 分类
  if (articleCategoryInput.value) {
    searchParams.value.articleCategory = articleCategoryInput.value
  } else {
    searchParams.value.articleCategory = ""
  }


  const result = await collectArticlePageUsingPost({
    ...searchParams.value,
    timeSortField: "editTime",
    timeSortOrder: "desc"
  })

  if (result.data.code !== 0) {
    message.error("请求失败:" + result.data.msg);
    return;
  }

  if (result.data.data) {
    dataList.value = result.data.data.records ?? [];
    // @ts-ignore
    total.value = Number.parseInt(result.data.data.total) ?? 0;
    message.success("请求成功");
    console.log(dataList.value)
  } else {
    message.error("请求失败:" + result.data.msg);
  }

}


// 页面加载时请求一次
onMounted(() => {
  fetchData()
})
</script>


<style lang="less">
#adminCollectArticleManagePage {
  .ym-search-bar {
    width: 100%;
    overflow: hidden;
    background: var(--admin_content_bg_color);
    padding: 20px 15px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 60px;

    .ym-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .ant-form-item {
        margin: 0 15px 20px 0;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          margin-right: 15px;
        }
      }

    }

  }

  .ym-table {

    width: 100%;
    overflow: hidden;
    background: var(--admin_content_bg_color);
    border-radius: 10px;


    .table-header {
      width: 100%;

      .table-title {
        width: 100%;
        padding: 15px 15px;
        border-bottom: 1px solid var(--admin_line_bg_color);
        font-size: 21px;
      }

      .table-add {
        width: 100%;
        padding: 15px 15px;
      }

    }


    .ym-table-content {
      padding: 10px 15px;
    }

    .ant-table-tbody {
      background: var(--admin_content_bg_color);
    }

    .ant-pagination {
      background: var(--admin_content_bg_color);
    }

    th {
      text-align: center;
    }

    .tags {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      span {
        margin: 0 5px 5px 0;
      }
    }

    .role {
      text-align: center;
    }

    .status {
      text-align: center;
    }

    .articleRegistrationSource {
      text-align: center;
    }

    .operation {
      display: flex;
      align-items: center;

      button {
        margin-right: 10px;
      }
    }
  }
}
</style>