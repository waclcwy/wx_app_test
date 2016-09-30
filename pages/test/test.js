var fun = require('../../lib/fun.js');
Page({
  data:{
    // text:"这是一个页面"
    loadingTag:false,
    pic:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  run:function(e){
    var _t=this;
    console.log(1);
    this.setData({loadingTag:!this.data.loadingTag});
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })
    console.log(2);
    // wx.downloadFile({
    //   url: 'http://app.news.cn/ques/audio/bg.mp3',
    //   type: 'audio',
    //   success: function(res) {
    //     wx.playVoice({
    //       filePath: res.tempFilePath
    //     })
    //   },
    //   complete:function(res){
    //     console.log(res)
    //   }
    // })
    //var socket=new fun.wxSocket({config:{url:'adfadf'},error:function(e){console.log('aaa')}});
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     _t.setData({loadingTag:!_t.data.loadingTag,pic:res.tempFilePaths[0]});
    //   }
    // })
    wx.previewImage({
      current: '123', // 当前显示图片的http链接
      success:function(res){
        console.log(res);
    //     _t.setData({loadingTag:!_t.data.loadingTag,pic:res.tempFilePaths[0]});
      },
      fail:function(res){
        console.log(res);
      },
      complete:function(res){
        console.log(res);
      },
      urls: [
        'http://www.xinhuanet.com/photo/titlepic/111960/1119606167_1474527024906_title0h.jpg',
        'http://www.xinhuanet.com/photo/titlepic/111960/1119606177_1474527061691_title0h.jpg'
      ] // 需要预览的图片http链接列表
    })
    console.log(3);
  }
})