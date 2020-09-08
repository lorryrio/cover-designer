<template>
  <div class="cover-select">
    <div class="refresh" @click="getRandom4Config">换一换</div>
    <div class="cover-list">
      <div
        class="cover"
        @click="onCoverSelect(cover)"
        v-for="cover in showCoverList"
        :key="cover.coverId"
      >
        <img :src="`${cover.background.backgroundImage}?x-oss-process=image/resize,w_140`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cover-select',
  inject: ['app'],
  data() {
    return {
      showCoverList: [],
    };
  },
  mounted() {
    this.getRandom4Config();
  },
  methods: {
    // 随机取 4 个封面配置
    getRandom4Config() {
      // 测试用，获取当前类目全部配置
      // this.showCoverList = this.app.configList;

      this.showCoverList = this.getRandomArrayElements(this.app.configList, 4);
      this.onCoverSelect(this.showCoverList[0]);
    },
    getRandomArrayElements(arr, count) {
      if (arr.length < count) {
        return arr;
      }
      const shuffled = arr.slice(0);
      let i = arr.length;
      const min = i - count;
      let temp;
      let index;
      i -= 1;
      while (i > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    onCoverSelect(config) {
      const thisConfig = this.beforeConfigChange(config);
      this.app.padding = thisConfig.padding;
      this.app.template = thisConfig.template;
      this.app.title = thisConfig.title;
      this.app.author = thisConfig.author;
      this.app.background = thisConfig.background;
    },
    beforeConfigChange(config) {
      const thisConfig = config;
      // 切换配置前，先缓存书名和作者，避免信息丢失
      thisConfig.title.titleText = this.app.title.titleText;
      thisConfig.author.authorText = this.app.author.authorText;
      return thisConfig;
    },
  },
};
</script>

<style scoped lang="scss">
.cover-select {
  user-select: none;
  .refresh {
    cursor: pointer;
    text-align: right;
    margin: 10px 0;
    color: #409eff;
    font-size: 13px;
  }
  .cover-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cover {
      cursor: pointer;
      flex-shrink: 0;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 70px;
      }
    }
  }
}
</style>
