<template>
  <el-form-item class="input-item">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input
            v-model="localCaptcha"
        placeholder="请输入验证码"
        class="input-field"
        @input="updateCaptcha"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <img
            :src="captchaUrl"
            alt="验证码"
            class="captcha-img"
            @click="reloadCaptcha"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
export default {
  props: {
    captchaUrl: {
      type: String,
      required: true,
    },
    captcha: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localCaptcha: this.captcha, // 用本地变量存储验证码输入框的值
    };
  },
  watch: {
    captcha(newVal) {
      // 当父组件的值改变时，同步到本地变量
      this.localCaptcha = newVal;
    },
  },
  methods: {
    updateCaptcha(value) {
      // 通过事件将输入值通知父组件
      this.$emit("update:captcha", value);
    },
    reloadCaptcha() {
      this.$emit("reload-captcha"); // 触发父组件的方法来重新加载验证码
    },
  },
};
</script>

<style scoped>
.captcha-img {
  width: 100%;
  height: 40px;
  cursor: pointer;
}

.input-item {
  margin-bottom: 20px;
}
</style>
