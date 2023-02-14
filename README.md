商城

百度地图:

```
this.$axios({
  method: 'get',
  url: 'https://api.map.baidu.com/location/ip?ip=&coor=bd09ll&ak=u3njbWWmt39e9Rx4b7eXTLk41C8HqZxW&sn=',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

新品尝鲜：

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/events/294934938598424582',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

限时团购：

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/events/410899839472287744',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

首页nav

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/categories/lists?source=1&longitude=113.270796&latitude=23.135312011187',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

图片

```
https://img01.yimishiji.com/v1/img/a5ee6d8d8db58242c6ffde3cbc5405fa.webp
```

```
商品详情信息:
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/products/3706?longitude=113.270796&version=90&latitude=23.135312011187',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });

```

主页主数据

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/apppages/layout',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

搜索框内关键词轮播

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/apppages/layout?access_token&page_type=search_keywords',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

新版本告知弹窗

```
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v1/defaults/upgrade',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
```

首页·标签页 四季时蔬页

```
//主页：
this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v3/categories/22',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
 //分类依据:
 this.$axios({
  method: 'get',
  url: 'https://api.yimishiji.com/v2/categories/subclass?parent_id=22',
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
  //全部分类下的商品
  this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v2/products/list?cat_id=22&page_size=20&page=1`,
  }).then(({data})=>{
    console.log('data',data)
    //请使用懒加载
  })
  .catch((error)=>{
    console.log(error);
  });
  
  //筛选依据
  this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v2/products/list_conditions?cat_id=22`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
  //商品列表
   this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v2/products/list?goods_tag=14&farmer_id=15&web_tag=56&cat_id=24&order_by=comment_desc&price_range=30.403788382247967_20000.0&access_token&page_size=20&page=1`,
  }).then(({data})=>{
    console.log('data',data)
    //goods_tag 商品分类词条
    //farmer 农场词条
    //web_tag 网络词条
    //cat_id  该商品大类的id
    //order_by  排序类型
    //price 价格范围
    // 请做懒加载
  })
  .catch((error)=>{
    console.log(error);
  });
  
```



--------------------------------------------------------首页内容过多 日后再进行抓包---------------------------------------------------------------

分类页

```
//全部主内容 内容非常多
this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v3/categories/lists?source=2`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
 //细分类的商品列表

 this.$axios({
  method: 'get',
  url: ` https://api.yimishiji.com/v1/categories/products?longitude=113.270796&cat_id=24&suppress_response_code=true&page_size=20&latitude=23.135312011187&page=1`,
  }).then(({data})=>{
    console.log('data',data)
    //cat_id=24  商品大类id
    //  请使用懒加载
    //加上经纬度之后 会根据当前所在地筛选可购买商品 不加上经纬度商品将增加很多
  })
  .catch((error)=>{
    console.log(error);
  });
```

----------------------------------------------------------------------超值精选页---------------------------------------------------------------------------

该页面数据过多 必须阉割掉大部分内容

每一项内容都非常多 可以划分到另一个项目

```
招牌必买：
this.$axios({
  method: 'get',
  url: `https://m.yimishiji.com/front-ux/growth_zero/api/v2/new_cust_list`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
  一大坨商品：
  this.$axios({
  method: 'get',
  url: `https://m.yimishiji.com/front-ux/growth_zero/api/v2/feeds`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
  
  吃的百科
   this.$axios({
  method: 'get',
  url: `https://m.yimishiji.com/front-ux/growth_zero/api/v1/wechat/mp_article/list`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
  特色商品列表
   this.$axios({
  method: 'get',
  url: `https://m.yimishiji.com/front-ux/growth_zero/api/v2/yimi_list`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
```

--------------------------------------------------------------------购物篮-----------------------------------------------------------------------------------



```
 猜你喜欢(上下轮播商品 + 商品列表)
 this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v2/products/member_recommend?longitude=113.270796&latitude=23.135312011187&top_sell_products=true`,
  }).then(({data})=>{
    console.log('data',data)
  })
  .catch((error)=>{
    console.log(error);
  });
  
 
  换购商品列表
   this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v3/products/exchange?longitude=113.270796&latitude=23.135312011187&device_token=1`,
  }).then(({data})=>{
    console.log('data',data)
    //device_token 可随便填写 但是不能没有
  })
  .catch((error)=>{
    console.log(error);
  });
  
  
  通知栏以及点击之后的弹窗内容
     this.$axios({
  method: 'get',
  url: `https://api.yimishiji.com/v2/cart?longitude=113.270796&latitude=23.135312011187&device_token=3a9d878bbe058d4cf6f6f3dfc689900f`,
  }).then(({data})=>{
    console.log('data',data)
    //device_token 可随便填写 但是不能没有
  })
  .catch((error)=>{
    console.log(error);
  });
```

