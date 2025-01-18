<template>
	<a-modal
			v-model:open="visible"
			title="添加用户"
			:confirm-loading="confirmLoading"
			okText="添加"
			cancelText="取消"
			@ok="handleOk">
		
		<div class="userInfo">
			
			<!--头像-->
			<a-upload
					v-model:file-list="fileList"
					name="avatar"
					list-type="picture-card"
					:show-upload-list="false"
					:before-upload="beforeUpload"
					@change="handleChange"
			>
				<img v-if="addUserInfo.userAvatar"
				     :src="addUserInfo.userAvatar"
				     alt="avatar"/>
				<div v-else>
					<loading-outlined v-if="loading"></loading-outlined>
					<plus-outlined v-else></plus-outlined>
					<div class="ant-upload-text">Upload</div>
				</div>
			</a-upload>
			
			<a-form>
				<a-form-item label="用户账号">
					<!--账号	-->
					<a-input
							style="width: 40%"
							v-model:value="addUserInfo.userAccount"
							placeholder="请输入用户账号"
					/>
				</a-form-item>
				
				<a-form-item label="用户昵称">
					<!--昵称	-->
					<a-input
							style="width: 40%"
							v-model:value="addUserInfo.userName"
							placeholder="请输入用户昵称"
					/>
				</a-form-item>
				
				<a-form-item label="用户权限">
					<!--角色-->
					<a-select
							v-model:value="userRoleSelect"
							mode="combobox"
							:allowClear="true"
							style="width: 120px"
							placeholder="请输入角色"
							:options="userRoleOptions"
					></a-select>
				</a-form-item>

			</a-form>
		
		</div>
	
	
	</a-modal>

</template>

<script setup lang="ts">
import {defineExpose,  ref} from 'vue';
import {
	PlusOutlined,
	LoadingOutlined,
	
} from '@ant-design/icons-vue';
import {adminAddUserUsingPost} from "@/api/userController.ts";
import {message} from "ant-design-vue";


interface propsType {
	doRefresh: () => void
}

const props = defineProps<propsType>()


// 是否可见
const visible = ref(false)

// 等待转圈
const confirmLoading = ref(false)

/**
 *  用户信息
 */
const addUserInfo = ref<API.AdminUserAddDto>({})


/**
 * 头像数据
 */
const loading = ref<boolean>(false)
const fileList = ref([]);

function beforeUpload() {
}

function handleChange() {
}


/**
 *  权限
 */
const userRoleSelect = ref<string>("");
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

//---------------------------------------



/**
 * 打开 弹窗
 * @param id 从外部传来的id
 */
const openModal = async () => {
	// 打开弹窗
	visible.value = true
	
}

// 完成关闭弹窗
const handleOk = async () => {

	// 角色
	addUserInfo.value.userRole = userRoleSelect.value
	const result = await adminAddUserUsingPost(addUserInfo.value);
	if (result.data.code !== 0) {
		message.error("添加错误:" + result.data.message);
		return
	}
	message.success("添加成功!!")
	// 触发一下刷新
	props.doRefresh();
	// 成功且关闭弹窗
	visible.value = false
}


// 暴露函数给父组件
defineExpose({
	openModal,
});


</script>


<style lang="less">
.ant-modal {
	.userInfo {
		padding: 15px 0 0 0;
		
		.ant-upload-wrapper {
			text-align: center;
			margin-bottom: 15px;
			
			span.ant-upload {
				overflow: hidden;
				
				img {
					width: 100%;
					height: 100%;
				}
			}
			
		}
		
	}
}
</style>