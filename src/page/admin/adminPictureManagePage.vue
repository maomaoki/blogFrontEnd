<template>
	
	<div id="adminPictureManagePage">
		
		<!--上面是 搜索框-->
		<div class="ym-search-bar">
			<a-form
					class="ym-form"
					:model="searchParams"
					@finish="doSearch">
				<a-form-item label="简介">
					<a-input
							:allowClear="true"
							v-model:value="searchParams.introduction"
					         placeholder="请输入简介"/>
				</a-form-item>
				<a-form-item label="用户标签">
					<a-select
							v-model:value="pictureTagsSelect"
							mode="tags"
							style="width: 200px"
							placeholder="请输入图片标签"
							:max-tag-count=3
							:options="pictureTagsOptions"
					></a-select>
				</a-form-item>
				<a-form-item label="图片分类">
					<a-space>
						<a-select
								v-model:value="pictureCategorySelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请选择图片分类"
								:options="pictureCategoryOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="图片类型">
					<a-input v-model:value="searchParams.picFormat"
					         placeholder="请输入图片类型"/>
				</a-form-item>
				<a-form-item label="创建人">
					<a-input v-model:value="searchParams.userId"
					         placeholder="请输入创建人id"/>
				</a-form-item>
				<a-form-item label="使用者">
					<a-input v-model:value="searchParams.useUserId"
					         placeholder="请输入使用者id"/>
				</a-form-item>
				<a-form-item label="创建时间">
					<a-range-picker
							style="width: 400px"
							show-time
							format="YYYY-MM-DD HH:mm:ss"
							:presets="rangePresets"
							@change="onRangeChange"
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
					<a-button @click="doAdd" type="primary">新增</a-button>
				</div>
			</div>
			
			<!--表格数据-->
			<a-table
					rowKey="id"
					class="ym-table-content"
					:row-selection="rowSelection"
					:columns="columns"
					tableLayout="fixed"
					:data-source="dataList"
					:scroll="{ x: 1500 }"
					@resizeColumn="handleResizeColumn"
					:pagination="pagination"
					@change="doTableChange"
			>
				
				<template #bodyCell="{ column, record }">
					<!--图片id-->
					<template v-if="column.dataIndex === 'id'">
						<a-tooltip v-if="record.id + ''">
							<template #title>{{ record.id }}</template>
							<a @click="copyText(record.id + '')">
								<CopyOutlined/>
							</a>{{ record.id }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
					</template>
					<!--图片-->
					<template v-if="column.title === '图片'">
						<div v-if="record.url" style="text-align: center">
							<a-image
									style="text-align: center"
									:src="record.url"
									:width="80"/>
						</div>
						
						<div v-else style="text-align: center">null</div>
					</template>
					<!--图片名称-->
					<template v-if="column.dataIndex === 'name'">
						
						<a-tooltip v-if="record.name" placement="top">
							<template #title>{{ record.name }}</template>
							<div class="ep">
								<a @click="copyText(record.name + '')">
									<CopyOutlined/>
								</a>
								{{ record.name }}
							</div>
						</a-tooltip>
					
					</template>
					<!--图片简介-->
					<template v-if="column.dataIndex === 'introduction'">
						<a-tooltip v-if="record.introduction" placement="top">
							<template #title>{{ record.introduction }}</template>
							<div class="ep">
									<a @click="copyText(record.introduction + '')">
									<CopyOutlined/>
								</a>
								{{ record.introduction }}
							</div>
						</a-tooltip>
					</template>
					<!--图片标签-->
					<template v-if="column.dataIndex === 'tags'">
						<div class="tags">
							<a-tag v-if="record.tags" :color="tagsColor[index % tagsColor.length]"
							       v-for="(item,index) in jsonParse(record.tags)" :key="item">
								{{ item }}
							</a-tag>
						</div>
					</template>
					<!--图片分类-->
					<template v-if="column.dataIndex === 'category'">
						<div class="center">
							<a-tag :color="
							// @ts-ignore
							pictureCategoryMap[record.category].color">
								{{
									// @ts-ignore
									pictureCategoryMap[record.category].title
								}}
							</a-tag>
						</div>
					</template>
					<!--图片大小-->
					<template v-if="column.dataIndex === 'picSize'">
						<div class="center">
							{{
								getSize(record.picSize) + 'KB'
							}}
						</div>
					</template>
					<!--图片格式-->
					<template v-if="column.dataIndex === 'picFormat'">
						<div class="center">
							{{ record.picFormat }}
						</div>
					</template>
					<!--图片存放地址-->
					<template v-if="column.dataIndex === 'saveUrl'">
						<a-tooltip v-if="record.saveUrl" placement="top">
							<template #title>{{ record.saveUrl }}</template>
							<div class="ep">
								<a @click="copyText(record.saveUrl)">
									<CopyOutlined/>
								</a>
								{{ record.saveUrl }}
							</div>
						</a-tooltip>
					</template>
					<!--图片存放方式-->
					<template v-if="column.dataIndex === 'saveWay'">
						<div class="center">
							<a-tag :color="
                 // @ts-ignore
                 pictureSaveWayMap[record.saveWay].color">
								{{
									// @ts-ignore
									pictureSaveWayMap[record.saveWay].title
								}}
							</a-tag>
						</div>
					</template>
					<!--图片url-->
					<template v-if="column.title === '访问地址'">
						
						<a-tooltip v-if="column.title === '访问地址'" placement="top">
							<template #title>{{ record.url }}</template>
							<div class="ep">
								<a @click="copyText(record.url)">
									<CopyOutlined/>
								</a>
								{{ record.url }}
							</div>
						</a-tooltip>
					
					</template>
					<!--创建人-->
					<template v-if="column.dataIndex === 'userId'">
						<a-tooltip v-if="record.userId + ''">
							<template #title>{{ record.userId }}</template>
							<a @click="copyText(record.userId + '')">
								<CopyOutlined/>
							</a>{{ record.userId }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
					</template>
					<!--使用者-->
					<template v-if="column.dataIndex === 'useUserId'">
						<a-tooltip v-if="record.useUserId + ''">
							<template #title>{{ record.useUserId }}</template>
							<a @click="copyText(record.useUserId + '')">
								<CopyOutlined/>
							</a>{{ record.useUserId }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
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
import {computed, onMounted, reactive, ref} from "vue";
import {message, type TableColumnsType, type TableProps} from "ant-design-vue";
import {adminPictureQueryUsingPost} from "@/api/pictureController.ts";

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
		title: '图片',
		dataIndex: 'url',
		width: 120
	},
	{
		title: '图片名称',
		dataIndex: 'name',
		ellipsis: true,
		width: 150,
	},
	{
		title: '图片简介',
		dataIndex: 'introduction',
		ellipsis: true,
		width: 100,
		minWidth: 100,
		maxWidth: 150
	},
	{
		title: '图片标签',
		dataIndex: 'tags',
		ellipsis: true,
		resizable: true,
		width: 180,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '图片分类',
		dataIndex: 'category',
		width: 100
	},
	{
		title: '图片大小',
		dataIndex: 'picSize',
		width: 90
	},
	{
		title: '图片格式',
		dataIndex: 'picFormat',
		width: 90
	},
	{
		title: '图片存放目录',
		dataIndex: 'saveUrl',
		ellipsis: true,
		resizable: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '存放方式',
		dataIndex: 'saveWay',
		width: 90
	},
	{
		title: '访问地址',
		dataIndex: 'url',
		ellipsis: true
	},
	{
		title: '创建人',
		dataIndex: 'userId',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '使用者',
		dataIndex: 'useUserId',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500
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

// 搜索条件
const searchParams = reactive<API.AdminPictureQueryDto>({
	current: 1,
	pageSize: 5,
})

// 日期选着
const rangePresets = ref([
	{label: '一天前', value: [dayjs().add(-1, 'd'), dayjs()]},
	{label: '一周前', value: [dayjs().add(-7, 'd'), dayjs()]},
	{label: '一个月前', value: [dayjs().add(-30, 'd'), dayjs()]},
	{label: '三个月前', value: [dayjs().add(-90, 'd'), dayjs()]},
]);
// @ts-ignore
const onRangeChange = (dates: RangeValue, dateStrings: string[]) => {
	if (dates) {
		searchParams.startTime = dateStrings[0];
		searchParams.endTime = dateStrings[1];
	} else {
		searchParams.startTime = "";
		searchParams.endTime = "";
	}
};


// 分页参数
const pagination = computed(() => {
	return {
		current: searchParams.current ?? 1,
		pageSize: searchParams.pageSize ?? 5,
		total: total.value,
		showSizeChanger: true,
		showTotal: (total: number) => `共 ${total} 条`,
	}
})

// 表格变化处理
const doTableChange = (page: any) => {
	searchParams.current = page.current
	searchParams.pageSize = page.pageSize
	fetchData()
}


/**
 * 获取数据
 */
const fetchData = async () => {
	
	// 一些 操作
	
	// 标签
	// 将tags 序列化
	if (pictureTagsSelect.value) {
		searchParams.tags = JSON.stringify(pictureTagsSelect.value)
	} else {
		searchParams.tags = ""
	}
	
	// 分类
	if (pictureCategorySelect.value) {
		searchParams.category = pictureCategorySelect.value
	} else {
		searchParams.category = ""
	}
	
	
	
	const result = await adminPictureQueryUsingPost({
		...searchParams
	})
	
	if (result.data.code !== 0) {
		message.error("请求失败:" + result.data.message);
		return;
	}
	
	if (result.data.data) {
		dataList.value = result.data.data.records ?? [];
		// @ts-ignore
		total.value = Number.parseInt(result.data.data.total) ?? 0;
		message.success("请求成功");
	} else {
		message.error("请求失败:" + result.data.message);
	}
	
	
}


/**
 * 打开删除 提示语
 * @param id
 */
const openDelete = (id: number) => {

};


/**
 *  编辑
 */
const doEdit = async (id: number) => {

}


/**
 *  添加
 */
const doAdd = async () => {

}

/**
 *  图片分类
 */
const pictureCategoryMap = {
	"avatar": {
		title: "头像",
		color: "cyan"
	},
	"articleBg": {
		title: "文章背景",
		color: "purple"
	},
	"other": {
		title: "其它",
		color: "blue"
	}
}

/**
 * 文件大小换算
 */
function getSize(size: number) {
	return Math.floor(size / 1024)
}

/**
 * 存放方式
 */
const pictureSaveWayMap = {
	"local": {
		title: "本地",
		color: "green"
	},
	"tx-oss": {
		title: "腾讯oss",
		color: "blue"
	},
	"qny-oss": {
		title: "七牛云",
		color: "red"
	}
}


/**
 * 标签 默认分组
 */
const pictureTagsOptions = [
	{
		value: "头像"
	},
	{
		value: "背景"
	},
	{
		value: "其它"
	}
]

/**
 * 标签 数据
 */
const pictureTagsSelect = ref<string[]>([])


/**
 * 图片分类 默认分组
 */
const pictureCategoryOptions = [
	{
		value: "avatar",
		label: "头像"
	},
	{
		value: "articleBg",
		label: "文章背景"
	},
	{
		value: "other",
		label: "其它"
	}
]

/**
 * 图片分类
 */
const pictureCategorySelect = ref<string>()



/**
 * 搜索 -获取数据
 */
const doSearch = () => {
	
	// 重置页码
	searchParams.current = 1
	fetchData()
}

/**
 *  重置
 */
const doReset = () => {
	searchParams.current = 1
	searchParams.pageSize = 5
	searchParams.introduction = ""
	searchParams.userId = undefined
	searchParams.useUserId = undefined
	searchParams.startTime = ""
	searchParams.picFormat = ""
	searchParams.endTime = ""
	pictureTagsSelect.value = []
	pictureCategorySelect.value = ""
	fetchData()
}



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
		
		.ep {
			max-width: 120px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: center;
		}
		
		.center {
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
		
		.operation {
			display: flex;
			
			button {
				margin-right: 10px;
			}
		}
	}
}
</style>