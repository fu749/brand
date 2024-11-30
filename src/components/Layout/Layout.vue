<template>
  <div id="app" class="modern-app">
    <nav class="elegant-nav">
      <div class="nav-container">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link v-if="!username" to="/login" class="nav-link nav-login">登录</router-link>
        <span v-else class="nav-link nav-login" @click="logout">你好！{{ username }}</span>
      </div>
    </nav>
    <router-view class="content-area" @update-username="updateUsername" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null, // 初始化用户名
    };
  },
  mounted() {
    // 页面加载时从 localStorage 中读取用户名
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
    }
  },
  methods: {
    // 更新用户名方法
    updateUsername(newUsername) {
      this.username = newUsername; // 直接更新 username 数据
    },
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMe', 'false');
      this.username = null;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>


.elegant-nav {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
