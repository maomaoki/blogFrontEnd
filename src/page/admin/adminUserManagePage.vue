<template>
	<div id="adminUserManagePage">
		
		<!--上面是 搜索框-->
		<div class="ym-search-bar">
			<a-form
					class="ym-form"
					:model="searchParams"
					@finish="doSearch">
				<a-form-item label="账号">
					<a-input v-model:value="searchParams.userAccount" placeholder="输入账号"/>
				</a-form-item>
				<a-form-item label="用户昵称">
					<a-input v-model:value="searchParams.userName" placeholder="输入用户昵称"/>
				</a-form-item>
				<a-form-item label="用户标签">
					<a-select
							v-model:value="userTagsSelect"
							mode="tags"
							style="width: 120px"
							placeholder="请输入用户标签"
							:max-tag-count=3
							:options="userTagsOptions"
					></a-select>
				</a-form-item>
				<a-form-item label="用户角色">
					<a-space>
						<a-select
								v-model:value="userRoleSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入角色"
								:options="userRoleOptions"
						></a-select>
					</a-space>
				</a-form-item>
				<a-form-item label="注册方式">
					<a-input v-model:value="searchParams.userRegistrationSource" placeholder="请输入注册方式"/>
				</a-form-item>
				<a-form-item label="注册时间">
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
				<div class="table-title">用户管理</div>
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
					<!--账号-->
					<template v-if="column.dataIndex === 'userName'">
						<a-tooltip>
							<div style="text-align: center">{{ record.userName }}</div>
							<template #title>{{ record.userName }}</template>
						</a-tooltip>
					
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
						<div v-if="record.userAvatar" style="text-align: center">
							<a-image
									style="text-align: center"
									:src="record.userAvatar"
									:width="80"/>
						</div>
						
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
							<a-button type="primary" @click="doEdit(record.id)">编辑</a-button>
							<a-button type="primary" danger @click="openDelete(record.id)">删除</a-button>
						</div>
					</template>
				</template>
			</a-table>
		</div>
	
	</div>
	
	<!--编辑用户信息-->
	<admin-edit-user-info
			:do-refresh="doReset"
			ref="editUserInfoRef"/>
	
	
	<!--添加用户信息-->
	<admin-add-user
			ref="addUserRef"
			:do-refresh="doReset"/>
</template>
<script setup lang="ts">
import {CopyOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {computed, createVNode, onMounted, reactive, ref} from "vue";
import {adminDeleteUserUsingPost, adminUserQueryUsingPost} from "@/api/userController.ts";
import {message, Modal, type TableProps} from "ant-design-vue";
import type {TableColumnsType} from 'ant-design-vue';
import dayjs from "dayjs";
import type {RangeValue} from "ant-design-vue/es/vc-picker/interface";
import AdminEditUserInfo from "@/components/admin/adminEditUserInfo.vue";
import AdminAddUser from "@/components/admin/adminAddUser.vue";

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
 * 标签 默认分组
 */
const userTagsOptions = [
	{
		value: "Java"
	},
	{
		value: "Python"
	},
	{
		value: "Golang"
	}
]

/**
 * 标签 数据
 */
const userTagsSelect = ref<string[]>([])


/**
 * 角色 默认分组
 */
const userRoleOptions = [
	{
		value: "admin",
		label: "管理员"
	},
	{
		value: "user",
		label: "普通用户"
	},
	{
		value: "blackUser",
		label: "黑名单"
	}
]

/**
 * 角色 数据
 */
const userRoleSelect = ref<string>()


/**
 * 获取数据
 */
const fetchData = async () => {
	
	// 一些 操作
	// 将tags 序列化
	if (userTagsSelect.value) {
		searchParams.userTags = JSON.stringify(userTagsSelect.value)
	} else {
		searchParams.userTags = ""
	}
	
	// 角色
	if (userRoleSelect.value) {
		searchParams.userRole = userRoleSelect.value
	} else {
		searchParams.userRole = ""
	}
	
	
	const result = await adminUserQueryUsingPost({
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
	searchParams.userAccount = ""
	searchParams.userName = ""
	searchParams.userRegistrationSource = ""
	searchParams.userRole = ""
	searchParams.startTime = ""
	searchParams.endTime = ""
	userTagsSelect.value = []
	userRoleSelect.value = ""
	fetchData()
}

/**
 * 打开删除 提示语
 * @param id
 */
const openDelete = (id: number) => {
	Modal.confirm({
		title: '你确定要删除此用户吗?',
		icon: createVNode(ExclamationCircleOutlined),
		content: '用户id:' + id,
		onOk() {
			doDelete(id);
		}
	});
};

/**
 * 删除
 */
const doDelete = async (id: number) => {
	
	const result = await adminDeleteUserUsingPost({
		id
	})
	if (result.data.code !== 0) {
		message.error("删除失败:" + result.data.message);
		return;
	}
	
	message.success("删除成功");
	// 数据 格式化一下
	await doReset()
}


/**
 *  编辑弹窗 ref
 */
const editUserInfoRef = ref()


/**
 *  编辑
 */
const doEdit = async (id: number) => {
	editUserInfoRef.value.openModal(id);
}


/**
 *  添加弹窗 ref
 */
const addUserRef = ref()


/**
 *  添加
 */
const doAdd = async () => {
	addUserRef.value.openModal();
}


// 页面加载时请求一次
onMounted(() => {
	fetchData()
})


</script>


<style lang="less">
#adminUserManagePage {
	
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