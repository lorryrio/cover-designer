<template>
  <div class="text-wrap" :style="{background: app.background.textBackground, paddingRight: `${app.padding}px`}">
    <div class="flex author" :style="authorStyle">
      <authorIcon :color="app.author.color" />
      <div class="author-text">{{app.author.authorText}} 著</div>
    </div>
    <div class="title">
      <template>
        <div class="line-wrap" v-for="(text, index) in titleSplitTextArray" :key="text + index">
          <div class="line-main flex">
            <div
              class="text-main"
              :style="titleStyle"
              v-for="(c, index) in textSpilt(text)"
              :key="index"
              :data-text="c"
            >{{c}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import authorIcon from "../components/author-icon";
export default {
  name: "vertical_1",
  inject: ["app"],
  components: {
    authorIcon,
  },
  data() {
    return {};
  },
  computed: {
    titleSplitTextArray() {
      const titleSplitRange = Array.from(new Set(this.app.titleSplitRange));
      const arr = [];
      const end = titleSplitRange.length;
      for (let i = 0; i <= end; i++) {
        if (i === 0) {
          const text = this.app.title.titleText.slice(0, titleSplitRange[i]);
          arr.push(text);
        } else if (i === end) {
          const text = this.app.title.titleText.slice(titleSplitRange[end - 1]);
          arr.push(text);
        } else {
          const text = this.app.title.titleText.slice(
            titleSplitRange[i - 1],
            titleSplitRange[i]
          );
          arr.push(text);
        }
      }
      return arr;
    },
    smallTitleStyle() {
      return this.smallTitleStyleUpdate(this.app.title);
    },
    titleStyle() {
      return this.textStyleUpdate(this.app.title);
    },
    authorStyle() {
      return this.textStyleUpdate(this.app.author);
    },
  },
  mounted() {},
  methods: {
    smallTitleStyleUpdate(config) {
      const { font, smallTitleBackground, smallTitleColor } = config;
      let style = {};
      if (smallTitleBackground) {
        style = {
          fontFamily: font,
          background: smallTitleBackground,
          color: smallTitleColor,
        };
      }
      return style;
    },
    textStyleUpdate(config) {
      const {
        font,
        fontSize,
        color,
        color_mask,
        spacing,
        strokeColor,
      } = config;

      let style = {
        fontSize: `${fontSize}px`,
        fontFamily: font,
        "--spacing": `${spacing}px`,
      };

      if (color_mask) {
        style = {
          ...style,
          ...{
            // 向伪元素传值
            "--color": color,
            "--color_mask": color_mask,
          },
        };
      } else {
        style = {
          ...style,
          ...{
            color,
          },
        };
      }

      if (strokeColor) {
        style = {
          ...style,
          ...{
            textStroke: `3px ${strokeColor}`,
          },
        };
      }

      return style;
    },
    textSpilt(text) {
      return text.split("");
    },
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-wrap {
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  .title {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
    .line-main {
      flex-wrap: wrap;
      // align-items: flex-end;
      // justify-content: flex-end;
      flex-direction: column;
      // max-height: 400px;
      .text-main {
        position: relative;
        color: var(--color);
      }
      .text-main + .text-main {
        margin-left: var(--spacing);
      }
      .text-main[data-text]::after {
        content: attr(data-text);
        color: var(--color_mask);
        position: absolute;
        left: 0;
        z-index: 2;
        mask-image: linear-gradient(var(--color), transparent);
      }
    }
  }
  .author {
    width: 20px;
    height: 100%;
    margin-right: 2px;
    flex-direction: column;
    .author-text {
      font-family: "新文宋";
      margin-top: 5px;
    }
  }
}
</style>
