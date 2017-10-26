<template>
<div class="tmpl">
    <div class="section">
        <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
        </div>
        </div>
         
        <div class="section">
        <div class="wrapper">
        <div class="bg-wrap">
        <!--购物车头部-->
        <div class="cart-head clearfix">
        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
        <div class="cart-setp">
        <ul>
        <li class="first active">
        <div class="progress">
        <span>1</span>
        放进购物车
        </div>
        </li>
        <li>
        <div class="progress">
        <span>2</span>
        填写订单信息
        </div>
        </li>
        <li class="last">
        <div class="progress">
        <span>3</span>
        支付/确认订单
        </div>
        </li>
        </ul>
        </div>
        </div>
        <!--购物车头部-->
        <!--商品列表-->
        <div class="cart-box">
        <input id="jsondata" name="jsondata" type="hidden">
        {{values}}
        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
        <tbody><tr>
        <th width="48">
                <el-switch on-text="反选" off-text="全选" v-model="isselectall" @change="allunall">
                </el-switch>
        </th>
        <th align="left">商品信息</th>
        <th width="84" align="left">单价</th>
        <th width="104" align="center">数量</th>
        <th width="104" align="left">总额(元)</th>                            
        <th width="54" align="center">操作</th>
        </tr>
        <tr>
        <td colspan="10" v-if="list.length<=0">
        <div class="msg-tips">
        <div class="icon warning"><i class="iconfont icon-tip"></i></div>
        <div class="info">
        <strong>购物车没有商品！</strong>
        <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
        </div>
        </div>
        </td>
        </tr>
        <tr v-for="(item,index) in list" :key="item.id">
                <td width="48">
                        <el-switch on-text="买了" off-text="不买" v-model="values[index]"> </el-switch>
                </td>        
            <td >
                    <img height="50" width="50" :src="item.img_url" alt="">
                    <p v-text="item.title"></p>
            </td>
            <td width="84" align="left">{{item.sell_price}}</td>
            <td width="104" align="center">{{item.buycount}}</td>
            <td width="104" align="left">{{item.buycount*item.sell_price}}(元)</td>                            
            <td width="54" align="center">操作</td>

        </tr>



        <tr>
        <th align="right" colspan="8">
        已选择商品 <b class="red" id="totalQuantity">0</b> 件 &nbsp;&nbsp;&nbsp;
        商品总金额（不含运费）：<span class="red">￥</span><b class="red" id="totalAmount">0</b>元
        </th>
        </tr>
        </tbody></table>
        </div>
        <!--/商品列表-->
        <!--购物车底部-->
        <div class="cart-foot clearfix">
        <div class="right-box">
        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
        <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
        </div>
        </div>
        <!--购物车底部-->
        </div>
        </div>
        </div>
</div>
</template>

<script>
    import {
        getItem
    } from './../../kits/localStorageKit.js'
    export default {
        data() {
            return {
                isselectall: false,
                // 这个数组中的下标的值绑定到表格中的每一行的el-switch
                values: [],
                // 存储商品列表
                list: []
            }
        },
        created() {
            this.getgoodslist();
        },
        watch: {
            // 通过这种语法监控数组，当数组值发生改变就触发逻辑，使用deep:true来深度观察    　
            values: {　　　　
                handler: function(newValue, oldValue) {　　　　　　
                    for (let i = 0; i < newValue.length; i++) {　　　　　　　　
                        if (newValue[i] == false) {　　　　　　　　　　　
                            return this.isselectall = false;　　　　
                        }　　　　　　
                    };
                    this.isselectall = true;　
                },
                // 深度观察
                // deep: true
            }
        },
        methods: {
            // 完成全选效果
            allunall() {
                // 遍历values将所有的值用this.isselectall赋值即可
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselectall;
                }
            },
            getgoodslist() {
                var goodsObj = getItem();
                var idArr = [];
                for (var key in goodsObj) {
                    idArr.push(key);
                };
                var ids = idArr.join(',');
                this.$http.get('/site/comment/getshopcargoods/' + ids).then(res => {
                    // 1.将数据赋值
                    this.list = res.data.message;
                    // 2.根据返回的数组个数初始化values数组的个数，值全部是false,用来设置按键初始状态
                    // 获取localStorage中的购物车数据对象
                    var goodsObj = getItem();
                    this.list.forEach((item, index) => {
                        this.values.push(false);
                        // 3 将当前商品的数量赋值给 接口中返回的buycount属性,因为后台接口返回的数据是0
                        item.buycount = goodsObj[item.id];
                    });
                })
            }
        }
    }
</script>
<style scoped>

</style>