<template>
  <div class="author-icon" :style="{'border': `1px solid ${color}`}">
    <div class="icon-small" :style="{'border': `1px solid ${color}`}"></div>
  </div>
</template>

<script>
export default {
  name: 'author-icon',
  props: {
    color: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style scoped lang="scss">
.author-icon {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-small {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
}
</style>
