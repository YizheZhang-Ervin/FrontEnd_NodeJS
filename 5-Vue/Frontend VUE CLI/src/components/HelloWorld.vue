<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<!-- 事件监听: 向父组件传消息 -->
		<button @click="sendMsgByListener">Send</button>
		<!-- pubsub: 发消息给同级组件 -->
		<button @click="sendMsgBypubsub">SendByPubsub</button>
		<!-- EventBus: 发消息给同级组件 -->
		<button @click="sendMsgByBus">SendByBus</button>
	</div>
</template>

<script>
import pubsub from "pubsub-js";
const axios = require("axios");
export default {
	name: "HelloWorld",
	props: {
		// props传递:接收父组件消息
		msg: String,
	},
	mounted() {
		//  事件传递: 向父组件传消息
		this.$emit("func", "子组件发送的消息");
	},
	data() {
		return {
			input: "",
		};
	},
	methods: {
		// 事件监听: 向父组件传消息
		sendMsgByListener(){
                this.$emit('func','我是子组件传递的消息2！');
            },
		// pubsub: 发消息给同级组件
		sendMsgBypubsub() {
			pubsub.publishSync("sendMsgBypubsub", "发消息给同级组件");
		},
		// EventBus: 发消息给同级组件
		sendMsgByBus() {
			this.$EventBus.$emit("sendMsgByBus", "这是组件A发送的消息！");
		},
		// http://127.0.0.1:5000/api/值
		get: function() {
			axios.get(`http://127.0.0.1:5000/api/${this.input}`).then(
				(response) => {
					if (response.data.error == "error") {
						console.log("backend error");
					} else {
						console.log(response.data.result);
					}
				},
				(err) => {
					console.log(err.data);
				}
			);
		},
		// http://127.0.0.1:5000/api/?pkg=值
		get2:function(){
			axios.get(`http://127.0.0.1:5000/api/?pkg=${this.input}`).then(
				(response) => {
					if (response.data.error == "error") {
						console.log("backend error");
					} else {
						console.log(response.data.result);
					}
				},
				(err) => {
					console.log(err.data);
				}
			);
		},
		// http://127.0.0.1:5000/api/
    	// 传{"key":"值"}
		post: function() {
			axios
				.post(`http://127.0.0.1:5000/api/`, {
					key: JSON.stringify(this.input),
				})
				.then(
					(response) => {
						if (response.data.error == "error") {
							console.log("backend error");
						} else {
							console.log(response.data.result);
						}
					},
					function(err) {
						console.log(err.data);
					}
				);
		},
		// http://127.0.0.1:5000/api/值
		// 传{"key":"值"}
		post2: function() {
			axios
				.post(`http://127.0.0.1:5000/api/${this.input}`, {
					key: JSON.stringify(this.input),
				})
				.then(
					(response) => {
						if (response.data.error == "error") {
							console.log("backend error");
						} else {
							console.log(response.data.result);
						}
					},
					function(err) {
						console.log(err.data);
					}
				);
		},
	},
};
</script>

<style scoped></style>
