/*! For license information please see 207.a97b2250.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[207],{7348:function(t,e,n){var r=n(4165),o=n(5861),a=n(9439),i=n(2791);e.Z=function(){var t=(0,i.useState)(!1),e=(0,a.Z)(t,2),n=e[0],s=e[1],c=(0,i.useState)(null),u=(0,a.Z)(c,2),l=u[0],h=u[1],f=(0,i.useRef)([]),d=(0,i.useCallback)(function(){var t=(0,o.Z)((0,r.Z)().mark((function t(e){var n,o,a,i,c,u,l,d=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:"GET",o=d.length>2&&void 0!==d[2]?d[2]:null,a=d.length>3&&void 0!==d[3]?d[3]:{},s(!0),h(null),i=new AbortController,f.current.push(i),t.prev=7,t.next=10,fetch(e,{method:n,body:o,headers:a,signal:i.signal});case 10:return c=t.sent,t.next=13,c.json();case 13:if(u=t.sent,f.current=f.current.filter((function(t){return t!==i})),c.ok){t.next=19;break}throw(l=new Error(u.message||"Request failed")).response=u,l;case 19:return s(!1),t.abrupt("return",u);case 23:throw t.prev=23,t.t0=t.catch(7),s(!1),h(t.t0),t.t0;case 28:case"end":return t.stop()}}),t,null,[[7,23]])})));return function(e){return t.apply(this,arguments)}}(),[]);return(0,i.useEffect)((function(){return function(){f.current.forEach((function(t){return t.abort()}))}}),[]),{isLoading:n,error:l,sendRequest:d,onCloseError:function(){h(null)}}}},2207:function(t,e,n){n.r(e),n.d(e,{default:function(){return l}});var r=n(4165),o=n(5861),a=n(9439),i=n(2791),s=n(7348),c=n(6852),u=n(184),l=function(){var t=(0,i.useState)(""),e=(0,a.Z)(t,2),n=e[0],l=e[1],h=(0,i.useState)(""),f=(0,a.Z)(h,2),d=f[0],p=f[1],v=(0,i.useState)(""),m=(0,a.Z)(v,2),g=m[0],y=m[1],w=(0,i.useState)("***********"),x=(0,a.Z)(w,2),b=x[0],j=(x[1],(0,i.useState)("")),E=(0,a.Z)(j,2),N=E[0],L=E[1],k=(0,i.useState)(""),Z=(0,a.Z)(k,2),C=Z[0],S=Z[1],O=(0,i.useState)({name:!1,dob:!1,email:!1,password:!1}),_=(0,a.Z)(O,2),P=_[0],G=_[1],T=(0,s.Z)(),F=T.sendRequest,A=(T.isLoading,T.error,T.onCloseError,(0,i.useContext)(c.V));(0,i.useEffect)((function(){B()}),[]);var B=function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,F("http://localhost:5000/api/users/getUserSetting","GET",null,{"Content-Type":"application/json",Authorization:"Bearer "+A.token});case 3:e=t.sent,console.log(e),l(e.name),p(e.DOB),y(e.email),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),R=function(t){G({name:"name"===t,dob:"dob"===t,email:"email"===t,password:"password"===t})},q=function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e,o;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e={name:P.name?n:void 0,dob:P.dob?d:void 0,email:P.email?g:void 0,password:P.password?{oldPassword:N,newPassword:C}:void 0},t.next=4,F("http://localhost:5000/api/users/updateUserSettings","PATCH",JSON.stringify(e),{"Content-Type":"application/json",Authorization:"Bearer "+A.token});case 4:o=t.sent,console.log(o),L(""),S(""),G({name:!1,dob:!1,email:!1,password:!1}),A.logout(),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}();return(0,u.jsxs)("div",{className:"settings-container",children:[(0,u.jsx)("h2",{className:"settings-title",children:"Settings"}),(0,u.jsx)("div",{className:"settings-item",children:(0,u.jsxs)("label",{className:"settings-label",children:["Name:",P.name?(0,u.jsx)("input",{type:"text",value:n,onChange:function(t){l(t.target.value)},className:"settings-input"}):(0,u.jsx)("span",{className:"settings-value",children:n}),!P.name&&(0,u.jsx)("button",{className:"settings-button",onClick:function(){return R("name")},children:"Edit"})]})}),(0,u.jsx)("div",{className:"settings-item",children:(0,u.jsxs)("label",{className:"settings-label",children:["Date of Birth:",P.dob?(0,u.jsx)("input",{type:"text",value:d,onChange:function(t){p(t.target.value)},className:"settings-input"}):(0,u.jsx)("span",{className:"settings-value",children:d}),!P.dob&&(0,u.jsx)("button",{className:"settings-button",onClick:function(){return R("dob")},children:"Edit"})]})}),(0,u.jsx)("div",{className:"settings-item",children:(0,u.jsxs)("label",{className:"settings-label",children:["Email:",P.email?(0,u.jsx)("input",{type:"email",value:g,onChange:function(t){y(t.target.value)},className:"settings-input"}):(0,u.jsx)("span",{className:"settings-value",children:g}),!P.email&&(0,u.jsx)("button",{className:"settings-button",onClick:function(){return R("email")},children:"Edit"})]})}),(0,u.jsx)("div",{className:"settings-item",children:(0,u.jsxs)("label",{className:"settings-label",children:["Password:",P.password?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("input",{type:"password",value:N,onChange:function(t){L(t.target.value)},className:"settings-input",placeholder:"Enter old password"}),(0,u.jsx)("input",{type:"password",value:C,onChange:function(t){S(t.target.value)},className:"settings-input",placeholder:"Enter new password"})]}):(0,u.jsx)("span",{className:"settings-value",children:b}),!P.password&&(0,u.jsx)("button",{className:"settings-button",onClick:function(){return R("password")},children:"Edit"})]})}),(0,u.jsx)("div",{className:"settings-actions",children:P.name||P.dob||P.email||P.password?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("button",{className:"settings-submit",onClick:q,children:"Submit"}),(0,u.jsx)("button",{className:"settings-cancel",onClick:function(){L(""),S(""),G({name:!1,dob:!1,email:!1,password:!1})},children:"Cancel"})]}):null})]})}},5861:function(t,e,n){function r(t,e,n,r,o,a,i){try{var s=t[a](i),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function s(t){r(i,o,a,s,c,"next",t)}function c(t){r(i,o,a,s,c,"throw",t)}s(void 0)}))}}n.d(e,{Z:function(){return o}})},4165:function(t,e,n){n.d(e,{Z:function(){return o}});var r=n(1002);function o(){o=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(O){l=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),s=new Z(r||[]);return a(i,"_invoke",{value:E(t,n,s)}),i}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(O){return{type:"throw",arg:O}}}t.wrap=h;var d={};function p(){}function v(){}function m(){}var g={};l(g,s,(function(){return this}));var y=Object.getPrototypeOf,w=y&&y(y(C([])));w&&w!==e&&n.call(w,s)&&(g=w);var x=m.prototype=p.prototype=Object.create(g);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function o(a,i,s,c){var u=f(t[a],t,i);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==(0,r.Z)(h)&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(h).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var i;a(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}})}function E(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return S()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var s=N(i,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=f(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function N(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,N(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var o=f(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Z(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function C(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return v.prototype=m,a(x,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},b(j.prototype),l(j.prototype,c,(function(){return this})),t.AsyncIterator=j,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new j(h(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(x),l(x,u,"Generator"),l(x,s,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=C,Z.prototype={constructor:Z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:C(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},t}}}]);
//# sourceMappingURL=207.a97b2250.chunk.js.map