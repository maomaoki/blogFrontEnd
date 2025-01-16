<template>
	<div id="adminUserManagePage">
		
		<!--上面是 搜索框-->
		
		<!--下面是表格-->
		<div class="ym-table">
			<a-table
					rowKey="id"
					:row-selection="rowSelection"
					class="ym-table"
					:columns="columns"
					:data-source="dataList"
					:scroll="{ x: 1500 }"
					@resizeColumn="handleResizeColumn"
					:pagination="pagination"
					@change="doTableChange"
			>
				
				<template #bodyCell="{ column, record }">
					<!--用户id-->
					<template v-if="column.dataIndex === 'id'">
						<a-tooltip v-if="record.id + ''">
							<template #title>{{ record.id }}</template>
							<a @click="copyText(record.id + '')">
								<CopyOutlined/>
							</a>{{ record.id }}
						</a-tooltip>
						<span v-else style="text-align: center">null</span>
					</template>
					<!--账号-->
					<template v-if="column.dataIndex === 'userAccount'">
						<a-tooltip v-if="record.userAccount">
							<template #title>{{ record.userAccount }}</template>
							<a @click="copyText(record.userAccount)">
								<CopyOutlined/>
							</a>{{ record.userAccount }}
						</a-tooltip>
						
						<span v-else style="text-align: center">null</span>
					</template>
					<!--邮箱-->
					<template v-if="column.dataIndex === 'userEmail'">
						
						<a-tooltip v-if="record.userEmail">
							<template #title>{{ record.userEmail }}</template>
							<a @click="copyText(record.userEmail)">
								<CopyOutlined/>
							</a>{{ record.userEmail }}
						</a-tooltip>
						<div v-else style="text-align: center">null</div>
					</template>
					<!--头像-->
					<template v-if="column.dataIndex === 'userAvatar'">
						<a-image v-if="record.userAvatar" :src="record.userAvatar" :width="80"/>
						<div v-else style="text-align: center">null</div>
					</template>
					<!--标签-->
					<template v-if="column.dataIndex === 'userTags'">
						<div class="tags">
							<a-tag v-if="record.userTags" :color="tagsColor[index % tagsColor.length]"
							       v-for="(item,index) in jsonParse(record.userTags)" :key="item">
								{{ item }}
							</a-tag>
						</div>
					</template>
					<!--角色-->
					<template v-if="column.dataIndex === 'userRole'">
						<div class="role">
							<a-tag v-if="record.userRole === 'boss'" color="red">云猫</a-tag>
							<a-tag v-else-if="record.userRole === 'admin'" color="blue">管理员</a-tag>
							<a-tag v-else-if="record.userRole === 'user'" color="green">普通用户</a-tag>
							<a-tag v-else-if="record.userRole === 'blackUser'" color="purple">黑名单</a-tag>
						</div>
					</template>
					<!--用户状态-->
					<template v-if="column.dataIndex === 'userStatus'">
						<div class="status">
							<a-tag v-if="record.userStatus == '0'" color="green">正常</a-tag>
							<a-tag v-else-if="record.userStatus == '1'" color="red">禁用</a-tag>
						</div>
					</template>
					<!--注册来源-->
					<template v-if="column.dataIndex === 'userRegistrationSource'">
						<div class="userRegistrationSource">
							<a-tag v-if="record.userRegistrationSource === 'admin'" color="cyan">{{ record.userRegistrationSource }}
							</a-tag>
							<a-tag v-else-if="record.userRegistrationSource === 'email'" color="orange">
								{{ record.userRegistrationSource }}
							</a-tag>
							<a-tag v-else-if="record.userRegistrationSource === 'qq'" color="green">
								{{ record.userRegistrationSource }}
							</a-tag>
							<a-tag v-else-if="record.userRegistrationSource === 'wx'" color="purple">
								{{ record.userRegistrationSource }}
							</a-tag>
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
							<a-button type="primary">编辑</a-button>
							<a-button type="primary" danger>删除</a-button>
						</div>
					</template>
				</template>
			</a-table>
		</div>
	
	
	</div>
</template>
<script setup lang="ts">
import {CopyOutlined} from '@ant-design/icons-vue';
import {computed, onMounted, reactive, ref} from "vue";
import {adminUserQueryUsingPost} from "@/api/userController.ts";
import {message, type TableProps} from "ant-design-vue";
import type {TableColumnsType} from 'ant-design-vue';
import dayjs from "dayjs";

/**
 *  表格列
 */
const columns = ref<TableColumnsType>([
	{
		title: '用户id',
		dataIndex: 'id',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
		fixed: "left"
	},
	{
		title: '账号',
		dataIndex: 'userAccount',
		ellipsis: true,
		resizable: true,
		width: 130,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '用户邮箱',
		dataIndex: 'userEmail',
		ellipsis: true,
		resizable: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '用户昵称',
		dataIndex: 'userName',
		ellipsis: true,
	},
	{
		title: '用户头像',
		dataIndex: 'userAvatar',
	},
	{
		title: '用户标签',
		dataIndex: 'userTags',
		ellipsis: true,
		resizable: true,
		width: 180,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '用户角色',
		dataIndex: 'userRole',
	},
	{
		title: '用户状态',
		dataIndex: 'userStatus',
	},
	{
		title: '注册来源',
		dataIndex: 'userRegistrationSource',
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		ellipsis: true,
		resizable: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
	},
	{
		title: '更新时间',
		dataIndex: 'updateTime',
		ellipsis: true,
		resizable: true,
		width: 100,
		minWidth: 100,
		maxWidth: 500,
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
const dataList = ref<API.UserPageVo[]>([]);

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
const searchParams = reactive<API.AdminUserQueryDto>({
	current: 1,
	pageSize: 5,
})

// 获取数据
const fetchData = async () => {
	const result = await adminUserQueryUsingPost({
		...searchParams
	})
	
	if (result.data.code !== 0) {
		message.error("请求失败:" + result.data.message);
		return;
	}
	
	if (result.data.data) {
		dataList.value = result.data.data.records ?? [];
		total.value = result.data.data.total ?? 0;
		message.success("请求成功");
	} else {
		message.error("请求失败:" + result.data.message);
	}
	
	
}

// 分页参数
const pagination = computed(() => {
	return {
		current: searchParams.current ?? 1,
		pageSize: searchParams.pageSize ?? 5,
		total: total.value,
		showSizeChanger: true,
		showTotal: (total:number) => `共 ${total} 条`,
	}
})

// 表格变化处理
const doTableChange = (page: any) => {
	searchParams.current = page.current
	searchParams.pageSize = page.pageSize
	fetchData()
}


// 页面加载时请求一次
onMounted(() => {
	fetchData()
})


</script>


<style lang="less">
#adminUserManagePage {
	
	.ym-table {
		width: 100%;
		overflow: hidden;
		background: var(--admin_content_bg_color);
		
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
		
		.userRegistrationSource {
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