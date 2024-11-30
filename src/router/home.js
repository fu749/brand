// src/router/routes.js
import home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,

    },
    {
        path: '/Login',
        name: 'Login',
        component: Login

    }
];
export default routes;
