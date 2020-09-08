<template>
  <div class="text-split-wrap">
    <div class="tip">拖动滑竿设置断句，点击按钮切换该断句样式</div>
    <div class="text-split">
      <div class="flex words-list">
        <div class="item" v-for="(c, index) in app.title.titleText" :key="index">{{c}}</div>
      </div>
      <el-slider
        class="text-split-slider"
        v-model="range"
        @change="onChange"
        range
        :max="app.title.titleText.length"
      ></el-slider>
    </div>
    <div class="type-select-list" v-if="showTypeSelect">
      <div
        class="type-select flex"
        :style="{left: calcPostiton(r)}"
        v-for="(r, index) in rangeUnique"
        :key="index"
        @click="titleStyleListUpdate(index)"
      >
        <div class="type" :class="{'high-light': app.titleStyleList[index]}">主</div>
        <div class="type" :class="{'high-light': app.titleStyleList[index] === false}">副</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text-split',
  inject: ['app'],
  props: ['value'],
  data() {
    return {
      range: [],
    };
  },
  mounted() {
    this.range = this.value;
  },
  computed: {
    splitIndexs() {
      return [this.leftIndex, this.rightIndex];
    },
    rangeUnique() {
      const range = JSON.parse(JSON.stringify(this.range));
      const lastIndex = this.app.title.titleText.length;
      const notNeed = range.indexOf(lastIndex);
      if (notNeed > -1) {
        range.splice(notNeed, 1);
      }
      return [0, ...Array.from(new Set(range))];
    },
    showTypeSelect() {
      return !/vertical/.test(this.app.template);
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', e);
      this.range = e;
    },
    calcPostiton(v) {
      return `${(100 * v) / this.app.title.titleText.length}%`;
    },
    titleStyleListUpdate(index) {
      this.$set(
        this.app.titleStyleList,
        index,
        !this.app.titleStyleList[index],
      );
    },
  },
};
</script>

<style lang="scss">
.text-split-wrap {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  .flex {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .tip {
    font-size: 13px;
    color: #969bac;
    text-align: center;
    padding: 10px 0;
  }
  .text-split {
    width: 100%;
    border: 1px solid #5d9bff;
    padding: 3px;
    box-sizing: border-box;
    user-select: none;
    position: relative;
    .words-list {
      width: 100%;
      margin: 0 auto;
      justify-content: space-between;
    }
    .text-split-slider {
      width: 100%;
      position: absolute;
      left: 0;
      top: -8px;
      .el-slider__button-wrapper {
        // width: 2px;
        .el-slider__button {
          width: 2px;
          height: 20px;
          border: none;
          background: red;
          animation: breathe 2s infinite;
          @keyframes breathe {
            from {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
            to {
              opacity: 1;
            }
          }
        }
      }
      .el-slider__runway {
        background: transparent;
        .el-slider__bar {
          background: transparent;
        }
      }
    }
  }
  .type-select-list {
    user-select: none;
    height: 20px;
    position: relative;
    .type-select {
      font-size: 13px;
      width: fit-content;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      position: absolute;
      cursor: pointer;
      .type {
        padding: 2px;
        &.high-light {
          background: #dfe9ff;
          color: #409eff;
        }
      }
    }
  }
}
</style>
