<template>
	
	<div id="adminPictureManagePage">
		<!--上面是 搜索框-->
		<div class="ym-search-bar">
			<a-form
					class="ym-form"
					:model="searchParams"
					@finish="doSearch">
				<a-form-item label="图片id">
					<a-input
							allow-clear
							v-model:value="searchParams.id"
							placeholder="输入图片id"/>
				</a-form-item>
				<a-form-item label="图片名称">
					<a-input
							allow-clear
							v-model:value="searchParams.pictureName"
							placeholder="输入图片名称"/>
				</a-form-item>
				<a-form-item label="图片标签">
					<a-select
							v-model:value="pictureTagsSelect"
							mode="tags"
							style="width: 120px"
							placeholder="请输入图片标签"
							:max-tag-count=3
							:options="pictureTagsOptions"
					></a-select>
				</a-form-item>
				<a-form-item label="图片上传方式">
					<a-space>
						<a-select
								v-model:value="pictureUploadSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入上传方式"
								:options="pictureUploadOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="图片分类">
					<a-space>
						<a-select
								v-model:value="pictureCategorySelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入图片分类"
								:options="pictureCategoryOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="图片大小">
					<a-input
							allow-clear
							v-model:value="searchParams.pictureSize"
							placeholder="请输入图片大小"/>
				</a-form-item>
				<a-form-item label="图片格式">
					<a-input
							allow-clear
							v-model:value="searchParams.pictureFormat"
							placeholder="请输入图片格式"/>
				</a-form-item>
				<a-form-item label="图片审核状态">
					<a-space>
						<a-select
								v-model:value="pictureReviewStatusSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入图片审核状态"
								:options="pictureReviewStatusOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="审核通过时间">
					<a-range-picker
							style="width: 400px"
							show-time
							format="YYYY-MM-DD HH:mm:ss"
							:presets="pictureReviewRangePresets"
							@change="pictureReviewOnRangeChange"
					/>
				</a-form-item>
				<a-form-item label="图片创建时间">
					<a-range-picker
							style="width: 400px"
							show-time
							format="YYYY-MM-DD HH:mm:ss"
							:presets="pictureCreateRangePresets"
							@change="pictureCreateOnRangeChange"
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
				<div class="table-title">图片管理</div>
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
					<!--图片id-->
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
					<!--图片名称-->
					<template v-if="column.dataIndex === 'pictureName'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.pictureName">
							<template #title>{{ record.pictureName }}</template>
							<a @click="copyText(record.pictureName)">
								<CopyOutlined/>
							</a>{{ record.pictureName }}
						</a-tooltip>
						
						<span v-else style="text-align: center">null</span>
					</template>
					<!--图片存放地址-->
					<template v-if="column.dataIndex === 'picturePath'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.picturePath">
							<template #title>{{ record.picturePath }}</template>
							<a @click="copyText(record.picturePath)">
								<CopyOutlined/>
							</a>{{ record.picturePath }}
						</a-tooltip>
						
						<span v-else style="text-align: center">null</span>
					
					</template>
					<!--图片上传方式-->
					<template v-if="column.dataIndex === 'pictureUpload'">
						<div class="role">
							<a-tag v-if="record.pictureUpload === 'local'" color="green">本地</a-tag>
							<a-tag v-else-if="record.pictureUpload === 'tx-oss'" color="blue">腾讯云</a-tag>
							<a-tag v-else-if="record.pictureUpload === 'qny-oss'" color="aqua">七牛云</a-tag>
						</div>
					</template>
					<!--图片-->
					<template v-if="column.dataIndex === 'pictureUrl'">
						<div v-if="record.pictureUrl" style="text-align: center">
							<a-image
									style="text-align: center"
									:src="record.pictureUrl"
									:width="80"/>
						</div>
						
						<div v-else style="text-align: center">null</div>
					</template>
					<!--图片标签-->
					<template v-if="column.dataIndex === 'pictureTags'">
						<div class="tags">
							<a-tag v-if="record.pictureTags" :color="tagsColor[index % tagsColor.length]"
							       v-for="(item,index) in jsonParse(record.pictureTags)" :key="item">
								{{ item }}
							</a-tag>
						</div>
					</template>
					<!--图片分类-->
					<template v-if="column.dataIndex === 'pictureCategory'">
						<div class="role">
							<a-tag v-if="record.pictureCategory === 'avatar'" color="red">头像</a-tag>
							<a-tag v-else-if="record.pictureCategory === 'article'" color="blue">文章</a-tag>
							<a-tag v-else-if="record.pictureCategory === 'other'" color="green">其他</a-tag>
						</div>
					</template>
					<!--图片体积-->
					<template v-if="column.dataIndex === 'pictureSize'">
						<div class="role">
							{{ Math.floor((record.pictureSize / 1024 )) +'kb' }}
						</div>
					</template>
					<!--图片审核状态-->
					<template v-if="column.dataIndex === 'reviewStatus'">
						<div class="status">
							<a-tag v-if="record.reviewStatus == '0'" color="blue">待审核</a-tag>
							<a-tag v-else-if="record.reviewStatus == '1'" color="green">审核通过</a-tag>
							<a-tag v-else-if="record.reviewStatus == '2'" color="red">审核拒绝</a-tag>
						</div>
					</template>
					<!--图片上传人-->
					<template v-if="column.dataIndex === 'createUserId'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.createUserId + ''">
							<template #title>{{ record.createUserId }}</template>
							<a @click="copyText(record.createUserId + '')">
								<CopyOutlined/>
							</a>{{ record.createUserId }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
					</template>
					<!--图片使用者-->
					<template v-if="column.dataIndex === 'usedUserId'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.usedUserId != null">
							<template #title>{{ record.usedUserId }}</template>
							<a @click="copyText(record.usedUserId + '')">
								<CopyOutlined/>
							</a>{{ record.usedUserId }}
						</a-tooltip>
						<div  v-else style="text-align: center">null</div>
					</template>
					<!--图片审核人-->
					<template v-if="column.dataIndex === 'reviewUserId'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.usedUserId != null">
							<template #title>{{ record.reviewUserId }}</template>
							<a @click="copyText(record.reviewUserId + '')">
								<CopyOutlined/>
							</a>{{ record.reviewUserId }}
						</a-tooltip>
						<div v-else style="text-align: center">null</div>
					</template>
					<!--图片审核原因-->
					<template
							v-if="column.dataIndex === 'reviewReason'">
						<a-tooltip
								placement="topLeft"
								:arrow-point-at-center="false"
								v-if="record.reviewReason">
							<template #title>{{ record.reviewReason }}</template>
							<a @click="copyText(record.reviewReason)">
								<CopyOutlined/>
							</a>{{ record.reviewReason }}
						</a-tooltip>
						
						<div v-else style="text-align: center">null</div>
					</template>
					<!--创建时间-->
					<template v-else-if="column.dataIndex === 'createTime'">
						{{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
					<!--更新时间-->
					<template v-else-if="column.dataIndex === 'updateTime'">
						{{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
					<!--审核时间-->
					<template v-else-if="column.dataIndex === 'reviewTime'">
						{{ dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss') }}
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
import {adminPagePictureUsingPost} from "@/api/pictureController.ts";

const searchParams = ref<API.AdminPagePictureDto>({
	pageNum: 1,
	pageSize: 5,
})

/**
 *  表格列
 */
const columns = ref<TableColumnsType>([
	{
		title: '图片id',
		dataIndex: 'id',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		fixed: "left"
	},
	{
		title: '图片名称',
		dataIndex: 'pictureName',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '图片存放地址',
		dataIndex: 'picturePath',
		ellipsis: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '图片上传方式',
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'pictureUpload',
		ellipsis: true,
	},
	{
		title: '图片',
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'pictureUrl',
	},
	{
		title: '图片标签',
		dataIndex: 'pictureTags',
		ellipsis: true,
		resizable: true,
		width: 180,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '图片分类',
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'pictureCategory',
	},
	{
		title: '图片体积',
		ellipsis: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'pictureSize',
	},
	{
		title: '图片审核状态',
		ellipsis: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'reviewStatus',
	},
	{
		title: '图片上传人',
		ellipsis: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'createUserId',
	},
	{
		title: '图片使用者',
		width: 130,
    ellipsis: true,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'usedUserId',
	},
	{
		title: '图片审核人',
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'reviewUserId',
	},
	{
		title: '图片审核原因',
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		dataIndex: 'reviewReason',
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
		title: '审核时间',
		dataIndex: 'reviewTime',
		ellipsis: true,
		resizable: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
		// 默认 升序
		defaultSortOrder: "ascend",
		// 排序
		sorter: (a, b) => dayjs(a.reviewTime).valueOf() - dayjs(b.reviewTime).valueOf(),
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
const dataList = ref<API.PictureVo[]>([]);

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
 * 获取数据
 */
const fetchData = async () => {
// 一些 操作
	// 将tags 序列化
	if (pictureTagsSelect.value) {
		searchParams.value.pictureTags = JSON.stringify(pictureTagsSelect.value)
	} else {
		searchParams.value.pictureTags = ""
	}
	
	// 上传方式
	if (pictureUploadSelect.value) {
		searchParams.value.pictureUpload = pictureUploadSelect.value
	} else {
		searchParams.value.pictureUpload = ""
	}
	
	// 分类
	if (pictureCategorySelect.value) {
		searchParams.value.pictureCategory = pictureCategorySelect.value
	} else {
		searchParams.value.pictureCategory = ""
	}
	
	// 图片审核状态
	if (pictureReviewStatusSelect.value) {
		searchParams.value.reviewStatus = Number.parseInt(pictureReviewStatusSelect.value)
	} else {
		searchParams.value.reviewStatus = undefined
	}
	
	
	const result = await adminPagePictureUsingPost({
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


/**
 * 标签 默认分组
 */
const pictureTagsOptions = [
	{
		value: "背景"
	},
	{
		value: "头像"
	},
	{
		value: "蓝色"
	},
	{
		value: "动漫"
	}
]

/**
 * 标签 数据
 */
const pictureTagsSelect = ref<string[]>([])


/**
 * 上传方式 默认分组
 */
const pictureUploadOptions = [
	{
		value: "local",
		label: "本地"
	},
	{
		value: "tx-oss",
		label: "腾讯云"
	},
	{
		value: "qny-oss",
		label: "七牛云"
	}
]



/**
 * 上传方式 数据
 */
const pictureUploadSelect = ref<string>()


/**
 * 图片分类 默认分组
 */
const pictureCategoryOptions = [
	{
		value: "avatar",
		label: "头像"
	},
	{
		value: "article",
		label: "文章"
	},
	{
		value: "other",
		label: "其他"
	}
]

/**
 * 图片分类 数据
 */
const pictureCategorySelect = ref<string>()


/**
 * 图片审核状态 默认分组
 */
const pictureReviewStatusOptions = [
	{
		value: "0",
		label: "待审核"
	},
	{
		value: "1",
		label: "审核通过"
	},
	{
		value: "2",
		label: "审核拒绝"
	}
]

/**
 * 图片审核状态 数据
 */
const pictureReviewStatusSelect = ref<string>()

// 审核日期选着
const pictureReviewRangePresets = ref([
	{label: '一天前', value: [dayjs().add(-1, 'd'), dayjs()]},
	{label: '一周前', value: [dayjs().add(-7, 'd'), dayjs()]},
	{label: '一个月前', value: [dayjs().add(-30, 'd'), dayjs()]},
	{label: '三个月前', value: [dayjs().add(-90, 'd'), dayjs()]},
]);
// @ts-ignore
const pictureReviewOnRangeChange = (dates: RangeValue, dateStrings: string[]) => {
	if (dates) {
		searchParams.value.reviewStartTime = dateStrings[0];
		searchParams.value.reviewEndTime = dateStrings[1];
	} else {
		searchParams.value.reviewStartTime = "";
		searchParams.value.reviewEndTime = "";
	}
};

// 创建日期选着
const pictureCreateRangePresets = ref([
	{label: '一天前', value: [dayjs().add(-1, 'd'), dayjs()]},
	{label: '一周前', value: [dayjs().add(-7, 'd'), dayjs()]},
	{label: '一个月前', value: [dayjs().add(-30, 'd'), dayjs()]},
	{label: '三个月前', value: [dayjs().add(-90, 'd'), dayjs()]},
]);
// @ts-ignore
const pictureCreateOnRangeChange = (dates: RangeValue, dateStrings: string[]) => {
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
	// searchParams.pictureAccount = ""
	// searchParams.pictureName = ""
	// searchParams.registeredSource = ""
	// searchParams.pictureRole = ""
	// searchParams.startTime = ""
	// searchParams.endTime = ""
	// pictureTagsSelect.value = []
	// pictureRoleSelect.value = ""
	// fetchData()
}

/**
 *  添加
 */
const doAdd = async () => {
}

/**
 *  编辑
 */
const doEdit = async (id: number) => {
}

/**
 * 打开删除 提示语
 * @param id
 */
const openDelete = (id: number) => {

};


// 页面加载时请求一次
onMounted(() => {
	fetchData()
})
</script>


<style lang="less">
#adminPictureManagePage {
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
		
		.pictureRegistrationSource {
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