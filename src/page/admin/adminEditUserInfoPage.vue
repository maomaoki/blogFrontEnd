<template>
	<div id="adminEditUserInfoPage">
		
		<div class="userInfo-edit-content">
			
			<div class="edit-card">
				<div class="edit-title">
					<span class="text">修改信息</span>
				</div>
				
				<div class="edit-content">
					
					<a-form>
						
						<a-form-item label="头像">
							<!--头像	-->
							<a-upload
									class="avatar-uploader"
									v-model:file-list="fileList"
									name="avatar"
									list-type="picture-card"
									:show-upload-list="false"
									:before-upload="beforeUpload"
									@change="handleChange"
							>
								<img v-if="userInfo.userAvatar"
								     :src="userInfo.userAvatar"
								     alt="avatar"/>
								<div v-else>
									<loading-outlined v-if="loading"></loading-outlined>
									<plus-outlined v-else></plus-outlined>
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
						</a-form-item>
						
						<a-form-item label="用户昵称">
							<!--昵称	-->
							<a-input
									style="width: 40%"
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
					</a-form>
				</div>
				
				<div class="edit-btn">
					<a-button type="primary" @click="doEdit">修改</a-button>
					<a-button @click="doBack">取消</a-button>
				</div>
			</div>
		</div>
	
	
	</div>
</template>

<script setup lang="ts">
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {nextTick, onMounted, reactive, ref} from "vue";
import {getLoginUserUsingGet, userUpdateUsingPost} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";

/**
 *  用户 个人 信息
 */
const userInfo = ref<API.UserVo>({})

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
 * 头像数据
 */
const loading = ref<boolean>(false)
const fileList = ref([]);

function beforeUpload() {
}

function handleChange() {
}

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

//---------------------------------------


onMounted(async () => {
	const result = await getLoginUserUsingGet();
	if (result.data.code !== 0) {
		message.error("未登录")
		await router.push("/login")
		return
	}
	// @ts-ignore
	userInfo.value = result.data.data
	tagsState.tags = userInfo.value.userTags ? jsonParse(userInfo.value.userTags) : []
})


/**
 * 触发编辑
 */
async function doEdit() {
	
	// 发送编辑用户请求
	// 需要将 标签数组 转成json
	userInfo.value.userTags = JSON.stringify(tagsState.tags)
	
	const result = await userUpdateUsingPost(userInfo.value)
	if (result.data.code !== 0) {
		message.error("修改错误:" + result.data.message)
		return;
	}
	message.success("修改成功")
	await router.push("/admin/adminUserInfo")
}

/**
 * 取消
 */
function doBack() {
	router.push("/admin/adminUserInfo")
}


</script>


<style lang="less">
#adminEditUserInfoPage {
	width: 100%;
	
	.userInfo-edit-content {
		width: 100%;
		background: var(--admin_content_bg_color);
		border-radius: 10px;
		padding: 15px 15px;
		
		
		.edit-card {
			padding: 10px 0;
			
			.edit-title {
				width: 100%;
				padding: 10px 15px 20px 15px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid var(--admin_line_bg_color);
				
				.text {
					font-size: 20px;
				}
				
			}
			
			.edit-content {
				padding: 10px 15px;
				margin-bottom: 30px;
				
				.ant-form-item-label {
					margin-right: 30px;
				}
				
			}
			
			.edit-btn {
				text-align: right;
				
				button {
					margin-right: 30px;
				}
				
			}
			
		}
		
		
	}
	
	
}
</style>