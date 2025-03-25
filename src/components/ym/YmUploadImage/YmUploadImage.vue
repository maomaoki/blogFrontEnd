<template>

	<div id="YmUploadImage">

		<!--上传文件-->
		<a-upload-dragger
				name="picture-card"
				:show-upload-list="false"
				:custom-request="handleUpload"
				:before-upload="beforeUpload"
				v-if="!imageData?.pictureUrl"
		>
			<p class="ant-upload-drag-icon">
				<inbox-outlined></inbox-outlined>
			</p>
			<p class="ant-upload-text">可以点击或者拖拽上传</p>
			<p class="ant-upload-hint">
				文件不能大于3MB,仅支持jpg,png,webp等图片格式上传
			</p>
		</a-upload-dragger>

		<!--展示图片-->
		<div class="imageBox" v-else>
			<img :src="imageData?.pictureUrl"
			     alt="文章背景图"/>
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

			<!--	图片预览放大操作-->
			<a-modal
					wrap-class-name="ym-model"
					:open="previewVisible"
					style="width: 100%"
					:footer="null"
					:title="imageData?.pictureName"
					@cancel="handleCancel">
				<img alt="example"
				     style="width: 100%"
				     :src="imageData?.pictureUrl"/>
			</a-modal>
		</div>
	</div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {DeleteOutlined, EyeOutlined, InboxOutlined} from '@ant-design/icons-vue';

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
#YmUploadImage {

	max-width: 720px;

	.imageBox {
		width: 100%;
		height: 300px;
		border-radius: 10px;
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
			top: 0;
			left: 0;
			z-index: 1;
			border-radius: 10px;
			width: 100%;
			height: 100%;
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

		.ym-model{
			.ant-modal {
				max-width: 100%;
				top: 0;
				padding-bottom: 0;
				margin: 0;
			}
			.ant-modal-content {
				display: flex;
				flex-direction: column;
				height: calc(100vh);
			}
			.ant-modal-body {
				flex: 1;
			}
		}
	}

}
</style>