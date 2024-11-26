<script src="@/views/js/login.js"></script>
<style src="@/views/css/login.css"></style>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <h1>系统登录</h1>
      </div>
      <el-form
          ref="form"
          :model="form"
          class="login-form"
          label-position="top"
      >
        <el-form-item label="用户名" class="input-item">
          <el-input
              v-model="form.username"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
              clearable
              class="input-field"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="input-item">
          <el-input
              v-model="form.password"
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              show-password
              class="input-field"
          ></el-input>
        </el-form-item>

        <!-- 记住我和自动登录复选框放在同一行 -->
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="form.rememberMe" class="remember-me">记住我</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="form.autoLogin" class="auto-login">自动登录</el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 验证码输入 -->
        <el-form-item class="input-item">
          <el-row gutter={20}>
            <el-col :span="10">
              <el-input
                  v-model="form.captcha"
                  placeholder="请输入验证码"
                  class="input-field"
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

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
              type="primary"
              @click="login"
              class="login-button"
              round
              style="width: 100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
