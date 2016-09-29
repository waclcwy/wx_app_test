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

module.exports = {
  htmlToText: htmlToText
}
