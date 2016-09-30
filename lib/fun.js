function htmlToText(_html) {
    var _text = "" + _html;
    _text = _text.replace(/<\/div>/ig, '\r\n');
    _text = _text.replace(/<\/li>/ig, '\r\n');
    _text = _text.replace(/<li>/ig, '  *  ');
    _text = _text.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    _text = _text.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    _text=_text.replace(/<p.*?>/gi, "\r\n");
    _text=_text.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    _text=_text.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    _text=_text.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    _text=_text.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    _text=_text.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    _text = _text.replace(/ +(?= )/g,'');

    //-- get rid of html-encoded characters:
    _text=_text.replace(/&nbsp;/gi," ");
    _text=_text.replace(/&amp;/gi,"&");
    _text=_text.replace(/&quot;/gi,'"');
    _text=_text.replace(/&lt;/gi,'<');
    _text=_text.replace(/&gt;/gi,'>');

   return _text;
}
//封装微信socket
function wxSocket(_opt){
  this.init(_opt);
}
wxSocket.prototype={
  init:function(_opt){
    _opt=_opt||{};
    var _t=this;
    var _config=_opt.config||{};
    _t.config=_config;
    if(!_config.url){
      return null;
    }
    _t.connect();
    if(_opt.open){
      _t.on('open',_opt.open);
    }
    if(_opt.message){
      _t.on('message',_opt.message);
    }
    if(_opt.close){
      _t.on('close',_opt.close);
    }
    if(_opt.error){
      _t.on('error',_opt.error);
    }
    return _t;
  },
  connect:function(_config){
    var _t=this;
    _config=_config||_t.config;
    if(_t.socket){
      _t.close();
    }
    _t.socket=wx.connectSocket(_config);
    return _t;
  },
  on:function(_type,_callBack){
    var _t=this;
    if(_type && _callBack){
      switch(_type){
        case 'message':
          wx.onSocketMessage(_callBack);
          break;
        case 'open':
          wx.onSocketOpen(_callBack);
          break;
        case 'close':
          wx.onSocketClose(_callBack);
          break;
        case 'error':
          wx.onSocketError(_callBack);
          break;
      }
    }
    return _t;
  },
  send:function(_opt){
    var _t=this;
    wx.closeSocket();
    _t.socket=null;
    return _t;
  },
  close:function(_opt){
    var _t=this;
    if(_opt){
      wx.sendSocketMessage(_opt);
    }
    return _t;
  }
}

module.exports = {
  htmlToText: htmlToText,
  wxSocket:wxSocket
}
