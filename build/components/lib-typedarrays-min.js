/*
CryptoJS v3.x
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(h,f,j){if(h){var g=CryptoJS.lib.WordArray,k=g.init;(g.init=function(a){a instanceof h&&(a=new f(a));if(a instanceof Int8Array||j&&a instanceof j||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof DataView)a=new f(a.buffer,a.byteOffset,a.byteLength);if(a instanceof f){for(var d=a.byteLength,c=[],b=0;b<d;b++)c[b>>>2]|=a[b]<<24-8*(b%4);k.call(this,c,d)}else k.apply(this,arguments)}).prototype=
g;g.toArrayBuffer=function(){for(var a=this.words,d=this.sigBytes,c=new h(d),b=new f(c),e=0;e<d;e++)b[e]=a[e>>>2]>>>24-8*(e%4)&255;return c}}})(ArrayBuffer,Uint8Array,Uint8ClampedArray);
