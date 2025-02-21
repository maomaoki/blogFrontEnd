<template>
	
	<div id="homeLayoutPage">
		
		<!--导航-->
		<nav id="nav">
		
		</nav>
		
		<!--路由-->
		<div id="main">
			<router-view />
		</div>
		
		<!--底部-->
		<footer id="footer">
		
		</footer>
	
	
	</div>

</template>
<script setup lang="ts">

</script>

<style lang="less">
#homeLayoutPage {

	#nav{
		padding: 0 calc((100% - 1400px + 3rem) / 2);
		width: 100%;
		height: 60px;
		transition: .3s;
		position: fixed;
		top: 0;
		z-index: 90;
		background: red;
	}

	
	#footer{
		position: relative;
		background: linear-gradient(180deg, var(--home-card-bg-none) 0, var(--home-card-bg-color) 25%) scroll bottom;
		background-size: cover;
	}
}
</style>