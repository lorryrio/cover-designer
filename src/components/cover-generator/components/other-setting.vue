<template>
  <div class="other-setting">
    <!-- 滤镜 -->
    <div class="filter item" @click="filterChange">
      <i class="icon"></i>
      <span class="name">封面滤镜</span>
      <div class="index">{{filterIndex + 1}} / {{filter.length}}</div>
    </div>
    <!-- 字体 -->
    <div class="font item" @click="fontChange" v-if="font.length > 1">
      <i class="icon"></i>
      <span class="name">书名字体</span>
      <div class="index">{{fontIndex + 1}} / {{font.length}}</div>
    </div>
  </div>
</template>

<script>
import { filter } from '../config';

export default {
  name: 'other-setting',
  inject: ['app'],
  data() {
    return {
      filterIndex: 0,
      filter,
      fontIndex: 0,
      font: [],
    };
  },
  mounted() {
    this.getFont();
  },
  methods: {
    // 轮流切换滤镜
    filterChange() {
      this.filterIndex = (this.filterIndex + 1) % this.filter.length;
      this.app.filter = this.filter[this.filterIndex];
    },
    getFont() {
      this.font = Array.from(
        new Set(this.app.configList.map((config) => config.title.font)),
      );
      this.fontIndex = this.font.indexOf(this.app.title.font);
    },
    // 轮流切换字体
    fontChange() {
      this.fontIndex = (this.fontIndex + 1) % this.font.length;
      this.app.title.font = this.font[this.fontIndex];
    },
  },
};
</script>

<style scoped lang="scss">
.other-setting {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  color: #8a8a8a;
  padding-top: 10px;
  cursor: pointer;
  user-select: none;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      width: 25px;
      height: 25px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .index {
      margin-top: 5px;
    }
    .name {
      // font-size: 10px;
      margin-top: 5px;
    }
  }
  .item + .item {
    margin-left: 20px;
  }
  .filter {
    .icon {
      background-image: url("https://raw.githubusercontent.com/lorryrio/godblesslorry.github.io.images/master/images/filter.png");
    }
  }
  .font {
    .icon {
      background-image: url("https://raw.githubusercontent.com/lorryrio/godblesslorry.github.io.images/master/images/font.png");
    }
  }
}
</style>
