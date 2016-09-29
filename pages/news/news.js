var url={
    swiper:'http://xh.zf.news.cn/wxapp/news/swiper.json',
    list:'http://xuan.news.cn/cloudc/wyxh/index_list.htm?siteId=1'
};
Page( {
    data: {
        swiper: {
            items: [],
            indicatorDots: false,
            autoplay: true,
            interval: 5000,
            duration: 1000
        },
        list: {
            items: []
        },
        page:1
    },
    onLoad: function( _options ) {
        var _t=this;
        _t.loadData({type:'swiper'});
        _t.loadData({type:'list'});
    },
    showNews:function(_e){
        wx.navigateTo({
            url: 'show?url='+encodeURIComponent(_e.currentTarget.dataset.url)
        })
    },
    loadData:function(_options){
        var _t=this;
        _options=_options||{};
        if(_options.type && url[_options.type] && _t.data[_options.type]){
            wx.request( {
                url: url[_options.type],
                data: {
                    page: _t.data.page
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function( res ) {
                    var _data={};
                    _data[_options.type+'.items']=_t.data[_options.type].items.concat(res.data.list);
                    if(_options.type=='list'){
                        _data.page=++_t.data.page;
                    }
                    _t.setData(_data);
                }
            });
        }
    }
})