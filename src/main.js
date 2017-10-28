// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

import vueRouter from 'vue-router';
Vue.use(vueRouter);

import layout from './components/site/layout.vue';
// 导入商品列表组件
import goodslist from './components/site/goodslist.vue';
// 导入商品详情组件
import goodsinfo from './components/site/goodsinfo.vue';
import car from './components/site/car.vue';
import shopping from './components/site/shopping.vue';
import login from './components/site/login.vue';

var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                //    meta:{islogin:true}：表示要进行登录检查,只有登录过的才能进入到shopping组件，否则要进入到登录页面
                { name: 'shopping', path: 'shopping/:ids', component: shopping, meta: { islogin: true } },
                { name: 'login', path: 'login', component: login },
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: 'car', path: 'car', component: car }
            ]
        },
    ]
});
import axios from 'axios';
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
Vue.use(axios);
axios.defaults.withCredentials = true;

//用Vuex来实现购物车数量的改变业务
//  特点：当state的值一旦发生改变，那么通过 this.$store.state.buyCount 地方就会自动发生改变
const state = {
    buyCount: 0
};
//  action (购物车按钮点击的时候触发action,代码： this.$store.dispatch('changeBuyCount'),购买数量)
const actions = {
    changeBuyCount({ commit }, parmsBuyCount) {
        commit('changeBuyCount', parmsBuyCount);
    }
};
// 具体执行的代码
const mutations = {
    changeBuyCount(state, parmsBuyCount) {
        state.buyCount += parmsBuyCount;
    }
};
// 导入封装的去localStorage中取值方法
import { getItem } from './kits/localStorageKit.js'

// 对state中的buyCount进行逻辑封装
const getters = {
    // 因为购物车中的数量是采用自动刷新会有内存，取得是内存中的值，每次刷新都会消失，需要vuex来传递值
    getCount(state) {
        // 先判断内存当中是否存在数量，有的话直接返回
        if (state.buyCount > 0) {
            return state.buyCount
        }
        // 内存中没有数量，再去localStorage中取值，取得是种类
        var goodsObj = getItem();
        var count = 0;
        for (var key in goodsObj) {
            count++;
        };
        state.buyCount = count;
        return state.buyCount;

    }
};
// 自定义vue全局组件use
import vuex from 'vuex';
Vue.use(vuex);
// 实例化一个Store对象
const store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
});

import elementUI from 'element-ui';
Vue.use(elementUI);
import '../statics/site/css/style.css';
Vue.filter('datafmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();
    if (fmtstring == 'YYYY-MM-DD') {
        return y + "-" + m + "-" + d;
    };
    if (fmtstring == 'YYYY-MM-DD HH:MM:SS') {
        return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    };
});
// 利用router 的全局守卫钩子函数进行登录验证
router.beforeEach((to, from, next) => {
    // 判断是否再登陆页面，不在登录页面就保存次页面的路径
    if (to.name != 'login') {
        // 因为是保存的path，path是site
        var togo = to.path.substring(6);
        localStorage.setItem('currentRouteName', togo);
    }
    if (to.meta.islogin) {
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({ name: 'login' });
            }
        })
    } else {
        next();
    }
})


new Vue({
    el: '#app',
    router,
    store,
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});