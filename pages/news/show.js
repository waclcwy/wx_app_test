var fun = require('../../lib/fun.js');
Page( {
    data: {},
    onLoad: function( _options ) {
        this.loadData(decodeURIComponent(_options.url));
    },
    loadData: function( _url ) {
        var _t = this;
        var _articleType = 'text';
        if(_url){
            if(_url.indexOf('_v.')>-1){
                _articleType = 'video';
            }
            if(_articleType=='video'){
                _url=_url.replace(/_[\w]\.html?/i,'_videos.json');
            }else{
                _url=_url.replace(/_[\w]\./i,'_r.');
            }
            wx.request( {
                url: _url,
                header: {
                    'Content-Type': 'application/json'
                },
                success: function( res ) {
                    var _data = {};
                    _data = res.data;
                    _data.articleType=_articleType;
                    _data.txt=fun.htmlToText(_data.txt);
                    console.log(_data);
                    _t.setData( _data );
                }
            });
        }else{
            wx.redirectTo({
                url: 'news'
            })
        }
    }
})