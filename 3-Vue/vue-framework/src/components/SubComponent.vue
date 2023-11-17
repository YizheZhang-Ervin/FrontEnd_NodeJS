<template>
  <div>
    <section>Sub: Message From Parent: {{ toSub }}</section>
    <button @click="passParent">传给父组件</button>
  </div>
</template>
    
<script>
export default {
  props: {
    toSub: String
  },
  data() {
    return {
      message: 'pass to parent'
    }
  },
  components: {},
  methods: {
    passParent() {
      this.$emit('fromSub', this.message)
    }
  },
  mounted() {}
}
</script>
    
<style>
</style>