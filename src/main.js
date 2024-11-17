import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
// 引入element-ui全部css
import 'element-ui/lib/theme-chalk/index.css';

// 关闭Vue的生产提示
Vue.config.productionTip = false;

// 使用element
Vue.use(ElementUI);

// 创建Vue实例并挂载
new Vue({
  el: '#app',
  router, // 使用 router
  render: h => h(App)
}).$mount('#app');
