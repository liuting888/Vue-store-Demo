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
        <td colspan="10"  v-show="isdispaly<=0">
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
            <td width="84">
                <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>
            </td>
            <td width="104" align="left">{{item.buycount*item.sell_price}}(元)</td>                            
            <td width="54" align="center"><el-button type="success" size="mini" @click="deldata(item.id)">删除</el-button></td>

        </tr>



        <tr>
        <th align="right" colspan="8">
        已选择商品 <b class="red" id="totalQuantity" v-text="selectCount"></b> 件 &nbsp;&nbsp;&nbsp;
        商品总金额（不含运费）：<span class="red">￥</span><b class="red" id="totalAmount" v-text='selletmentAmount'>0</b>元
        </th>
        </tr>
        </tbody></table>
        </div>
        <!--/商品列表-->
        <!--购物车底部-->
        <div class="cart-foot clearfix">
        <div class="right-box">
        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
        <button class="submit"
        @click="toshopping">立即结算</button>
        </div>
        </div>
        <!--购物车底部-->
        </div>
        </div>
        </div>
</div>
</template>

<script>
    // 导入localstorage帮助类
    import {
        getItem,
        remoteItem,
        updageItem
    } from './../../kits/localStorageKit.js';
    // 导入按钮组件
    import myinput from '../subcom/myinputNumber.vue'
    export default {
        // 导入按钮组件
        components: {
            myinput
        },
        data() {
            return {
                // 用来控制购物车为空显示状态
                isdispaly: 0,
                // 商品总件数
                selectCount: 0,
                // 全选框状态
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
                    // 判断一下购物车里面还有没有商品，没商品全选按钮也不要打开了
                    if (newValue.length <= 0) {
                        this.isselectall = false;　
                    } else {
                        this.isselectall = true;　
                    }
                },
                // 深度观察
                // deep: true
            },
            // 观察购物车里面是否有商品数量，没有商品就让购物车为空显示出来
            // 可以直接用v-if=“list.length>=0来判断，但是会先出现购物车为空再展示商品，用户体验不好”
            list: {　　　　
                handler: function(newValue, oldValue) {　　　　　　
                    if (newValue.length == 0) {　　　　　　　　　　　
                        return this.isdispaly = 0;　　　　
                    }　　　　　　
                    this.isdispaly = 1;　
                },
                // 深度观察
                // deep: true
            },
        },
        computed: {

            // 通过计算属性来得到选择商品件数
            selletmentAmount() {
                // 通过filter方法来得到一个values里面全部为true的数组
                var trueArr = this.values.filter(function(item) {
                    return item;
                });
                // 将新数组的长度值返回给 getCount，当值发生改变页面件数就会更新
                this.selectCount = trueArr.length;
                // 声明一个变量用来保存总金额
                var totalAmount = 0;
                this.values.forEach((item, index) => {
                    // 如果item为true的时候，这个index就是我需要统计的数据
                    if (item) {
                        // values和list的索引长度一样，得到values为true的索引
                        var goodsInfo = this.list[index];
                        totalAmount += (goodsInfo.sell_price * goodsInfo.buycount);
                    }
                })
                return totalAmount;
            },
        },
        methods: {
            //1. 跳转到结算页面时再url中传入商品数据
            toshopping() {
                for (var i = 0; i < this.values.length; i++) {
                    if (this.values[i] == true) {
                        var ids = '';
                        var idsArr = [];
                        this.values.forEach((item, index) => {
                            idsArr.push(this.list[index].id);
                        });
                        ids = idsArr.join(',');
                        // 2.将这些商品id以逗号分隔的形式传递到/site/shopping/:ids
                        // params:将ids的值传递到路由规则shopping的ids参数中
                        this.$router.push({
                            name: 'shopping',
                            params: {
                                ids: ids
                            }
                        });
                    } else {
                        // this.$message.error('请选择商品');
                        this.$message({
                            showClose: true,
                            message: '警告哦，请选择商品',
                            type: 'warning'
                        });
                    }
                }
            },
            deldata(goodsid) {
                // 设置一个索引，设置为-1因为没有数值有-1的索引
                var index = -1;
                // 通过findIndex找到这个ID的索引
                index = this.list.findIndex(function(item) {
                    return item.id == goodsid
                });
                // 1. 删除this.list中这个商品数据
                this.list.splice(index, 1);
                // 2. 删除 this.values中的这个商品对应的索引下面的数据
                this.values.splice(index, 1);
                // 3. 删除localStorage中的这个商品数据
                remoteItem(goodsid);
            },
            // 当myinputNumber.vue中触发的事件以后就会自动触发update方法的执行，同时将obj传入
            // 注意这个obj是经过myinputNumber.vue处理过后的数值
            update(obj) {
                // obj的格式：{gid:商品的id,count:修改以后的值}
                // 遍历list数组，找到相同的ID号，并且修改item.buycount里面的数值
                this.list.forEach(item => {
                    // 修改this.list中当前的obj.gid这个商品的 buycount为obj.count
                    if (item.id == obj.gid) {
                        item.buycount = obj.count;
                    }
                });
                updageItem({
                    gid: obj.gid,
                    count: obj.count
                });
            },
            // 完成全选效果
            allunall() {
                // 遍历values将所有的值用this.isselectall赋值即可
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselectall;
                };
                // 在计算属性getCount中，在页面点击全选框无法触发计算属性来修改商品件数，所以需要手动改变下数值的长度，让计算属性刷新
                this.values.push(false);
                this.values.pop();
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