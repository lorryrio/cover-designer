<template>
  <div id="app">
    <CoverGenerator/>
  </div>
</template>

<script>
import CoverGenerator from './components/cover-generator/index.vue';

export default {
  name: 'App',
  components: {
    CoverGenerator,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
