<template>
	
	<div id="adminHomePage">
		<!--    一些 整体信息  -->
		<div class="header_info">
			
			<div class="title">
				早安，{{ headerInfoData.userNickName }}，请开始一天的工作吧
			</div>
			
			<div class="weather">
				{{ headerInfoData.weatherInfo }}
			</div>
			
			<div class="status">
				<div>
					<LineChartOutlined/>
					在线流量: {{ systemInfo.onlineCount }}
				</div>
				<div>
					<UserOutlined/>
					用户总数: {{ systemInfo.userCount }}
				</div>
				<div>
					<ReadOutlined/>
					文章总数: {{ systemInfo.articleCount }}
				</div>
				<div>
					<WechatOutlined/>
					群聊信息: {{ systemInfo.chatCount }}
				</div>
				<div>
					<ApiOutlined/>
					今日登录: {{ systemInfo.todayLoginCount }}
				</div>
			
			
			</div>
			
			<div class="videoLink">
				<div>
					前端教程：
					<a :href="linkInfoData.frontEnd" target="_blank">
						{{ linkInfoData.frontEnd }}
					</a>
				</div>
				<div>
					后端教程：
					<a :href="linkInfoData.backEnd" target="_blank">
						{{ linkInfoData.backEnd }}
					</a>
				</div>
			</div>
		</div>
		
		
		<div class="content">
			
			<div class="left">
				
				<!-- 快捷入口-->
				<div class="quick_box card">
					
					<div class="head">
						快捷入口
					</div>
					
					<div class="body">
						<div class="item">
							
							<div class="icon">
								<UserOutlined/>
							</div>
							<div class="text">
								个人中心
							</div>
						</div>
					</div>
				
				</div>
				
				
				<!-- 数据统计-->
				<div class="statistics card">
					
					<div class="head ">
						数据统计
					</div>
					<div class="body">
						<!-- 数据统计图-->
					
					
					</div>
				</div>
			
			</div>
			<div class="right">
				
				
				<!-- 更新说明 -->
				<div class="update card">
					
					<div class="head">
						更新说明
					</div>
					<div class="body">
						
						<div class="item" v-for="(item,index) in updateData">
							<div class="title">
								<span>{{ index + 1 + '.' }}</span>
								<div>
									<span>{{ item.title }}</span>
								</div>
								<span>{{ item.time }}</span>
							</div>
							
							<ul v-if="item.list">
								<li v-for="item2 in item.list">
									{{ item2.text }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	LineChartOutlined,
	UserOutlined, ReadOutlined,
	WechatOutlined,
	ApiOutlined
} from "@ant-design/icons-vue"
import {onMounted, ref} from "vue";
import {getSystemInfoUsingGet} from "@/api/systemController.ts";
import {message} from "ant-design-vue";

const systemInfo = ref<API.SystemInfoVo>({})

/**
 * 挂载 渲染 数据
 */
onMounted(async () => {
	
	const result = await getSystemInfoUsingGet();
	if (result.data.code != 0) {
		message.error("系统信息获取失败")
		return;
	}
	// @ts-ignore
	systemInfo.value = result.data.data
})


/**
 *   天气 和 登录 用户 名称
 * */
const headerInfoData = {
	userNickName: "云猫",
	weatherInfo: "广东 · 茂名市 今日 多云，31℃，天气较热，多在阴凉出休息",
}


/**
 *  link
 * */
const linkInfoData = {
	frontEnd: "https://www.4399.com",
	backEnd: "https://www.4399.com",
}

/**
 *  展示 的 更新记录
 * */
