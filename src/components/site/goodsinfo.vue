<template>
<div class="tmpl">
<!-- 导航栏 -->
<div class="section">
    <div class="location">
    <span>当前位置：</span>
    <a href="/index.html">首页</a> &gt;
    <a href="/goods.html">购物商城</a>
    <a href="/goods/42/1.html">商品详情</a>
     
    </div>
    </div>
     
    <!-- 商品详情 -->
    <div class="section">
    <div class="wrapper clearfix">
    <div class="wrap-box">
    <!--页面左边-->
    <div class="left-925">
    <div class="goods-box clearfix">
    <!--商品图片-->
    <div class="pic-box">
            <div class="magnifier" id="magnifier1">
                    <div class="magnifier-container">
                        <div class="images-cover"></div>
                        <!--当前图片显示容器-->
                        <div class="move-view"></div>
                        <!--跟随鼠标移动的盒子-->
                    </div>
                    <div class="magnifier-assembly">
                        <div class="magnifier-btn">
                            <span class="magnifier-btn-left">&lt;</span>
                            <span class="magnifier-btn-right">&gt;</span>
                        </div>
                        <!--按钮组-->
                        <div class="magnifier-line">
                            <ul class="clearfix animation03">
                                <li v-for="item in ginfo.imglist" :key="item.id">
                                    <div class="small-img">
                                            <img :src="item.original_path"/>
                                    </div>
                                </li>                                                   
                            </ul>
                        </div>
                        <!--缩略图-->
                    </div>
                    <div class="magnifier-view"></div>
                    <!--经过放大的图片显示容器-->
                </div>
    </div>
    <!--/商品图片-->
     
    <!--商品信息-->
    <div class="goods-spec">
    <h1 v-text="ginfo.goodsinfo.title"></h1>
    <p class="subtitle" v-text="ginfo.goodsinfo.sub_title"></p>
    <div class="spec-box">
    <dl>
    <dt>货号</dt>
    <dd id="commodityGoodsNo"  v-text="ginfo.goodsinfo.goods_no"></dd>
    </dl>
    <dl>
    <dt>市场价</dt>
    <dd>
    <s id="commodityMarketPrice">¥{{ginfo.goodsinfo.market_price}}</s>
    </dd>
    </dl>
    <dl>
    <dt>销售价</dt>
    <dd>
    <em class="price" id="commoditySellPrice">¥{{ginfo.goodsinfo.sell_price}}</em>
    </dd>
    </dl>
    </div>
     
    <div class="spec-box">
    <dl>
    <dt>购买数量</dt>
    <dd>
    <div class="stock-box">
        <el-input-number v-model="buyCount"  :min="1"></el-input-number>
    </div>
    <span class="stock-txt">
    库存
    <em id="commodityStockNum">10</em>件
    </span>
    </dd>
    </dl>
    <dl>
    <dd>
    <div class="btn-buy" id="buyButton">
    <button class="buy">立即购买</button>
    <button class="add" @click='addCar'>加入购物车</button>
    </div>
    </dd>
    </dl>
    </div>
     
    </div>
    <!--/商品信息-->
    </div>
     
    <div id="goodsTabs" class="goods-tab bg-wrap">
    <!--选项卡-->
    <Affix>
    <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
    <ul>
    <li>
    <a v-bind="{class: isContent?'selected':''}" href="javascript:;" @click="changeIsContent(true)">商品介绍</a>
    </li>
    <li>
    <a v-bind="{class: !isContent?'selected':''}" href="javascript:;" @click="changeIsContent(false)">商品评论</a>
    </li>
    </ul>
    </div>
    </Affix>
    <!--/选项卡-->
     
    <!--选项内容-->
    <div class="tab-content entry" v-if="isContent" >
            <span v-html="ginfo.goodsinfo.content"></span>
    </div>
     
    <div class="tab-content"  v-if="!isContent">
    <!--网友评论-->
    <div class="comment-box">
    <!--取得评论总数-->
    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
    <div class="avatar-box">                                    
    <i class="iconfont icon-user-full"></i>                                    
    </div>
    <div class="conn-box">
    <div class="editor">
    <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="txtContent"></textarea>
    <span class="Validform_checktip"></span></div>
    <div class="subcon">
    <input type="button" value="提交评论" class="submit" @click="submitComment">
    <span class="Validform_checktip"></span></div>
    </div>
    </form>
    <ul id="commentList" class="list-box">
    <p  v-if="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
    <li v-for="item in commentList" :key="item.id">
        <div class="avatar-box">
            <i class="iconfont icon-user-full"></i>
        </div>
        <div class="inner-box">
            <div class="info">
                <span  v-text="item.user_name"></span>
                <span>{{item.add_time | datafmt('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <p v-text="item.content"></p>
        </div>
    </li>
    </ul>
    <!--放置页码-->
    <div class="page-box" style="margin:5px 0 0 62px">
            <el-pagination
                 @size-change="pageSizeChange"
                 @current-change="pageIndexChange"
                 :current-page="pageIndex"
                 :page-sizes="[1,10, 20, 30, 50]"
                 :page-size="pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
                 </el-pagination>
    </div>
    <!--/放置页码-->
    </div>
     
    <!--/网友评论-->
    </div>
     
    </div>
     
    </div>
    <!--/页面左边-->
     
    <!--页面右边-->
    <div class="left-220">
    <div class="bg-wrap nobg">
    <div class="sidebar-box">
    <h4>推荐商品</h4>
    <ul class="side-img-list">
     
    <li v-for="(item,index) in ginfo.hotgoodslist" :key="index">
    <div class="img-box">
            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                <img :src="item.img_url">
            </router-link>
    </div>
    <div class="txt-box">
            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">{{item.title}} </router-link>
    <span>{{item.add_time | datafmt('YYYY-MM-DD')}}</span>  
    </div>
    </li>

    </ul>
    </div>
    </div>
    </div>
    <!--/页面右边-->
    </div>
    </div>
    </div>
</div>
</template>

<script>
    import Affix from 'iview/src/components/affix';
    // / 导入jquery插件文件
    import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
    // 导入localStoageKit.js的设置localStoage方法
    import {
        setItem
    } from '../../kits/localStorageKit.js';
    // 导入公共vm对象，通过注册公共的vm对象来使用$emit和$on来传递值
    // import {
    //     vm,
    //     key
    // } from './../../kits/vm.js'
    export default {
        data() {
            return {
                buyCount: 1,
                pageIndex: 1,
                pageSize: 10,
                totalCount: 0,
                commentList: [],
                txtContent: '',
                isContent: true,
                ginfo: {}
            }
        },
        components: {
            Affix
        },
        created() {
            this.getgInfo();
            this.getCommentList();
        },
        watch: {
            '$route': function() {
                this.getgInfo();
                // 每次更换商品页面，将购物车的默认数量设置为1
                this.buyCount = 1;
            }
        },
        methods: {
            addCar() {
                // 使用公共VM来同步值
                // vm.$emit(key, this.buyCount);

                // 1. 通过vuex进行触发 changeBuyCount
                this.$store.dispatch('changeBuyCount', this.buyCount);

                //2.0 将商品的id和当前购买数量存储到localStorage中
                setItem({
                    gid: this.$route.params.goodsid,
                    bcount: this.buyCount
                });
            },
            pageIndexChange(val) {
                this.pageIndex = val;
                this.getCommentList();
            },
            pageSizeChange(val) {
                this.pageSize = val;
                this.getCommentList();
            },
            getCommentList() {
                var goodsid = this.$route.params.goodsid;
                this.$http.get('/site/comment/getbypage/goods/' + goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize).then(res => {
                    this.commentList = res.data.message;
                    this.totalCount = res.data.totalcount;
                });
            },
            submitComment() {
                if (this.txtContent.length <= 0) {
                    this.$message.error('评论信息必须填写');
                    return;
                };
                var goodsid = this.$route.params.goodsid;
                this.$http.post('/site/validate/comment/post/goods/' + goodsid, "commenttxt=" + this.txtContent).then(res => {
                    this.txtContent = '';
                    this.getCommentList();
                });
            },
            changeIsContent(iscontent) {
                this.isContent = iscontent;
            },
            getgInfo() {
                var goodsid = this.$route.params.goodsid;
                this.$http.get('/site/goods/getgoodsinfo/' + goodsid).then(res => {
                    this.ginfo = res.data.message;
                    setTimeout(function() {
                        $(function() {
                            $('#magnifier1').imgzoon({
                                magnifier: '#magnifier1'
                            });
                        });
                    }, 200);
                })
            }
        }
    }
</script>
<style scoped>
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>