!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/flume/",s(s.s=6)}([function(t,e,s){var i,n,r={},o=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===n&&(n=i.apply(this,arguments)),n}),a=function(t){var e={};return function(t,s){if("function"==typeof t)return t();if(void 0===e[t]){var i=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,s);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}}(),l=null,d=0,c=[],h=s(3);function u(t,e){for(var s=0;s<t.length;s++){var i=t[s],n=r[i.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](i.parts[o]);for(;o<i.parts.length;o++)n.parts.push(b(i.parts[o],e))}else{var a=[];for(o=0;o<i.parts.length;o++)a.push(b(i.parts[o],e));r[i.id]={id:i.id,refs:1,parts:a}}}}function p(t,e){for(var s=[],i={},n=0;n<t.length;n++){var r=t[n],o=e.base?r[0]+e.base:r[0],a={css:r[1],media:r[2],sourceMap:r[3]};i[o]?i[o].parts.push(a):s.push(i[o]={id:o,parts:[a]})}return s}function f(t,e){var s=a(t.insertInto);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=c[c.length-1];if("top"===t.insertAt)i?i.nextSibling?s.insertBefore(e,i.nextSibling):s.appendChild(e):s.insertBefore(e,s.firstChild),c.push(e);else if("bottom"===t.insertAt)s.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=a(t.insertAt.before,s);s.insertBefore(e,n)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var i=function(){0;return s.nc}();i&&(t.attrs.nonce=i)}return g(e,t.attrs),f(t,e),e}function g(t,e){Object.keys(e).forEach(function(s){t.setAttribute(s,e[s])})}function b(t,e){var s,i,n,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var o=d++;s=l||(l=m(e)),i=S.bind(null,s,o,!1),n=S.bind(null,s,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(s=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",g(e,t.attrs),f(t,e),e}(e),i=function(t,e,s){var i=s.css,n=s.sourceMap,r=void 0===e.convertToAbsoluteUrls&&n;(e.convertToAbsoluteUrls||r)&&(i=h(i));n&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var o=new Blob([i],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}.bind(null,s,e),n=function(){v(s),s.href&&URL.revokeObjectURL(s.href)}):(s=m(e),i=function(t,e){var s=e.css,i=e.media;i&&t.setAttribute("media",i);if(t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}.bind(null,s),n=function(){v(s)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else n()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var s=p(t,e);return u(s,e),function(t){for(var i=[],n=0;n<s.length;n++){var o=s[n];(a=r[o.id]).refs--,i.push(a)}t&&u(p(t,e),e);for(n=0;n<i.length;n++){var a;if(0===(a=i[n]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete r[a.id]}}}};var y,w=(y=[],function(t,e){return y[t]=e,y.filter(Boolean).join("\n")});function S(t,e,s,i){var n=s?"":i.css;if(t.styleSheet)t.styleSheet.cssText=w(e,n);else{var r=document.createTextNode(n),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}},function(t,e,s){var i=s(2);"string"==typeof i&&(i=[[t.i,i,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};s(0)(i,n);i.locals&&(t.exports=i.locals)},function(t,e,s){},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var s=e.protocol+"//"+e.host,i=s+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var n,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(n=0===r.indexOf("//")?r:0===r.indexOf("/")?s+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}},function(t,e,s){var i=s(5);"string"==typeof i&&(i=[[t.i,i,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};s(0)(i,n);i.locals&&(t.exports=i.locals)},function(t,e,s){},function(t,e,s){"use strict";function i(t,e=document){return e.querySelector(t)}function n(t,e=document){return e.querySelectorAll(t)}function r(t,e,...s){const i=document.createElement(t);return e&&Object.keys(e).forEach(t=>{if("className"===t){e[t].split(" ").forEach(t=>i.classList.add(t))}else if(/^data-/.test(t)){const s=t.slice(5).split("-").map((t,e)=>0===e?t:t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join("");i.dataset[s]=e[t]}else i.setAttribute(t,e[t])}),s.forEach(t=>{null!=t&&("string"==typeof t?i.appendChild(document.createTextNode(t)):i.appendChild(t))}),i}s.r(e);const o=()=>"ontouchstart"in document==!0?"touchstart":"mousedown";var a=function(){const t={id:"",onAutoplay:!1,showArrows:!0,showDots:!0,autoplaySpeed:5e3,onInfiniteLoop:!0,slidesToShow:1,arrowColor:{default:"rgba(255, 255, 255, 0.7)",hover:"rgba(255, 255, 255, 0.8)",active:"transparent",focus:"none"},dotColor:{default:"rgba(255, 255, 255, 0.5)",hover:"rgb(255, 255, 255)",active:"rgba(255, 255, 255, 0.85)",focus:"none"},isVertical:!1},e={id:"string",onAutoplay:"boolean",showArrows:"boolean",showDots:"boolean",autoplaySpeed:"number",onInfiniteLoop:"boolean",slidesToShow:"number",arrowColor:"object",dotColor:"object",isVertical:"boolean"};return class{constructor(s){try{if("id"in s==0)throw new Error("Must include prop `id`");Object.keys(s).forEach(t=>{const i=e[t],n=typeof s[t];if(void 0===i)throw new Error(`Invalid propName: \`${t}\` is undefined`);if(n!==i)throw new Error(`Invalid propType for \`${t}\`: expected type \n\`${i}\`, received \`${n}\``)}),this.settings={...t,...s},this.state={activeSlide:0,slidesTotal:0,skipTransition:!1,isAnimating:!1,startX:null,startY:null,intervalID:null},this.elem=i(`#${s.id}`)}catch(t){console.error(t.message)}this.swipeMove=this.swipeMove.bind(this),this.swipeStart=this.swipeStart.bind(this),this.swipeEnd=this.swipeEnd.bind(this),this.resizeSlider=this.resizeSlider.bind(this),this.init()}get slides(){return n(".slider__slide",this.elem)}get sliderInner(){return i(".slider__inner",this.elem)}init(){this.setState({slidesTotal:this.slides.length}),this.initSliderInner(),this.settings.onInfiniteLoop&&(this.setState({activeSlide:1}),this.initInfiniteLoop()),this.settings.showArrows&&this.mountArrows(),this.settings.showDots&&this.mountDots(),this.sliderInner.addEventListener(o(),this.swipeStart),window.addEventListener("resize",function(t,e=250){let s;return function(...i){s&&clearTimeout(s),s=setTimeout(()=>{t(...i),s=null},e)}}(this.resizeSlider,250)),this.settings.onAutoplay&&this.beginAutoplay()}setState(t){this.state={...this.state,...t}}beginAutoplay(){const t=this.state.intervalID,e=this.settings.autoplaySpeed;t&&clearInterval(t),this.setState({intervalID:setInterval(()=>{const t=this.state.activeSlide,e=t!==this.slides.length-1?t+1:0;this.setActiveSlide(e)},e)})}initSliderInner(){const{onInfiniteLoop:t}=this.settings,e=t?this.slides.length+2:this.slides.length;this.settings.isVertical?(this.elem.classList.add("is-vertical"),this.sliderInner.style.height=`${100*e}%`,this.sliderInner.style.top="-100%"):(this.sliderInner.style.width=`${100*e}%`,this.sliderInner.style.left="-100%")}initInfiniteLoop(){const t=this.slides[0].cloneNode(!0),e=this.slides[this.slides.length-1].cloneNode(!0);this.sliderInner.appendChild(t),this.sliderInner.insertBefore(e,this.sliderInner.firstElementChild),this.sliderInner.addEventListener("transitionend",()=>{const t=this.state.activeSlide,e=this.slides.length-1;if(0!==t&&t!==e)return;this.setState({skipTransition:!0});const s=0===t?e-1:1;this.setActiveSlide(s)})}mountArrows(){const t=r("button",{className:"slider__arrow slider__arrow--next",type:"button","data-slide-change":"1"},r("span",{className:"slider__chevron-icon slider__chevron-icon--next"})),e=r("button",{className:"slider__arrow slider__arrow--prev",type:"button","data-slide-change":"-1"},r("span",{className:"slider__chevron-icon slider__chevron-icon--prev"})),s=r("div",{className:"slider__arrows"},e,t);s.addEventListener("click",t=>{if(!t.target.matches(".slider__arrow"))return;const e=this.state.activeSlide+parseInt(t.target.dataset.slideChange);e<0||e>this.slides.length-1||(this.setActiveSlide(e),this.settings.onAutoplay&&this.beginAutoplay())}),this.elem.appendChild(s)}mountDots(){const t=r("ul",{className:"slider__dots"});this.settings.id;for(let e=0;e<this.state.slidesTotal;e++){const s=r("li",{className:`slider__dot${0===e?" is-active":""}`,"data-index":e});t.appendChild(s)}t.addEventListener("click",t=>{if(!t.target.matches(".slider__dot"))return;const e=+t.target.dataset.index+1;this.setActiveSlide(e),this.settings.onAutoplay&&this.beginAutoplay()}),this.elem.appendChild(t)}slide(t=0){const{isVertical:e}=this.settings,s=e?this.slides[0].offsetHeight:this.slides[0].offsetWidth,i=this.state.activeSlide*-s,n=e?"top":"left";this.state.skipTransition?(this.sliderInner.classList.add("no-transition"),this.setState({skipTransition:!1})):this.sliderInner.matches(".no-transition")&&this.sliderInner.classList.remove("no-transition"),this.sliderInner.style[n]=`${i+t}px`}swipeStart(t){if(this.state.isAnimating)return;const e="touchstart"!==t.type?t:t.targetTouches[0]||t.changedTouches[0];switch(this.setState({startX:e.pageX,startY:e.pageY,isAnimating:!0}),t.type){case"mousedown":this.sliderInner.addEventListener("mousemove",this.swipeMove),this.sliderInner.addEventListener("mouseleave",this.swipeEnd),this.sliderInner.addEventListener("mouseup",this.swipeEnd);break;case"touchstart":this.sliderInner.addEventListener("touchmove",this.swipeMove),this.sliderInner.addEventListener("touchend",this.swipeEnd)}}swipeMove(t){t.preventDefault();const e="touchmove"!==t.type?t:t.targetTouches[0]||t.changedTouches[0],s=e.pageX,i=e.pageY,{startX:n,startY:r}=this.state;this.settings.isVertical?this.slide(i-r):this.slide(s-n)}swipeEnd(t){const e="touchmove"!==t.type?t:t.targetTouches[0]||t.changedTouches[0],{startX:s,startY:i}=this.state,n=e.pageX-s,r=e.pageY-i;if(this.settings.isVertical?Math.abs(r)>=40:Math.abs(n)>=40){const t=n>0?--this.state.activeSlide:++this.state.activeSlide;this.setActiveSlide(t),this.settings.onAutoplay&&this.beginAutoplay()}else this.slide();switch(t.type){case"mouseleave":case"mouseup":this.sliderInner.removeEventListener("mousemove",this.swipeMove),this.sliderInner.removeEventListener("mouseup",this.swipeEnd),this.sliderInner.removeEventListener("mouseleave",this.swipeEnd);break;case"touchend":this.sliderInner.removeEventListener("touchmove",this.swipeMove),this.sliderInner.removeEventListener("touchend",this.swipeEnd)}this.setState({startX:null,startY:null,isAnimating:!1})}resizeSlider(){this.slide()}setActiveSlide(t){this.setState({activeSlide:t}),this.updateView()}updateView(){const t=this.settings.onInfiniteLoop?this.state.activeSlide-1:this.state.activeSlide,e=this.settings.showDots;if(this.slide(),e){const e=i(".slider__dot.is-active",this.elem),s=n(".slider__dot",this.elem)[t];e&&e.classList.remove("is-active"),s&&s.classList.add("is-active")}}}}();s(1),s(4);new a({id:"sliderDefault"}),new a({id:"sliderVertical",isVertical:!0}),new a({id:"sliderAutoplay",onAutoplay:!0})}]);