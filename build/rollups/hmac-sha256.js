/*
CryptoJS v3.x
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var d={},f=d.lib={},q=function(){},m=f.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=f.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,g=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(g[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else for(e=0;e<a;e+=4)c[b+e>>>2]=g[e>>>2];this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=
m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],g=0;g<a;g+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=d.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var g=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;g.push((e>>>4).toString(16));g.push((e&15).toString(16))}return g.join("")},parse:function(a){for(var c=a.length,g=[],b=0;b<c;b+=2)g[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return new r.init(g,c/2)}},n=l.Latin1=
{stringify:function(a){var c=a.words;a=a.sigBytes;for(var g=[],b=0;b<a;b++)g.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return g.join("")},parse:function(a){for(var c=a.length,g=[],b=0;b<c;b++)g[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(g,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},u=f.BufferedBlockAlgorithm=
m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,g=c.words,b=c.sigBytes,e=this.blockSize,d=b/(4*e),d=a?h.ceil(d):h.max((d|0)-this._minBufferSize,0);a=d*e;b=h.min(4*a,b);if(a){for(var f=0;f<a;f+=e)this._doProcessBlock(g,f);f=g.splice(0,a);c.sigBytes-=b}return new r.init(f,b)},clone:function(){var a=m.clone.call(this);a._data=this._data.clone();
return a},_minBufferSize:0});f.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,g){return(new a.init(g)).finalize(c)}},_createHmacHelper:function(a){return function(c,g){return(new t.HMAC.init(a,g)).finalize(c)}}});var t=
d.algo={};return d}(Math);
(function(h){for(var s=CryptoJS,d=s.lib,f=d.WordArray,q=d.Hasher,d=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],d=d.SHA256=q.extend({_doReset:function(){this._hash=new f.init(m.slice(0))},_doProcessBlock:function(c,g){for(var b=this._hash.words,e=b[0],d=b[1],f=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
c[g+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&d^e&f^d&f);q=n;n=m;m=h;h=j+k|0;j=f;f=d;d=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+d|0;b[2]=b[2]+f|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(d);s.HmacSHA256=q._createHmacHelper(d)})(Math);
(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(d,f){d=this._hasher=new d.init;"string"==typeof f&&(f=s.parse(f));var h=d.blockSize,m=4*h;f.sigBytes>m&&(f=d.finalize(f));f.clamp();for(var r=this._oKey=f.clone(),l=this._iKey=f.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var d=this._hasher;d.reset();d.update(this._iKey)},update:function(d){this._hasher.update(d);return this},finalize:function(d){var f=
this._hasher;d=f.finalize(d);f.reset();return f.finalize(this._oKey.clone().concat(d))}})})();