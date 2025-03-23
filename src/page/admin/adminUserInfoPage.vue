<template>
	<div id="adminUserInfoPage">
		
		<div class="userInfo-header">
			<div class="userInfo-content">
				<!--todo 头像上传-->
				<a-avatar
						class="avatar"
						:size="96"
						:src="userInfo?.userAvatar"
				>
					<template #icon>
						<UserOutlined/>
					</template>
				</a-avatar>
				
				<div class="userInfo-content-card">
					<h2>{{ userInfo.userName }}</h2>
					<div class="userProfile">{{ userInfo.userProfile }}</div>
					<div class="tags">
						<a-tag v-if="userInfo.userTags" :color="tagsColor[index % tagsColor.length]"
						       v-for="(item,index) in jsonParse(userInfo.userTags)" :key="item">
							{{ item }}
						</a-tag>
					</div>
				</div>
			
			</div>
			
			<div class="bottom">
			
			</div>
		
		
		</div>
		
		<div class="userInfo-edit-content">
			
			<div class="edit-card">
				<div class="edit-title">
					<span class="text">基本信息</span>
					<a href="/admin/userEdit" class="href">
						<EditOutlined/>
						编辑
					</a>
				</div>
				
				<div class="edit-content">
					<!--昵称-->
					<div class="info">
						<span>昵称</span>
						<span>{{ userInfo.userName }}</span>
					</div>
					<!--手机号-->
					<div class="info">
						<span>手机号</span>
						<span>{{ userInfo.userPhone }}</span>
					</div>
					<!--邮箱-->
					<div class="info">
						<span>邮箱</span>
						<span>{{ userInfo.userEmail }}</span>
					</div>
					<!--简介-->
					<div class="info">
						<span>简介</span>
						<span>
							{{ userInfo.userIntroduction }}
						</span>
					</div>
					<!--性别-->
					<div class="info">
						<span>性别</span>
						<span>
							{{ userGender(userInfo.userFGender as number) }}
						</span>
					</div>
					<!--年龄-->
					<div class="info">
						<span>年龄</span>
						<span>
							{{ userInfo.userAge }}
						</span>
					</div>
				</div>
			</div>
			<div class="edit-card">
				<div class="edit-title">
					<span class="text">其他信息</span>
				</div>
				
				<div class="edit-content">
					<div class="info">
						<span>用户id</span>
						<span>{{ userInfo.id }}</span>
					</div>
					<div class="info">
						<span>用户角色</span>
						<span>{{
								// @ts-ignore
								userRoleConstants[userInfo.userRole as string]
							}}</span>
					</div>
					<div class="info">
						<span>注册方式</span>
						<span>{{ userInfo.registeredSource }}</span>
					</div>
					<div class="info">
						<span>注册时间</span>
						<span>
							{{ dayjs(userInfo.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
					</div>
				</div>
			</div>
		</div>
	
	
	</div>
</template>

<script setup lang="ts">
import {UserOutlined, EditOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import {userGetLoginInfoUsingGet} from "@/api/userController.ts";
import {message} from "ant-design-vue";
import router from "@/routers";
import userRoleConstants from "@/constants/userRoleConstants.ts";
import dayjs from "dayjs";

/**
 *  用户 个人 信息
 */
const userInfo = ref<API.UserVo>({})

onMounted(async () => {
	const result = await userGetLoginInfoUsingGet();
	if (result.data.code !== 0) {
		message.error("未登录")
		await router.push("/login")
		return
	}
	// @ts-ignore
	userInfo.value = result.data.data
})

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
 * 转性别
 */
function userGender(gender: number) {
	return gender === 0 ? '小哥哥' : '小姐姐';
}

</script>


<style lang="less">
#adminUserInfoPage {
	width: 100%;
	
	.userInfo-header {
		width: 100%;
		background: var(--admin_content_bg_color);
		border-radius: 10px;
		padding: 15px 15px;
		margin-bottom: 20px;
		
		.userInfo-content {
			display: flex;
			align-items: center;
			
			.avatar {
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid var(--admin_active_bg_color);
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 40px;
				
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				
			}
			
			.userInfo-content-card {
				
				.userProfile {
					width: 150px;
					overflow: hidden; /* 隐藏超出范围的内容 */
					text-overflow: ellipsis; /* 使用省略号 */
					margin-bottom: 20px;
				}
				
				.tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					
					span {
						margin: 0 5px 5px 0;
					}
				}
				
			}
		}
	}
	
	.userInfo-edit-content {
		width: 100%;
		background: var(--admin_content_bg_color);
		border-radius: 10px;
		padding: 15px 15px;
		
		.edit-card {
			padding: 10px 0;
			
			.edit-title {
				width: 100%;
				padding: 10px 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.text {
					font-size: 20px;
				}
				
				.href {
					color: var(--admin_link_color);
					text-decoration: none;
					font-size: 15px;
					transition: all 0.3s;
					
					&:hover {
						color: var(--admin_link_hover_color);
					}
				}
			}
			
			.edit-content {
				padding: 10px 15px;
				
				.info {
					width: 30%;
					display: flex;
					align-items: center;
					padding: 20px 0;
					text-align: left;
					
					span:nth-child(1) {
						width: 100px;
						text-align: left;
						margin-right: 10px;
					}
					
					span:nth-child(2) {
						width: 150px;
						white-space: nowrap;
						overflow: hidden; /* 隐藏超出范围的内容 */
						text-overflow: ellipsis; /* 使用省略号 */
					}
				}
				
			}
			
			&:not(&:last-child) {
				border-bottom: 1px solid var(--admin_line_bg_color);
			}
		}
		
		
	}
	
	
}
</style>