<template>
	<div id="ym-avatar">
		
		<!--上传框-->
		<a-upload
				v-if="!imageData?.pictureUrl"
				class="ym-upload"
				list-type="picture-card"
				:show-upload-list="false"
				:custom-request="handleUpload"
				:before-upload="beforeUpload"
		>
			<div>
				<loading-outlined v-if="props.loading">
				
				</loading-outlined>
				<plus-outlined v-else></plus-outlined>
				<div class="ant-upload-text">点击或拖拽上传</div>
			</div>
		</a-upload>
		<!--图片展示框,只有照片才会显示-->
		<div v-else class="ym-image">
			<!--照片-->
			<img :src="imageData?.pictureUrl"
			     alt="avatar">
			<!--蒙版,显示操作按钮-->
			<div class="ym-mark">
			  <span class="ym-mark-list-btn">
				  <i><EyeOutlined
						  @click="previewVisible = true"
						  title="预览"/></i>
				  <i><DeleteOutlined
						  @click="clear"
						  title="清除"/></i>
			  </span>
			</div>
		
		</div>
		
		<!--	图片预览放大操作-->
		<a-modal :open="previewVisible"
		         :title="imageData?.pictureName"
		         :footer="null"
		         
		         @cancel="handleCancel">
			<img alt="example"
			     style="width: 100%"
			     :src="imageData?.pictureUrl"/>
		</a-modal>
	
	</div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {
	PlusOutlined,
	LoadingOutlined,
	EyeOutlined,
	DeleteOutlined
} from '@ant-design/icons-vue';

// 从外面拿到url
// 暴露一个上传图片的方法出去
// 校验参数方法（上传前校验）
interface propsType {
	// todo 这里也是方便类型,不应该绑定api
	imageData: API.UploadPictureVo,
	loading: boolean,
	upload: (file: File) => any
	beforeUpload: (data: File) => boolean
	clearData:()=>void
}

const props = defineProps<propsType>()

/**
 * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
 */
function beforeUpload(file: File) {
	return props.beforeUpload(file);
}

/**
 * 执行上传逻辑
 */
function handleUpload({file}: { file: File }) {
	props.upload(file);
}

const previewVisible = ref<boolean>(false)


/**
 * 清除 图片
 */
function clear(){
	props.clearData()
}


/**
 * 关闭 弹窗
 */
function handleCancel() {
	previewVisible.value = false
}



</script>

<style lang="less">
#ym-avatar {
	width: 120px;
	height: 120px;
	overflow: hidden;
	
	.ym-upload {
		width: 100%;
		height: 100%;
		
		
		.ant-upload {
			width: 100%;
			height: 100%;
		}
		
		.ant-upload-text {
			font-size: 12px;
		}
	}
	
	.ym-image {
		width: 100%;
		height: 100%;
		cursor: pointer;
		border-radius: 10px;
		padding: 5px;
		border: 1px dashed #d9d9d9;
		overflow: hidden;
		position: relative;
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
		
		.ym-mark {
			position: absolute;
			top: 5px;
			left: 5px;
			z-index: 1;
			border-radius: 10px;
			width: calc(100% - 10px);
			height: calc(100% - 10px);
			background-color: rgba(0, 0, 0, 0.45);
			opacity: 0;
			transition: all 0.3s;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.ym-mark-list-btn {
				width: 100%;
				text-align: center;
				line-height: 0;
				
				i {
					padding: 0 5px;
					cursor: pointer;
					
					span {
						font-size: 18px;
						transition: all 0.3s;
						
						&:hover {
							color: #FFFFFF;
						}
					}
				}
				
			}
		}
		
		&:hover {
			.ym-mark {
				opacity: 1;
			}
		}
		
		//&:before{
		//	position: absolute;
		//	z-index: 1;
		//	border-radius: 10px;
		//	width: calc(100% - 10px);
		//	height: calc(100% - 10px);
		//	background-color: rgba(0, 0, 0, 0.45);
		//	opacity: 0;
		//	transition: all 0.3s;
		//	content: " ";
		//}
		//
		//&:hover{
		//	&:before{
		//		opacity: 1;
		//	}
		//}
		//
		
	}
	
}
</style>