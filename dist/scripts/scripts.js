"use strict";angular.module("socialPlaygroundWebsiteApp",["ngTouch","svg-fallback"]).config(["$interpolateProvider",function(a){a.startSymbol("{%"),a.endSymbol("%}")}]),angular.module("socialPlaygroundWebsiteApp").controller("MainCtrl",["$scope","$http","param",function(a,b,c){a.device={ios:navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1},a.window={width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,offsetY:window.pageYOffset||document.documentElement.scrollTop,docHeight:document.documentElement.scrollHeight||document.body.scrollHeight},a.menu={visible:!1},a.signupData={},a.signup=function(d){a.signupForm.clicked=!0,a.signupForm.$invalid||(a.signupForm.submitting=!0,a.signupData=angular.copy(d),b({method:"POST",url:"/server/signup.php",data:c(a.signupData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(b){a.signupForm.clicked=!1,a.signupForm.submitting=!1,b.success?(a.signupForm.response=b.response,a.signupFields={}):"undefined"!=typeof b.errors?a.signupForm.errorEmail=b.errors.email:a.signupForm.response=b.response}))},a.contactData={},a.contact=function(d){a.contactForm.clicked=!0,a.contactForm.$invalid||(a.contactForm.submitting=!0,a.contactData=angular.copy(d),b({method:"POST",url:"/server/contact.php",data:c(a.contactData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(b){a.contactForm.clicked=!1,a.contactForm.submitting=!1,b.success?(a.contactForm.response=b.response,a.contactFields={}):(a.contactForm.errorName=b.errors.name,a.contactForm.errorEmail=b.errors.email,a.contactForm.errorPhone=b.errors.phone,a.contactForm.errorSubject=b.errors.subject,a.contactForm.errorMessage=b.errors.message)}))},a.bookData={},a.book=function(d){a.bookForm.clicked=!0,a.bookForm.$invalid||(a.bookForm.submitting=!0,a.bookData=angular.copy(d),b({method:"POST",url:"/server/book.php",data:c(a.bookData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(b){a.bookForm.clicked=!1,a.bookForm.submitting=!1,b.success?(a.bookForm.response=b.response,a.bookFields={}):(a.bookForm.errorName=b.errors.name,a.bookForm.errorEmail=b.errors.email,a.bookForm.errorPhone=b.errors.phone,a.bookForm.errorSubject=b.errors.subject,a.bookForm.errorMessage=b.errors.message)}))}}]),angular.module("socialPlaygroundWebsiteApp").factory("param",function(){var a=[],b={},c=/%20/g,d=b.toString,e=function(a){return null===a?a+"":"object"==typeof a||"function"==typeof a?b[d.call(a)]||"object":typeof a},f=function(a){return"function"===e(a)},g=function(b,c){c=f(c)?c():c,a[a.length]=encodeURIComponent(b)+"="+encodeURIComponent(c)};return function(b){return angular.forEach(b,function(a,b){g(b,a)}),a.join("&").replace(c,"+")}}),angular.module("socialPlaygroundWebsiteApp").factory("throttle",["$timeout",function(a){var b,c=0;return function(d,e,f,g){"boolean"!=typeof e&&(g=f,f=e,e=void 0);var h=this,i=+new Date-c,j=arguments,k=function(){c=+new Date,f.apply(h,j)},l=function(){b=void 0};g&&!b&&k(),b&&a.cancel(b),void 0===g&&i>d?k():e!==!0&&(b=a(g?l:k,void 0===g?d-i:d))}}]),angular.module("socialPlaygroundWebsiteApp").directive("page",["$timeout","throttle",function(a){return{link:function(b){var c=angular.element(window),d=function(){b.window.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b.window.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,b.window.docHeight=document.documentElement.scrollHeight||document.body.scrollHeight,b.$$phase||b.$apply()},e=function(){b.window.offsetY=window.pageYOffset||document.documentElement.scrollTop,b.window.height>430&&(b.menu.visible=!1),b.$$phase||b.$apply()},f=function(){a(function(){b.window.docHeight=document.documentElement.scrollHeight||document.body.scrollHeight,b.$$phase||b.$apply()},0)};c.bind("resize",d),c.bind("scroll",e),b.$watch("contactFormStatus.visible",f)}}}]),angular.module("socialPlaygroundWebsiteApp").directive("menu",function(){return{link:function(a,b){var c=b.find("a");angular.forEach(c,function(a){var b=angular.element(a),d=b.attr("href").replace("/","");d=d.length?d:"#home",d===window.location.hash?b.addClass("active"):b.removeClass("active");var e=document.querySelector(d);null!==e&&b.bind("click",function(a){a.preventDefault(),c.removeClass("active"),b.addClass("active"),TweenLite.to(window,1,{scrollTo:{y:e.offsetTop},ease:Quint.easeInOut,onComplete:function(){window.location.hash=d}})})})}}}),angular.module("socialPlaygroundWebsiteApp").directive("section",function(){return{link:function(a,b){var c,d,e,f=function(a){var b=0;do isNaN(a.offsetTop)||(b+=a.offsetTop);while(a=a.offsetParent);return b},g=function(){var a=b[0],e=Math.max(a.scrollHeight,a.offsetHeight);c=f(a),d=c+e};g();var h=function(f){var g;e=b.attr("id"),g=angular.element(document.querySelector("#link-"+e)),f+a.window.height>=a.window.docHeight?"partners"===e?g.addClass("active"):g.removeClass("active"):f>=c&&d>f?g.addClass("active"):g.removeClass("active")};a.$watch("window.height",g),a.$watch("window.offsetY",h)}}}),angular.module("socialPlaygroundWebsiteApp").directive("carousel",["$swipe",function(a){var b={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"},c=b[Modernizr.prefixed("animation")],d=Modernizr.cssanimations;return{restrict:"A",scope:{},controller:["$scope",function(a){a.carouselStatus={activeIndex:0,maxIndex:0,animating:!1,outgoingAnimationEnd:!1,incomingAnimationEnd:!1,direction:null}}],link:function(b,e,f){var g=e.children().children();b.carouselStatus.maxIndex=g.length-1;var h=function(){b.carouselStatus.animating||(b.carouselStatus.activeIndex>0?b.carouselStatus.activeIndex-=1:b.carouselStatus.activeIndex=b.carouselStatus.maxIndex,b.carouselStatus.direction="right"),b.$$phase||b.$apply()},i=function(){b.carouselStatus.animating||(b.carouselStatus.activeIndex<b.carouselStatus.maxIndex?b.carouselStatus.activeIndex+=1:b.carouselStatus.activeIndex=0,b.carouselStatus.direction="left",b.$$phase||b.$apply())};if(angular.forEach(g,function(a,b){var c=angular.element(a);0===b&&c.addClass("visible-item"),g[b]=c}),g.length>1){var j=angular.element('<div class="carousel-nav"></div>');if("false"!==f.prevNext){var k=angular.element('<button class="carousel-prev icon-arrow-left"><span class="carousel-prev-text">Prev</span></button>'),l=angular.element('<button class="carousel-next icon-arrow-right"><span class="carousel-next-text">Next</span></button>');e.append(k),e.append(l),k.bind("click",function(a){h(),a.preventDefault()}),l.bind("click",function(a){i(),a.preventDefault()})}if("false"!==f.page){var m=angular.element('<span class="carousel-page"></span>'),n=[];angular.forEach(g,function(a,c){var d=angular.element('<button class="carousel-page-trigger"><span class="carousel-page-trigger-text">'+(c+1)+"</span></button>");c===b.carouselStatus.activeIndex&&d.addClass("active"),d.bind("click",function(a){a.preventDefault(),b.carouselStatus.animating||(b.carouselStatus.direction=c>b.carouselStatus.activeIndex?"left":"right",b.carouselStatus.activeIndex=c,b.$$phase||b.$apply())}),m.append(d),n.push(d)}),b.$watch("carouselStatus.activeIndex",function(a){angular.forEach(n,function(b,c){c===a?b.addClass("active"):b.removeClass("active")})}),j.append(m)}e.append(j)}var o,p,q=75,r=.3,s=30,t=function(a,b){if(!o)return!1;var c=Math.abs(a.y-o.y),d=(a.x-o.x)*b;return p&&q>c&&d>0&&d>s&&r>c/d};a.bind(e,{start:function(a){o=a,p=!0},cancel:function(){p=!1},end:function(a){a.x-o.x<0?t(a,-1)&&i():a.x-o.x>0&&t(a,1)&&h()}});var u=function(a,c,e,f,g,h){b.carouselStatus.animating=!1,b.carouselStatus.outgoingAnimationEnd=!1,b.carouselStatus.incomingAnimationEnd=!1,!b.$$phase&&d&&b.$apply(),c.removeClass(f+" visible-item"),a.removeClass(e).addClass("visible-item"),Math.abs(g-h)&&v(b.carouselStatus.direction,g,h)},v=function(a,e,f){b.carouselStatus.animating=!0;var h,i,j,j=e;"left"===a?(i="animate-slide-moveToLeft",h="animate-slide-moveFromRight",e>f&&(j=f+1)):(i="animate-slide-moveToRight",h="animate-slide-moveFromLeft",f>e&&(j=f-1));var k=g[j],l=g[f];d?(k.addClass("visible-item "+h).on(c,function(){k.off(c),b.carouselStatus.incomingAnimationEnd=!0,b.carouselStatus.outgoingAnimationEnd&&u(k,l,h,i,e,j)}),l.addClass(i).on(c,function(){l.off(c),b.carouselStatus.outgoingAnimationEnd=!0,b.carouselStatus.incomingAnimationEnd&&u(k,l,h,i,e,j)})):u(k,l,h,i,e,j)};b.$watch("carouselStatus.activeIndex",function(a,c){a!==c&&v(b.carouselStatus.direction,a,c)})}}}]),angular.module("socialPlaygroundWebsiteApp").directive("fullHeight",function(){return{link:function(a,b){var c=function(){b.css("height",a.window.height+"px")};c(),a.$watch("window.height",c)}}}),angular.module("socialPlaygroundWebsiteApp").directive("toggleForm",function(){return{link:function(a,b,c){a.$watch(c.toggleForm,function(c){if(c===!0){var d=b[0].getBoundingClientRect().top;d>0&&TweenLite.to(window,1,{scrollTo:a.window.offsetY+b[0].getBoundingClientRect().top,ease:Quint.easeInOut})}})}}}),angular.module("socialPlaygroundWebsiteApp").directive("placeholder",["$timeout",function(a){var b="#fff",c="20px/20px 'gotham_bookregular', sans-serif",d="uppercase";return{require:"ngModel",link:function(e,f,g,h){function i(a){l.activeElement!==m&&(""===a||a===g.placeholderFallback)&&(m.value=g.placeholderFallback,m.style.color=b,m.style.font=c,m.style.textTransform=d)}function j(){m.value==g.placeholderFallback&&(m.value="",m.style.color="",m.style.textTransform="none")}function k(){""===m.value&&(m.value=g.placeholderFallback,m.style.color=b,m.style.font=c,m.style.textTransform=d)}var l=window.document,m=f[0];if(("TEXTAREA"===m.nodeName||"INPUT"===m.nodeName)&&"password"!==g.type){var n="placeholder"in l.createElement("input"),o="placeholder"in l.createElement("textarea");if(n&&o)return void a(function(){f.attr("placeholder",g.placeholderFallback)});a(function(){i(m.value)}),e.$watch(function(){return h.$modelValue},function(a){i(a)}),f.bind("focus",j),f.bind("blur",k),e.$on("$destroy",function(){f.unbind("focus",j),f.unbind("blur",k)})}}}}]);