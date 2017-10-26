 // localStorage中的名字
 const key = 'buyGoodsCount';

 // 1.存储
 export function setItem(goodsinfo) {
     var goodsObj = getItem();
     //  因为没有getItem()里面没有值返回的是一个字符串，所以需要转换为对象
     if (goodsObj == '{}') {
         goodsObj = JSON.parse(goodsObj);
     }
     if (goodsObj[goodsinfo.gid]) {
         // 有值,将goodsinfo.bcount追加到goodsObj中当前商品的购买数量中去
         goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
     } else {
         // 没有值，写入一个键值对
         goodsObj[goodsinfo.gid] = goodsinfo.bcount;
     };
     // 将修改以后的goodsObj的值设置回localStorage中
     localStorage.setItem(key, JSON.stringify(goodsObj));
 };

 //  2.获取
 export function getItem() {
     var gStr = localStorage.getItem(key);
     //   将字符串转换成js对象
     var obj = JSON.parse(gStr);
     // 判断如果obj为null的话返回一个{}
     if (!obj) {
         localStorage.setItem(key, JSON.stringify("{}"));
         //  将{}发给setItem
         return {};
     };
     return obj;
 };

 //  3.删除
 export function remoteItem(goodsid) {
     var goodsObj = getItem();
     // delete方法用于删除对象的指定元素（包括变量和函数）
     delete goodsObj[goodsid];
     localStorage.setItem(key, JSON.stringify(goodsObj));
 }