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
     
    </div>
    <!--/商品图片-->
     
    <!--商品信息-->
    <div class="goods-spec">
    <h1>奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</h1>
    <p class="subtitle">送美诗特TA20无线话筒1套+自拍神器杆！ DTS解码数字功放 HDMI、光纤、同轴多组输入输出 USB、蓝牙播放功能</p>
    <div class="spec-box">
    <dl>
    <dt>货号</dt>
    <dd id="commodityGoodsNo">SD6583245641</dd>
    </dl>
    <dl>
    <dt>市场价</dt>
    <dd>
    <s id="commodityMarketPrice">¥5880.00</s>
    </dd>
    </dl>
    <dl>
    <dt>销售价</dt>
    <dd>
    <em class="price" id="commoditySellPrice">¥4880.00</em>
    </dd>
    </dl>
    </div>
     
    <div class="spec-box">
    <dl>
    <dt>购买数量</dt>
    <dd>
    <div class="stock-box">
    <input id="commodityChannelId" type="hidden" value="2">
    <input id="commodityArticleId" type="hidden" value="98">
    <input id="commodityGoodsId" type="hidden" value="0">
    <input id="commoditySelectNum" type="text" maxlength="9" value="1" maxvalue="10" onkeydown="return checkNumber(event);">
    <a class="add" onclick="addCartNum(1);">+</a>
    <a class="remove" onclick="addCartNum(-1);">-</a>
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
    <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
    <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
    </div>
    </dd>
    </dl>
    </div>
     
    </div>
    <!--/商品信息-->
    </div>
     
    <div id="goodsTabs" class="goods-tab bg-wrap">
    <!--选项卡-->
    <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
    <ul>
    <li>
    <a class="selected" href="javascript:;">商品介绍</a>
    </li>
    <li>
    <a href="javascript:;" class="">商品评论</a>
    </li>
    </ul>
    </div>
    <!--/选项卡-->
     
    <!--选项内容-->
    <div class="tab-content entry" style="display:block;">
    内容
    </div>
     
    <div class="tab-content" style="display: block;">
    <!--网友评论-->
    <div class="comment-box">
    <!--取得评论总数-->
    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
    <div class="avatar-box">                                    
    <i class="iconfont icon-user-full"></i>                                    
    </div>
    <div class="conn-box">
    <div class="editor">
    <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
    <span class="Validform_checktip"></span></div>
    <div class="subcon">
    <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
    <span class="Validform_checktip"></span></div>
    </div>
    </form>
    <ul id="commentList" class="list-box">
    <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
    <li><div class="avatar-box"><i class="iconfont icon-user-full"></i></div><div class="inner-box"><div class="info"><span>匿名用户</span>
    <span>2017/10/23 14:58:59</span></div><p>testtesttest</p></div></li><li><div class="avatar-box"><i class="iconfont icon-user-full"></i></div><div class="inner-box"><div class="info"><span>匿名用户</span>
    <span>2017/10/23 14:59:36</span></div><p>很清晰调动单很清晰调动单</p></div></li>
    </ul>
    <!--放置页码-->
    <div class="page-box" style="margin:5px 0 0 62px">
    <div id="pagination" class="digg"><span class="disabled">« 上一页</span><span class="current">1</span><span class="disabled">下一页 »</span></div>
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
     
    <li>
    <div class="img-box">
    <a href="/goods/show-98.html">
    <img src="/upload/201504/20/thumb_201504200314272543.jpg">
    </a>
    </div>
    <div class="txt-box">
    <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
    <span>2015-04-20</span>
    </div>
    </li>
     
    <li>
    <div class="img-box">
    <a href="/goods/show-97.html">
    <img src="/upload/201504/20/thumb_201504200258403759.jpg">
    </a>
    </div>
    <div class="txt-box">
    <a href="/goods/show-97.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
    <span>2015-04-20</span>
    </div>
    </li>
     
    <li>
    <div class="img-box">
    <a href="/goods/show-95.html">
    <img src="/upload/201504/20/thumb_201504200242250674.jpg">
    </a>
    </div>
    <div class="txt-box">
    <a href="/goods/show-95.html">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</a>
    <span>2015-04-20</span>
    </div>
    </li>
     
    <li>
    <div class="img-box">
    <a href="/goods/show-94.html">
    <img src="/upload/201504/20/thumb_201504200239192345.jpg">
    </a>
    </div>
    <div class="txt-box">
    <a href="/goods/show-94.html">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
    <span>2015-04-20</span>
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
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style scoped>

</style>