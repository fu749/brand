<template>
  <div class="modern-app">
    <nav class="elegant-nav">
      <div class="nav-container">
        <router-link to="/index" class="nav-link">首页</router-link>

        <!-- 如果用户名存在，则显示用户名，反之显示登录按钮 -->
        <router-link v-if="!username" to="/login" class="nav-link nav-login">登录</router-link>
        <span v-else class="nav-link nav-login" @click="logout">你好！{{ username }}</span>
      </div>
    </nav>
    <router-view class="content-area"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,  // 存储用户名
    };
  },
  mounted() {
    // 检查 localStorage 是否有保存的用户名
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;  // 设置用户名
    }
  },
  methods: {
    // 登出方法
    logout() {
      // 清除 localStorage 中的用户名和密码
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMe', 'false');  // 记住我状态改为false

      // 重置用户名状态
      this.username = null;

      // 跳转到登录页或者首页
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.modern-app {
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f6f9;
  min-height: 100vh;
}

.elegant-nav {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.nav-container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #4a90e2;
}

.nav-divider {
  color: #d3d3d3;
  margin: 0 10px;
}

.nav-login {
  margin-left: auto; /* 将Login推到右侧 */
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: #4a90e2;
  transition: all 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
  left: 0;
}

.content-area {
  padding: 20px;
}

.router-link-exact-active {
  color: #4a90e2;
}
</style>
