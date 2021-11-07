<template> </template>

<script>
import pubsub from "pubsub-js";
export default {
	name: "HelloEarth",
	data() {
		return {};
	},
	mounted() {
		// pubsub: 接收同级组件消息
		// publishSync同步发送消息
		// publish同步发送消息
		// subscribe订阅消息
		// unsubscribe卸载特定订阅
		// clearAllSubscriptions清除所有订阅
		pubsub.subscribe("sendMsgBypubsub", (e, msg) => {
			console.log(e, msg); //sendMsg 这是A组件发布的消息！
		});
		// eventbus: 接收同级组件消息
		this.$EventBus.$on("sendMsgByBus", (msg) => {
			console.log(msg); //这是组件A发送的消息！
		});
	},
	methods: {},
};
</script>

<style scoped></style>
