<template>
	<div id="adminEditUserInfo">
		
		<a-modal
				v-model:open="visible"
				title="用户编辑"
				:confirm-loading="confirmLoading"
				@ok="handleOk">
			
			<div class="userInfo">
				
				<!--头像-->
				<a-avatar
						:size="64"
						:src="userInfo.userAvatar"
				>
					<template #icon>
						<UserOutlined/>
					</template>
				</a-avatar>
				<a-form>
					
					<a-form-item label="用户昵称">
						<!--昵称	-->
						<a-input
								v-model:value="userInfo.userName"
								placeholder="用户昵称"
						/>
					</a-form-item>
					
					<a-form-item label="用户简介">
						<!--简介-->
						<a-textarea
								v-model:value="userInfo.userProfile"
								placeholder="用户简介"
								:rows="4"/>
					</a-form-item>
					
					<a-form-item label="用户标签">
						<!--标签-->
						<template v-for="(tag, index) in tagsState.tags" :key="tag">
							<a-tag :closable="index !== 0" @close="handleClose(tag)">
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
					
					<a-form-item label="用户状态">
						<!--状态-->
						<a-select
								v-model:value="userStatusSelect"
								mode="combobox"
								:allowClear="true"
								style="width: 120px"
								placeholder="请输入用户状态"
								:options="userStatusOptions"
						></a-select>
					</a-form-item>
				</a-form>
			
			
			</div>
		
		
		</a-modal>
	
	</div>
</template>

<script setup lang="ts">
import {defineExpose, nextTick, reactive, ref} from 'vue';
import {PlusOutlined, UserOutlined} from '@ant-design/icons-vue';
import {adminGetUserVoByIdUsingPost} from "@/api/userController.ts";
import {message} from "ant-design-vue";


// 是否可见
const visible = ref(false)

// 等待转圈
const confirmLoading = ref(false)

/**
 *  用户信息
 */
const userInfo = ref<API.AdminUserUpdateDto>({})


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
	console.log(tags);
	
	// 重新赋值
	Object.assign(tagsState, {
		tags,
		inputVisible: false,
		inputValue: '',
	});
};

//---------------------------------------


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
 *  状态
 */
const userStatusSelect = ref<boolean>();
/**
 * 角色 默认分组
 */
const userStatusOptions = [
	{
		value: 0,
		label: "正常",
	},
	{
		value: 1,
		label: "禁用"
	}
]

//---------------------------------------


/**
 * 打开 弹窗
 * @param id 从外部传来的id
 */
const openModal = async (id: number) => {
	// 打开弹窗
	visible.value = true
	
	// 拿到id 去 获取 用户数据
	const res = await adminGetUserVoByIdUsingPost({id});
	if (res.data.code !== 0) {
		message.error("请求失败:" + res.data.message);
		return
	}
	
	// 显示在编辑框内
	if (res.data.data) {
		userInfo.value = res.data.data
		
		
		
		
	} else {
		message.error("请求失败:" + res.data.message);
		return
	}
	
}

// 完成关闭弹窗
const handleOk = () => {
	// 发送编辑用户请求
	
	// 成功且关闭弹窗
	visible.value = false
}


// 暴露函数给父组件
defineExpose({
	openModal,
});


</script>


<style lang="less">
#adminEditUserInfo {
	
	.userInfo {
	
	}
}
</style>