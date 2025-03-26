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
							<Ym-avatar
									:imageData="imageData"
									:loading="uploadLoading"
									:beforeUpload="avatarBeforeUpload"
									:upload="avatarUpload"
									:clear-data="clearData"
							>
							
							</Ym-avatar>
						
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
									v-model:value="userInfo.userIntroduction"
									placeholder="用户简介"
									:auto-size="{ minRows: 5, maxRows: 5 }"/>
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
						
						<a-form-item label="性别">
							<!--性别-->
							<a-select
									ref="select"
									v-model:value="userGenderSelect"
									style="width: 120px"
									@change="userGenderHandleChange"
							>
								<a-select-option :value="0">小哥哥</a-select-option>
								<a-select-option :value="1">小姐姐</a-select-option>
							</a-select>
						</a-form-item>
						
						<a-form-item label="年龄">
							<!--年龄-->
							<a-input-number id="inputNumber"
							                v-model:value="userInfo.userAge"
							                :min="1" :max="99"/>
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
import {PlusOutlined} from '@ant-design/icons-vue';
import {nextTick, onMounted, reactive, ref} from "vue";
import {userEditUsingPost, userGetLoginInfoUsingGet} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import YmAvatar from "@/components/ym/YmAvatar/YmAvatar.vue";
import PictureConstant from "@/constants/pictureConstant.ts";
import {uploadPictureUsingPost} from "@/api/pictureController.ts";
import {useUserStores} from "@/stores/useUserStores.ts";

/**
 *  用户 个人 信息
 */
const userInfo = ref<API.UserVo>({})

/**
 * 标签颜色
 */
//@ts-ignore
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


/**
 * 用户 性别 选着
 */
const userGenderSelect = ref<number>(0)

function userGenderHandleChange(value: number) {
	userInfo.value.userFGender = value
}


onMounted(async () => {
	const result = await userGetLoginInfoUsingGet();
	if (result.data.code != 0) {
		message.error("未登录")
		await router.push("/login")
		return
	}
	// 成功 后将数据替换
	// @ts-ignore
	userInfo.value = result.data.data
	tagsState.tags = userInfo.value.userTags ? jsonParse(userInfo.value.userTags) : []
	userGenderSelect.value = userInfo.value.userFGender as number
	imageData.value.pictureUrl = userInfo.value.userAvatar
})

const {setUserInfo} = useUserStores();

/**
 * 触发编辑
 */
async function doEdit() {
	
	// 发送编辑用户请求
	// 需要将 标签数组 转成json
	userInfo.value.userTags = JSON.stringify(tagsState.tags)
	
	// 是否修改过头像数据
	if (imageData.value.id !== 0) {
		// 会有 头像id
		// 需要携带头像数据
		userInfo.value.userAvatar = imageData.value.pictureUrl
		// @ts-ignore
		userInfo.value.avatarId = imageData.value.id
	}
	
	const result = await userEditUsingPost(userInfo.value)
	if (result.data.code !== 0) {
		message.error("修改错误:" + result.data.msg)
		return;
	}
	message.success("修改成功")
	// 更新一下 全局状态库 刷新数据
	await setUserInfo();
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