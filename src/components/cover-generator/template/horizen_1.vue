<template>
  <div class="text-wrap" :style="{background: app.background.textBackground}">
    <div class="title">
      <template>
        <div class="line-wrap" v-for="(text, index) in titleSplitTextArray" :key="text + index">
          <template v-if="!app.titleStyleList[index]">
            <div class="line-small flex">
              <div
                class="text-small flex"
                :style="smallTitleStyle"
                v-for="(c, index) in textSpilt(text)"
                :data-text="c"
                :key="index"
              >{{c}}</div>
            </div>
          </template>
          <template v-else>
            <div class="line-main flex">
              <div
                class="text-main"
                :style="titleStyle"
                v-for="(c, index) in textSpilt(text)"
                :key="index"
                :data-text="c"
              >{{c}}</div>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="author flex" :style="{...authorStyle, ...{marginBottom: `${app.padding}px`}}">
      <authorIcon :color="app.author.color" />
      <div class="author-text">{{app.author.authorText}} 著</div>
    </div>
  </div>
</template>

<script>
import authorIcon from "../components/author-icon";
export default {
  name: "horizen_1",
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
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
    .line-wrap {
      width: 100%;
      .line-small {
        .text-small {
          color: #fff;
          box-shadow: 0px 1px 8px 0px #fff;
          font-size: 21px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .line-main {
        width: 100%;
        flex-wrap: wrap;
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
  }
  .parallelogram {
    padding: 1px 10px 3px;
    -webkit-transform: skew(10deg);
    -moz-transform: skew(10deg);
    -o-transform: skew(10deg);
    background: linear-gradient(
      360deg,
      rgba(54, 112, 42, 1) 0%,
      rgba(152, 170, 90, 1) 100%
    );
    color: #fff;
    font-size: 20px;
    font-family: "布丁体";
  }
  .author {
    width: 100%;
    // margin-bottom: 20px;
    .author-text {
      margin-left: 10px;
      font-family: "新文宋";
    }
  }
}
</style>
