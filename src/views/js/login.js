export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                rememberMe: false,
                autoLogin: false, // 自动登录
                captcha: '', // 验证码输入字段
            },
            captchaUrl: 'http://localhost:8082/webShop/CodeServlet', // 后端生成验证码的接口
        };
    },
    mounted() {
        // 检查是否记住用户名并加载保存的用户名和密码
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const rememberMe = localStorage.getItem('rememberMe') === 'true'; // 获取记住我状态
        const autoLogin = localStorage.getItem('autoLogin') === 'true'; // 获取自动登录状态

        if (rememberMe && savedUsername && savedPassword) {
            this.form.username = savedUsername;
            this.form.password = savedPassword;
            this.form.rememberMe = true;
            if (autoLogin) {
                this.form.autoLogin = true;
                this.login(); // 自动触发登录
            }
        }
    },
    methods: {
        // 重新加载验证码
        reloadCaptcha() {
            this.captchaUrl = `http://localhost:8082/webShop/CodeServlet?${new Date().getTime()}`; // 防止缓存
        },
        async login() {
            try {
                const formData = new URLSearchParams();
                formData.append('username', this.form.username);
                formData.append('password', this.form.password);
                formData.append('captcha', this.form.captcha); // 提交验证码

                const response = await this.$http.post('http://localhost:8082/webShop/LoginServlet', formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                });

                console.log('登录结果:', response.data);

                const success = response.data.success;
                const message = response.data.message;

                if (success) {
                    console.log("登录成功:", message);

                    // 如果记住我选项被勾选，则保存用户名和密码
                    if (this.form.rememberMe) {
                        localStorage.setItem('username', this.form.username);
                        localStorage.setItem('password', this.form.password);
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        // 如果没有勾选记住我，则删除存储的用户名和密码
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                        localStorage.setItem('rememberMe', 'false');
                    }

                    // 如果自动登录被勾选，则保存自动登录状态
                    if (this.form.autoLogin) {
                        localStorage.setItem('autoLogin', 'true');
                    } else {
                        localStorage.removeItem('autoLogin');
                    }

                    //跳转到主页
                    this.$emit('update-username', this.form.username); // 通过事件更新父组件的 username
                    this.$router.push('/');

                } else {
                    console.log("登录失败:", message);
                    // 如果验证码错误，重新加载验证码
                    this.reloadCaptcha();
                }
            } catch (error) {
                if (error.response) {
                    console.error('登录失败:', error.response.data);
                } else if (error.request) {
                    console.error('请求发送失败:', error.request);
                } else {
                    console.error('其他错误:', error.message);
                }
            }
        },
    },
};
