import Vue from "vue";
import Router from "vue-router";
const Home = () => import('../pages/home');

Vue.use(Router);

export default new Router({
    linkActiveClass: "active",
    routes: [
        {
            path: '/',
            component: Home,
        }
    ]
});