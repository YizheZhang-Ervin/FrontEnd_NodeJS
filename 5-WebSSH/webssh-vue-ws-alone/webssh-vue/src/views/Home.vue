<template>
  <section class="flex">
    <WebShell></WebShell>
    <WebShell></WebShell>
    <WebShell></WebShell>
    <WebShell></WebShell>
  </section>
</template>

<script>
import WebShell from '@/views/WebShell.vue'
export default {
  components: {
    WebShell
  }
}
</script>

<style scoped>
.flex {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 100vw;
}

#xterm {
  height: 50vh;
}
</style>