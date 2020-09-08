<template>
  <div id="designer-wrap">
    <div
      class="background"
      :class="app.filter"
      :style="{backgroundImage: `url(${app.background.backgroundImage})`}"
    >
      <component v-bind:is="app.template || 'horizen_1'"></component>
    </div>
  </div>
</template>

<script>
import horizen_1 from './template/horizen_1.vue';
import vertical_1 from './template/vertical_1.vue';
import vertical_2 from './template/vertical_2.vue';

export default {
  name: 'designer',
  inject: ['app'],
  components: {
    horizen_1,
    vertical_1,
    vertical_2,
  },
};
</script>

<style scoped lang="scss">
#designer-wrap {
  width: 300px;
  height: 400px;
  user-select: none;
  .background {
    width: 300px;
    height: 400px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
