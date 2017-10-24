<template>
<div class="tmpl">
    <!-- 面包屑导航 -->
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/goods.html">购物商城</a>
        </div>
    </div>

    <!-- 1.0 顶部（分类，轮播，推荐） -->
    <div class="section">
        <div class="wrapper">
            <div class="wrap-box">
                <!--类别菜单-->
                <div class="left-220" style="margin:0;">
                    <div class="banner-nav">
                        <ul>
                        <!--此处声明下面可重复循环-->
                            <li  v-for="(item,index) in ginfo.catelist" :key="index">
                                <h3>
                                    <i class="iconfont icon-arrow-right"></i>
                                    <span v-text="item.title"></span>
                                    <p>
                                        <span v-for="(subitem,index) in item.subcates" :key="index">{{subitem.title}} &nbsp;</span>
                                    </p>
                                </h3>
                                <div class="item-box">
                                    <!--如有三级分类，此处可循环-->
                                    <dl>
                                        <dt> <a href="/goods/40.html">{{item.title}}</a></dt>
                                        <dd>
                                            <span v-for="(subitem,index) in item.subcates" :key="index"><a href="javascript:;">{{subitem.title}} &nbsp;</a></span> 
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--/类别菜单-->
                 
                <!--幻灯片-->
                <div class="left-705">
                    <div class="banner-img">
                        <div id="focus-box" class="focus-box">
                            <el-carousel :interval="5000" arrow="always">
                            <!-- el-carousel-item 代表每一页 -->
                            <el-carousel-item v-for="item in ginfo.sliderlist" :key="item.id">
                            <img  height="341" :src="item.img_url" alt="">
                            <h3>{{ item.title }}</h3>
                             </el-carousel-item>
                             </el-carousel>
                       
                        </div> 
                    </div>
                </div>
                <!--/幻灯片-->
                 
                <!--推荐商品-->
                <div class="left-220">
                    <ul class="side-img-list">
                     
                        <li v-for="(item,index) in ginfo.toplist" :key="index">
                            <div class="img-box">
                                <label>{{index + 1}}</label>
                                <img v-bind:src="item.img_url">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-98.html">{{item.title}}</a>
                                <span>{{item.add_time | datafmt('YYYY-MM-DD')}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--/推荐商品-->
            </div>
        </div>
    </div>

    <div class="section">
        <div v-for="(item,index) in clist" :key="index">
       <!--子类-->
       <div class="main-tit">
       <h2 v-text="item.catetitle"></h2>
       <p>
        
        <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" href="/goods/43.html">{{subitem.subcatetitle}}</a>  
       <i>+</i>
       </a>
       </p>
       </div>
       <!--/子类-->
       <div class="wrapper clearfix">
       <div class="wrap-box">
       <ul class="img-list">
        
       <li v-for="item in item.datas" :key="item.artID">
            <router-link v-bind="{to:'/site/goodsinfo/'+item.artID}">
       <div class="img-box">
          
       <img :src="item.img_url">

       </div>
       <div class="info">
       <h3  v-text="item.artTitle"></h3>
       <p class="price">
       <b>¥{{item.sell_price}}</b>元</p>
       <p>
       <strong>库存 {{item.stock_quantity}}</strong>
       <span>市场价：
       <s v-text="item.market_price"> </s>
       </span>
       </p>
       </div>
    </router-link>
       </li>
        
       </ul>
       </div>
       </div>
    </div>
       </div>

 </div>

</template>

<script>
    export default {
        data() {
            return {
                ginfo: {},
                clist: []
            }
        },
        created() {
            this.getginfo();
            this.getclist();
        },
        methods: {
            getginfo() {
                this.$http.get('/site/goods/gettopdata/goods').then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.ginfo = res.data.message;
                })
            },
            getclist() {
                this.$http.get('/site/goods/getgoodsgroup').then(res => {
                    this.clist = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
    .el-carousel__container {
        height: 341px;
    }
    
    .el-carousel__item h3 {
        color: red;
        font-size: 18px;
        opacity: 0.75;
        line-height: 50px;
        margin: 0;
    }
</style>