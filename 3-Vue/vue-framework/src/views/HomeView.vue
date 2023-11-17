<template>
  <section>
    <h1>Parent Component===========================</h1>
    <a-image :src="logo"></a-image>
    <div>Parent: Message From Sub {{ subMessage }}</div>
    <br />
    <h1>Sub Component===========================</h1>
    <!-- toSub给子组件传值 -->
    <!-- fromSub从子组件取值 -->
    <SubComponent :toSub="message" @fromSub="receiveSub" />
  </section>
</template>

<script>
import logo from '@/assets/logo.svg'
import SubComponent from '../components/SubComponent.vue'

export default {
  data() {
    return {
      logo: logo,
      message: 'Hello Sub',
      subMessage: undefined
    }
  },
  components: {
    SubComponent
  },
  methods: {
    receiveSub(msg) {
      this.subMessage = msg
    }
  },
  mounted() {}
}
</script>

<style scoped>
</style>