<template>
    <div class="tmpl">
        <!-- 1.0 页面头，菜单导航代码 -->
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <router-link v-if="!isvipshow" to="/site/login"> 登录</router-link>
                        <a v-if="!isvipshow" href="/register.html">注册</a>
                        <router-link v-if="isvipshow" to="/site/vip/center">会员中心</router-link>
                        <a v-if="isvipshow" href="javascript:void(0)" @click="logout">退出</a>
                        <strong>|</strong>
                        <router-link to="/site/car">
                        <i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{this.$store.getters.getCount}}</span>)</router-link>
                       </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                                   </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                               <router-link to="/site/goodslist">
                                    购物商城
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2.0 路由的占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import {
        vm,
        key
    } from './../../kits/vm.js'
    // 实现菜单的翻滚
    $(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);

        });

        $("#menu2 li a").hover(function() {
            $(".out", this).stop().animate({
                'top': '48px'
            }, 300); // move down - hide
            $(".over", this).stop().animate({
                'top': '0px'
            }, 300); // move down - show

        }, function() {
            $(".out", this).stop().animate({
                'top': '0px'
            }, 300); // move up - show
            $(".over", this).stop().animate({
                'top': '-48px'
            }, 300); // move up - hide
        });

    });


    export default {
        data() {
            return {
                isvipshow: false,
                buycount: 0
            }
        },
        methods: {
            logout() {
                // 1. 通知服务器当前用户的session清空
                this.$http.get('/site/account/logout').then(res => {
                    // 2.改变当前的isvipshow的值即可
                    this.isvipshow = false;

                    // 3. 将localStorage中的值修改成false
                    localStorage.setItem('islogin', false);
                });
            },
            checklogin() {
                var islogin = localStorage.getItem('islogin');
                if (islogin == "true") {
                    this.isvipshow = true;
                } else {
                    this.isvipshow = false;
                }
            }
        },
        mounted() {
            // 通过注册公共的vm对象来使用$emit和$on来传递值
            // vm.$on(key, (buycount) => {
            //     this.buycount += buycount;
            // })
            // 监听 changeshow 这个事件
            vm.$on('changeshow', () => {
                // 1. 获取到localStorage中的key="islogin"对应的值
                this.checklogin();
            })

            // 当页面重新刷新以后要去获取到localStorage中的这个登录状态，赋值给isvipshow,不然会存在内存中
            this.checklogin();
        }
    }
</script>

<style>
    /* 为了解决统一导入elemenui的样式,所以要放到layout.vue */
    /* 导入样式的格式  @import url() */
    
    @import url('../../../statics/elementuiCss/index.css');
</style>