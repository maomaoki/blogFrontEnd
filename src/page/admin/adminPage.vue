<template>
	<div id="adminPage">
		
		<!--左边-->
		<div class="left">
			<!--上面是头像显示显示-->
			<div class="ym-logo">
				<img src="../../assets/images/avatar/400x400.png" alt="">
				<div class="ym-logo-text">
					<div>云猫</div>
					<div>YunMao</div>
				</div>
			</div>
			
			<!--侧边栏-->
			<div class="ym-menu">
				<a-menu
						id="ym-a-menu"
						v-model:selectedKeys="selectedKeys"
						mode="inline"
						:items="items"></a-menu>
			</div>
		</div>
		
		<!--右边-->
		<div class="right">
			<!--面包屑-->
			<div class="ym-breadcrumb">
				<a-breadcrumb>
					<a-breadcrumb-item><a href="">首页</a></a-breadcrumb-item>
					<a-breadcrumb-item>An Application</a-breadcrumb-item>
				</a-breadcrumb>
			</div>
			
			<!--tags-->
			<div class="ym-tags">
				
				<div class="tags-list">
					<span class="tags-item active">
						首页
					</span>
					<span class="tags-item">
						用户管理
					</span>
				</div>
				
				<div class="tags-close-btn">
					<span>全部关闭</span>
				</div>
			
			
			</div>
			
			<div class="ym-main">
				<!--下面路由-->
				<router-view></router-view>
			</div>
		
		</div>
	
	
	</div>
</template>

<script setup lang="ts">
import {reactive, ref, VueElement, h} from 'vue';
import {UserOutlined, WechatOutlined} from '@ant-design/icons-vue';
import type {ItemType} from 'ant-design-vue';

function getItem(
		label: VueElement | string,
		key: string,
		icon?: any,
		children?: ItemType[],
		type?: 'group',
): ItemType {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as ItemType;
}

const items: ItemType[] = reactive([
	getItem('用户管理', 'sub1', () => h(UserOutlined)),
	getItem('个人信息', 'sub2', () => h(WechatOutlined)),
]);

const selectedKeys = ref<string[]>(['sub1']);


</script>

<style lang="less">
#adminPage {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	
	.left {
		width: 240px;
		height: 100vh;
		border-right: 1px solid var(--admin_line_bg_color);
		transition: all 0.3s ease-in-out;
		
		.ym-logo {
			height: 90px;
			display: flex;
			align-items: center;
			padding: 20px;
			transition: all 0.3s ease-in-out;
			border-bottom: 1px solid var(--admin_line_bg_color);
			
			img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				transition: all 0.3s ease-in-out;
			}
			
			.ym-logo-text {
				margin-left: 20px;
				letter-spacing: 4px;
				text-align: center;
				transform: scale(1);
				transform-origin: left;
				transition: all 0.3s ease-in-out;
				
				div:nth-child(1) {
					font-size: 22px;
					font-weight: 600;
					margin-bottom: 5px;
				}
				
				div:nth-child(2) {
					font-size: 12px;
				}
				
			}
		}
		
		.ym-menu {
			height: calc(100% - 90px);
			
			#ym-a-menu {
				border-inline-end: none;
			}
		}
	}
	
	.right {
		width: calc(100% - 240px);
		transition: all 0.3s ease-in-out;
		
		.ym-breadcrumb {
			width: 100%;
			height: 60px;
			padding: 0 20px;
			border-bottom: 1px solid var(--admin_line_bg_color);
			display: flex;
			justify-content: space-between;
			align-items: center;
			
		}
		
		.ym-tags {
			width: 100%;
			height: 30px;
			border-bottom: 1px solid var(--admin_line_bg_color);
			padding: 0 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.tags-list {
				.tags-item {
					border-radius: 5px;
					border: 1px solid var(--admin_line_bg_color);
					padding: 4px 8px;
					font-size: 14px;
					cursor: pointer;
					text-align: center;
					
					&:not(&:last-child) {
						margin-right: 10px;
					}
					
					&.active {
						background-color: var(--admin_active_bg_color);
						color: var(--admin_active_font_color);
						border: none;
					}
				}
			}
			
			.tags-close-btn {
				border-radius: 5px;
				border: 1px solid var(--admin_line_bg_color);
				padding: 4px 8px;
				font-size: 14px;
				cursor: pointer;
				text-align: center;
			}
		}
		
		.ym-main {
			background-color: var(--admin_main_bg_color);
			min-height: calc(100vh - 90px);
			padding: 20px;
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
	
}
</style>