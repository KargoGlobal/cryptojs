/*
CryptoJS v3.x
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(g,k){var f={},d=f.lib={},m=function(){},l=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
p=d.WordArray=l.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=k?c:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var c=this.words,q=a.words,e=this.sigBytes;a=a.sigBytes;this.clamp();if(e%4)for(var b=0;b<a;b++)c[e+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((e+b)%4);else for(b=0;b<a;b+=4)c[e+b>>>2]=q[b>>>2];this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<32-8*(c%4);a.length=g.ceil(c/4)},clone:function(){var a=
l.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new p.init(c,a)}}),b=f.enc={},n=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],e=0;e<a;e++){var d=c[e>>>2]>>>24-8*(e%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],e=0;e<c;e+=2)b[e>>>3]|=parseInt(a.substr(e,2),16)<<24-4*(e%8);return new p.init(b,c/2)}},j=b.Latin1=
{stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],e=0;e<a;e++)b.push(String.fromCharCode(c[e>>>2]>>>24-8*(e%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],e=0;e<c;e++)b[e>>>2]|=(a.charCodeAt(e)&255)<<24-8*(e%4);return new p.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},r=d.BufferedBlockAlgorithm=
l.extend({reset:function(){this._data=new p.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,d=b.words,e=b.sigBytes,f=this.blockSize,l=e/(4*f),l=a?g.ceil(l):g.max((l|0)-this._minBufferSize,0);a=l*f;e=g.min(4*a,e);if(a){for(var h=0;h<a;h+=f)this._doProcessBlock(d,h);h=d.splice(0,a);b.sigBytes-=e}return new p.init(h,e)},clone:function(){var a=l.clone.call(this);a._data=this._data.clone();
return a},_minBufferSize:0});d.Hasher=r.extend({cfg:l.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){r.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new s.HMAC.init(a,d)).finalize(b)}}});var s=
f.algo={};return f}(Math);
(function(){var g=CryptoJS,k=g.lib,f=k.WordArray,d=k.Hasher,m=[],k=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new f.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(d,f){for(var b=this._hash.words,n=b[0],j=b[1],h=b[2],g=b[3],k=b[4],a=0;80>a;a++){if(16>a)m[a]=d[f+a]|0;else{var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31}c=(n<<5|n>>>27)+k+m[a];c=20>a?c+((j&h|~j&g)+1518500249):40>a?c+((j^h^g)+1859775393):60>a?c+((j&h|j&g|h&g)-1894007588):c+((j^h^
g)-899497514);k=g;g=h;h=j<<30|j>>>2;j=n;n=c}b[0]=b[0]+n|0;b[1]=b[1]+j|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+k|0},_doFinalize:function(){var d=this._data,f=d.words,b=8*this._nDataBytes,g=8*d.sigBytes;f[g>>>5]|=128<<24-g%32;f[(g+64>>>9<<4)+14]=Math.floor(b/4294967296);f[(g+64>>>9<<4)+15]=b;d.sigBytes=4*f.length;this._process();return this._hash},clone:function(){var f=d.clone.call(this);f._hash=this._hash.clone();return f}});g.SHA1=d._createHelper(k);g.HmacSHA1=d._createHmacHelper(k)})();
(function(){var g=CryptoJS,k=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(f,d){f=this._hasher=new f.init;"string"==typeof d&&(d=k.parse(d));var g=f.blockSize,l=4*g;d.sigBytes>l&&(d=f.finalize(d));d.clamp();for(var p=this._oKey=d.clone(),b=this._iKey=d.clone(),n=p.words,j=b.words,h=0;h<g;h++)n[h]^=1549556828,j[h]^=909522486;p.sigBytes=b.sigBytes=l;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var d=
this._hasher;f=d.finalize(f);d.reset();return d.finalize(this._oKey.clone().concat(f))}})})();