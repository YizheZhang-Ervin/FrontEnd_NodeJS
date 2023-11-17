<template>
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { theme } from 'ant-design-vue'
</script>

<style scoped>
</style>
