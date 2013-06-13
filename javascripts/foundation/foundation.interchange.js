/*jslint unparam: true, browser: true, indent: 2 */
(function(e,t,n,r){"use strict";Foundation.libs.interchange={name:"interchange",version:"4.2.1",cache:{},settings:{load_attr:"interchange",named_queries:{"default":"only screen and (min-width: 1px)",small:"only screen and (min-width: 768px)",medium:"only screen and (min-width: 1280px)",large:"only screen and (min-width: 1440px)",landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(e,t){if(/IMG/.test(e[0].nodeName)){var n=t.split("/"),r=n[n.length-1],i=e[0].src;if((new RegExp(r,"i")).test(e[0].src))return;return e[0].src=t,e.trigger("replace",[e[0].src,i])}}}},init:function(t,n,r){return Foundation.inherit(this,"throttle"),typeof n=="object"&&e.extend(!0,this.settings,n),this.events(),this.images(),typeof n!="string"?this.settings.init:this[n].call(this,r)},events:function(){var n=this;e(t).on("resize.fndtn.interchange",n.throttle(function(){n.resize.call(n)},50))},resize:function(){var e=this.cache;for(var t in e)if(e.hasOwnProperty(t)){var n=this.results(t,e[t]);n&&this.settings.directives[n.scenario[1]](n.el,n.scenario[0])}},results:function(t,n){var r=n.length,i=[];if(r>0){var s=e('[data-uuid="'+t+'"]');for(var o=r-1;o>=0;o--){var u=n[o][2];if(this.settings.named_queries.hasOwnProperty(u))var a=matchMedia(this.settings.named_queries[u]);else var a=matchMedia(n[o][2]);if(a.matches)return{el:s,scenario:n[o]}}}return!1},images:function(e){return typeof this.cached_images=="undefined"||e?this.update_images():this.cached_images},update_images:function(){var t=n.getElementsByTagName("img"),r=t.length,i="data-"+this.settings.load_attr;this.cached_images=[];for(var s=r-1;s>=0;s--)this.loaded(e(t[s]),s===0,function(e,t){if(e){var n=e.getAttribute(i)||"";n.length>0&&this.cached_images.push(e)}t&&this.enhance()}.bind(this));return"deferred"},loaded:function(e,t,n){function r(){n(e[0],t)}function i(){this.one("load",r);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){r();return}e[0].complete||e[0].readyState===4?r():i.call(e)},enhance:function(){var n=this.images().length;for(var r=n-1;r>=0;r--)this._object(e(this.images()[r]));return e(t).trigger("resize")},parse_params:function(e,t,n){return[this.trim(e),this.convert_directive(t),this.trim(n)]},convert_directive:function(e){var t=this.trim(e);return t.length>0?t:"replace"},_object:function(e){var t=this.parse_data_attr(e),n=[],r=t.length;if(r>0)for(var i=r-1;i>=0;i--){var s=t[i].split(/\((.*?)(\))$/);if(s.length>1){var o=s[0].split(","),u=this.parse_params(o[0],o[1],s[1]);n.push(u)}}return this.store(e,n)},uuid:function(e){function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}var t=e||"-";return n()+n()+t+n()+t+n()+t+n()+t+n()+n()+n()},store:function(e,t){var n=this.uuid(),r=e.data("uuid");return r?this.cache[r]:(e.attr("data-uuid",n),this.cache[n]=t)},trim:function(t){return typeof t=="string"?e.trim(t):t},parse_data_attr:function(e){var t=e.data(this.settings.load_attr).split(/\[(.*?)\]/),n=t.length,r=[];for(var i=n-1;i>=0;i--)t[i].replace(/[\W\d]+/,"").length>4&&r.push(t[i]);return r},reflow:function(){this.images(!0)}}})(Foundation.zj,this,this.document);