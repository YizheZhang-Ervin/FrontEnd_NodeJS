import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue'
Vue.use(VueRouter)

// 修正redundant navigation
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //如果成功 调用原来的push方法  
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router