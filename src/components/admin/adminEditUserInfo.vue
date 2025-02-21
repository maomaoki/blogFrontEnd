<template>
	<a-modal
			v-model:open="visible"
			title="用户编辑"
			:confirm-loading="confirmLoading"
			okText="修改"
			cancelText="取消"
			@ok="handleOk">
		
		<div class="userInfo">
			
			<a-form>
				<a-form-item label="用户头像">
					<!--头像-->
					<Ym-avatar
							:imageData="imageData"
							:loading="uploadLoading"
							:beforeUpload="avatarBeforeUpload"
							:upload="avatarUpload"
							:clear-data="clearData"
					/>
				</a-form-item>
				<a-form-item label="用户昵称">
					<!--昵称	-->
					<a-input
							style="width: 40%"
							v-model:value="userInfo.userName"
							placeholder="用户昵称"
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

</template>

<script setup lang="ts">
import {defineExpose, reactive, ref} from 'vue';
import {
	PlusOutlined,
	LoadingOutlined,
} from '@ant-design/icons-vue';
import {adminEditUserUsingPost, adminGetUserInfoByIdUsingPost} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import YmAvatar from "@/components/ym/YmAvatar/YmAvatar.vue";
import PictureConstant from "@/constants/pictureConstant.ts";
import {uploadPictureUsingPost} from "@/api/pictureController.ts";


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
const userInfo = ref<API.AdminUpdateUserDto>({})


/**
 * 头像数据
 */
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

// 头像数据
const imageData = ref<API.UploadPictureVo>({})

// 头像上传逻辑
async function avatarUpload(file: File) {
	uploadLoading.value = true
	
	// 上传 文件,默认是头像
	const result = await uploadPictureUsingPost({}, {}, file)
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

// 清除数据
function clearData() {
	imageData.value = {}
}


/**
 * 标签数据
 */
const tagsState = reactive({
	tags: [],
	inputVisible: false,
	inputValue: '',
});

/**
 *  权限
 */
const userRoleSelect = ref<string>("");
/**
 * 角色 默认分组
 */
const userRoleOptions = [
	{
		value: "boss",
		label: "云猫大大~"
	},
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
const userStatusSelect = ref<number>();
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
	const res = await adminGetUserInfoByIdUsingPost({id});
	if (res.data.code !== 0) {
		message.error("请求失败:" + res.data.msg);
		return
	}
	
	// 显示在编辑框内
	if (res.data.data) {
		userInfo.value = res.data.data
		
		// 标签需要转json
		tagsState.tags = res.data.data.userTags ? JSON.parse(res.data.data.userTags) : [];
		// 渲染角色
		userRoleOptions.map((item) => {
			// @ts-ignore
			if (item.value == res.data.data.userRole) {
				userRoleSelect.value = item.value
			}
		})
		// 渲染状态
		userStatusOptions.map((item) => {
			// @ts-ignore
			if (item.value == res.data.data.userStatus) {
				// @ts-ignore
				userStatusSelect.value = item.value
			}
			
		})
		
	} else {
		message.error("请求失败:" + res.data.msg);
		return
	}
	
}

// 完成关闭弹窗
const handleOk = async () => {
	// 角色
	userInfo.value.userRole = userRoleSelect.value
	
	// 状态
	userInfo.value.userStatus = userStatusSelect.value
	
	// 头像数据更新
	if(imageData.value.id){
		// 存在id 一定是上传新的图片,清空会连数据一起清空
		userInfo.value.avatarId = imageData.value.id
		userInfo.value.userAvatar = imageData.value.pictureUrl
	}
	
	const result = await adminEditUserUsingPost(userInfo.value);
	if (result.data.code !== 0) {
		message.error("编辑错误:" + result.data.msg);
		return
	}
	
	message.success("编辑成功!")
	
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