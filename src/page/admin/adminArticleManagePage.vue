<template>
	
	<div id="adminArticleManagePage">
		<!--上面是 搜索框-->
		<div class="ym-search-bar">
			<a-form
					class="ym-form"
					:model="searchParams"
					@finish="doSearch">
				<a-form-item label="文章id">
					<a-input
							allow-clear
							v-model:value="searchParams.id"
							placeholder="输入文章id"/>
				</a-form-item>
				<a-form-item label="文章标题">
					<a-input
							allow-clear
							v-model:value="searchParams.articleTitle"
							placeholder="输入文章标题"/>
				</a-form-item>
				<a-form-item label="文章内容">
					<a-input
							allow-clear
							v-model:value="searchParams.articleCondition"
							placeholder="请输入文章相关内容搜索"/>
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
					<a-space>
						<a-select
								v-model:value="articleCategorySelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入文章分类"
								:options="articleCategoryOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="文章作者">
					<a-input
							allow-clear
							v-model:value="searchParams.articleAuthor"
							placeholder="请输入文章作者"/>
				</a-form-item>
				<a-form-item label="文章推荐">
					<a-space>
						<a-select
								v-model:value="articleIsRecommendSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请选择文章是否推荐"
								:options="articleIsRecommendOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="文章热门">
					<a-space>
						<a-select
								v-model:value="articleIsHotSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请选择文章是否热门"
								:options="articleIsHotOptions"
						></a-select>
					</a-space>
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
				<a-form-item label="文章创建时间">
					<a-range-picker
							style="width: 400px"
							show-time
							format="YYYY-MM-DD HH:mm:ss"
							:presets="articleCreateRangePresets"
							@change="articleCreateOnRangeChange"
					/>
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
				<div class="table-title">文章管理</div>
				<div class="table-add">
					<a-button
							@click="doAdd"
							type="primary">新增
					</a-button>
				</div>
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
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.id + ''">
							<template #title>{{ record.id }}</template>
							<a @click="copyText(record.id + '')">
								<CopyOutlined/>
							</a>{{ record.id }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
					</template>
					<!--文章标题-->
					<template v-if="column.dataIndex === 'articleTitle'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.articleTitle">
							<template #title>{{ record.articleTitle }}</template>
							<a @click="copyText(record.articleTitle)">
								<CopyOutlined/>
							</a>{{ record.articleTitle }}
						</a-tooltip>
						
						<span v-else style="text-align: center">null</span>
					</template>
					<!--文章背景图-->
					<template v-if="column.dataIndex === 'articleBgImage'">
						<div v-if="record.articleBgImage" style="text-align: center">
							<a-image
									style="text-align: center"
									:src="record.articleBgImage"
									:width="80"/>
						</div>
						
						<div v-else style="text-align: center">null</div>
					</template>
					<!--文章主题-->
					<template v-if="column.dataIndex === 'articleIntroduction'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.articleIntroduction">
							<template #title>{{ record.articleIntroduction }}</template>
							<a @click="copyText(record.articleIntroduction)">
								<CopyOutlined/>
							</a>{{ record.articleIntroduction }}
						</a-tooltip>
						
						<div v-else style="text-align: center">null</div>
					</template>
					<!--文章标签-->
					<template v-if="column.dataIndex === 'articleTags'">
						<div class="tags">
							<a-tag v-if="record.articleTags" :color="tagsColor[index % tagsColor.length]"
							       v-for="(item,index) in jsonParse(record.articleTags)" :key="item">
								{{ item }}
							</a-tag>
						</div>
					</template>
					<!--文章分类-->
					<template v-if="column.dataIndex === 'articleCategory'">
						<div class="tags">
							<a-tag v-if="record.articleCategory"
							       :color="tagsColor[Math.floor(Math.random() * tagsColor.length)]">
								{{ record.articleCategory }}
							</a-tag>
						</div>
					</template>
					<!--文章评论数-->
					<template v-if="column.dataIndex === 'articleCommentNumber'">
						<div class="role">
							{{ record.articleCommentNumber }}
						</div>
					</template>
					<!--文章点赞数-->
					<template v-if="column.dataIndex === 'articleLikeNumber'">
						<div class="role">
							{{ record.articleLikeNumber }}
						</div>
					</template>
					<!--文章观看数-->
					<template v-if="column.dataIndex === 'articleLookNumber'">
						<div class="role">
							{{ record.articleLookNumber }}
						</div>
					</template>
					<!--文章收藏数-->
					<template v-if="column.dataIndex === 'articleCollectNumber'">
						<div class="role">
							{{ record.articleCollectNumber }}
						</div>
					</template>
          <!--文章作者-->
          <template v-if="column.dataIndex === 'articleAuthor'">
            <div class="role">
              {{ record.articleAuthor }}
            </div>
          </template>
					<!--文章加密状态-->
					<template v-if="column.dataIndex === 'isEncrypt'">
						<div class="status">
							<a-tag v-if="record.isEncrypt == '0'" color="green">未加密</a-tag>
							<a-tag v-else-if="record.isEncrypt == '1'" color="red">已加密</a-tag>
						</div>
					</template>
					<!--文章是否推荐状态-->
					<template v-if="column.dataIndex === 'isRecommend'">
						<div class="status">
							<a-tag v-if="record.isRecommend == '0'" color="blue">未推荐</a-tag>
							<a-tag v-else-if="record.isRecommend == '1'" color="green">已推荐</a-tag>
						</div>
					</template>
					<!--文章是否热门状态-->
					<template v-if="column.dataIndex === 'isHot'">
						<div class="status">
							<a-tag v-if="record.isHot == '0'" color="green">未热门</a-tag>
							<a-tag v-else-if="record.isHot == '1'" color="red">热门</a-tag>
						</div>
					</template>
					<!--文章状态-->
					<template v-if="column.dataIndex === 'articleStatus'">
						<div class="status">
							<a-tag v-if="record.articleStatus == '0'" color="green">草稿</a-tag>
							<a-tag v-else-if="record.articleStatus == '1'" color="red">未发布</a-tag>
							<a-tag v-else-if="record.articleStatus == '2'" color="blue">已发布</a-tag>
						</div>
					</template>
					<!--创建时间-->
					<template v-else-if="column.dataIndex === 'createTime'">
						{{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
					<!--更新时间-->
					<template v-else-if="column.dataIndex === 'updateTime'">
						{{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
					<!--操作按钮-->
					<template v-else-if="column.key === 'operation'">
						<div class="operation">
							<a-button type="primary" @click="doEdit(record.id)">编辑</a-button>
							<a-button type="primary" danger @click="openDelete(record.id)">删除</a-button>
						</div>
					</template>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">

import dayjs from "dayjs";
import {CopyOutlined} from "@ant-design/icons-vue";
import {computed, onMounted, ref} from "vue";
import {message, type TableColumnsType, type TableProps} from "ant-design-vue";
import {adminPageArticleUsingPost} from "@/api/articleController.ts";
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
		fixed: "right",
		width: 175,
	}
])
/**
 * 数据
 */
const dataList = ref<API.ArticlePageVo[]>([]);

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
 * 文章分类 默认分组
 */
const articleCategoryOptions = [
	{
		value: "前端"
	},
	{
		value: "后端"
	},
	{
		value: "测试"
	}
]

/**
 * 文章分类 数据
 */
const articleCategorySelect = ref<string>()


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


/**
 * 文章是否推荐 默认分组
 */
const articleIsRecommendOptions = [
	{
		value: "0",
		label: "未推荐"
	},
	{
		value: "1",
		label: "已推荐"
	}
]

/**
 * 文章是否推荐  数据
 */
const articleIsRecommendSelect = ref<string>()


/**
 * 文章是否热门 默认分组
 */
const articleIsHotOptions = [
	{
		value: "0",
		label: "未热门"
	},
	{
		value: "1",
		label: "已热门"
	}
]

/**
 * 文章是否热门  数据
 */
const articleIsHotSelect = ref<string>()


// 创建日期选着
const articleCreateRangePresets = ref([
	{label: '一天前', value: [dayjs().add(-1, 'd'), dayjs()]},
	{label: '一周前', value: [dayjs().add(-7, 'd'), dayjs()]},
	{label: '一个月前', value: [dayjs().add(-30, 'd'), dayjs()]},
	{label: '三个月前', value: [dayjs().add(-90, 'd'), dayjs()]},
]);
// @ts-ignore
const articleCreateOnRangeChange = (dates: RangeValue, dateStrings: string[]) => {
	if (dates) {
		searchParams.value.createStartTime = dateStrings[0];
		searchParams.value.createEndTime = dateStrings[1];
	} else {
		searchParams.value.createStartTime = "";
		searchParams.value.createEndTime = "";
	}
};

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
	articleIsHotSelect.value = undefined
	articleIsRecommendSelect.value = undefined
	articleStatusSelect.value = undefined
	articleCategorySelect.value = undefined
	fetchData()
}

/**
 *  添加
 */
const doAdd = async () => {
	await router.push("/admin/article/add");
}

/**
 *  编辑
 */
const doEdit = async (id: number) => {
	// 直接路由跳转到编辑页面
	await router.push("/admin/article/edit/" + id)
}

/**
 * 打开删除 提示语
 * @param id
 */
const openDelete = (id: number) => {

};

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
	if (articleCategorySelect.value) {
		searchParams.value.articleCategory = articleCategorySelect.value
	} else {
		searchParams.value.articleCategory = ""
	}
	
	// 文章 状态
	if (articleStatusSelect.value) {
		searchParams.value.articleStatus = Number.parseInt(articleStatusSelect.value)
	} else {
		searchParams.value.articleStatus = undefined
	}
	
	// 文章是否推荐
	if (articleIsRecommendSelect.value) {
		searchParams.value.isRecommend = Number.parseInt(articleIsRecommendSelect.value);
	} else {
		searchParams.value.isRecommend = undefined;
	}
	
	
	// 文章是否热门
	if (articleIsHotSelect.value) {
		searchParams.value.isHot = Number.parseInt(articleIsHotSelect.value)
	} else {
		searchParams.value.isHot = undefined
	}
	
	
	const result = await adminPageArticleUsingPost({
		...searchParams.value
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
#adminArticleManagePage {
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
			
			button {
				margin-right: 10px;
			}
		}
	}
}
</style>