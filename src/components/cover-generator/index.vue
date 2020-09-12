<template>
  <div class="cover-generator">
    <!-- 封面设计器主体 -->
    <designer v-if="title.titleText" />
    <!-- 用户操作区 -->
    <div class="setting-wrap">
      <keep-alive>
        <!-- 操作 - 1 - 选择封面 -->
        <coverSelect v-if="step === 1 && configList.length" />
        <!-- 操作 - 2 - 设置标题布局 -->
        <textSplit v-model="titleSplitRange" v-if="step === 2" />
        <!-- 操作 - 3 - 其他设置 滤镜 & 字体 & so on -->
        <otherSetting v-if="step === 3" />
      </keep-alive>
      <!-- step button -->
      <div class="button-wrap">
        <el-button type="primary" @click="next">{{step === 3 ? "完成" : "下一步"}}</el-button>
        <el-button plain @click="back" v-if="step !== 1 || options.showFirstStepBackBtn">返回上一步</el-button>
      </div>
    </div>

    <!-- 仅调供试使用 上线前删掉 -->
    <!-- <el-button style="margin-top: 20px" @click="show">测试</el-button>
    <el-dialog title="书封预览" :visible.sync="preview" :center="true">
      <img style="width:300px;height:400px;margin: 0 auto;display: block;" :src="previewUrl" alt />
    </el-dialog>-->
    <!-- 上线前删掉 -->
  </div>
</template>

<script>
import axios from 'axios';
import { Loading } from 'element-ui';
import { config, baseUrl } from './config';

import designer from './designer.vue';
import coverSelect from './components/cover-select.vue';
import textSplit from './components/text-split.vue';
import otherSetting from './components/other-setting.vue';

let dom2image = null;
let saveAs = null;
// 字体缓存
const fontCache = [];