const updateData = [
	{
		title: "八代博客重磅更新，日志功能优化，群聊功能大更新adasdasdasdasdasd",
		list: [
			{
				id: 1,
				text: "技术栈：gin vue3 TypeScript ArcoDesign"
			},
			{
				id: 2,
				text: "经过原型设计，ui设计的全新博客系统"
			},
			{
				id: 3,
				text: "丰富可玩的配置项功能"
			},
			{
				id: 4,
				text: "丰富可玩的配置项功能"
			},
			{
				id: 5,
				text: "丰富可玩的配置项功能"
			},
			{
				id: 6,
				text: "丰富可玩的配置项功能"
			}
		],
		time: "9个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		list: [
			{
				id: 1,
				text: "技术栈：gin vue3 TypeScript ArcoDesign"
			},
			{
				id: 2,
				text: "经过原型设计，ui设计的全新博客系统"
			}
		],
		time: "9 个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		list: [
			{
				id: 1,
				text: "技术栈：gin vue3 TypeScript ArcoDesign"
			},
			{
				id: 2,
				text: "经过原型设计，ui设计的全新博客系统"
			}
		],
		time: "9 个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		time: "9 个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		time: "9 个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		list: [
			{
				id: 1,
				text: "技术栈：gin vue3 TypeScript ArcoDesign"
			},
			{
				id: 2,
				text: "经过原型设计，ui设计的全新博客系统"
			}
		],
		time: "9 个月前"
	},
	{
		title: "七代博客教程发布，在go圈里比较火的博客教程",
		list: [
			{
				id: 1,
				text: "技术栈：gin vue3 TypeScript ArcoDesign"
			},
			{
				id: 2,
				text: "经过原型设计，ui设计的全新博客系统"
			}
		],
		time: "9 个月前"
	},

]
</script>


<style lang="less">
#adminHomePage {
	.header_info {
		
		width: 100%;
		background-image: url("/src/assets/images/bg/电脑场景.png");
		background-repeat: no-repeat;
		background-position: right;
		background-size: 500px;
		background-color: var(--admin_content_bg_color);
		padding: 20px;
		border-radius: 5px;
		
		.title {
			font-size: 22px;
			margin-top: 10px;
			font-weight: 400;
		}
		
		.weather {
			margin: 20px 0 10px;
			color: var(--admin_home_li_font_color);
		}
		
		.status {
			margin: 20px 0 10px;
			font-size: 16px;
			display: flex;
			align-items: center;
			color: var(--admin_span_color);
			
			div {
				margin-right: 20px;
				display: flex;
				align-items: center;
				
				svg {
					width: 14px;
					margin-right: 5px;
				}
			}
		}
		
		.videoLink {
			margin: 30px 0 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: var(--admin_home_li_font_color);
			
			div {
				margin-bottom: 20px;
				
				a {
					color: #0D68DF;
					cursor: pointer;
					text-decoration: none;
				}
			}
		}
	}
	
	
	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		
		.card {
			background-color: var(--admin_content_bg_color);
			border-radius: 5px;
			
			.head {
				width: 100%;
				height: 60px;
				display: flex;
				align-items: center;
				padding: 20px;
				border-bottom: 1px solid var(--admin_line_bg_color);
				justify-content: space-between;
				font-size: 18px;
				font-weight: 600;
			}
			
			.body {
				padding: 20px;
			}
		}
		
		.left {
			width: 70%;
			
			
			.quick_box {
				margin-bottom: 20px;
				
				
				.body {
					display: flex;
					
					.item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-right: 50px;
						align-items: center;
						
						
						&:nth-last-child(1) {
							margin-right: 0;
						}
						
						.icon {
							background-color: var(--admin_main_bg_color);
							border-radius: 10px;
							width: 60px;
							height: 60px;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24px;
							transition: all .3s;
							cursor: pointer;
							
							&:hover {
								transform: scale(1.05)
							}
							
							svg {
								width: 24px;
							}
						}
						
						.text {
							margin-top: 8px;
						}
						
					}
				}
			}
			
			.statistics {
				
				.body {
				
				}
			}
		}
		
		.right {
			width: calc(30% - 20px);
			
			.update {
				
				.item {
					margin-bottom: 15px;
					
					.title {
						display: flex;
						align-items: center;
						
						span {
							font-size: 14px;
							display: flex;
							align-items: center;
							white-space: nowrap;
							
							&:nth-child(1) {
								margin-right: 10px;
							}
							
						}
						
						div {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							line-height: 1.5715;
							white-space: normal;
							overflow-wrap: anywhere;
							
							span {
								display: inline;
								white-space: normal;
							}
						}
					}
					
					ul {
						margin: 5px 0;
						padding-left: 40px;
						line-height: 1.5rem;
						
						li {
							margin-bottom: 5px;
							color: var(--admin_span_color);
						}
					}
				}
			}
		}
	}
}
</style>