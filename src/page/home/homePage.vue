<template>
	
	<div id="homePage">
		<!--bg-->
		<div class="home-banner">
			
			<div class="banner-box">
				
				<img src="http://localhost:9999/api/images/other/1886398346918039554/e56db5c1ecfd48408e78e316eee398d8.jpg"
				     alt="背景">
			</div>
			
			<div class="banner-info">
				<h1>
					<span>云猫博客</span>
				</h1>
				<div class="printer">
					<div>
					
					</div>
					<h3><span class="cursor">|</span></h3>
				</div>
				<div id="bannerWave1"></div>
				<div id="bannerWave2"></div>
				<i class="iconfont icon-xiangxia down">
				
				</i>
			</div>
		</div>
	
	
	</div>
</template>

<script setup lang="ts">

</script>


<style lang="less">
#homePage {
	
	.home-banner {
		
		.banner-box {
			animation: 2s ease 0s 1 normal none running header-effect;
			height: 50vh;
			width: 100vw;
			position: fixed;
			z-index: -1;
			
			&:before {
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .2);
				content: "";
			}
			
			img {
				vertical-align: top;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
			
		}
		
		.banner-info {
			height: 50vh;
			display: flex;
			flex-direction: column;
			position: relative;
			user-select: none;
			overflow: hidden;
			justify-content: center;
			align-items: center;
			animation-name: hideToShow;
			
			h1 {
				color: var(--white);
				font-size: 40px;
			}
			
			.printer {
				cursor: pointer;
				color: var(--white);
				background: var(--translucent);
				border-radius: 10px;
				padding-left: 10px;
				padding-right: 10px;
				
				h3{
					display: block;
					font-size: 1.17em;
					margin-block-start: 1em;
					margin-block-end: 1em;
					margin-inline-start: 0px;
					margin-inline-end: 0px;
					font-weight: bold;
					unicode-bidi: isolate;
				}
				
				.cursor {
					margin-left: 1px;
					-webkit-animation: hideToShow .7s infinite;
					animation: hideToShow .7s infinite;
					font-weight: 200;
				}
				
			}
			
			.down {
				font-size: 40px;
				font-weight: 700;
				color: var(--white);
				position: absolute;
				bottom: 60px;
				-webkit-animation: my-shake 1.5s ease-out infinite;
				animation: my-shake 1.5s ease-out infinite;
				z-index: 15;
				cursor: pointer;
			}
			
			#bannerWave1 {
				position: absolute;
				bottom: 0;
				-webkit-animation: gradientBG 120s linear infinite;
				animation: gradientBG 120s linear infinite;
				height: 84px;
				background: var(--bannerWave1);
				width: 200%;
				z-index: 10;
			}
			
			#bannerWave2 {
				height: 100px;
				background: var(--bannerWave2);
				width: 400%;
				z-index: 5;
				position: absolute;
				bottom: 0;
				-webkit-animation: gradientBG 120s linear infinite;
				animation: gradientBG 120s linear infinite;
			}
			
		}
		
		
		@keyframes header-effect {
			0% {
				opacity: 0;
				transform: translateY(-50px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
		
		@keyframes gradientBG {
			0% {
				background-position: 0 50%;
			}
			
			50% {
				background-position: 100% 50%;
			}
			
			100% {
				background-position: 0 50%;
			}
		}
		
		@keyframes hideToShow {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		
		@keyframes my-shake {
			0% {
				opacity: 1;
				transform: translateY(0);
			}
			
			30% {
				opacity: .5;
				transform: translateY(25px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
	
	
}
</style>