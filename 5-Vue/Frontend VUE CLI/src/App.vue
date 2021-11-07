<template>
	<div id="app">
		<!-- props传递: 父组件向子组件传数据 -->
		<HelloWorld msg="message here" />
		<!-- 事件传递: 子组件向父组件传值 -->
		<HelloWorld @func="sendMsg"/>
		<!-- 事件监听: 接受子组件消息 -->
		<HelloWorld ref="sonRef" />
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		HelloWorld,
	},
	mounted() {
		// 事件监听: 接收子组件消息
		this.$refs["sonRef"].$on("func", (msg) => {
			console.log(msg);
		});
	},
	methods: {
		sendMsg(msg) {
			// 事件传递: 接收子组件消息
			console.log(msg);
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