export default {
  name: 'cover-generator',
  components: {
    designer,
    coverSelect,
    textSplit,
    otherSetting,
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        categoryId: '13',
        title: '大叔乖乖宠我',
        author: '由纪昕昕子',
        showFirstStepBackBtn: false,
        type: 'download',
      }),
    },
  },
  provide() {
    return {
      app: this,
    };
  },
  data() {
    return {
      step: 1, // 1 封面 2 书名布局
      preview: false,
      previewUrl: '',
      // 设计器相关配置 文案&字体&图片等
      configList: [], // 获取当前二级分类下的全部配置
      filter: 'origin', // 滤镜
      template: '', // 模版名称，映射到具体组件异步渲染
      padding: '', // 文案距离书封边缘的边距
      titleSplitRange: [3, 6], // 标题断句
      titleStyleList: [false, true, true], // 设置每个断句的样式 1 主标题 2 副标题
      // title & author & background 模版的配置 数据在选封面时通过配置注入
      // 配置详见 config.js
      title: {
        // titleText: "",
        // color: "#ff4242",
        // color_mask: "rgba(255, 66, 66, 0.7)",
        // font: "布丁体",
        // fontSize: "85",
        // strokeColor: "rgb(255, 255, 255)",
        // spacing: -15,
      },
      author: {
        // authorText: "",
        // fontSize: "18",
        // color: "#fff",
      },
      background: {
        // backgroundImage: "",
        // textBackground: "",
      },
    };
  },
  mounted() {
    // this.initFilter();
    this.init();
    this.updateFont(this.title.titleText, this.title.font);
    this.updateFont(`${this.author.authorText}著`, '新文宋');
  },
  watch: {
    'title.font': {
      handler(font) {
        this.updateFont(this.title.titleText, font);
      },
      immediate: false,
    },
    template() {
      this.magic();
    },
  },
  methods: {
    init() {
      const { options } = this;
      this.configList = config.find(
        (c) => c.categoryId === options.categoryId,
      ).coverList;
      this.title.titleText = this.options.title;
      this.author.authorText = this.options.author;
      this.magic();
    },
    // 施一点魔法 😁
    // 根据某些参数 “智能” 调整一下标题换行位置，待调试
    magic() {
      if (this.title.titleText.length === 6) {
        this.titleSplitRange = [2, 6];
        this.titleStyleList = [false, true, true];
      }
      if (this.title.titleText.length === 7) {
        this.titleSplitRange = [3, 7];
        this.titleStyleList = [true, true, true];
      }
      if (this.title.titleText.length > 7) {
        this.titleSplitRange = [3, 6];
        this.titleStyleList = [false, true, true];
      }
      // 垂直布局只展示大标题
      if (/vertical/.test(this.template)) {
        this.titleSplitRange = [4, this.title.titleText.length];
        this.titleStyleList = [true, true, true];
      }
    },
    // initFilter() {
    //   const link = document.createElement('link');
    //   link.href = 'https://raw.githubusercontent.com/lorryrio/godblesslorry.github.io.images/master/images/cssgram.min.css';
    //   link.rel = 'stylesheet';
    //   document.head.appendChild(link);
    // },
    async show() {
      this.loading = true;
      const dataUrl = await this.exportBase64();
      this.previewUrl = dataUrl;
      this.loading = false;
      this.preview = true;
    },
    // 输出 base64
    async exportBase64() {
      const loadingInstance = Loading.service();
      dom2image = dom2image
        || (await import(/* webpackChunkName: "dom2image" */ 'dom-to-image'));
      const dataUrl = await dom2image.toPng(
        document.querySelector('#designer-wrap'),
      ); // base64
      loadingInstance.close();
      return dataUrl;
    },
    // 输出 blob
    async exportBlob() {
      const loadingInstance = Loading.service();
      dom2image = dom2image
        || (await import(/* webpackChunkName: "dom2image" */ 'dom-to-image'));
      const blob = await dom2image.toBlob(
        document.querySelector('#designer-wrap'),
      ); // blob
      loadingInstance.close();
      return blob;
    },
    async download() {
      const loadingInstance = Loading.service();
      saveAs = saveAs
        || (await import(/* webpackChunkName: "save-as" */ 'file-saver'));
      const blob = await this.exportBlob();
      saveAs.saveAs(blob, `${this.options.title}.png`);
      loadingInstance.close();
    },
    // 字体压缩服务
    async updateFont(text, font) {
      if (!text || !font) {
        console.info('文案或字体为空');
        return;
      }

      // 记录已压缩过的字体，避免频繁请求
      const cacheKey = `${text}-${font}`;
      if (fontCache.includes(cacheKey)) {
        console.info('字体存在，走本地缓存');
        return;
      }

      const query = {
        fontName: font,
        text,
      };
      try {
        const res = await axios.post(`${baseUrl}/fontmin/compress`, query);
        if (res.data.data.code === 0) {
          this.createFontStyle(res.data.data.data);
          fontCache.push(cacheKey);
        }
      } catch (err) {
        console.error('字体压缩服务异常！');
      }
    },
    createFontStyle(fontFace) {
      const style = document.createElement('style');
      style.innerHTML = fontFace;
      document.head.appendChild(style);
    },
    async next() {
      if (this.step === 3) {
        let pic = null;
        if (this.options.type === 'base64') {
          pic = await this.exportBase64();
        } else if (this.options.type === 'blob') {
          pic = await this.exportBlob();
        } else {
          await this.download();
          return;
        }
        this.$emit('finish', pic);
        return;
      }
      this.step += 1;
    },
    back() {
      // 第一步还回退时，退出书封生成器
      if (this.step === 1) {
        this.$emit('quit');
        return;
      }
      this.step -= 1;
    },
  },
};
</script>
<style lang="scss">
@import "./cssgram.min.css";
</style>
<style scoped lang="scss">
.cover-generator {
  width: 300px;
  .setting-wrap {
    width: 300px;
    .button-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      button {
        width: 100%;
        margin: 0;
        margin-top: 10px;
      }
    }
  }
}
</style>
