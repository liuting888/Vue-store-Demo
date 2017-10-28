<template>
        <div class="tmpl">
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="javascript:;">支付中心</a>
                </div>
            </div>
    
            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <div class="nav-tit pay">
                            <a href="javascript:;" class="selected">支付中心</a>
                        </div>
                        <div class="form-box payment">
                            <div class="el-row">
                                <div class="el-col el-col-16">
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>订 单 号：</dt>
                                                <dd>{{orderinfo.order_no}}</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>收货人姓名：</dt>
                                                <dd v-text="orderinfo.accept_name"></dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd v-text="orderinfo.area">
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>手机号码：</dt>
                                                <dd v-text="orderinfo.mobile"></dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付金额：</dt>
                                                <dd>{{orderinfo.order_amount}} 元</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>在线支付</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="message">
                                        <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                        <span v-text="orderinfo.message"></span>
                                    </div>
                                </div>
                                <div class="el-col el-col-8">
                                    <div id="container">
                                        <canvas width="300" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
        </div>
    </template>

<script>
    // 导入二维码jquery插件
    import '../../../statics/site/js/jqplugins/qr/jqueryqr.js'
    import kits from '../../kits/kits.js'
    export default {
        data() {
            return {
                interval: null,
                orderid: this.$route.params.orderid,
                orderinfo: {}
            }
        },
        created() {
            this.getorderinfo();
        },
        mounted() {
            // 取出存在url里面的金额
            var amount = this.$route.params.amount;
            $("#container").erweima({
                label: '前端工程师',
                text: kits.payurl + '/' + this.orderid + '/' + amount
            });
            // 开启定时器每隔5秒执行一次
            this.interval = setInterval(this.checkorderStatus, 5000);
        },
        beforeCreate() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        },
        methods: {
            // 一直等待这个接口的返回数据中的status为2的时候就跳转到支付成功页面，否则一直停留在支付页面
            checkorderStatus() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid).then(res => {
                    // 返回数据中的status为2的时候就跳转到支付成功页面，否则一直停留在支付页面
                    if (res.data.message[0].status == 2) {
                        this.$router.push({
                            name: 'paysuccesspc'
                        });
                    }
                })
            },

            // 根据订单id获取到订单的详细数据
            getorderinfo() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        this.orderinfo = res.data.message[0];
                    });
            }
        }
    }
</script>
<style>
    .form-box .form-group dt {
        width: 30% !important;
    }
</style>