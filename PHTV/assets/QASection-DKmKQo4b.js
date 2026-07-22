import{j as e,I as t}from"./index-7LFiJrdC.js";import{x as n}from"./vendor-DCBwEEw2.js";var i={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&i+1<e.length&&56320==(64512&e.charCodeAt(i+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++i)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},r={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<e.length;s+=3){const t=e[s],r=s+1<e.length,o=r?e[s+1]:0,a=s+2<e.length,c=a?e[s+2]:0,l=t>>2,u=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,r||(h=64)),i.push(n[l],n[u],n[h],n[d])}return i.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,i=0;for(;n<e.length;){const s=e[n++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=e[n++];t[i++]=String.fromCharCode((31&s)<<6|63&r)}else if(s>239&&s<365){const r=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[i++]=String.fromCharCode(55296+(r>>10)),t[i++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[i++]=String.fromCharCode((15&s)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<e.length;){const t=n[e.charAt(s++)],r=s<e.length?n[e.charAt(s)]:0;++s;const a=s<e.length?n[e.charAt(s)]:64;++s;const c=s<e.length?n[e.charAt(s)]:64;if(++s,null==t||null==r||null==a||null==c)throw new o;const l=t<<2|r>>4;if(i.push(l),64!==a){const e=r<<4&240|a>>2;if(i.push(e),64!==c){const e=a<<6&192|c;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class o extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const a=function(e){return function(e){const t=s(e);return r.encodeByteArray(t,!0)}(e).replace(/\./g,"")},c=function(e){try{return r.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const l=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,u=()=>{try{return l()||(()=>{if("undefined"==typeof process)return;const e=i.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&c(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(e))}},h=e=>{var t,n;return null==(n=null==(t=u())?void 0:t.emulatorHosts)?void 0:n[e]},d=()=>{var e;return null==(e=u())?void 0:e.config},f=e=>{var t;return null==(t=u())?void 0:t["_".concat(e)]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class p{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch(t){return!1}}async function g(e){return(await fetch(e,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y={};let v=!1;function w(e,t){if("undefined"==typeof window||"undefined"==typeof document||!m(window.location.host)||y[e]===t||y[e]||v)return;function n(e){return"__firebase__banner__".concat(e)}y[e]=t;const i="__firebase__banner",s=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(y))y[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function r(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{v=!0,function(){const e=document.getElementById(i);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(i),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),l=n("preprendIcon"),u=document.getElementById(l)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=r();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(u,l),t.append(u,o,c,n),document.body.appendChild(t)}s?(o.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function _(){return!function(){var e;const t=null==(e=u())?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function T(){try{return"object"==typeof indexedDB}catch(e){return!1}}function I(){return new Promise((e,t)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var e;t((null==(e=s.error)?void 0:e.message)||"")}}catch(n){t(n)}})}class x extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,x.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,E.prototype.create)}}class E{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i="".concat(this.service,"/").concat(e),s=this.errors[e],r=s?function(e,t){return e.replace(S,(e,n)=>{const i=t[n];return null!=i?String(i):"<".concat(n,"?>")})}(s,n):"Error",o="".concat(this.serviceName,": ").concat(r," (").concat(i,").");return new x(i,o,n)}}const S=/\{\$([^}]+)}/g;function k(e,t){if(e===t)return!0;const n=Object.keys(e),i=Object.keys(t);for(const s of n){if(!i.includes(s))return!1;const n=e[s],r=t[s];if(C(n)&&C(r)){if(!k(n,r))return!1}else if(n!==r)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function C(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){const t=[];for(const[n,i]of Object.entries(e))Array.isArray(i)?i.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}class A{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");i=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===i.next&&(i.next=D),void 0===i.error&&(i.error=D),void 0===i.complete&&(i.complete=D);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(e){}}),this.observers.push(i),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function D(){}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e){return e&&e._delegate?e._delegate:e}class P{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new p;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),i=null!=(t=null==e?void 0:e.optional)&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(i)return null;throw Error("Service ".concat(this.name," is not available"))}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error("Mismatching Component ".concat(e.name," for Provider ").concat(this.name,"."));if(this.component)throw Error("Component for ".concat(this.name," has already been provided"));if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:O})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:i});n.resolve(e)}catch(t){}}}}clearInstance(e=O){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=O){return this.instances.has(e)}getOptions(e=O){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error("".concat(this.name,"(").concat(n,") has already been initialized"));if(!this.isComponentSet())throw Error("Component ".concat(this.name," has not been registered yet"));const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,r]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&r.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=null!=(n=this.onInitCallbacks.get(i))?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch(i){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(i=e,i===O?void 0:i),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(s){}var i;return n||null}normalizeInstanceIdentifier(e=O){return this.component?this.component.multipleInstances?e:O:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class M{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component ".concat(e.name," has already been registered with ").concat(this.name));t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new L(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j,V;(V=j||(j={}))[V.DEBUG=0]="DEBUG",V[V.VERBOSE=1]="VERBOSE",V[V.INFO=2]="INFO",V[V.WARN=3]="WARN",V[V.ERROR=4]="ERROR",V[V.SILENT=5]="SILENT";const U={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},F=j.INFO,q={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},B=(e,t,...n)=>{if(t<e.logLevel)return;const i=(new Date).toISOString(),s=q[t];if(!s)throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t,")"));console[s]("[".concat(i,"]  ").concat(e.name,":"),...n)};class z{constructor(e){this.name=e,this._logLevel=F,this._logHandler=B,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?U[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}let H,K;const G=new WeakMap,W=new WeakMap,Q=new WeakMap,X=new WeakMap,J=new WeakMap;let Y={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return W.get(e);if("objectStoreNames"===t)return e.objectStoreNames||Q.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ee(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Z(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(K||(K=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(te(this),t),ee(G.get(this))}:function(...t){return ee(e.apply(te(this),t))}:function(t,...n){const i=e.call(te(this),t,...n);return Q.set(i,t.sort?t.sort():[t]),ee(i)}}function $(e){return"function"==typeof e?Z(e):(e instanceof IDBTransaction&&function(e){if(W.has(e))return;const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",r),e.removeEventListener("abort",r)},s=()=>{t(),i()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",s),e.addEventListener("error",r),e.addEventListener("abort",r)});W.set(e,t)}(e),t=e,(H||(H=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,Y):e);var t}function ee(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("success",s),e.removeEventListener("error",r)},s=()=>{t(ee(e.result)),i()},r=()=>{n(e.error),i()};e.addEventListener("success",s),e.addEventListener("error",r)});return t.then(t=>{t instanceof IDBCursor&&G.set(t,e)}).catch(()=>{}),J.set(t,e),t}(e);if(X.has(e))return X.get(e);const t=$(e);return t!==e&&(X.set(e,t),J.set(t,e)),t}const te=e=>J.get(e);function ne(e,t,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(e,t),a=ee(o);return i&&o.addEventListener("upgradeneeded",e=>{i(ee(o.result),e.oldVersion,e.newVersion,ee(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{r&&e.addEventListener("close",()=>r()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}function ie(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",e=>t(e.oldVersion,e)),ee(n).then(()=>{})}const se=["get","getKey","getAll","getAllKeys","count"],re=["put","add","delete","clear"],oe=new Map;function ae(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(oe.get(t))return oe.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,s=re.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!s&&!se.includes(n))return;const r=async function(e,...t){const r=this.transaction(e,s?"readwrite":"readonly");let o=r.store;return i&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),s&&r.done]))[0]};return oe.set(t,r),r}Y=(e=>({...e,get:(t,n,i)=>ae(t,n)||e.get(t,n,i),has:(t,n)=>!!ae(t,n)||e.has(t,n)}))(Y);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ce{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return"".concat(t.library,"/").concat(t.version)}return null}).filter(e=>e).join(" ")}}const le="@firebase/app",ue="0.14.6",he=new z("@firebase/app"),de="@firebase/app-compat",fe="@firebase/analytics-compat",pe="@firebase/analytics",me="@firebase/app-check-compat",ge="@firebase/app-check",ye="@firebase/auth",ve="@firebase/auth-compat",we="@firebase/database",be="@firebase/data-connect",_e="@firebase/database-compat",Te="@firebase/functions",Ie="@firebase/functions-compat",xe="@firebase/installations",Ee="@firebase/installations-compat",Se="@firebase/messaging",ke="@firebase/messaging-compat",Ce="@firebase/performance",Ne="@firebase/performance-compat",Ae="@firebase/remote-config",De="@firebase/remote-config-compat",Re="@firebase/storage",Pe="@firebase/storage-compat",Oe="@firebase/firestore",Le="@firebase/ai",Me="@firebase/firestore-compat",je="firebase",Ve="[DEFAULT]",Ue={[le]:"fire-core",[de]:"fire-core-compat",[pe]:"fire-analytics",[fe]:"fire-analytics-compat",[ge]:"fire-app-check",[me]:"fire-app-check-compat",[ye]:"fire-auth",[ve]:"fire-auth-compat",[we]:"fire-rtdb",[be]:"fire-data-connect",[_e]:"fire-rtdb-compat",[Te]:"fire-fn",[Ie]:"fire-fn-compat",[xe]:"fire-iid",[Ee]:"fire-iid-compat",[Se]:"fire-fcm",[ke]:"fire-fcm-compat",[Ce]:"fire-perf",[Ne]:"fire-perf-compat",[Ae]:"fire-rc",[De]:"fire-rc-compat",[Re]:"fire-gcs",[Pe]:"fire-gcs-compat",[Oe]:"fire-fst",[Me]:"fire-fst-compat",[Le]:"fire-vertex","fire-js":"fire-js",[je]:"fire-js-all"},Fe=new Map,qe=new Map,Be=new Map;function ze(e,t){try{e.container.addComponent(t)}catch(n){he.debug("Component ".concat(t.name," failed to register with FirebaseApp ").concat(e.name),n)}}function He(e){const t=e.name;if(Be.has(t))return he.debug("There were multiple attempts to register component ".concat(t,".")),!1;Be.set(t,e);for(const n of Fe.values())ze(n,e);for(const n of qe.values())ze(n,e);return!0}function Ke(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ge(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We=new E("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qe{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new P("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="12.6.0";function Je(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i={name:Ve,automaticDataCollectionEnabled:!0,...t},s=i.name;if("string"!=typeof s||!s)throw We.create("bad-app-name",{appName:String(s)});if(n||(n=d()),!n)throw We.create("no-options");const r=Fe.get(s);if(r){if(k(n,r.options)&&k(i,r.config))return r;throw We.create("duplicate-app",{appName:s})}const o=new M(s);for(const c of Be.values())o.addComponent(c);const a=new Qe(n,i,o);return Fe.set(s,a),a}function Ye(e=Ve){const t=Fe.get(e);if(!t&&e===Ve&&d())return Je();if(!t)throw We.create("no-app",{appName:e});return t}function Ze(e,t,n){var i;let s=null!=(i=Ue[e])?i:e;n&&(s+="-".concat(n));const r=s.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=['Unable to register library "'.concat(s,'" with version "').concat(t,'":')];return r&&e.push('library name "'.concat(s,'" contains illegal characters (whitespace or "/")')),r&&o&&e.push("and"),o&&e.push('version name "'.concat(t,'" contains illegal characters (whitespace or "/")')),void he.warn(e.join(" "))}He(new P("".concat(s,"-version"),()=>({library:s,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="firebase-heartbeat-store";let et=null;function tt(){return et||(et=ne("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore($e)}catch(n){console.warn(n)}}}).catch(e=>{throw We.create("idb-open",{originalErrorMessage:e.message})})),et}async function nt(e,t){try{const n=(await tt()).transaction($e,"readwrite"),i=n.objectStore($e);await i.put(t,it(e)),await n.done}catch(n){if(n instanceof x)he.warn(n.message);else{const e=We.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});he.warn(e.message)}}}function it(e){return"".concat(e.name,"!").concat(e.options.appId)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ot(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=rt();if(null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null==(t=this._heartbeatsCache)?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(e=>e.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let i=1;i<e.length;i++)e[i].date<n&&(n=e[i].date,t=i);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){he.warn(n)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=rt(),{heartbeatsToSend:n,unsentEntries:i}=function(e,t=1024){const n=[];let i=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),at(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),at(n)>t){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}(this._heartbeatsCache.heartbeats),s=a(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return he.warn(t),""}}}function rt(){return(new Date).toISOString().substring(0,10)}class ot{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!T()&&I().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await tt()).transaction($e),n=await t.objectStore($e).get(it(e));return await t.done,n}catch(t){if(t instanceof x)he.warn(t.message);else{const e=We.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});he.warn(e.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return nt(this.app,{lastSentHeartbeatDate:null!=(t=e.lastSentHeartbeatDate)?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return nt(this.app,{lastSentHeartbeatDate:null!=(t=e.lastSentHeartbeatDate)?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function at(e){return a(JSON.stringify({version:2,heartbeats:e})).length}var ct;ct="",He(new P("platform-logger",e=>new ce(e),"PRIVATE")),He(new P("heartbeat",e=>new st(e),"PRIVATE")),Ze(le,ue,ct),Ze(le,ue,"esm2020"),Ze("fire-js","");function lt(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ze("firebase","12.7.0","app");const ut=lt,ht=new E("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),dt=new z("@firebase/auth");function ft(e,...t){dt.logLevel<=j.ERROR&&dt.error("Auth (".concat(Xe,"): ").concat(e),...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(e,...t){throw vt(e,...t)}function mt(e,...t){return vt(e,...t)}function gt(e,t,n){const i={...ut(),[t]:n};return new E("auth","Firebase",i).create(t,{appName:e.name})}function yt(e){return gt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vt(e,...t){if("string"!=typeof e){const n=t[0],i=[...t.slice(1)];return i[0]&&(i[0].appName=e.name),e._errorFactory.create(n,...i)}return ht.create(e,...t)}function wt(e,t,...n){if(!e)throw vt(t,...n)}function bt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ft(t),new Error(t)}function _t(e,t){e||bt(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.href)||""}function It(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==It()&&"https:"!==It()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Et{constructor(e,t){this.shortDelay=e,this.longDelay=t,_t(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return xt()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(e,t){_t(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?"".concat(n).concat(t.startsWith("/")?t.slice(1):t):n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Nt=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],At=new Et(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Rt(e,t,n,i,s={}){return Pt(e,s,async()=>{let s={},r={};i&&("GET"===t?r=i:s={body:JSON.stringify(i)});const o=N({key:e.config.apiKey,...r}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...s};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&m(e.emulatorConfig.host)&&(c.credentials="include"),kt.fetch()(await Ot(e,e.config.apiHost,n,o),c)})}async function Pt(e,t,n){e._canInitEmulator=!1;const i={...Ct,...t};try{const t=new Lt(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const r=await s.json();if("needConfirmation"in r)throw Mt(e,"account-exists-with-different-credential",r);if(s.ok&&!("errorMessage"in r))return r;{const t=s.ok?r.errorMessage:r.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Mt(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===n)throw Mt(e,"email-already-in-use",r);if("USER_DISABLED"===n)throw Mt(e,"user-disabled",r);const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw gt(e,a,o);pt(e,a)}}catch(s){if(s instanceof x)throw s;pt(e,"network-request-failed",{message:String(s)})}}async function Ot(e,t,n,i){const s="".concat(t).concat(n,"?").concat(i),r=e,o=r.config.emulator?St(e.config,s):"".concat(e.config.apiScheme,"://").concat(s);if(Nt.includes(n)&&(await r._persistenceManagerAvailable,"COOKIE"===r._getPersistenceType())){return r._getPersistence()._getFinalTarget(o).toString()}return o}class Lt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(mt(this.auth,"network-request-failed")),At.get())})}}function Mt(e,t,n){const i={appName:e.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=mt(e,t,i);return s.customData._tokenResponse=n,s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jt(e,t){return Rt(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function Ut(e){return 1e3*Number(e)}function Ft(e){const[t,n,i]=e.split(".");if(void 0===t||void 0===n||void 0===i)return ft("JWT malformed, contained fewer than 3 sections"),null;try{const e=c(n);return e?JSON.parse(e):(ft("Failed to decode base64 JWT payload"),null)}catch(s){return ft("Caught error parsing JWT payload as JSON",null==s?void 0:s.toString()),null}}function qt(e){const t=Ft(e);return wt(t,"internal-error"),wt(void 0!==t.exp,"internal-error"),wt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bt(e,t,n=!1){if(n)return t;try{return await t}catch(i){throw i instanceof x&&function({code:e}){return e==="auth/".concat("user-disabled")||e==="auth/".concat("user-token-expired")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(i)&&e.auth.currentUser===e&&await e.auth.signOut(),i}}class zt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!=(t=this.user.stsTokenManager.expirationTime)?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void((null==e?void 0:e.code)==="auth/".concat("network-request-failed")&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vt(this.lastLoginAt),this.creationTime=Vt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kt(e){var t;const n=e.auth,i=await e.getIdToken(),s=await Bt(e,jt(n,{idToken:i}));wt(null==s?void 0:s.users.length,n,"internal-error");const r=s.users[0];e._notifyReloadListener(r);const o=(null==(t=r.providerUserInfo)?void 0:t.length)?Gt(r.providerUserInfo):[],a=(c=e.providerData,l=o,[...c.filter(e=>!l.some(t=>t.providerId===e.providerId)),...l]);var c,l;const u=e.isAnonymous,h=!(e.email&&r.passwordHash||(null==a?void 0:a.length)),d=!!u&&h,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Ht(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(e,f)}function Gt(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){wt(e.idToken,"internal-error"),wt(void 0!==e.idToken,"internal-error"),wt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):qt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){wt(0!==e.length,"internal-error");const t=qt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(wt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await async function(e,t){const n=await Pt(e,{},async()=>{const n=N({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,r=await Ot(e,i,"/v1/token","key=".concat(s)),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&m(e.emulatorConfig.host)&&(a.credentials="include"),kt.fetch()(r,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,r=new Wt;return n&&(wt("string"==typeof n,"internal-error",{appName:e}),r.refreshToken=n),i&&(wt("string"==typeof i,"internal-error",{appName:e}),r.accessToken=i),s&&(wt("number"==typeof s,"internal-error",{appName:e}),r.expirationTime=s),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wt,this.toJSON())}_performRefresh(){return bt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(e,t){wt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Xt{constructor({uid:e,auth:t,stsTokenManager:n,...i}){this.providerId="firebase",this.proactiveRefresh=new zt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ht(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Bt(this,this.stsTokenManager.getToken(this.auth,e));return wt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=R(e),i=await n.getIdToken(t),s=Ft(i);wt(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r="object"==typeof s.firebase?s.firebase:void 0,o=null==r?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:Vt(Ut(s.auth_time)),issuedAtTime:Vt(Ut(s.iat)),expirationTime:Vt(Ut(s.exp)),signInProvider:o||null,signInSecondFactor:(null==r?void 0:r.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=R(e);await Kt(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(wt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){wt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Kt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(yt(this.auth));const e=await this.getIdToken();return await Bt(this,async function(e,t){return Rt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,r,o,a,c,l;const u=null!=(n=t.displayName)?n:void 0,h=null!=(i=t.email)?i:void 0,d=null!=(s=t.phoneNumber)?s:void 0,f=null!=(r=t.photoURL)?r:void 0,p=null!=(o=t.tenantId)?o:void 0,m=null!=(a=t._redirectEventId)?a:void 0,g=null!=(c=t.createdAt)?c:void 0,y=null!=(l=t.lastLoginAt)?l:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:_,stsTokenManager:T}=t;wt(v&&T,e,"internal-error");const I=Wt.fromJSON(this.name,T);wt("string"==typeof v,e,"internal-error"),Qt(u,e.name),Qt(h,e.name),wt("boolean"==typeof w,e,"internal-error"),wt("boolean"==typeof b,e,"internal-error"),Qt(d,e.name),Qt(f,e.name),Qt(p,e.name),Qt(m,e.name),Qt(g,e.name),Qt(y,e.name);const x=new Xt({uid:v,auth:e,email:h,emailVerified:w,displayName:u,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:g,lastLoginAt:y});return _&&Array.isArray(_)&&(x.providerData=_.map(e=>({...e}))),m&&(x._redirectEventId=m),x}static async _fromIdTokenResponse(e,t,n=!1){const i=new Wt;i.updateFromServerResponse(t);const s=new Xt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Kt(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];wt(void 0!==i.localId,"internal-error");const s=void 0!==i.providerUserInfo?Gt(i.providerUserInfo):[],r=!(i.email&&i.passwordHash||(null==s?void 0:s.length)),o=new Wt;o.updateFromIdToken(n);const a=new Xt({uid:i.localId,auth:e,stsTokenManager:o,isAnonymous:r}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ht(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash||(null==s?void 0:s.length))};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Map;function Yt(e){_t(e instanceof Function,"Expected a class definition");let t=Jt.get(e);return t?(_t(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Jt.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zt.type="NONE";const $t=Zt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(e,t,n){return"".concat("firebase",":").concat(e,":").concat(t,":").concat(n)}class tn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=en(this.userKey,i.apiKey,s),this.fullPersistenceKey=en("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await jt(this.auth,{idToken:e}).catch(()=>{});return t?Xt._fromGetAccountInfoResponse(this.auth,t,e):null}return Xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new tn(Yt($t),e,n);const i=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=i[0]||Yt($t);const r=en(n,e.config.apiKey,e.name);let o=null;for(const l of t)try{const t=await l._get(r);if(t){let n;if("string"==typeof t){const i=await jt(e,{idToken:t}).catch(()=>{});if(!i)break;n=await Xt._fromGetAccountInfoResponse(e,i,t)}else n=Xt._fromJSON(e,t);l!==s&&(o=n),s=l;break}}catch(c){}const a=i.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(r,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(r)}catch(c){}})),new tn(s,e,n)):new tn(s,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(an(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(sn(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ln(t))return"Blackberry";if(un(t))return"Webos";if(rn(t))return"Safari";if((t.includes("chrome/")||on(t))&&!t.includes("edge/"))return"Chrome";if(cn(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function sn(e=b()){return/firefox\//i.test(e)}function rn(e=b()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function on(e=b()){return/crios\//i.test(e)}function an(e=b()){return/iemobile/i.test(e)}function cn(e=b()){return/android/i.test(e)}function ln(e=b()){return/blackberry/i.test(e)}function un(e=b()){return/webos/i.test(e)}function hn(e=b()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function dn(){return function(){const e=b();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function fn(e=b()){return hn(e)||cn(e)||un(e)||ln(e)||/windows phone/i.test(e)||an(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(e,t=[]){let n;switch(e){case"Browser":n=nn(b());break;case"Worker":n="".concat(nn(b()),"-").concat(e);break;default:n=e}const i=t.length?t.join(","):"FirebaseCore-web";return"".concat(n,"/").concat("JsCore","/").concat(Xe,"/").concat(i)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,i)=>{try{n(e(t))}catch(s){i(s)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(i){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){var t,n,i,s;const r=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!=(t=r.minPasswordLength)?t:6,r.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=r.maxPasswordLength),void 0!==r.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=r.containsLowercaseCharacter),void 0!==r.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=r.containsUppercaseCharacter),void 0!==r.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=r.containsNumericCharacter),void 0!==r.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=r.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!=(i=null==(n=e.allowedNonAlphanumericCharacters)?void 0:n.join(""))?i:"",this.forceUpgradeOnSignin=null!=(s=e.forceUpgradeOnSignin)&&s,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,r,o;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null==(t=a.meetsMinPasswordLength)||t),a.isValid&&(a.isValid=null==(n=a.meetsMaxPasswordLength)||n),a.isValid&&(a.isValid=null==(i=a.containsLowercaseLetter)||i),a.isValid&&(a.isValid=null==(s=a.containsUppercaseLetter)||s),a.isValid&&(a.isValid=null==(r=a.containsNumericCharacter)||r),a.isValid&&(a.isValid=null==(o=a.containsNonAlphanumericCharacter)||o),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new wn(this),this.idTokenSubscription=new wn(this),this.beforeStateQueue=new mn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ht,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Yt(t)),this._initializationPromise=this.queue(async()=>{var n,i,s;if(!this._deleted&&(this.persistenceManager=await tn.create(this,e),null==(n=this._resolvePersistenceManagerAvailable)||n.call(this),!this._deleted)){if(null==(i=this._popupRedirectResolver)?void 0:i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(r){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null==(s=this.currentUser)?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await jt(this,{idToken:e}),n=await Xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ge(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null==(t=this.redirectUser)?void 0:t._redirectEventId,r=null==i?void 0:i._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==r||!(null==o?void 0:o.user)||(i=o.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return wt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Kt(e)}catch(t){if((null==t?void 0:t.code)!=="auth/".concat("network-request-failed"))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(yt(this));const t=e?R(e):null;return t&&wt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&wt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Yt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Rt(e,"GET","/v2/passwordPolicy",Dt(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new gn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new E("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Rt(e,"POST","/v2/accounts:revokeToken",Dt(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null==(e=this._currentUser)?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Yt(e)||this._popupRedirectResolver;wt(t,this,"argument-error"),this.redirectPersistenceManager=await tn.create(this,[Yt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null==(t=this._currentUser)?void 0:t._redirectEventId)===e?this._currentUser:(null==(n=this.redirectUser)?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return"".concat(this.config.authDomain,":").concat(this.config.apiKey,":").concat(this.name)}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!=(t=null==(e=this.currentUser)?void 0:e.uid)?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let r=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(wt(o,this,"internal-error"),o.then(()=>{r||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,i);return()=>{r=!0,s()}}{const n=e.addObserver(t);return()=>{r=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return wt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null==(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null==(e=this.appCheckServiceProvider.getImmediate({optional:!0}))?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){dt.logLevel<=j.WARN&&dt.warn("Auth (".concat(Xe,"): ").concat(e),...t)}("Error while retrieving App Check token: ".concat(t.error)),null==t?void 0:t.token}}function vn(e){return R(e)}class wn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new A(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return wt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _n(e,t,n){const i=vn(e);wt(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const s=Tn(t),{host:r,port:o}=function(e){const t=Tn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const e=s[1];return{host:e,port:In(i.substr(e.length+1))}}{const[e,t]=i.split(":");return{host:e,port:In(t)}}}(t),a=null===o?"":":".concat(o),c={url:"".concat(s,"//").concat(r).concat(a,"/")},l=Object.freeze({host:r,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!i._canInitEmulator)return wt(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),void wt(k(c,i.config.emulator)&&k(l,i.emulatorConfig),i,"emulator-config-failed");i.config.emulator=c,i.emulatorConfig=l,i.settings.appVerificationDisabledForTesting=!0,m(r)?(g("".concat(s,"//").concat(r).concat(a)),w("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Tn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function In(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class xn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(e,t){return async function(e,t,n,i,s={}){const r=await Rt(e,t,n,i,s);return"mfaPendingCredential"in r&&pt(e,"multi-factor-auth-required",{_serverResponse:r}),r}(e,"POST","/v1/accounts:signInWithIdp",Dt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends xn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:i,...s}=t;if(!n||!i)return null;const r=new Sn(n,i);return r.idToken=s.idToken||void 0,r.accessToken=s.accessToken||void 0,r.secret=s.secret,r.nonce=s.nonce,r.pendingToken=s.pendingToken||null,r}_getIdTokenResponse(e){return En(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,En(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,En(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=N(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends kn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn extends Cn{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:Nn.PROVIDER_ID,signInMethod:Nn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nn.credentialFromTaggedObject(e)}static credentialFromError(e){return Nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Nn.credential(e.oauthAccessToken)}catch(t){return null}}}Nn.FACEBOOK_SIGN_IN_METHOD="facebook.com",Nn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class An extends Cn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sn._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return An.credential(t,n)}catch(i){return null}}}An.GOOGLE_SIGN_IN_METHOD="google.com",An.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dn extends Cn{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Dn.credential(e.oauthAccessToken)}catch(t){return null}}}Dn.GITHUB_SIGN_IN_METHOD="github.com",Dn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rn extends Cn{constructor(){super("twitter.com")}static credential(e,t){return Sn._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Rn.credential(t,n)}catch(i){return null}}}Rn.TWITTER_SIGN_IN_METHOD="twitter.com",Rn.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await Xt._fromIdTokenResponse(e,n,i),r=On(n);return new Pn({user:s,providerId:r,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=On(n);return new Pn({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function On(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends x{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,Ln.prototype),this.customData={appName:e.name,tenantId:null!=(s=e.tenantId)?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new Ln(e,t,n,i)}}function Mn(e,t,n,i){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if(n.code==="auth/".concat("multi-factor-auth-required"))throw Ln._fromErrorAndOperation(e,n,t,i);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function jn(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const i=R(e),s={idToken:await i.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},r=await Bt(i,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return Rt(e,"POST","/v1/accounts:update",t)}(i.auth,s));i.displayName=r.displayName||null,i.photoURL=r.photoUrl||null;const o=i.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=i.displayName,o.photoURL=i.photoURL),await i._updateTokensIfNecessary(r)}const Vn="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vn,"1"),this.storage.removeItem(Vn),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends Un{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);dn()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,10):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fn.type="LOCAL";const qn=Fn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Un{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Bn.type="SESSION";const zn=Bn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Hn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,r=this.handlersMap[i];if(!(null==r?void 0:r.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const o=Array.from(r).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kn(e="",t=10){let n="";for(let i=0;i<t;i++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hn.receivers=[];class Gn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,r;return new Promise((o,a)=>{const c=Kn("",20);i.port1.start();const l=setTimeout(()=>{a(new Error("unsupported_event"))},n);r={messageChannel:i,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(l),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(r),i.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qn(){return void 0!==Wn().WorkerGlobalScope&&"function"==typeof Wn().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Xn="firebaseLocalStorageDb",Jn="firebaseLocalStorage",Yn="fbase_key";class Zn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $n(e,t){return e.transaction([Jn],t?"readwrite":"readonly").objectStore(Jn)}function ei(){const e=indexedDB.open(Xn,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Jn,{keyPath:Yn})}catch(i){n(i)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(Jn)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Xn);return new Zn(e).toPromise()}(),t(await ei()))})})}async function ti(e,t,n){const i=$n(e,!0).put({[Yn]:t,value:n});return new Zn(i).toPromise()}function ni(e,t){const n=$n(e,!0).delete(t);return new Zn(n).toPromise()}class ii{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await ei()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hn._getInstance(Qn()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Gn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null==(e=n[0])?void 0:e.fulfilled)&&(null==(t=n[0])?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null==(t=null==navigator?void 0:navigator.serviceWorker)?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(n){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ei();return await ti(e,Vn,"1"),await ni(e,Vn),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ti(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=$n(e,!1).get(t),i=await new Zn(n).toPromise();return void 0===i?null:i.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ni(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=$n(e,!1).getAll();return new Zn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}ii.type="LOCAL";const si=ii;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ri(e,t){return t?Yt(t):(wt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Et(3e4,6e4);class oi extends xn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return En(e,this._buildIdpRequest())}_linkToIdToken(e,t){return En(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return En(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ai(e){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t,n=!1){if(Ge(e.app))return Promise.reject(yt(e));const i="signIn",s=await Mn(e,i,t),r=await Pn._fromIdTokenResponse(e,i,s);return n||await e._updateCurrentUser(r.user),r}(e.auth,new oi(e),e.bypassAuthState)}function ci(e){const{auth:t,user:n}=e;return wt(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,n=!1){const{auth:i}=e;if(Ge(i.app))return Promise.reject(yt(i));const s="reauthenticate";try{const r=await Bt(e,Mn(i,s,t,e),n);wt(r.idToken,i,"internal-error");const o=Ft(r.idToken);wt(o,i,"internal-error");const{sub:a}=o;return wt(e.uid===a,i,"user-mismatch"),Pn._forOperation(e,s,r)}catch(r){throw(null==r?void 0:r.code)==="auth/".concat("user-not-found")&&pt(i,"user-mismatch"),r}}(n,new oi(e),e.bypassAuthState)}async function li(e){const{auth:t,user:n}=e;return wt(n,t,"internal-error"),async function(e,t,n=!1){const i=await Bt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Pn._forOperation(e,"link",i)}(n,new oi(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ai;case"linkViaPopup":case"linkViaRedirect":return li;case"reauthViaPopup":case"reauthViaRedirect":return ci;default:pt(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hi=new Et(2e3,1e4);async function di(e,t,n){if(Ge(e.app))return Promise.reject(mt(e,"operation-not-supported-in-this-environment"));const i=vn(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&pt(e,"argument-error"),gt(e,"argument-error","Type of ".concat(t.constructor.name," does not match expected instance.")+"Did you pass a reference from a different Auth SDK?")}(e,t,kn);const s=ri(i,n);return new fi(i,"signInViaPopup",t,s).executeNotNull()}class fi extends ui{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,fi.currentPopupAction&&fi.currentPopupAction.cancel(),fi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return wt(e,this.auth,"internal-error"),e}async onExecution(){_t(1===this.filter.length,"Popup operations only handle one event");const e=Kn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(mt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null==(e=this.authWindow)?void 0:e.associatedEvent)||null}cancel(){this.reject(mt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null==(n=null==(t=this.authWindow)?void 0:t.window)?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mt(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,hi.get())};e()}}fi.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pi="pendingRedirect",mi=new Map;class gi extends ui{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=mi.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return en(pi,e.config.apiKey,e.name)}(t),i=function(e){return Yt(e._redirectPersistence)}(e);if(!(await i._isAvailable()))return!1;const s="true"===await i._get(n);return await i._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}mi.set(this.auth._key(),e)}return this.bypassAuthState||mi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function yi(e,t){mi.set(e._key(),t)}async function vi(e,t,n=!1){if(Ge(e.app))return Promise.reject(yt(e));const i=vn(e),s=ri(i,t),r=new gi(i,s,n),o=await r.execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,t)),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _i(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!_i(e)){const i=(null==(n=e.error.code)?void 0:n.split("auth/")[1])||"internal-error";t.onError(mt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(bi(e))}saveEventToCache(e){this.cachedEventUids.add(bi(e)),this.lastProcessedEventTime=Date.now()}}function bi(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function _i({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/".concat("no-auth-event")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ti=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ii=/^https?/;async function xi(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Rt(e,"GET","/v1/projects",t)}(e);for(const i of t)try{if(Ei(i))return}catch(n){}pt(e,"unauthorized-domain")}function Ei(e){const t=Tt(),{protocol:n,hostname:i}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===i?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===i}if(!Ii.test(n))return!1;if(Ti.test(e))return i===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si=new Et(3e4,6e4);function ki(){const e=Wn().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function Ci(e){return new Promise((t,n)=>{var i,s,r,o;function a(){ki(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{ki(),n(mt(e,"network-request-failed"))},timeout:Si.get()})}if(null==(s=null==(i=Wn().gapi)?void 0:i.iframes)?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null==(r=Wn().gapi)?void 0:r.load)){const t="__".concat("iframefcb").concat(Math.floor(1e6*Math.random()));return Wn()[t]=()=>{gapi.load?a():n(mt(e,"network-request-failed"))},(o="".concat(bn.gapiScript,"?onload=").concat(t),bn.loadJS(o)).catch(e=>n(e))}a()}}).catch(e=>{throw Ni=null,e})}let Ni=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ai=new Et(5e3,15e3),Di={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ri=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Pi(e){const t=e.config;wt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?St(t,"emulator/auth/iframe"):"https://".concat(e.config.authDomain,"/").concat("__/auth/iframe"),i={apiKey:t.apiKey,appName:e.name,v:Xe},s=Ri.get(e.config.apiHost);s&&(i.eid=s);const r=e._getFrameworks();return r.length&&(i.fw=r.join(",")),"".concat(n,"?").concat(N(i).slice(1))}async function Oi(e){const t=await function(e){return Ni=Ni||Ci(e),Ni}(e),n=Wn().gapi;return wt(n,e,"internal-error"),t.open({where:document.body,url:Pi(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Di,dontclear:!0},t=>new Promise(async(n,i)=>{await t.restyle({setHideOnLeave:!1});const s=mt(e,"network-request-failed"),r=Wn().setTimeout(()=>{i(s)},Ai.get());function o(){Wn().clearTimeout(r),n(t)}t.ping(o).then(o,()=>{i(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Mi{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function ji(e,t,n,i=500,s=600){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...Li,width:i.toString(),height:s.toString(),top:r,left:o},l=b().toLowerCase();n&&(a=on(l)?"_blank":n),sn(l)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce((e,[t,n])=>"".concat(e).concat(t,"=").concat(n,","),"");if(function(e=b()){var t;return hn(e)&&!!(null==(t=window.navigator)?void 0:t.standalone)}(l)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Mi(null);const h=window.open(t||"",a,u);wt(h,e,"popup-blocked");try{h.focus()}catch(d){}return new Mi(h)}const Vi="__/auth/handler",Ui="emulator/auth/handler",Fi=encodeURIComponent("fac");async function qi(e,t,n,i,s,r){wt(e.config.authDomain,e,"auth-domain-config-required"),wt(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:i,v:Xe,eventId:s};if(t instanceof kn){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Cn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))void 0===a[u]&&delete a[u];const c=await e._getAppCheckToken(),l=c?"#".concat(Fi,"=").concat(encodeURIComponent(c)):"";return"".concat(function({config:e}){if(!e.emulator)return"https://".concat(e.authDomain,"/").concat(Vi);return St(e,Ui)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e),"?").concat(N(a).slice(1)).concat(l)}const Bi="webStorageSupport";const zi=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=zn,this._completeRedirectFn=vi,this._overrideRedirectResult=yi}async _openPopup(e,t,n,i){var s;_t(null==(s=this.eventManagers[e._key()])?void 0:s.manager,"_initialize() not called before _openPopup()");return ji(e,await qi(e,t,n,Tt(),i),Kn())}async _openRedirect(e,t,n,i){await this._originValidation(e);return function(e){Wn().location.href=e}(await qi(e,t,n,Tt(),i)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(_t(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Oi(e),n=new wi(e);return t.register("authEvent",t=>{wt(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Bi,{type:Bi},n=>{var i;const s=null==(i=null==n?void 0:n[0])?void 0:i[Bi];void 0!==s&&t(!!s),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=xi(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fn()||rn()||hn()}};var Hi="@firebase/auth",Ki="1.12.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gi{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null==(e=this.auth.currentUser)?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){wt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wi=f("authIdTokenMaxAge")||300;let Qi=null;var Xi;bn={loadJS:e=>new Promise((t,n)=>{const i=document.createElement("script");var s,r;i.setAttribute("src",e),i.onload=t,i.onerror=e=>{const t=mt("internal-error");t.customData=e,n(t)},i.type="text/javascript",i.charset="UTF-8",(null!=(r=null==(s=document.getElementsByTagName("head"))?void 0:s[0])?r:document).appendChild(i)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},Xi="Browser",He(new P("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:r,authDomain:o}=n.options;wt(r&&!r.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:r,authDomain:o,clientPlatform:Xi,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pn(Xi)},c=new yn(n,i,s,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],i=(Array.isArray(n)?n:[n]).map(Yt);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(i,null==t?void 0:t.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),He(new P("auth-internal",e=>{const t=vn(e.getProvider("auth").getImmediate());return new Gi(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ze(Hi,Ki,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(Xi)),Ze(Hi,Ki,"esm2020");var Ji,Yi,Zi="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const i=Array(16);if("string"==typeof t)for(var s=0;s<16;++s)i[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;s<16;++s)i[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];let r,o=e.g[3];r=t+(o^n&(s^o))+i[0]+3614090360&4294967295,r=o+(s^(t=n+(r<<7&4294967295|r>>>25))&(n^s))+i[1]+3905402710&4294967295,o=t+(r<<12&4294967295|r>>>20),r=s+(n^o&(t^n))+i[2]+606105819&4294967295,r=n+(t^(s=o+(r<<17&4294967295|r>>>15))&(o^t))+i[3]+3250441966&4294967295,r=t+(o^(n=s+(r<<22&4294967295|r>>>10))&(s^o))+i[4]+4118548399&4294967295,r=o+(s^(t=n+(r<<7&4294967295|r>>>25))&(n^s))+i[5]+1200080426&4294967295,o=t+(r<<12&4294967295|r>>>20),r=s+(n^o&(t^n))+i[6]+2821735955&4294967295,r=n+(t^(s=o+(r<<17&4294967295|r>>>15))&(o^t))+i[7]+4249261313&4294967295,r=t+(o^(n=s+(r<<22&4294967295|r>>>10))&(s^o))+i[8]+1770035416&4294967295,r=o+(s^(t=n+(r<<7&4294967295|r>>>25))&(n^s))+i[9]+2336552879&4294967295,o=t+(r<<12&4294967295|r>>>20),r=s+(n^o&(t^n))+i[10]+4294925233&4294967295,r=n+(t^(s=o+(r<<17&4294967295|r>>>15))&(o^t))+i[11]+2304563134&4294967295,r=t+(o^(n=s+(r<<22&4294967295|r>>>10))&(s^o))+i[12]+1804603682&4294967295,r=o+(s^(t=n+(r<<7&4294967295|r>>>25))&(n^s))+i[13]+4254626195&4294967295,o=t+(r<<12&4294967295|r>>>20),r=s+(n^o&(t^n))+i[14]+2792965006&4294967295,r=n+(t^(s=o+(r<<17&4294967295|r>>>15))&(o^t))+i[15]+1236535329&4294967295,r=t+(s^o&((n=s+(r<<22&4294967295|r>>>10))^s))+i[1]+4129170786&4294967295,r=o+(n^s&((t=n+(r<<5&4294967295|r>>>27))^n))+i[6]+3225465664&4294967295,o=t+(r<<9&4294967295|r>>>23),r=s+(t^n&(o^t))+i[11]+643717713&4294967295,r=n+(o^t&((s=o+(r<<14&4294967295|r>>>18))^o))+i[0]+3921069994&4294967295,r=t+(s^o&((n=s+(r<<20&4294967295|r>>>12))^s))+i[5]+3593408605&4294967295,r=o+(n^s&((t=n+(r<<5&4294967295|r>>>27))^n))+i[10]+38016083&4294967295,o=t+(r<<9&4294967295|r>>>23),r=s+(t^n&(o^t))+i[15]+3634488961&4294967295,r=n+(o^t&((s=o+(r<<14&4294967295|r>>>18))^o))+i[4]+3889429448&4294967295,r=t+(s^o&((n=s+(r<<20&4294967295|r>>>12))^s))+i[9]+568446438&4294967295,r=o+(n^s&((t=n+(r<<5&4294967295|r>>>27))^n))+i[14]+3275163606&4294967295,o=t+(r<<9&4294967295|r>>>23),r=s+(t^n&(o^t))+i[3]+4107603335&4294967295,r=n+(o^t&((s=o+(r<<14&4294967295|r>>>18))^o))+i[8]+1163531501&4294967295,r=t+(s^o&((n=s+(r<<20&4294967295|r>>>12))^s))+i[13]+2850285829&4294967295,r=o+(n^s&((t=n+(r<<5&4294967295|r>>>27))^n))+i[2]+4243563512&4294967295,o=t+(r<<9&4294967295|r>>>23),r=s+(t^n&(o^t))+i[7]+1735328473&4294967295,r=n+(o^t&((s=o+(r<<14&4294967295|r>>>18))^o))+i[12]+2368359562&4294967295,r=t+((n=s+(r<<20&4294967295|r>>>12))^s^o)+i[5]+4294588738&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^s)+i[8]+2272392833&4294967295,o=t+(r<<11&4294967295|r>>>21),r=s+(o^t^n)+i[11]+1839030562&4294967295,r=n+((s=o+(r<<16&4294967295|r>>>16))^o^t)+i[14]+4259657740&4294967295,r=t+((n=s+(r<<23&4294967295|r>>>9))^s^o)+i[1]+2763975236&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^s)+i[4]+1272893353&4294967295,o=t+(r<<11&4294967295|r>>>21),r=s+(o^t^n)+i[7]+4139469664&4294967295,r=n+((s=o+(r<<16&4294967295|r>>>16))^o^t)+i[10]+3200236656&4294967295,r=t+((n=s+(r<<23&4294967295|r>>>9))^s^o)+i[13]+681279174&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^s)+i[0]+3936430074&4294967295,o=t+(r<<11&4294967295|r>>>21),r=s+(o^t^n)+i[3]+3572445317&4294967295,r=n+((s=o+(r<<16&4294967295|r>>>16))^o^t)+i[6]+76029189&4294967295,r=t+((n=s+(r<<23&4294967295|r>>>9))^s^o)+i[9]+3654602809&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^s)+i[12]+3873151461&4294967295,o=t+(r<<11&4294967295|r>>>21),r=s+(o^t^n)+i[15]+530742520&4294967295,r=n+((s=o+(r<<16&4294967295|r>>>16))^o^t)+i[2]+3299628645&4294967295,r=t+(s^((n=s+(r<<23&4294967295|r>>>9))|~o))+i[0]+4096336452&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~s))+i[7]+1126891415&4294967295,o=t+(r<<10&4294967295|r>>>22),r=s+(t^(o|~n))+i[14]+2878612391&4294967295,r=n+(o^((s=o+(r<<15&4294967295|r>>>17))|~t))+i[5]+4237533241&4294967295,r=t+(s^((n=s+(r<<21&4294967295|r>>>11))|~o))+i[12]+1700485571&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~s))+i[3]+2399980690&4294967295,o=t+(r<<10&4294967295|r>>>22),r=s+(t^(o|~n))+i[10]+4293915773&4294967295,r=n+(o^((s=o+(r<<15&4294967295|r>>>17))|~t))+i[1]+2240044497&4294967295,r=t+(s^((n=s+(r<<21&4294967295|r>>>11))|~o))+i[8]+1873313359&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~s))+i[15]+4264355552&4294967295,o=t+(r<<10&4294967295|r>>>22),r=s+(t^(o|~n))+i[6]+2734768916&4294967295,r=n+(o^((s=o+(r<<15&4294967295|r>>>17))|~t))+i[13]+1309151649&4294967295,r=t+(s^((n=s+(r<<21&4294967295|r>>>11))|~o))+i[4]+4149444226&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~s))+i[11]+3174756917&4294967295,o=t+(r<<10&4294967295|r>>>22),r=s+(t^(o|~n))+i[2]+718787259&4294967295,r=n+(o^((s=o+(r<<15&4294967295|r>>>17))|~t))+i[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(r<<21&4294967295|r>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+o&4294967295}function i(e,t){this.h=t;const n=[];let i=!0;for(let s=e.length-1;s>=0;s--){const r=0|e[s];i&&r==t||(n[s]=r,i=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,i){for(var s=Array(arguments.length-2),r=2;r<arguments.length;r++)s[r-2]=arguments[r];return t.prototype[n].apply(e,s)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const i=t-this.blockSize,s=this.C;let r=this.h,o=0;for(;o<t;){if(0==r)for(;o<=i;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(s[r++]=e.charCodeAt(o++),r==this.blockSize){n(this,s),r=0;break}}else for(;o<t;)if(s[r++]=e[o++],r==this.blockSize){n(this,s),r=0;break}}this.h=r,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let i=0;i<32;i+=8)e[t++]=this.g[n]>>>i&255;return e};var s={};function r(e){return-128<=e&&e<128?function(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new i([0|e],e<0?-1:0)}):new i([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let i=0;e>=n;i++)t[i]=e/n|0,n*=4294967296;return new i(t,0)}var a=r(0),c=r(1),l=r(16777216);function u(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let i=0;i<t;i++)n[i]=~e.g[i];return new i(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(u(t))throw Error("division by zero");if(u(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,i=t;i.l(e)<=0;)n=y(n),i=y(i);var s=v(n,1),r=v(i,1);for(i=v(i,2),n=v(n,2);!u(i);){var l=r.add(i);l.l(e)<=0&&(s=s.add(n),r=l),i=v(i,1),n=v(n,1)}return t=f(e,s.j(t)),new m(s,t)}for(s=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),i=(i=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,i-48),l=(r=o(n)).j(t);h(l)||l.l(e)>0;)l=(r=o(n-=i)).j(t);u(r)&&(r=c),s=s.add(r),e=f(e,l)}return new m(s,e)}function y(e){const t=e.g.length+1,n=[];for(let i=0;i<t;i++)n[i]=e.i(i)<<1|e.i(i-1)>>>31;return new i(n,e.h)}function v(e,t){const n=t>>5;t%=32;const s=e.g.length-n,r=[];for(let i=0;i<s;i++)r[i]=t>0?e.i(i+n)>>>t|e.i(i+n+1)<<32-t:e.i(i+n);return new i(r,e.h)}(e=i.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const i=this.i(n);e+=(i>=0?i:4294967296+i)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(u(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let i="";for(;;){const s=g(n,t).g;let r=(((n=f(n,s.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(u(n=s))return r+i;for(;r.length<6;)r="0"+r;i=r+i}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:u(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let s=0;for(let i=0;i<=t;i++){let t=s+(65535&this.i(i))+(65535&e.i(i)),r=(t>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);s=r>>>16,t&=65535,r&=65535,n[i]=r<<16|t}return new i(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(u(this)||u(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(l)<0&&e.l(l)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(let t=0;t<e.g.length;t++){const i=this.i(s)>>>16,r=65535&this.i(s),o=e.i(t)>>>16,a=65535&e.i(t);n[2*s+2*t]+=r*a,p(n,2*s+2*t),n[2*s+2*t+1]+=i*a,p(n,2*s+2*t+1),n[2*s+2*t+1]+=r*o,p(n,2*s+2*t+1),n[2*s+2*t+2]+=i*o,p(n,2*s+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new i(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let i=0;i<t;i++)n[i]=this.i(i)&e.i(i);return new i(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let i=0;i<t;i++)n[i]=this.i(i)|e.i(i);return new i(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let i=0;i<t;i++)n[i]=this.i(i)^e.i(i);return new i(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,Yi=t,i.prototype.add=i.prototype.add,i.prototype.multiply=i.prototype.j,i.prototype.modulo=i.prototype.B,i.prototype.compare=i.prototype.l,i.prototype.toNumber=i.prototype.m,i.prototype.toString=i.prototype.toString,i.prototype.getBits=i.prototype.i,i.fromNumber=o,i.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const i=o(Math.pow(n,8));let s=a;for(let a=0;a<t.length;a+=8){var r=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+r),n);r<8?(r=o(Math.pow(n,r)),s=s.j(r).add(o(e))):(s=s.j(i),s=s.add(o(e)))}return s},Ji=i}).apply(void 0!==Zi?Zi:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var $i,es,ts,ns,is,ss,rs,os,as="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof as&&as];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function i(e,i){if(i)e:{var s=n;e=e.split(".");for(var r=0;r<e.length-1;r++){var o=e[r];if(!(o in s))break e;s=s[o]}(i=i(r=s[e=e[e.length-1]]))!=r&&null!=i&&t(s,e,{configurable:!0,writable:!0,value:i})}}i("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},r=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function u(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,i){for(var s=Array(arguments.length-2),r=2;r<arguments.length;r++)s[r-2]=arguments[r];return t.prototype[n].apply(e,s)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let i=0;i<t;i++)n[i]=e[i];return n}return[]}function f(e,t){for(let i=1;i<arguments.length;i++){const t=arguments[i];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const i=t.length||0;e.length=n+i;for(let s=0;s<i;s++)e[n+s]=t[s]}else e.push(t)}}function p(e){r.setTimeout(()=>{throw e},0)}function m(){var e=b;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let v,w=!1,b=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},_=()=>{const e=Promise.resolve(void 0);v=()=>{e.then(T)}};function T(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}w=!1}function I(){this.u=this.u,this.C=this.C}function x(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},x.prototype.h=function(){this.defaultPrevented=!0};var E=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};r.addEventListener("test",e,t),r.removeEventListener("test",e,t)}catch(n){}return e}();function S(e){return/^[\s\xa0]*$/.test(e)}function k(e,t){x.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}u(k,x),k.prototype.init=function(e,t){const n=this.type=e.type,i=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,i?(this.clientX=void 0!==i.clientX?i.clientX:i.pageX,this.clientY=void 0!==i.clientY?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&k.Z.h.call(this)},k.prototype.h=function(){k.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var C="closure_listenable_"+(1e6*Math.random()|0),N=0;function A(e,t,n,i,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!i,this.ha=s,this.key=++N,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function R(e,t,n){for(const i in e)t.call(n,e[i],i,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const O="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function L(e,t){let n,i;for(let s=1;s<arguments.length;s++){for(n in i=arguments[s],i)e[n]=i[n];for(let t=0;t<O.length;t++)n=O[t],Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}}function M(e){this.src=e,this.g={},this.h=0}function j(e,t){const n=t.type;if(n in e.g){var i,s=e.g[n],r=Array.prototype.indexOf.call(s,t,void 0);(i=r>=0)&&Array.prototype.splice.call(s,r,1),i&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function V(e,t,n,i){for(let s=0;s<e.length;++s){const r=e[s];if(!r.da&&r.listener==t&&r.capture==!!n&&r.ha==i)return s}return-1}M.prototype.add=function(e,t,n,i,s){const r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);const o=V(e,t,i,s);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new A(t,this.src,r,!!i,s)).fa=n,e.push(t)),t};var U="closure_lm_"+(1e6*Math.random()|0),F={};function q(e,t,n,i,s){if(Array.isArray(t)){for(let r=0;r<t.length;r++)q(e,t[r],n,i,s);return null}return n=Q(n),e&&e[C]?e.J(t,n,!!o(i)&&!!i.capture,s):function(e,t,n,i,s,r){if(!t)throw Error("Invalid event type");const a=o(s)?!!s.capture:!!s;let c=G(e);if(c||(e[U]=c=new M(e)),n=c.add(t,n,i,a,r),n.proxy)return n;if(i=function(){function e(n){return t.call(e.src,e.listener,n)}const t=K;return e}(),n.proxy=i,i.src=e,i.listener=n,e.addEventListener)E||(s=a),void 0===s&&(s=!1),e.addEventListener(t.toString(),i,s);else if(e.attachEvent)e.attachEvent(H(t.toString()),i);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(i)}return n}(e,t,n,!1,i,s)}function B(e,t,n,i,s){if(Array.isArray(t))for(var r=0;r<t.length;r++)B(e,t[r],n,i,s);else i=o(i)?!!i.capture:!!i,n=Q(n),e&&e[C]?(e=e.i,(r=String(t).toString())in e.g&&((n=V(t=e.g[r],n,i,s))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[r],e.h--)))):e&&(e=G(e))&&(t=e.g[t.toString()],e=-1,t&&(e=V(t,n,i,s)),(n=e>-1?t[e]:null)&&z(n))}function z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[C])j(t.i,e);else{var n=e.type,i=e.proxy;t.removeEventListener?t.removeEventListener(n,i,e.capture):t.detachEvent?t.detachEvent(H(n),i):t.addListener&&t.removeListener&&t.removeListener(i),(n=G(t))?(j(n,e),0==n.h&&(n.src=null,t[U]=null)):D(e)}}}function H(e){return e in F?F[e]:F[e]="on"+e}function K(e,t){if(e.da)e=!0;else{t=new k(t,this);const n=e.listener,i=e.ha||e.src;e.fa&&z(e),e=n.call(i,t)}return e}function G(e){return(e=e[U])instanceof M?e:null}var W="__closure_events_fn_"+(1e9*Math.random()>>>0);function Q(e){return"function"==typeof e?e:(e[W]||(e[W]=function(t){return e.handleEvent(t)}),e[W])}function X(){I.call(this),this.i=new M(this),this.M=this,this.G=null}function J(e,t){var n,i=e.G;if(i)for(n=[];i;i=i.G)n.push(i);if(e=e.M,i=t.type||t,"string"==typeof t)t=new x(t,e);else if(t instanceof x)t.target=t.target||e;else{var s=t;L(t=new x(i,e),s)}let r,o;if(s=!0,n)for(o=n.length-1;o>=0;o--)r=t.g=n[o],s=Y(r,i,!0,t)&&s;if(r=t.g=e,s=Y(r,i,!0,t)&&s,s=Y(r,i,!1,t)&&s,n)for(o=0;o<n.length;o++)r=t.g=n[o],s=Y(r,i,!1,t)&&s}function Y(e,t,n,i){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let s=!0;for(let r=0;r<t.length;++r){const o=t[r];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&j(e.i,o),s=!1!==t.call(n,i)&&s}}return s&&!i.defaultPrevented}function Z(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:r.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,Z(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}u(X,I),X.prototype[C]=!0,X.prototype.removeEventListener=function(e,t,n,i){B(this,e,t,n,i)},X.prototype.N=function(){if(X.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},X.prototype.J=function(e,t,n,i){return this.i.add(String(e),t,!1,n,i)},X.prototype.K=function(e,t,n,i){return this.i.add(String(e),t,!0,n,i)};class $ extends I{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Z(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){I.call(this),this.h=e,this.g={}}u(ee,I);var te=[];function ne(e){R(e.g,function(e,t){this.g.hasOwnProperty(t)&&z(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ie=r.JSON.stringify,se=r.JSON.parse,re=class{stringify(e){return r.JSON.stringify(e,void 0)}parse(e){return r.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function le(){x.call(this,"d")}function ue(){x.call(this,"c")}u(le,x),u(ue,x);var he={},de=null;function fe(){return de=de||new X}function pe(e){x.call(this,he.Ia,e)}function me(e){const t=fe();J(t,new pe(t))}function ge(e,t){x.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();J(t,new ge(t,e))}function ve(e,t){x.call(this,he.Ja,e),this.size=t}function we(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){e()},t)}function be(){this.g=!0}function _e(e,t,n,i){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const r=JSON.parse(t);if(r)for(e=0;e<r.length;e++)if(Array.isArray(r[e])){var n=r[e];if(!(n.length<2)){var i=n[1];if(Array.isArray(i)&&!(i.length<1)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<i.length;e++)i[e]=""}}}return ie(r)}catch(r){return t}}(e,n)+(i?" "+i:"")})}he.Ia="serverreachability",u(pe,x),he.STAT_EVENT="statevent",u(ge,x),he.Ja="timingevent",u(ve,x),be.prototype.ua=function(){this.g=!1},be.prototype.info=function(){};var Te,Ie={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},xe={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Ee(){}function Se(e){return encodeURIComponent(String(e))}function ke(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function Ce(e,t,n,i){this.j=e,this.i=t,this.l=n,this.S=i||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}u(Ee,oe),Ee.prototype.g=function(){return new XMLHttpRequest},Te=new Ee;var Ae={},De={};function Re(e,t,n){e.M=1,e.A=it(Ze(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),Me(e),e.B=Ze(e.A);var n=e.B,i=e.S;Array.isArray(i)||(i=[String(i)]),yt(n.i,"t",i),e.C=0,n=e.j.L,e.h=new Ne,e.g=sn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new $(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,i=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(te[0]=s.toString()),s=te);for(let r=0;r<s.length;r++){const e=q(n,s[r],i||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,i,s,r){e.info(function(){if(e.g)if(r){var o="",a=r.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=r;return"XMLHTTP REQ ("+i+") [attempt "+s+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Oe(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function Le(e,t){var n=e.C,i=t.indexOf("\n",n);return-1==i?De:(n=Number(t.substring(n,i)),isNaN(n)?Ae:(i+=1)+n>t.length?De:(t=t.slice(i,i+n),e.C=i+n,t))}function Me(e){e.T=Date.now()+e.H,je(e,e.H)}function je(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=we(c(e.aa,e),t)}function Ve(e){e.D&&(r.clearTimeout(e.D),e.D=null)}function Ue(e){0==e.j.I||e.K||Zt(e.j,e)}function Fe(e){Ve(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function qe(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ge(n.h,e)))if(!e.L&&Ge(n.h,e)&&3==n.I){try{var i=n.Ba.g.parse(t)}catch(u){i=null}if(Array.isArray(i)&&3==i.length){var s=i;if(0==s[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Yt(n),qt(n)}Qt(n),ye(18)}}else n.xa=s[1],0<n.xa-n.K&&s[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=we(c(n.Va,n),6e3));Ke(n.h)<=1&&n.ta&&(n.ta=void 0)}else en(n,11)}else if((e.L||n.g==e)&&Yt(n),!S(t))for(s=n.Ba.g.parse(t),t=0;t<s.length;t++){let c=s[t];const u=c[0];if(!(u<=n.K))if(n.K=u,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const s=c[4];null!=s&&(n.za=s,n.j.info("SVER="+n.za));const u=c[5];null!=u&&"number"==typeof u&&u>0&&(i=1.5*u,n.O=i,n.j.info("backChannelRequestTimeoutMs_="+i)),i=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=i.h;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(We(r,r.h),r.h=null))}if(i.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(i.wa=e,nt(i.J,i.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((i=n).na=nn(i,i.L?i.ba:null,i.W),o.L){Qe(i.h,o);var a=o,l=i.O;l&&(a.H=l),a.D&&(Ve(a),Me(a)),i.g=o}else Wt(i);n.i.length>0&&zt(n)}else"stop"!=c[0]&&"close"!=c[0]||en(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?en(n,7):Ft(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(u){}}Ce.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Mt(e)?t.j():this.Y(e)},Ce.prototype.Y=function(e){try{if(e==this.g)e:{const c=Mt(this.g),l=this.g.ya();this.g.ca();if(!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||jt(this.g)))){this.K||4!=c||7==l||me(),Ve(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Oe(e))return e.g.la();const t=jt(e.g);if(""===t)return"";let n="";const i=t.length,s=4==Mt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return Fe(e),Ue(e),"";e.h.i=new r.TextDecoder}for(let r=0;r<i;r++)e.h.h=!0,n+=e.h.i.decode(t[r],{stream:!(s&&r==i-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,i,s,r,o){e.info(function(){return"XMLHTTP RESP ("+i+") [ attempt "+s+"]: "+t+"\n"+n+"\n"+r+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var i,s=this.g;if((i=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(i)){var o=i;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),Fe(this),Ue(this);break e}_e(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,qe(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Le(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),_e(this.i,this.l,null,"[Incomplete Response]");break}if(t==Ae){this.m=4,ye(15),_e(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}_e(this.i,this.l,t,null),qe(this,t)}if(Oe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Xt(a),a.P=!0,ye(11))}}else _e(this.i,this.l,n,"[Invalid Chunked Response]"),Fe(this),Ue(this)}else _e(this.i,this.l,n,null),qe(this,n);4==c&&Fe(this),this.o&&!this.K&&(4==c?Zt(this.j,this):(this.o=!1,Me(this)))}else(function(e){const t={};e=(e.g&&Mt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let i=0;i<e.length;i++){if(S(e[i]))continue;var n=ke(e[i]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const r=t[s]||[];t[s]=r,r.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),Fe(this),Ue(this)}}}catch(c){}},Ce.prototype.cancel=function(){this.K=!0,Fe(this)},Ce.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),Fe(this),this.m=2,Ue(this)):je(this,this.T-e)};var Be=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,r.PerformanceNavigationTiming?e=(e=r.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function He(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ke(e){return e.h?1:e.g?e.g.size:0}function Ge(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function We(e,t){e.g?e.g.add(t):e.h=t}function Qe(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Xe(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}ze.prototype.cancel=function(){if(this.i=Xe(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Je=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ye(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Ye?(this.l=e.l,$e(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,vt(e.i)),this.m=e.m):e&&(t=String(e).match(Je))?(this.l=!1,$e(this,t[1]||"",!0),this.o=st(t[2]||""),this.g=st(t[3]||"",!0),et(this,t[4]),this.h=st(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=st(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Ze(e){return new Ye(e)}function $e(e,t,n){e.j=n?st(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=rt(t,ut)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function it(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function st(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function rt(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Ye.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(rt(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(rt(t,at,!0),"@"),e.push(Se(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(rt(n,"/"==n.charAt(0)?lt:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",rt(n,ht)),e.join("")},Ye.prototype.resolve=function(e){const t=Ze(this);let n=!!e.j;n?$e(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var i=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=i.charAt(0))if(this.g&&!this.h)i="/"+i;else{var s=t.h.lastIndexOf("/");-1!=s&&(i=t.h.slice(0,s+1)+i)}if(".."==(s=i)||"."==s)i="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){i=0==s.lastIndexOf("/",0),s=s.split("/");const e=[];for(let t=0;t<s.length;){const n=s[t++];"."==n?i&&t==s.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),i&&t==s.length&&e.push("")):(e.push(n),i=!0)}i=e.join("/")}else i=s}return n?t.h=i:n=""!==e.i.toString(),n?tt(t,vt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,lt=/[#\?]/g,ut=/[#\?@]/g,ht=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const i=e[n].indexOf("=");let s,r=null;i>=0?(s=e[n].substring(0,i),r=e[n].substring(i+1)):s=e[n],t(s,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=wt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=wt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(wt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(wt(e,t),d(n)),e.h+=n.length)}function vt(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function wt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function bt(e,t,n,i,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),i(n)}catch(r){}}function _t(){this.g=new re}function Tt(e){this.i=e.Sb||null,this.h=e.ab||!1}function It(e,t){X.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function xt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Et(e){e.readyState=4,e.l=null,e.j=null,e.B=null,St(e)}function St(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function kt(e){let t="";return R(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Ct(e,t,n){e:{for(i in n){var i=!1;break e}i=!0}i||(n=kt(n),"string"==typeof e?null!=n&&Se(n):nt(e,t,n))}function Nt(e){X.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=wt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,i){n.forEach(function(n){e.call(t,n,i,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=wt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let i=0;i<t.length;i++){var n=t[i];const s=Se(n);n=gt(this,n);for(let t=0;t<n.length;t++){let i=s;""!==n[t]&&(i+="="+Se(n[t])),e.push(i)}}return this.i=e.join("&")},u(Tt,oe),Tt.prototype.g=function(){return new It(this.i,this.h)},u(It,X),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,St(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||r).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Et(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,St(this)),this.g&&(this.readyState=3,St(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;xt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Et(this):St(this),3==this.readyState&&xt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,Et(this))},e.Na=function(e){this.g&&(this.response=e,Et(this))},e.ga=function(){this.g&&Et(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),u(Nt,X);var At=/^https?$/i,Dt=["POST","PUT"];function Rt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Pt(e),Lt(e)}function Pt(e){e.A||(e.A=!0,J(e,"complete"),J(e,"error"))}function Ot(e){if(e.h&&void 0!==s)if(e.v&&4==Mt(e))setTimeout(e.Ca.bind(e),0);else if(J(e,"readystatechange"),4==Mt(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var i;if(i=0===s){let t=String(e.D).match(Je)[1]||null;!t&&r.self&&r.self.location&&(t=r.self.location.protocol.slice(0,-1)),i=!At.test(t?t.toLowerCase():"")}n=i}if(n)J(e,"complete"),J(e,"success");else{e.o=6;try{var o=Mt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Pt(e)}}finally{Lt(e)}}}function Lt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const i=e.g;e.g=null,t||J(e,"ready");try{i.onreadystatechange=null}catch(n){}}}function Mt(e){return e.g?e.g.readyState:0}function jt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ut(e){this.za=0,this.i=[],this.j=new be,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Vt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Vt("baseRetryDelayMs",5e3,e),this.Za=Vt("retryDelaySeedMs",1e4,e),this.Ta=Vt("forwardChannelMaxRetries",2,e),this.va=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ze(e&&e.concurrentRequestLimit),this.Ba=new _t,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function Ft(e){if(Bt(e),3==e.I){var t=e.V++,n=Ze(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),Kt(e,n),(t=new Ce(e,e.j,t)).M=2,t.A=it(Ze(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(t.A.toString(),"")}catch(i){}!n&&r.Image&&((new Image).src=t.A,n=!0),n||(t.g=sn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Me(t)}tn(e)}function qt(e){e.g&&(Xt(e),e.g.cancel(),e.g=null)}function Bt(e){qt(e),e.v&&(r.clearTimeout(e.v),e.v=null),Yt(e),e.h.cancel(),e.m&&("number"==typeof e.m&&r.clearTimeout(e.m),e.m=null)}function zt(e){if(!He(e.h)&&!e.m){e.m=!0;var t=e.Ea;v||_(),w||(v(),w=!0),b.add(t,e),e.D=0}}function Ht(e,t){var n;n=t?t.l:e.V++;const i=Ze(e.J);nt(i,"SID",e.M),nt(i,"RID",n),nt(i,"AID",e.K),Kt(e,i),e.u&&e.o&&Ct(i,e.u,e.o),n=new Ce(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=Gt(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),We(e.h,n),Re(n,i,t)}function Kt(e,t){e.H&&R(e.H,function(e,n){nt(t,n,e)}),e.l&&R({},function(e,n){nt(t,n,e)})}function Gt(e,t,n){n=Math.min(e.i.length,n);const i=e.l?c(e.l.Ka,e.l,e):null;e:{var s=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let u=0;u<n;u++){var r=s[u].g;const n=s[u].map;if((r-=t)<0)t=Math.max(0,s[u].g-100),c=!1;else try{r="req"+r+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let i=n;o(n)&&(i=ie(n)),e.push(r+t+"="+encodeURIComponent(i))}}catch(l){throw e.push(r+"type="+encodeURIComponent("_badmap")),l}}catch(l){i&&i(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function Wt(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;v||_(),w||(v(),w=!0),b.add(t,e),e.A=0}}function Qt(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=we(c(e.Da,e),$t(e,e.A)),e.A++,!0)}function Xt(e){null!=e.B&&(r.clearTimeout(e.B),e.B=null)}function Jt(e){e.g=new Ce(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Ze(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),Kt(e,t),e.u&&e.o&&Ct(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=it(Ze(t)),n.u=null,n.R=!0,Pe(n,e)}function Yt(e){null!=e.C&&(r.clearTimeout(e.C),e.C=null)}function Zt(e,t){var n=null;if(e.g==t){Yt(e),Xt(e),e.g=null;var i=2}else{if(!Ge(e.h,t))return;n=t.G,Qe(e.h,t),i=1}if(0!=e.I)if(t.o)if(1==i){n=t.u?t.u.length:0,t=Date.now()-t.F;var s=e.D;J(i=fe(),new ve(i,n)),zt(e)}else Wt(e);else if(3==(s=t.m)||0==s&&t.X>0||!(1==i&&function(e,t){return!(Ke(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=we(c(e.Ea,e,t),$t(e,e.D)),e.D++,0)))}(e,t)||2==i&&Qt(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),s){case 1:en(e,5);break;case 4:en(e,10);break;case 3:en(e,6);break;default:en(e,2)}}function $t(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function en(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),i=e.Ua;const t=!i;i=new Ye(i||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||$e(i,"https"),it(i),t?function(e,t){const n=new be;if(r.Image){const i=new Image;i.onload=l(bt,n,"TestLoadImage: loaded",!0,t,i),i.onerror=l(bt,n,"TestLoadImage: error",!1,t,i),i.onabort=l(bt,n,"TestLoadImage: abort",!1,t,i),i.ontimeout=l(bt,n,"TestLoadImage: timeout",!1,t,i),r.setTimeout(function(){i.ontimeout&&i.ontimeout()},1e4),i.src=e}else t(!1)}(i.toString(),n):function(e,t){new be;const n=new AbortController,i=setTimeout(()=>{n.abort(),bt(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?bt(0,0,!0,t):bt(0,0,!1,t)}).catch(()=>{clearTimeout(i),bt(0,0,!1,t)})}(i.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),tn(e),Bt(e)}function tn(e){if(e.I=0,e.ja=[],e.l){const t=Xe(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function nn(e,t,n){var i=n instanceof Ye?Ze(n):new Ye(n);if(""!=i.g)t&&(i.g=t+"."+i.g),et(i,i.u);else{var s=r.location;i=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;const e=new Ye(null);i&&$e(e,i),t&&(e.g=t),s&&et(e,s),n&&(e.h=n),i=e}return n=e.G,t=e.wa,n&&t&&nt(i,n,t),nt(i,"VER",e.ka),Kt(e,i),i}function sn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new Tt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function rn(){}function on(){}function an(e,t){X.call(this),this.g=new Ut(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!S(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!S(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new un(this)}function cn(e){le.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function ln(){ue.call(this),this.status=1}function un(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=h(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Rt(this,o)}if(e=n||"",n=new Map(this.headers),i)if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else{if("function"!=typeof i.keys||"function"!=typeof i.get)throw Error("Unknown input type for opt_headers: "+String(i));for(const e of i.keys())n.set(e,i.get(e))}i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=r.FormData&&e instanceof r.FormData,!(Array.prototype.indexOf.call(Dt,t,void 0)>=0)||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,a]of n)this.g.setRequestHeader(r,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Rt(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,J(this,"complete"),J(this,"abort"),Lt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Lt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?Ot(this):this.Xa())},e.Xa=function(){Ot(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Mt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),se(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ut.prototype).ka=8,e.I=1,e.connect=function(e,t,n,i){ye(0),this.W=e,this.H=t||{},n&&void 0!==i&&(this.H.OSID=n,this.H.OAID=i),this.F=this.X,this.J=nn(this,null,this.W),zt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const s=new Ce(this,this.j,e);let r=this.o;if(this.U&&(r?(r=P(r),L(r,this.U)):r=this.U),null!==this.u||this.R||(s.J=r,r=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var i=this.i[n];if(void 0===(i="__data__"in i.map&&"string"==typeof(i=i.map.__data__)?i.length:void 0))break;if((t+=i)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Gt(this,s,t),nt(n=Ze(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),Kt(this,n),r&&(this.R?t="headers="+Se(kt(r))+"&"+t:this.u&&Ct(n,this.u,r)),We(this.h,s),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),s.U=!0,Re(s,n,null)):Re(s,n,t),this.I=2}}else 3==this.I&&(e?Ht(this,e):0==this.i.length||He(this.h)||Ht(this))},e.Da=function(){if(this.v=null,Jt(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=we(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),qt(this),Jt(this))},e.Va=function(){null!=this.C&&(this.C=null,qt(this),Qt(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=rn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},on.prototype.g=function(e,t){return new an(e,t)},u(an,X),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){Ft(this.g)},an.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=ie(e),e=n);t.i.push(new Be(t.Ya++,e)),3==t.I&&zt(t)},an.prototype.N=function(){this.g.l=null,delete this.j,Ft(this.g),delete this.g,an.Z.N.call(this)},u(cn,le),u(ln,ue),u(un,rn),un.prototype.ra=function(){J(this.g,"a")},un.prototype.qa=function(e){J(this.g,new cn(e))},un.prototype.pa=function(e){J(this.g,new ln)},un.prototype.oa=function(){J(this.g,"b")},on.prototype.createWebChannel=on.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,os=function(){return new on},rs=function(){return fe()},ss=he,is={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,ns=Ie,xe.COMPLETE="complete",ts=xe,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",X.prototype.listen=X.prototype.J,es=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,$i=Nt}).apply(void 0!==as?as:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const cs="@firebase/firestore",ls="4.9.3";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}us.UNAUTHENTICATED=new us(null),us.GOOGLE_CREDENTIALS=new us("google-credentials-uid"),us.FIRST_PARTY=new us("first-party-uid"),us.MOCK_USER=new us("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let hs="12.7.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=new z("@firebase/firestore");function fs(){return ds.logLevel}function ps(e,...t){if(ds.logLevel<=j.DEBUG){const n=t.map(ys);ds.debug("Firestore (".concat(hs,"): ").concat(e),...n)}}function ms(e,...t){if(ds.logLevel<=j.ERROR){const n=t.map(ys);ds.error("Firestore (".concat(hs,"): ").concat(e),...n)}}function gs(e,...t){if(ds.logLevel<=j.WARN){const n=t.map(ys);ds.warn("Firestore (".concat(hs,"): ").concat(e),...n)}}function ys(e){if("string"==typeof e)return e;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(e,t,n){let i="Unexpected state";"string"==typeof t?i=t:n=t,ws(e,i,n)}function ws(e,t,n){let i="FIRESTORE (".concat(hs,") INTERNAL ASSERTION FAILED: ").concat(t," (ID: ").concat(e.toString(16),")");if(void 0!==n)try{i+=" CONTEXT: "+JSON.stringify(n)}catch(s){i+=" CONTEXT: "+n}throw ms(i),new Error(i)}function bs(e,t,n,i){let s="Unexpected state";"string"==typeof n?s=n:i=n,e||ws(t,s,i)}function _s(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Is extends x{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(e))}}class Ss{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(us.UNAUTHENTICATED))}shutdown(){}}class ks{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Cs{constructor(e){this.t=e,this.currentUser=us.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){bs(void 0===this.o,42304);let n=this.i;const i=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new xs;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new xs,e.enqueueRetryable(()=>i(this.currentUser))};const r=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await i(this.currentUser)})},o=e=>{ps("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(ps("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new xs)}},0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(ps("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(bs("string"==typeof t.accessToken,31837,{l:t}),new Es(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return bs(null===e||"string"==typeof e,2055,{h:e}),new us(e)}}class Ns{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=us.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class As{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Ns(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(us.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ds{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Rs{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ge(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){bs(void 0===this.o,3512);const n=e=>{null!=e.error&&ps("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: ".concat(e.error.message));const n=e.token!==this.m;return this.m=e.token,ps("FirebaseAppCheckTokenProvider","Received ".concat(n?"new":"existing"," token.")),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const i=e=>{ps("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>i(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?i(e):ps("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ds(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(bs("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new Ds(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let i=0;i<e;i++)n[i]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Ps(40);for(let i=0;i<n.length;++i)t.length<20&&n[i]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[i]%62))}return t}}function Ls(e,t){return e<t?-1:e>t?1:0}function Ms(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const n=e.charAt(i),s=t.charAt(i);if(n!==s)return Us(n)===Us(s)?Ls(n,s):Us(n)?1:-1}return Ls(e.length,t.length)}const js=55296,Vs=57343;function Us(e){const t=e.charCodeAt(0);return t>=js&&t<=Vs}function Fs(e,t,n){return e.length===t.length&&e.every((e,i)=>n(e,t[i]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="__name__";class Bs{constructor(e,t,n){void 0===t?t=0:t>e.length&&vs(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&vs(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Bs.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Bs?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const n=Bs.compareSegments(e.get(i),t.get(i));if(0!==n)return n}return Ls(e.length,t.length)}static compareSegments(e,t){const n=Bs.isNumericId(e),i=Bs.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?Bs.extractNumericId(e).compare(Bs.extractNumericId(t)):Ms(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ji.fromString(e.substring(4,e.length-2))}}class zs extends Bs{construct(e,t,n){return new zs(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Is(Ts.INVALID_ARGUMENT,"Invalid segment (".concat(n,"). Paths must not contain // in them."));t.push(...n.split("/").filter(e=>e.length>0))}return new zs(t)}static emptyPath(){return new zs([])}}const Hs=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ks extends Bs{construct(e,t,n){return new Ks(e,t,n)}static isValidIdentifier(e){return Hs.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ks.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===qs}static keyField(){return new Ks([qs])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(0===n.length)throw new Is(Ts.INVALID_ARGUMENT,"Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));t.push(n),n=""};let r=!1;for(;i<e.length;){const t=e[i];if("\\"===t){if(i+1===e.length)throw new Is(Ts.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[i+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Is(Ts.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,i+=2}else"`"===t?(r=!r,i++):"."!==t||r?(n+=t,i++):(s(),i++)}if(s(),r)throw new Is(Ts.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ks(t)}static emptyPath(){return new Ks([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e){this.path=e}static fromPath(e){return new Gs(zs.fromString(e))}static fromName(e){return new Gs(zs.fromString(e).popFirst(5))}static empty(){return new Gs(zs.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===zs.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return zs.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Gs(new zs(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(e,t,n){if(!n)throw new Is(Ts.INVALID_ARGUMENT,"Function ".concat(e,"() cannot be called with an empty ").concat(t,"."))}function Qs(e){if(!Gs.isDocumentKey(e))throw new Is(Ts.INVALID_ARGUMENT,"Invalid document reference. Document references must have an even number of segments, but ".concat(e," has ").concat(e.length,"."))}function Xs(e){if(Gs.isDocumentKey(e))throw new Is(Ts.INVALID_ARGUMENT,"Invalid collection reference. Collection references must have an odd number of segments, but ".concat(e," has ").concat(e.length,"."))}function Js(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function Ys(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e="".concat(e.substring(0,20),"...")),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?"a custom ".concat(n," object"):"an object"}}var t;return"function"==typeof e?"a function":vs(12329,{type:typeof e})}function Zs(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Is(Ts.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ys(e);throw new Is(Ts.INVALID_ARGUMENT,"Expected type '".concat(t.name,"', but it was: ").concat(n))}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $s(e,t){const n={typeString:e};return t&&(n.value=t),n}function er(e,t){if(!Js(e))throw new Is(Ts.INVALID_ARGUMENT,"JSON must be an object");let n;for(const i in t)if(t[i]){const s=t[i].typeString,r="value"in t[i]?{value:t[i].value}:void 0;if(!(i in e)){n="JSON missing required field: '".concat(i,"'");break}const o=e[i];if(s&&typeof o!==s){n="JSON field '".concat(i,"' must be a ").concat(s,".");break}if(void 0!==r&&o!==r.value){n="Expected '".concat(i,"' field to equal '").concat(r.value,"'");break}}if(n)throw new Is(Ts.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=-62135596800,nr=1e6;class ir{static now(){return ir.fromMillis(Date.now())}static fromDate(e){return ir.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*nr);return new ir(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Is(Ts.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Is(Ts.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<tr)throw new Is(Ts.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Is(Ts.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/nr}_compareTo(e){return this.seconds===e.seconds?Ls(this.nanoseconds,e.nanoseconds):Ls(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ir._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(er(e,ir._jsonSchema))return new ir(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-tr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ir._jsonSchemaVersion="firestore/timestamp/1.0",ir._jsonSchema={type:$s("string",ir._jsonSchemaVersion),seconds:$s("number"),nanoseconds:$s("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sr{static fromTimestamp(e){return new sr(e)}static min(){return new sr(new ir(0,0))}static max(){return new sr(new ir(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(e){return new or(e.readTime,e.key,-1)}class or{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new or(sr.min(),Gs.empty(),-1)}static max(){return new or(sr.max(),Gs.empty(),-1)}}function ar(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=Gs.comparator(e.documentKey,t.documentKey),0!==n?n:Ls(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class cr{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(e){if(e.code!==Ts.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;ps("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&vs(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ur((n,i)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,i)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof ur?t:ur.resolve(t)}catch(t){return ur.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ur.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ur.reject(t)}static resolve(e){return new ur((t,n)=>{t(e)})}static reject(e){return new ur((t,n)=>{n(e)})}static waitFor(e){return new ur((t,n)=>{let i=0,s=0,r=!1;e.forEach(e=>{++i,e.next(()=>{++s,r&&s===i&&t()},e=>n(e))}),r=!0,s===i&&t()})}static or(e){let t=ur.resolve(!1);for(const n of e)t=t.next(e=>e?ur.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,i)=>{n.push(t.call(this,e,i))}),this.waitFor(n)}static mapArray(e,t){return new ur((n,i)=>{const s=e.length,r=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{r[c]=e,++o,o===s&&n(r)},e=>i(e))}})}static doWhile(e,t){return new ur((n,i)=>{const s=()=>{!0===e()?t().next(()=>{s()},i):n()};s()})}}function hr(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}dr.ce=-1;function fr(e){return null==e}function pr(e){return 0===e&&1/e==-1/0}function mr(e,t){let n=t;const i=e.length;for(let s=0;s<i;s++){const t=e.charAt(s);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function gr(e){return e+""}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function vr(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function wr(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t){this.comparator=e,this.root=t||Tr.EMPTY}insert(e,t){return new br(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Tr.BLACK,null,null))}remove(e){return new br(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Tr.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(0===i)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push("".concat(t,":").concat(n)),!1)),"{".concat(e.join(", "),"}")}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _r(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _r(this.root,e,this.comparator,!1)}getReverseIterator(){return new _r(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _r(this.root,e,this.comparator,!0)}}class _r{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Tr{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=null!=n?n:Tr.RED,this.left=null!=i?i:Tr.EMPTY,this.right=null!=s?s:Tr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new Tr(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=i?i:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):0===s?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Tr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),0===t(e,i.key)){if(i.right.isEmpty())return Tr.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Tr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Tr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw vs(43730,{key:this.key,value:this.value});if(this.right.isRed())throw vs(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw vs(27949);return e+(this.isRed()?0:1)}}Tr.EMPTY=null,Tr.RED=!0,Tr.BLACK=!1,Tr.EMPTY=new class{constructor(){this.size=0}get key(){throw vs(57766)}get value(){throw vs(16141)}get color(){throw vs(16727)}get left(){throw vs(29726)}get right(){throw vs(36894)}copy(e,t,n,i,s){return this}insert(e,t,n){return new Tr(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ir{constructor(e){this.comparator=e,this.data=new br(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xr(this.data.getIterator())}getIteratorFrom(e){return new xr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Ir))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,i=n.getNext().key;if(0!==this.comparator(e,i))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ir(this.comparator);return t.data=e,t}}class xr{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e){this.fields=e,e.sort(Ks.comparator)}static empty(){return new Er([])}unionWith(e){let t=new Ir(Ks.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Er(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Fs(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new Sr("Invalid base64 string: "+t):t}}(e);return new kr(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new kr(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ls(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}kr.EMPTY_BYTE_STRING=new kr("");const Cr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nr(e){if(bs(!!e,39018),"string"==typeof e){let t=0;const n=Cr.exec(e);if(bs(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const i=new Date(e);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:Ar(e.seconds),nanos:Ar(e.nanos)}}function Ar(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Dr(e){return"string"==typeof e?kr.fromBase64String(e):kr.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr="server_timestamp",Pr="__type__",Or="__previous_value__",Lr="__local_write_time__";function Mr(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[Pr])?void 0:n.stringValue)===Rr}function jr(e){const t=e.mapValue.fields[Or];return Mr(t)?jr(t):t}function Vr(e){const t=Nr(e.mapValue.fields[Lr].timestampValue);return new ir(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t,n,i,s,r,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=l}}const Fr="(default)";class qr{constructor(e,t){this.projectId=e,this.database=t||Fr}static empty(){return new qr("","")}get isDefaultDatabase(){return this.database===Fr}isEqual(e){return e instanceof qr&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="__type__",zr="__max__",Hr={},Kr="__vector__",Gr="value";function Wr(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Mr(e)?4:function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===zr}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?9007199254740991:function(e){var t,n;const i=null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[Br])?void 0:n.stringValue;return i===Kr}(e)?10:11:vs(28295,{value:e})}function Qr(e,t){if(e===t)return!0;const n=Wr(e);if(n!==Wr(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Vr(e).isEqual(Vr(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Nr(e.timestampValue),i=Nr(t.timestampValue);return n.seconds===i.seconds&&n.nanos===i.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return i=t,Dr(e.bytesValue).isEqual(Dr(i.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Ar(e.geoPointValue.latitude)===Ar(t.geoPointValue.latitude)&&Ar(e.geoPointValue.longitude)===Ar(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Ar(e.integerValue)===Ar(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Ar(e.doubleValue),i=Ar(t.doubleValue);return n===i?pr(n)===pr(i):isNaN(n)&&isNaN(i)}return!1}(e,t);case 9:return Fs(e.arrayValue.values||[],t.arrayValue.values||[],Qr);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},i=t.mapValue.fields||{};if(yr(n)!==yr(i))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===i[s]||!Qr(n[s],i[s])))return!1;return!0}(e,t);default:return vs(52216,{left:e})}var i}function Xr(e,t){return void 0!==(e.values||[]).find(e=>Qr(e,t))}function Jr(e,t){if(e===t)return 0;const n=Wr(e),i=Wr(t);if(n!==i)return Ls(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ls(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Ar(e.integerValue||e.doubleValue),i=Ar(t.integerValue||t.doubleValue);return n<i?-1:n>i?1:n===i?0:isNaN(n)?isNaN(i)?0:-1:1}(e,t);case 3:return Yr(e.timestampValue,t.timestampValue);case 4:return Yr(Vr(e),Vr(t));case 5:return Ms(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Dr(e),i=Dr(t);return n.compareTo(i)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),i=t.split("/");for(let s=0;s<n.length&&s<i.length;s++){const e=Ls(n[s],i[s]);if(0!==e)return e}return Ls(n.length,i.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Ls(Ar(e.latitude),Ar(t.latitude));return 0!==n?n:Ls(Ar(e.longitude),Ar(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Zr(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,i,s,r;const o=e.fields||{},a=t.fields||{},c=null==(n=o[Gr])?void 0:n.arrayValue,l=null==(i=a[Gr])?void 0:i.arrayValue,u=Ls((null==(s=null==c?void 0:c.values)?void 0:s.length)||0,(null==(r=null==l?void 0:l.values)?void 0:r.length)||0);return 0!==u?u:Zr(c,l)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Hr&&t===Hr)return 0;if(e===Hr)return 1;if(t===Hr)return-1;const n=e.fields||{},i=Object.keys(n),s=t.fields||{},r=Object.keys(s);i.sort(),r.sort();for(let o=0;o<i.length&&o<r.length;++o){const e=Ms(i[o],r[o]);if(0!==e)return e;const t=Jr(n[i[o]],s[r[o]]);if(0!==t)return t}return Ls(i.length,r.length)}(e.mapValue,t.mapValue);default:throw vs(23264,{he:n})}}function Yr(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Ls(e,t);const n=Nr(e),i=Nr(t),s=Ls(n.seconds,i.seconds);return 0!==s?s:Ls(n.nanos,i.nanos)}function Zr(e,t){const n=e.values||[],i=t.values||[];for(let s=0;s<n.length&&s<i.length;++s){const e=Jr(n[s],i[s]);if(e)return e}return Ls(n.length,i.length)}function $r(e){return eo(e)}function eo(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Nr(e);return"time(".concat(t.seconds,",").concat(t.nanos,")")}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Dr(e.bytesValue).toBase64():"referenceValue"in e?function(e){return Gs.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return"geo(".concat(e.latitude,",").concat(e.longitude,")")}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const i of e.values||[])n?n=!1:t+=",",t+=eo(i);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",i=!0;for(const s of t)i?i=!1:n+=",",n+="".concat(s,":").concat(eo(e.fields[s]));return n+"}"}(e.mapValue):vs(61005,{value:e})}function to(e){switch(Wr(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=jr(e);return t?16+to(t):16;case 5:return 2*e.stringValue.length;case 6:return Dr(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+to(t),0);case 10:case 11:return function(e){let t=0;return vr(e.fields,(e,n)=>{t+=e.length+to(n)}),t}(e.mapValue);default:throw vs(13486,{value:e})}}function no(e,t){return{referenceValue:"projects/".concat(e.projectId,"/databases/").concat(e.database,"/documents/").concat(t.path.canonicalString())}}function io(e){return!!e&&"integerValue"in e}function so(e){return!!e&&"arrayValue"in e}function ro(e){return!!e&&"nullValue"in e}function oo(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ao(e){return!!e&&"mapValue"in e}function co(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return vr(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=co(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=co(e.arrayValue.values[n]);return t}return{...e}}class lo{constructor(e){this.value=e}static empty(){return new lo({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ao(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=co(t)}setAll(e){let t=Ks.emptyPath(),n={},i=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,i),n={},i=[],t=s.popLast()}e?n[s.lastSegment()]=co(e):i.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());ao(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];ao(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){vr(t,(t,n)=>e[t]=n);for(const i of n)delete e[i]}clone(){return new lo(co(this.value))}}function uo(e){const t=[];return vr(e.fields,(e,n)=>{const i=new Ks([e]);if(ao(n)){const e=uo(n.mapValue).fields;if(0===e.length)t.push(i);else for(const n of e)t.push(i.child(n))}else t.push(i)}),new Er(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class ho{constructor(e,t,n,i,s,r,o){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=r,this.documentState=o}static newInvalidDocument(e){return new ho(e,0,sr.min(),sr.min(),sr.min(),lo.empty(),0)}static newFoundDocument(e,t,n,i){return new ho(e,1,t,sr.min(),n,i,0)}static newNoDocument(e,t){return new ho(e,2,t,sr.min(),sr.min(),lo.empty(),0)}static newUnknownDocument(e,t){return new ho(e,3,t,sr.min(),sr.min(),lo.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(sr.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=lo.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=lo.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=sr.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof ho&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ho(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.position=e,this.inclusive=t}}function po(e,t,n){let i=0;for(let s=0;s<e.position.length;s++){const r=t[s],o=e.position[s];if(i=r.field.isKeyField()?Gs.comparator(Gs.fromName(o.referenceValue),n.key):Jr(o,n.data.field(r.field)),"desc"===r.dir&&(i*=-1),0!==i)break}return i}function mo(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Qr(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t="asc"){this.field=e,this.dir=t}}function yo(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{}class wo extends vo{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new So(e,t,n):"array-contains"===t?new Ao(e,n):"in"===t?new Do(e,n):"not-in"===t?new Ro(e,n):"array-contains-any"===t?new Po(e,n):new wo(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ko(e,n):new Co(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Jr(t,this.value)):null!==t&&Wr(this.value)===Wr(t)&&this.matchesComparison(Jr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return vs(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class bo extends vo{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new bo(e,t)}matches(e){return _o(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function _o(e){return"and"===e.op}function To(e){return function(e){for(const t of e.filters)if(t instanceof bo)return!1;return!0}(e)&&_o(e)}function Io(e){if(e instanceof wo)return e.field.canonicalString()+e.op.toString()+$r(e.value);if(To(e))return e.filters.map(e=>Io(e)).join(",");{const t=e.filters.map(e=>Io(e)).join(",");return"".concat(e.op,"(").concat(t,")")}}function xo(e,t){return e instanceof wo?(n=e,(i=t)instanceof wo&&n.op===i.op&&n.field.isEqual(i.field)&&Qr(n.value,i.value)):e instanceof bo?function(e,t){return t instanceof bo&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,i)=>e&&xo(n,t.filters[i]),!0)}(e,t):void vs(19439);var n,i}function Eo(e){return e instanceof wo?"".concat((t=e).field.canonicalString()," ").concat(t.op," ").concat($r(t.value)):e instanceof bo?function(e){return e.op.toString()+" {"+e.getFilters().map(Eo).join(" ,")+"}"}(e):"Filter";var t}class So extends wo{constructor(e,t,n){super(e,t,n),this.key=Gs.fromName(n.referenceValue)}matches(e){const t=Gs.comparator(e.key,this.key);return this.matchesComparison(t)}}class ko extends wo{constructor(e,t){super(e,"in",t),this.keys=No("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Co extends wo{constructor(e,t){super(e,"not-in",t),this.keys=No("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function No(e,t){var n;return((null==(n=t.arrayValue)?void 0:n.values)||[]).map(e=>Gs.fromName(e.referenceValue))}class Ao extends wo{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return so(t)&&Xr(t.arrayValue,this.value)}}class Do extends wo{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Xr(this.value.arrayValue,t)}}class Ro extends wo{constructor(e,t){super(e,"not-in",t)}matches(e){if(Xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Xr(this.value.arrayValue,t)}}class Po extends wo{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!so(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Xr(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t=null,n=[],i=[],s=null,r=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=r,this.endAt=o,this.Te=null}}function Lo(e,t=null,n=[],i=[],s=null,r=null,o=null){return new Oo(e,t,n,i,s,r,o)}function Mo(e){const t=_s(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Io(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),fr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>$r(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>$r(e)).join(",")),t.Te=e}return t.Te}function jo(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!yo(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!xo(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!mo(e.startAt,t.startAt)&&mo(e.endAt,t.endAt)}function Vo(e){return Gs.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t=null,n=[],i=[],s=null,r="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=r,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Fo(e){return new Uo(e)}function qo(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Bo(e){return null!==e.collectionGroup}function zo(e){const t=_s(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new Ir(Ks.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new go(i,n))}),e.has(Ks.keyField().canonicalString())||t.Ie.push(new go(Ks.keyField(),n))}return t.Ie}function Ho(e){const t=_s(e);return t.Ee||(t.Ee=function(e,t){if("F"===e.limitType)return Lo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new go(e.field,t)});const n=e.endAt?new fo(e.endAt.position,e.endAt.inclusive):null,i=e.startAt?new fo(e.startAt.position,e.startAt.inclusive):null;return Lo(e.path,e.collectionGroup,t,e.filters,e.limit,n,i)}}(t,zo(e))),t.Ee}function Ko(e,t){const n=e.filters.concat([t]);return new Uo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Go(e,t,n){return new Uo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Wo(e,t){return jo(Ho(e),Ho(t))&&e.limitType===t.limitType}function Qo(e){return"".concat(Mo(Ho(e)),"|lt:").concat(e.limitType)}function Xo(e){return"Query(target=".concat(function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=", filters: [".concat(e.filters.map(e=>Eo(e)).join(", "),"]")),fr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=", orderBy: [".concat(e.orderBy.map(e=>{return"".concat((t=e).field.canonicalString()," (").concat(t.dir,")");var t}).join(", "),"]")),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>$r(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>$r(e)).join(",")),"Target(".concat(t,")")}(Ho(e)),"; limitType=").concat(e.limitType,")")}function Jo(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Gs.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of zo(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(i=t,!((n=e).startAt&&!function(e,t,n){const i=po(e,t,n);return e.inclusive?i<=0:i<0}(n.startAt,zo(n),i)||n.endAt&&!function(e,t,n){const i=po(e,t,n);return e.inclusive?i>=0:i>0}(n.endAt,zo(n),i)));var n,i}function Yo(e){return(t,n)=>{let i=!1;for(const s of zo(e)){const e=Zo(s,t,n);if(0!==e)return e;i=i||s.field.isKeyField()}return 0}}function Zo(e,t,n){const i=e.field.isKeyField()?Gs.comparator(t.key,n.key):function(e,t,n){const i=t.data.field(e),s=n.data.field(e);return null!==i&&null!==s?Jr(i,s):vs(42886)}(e.field,t,n);switch(e.dir){case"asc":return i;case"desc":return-1*i;default:return vs(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[i,s]of n)if(this.equalsFn(i,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(void 0===i)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return 1===n.length?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vr(this.inner,(t,n)=>{for(const[i,s]of n)e(i,s)})}isEmpty(){return wr(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea=new br(Gs.comparator);function ta(){return ea}const na=new br(Gs.comparator);function ia(...e){let t=na;for(const n of e)t=t.insert(n.key,n);return t}function sa(e){let t=na;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ra(){return aa()}function oa(){return aa()}function aa(){return new $o(e=>e.toString(),(e,t)=>e.isEqual(t))}const ca=new br(Gs.comparator),la=new Ir(Gs.comparator);function ua(...e){let t=la;for(const n of e)t=t.add(n);return t}const ha=new Ir(Ls);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function da(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:pr(t)?"-0":t}}function fa(e){return{integerValue:""+e}}function pa(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!pr(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)?fa(t):da(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(){this._=void 0}}function ga(e,t,n){return e instanceof wa?function(e,t){const n={fields:{[Pr]:{stringValue:Rr},[Lr]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Mr(t)&&(t=jr(t)),t&&(n.fields[Or]=t),{mapValue:n}}(n,t):e instanceof ba?_a(e,t):e instanceof Ta?Ia(e,t):function(e,t){const n=va(e,t),i=Ea(n)+Ea(e.Ae);return io(n)&&io(e.Ae)?fa(i):da(e.serializer,i)}(e,t)}function ya(e,t,n){return e instanceof ba?_a(e,t):e instanceof Ta?Ia(e,t):n}function va(e,t){return e instanceof xa?io(n=t)||(i=n)&&"doubleValue"in i?t:{integerValue:0}:null;var n,i}class wa extends ma{}class ba extends ma{constructor(e){super(),this.elements=e}}function _a(e,t){const n=Sa(t);for(const i of e.elements)n.some(e=>Qr(e,i))||n.push(i);return{arrayValue:{values:n}}}class Ta extends ma{constructor(e){super(),this.elements=e}}function Ia(e,t){let n=Sa(t);for(const i of e.elements)n=n.filter(e=>!Qr(e,i));return{arrayValue:{values:n}}}class xa extends ma{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Ea(e){return Ar(e.integerValue||e.doubleValue)}function Sa(e){return so(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t){this.field=e,this.transform=t}}class Ca{constructor(e,t){this.version=e,this.transformResults=t}}class Na{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Na}static exists(e){return new Na(void 0,e)}static updateTime(e){return new Na(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Aa(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Da{}function Ra(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Ba(e.key,Na.none()):new ja(e.key,e.data,Na.none());{const n=e.data,i=lo.empty();let s=new Ir(Ks.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?i.delete(e):i.set(e,t),s=s.add(e)}return new Va(e.key,i,new Er(s.toArray()),Na.none())}}function Pa(e,t,n){var i;e instanceof ja?function(e,t,n){const i=e.value.clone(),s=Fa(e.fieldTransforms,t,n.transformResults);i.setAll(s),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):e instanceof Va?function(e,t,n){if(!Aa(e.precondition,t))return void t.convertToUnknownDocument(n.version);const i=Fa(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(Ua(e)),s.setAll(i),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):(i=n,t.convertToNoDocument(i.version).setHasCommittedMutations())}function Oa(e,t,n,i){return e instanceof ja?function(e,t,n,i){if(!Aa(e.precondition,t))return n;const s=e.value.clone(),r=qa(e.fieldTransforms,i,t);return s.setAll(r),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,i):e instanceof Va?function(e,t,n,i){if(!Aa(e.precondition,t))return n;const s=qa(e.fieldTransforms,i,t),r=t.data;return r.setAll(Ua(e)),r.setAll(s),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,i):(s=t,r=n,Aa(e.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):r);var s,r}function La(e,t){let n=null;for(const i of e.fieldTransforms){const e=t.data.field(i.field),s=va(i.transform,e||null);null!=s&&(null===n&&(n=lo.empty()),n.set(i.field,s))}return n||null}function Ma(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,i=t.fieldTransforms,!!(void 0===n&&void 0===i||n&&i&&Fs(n,i,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,i=t.transform,n instanceof ba&&i instanceof ba||n instanceof Ta&&i instanceof Ta?Fs(n.elements,i.elements,Qr):n instanceof xa&&i instanceof xa?Qr(n.Ae,i.Ae):n instanceof wa&&i instanceof wa);var n,i}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,i}class ja extends Da{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Va extends Da{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Ua(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const i=e.data.field(n);t.set(n,i)}}),t}function Fa(e,t,n){const i=new Map;bs(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let s=0;s<n.length;s++){const r=e[s],o=r.transform,a=t.data.field(r.field);i.set(r.field,ya(o,a,n[s]))}return i}function qa(e,t,n){const i=new Map;for(const s of e){const e=s.transform,r=n.data.field(s.field);i.set(s.field,ga(e,r,t))}return i}class Ba extends Da{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class za extends Da{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const t=this.mutations[i];t.key.isEqual(e.key)&&Pa(t,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Oa(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Oa(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=oa();return this.mutations.forEach(i=>{const s=e.get(i.key),r=s.overlayedDocument;let o=this.applyToLocalView(r,s.mutatedFields);o=t.has(i.key)?null:o;const a=Ra(r,o);null!==a&&n.set(i.key,a),r.isValidDocument()||r.convertToNoDocument(sr.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ua())}isEqual(e){return this.batchId===e.batchId&&Fs(this.mutations,e.mutations,(e,t)=>Ma(e,t))&&Fs(this.baseMutations,e.baseMutations,(e,t)=>Ma(e,t))}}class Ka{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){bs(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let i=function(){return ca}();const s=e.mutations;for(let r=0;r<s.length;r++)i=i.insert(s[r].key,n[r].version);return new Ka(e,t,n,i)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return"Overlay{\n      largestBatchId: ".concat(this.largestBatchId,",\n      mutation: ").concat(this.mutation.toString(),"\n    }")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qa,Xa;function Ja(e){if(void 0===e)return ms("GRPC error has no .code"),Ts.UNKNOWN;switch(e){case Qa.OK:return Ts.OK;case Qa.CANCELLED:return Ts.CANCELLED;case Qa.UNKNOWN:return Ts.UNKNOWN;case Qa.DEADLINE_EXCEEDED:return Ts.DEADLINE_EXCEEDED;case Qa.RESOURCE_EXHAUSTED:return Ts.RESOURCE_EXHAUSTED;case Qa.INTERNAL:return Ts.INTERNAL;case Qa.UNAVAILABLE:return Ts.UNAVAILABLE;case Qa.UNAUTHENTICATED:return Ts.UNAUTHENTICATED;case Qa.INVALID_ARGUMENT:return Ts.INVALID_ARGUMENT;case Qa.NOT_FOUND:return Ts.NOT_FOUND;case Qa.ALREADY_EXISTS:return Ts.ALREADY_EXISTS;case Qa.PERMISSION_DENIED:return Ts.PERMISSION_DENIED;case Qa.FAILED_PRECONDITION:return Ts.FAILED_PRECONDITION;case Qa.ABORTED:return Ts.ABORTED;case Qa.OUT_OF_RANGE:return Ts.OUT_OF_RANGE;case Qa.UNIMPLEMENTED:return Ts.UNIMPLEMENTED;case Qa.DATA_LOSS:return Ts.DATA_LOSS;default:return vs(39323,{code:e})}}(Xa=Qa||(Qa={}))[Xa.OK=0]="OK",Xa[Xa.CANCELLED=1]="CANCELLED",Xa[Xa.UNKNOWN=2]="UNKNOWN",Xa[Xa.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Xa[Xa.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Xa[Xa.NOT_FOUND=5]="NOT_FOUND",Xa[Xa.ALREADY_EXISTS=6]="ALREADY_EXISTS",Xa[Xa.PERMISSION_DENIED=7]="PERMISSION_DENIED",Xa[Xa.UNAUTHENTICATED=16]="UNAUTHENTICATED",Xa[Xa.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Xa[Xa.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Xa[Xa.ABORTED=10]="ABORTED",Xa[Xa.OUT_OF_RANGE=11]="OUT_OF_RANGE",Xa[Xa.UNIMPLEMENTED=12]="UNIMPLEMENTED",Xa[Xa.INTERNAL=13]="INTERNAL",Xa[Xa.UNAVAILABLE=14]="UNAVAILABLE",Xa[Xa.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ya=new Ji([4294967295,4294967295],0);function Za(e){const t=(new TextEncoder).encode(e),n=new Yi;return n.update(t),new Uint8Array(n.digest())}function $a(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),r=t.getUint32(12,!0);return[new Ji([n,i],0),new Ji([s,r],0)]}class ec{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new tc("Invalid padding: ".concat(t));if(n<0)throw new tc("Invalid hash count: ".concat(n));if(e.length>0&&0===this.hashCount)throw new tc("Invalid hash count: ".concat(n));if(0===e.length&&0!==t)throw new tc("Invalid padding when bitmap length is 0: ".concat(t));this.ge=8*e.length-t,this.pe=Ji.fromNumber(this.ge)}ye(e,t,n){let i=e.add(t.multiply(Ji.fromNumber(n)));return 1===i.compare(Ya)&&(i=new Ji([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Za(e),[n,i]=$a(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,i,s);if(!this.we(e))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),r=new ec(s,i,t);return n.forEach(e=>r.insert(e)),r}insert(e){if(0===this.ge)return;const t=Za(e),[n,i]=$a(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,i,s);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class tc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,ic.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new nc(sr.min(),i,new br(Ls),ta(),ua())}}class ic{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ic(n,t,ua(),ua(),ua())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t,n,i){this.be=e,this.removedTargetIds=t,this.key=n,this.De=i}}class rc{constructor(e,t){this.targetId=e,this.Ce=t}}class oc{constructor(e,t,n=kr.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class ac{constructor(){this.ve=0,this.Fe=uc(),this.Me=kr.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ua(),t=ua(),n=ua();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:vs(38017,{changeType:s})}}),new ic(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=uc()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,bs(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class cc{constructor(e){this.Ge=e,this.ze=new Map,this.je=ta(),this.Je=lc(),this.He=lc(),this.Ye=new br(Ls)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:vs(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(Vo(s))if(0===n){const e=new Gs(s.path);this.et(t,e,ho.newNoDocument(e,sr.min()))}else bs(1===n,20013,{expectedCount:n});else{const i=this._t(t);if(i!==n){const n=this.ut(e),s=n?this.ct(n,e,i):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let r,o;try{r=Dr(n).toUint8Array()}catch(a){if(a instanceof Sr)return gs("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new ec(r,i,s)}catch(a){return gs(a instanceof tc?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let i=0;return n.forEach(n=>{const s=this.Ge.ht(),r="projects/".concat(s.projectId,"/databases/").concat(s.database,"/documents/").concat(n.path.canonicalString());e.mightContain(r)||(this.et(t,n,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((n,i)=>{const s=this.ot(i);if(s){if(n.current&&Vo(s.target)){const t=new Gs(s.target.path);this.It(t).has(i)||this.Et(i,t)||this.et(i,t,ho.newNoDocument(t,e))}n.Be&&(t.set(i,n.ke()),n.qe())}});let n=ua();this.He.forEach((e,t)=>{let i=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(i=!1,!1)}),i&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const i=new nc(e,t,this.Ye,this.je,n);return this.je=ta(),this.Je=lc(),this.He=lc(),this.Ye=new br(Ls),i}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.Qe(t,1):i.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new ac,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Ir(Ls),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ir(Ls),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||ps("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new ac),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function lc(){return new br(Gs.comparator)}function uc(){return new br(Gs.comparator)}const hc=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),dc=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),fc=(()=>({and:"AND",or:"OR"}))();class pc{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function mc(e,t){return e.useProto3Json||fr(t)?t:{value:t}}function gc(e,t){return e.useProto3Json?"".concat(new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z",""),".").concat(("000000000"+t.nanoseconds).slice(-9),"Z"):{seconds:""+t.seconds,nanos:t.nanoseconds}}function yc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function vc(e,t){return gc(e,t.toTimestamp())}function wc(e){return bs(!!e,49232),sr.fromTimestamp(function(e){const t=Nr(e);return new ir(t.seconds,t.nanos)}(e))}function bc(e,t){return _c(e,t).canonicalString()}function _c(e,t){const n=(i=e,new zs(["projects",i.projectId,"databases",i.database])).child("documents");var i;return void 0===t?n:n.child(t)}function Tc(e){const t=zs.fromString(e);return bs(Fc(t),10190,{key:t.toString()}),t}function Ic(e,t){return bc(e.databaseId,t.path)}function xc(e,t){const n=Tc(t);if(n.get(1)!==e.databaseId.projectId)throw new Is(Ts.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Is(Ts.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Gs(kc(n))}function Ec(e,t){return bc(e.databaseId,t)}function Sc(e){return new zs(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function kc(e){return bs(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Cc(e,t,n){return{name:Ic(e,t),fields:n.value.mapValue.fields}}function Nc(e,t){return{documents:[Ec(e,t.path)]}}function Ac(e,t){const n={structuredQuery:{}},i=t.path;let s;null!==t.collectionGroup?(s=i,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=Ec(e,s);const r=function(e){if(0!==e.length)return Vc(bo.create(e,"and"))}(t.filters);r&&(n.structuredQuery.where=r);const o=function(e){if(0!==e.length)return e.map(e=>{return{field:Mc((t=e).field),direction:Pc(t.dir)};var t})}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=mc(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:s};var c}function Dc(e){let t=function(e){const t=Tc(e);return 4===t.length?zs.emptyPath():kc(t)}(e.parent);const n=e.structuredQuery,i=n.from?n.from.length:0;let s=null;if(i>0){bs(1===i,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let r=[];n.where&&(r=function(e){const t=Rc(e);return t instanceof bo&&To(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>{return new go(jc((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,fr(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new fo(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){const t=!e.before,n=e.values||[];return new fo(n,t)}(n.endAt)),function(e,t,n,i,s,r,o,a){return new Uo(e,t,n,i,s,r,o,a)}(t,s,o,r,a,"F",c,l)}function Rc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=jc(e.unaryFilter.field);return wo.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=jc(e.unaryFilter.field);return wo.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=jc(e.unaryFilter.field);return wo.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=jc(e.unaryFilter.field);return wo.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return vs(61313);default:return vs(60726)}}(e):void 0!==e.fieldFilter?(t=e,wo.create(jc(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return vs(58110);default:return vs(50506)}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return bo.create(e.compositeFilter.filters.map(e=>Rc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return vs(1026)}}(e.compositeFilter.op))}(e):vs(30097,{filter:e});var t}function Pc(e){return hc[e]}function Oc(e){return dc[e]}function Lc(e){return fc[e]}function Mc(e){return{fieldPath:e.canonicalString()}}function jc(e){return Ks.fromServerFormat(e.fieldPath)}function Vc(e){return e instanceof wo?function(e){if("=="===e.op){if(oo(e.value))return{unaryFilter:{field:Mc(e.field),op:"IS_NAN"}};if(ro(e.value))return{unaryFilter:{field:Mc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(oo(e.value))return{unaryFilter:{field:Mc(e.field),op:"IS_NOT_NAN"}};if(ro(e.value))return{unaryFilter:{field:Mc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Mc(e.field),op:Oc(e.op),value:e.value}}}(e):e instanceof bo?function(e){const t=e.getFilters().map(e=>Vc(e));return 1===t.length?t[0]:{compositeFilter:{op:Lc(e.op),filters:t}}}(e):vs(54877,{filter:e})}function Uc(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Fc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t,n,i,s=sr.min(),r=sr.min(),o=kr.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new qc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new qc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new qc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new qc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e){this.yt=e}}function zc(e){const t=Dc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Go(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(){this.Cn=new Kc}addToCollectionParentIndex(e,t){return this.Cn.add(t),ur.resolve()}getCollectionParents(e,t){return ur.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return ur.resolve()}deleteFieldIndex(e,t){return ur.resolve()}deleteAllFieldIndexes(e){return ur.resolve()}createTargetIndexes(e,t){return ur.resolve()}getDocumentsMatchingTarget(e,t){return ur.resolve(null)}getIndexType(e,t){return ur.resolve(0)}getFieldIndexes(e,t){return ur.resolve([])}getNextCollectionGroupToUpdate(e){return ur.resolve(null)}getMinOffset(e,t){return ur.resolve(or.min())}getMinOffsetFromCollectionGroup(e,t){return ur.resolve(or.min())}updateCollectionGroup(e,t,n){return ur.resolve()}updateIndexEntries(e,t){return ur.resolve()}}class Kc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new Ir(zs.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new Ir(zs.comparator)).toArray()}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Wc=41943040;class Qc{static withCacheSize(e){return new Qc(e,Qc.DEFAULT_COLLECTION_PERCENTILE,Qc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qc.DEFAULT_COLLECTION_PERCENTILE=10,Qc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Qc.DEFAULT=new Qc(Wc,Qc.DEFAULT_COLLECTION_PERCENTILE,Qc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Qc.DISABLED=new Qc(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xc{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Xc(0)}static cr(){return new Xc(-1)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="LruGarbageCollector";function Yc([e,t],[n,i]){const s=Ls(e,n);return 0===s?Ls(t,i):s}class Zc{constructor(e){this.Ir=e,this.buffer=new Ir(Yc),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Yc(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class $c{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){ps(Jc,"Garbage collection scheduled in ".concat(e,"ms")),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){hr(e)?ps(Jc,"Ignoring IndexedDB error during garbage collection: ",e):await lr(e)}await this.Vr(3e5)})}}class el{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ur.resolve(dr.ce);const n=new Zc(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(ps("LruGarbageCollector","Garbage collection skipped; disabled"),ur.resolve(Gc)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(ps("LruGarbageCollector","Garbage collection skipped; Cache size ".concat(n," is lower than threshold ").concat(this.params.cacheSizeCollectionThreshold)),Gc):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,i,s,r,o,a,c;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(ps("LruGarbageCollector","Capping sequence numbers to collect down to the maximum of ".concat(this.params.maximumSequenceNumbersToCollect," from ").concat(t)),i=this.params.maximumSequenceNumbersToCollect):i=t,r=Date.now(),this.nthSequenceNumber(e,i))).next(i=>(n=i,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),fs()<=j.DEBUG&&ps("LruGarbageCollector","LRU Garbage Collection\n\tCounted targets in ".concat(r-l,"ms\n\tDetermined least recently used ").concat(i," in ")+(o-r)+"ms\n"+"\tRemoved ".concat(s," targets in ")+(a-o)+"ms\n"+"\tRemoved ".concat(e," documents in ")+(c-a)+"ms\n"+"Total Duration: ".concat(c-l,"ms")),ur.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:e})))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tl{constructor(){this.changes=new $o(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ho.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ur.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Oa(n.mutation,e,Er.empty(),ir.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ua()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ua()){const i=ra();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(e=>{let t=ia();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=ra();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ua()))}populateOverlays(e,t,n){const i=[];return n.forEach(e=>{t.has(e)||i.push(e)}),this.documentOverlayCache.getOverlays(e,i).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,i){let s=ta();const r=aa(),o=aa();return t.forEach((e,t)=>{const o=n.get(t.key);i.has(t.key)&&(void 0===o||o.mutation instanceof Va)?s=s.insert(t.key,t):void 0!==o?(r.set(t.key,o.mutation.getFieldMask()),Oa(o.mutation,t,o.mutation.getFieldMask(),ir.now())):r.set(t.key,Er.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>r.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new nl(t,null!=(n=r.get(e))?n:null))}),o))}recalculateAndSaveOverlays(e,t){const n=aa();let i=new br((e,t)=>e-t),s=ua();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const r=t.get(e);if(null===r)return;let o=n.get(e)||Er.empty();o=s.applyToLocalView(r,o),n.set(e,o);const a=(i.get(s.batchId)||ua()).add(e);i=i.insert(s.batchId,a)})}).next(()=>{const r=[],o=i.getReverseIterator();for(;o.hasNext();){const i=o.getNext(),a=i.key,c=i.value,l=oa();c.forEach(e=>{if(!s.has(e)){const i=Ra(t.get(e),n.get(e));null!==i&&l.set(e,i),s=s.add(e)}}),r.push(this.documentOverlayCache.saveOverlays(e,a,l))}return ur.waitFor(r)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,i){return s=t,Gs.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):Bo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i);var s}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{const r=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):ur.resolve(ra());let o=-1,a=s;return r.next(t=>ur.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?ur.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,ua())).next(e=>({batchId:o,changes:sa(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Gs(t)).next(e=>{let t=ia();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let r=ia();return this.indexManager.getCollectionParents(e,s).next(o=>ur.forEach(o,o=>{const a=(c=t,l=o.child(s),new Uo(l,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,l;return this.getDocumentsMatchingCollectionQuery(e,a,n,i).next(e=>{e.forEach((e,t)=>{r=r.insert(e,t)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(r=>(s=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(e=>{s.forEach((t,n)=>{const i=n.getKey();null===e.get(i)&&(e=e.insert(i,ho.newInvalidDocument(i)))});let n=ia();return e.forEach((e,i)=>{const r=s.get(e);void 0!==r&&Oa(r.mutation,i,Er.empty(),ir.now()),Jo(t,i)&&(n=n.insert(e,i))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return ur.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,{id:(n=t).id,version:n.version,createTime:wc(n.createTime)}),ur.resolve();var n}getNamedQuery(e,t){return ur.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,{name:(n=t).name,query:zc(n.bundledQuery),readTime:wc(n.readTime)}),ur.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(){this.overlays=new br(Gs.comparator),this.qr=new Map}getOverlay(e,t){return ur.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ra();return ur.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,i)=>{this.St(e,t,i)}),ur.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.qr.get(n);return void 0!==i&&(i.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),ur.resolve()}getOverlaysForCollection(e,t,n){const i=ra(),s=t.length+1,r=new Gs(t.child("")),o=this.overlays.getIteratorFrom(r);for(;o.hasNext();){const e=o.getNext().value,r=e.getKey();if(!t.isPrefixOf(r.path))break;r.path.length===s&&e.largestBatchId>n&&i.set(e.getKey(),e)}return ur.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new br((e,t)=>e-t);const r=this.overlays.getIterator();for(;r.hasNext();){const e=r.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=ra(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=ra(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=i)););return ur.resolve(o)}St(e,t,n){const i=this.overlays.get(n.key);if(null!==i){const e=this.qr.get(i.largestBatchId).delete(n.key);this.qr.set(i.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Ga(t,n));let s=this.qr.get(t);void 0===s&&(s=ua(),this.qr.set(t,s)),this.qr.set(t,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(){this.sessionToken=kr.EMPTY_BYTE_STRING}getSessionToken(e){return ur.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ur.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(){this.Qr=new Ir(cl.$r),this.Ur=new Ir(cl.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new cl(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new cl(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new Gs(new zs([])),n=new cl(t,e),i=new cl(t,e+1),s=[];return this.Ur.forEachInRange([n,i],e=>{this.Gr(e),s.push(e.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new Gs(new zs([])),n=new cl(t,e),i=new cl(t,e+1);let s=ua();return this.Ur.forEachInRange([n,i],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new cl(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class cl{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return Gs.comparator(e.key,t.key)||Ls(e.Yr,t.Yr)}static Kr(e,t){return Ls(e.Yr,t.Yr)||Gs.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Ir(cl.$r)}checkEmpty(e){return ur.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,i){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Ha(s,t,n,i);this.mutationQueue.push(r);for(const o of i)this.Zr=this.Zr.add(new cl(o.key,s)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return ur.resolve(r)}lookupMutationBatch(e,t){return ur.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.ei(n),s=i<0?0:i;return ur.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return ur.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return ur.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new cl(t,0),i=new cl(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([n,i],e=>{const t=this.Xr(e.Yr);s.push(t)}),ur.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Ir(Ls);return t.forEach(e=>{const t=new cl(e,0),i=new cl(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,i],e=>{n=n.add(e.Yr)})}),ur.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;Gs.isDocumentKey(s)||(s=s.child(""));const r=new cl(new Gs(s),0);let o=new Ir(Ls);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===i&&(o=o.add(e.Yr)),!0)},r),ur.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){bs(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return ur.forEach(t.mutations,i=>{const s=new cl(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new cl(t,0),i=this.Zr.firstAfterOrEqual(n);return ur.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,ur.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e){this.ri=e,this.docs=new br(Gs.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,r=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:r}),this.size+=r-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ur.resolve(n?n.document.mutableCopy():ho.newInvalidDocument(t))}getEntries(e,t){let n=ta();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():ho.newInvalidDocument(e))}),ur.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=ta();const r=t.path,o=new Gs(r.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!r.isPrefixOf(e.path))break;e.path.length>r.length+1||ar(rr(o),n)<=0||(i.has(o.key)||Jo(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return ur.resolve(s)}getAllFromCollectionGroup(e,t,n,i){vs(9500)}ii(e,t){return ur.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new hl(this)}getSize(e){return ur.resolve(this.size)}}class hl extends tl{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.Nr.addEntry(e,i)):this.Nr.removeEntry(n)}),ur.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e){this.persistence=e,this.si=new $o(e=>Mo(e),jo),this.lastRemoteSnapshotVersion=sr.min(),this.highestTargetId=0,this.oi=0,this._i=new al,this.targetCount=0,this.ai=Xc.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),ur.resolve()}getLastRemoteSnapshotVersion(e){return ur.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ur.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),ur.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),ur.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Xc(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,ur.resolve()}updateTargetData(e,t){return this.Pr(t),ur.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,ur.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.si.forEach((r,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(r),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),i++)}),ur.waitFor(s).next(()=>i)}getTargetCount(e){return ur.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return ur.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),ur.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(t=>{s.push(i.markPotentiallyOrphaned(e,t))}),ur.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),ur.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return ur.resolve(n)}containsKey(e,t){return ur.resolve(this._i.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,t){this.ui={},this.overlays={},this.ci=new dr(0),this.li=!1,this.li=!0,this.hi=new ol,this.referenceDelegate=e(this),this.Pi=new dl(this),this.indexManager=new Hc,this.remoteDocumentCache=new ul(e=>this.referenceDelegate.Ti(e)),this.serializer=new Bc(t),this.Ii=new sl(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rl,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new ll(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){ps("MemoryPersistence","Starting transaction:",e);const i=new pl(this.ci.next());return this.referenceDelegate.Ei(),n(i).next(e=>this.referenceDelegate.di(i).next(()=>e)).toPromise().then(e=>(i.raiseOnCommittedEvent(),e))}Ai(e,t){return ur.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class pl extends cr{constructor(e){super(),this.currentSequenceNumber=e}}class ml{constructor(e){this.persistence=e,this.Ri=new al,this.Vi=null}static mi(e){return new ml(e)}get fi(){if(this.Vi)return this.Vi;throw vs(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),ur.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),ur.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),ur.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ur.forEach(this.fi,n=>{const i=Gs.fromPath(n);return this.gi(e,i).next(e=>{e||t.removeEntry(i,sr.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return ur.or([()=>ur.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class gl{constructor(e,t){this.persistence=e,this.pi=new $o(e=>function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=gr(t)),t=mr(e.get(n),t);return gr(t)}(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=function(e,t){return new el(e,t)}(this,t)}static mi(e,t){return new gl(e,t)}Ei(){}di(e){return ur.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return ur.forEach(this.pi,(n,i)=>this.br(e,n,i).next(e=>e?ur.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ii(e,i=>this.br(e,i,t).next(e=>{e||(n++,s.removeEntry(i,sr.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),ur.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ur.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ur.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),ur.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=to(e.data.value)),t}br(e,t,n){return ur.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return ur.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=i}static As(e,t){let n=ua(),i=ua();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new yl(e,t.fromCache,n,i)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=_()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(b())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.ys(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ws(e,t,i,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new vl;return this.Ss(e,t,n).next(i=>{if(s.result=i,this.Vs)return this.bs(e,t,n,i.size)})}).next(()=>s.result)}bs(e,t,n,i){return n.documentReadCount<this.fs?(fs()<=j.DEBUG&&ps("QueryEngine","SDK will not create cache indexes for query:",Xo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),ur.resolve()):(fs()<=j.DEBUG&&ps("QueryEngine","Query:",Xo(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.gs*i?(fs()<=j.DEBUG&&ps("QueryEngine","The SDK decides to create cache indexes for query:",Xo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ho(t))):ur.resolve())}ys(e,t){if(qo(t))return ur.resolve(null);let n=Ho(t);return this.indexManager.getIndexType(e,n).next(i=>0===i?null:(null!==t.limit&&1===i&&(t=Go(t,null,"F"),n=Ho(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const s=ua(...i);return this.ps.getDocuments(e,s).next(i=>this.indexManager.getMinOffset(e,n).next(n=>{const r=this.Ds(t,i);return this.Cs(t,r,s,n.readTime)?this.ys(e,Go(t,null,"F")):this.vs(e,r,t,n)}))})))}ws(e,t,n,i){return qo(t)||i.isEqual(sr.min())?ur.resolve(null):this.ps.getDocuments(e,n).next(s=>{const r=this.Ds(t,s);return this.Cs(t,r,n,i)?ur.resolve(null):(fs()<=j.DEBUG&&ps("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Xo(t)),this.vs(e,r,t,function(e,t){const n=e.toTimestamp().seconds,i=e.toTimestamp().nanoseconds+1,s=sr.fromTimestamp(1e9===i?new ir(n+1,0):new ir(n,i));return new or(s,Gs.empty(),t)}(i,-1)).next(e=>e))})}Ds(e,t){let n=new Ir(Yo(e));return t.forEach((t,i)=>{Jo(e,i)&&(n=n.add(i))}),n}Cs(e,t,n,i){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ss(e,t,n){return fs()<=j.DEBUG&&ps("QueryEngine","Using full collection scan to execute query:",Xo(t)),this.ps.getDocumentsMatchingQuery(e,t,or.min(),n)}vs(e,t,n,i){return this.ps.getDocumentsMatchingQuery(e,n,i).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl="LocalStore";class _l{constructor(e,t,n,i){this.persistence=e,this.Fs=t,this.serializer=i,this.Ms=new br(Ls),this.xs=new $o(e=>Mo(e),jo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new il(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function Tl(e,t){const n=_s(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let i;return n.mutationQueue.getAllMutationBatches(e).next(s=>(i=s,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],r=[];let o=ua();for(const e of i){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){r.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:s,addedBatchIds:r}))})})}function Il(e){const t=_s(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function xl(e,t){const n=_s(e),i=t.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const r=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const o=[];t.targetChanges.forEach((r,a)=>{const c=s.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,r.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,r.addedDocuments,a)));let l=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?l=l.withResumeToken(kr.EMPTY_BYTE_STRING,sr.min()).withLastLimboFreeSnapshotVersion(sr.min()):r.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(r.resumeToken,i)),s=s.insert(a,l),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;if(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,l,r)&&o.push(n.Pi.updateTargetData(e,l))});let a=ta(),c=ua();if(t.documentUpdates.forEach(i=>{t.resolvedLimboDocuments.has(i)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,i))}),o.push(function(e,t,n){let i=ua(),s=ua();return n.forEach(e=>i=i.add(e)),t.getEntries(e,i).next(e=>{let i=ta();return n.forEach((n,r)=>{const o=e.get(n);r.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),r.isNoDocument()&&r.version.isEqual(sr.min())?(t.removeEntry(n,r.readTime),i=i.insert(n,r)):!o.isValidDocument()||r.version.compareTo(o.version)>0||0===r.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(r),i=i.insert(n,r)):ps(bl,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",r.version)}),{ks:i,qs:s}})}(e,r,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!i.isEqual(sr.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,i));o.push(t)}return ur.waitFor(o).next(()=>r.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=s,e))}function El(e,t){const n=_s(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function Sl(e,t,n){const i=_s(e),s=i.Ms.get(t),r=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",r,e=>i.persistence.referenceDelegate.removeTarget(e,s))}catch(o){if(!hr(o))throw o;ps(bl,"Failed to update sequence numbers for target ".concat(t,": ").concat(o))}i.Ms=i.Ms.remove(t),i.xs.delete(s.target)}function kl(e,t,n){const i=_s(e);let s=sr.min(),r=ua();return i.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const i=_s(e),s=i.xs.get(n);return void 0!==s?ur.resolve(i.Ms.get(s)):i.Pi.getTargetData(t,n)}(i,e,Ho(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,i.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{r=e})}).next(()=>i.Fs.getDocumentsMatchingQuery(e,t,n?s:sr.min(),n?r:ua())).next(e=>(function(e,t,n){let i=e.Os.get(t)||sr.min();n.forEach((e,t)=>{t.readTime.compareTo(i)>0&&(i=t.readTime)}),e.Os.set(t,i)}(i,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Qs:r})))}class Cl{constructor(){this.activeTargetIds=ha}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Nl{constructor(){this.Mo=new Cl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Cl,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{Oo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl="ConnectivityMonitor";class Rl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){ps(Dl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){ps(Dl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pl=null;function Ol(){return null===Pl?Pl=268435456+Math.round(2147483648*Math.random()):Pl++,"0x"+Pl.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Ll="RestConnection",Ml={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class jl{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko="projects/".concat(n,"/databases/").concat(i),this.Wo=this.databaseId.database===Fr?"project_id=".concat(n):"project_id=".concat(n,"&database_id=").concat(i)}Go(e,t,n,i,s){const r=Ol(),o=this.zo(e,t.toUriEncodedString());ps(Ll,"Sending RPC '".concat(e,"' ").concat(r,":"),o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,i,s);const{host:c}=new URL(o),l=m(c);return this.Jo(e,o,a,n,l).then(t=>(ps(Ll,"Received RPC '".concat(e,"' ").concat(r,": "),t),t),t=>{throw gs(Ll,"RPC '".concat(e,"' ").concat(r," failed with error: "),t,"url: ",o,"request:",n),t})}Ho(e,t,n,i,s,r){return this.Go(e,t,n,i,s)}jo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+hs,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=Ml[e];return"".concat(this.Uo,"/v1/").concat(t,":").concat(n)}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul="WebChannelConnection";class Fl extends jl{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,i,s){const r=Ol();return new Promise((s,o)=>{const a=new $i;a.setWithCredentials(!0),a.listenOnce(ts.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case ns.NO_ERROR:const t=a.getResponseJson();ps(Ul,"XHR for RPC '".concat(e,"' ").concat(r," received:"),JSON.stringify(t)),s(t);break;case ns.TIMEOUT:ps(Ul,"RPC '".concat(e,"' ").concat(r," timed out")),o(new Is(Ts.DEADLINE_EXCEEDED,"Request time out"));break;case ns.HTTP_ERROR:const n=a.getStatus();if(ps(Ul,"RPC '".concat(e,"' ").concat(r," failed with status:"),n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Ts).indexOf(t)>=0?t:Ts.UNKNOWN}(t.status);o(new Is(e,t.message))}else o(new Is(Ts.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new Is(Ts.UNAVAILABLE,"Connection failed."));break;default:vs(9055,{l_:e,streamId:r,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{ps(Ul,"RPC '".concat(e,"' ").concat(r," completed."))}});const c=JSON.stringify(i);ps(Ul,"RPC '".concat(e,"' ").concat(r," sending request:"),i),a.send(t,"POST",c,n,15)})}T_(e,t,n){const i=Ol(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=os(),o=rs(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const l=s.join("");ps(Ul,"Creating RPC '".concat(e,"' stream ").concat(i,": ").concat(l),a);const u=r.createWebChannel(l,a);this.I_(u);let h=!1,d=!1;const f=new Vl({Yo:t=>{d?ps(Ul,"Not sending because RPC '".concat(e,"' stream ").concat(i," is closed:"),t):(h||(ps(Ul,"Opening RPC '".concat(e,"' stream ").concat(i," transport.")),u.open(),h=!0),ps(Ul,"RPC '".concat(e,"' stream ").concat(i," sending:"),t),u.send(t))},Zo:()=>u.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};return p(u,es.EventType.OPEN,()=>{d||(ps(Ul,"RPC '".concat(e,"' stream ").concat(i," transport opened.")),f.o_())}),p(u,es.EventType.CLOSE,()=>{d||(d=!0,ps(Ul,"RPC '".concat(e,"' stream ").concat(i," transport closed")),f.a_(),this.E_(u))}),p(u,es.EventType.ERROR,t=>{d||(d=!0,gs(Ul,"RPC '".concat(e,"' stream ").concat(i," transport errored. Name:"),t.name,"Message:",t.message),f.a_(new Is(Ts.UNAVAILABLE,"The operation could not be completed")))}),p(u,es.EventType.MESSAGE,t=>{var n;if(!d){const s=t.data[0];bs(!!s,16349);const r=s,o=(null==r?void 0:r.error)||(null==(n=r[0])?void 0:n.error);if(o){ps(Ul,"RPC '".concat(e,"' stream ").concat(i," received error:"),o);const t=o.status;let n=function(e){const t=Qa[e];if(void 0!==t)return Ja(t)}(t),s=o.message;void 0===n&&(n=Ts.INTERNAL,s="Unknown error status: "+t+" with message "+o.message),d=!0,f.a_(new Is(n,s)),u.close()}else ps(Ul,"RPC '".concat(e,"' stream ").concat(i," received:"),s),f.u_(s)}}),p(o,ss.STAT_EVENT,t=>{t.stat===is.PROXY?ps(Ul,"RPC '".concat(e,"' stream ").concat(i," detected buffering proxy")):t.stat===is.NOPROXY&&ps(Ul,"RPC '".concat(e,"' stream ").concat(i," detected no buffering proxy"))}),setTimeout(()=>{f.__()},0),f}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function ql(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(e){return new pc(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t,n=1e3,i=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=i,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-n);i>0&&ps("ExponentialBackoff","Backing off for ".concat(i," ms (base delay: ").concat(this.V_," ms, delay with jitter: ").concat(t," ms, last attempt: ").concat(n," ms ago)")),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl="PersistentStream";class Kl{constructor(e,t,n,i,s,r,o,a){this.Mi=e,this.S_=n,this.b_=i,this.connection=s,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new zl(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===Ts.RESOURCE_EXHAUSTED?(ms(t.toString()),ms("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===Ts.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new Is(Ts.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return ps(Hl,"close with error: ".concat(e)),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(ps(Hl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Gl extends Kl{constructor(e,t,n,i,s,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,r),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s="NO_CHANGE"===(i=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===i?1:"REMOVE"===i?2:"CURRENT"===i?3:"RESET"===i?4:vs(39313,{state:i}),r=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(bs(void 0===t||"string"==typeof t,58123),kr.fromBase64String(t||"")):(bs(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),kr.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?Ts.UNKNOWN:Ja(e.code);return new Is(t,e.message||"")}(a);n=new oc(s,r,o,c||null)}else if("documentChange"in t){t.documentChange;const i=t.documentChange;i.document,i.document.name,i.document.updateTime;const s=xc(e,i.document.name),r=wc(i.document.updateTime),o=i.document.createTime?wc(i.document.createTime):sr.min(),a=new lo({mapValue:{fields:i.document.fields}}),c=ho.newFoundDocument(s,r,o,a),l=i.targetIds||[],u=i.removedTargetIds||[];n=new sc(l,u,c.key,c)}else if("documentDelete"in t){t.documentDelete;const i=t.documentDelete;i.document;const s=xc(e,i.document),r=i.readTime?wc(i.readTime):sr.min(),o=ho.newNoDocument(s,r),a=i.removedTargetIds||[];n=new sc([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const i=t.documentRemove;i.document;const s=xc(e,i.document),r=i.removedTargetIds||[];n=new sc([],r,s,null)}else{if(!("filter"in t))return vs(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:i=0,unchangedNames:s}=e,r=new Wa(i,s),o=e.targetId;n=new rc(o,r)}}var i;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return sr.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?sr.min():t.readTime?wc(t.readTime):sr.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Sc(this.serializer),t.addTarget=function(e,t){let n;const i=t.target;if(n=Vo(i)?{documents:Nc(e,i)}:{query:Ac(e,i).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=yc(e,t.resumeToken);const i=mc(e,t.expectedCount);null!==i&&(n.expectedCount=i)}else if(t.snapshotVersion.compareTo(sr.min())>0){n.readTime=gc(e,t.snapshotVersion.toTimestamp());const i=mc(e,t.expectedCount);null!==i&&(n.expectedCount=i)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return vs(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Sc(this.serializer),t.removeTarget=e,this.q_(t)}}class Wl extends Kl{constructor(e,t,n,i,s,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,r),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return bs(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,bs(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){bs(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(bs(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?wc(e.updateTime):wc(t);return n.isEqual(sr.min())&&(n=wc(t)),new Ca(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=wc(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Sc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>function(e,t){let n;if(t instanceof ja)n={update:Cc(e,t.key,t.value)};else if(t instanceof Ba)n={delete:Ic(e,t.key)};else if(t instanceof Va)n={update:Cc(e,t.key,t.data),updateMask:Uc(t.fieldMask)};else{if(!(t instanceof za))return vs(16599,{Vt:t.type});n={verify:Ic(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof wa)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof ba)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ta)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof xa)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw vs(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=(i=e,void 0!==(s=t.precondition).updateTime?{updateTime:vc(i,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:vs(27497))),n;var i,s}(this.serializer,e))};this.q_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{}class Xl extends Ql{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new Is(Ts.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,r])=>this.connection.Go(e,_c(t,n),i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Ts.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Is(Ts.UNKNOWN,e.toString())})}Ho(e,t,n,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Ho(e,_c(t,n),i,r,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Ts.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Is(Ts.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Jl{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la("Connection failed 1 times. Most recent error: ".concat(e.toString())),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t="Could not reach Cloud Firestore backend. ".concat(e,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this.aa?(ms(t),this.aa=!1):ps("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="RemoteStore";class Zl{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{au(this)&&(ps(Yl,"Restarting streams for network reachability change."),await async function(e){const t=_s(e);t.Ea.add(4),await eu(t),t.Ra.set("Unknown"),t.Ea.delete(4),await $l(t)}(this))})}),this.Ra=new Jl(n,i)}}async function $l(e){if(au(e))for(const t of e.da)await t(!0)}async function eu(e){for(const t of e.da)await t(!1)}function tu(e,t){const n=_s(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),ou(n)?ru(n):Eu(n).O_()&&iu(n,t))}function nu(e,t){const n=_s(e),i=Eu(n);n.Ia.delete(t),i.O_()&&su(n,t),0===n.Ia.size&&(i.O_()?i.L_():au(n)&&n.Ra.set("Unknown"))}function iu(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(sr.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Eu(e).Y_(t)}function su(e,t){e.Va.Ue(t),Eu(e).Z_(t)}function ru(e){e.Va=new cc({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Eu(e).start(),e.Ra.ua()}function ou(e){return au(e)&&!Eu(e).x_()&&e.Ia.size>0}function au(e){return 0===_s(e).Ea.size}function cu(e){e.Va=void 0}async function lu(e){e.Ra.set("Online")}async function uu(e){e.Ia.forEach((t,n)=>{iu(e,t)})}async function hu(e,t){cu(e),ou(e)?(e.Ra.ha(t),ru(e)):e.Ra.set("Unknown")}async function du(e,t,n){if(e.Ra.set("Online"),t instanceof oc&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const i of t.targetIds)e.Ia.has(i)&&(await e.remoteSyncer.rejectListen(i,n),e.Ia.delete(i),e.Va.removeTarget(i))}(e,t)}catch(i){ps(Yl,"Failed to remove targets %s: %s ",t.targetIds.join(","),i),await fu(e,i)}else if(t instanceof sc?e.Va.Ze(t):t instanceof rc?e.Va.st(t):e.Va.tt(t),!n.isEqual(sr.min()))try{const t=await Il(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,i)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ia.get(i);s&&e.Ia.set(i,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const i=e.Ia.get(t);if(!i)return;e.Ia.set(t,i.withResumeToken(kr.EMPTY_BYTE_STRING,i.snapshotVersion)),su(e,t);const s=new qc(i.target,t,n,i.sequenceNumber);iu(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(s){ps(Yl,"Failed to raise snapshot:",s),await fu(e,s)}}async function fu(e,t,n){if(!hr(t))throw t;e.Ea.add(1),await eu(e),e.Ra.set("Offline"),n||(n=()=>Il(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{ps(Yl,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await $l(e)})}function pu(e,t){return t().catch(n=>fu(e,n,t))}async function mu(e){const t=_s(e),n=Su(t);let i=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:-1;for(;gu(t);)try{const e=await El(t.localStore,i);if(null===e){0===t.Ta.length&&n.L_();break}i=e.batchId,yu(t,e)}catch(s){await fu(t,s)}vu(t)&&wu(t)}function gu(e){return au(e)&&e.Ta.length<10}function yu(e,t){e.Ta.push(t);const n=Su(e);n.O_()&&n.X_&&n.ea(t.mutations)}function vu(e){return au(e)&&!Su(e).x_()&&e.Ta.length>0}function wu(e){Su(e).start()}async function bu(e){Su(e).ra()}async function _u(e){const t=Su(e);for(const n of e.Ta)t.ea(n.mutations)}async function Tu(e,t,n){const i=e.Ta.shift(),s=Ka.from(i,t,n);await pu(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await mu(e)}async function Iu(e,t){t&&Su(e).X_&&await async function(e,t){if(function(e){switch(e){case Ts.OK:return vs(64938);case Ts.CANCELLED:case Ts.UNKNOWN:case Ts.DEADLINE_EXCEEDED:case Ts.RESOURCE_EXHAUSTED:case Ts.INTERNAL:case Ts.UNAVAILABLE:case Ts.UNAUTHENTICATED:return!1;case Ts.INVALID_ARGUMENT:case Ts.NOT_FOUND:case Ts.ALREADY_EXISTS:case Ts.PERMISSION_DENIED:case Ts.FAILED_PRECONDITION:case Ts.ABORTED:case Ts.OUT_OF_RANGE:case Ts.UNIMPLEMENTED:case Ts.DATA_LOSS:return!0;default:return vs(15467,{code:e})}}(n=t.code)&&n!==Ts.ABORTED){const n=e.Ta.shift();Su(e).B_(),await pu(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await mu(e)}var n}(e,t),vu(e)&&wu(e)}async function xu(e,t){const n=_s(e);n.asyncQueue.verifyOperationInProgress(),ps(Yl,"RemoteStore received new credentials");const i=au(n);n.Ea.add(3),await eu(n),i&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await $l(n)}function Eu(e){return e.ma||(e.ma=function(e,t,n){const i=_s(e);return i.sa(),new Gl(t,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,n)}(e.datastore,e.asyncQueue,{Xo:lu.bind(null,e),t_:uu.bind(null,e),r_:hu.bind(null,e),H_:du.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),ou(e)?ru(e):e.Ra.set("Unknown")):(await e.ma.stop(),cu(e))})),e.ma}function Su(e){return e.fa||(e.fa=function(e,t,n){const i=_s(e);return i.sa(),new Wl(t,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:bu.bind(null,e),r_:Iu.bind(null,e),ta:_u.bind(null,e),na:Tu.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await mu(e)):(await e.fa.stop(),e.Ta.length>0&&(ps(Yl,"Stopping write stream with ".concat(e.Ta.length," pending writes")),e.Ta=[]))})),e.fa
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class ku{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new xs,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const r=Date.now()+n,o=new ku(e,t,r,i,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Is(Ts.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Cu(e,t){if(ms("AsyncQueue","".concat(t,": ").concat(e)),hr(e))return new Is(Ts.UNAVAILABLE,"".concat(t,": ").concat(e));throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{static emptySet(e){return new Nu(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||Gs.comparator(t.key,n.key):(e,t)=>Gs.comparator(e.key,t.key),this.keyedMap=ia(),this.sortedSet=new br(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Nu))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,i=n.getNext().key;if(!e.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Nu;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(){this.ga=new br(Gs.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):vs(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Du{constructor(e,t,n,i,s,r,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,i,s){const r=[];return t.forEach(e=>{r.push({type:0,doc:e})}),new Du(e,t,Nu.emptySet(t),r,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Wo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Pu{constructor(){this.queries=Ou(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=_s(e),i=n.queries;n.queries=Ou(),i.forEach((e,n)=>{for(const i of n.Sa)i.onError(t)})}(this,new Is(Ts.ABORTED,"Firestore shutting down"))}}function Ou(){return new $o(e=>Qo(e),Wo)}async function Lu(e,t){const n=_s(e);let i=3;const s=t.query;let r=n.queries.get(s);r?!r.ba()&&t.Da()&&(i=2):(r=new Ru,i=t.Da()?0:1);try{switch(i){case 0:r.wa=await n.onListen(s,!0);break;case 1:r.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const e=Cu(o,"Initialization of query '".concat(Xo(t.query),"' failed"));return void t.onError(e)}n.queries.set(s,r),r.Sa.push(t),t.va(n.onlineState),r.wa&&t.Fa(r.wa)&&Uu(n)}async function Mu(e,t){const n=_s(e),i=t.query;let s=3;const r=n.queries.get(i);if(r){const e=r.Sa.indexOf(t);e>=0&&(r.Sa.splice(e,1),0===r.Sa.length?s=t.Da()?0:1:!r.ba()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}function ju(e,t){const n=_s(e);let i=!1;for(const s of t){const e=s.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(s)&&(i=!0);t.wa=s}}i&&Uu(n)}function Vu(e,t,n){const i=_s(e),s=i.queries.get(t);if(s)for(const r of s.Sa)r.onError(n);i.queries.delete(t)}function Uu(e){e.Ca.forEach(e=>{e.next()})}var Fu,qu;(qu=Fu||(Fu={})).Ma="default",qu.Cache="cache";class Bu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Du(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Du.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Fu.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e){this.key=e}}class Hu{constructor(e){this.key=e}}class Ku{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ua(),this.mutatedKeys=ua(),this.eu=Yo(e),this.tu=new Nu(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Au,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,r=i,o=!1;const a="F"===this.query.limitType&&i.size===this.query.limit?i.last():null,c="L"===this.query.limitType&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((e,t)=>{const l=i.get(e),u=Jo(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.su(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.eu(u,a)>0||c&&this.eu(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(r=r.add(u),s=d?s.add(e):s.delete(e)):(r=r.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;r.size>this.query.limit;){const e="F"===this.query.limitType?r.last():r.first();r=r.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:r,iu:n,Cs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return vs(20277,{Rt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),i=null!=i&&i;const o=t&&!i?this._u():[],a=0===this.Xa.size&&this.current&&!i?1:0,c=a!==this.Za;return this.Za=a,0!==r.length||c?{snapshot:new Du(this.query,e.tu,s,r,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Au,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ua(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new Hu(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new zu(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=ua();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Du.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const Gu="SyncEngine";class Wu{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Qu{constructor(e){this.key=e,this.hu=!1}}class Xu{constructor(e,t,n,i,s,r){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new $o(e=>Qo(e),Wo),this.Iu=new Map,this.Eu=new Set,this.du=new br(Gs.comparator),this.Au=new Map,this.Ru=new al,this.Vu={},this.mu=new Map,this.fu=Xc.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function Ju(e,t,n=!0){const i=yh(e);let s;const r=i.Tu.get(t);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.lu()):s=await Zu(i,t,n,!0),s}async function Yu(e,t){const n=yh(e);await Zu(n,t,!0,!1)}async function Zu(e,t,n,i){const s=await function(e,t){const n=_s(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let i;return n.Pi.getTargetData(e,t).next(s=>s?(i=s,ur.resolve(i)):n.Pi.allocateTargetId(e).next(s=>(i=new qc(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,i).next(()=>i))))}).then(e=>{const i=n.Ms.get(e.targetId);return(null===i||e.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}(e.localStore,Ho(t)),r=s.targetId,o=e.sharedClientState.addLocalQueryTarget(r,n);let a;return i&&(a=await async function(e,t,n,i,s){e.pu=(t,n,i)=>async function(e,t,n,i){let s=t.view.ru(n);s.Cs&&(s=await kl(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const r=i&&i.targetChanges.get(t.targetId),o=i&&null!=i.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,r,o);return hh(e,t.targetId,a.au),a.snapshot}(e,t,n,i);const r=await kl(e.localStore,t,!0),o=new Ku(t,r.Qs),a=o.ru(r.documents),c=ic.createSynthesizedTargetChangeForCurrentChange(n,i&&"Offline"!==e.onlineState,s),l=o.applyChanges(a,e.isPrimaryClient,c);hh(e,n,l.au);const u=new Wu(t,n,o);return e.Tu.set(t,u),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),l.snapshot}(e,t,r,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&tu(e.remoteStore,s),a}async function $u(e,t,n){const i=_s(e),s=i.Tu.get(t),r=i.Iu.get(s.targetId);if(r.length>1)return i.Iu.set(s.targetId,r.filter(e=>!Wo(e,t))),void i.Tu.delete(t);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Sl(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),n&&nu(i.remoteStore,s.targetId),lh(i,s.targetId)}).catch(lr)):(lh(i,s.targetId),await Sl(i.localStore,s.targetId,!0))}async function eh(e,t){const n=_s(e),i=n.Tu.get(t),s=n.Iu.get(i.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),nu(n.remoteStore,i.targetId))}async function th(e,t,n){const i=function(e){const t=_s(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=rh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=oh.bind(null,t),t}(e);try{const e=await function(e,t){const n=_s(e),i=ir.now(),s=t.reduce((e,t)=>e.add(t.key),ua());let r,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=ta(),c=ua();return n.Ns.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{r=s;const o=[];for(const e of t){const t=La(e,r.get(e.key).overlayedDocument);null!=t&&o.push(new Va(e.key,t,uo(t.value.mapValue),Na.exists(!0)))}return n.mutationQueue.addMutationBatch(e,i,o,t)}).next(t=>{o=t;const i=t.applyToLocalDocumentSet(r,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,i)})}).then(()=>({batchId:o.batchId,changes:sa(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let i=e.Vu[e.currentUser.toKey()];i||(i=new br(Ls)),i=i.insert(t,n),e.Vu[e.currentUser.toKey()]=i}(i,e.batchId,n),await ph(i,e.changes),await mu(i.remoteStore)}catch(s){const e=Cu(s,"Failed to persist write");n.reject(e)}}async function nh(e,t){const n=_s(e);try{const e=await xl(n.localStore,t);t.targetChanges.forEach((e,t)=>{const i=n.Au.get(t);i&&(bs(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?i.hu=!0:e.modifiedDocuments.size>0?bs(i.hu,14607):e.removedDocuments.size>0&&(bs(i.hu,42227),i.hu=!1))}),await ph(n,e,t)}catch(i){await lr(i)}}function ih(e,t,n){const i=_s(e);if(i.isPrimaryClient&&0===n||!i.isPrimaryClient&&1===n){const e=[];i.Tu.forEach((n,i)=>{const s=i.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=_s(e);n.onlineState=t;let i=!1;n.queries.forEach((e,n)=>{for(const s of n.Sa)s.va(t)&&(i=!0)}),i&&Uu(n)}(i.eventManager,t),e.length&&i.Pu.H_(e),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function sh(e,t,n){const i=_s(e);i.sharedClientState.updateQueryState(t,"rejected",n);const s=i.Au.get(t),r=s&&s.key;if(r){let e=new br(Gs.comparator);e=e.insert(r,ho.newNoDocument(r,sr.min()));const n=ua().add(r),s=new nc(sr.min(),new Map,new br(Ls),e,n);await nh(i,s),i.du=i.du.remove(r),i.Au.delete(t),fh(i)}else await Sl(i.localStore,t,!1).then(()=>lh(i,t,n)).catch(lr)}async function rh(e,t){const n=_s(e),i=t.batch.batchId;try{const e=await function(e,t){const n=_s(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const i=t.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,i){const s=n.batch,r=s.keys();let o=ur.resolve();return r.forEach(e=>{o=o.next(()=>i.getEntry(t,e)).next(t=>{const r=n.docVersions.get(e);bs(null!==r,48541),t.version.compareTo(r)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),i.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,i,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ua();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,i))})}(n.localStore,t);ch(n,i,null),ah(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await ph(n,e)}catch(s){await lr(s)}}async function oh(e,t,n){const i=_s(e);try{const e=await function(e,t){const n=_s(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let i;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(bs(null!==t,37113),i=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,i,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,i)).next(()=>n.localDocuments.getDocuments(e,i))})}(i.localStore,t);ch(i,t,n),ah(i,t),i.sharedClientState.updateMutationState(t,"rejected",n),await ph(i,e)}catch(s){await lr(s)}}function ah(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function ch(e,t,n){const i=_s(e);let s=i.Vu[i.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),i.Vu[i.currentUser.toKey()]=s}}function lh(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const i of e.Iu.get(t))e.Tu.delete(i),n&&e.Pu.yu(i,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||uh(e,t)})}function uh(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(nu(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),fh(e))}function hh(e,t,n){for(const i of n)i instanceof zu?(e.Ru.addReference(i.key,t),dh(e,i)):i instanceof Hu?(ps(Gu,"Document no longer in limbo: "+i.key),e.Ru.removeReference(i.key,t),e.Ru.containsKey(i.key)||uh(e,i.key)):vs(19791,{wu:i})}function dh(e,t){const n=t.key,i=n.path.canonicalString();e.du.get(n)||e.Eu.has(i)||(ps(Gu,"New document in limbo: "+n),e.Eu.add(i),fh(e))}function fh(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new Gs(zs.fromString(t)),i=e.fu.next();e.Au.set(i,new Qu(n)),e.du=e.du.insert(n,i),tu(e.remoteStore,new qc(Ho(Fo(n.path)),i,"TargetPurposeLimboResolution",dr.ce))}}async function ph(e,t,n){const i=_s(e),s=[],r=[],o=[];i.Tu.isEmpty()||(i.Tu.forEach((e,a)=>{o.push(i.pu(a,t,n).then(e=>{var t;if((e||n)&&i.isPrimaryClient){const s=e?!e.fromCache:null==(t=null==n?void 0:n.targetChanges.get(a.targetId))?void 0:t.current;i.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(e){s.push(e);const t=yl.As(a.targetId,e);r.push(t)}}))}),await Promise.all(o),i.Pu.H_(s),await async function(e,t){const n=_s(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>ur.forEach(t,t=>ur.forEach(t.Es,i=>n.persistence.referenceDelegate.addReference(e,t.targetId,i)).next(()=>ur.forEach(t.ds,i=>n.persistence.referenceDelegate.removeReference(e,t.targetId,i)))))}catch(i){if(!hr(i))throw i;ps(bl,"Failed to update sequence numbers: "+i)}for(const s of t){const e=s.targetId;if(!s.fromCache){const t=n.Ms.get(e),i=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(i);n.Ms=n.Ms.insert(e,s)}}}(i.localStore,r))}async function mh(e,t){const n=_s(e);if(!n.currentUser.isEqual(t)){ps(Gu,"User change. New user:",t.toKey());const e=await Tl(n.localStore,t);n.currentUser=t,s="'waitForPendingWrites' promise is rejected due to a user change.",(i=n).mu.forEach(e=>{e.forEach(e=>{e.reject(new Is(Ts.CANCELLED,s))})}),i.mu.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await ph(n,e.Ls)}var i,s}function gh(e,t){const n=_s(e),i=n.Au.get(t);if(i&&i.hu)return ua().add(i.key);{let e=ua();const i=n.Iu.get(t);if(!i)return e;for(const t of i){const i=n.Tu.get(t);e=e.unionWith(i.view.nu)}return e}}function yh(e){const t=_s(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=nh.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=gh.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=sh.bind(null,t),t.Pu.H_=ju.bind(null,t.eventManager),t.Pu.yu=Vu.bind(null,t.eventManager),t}class vh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Bl(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return function(e,t,n,i){return new _l(e,t,n,i)}(this.persistence,new wl,e.initialUser,this.serializer)}Cu(e){return new fl(ml.mi,this.serializer)}Du(e){return new Nl}async terminate(){var e,t;null==(e=this.gcScheduler)||e.stop(),null==(t=this.indexBackfillerScheduler)||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vh.provider={build:()=>new vh};class wh extends vh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){bs(this.persistence.referenceDelegate instanceof gl,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new $c(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?Qc.withCacheSize(this.cacheSizeBytes):Qc.DEFAULT;return new fl(e=>gl.mi(e,t),this.serializer)}}class bh{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ih(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=mh.bind(null,this.syncEngine),await async function(e,t){const n=_s(e);t?(n.Ea.delete(2),await $l(n)):t||(n.Ea.add(2),await eu(n),n.Ra.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Pu}createDatastore(e){const t=Bl(e.databaseInfo.databaseId),n=(i=e.databaseInfo,new Fl(i));var i;return function(e,t,n,i){return new Xl(e,t,n,i)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,i=e.asyncQueue,s=e=>ih(this.syncEngine,e,0),r=Rl.v()?new Rl:new Al,new Zl(t,n,i,s,r);var t,n,i,s,r}createSyncEngine(e,t){return function(e,t,n,i,s,r,o){const a=new Xu(e,t,n,i,s,r);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=_s(e);ps(Yl,"RemoteStore shutting down."),t.Ea.add(5),await eu(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),null==(e=this.datastore)||e.terminate(),null==(t=this.eventManager)||t.terminate()}}bh.provider={build:()=>new bh};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _h{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ms("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="FirestoreClient";class Ih{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=us.UNAUTHENTICATED,this.clientId=Os.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{ps(Th,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(ps(Th,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new xs;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Cu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function xh(e,t){e.asyncQueue.verifyOperationInProgress(),ps(Th,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let i=n.initialUser;e.setCredentialChangeListener(async e=>{i.isEqual(e)||(await Tl(t.localStore,e),i=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Eh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){ps(Th,"Using user provided OfflineComponentProvider");try{await xh(e,e._uninitializedComponentsProvider._offline)}catch(t){const s=t;if(!("FirebaseError"===(n=s).name?n.code===Ts.FAILED_PRECONDITION||n.code===Ts.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;gs("Error using user provided cache. Falling back to memory cache: "+s),await xh(e,new vh)}}else ps(Th,"Using default OfflineComponentProvider"),await xh(e,new wh(void 0));var n;return e._offlineComponents}(e);ps(Th,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>xu(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>xu(t.remoteStore,n)),e._onlineComponents=t}async function Sh(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(ps(Th,"Using user provided OnlineComponentProvider"),await Eh(e,e._uninitializedComponentsProvider._online)):(ps(Th,"Using default OnlineComponentProvider"),await Eh(e,new bh))),e._onlineComponents}async function kh(e){const t=await Sh(e),n=t.eventManager;return n.onListen=Ju.bind(null,t.syncEngine),n.onUnlisten=$u.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Yu.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=eh.bind(null,t.syncEngine),n}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ch(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Nh=new Map,Ah="firestore.googleapis.com",Dh=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new Is(Ts.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ah,this.ssl=Dh}else this.host=e.host,this.ssl=null!=(t=e.ssl)?t:Dh;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Wc;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Is(Ts.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,i){if(!0===t&&!0===i)throw new Is(Ts.INVALID_ARGUMENT,"".concat(e," and ").concat(n," cannot be used together."))})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ch(null!=(n=e.experimentalLongPollingOptions)?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new Is(Ts.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(e.timeoutSeconds," (must not be NaN)"));if(e.timeoutSeconds<5)throw new Is(Ts.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(e.timeoutSeconds," (minimum allowed value is 5)"));if(e.timeoutSeconds>30)throw new Is(Ts.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(e.timeoutSeconds," (maximum allowed value is 30)"))}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Ph{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Rh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Is(Ts.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Is(Ts.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Rh(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new Ss;switch(e.type){case"firstParty":return new As(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Is(Ts.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Nh.get(e);t&&(ps("ComponentProvider","Removing Datastore"),Nh.delete(e),t.terminate())}(this),Promise.resolve()}}function Oh(e,t,n,i={}){var s;e=Zs(e,Ph);const r=m(t),o=e._getSettings(),c={...o,emulatorOptions:e._getEmulatorOptions()},l="".concat(t,":").concat(n);r&&(g("https://".concat(l)),w("Firestore",!0)),o.host!==Ah&&o.host!==l&&gs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:l,ssl:r,emulatorOptions:i};if(!k(u,c)&&(e._setSettings(u),i.mockUserToken)){let t,n;if("string"==typeof i.mockUserToken)t=i.mockUserToken,n=us.MOCK_USER;else{t=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:"https://securetoken.google.com/".concat(n),aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[a(JSON.stringify({alg:"none",type:"JWT"})),a(JSON.stringify(r)),""].join(".")}(i.mockUserToken,null==(s=e._app)?void 0:s.options.projectId);const r=i.mockUserToken.sub||i.mockUserToken.user_id;if(!r)throw new Is(Ts.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new us(r)}e._authCredentials=new ks(new Es(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Lh(this.firestore,e,this._query)}}class Mh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Mh(this.firestore,e,this._key)}toJSON(){return{type:Mh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(er(t,Mh._jsonSchema))return new Mh(e,n||null,new Gs(zs.fromString(t.referencePath)))}}Mh._jsonSchemaVersion="firestore/documentReference/1.0",Mh._jsonSchema={type:$s("string",Mh._jsonSchemaVersion),referencePath:$s("string")};class jh extends Lh{constructor(e,t,n){super(e,t,Fo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Mh(this.firestore,null,new Gs(e))}withConverter(e){return new jh(this.firestore,e,this._path)}}function Vh(e,t,...n){if(e=R(e),Ws("collection","path",t),e instanceof Ph){const i=zs.fromString(t,...n);return Xs(i),new jh(e,null,i)}{if(!(e instanceof Mh||e instanceof jh))throw new Is(Ts.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=e._path.child(zs.fromString(t,...n));return Xs(i),new jh(e.firestore,null,i)}}function Uh(e,t,...n){if(e=R(e),1===arguments.length&&(t=Os.newId()),Ws("doc","path",t),e instanceof Ph){const i=zs.fromString(t,...n);return Qs(i),new Mh(e,null,new Gs(i))}{if(!(e instanceof Mh||e instanceof jh))throw new Is(Ts.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=e._path.child(zs.fromString(t,...n));return Qs(i),new Mh(e.firestore,e instanceof jh?e.converter:null,new Gs(i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="AsyncQueue";class qh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new zl(this,"async_queue_retry"),this._c=()=>{const e=ql();e&&ps(Fh,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=ql();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ql();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new xs;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!hr(e))throw e;ps(Fh,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,ms("INTERNAL UNHANDLED ERROR: ",Bh(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=ku.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(i),i}uc(){this.nc&&vs(47125,{Pc:Bh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Bh(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function zh(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const i of t)if(i in n&&"function"==typeof n[i])return!0;return!1}(e,["next","error","complete"])}class Hh extends Ph{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new qh,this._persistenceKey=(null==i?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new qh(e),this._firestoreClient=void 0,await e}}}function Kh(e){if(e._terminated)throw new Is(Ts.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,i;const s=e._freezeSettings(),r=(o=e._databaseId,a=(null==(t=e._app)?void 0:t.options.appId)||"",c=e._persistenceKey,l=s,new Ur(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,Ch(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator));var o,a,c,l;e._componentsProvider||(null==(n=s.localCache)?void 0:n._offlineComponentProvider)&&(null==(i=s.localCache)?void 0:i._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new Ih(e._authCredentials,e._appCheckCredentials,e._queue,r,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e),e._firestoreClient}class Gh{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Gh(kr.fromBase64String(e))}catch(t){throw new Is(Ts.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Gh(kr.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Gh._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(er(e,Gh._jsonSchema))return Gh.fromBase64String(e.bytes)}}Gh._jsonSchemaVersion="firestore/bytes/1.0",Gh._jsonSchema={type:$s("string",Gh._jsonSchemaVersion),bytes:$s("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wh{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Is(Ts.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ks(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Is(Ts.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Is(Ts.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ls(this._lat,e._lat)||Ls(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Xh._jsonSchemaVersion}}static fromJSON(e){if(er(e,Xh._jsonSchema))return new Xh(e.latitude,e.longitude)}}Xh._jsonSchemaVersion="firestore/geoPoint/1.0",Xh._jsonSchema={type:$s("string",Xh._jsonSchemaVersion),latitude:$s("number"),longitude:$s("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jh{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Jh._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(er(e,Jh._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Jh(e.vectorValues);throw new Is(Ts.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Jh._jsonSchemaVersion="firestore/vectorValue/1.0",Jh._jsonSchema={type:$s("string",Jh._jsonSchemaVersion),vectorValues:$s("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yh=/^__.*__$/;class Zh{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Va(e,this.data,this.fieldMask,t,this.fieldTransforms):new ja(e,this.data,t,this.fieldTransforms)}}class $h{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Va(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ed(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw vs(40011,{Ac:e})}}class td{constructor(e,t,n,i,s,r){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,void 0===s&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=r||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new td({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),i=this.Vc({path:n,fc:!1});return i.gc(e),i}yc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),i=this.Vc({path:n,fc:!1});return i.Rc(),i}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return yd(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(ed(this.Ac)&&Yh.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class nd{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Bl(e)}Cc(e,t,n,i=!1){return new td({Ac:e,methodName:t,Dc:n,path:Ks.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function id(e){const t=e._freezeSettings(),n=Bl(e._databaseId);return new nd(e._databaseId,!!t.ignoreUndefinedProperties,n)}function sd(e,t,n,i,s,r={}){const o=e.Cc(r.merge||r.mergeFields?2:0,t,n,s);fd("Data must be an object, but it was:",o,i);const a=hd(i,o);let c,l;if(r.merge)c=new Er(o.fieldMask),l=o.fieldTransforms;else if(r.mergeFields){const e=[];for(const i of r.mergeFields){const s=pd(t,i,n);if(!o.contains(s))throw new Is(Ts.INVALID_ARGUMENT,"Field '".concat(s,"' is specified in your field mask but missing from your input data."));vd(e,s)||e.push(s)}c=new Er(e),l=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,l=o.fieldTransforms;return new Zh(new lo(a),c,l)}class rd extends Qh{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc("".concat(this._methodName,"() can only appear at the top level of your update data")):e.Sc("".concat(this._methodName,"() cannot be used with set() unless you pass {merge:true}"));return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof rd}}function od(e,t,n){return new td({Ac:3,Dc:t.settings.Dc,methodName:e._methodName,fc:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class ad extends Qh{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=od(this,e,!0),n=this.vc.map(e=>ud(e,t)),i=new ba(n);return new ka(e.path,i)}isEqual(e){return e instanceof ad&&k(this.vc,e.vc)}}class cd extends Qh{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=od(this,e,!0),n=this.vc.map(e=>ud(e,t)),i=new Ta(n);return new ka(e.path,i)}isEqual(e){return e instanceof cd&&k(this.vc,e.vc)}}class ld extends Qh{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new xa(e.serializer,pa(e.serializer,this.Fc));return new ka(e.path,t)}isEqual(e){return e instanceof ld&&this.Fc===e.Fc}}function ud(e,t){if(dd(e=R(e)))return fd("Unsupported field value:",t,e),hd(e,t);if(e instanceof Qh)return function(e,t){if(!ed(t.Ac))throw t.Sc("".concat(e._methodName,"() can only be used with update() and set()"));if(!t.path)throw t.Sc("".concat(e._methodName,"() is not currently supported inside arrays"));const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let i=0;for(const s of e){let e=ud(s,t.wc(i));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),i++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=R(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return pa(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ir.fromDate(e);return{timestampValue:gc(t.serializer,n)}}if(e instanceof ir){const n=new ir(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:gc(t.serializer,n)}}if(e instanceof Xh)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Gh)return{bytesValue:yc(t.serializer,e._byteString)};if(e instanceof Mh){const n=t.databaseId,i=e.firestore._databaseId;if(!i.isEqual(n))throw t.Sc("Document reference is for database ".concat(i.projectId,"/").concat(i.database," but should be for database ").concat(n.projectId,"/").concat(n.database));return{referenceValue:bc(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Jh)return n=e,i=t,{mapValue:{fields:{[Br]:{stringValue:Kr},[Gr]:{arrayValue:{values:n.toArray().map(e=>{if("number"!=typeof e)throw i.Sc("VectorValues must only contain numeric values.");return da(i.serializer,e)})}}}}};var n,i;throw t.Sc("Unsupported field value: ".concat(Ys(e)))}(e,t)}function hd(e,t){const n={};return wr(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):vr(e,(e,i)=>{const s=ud(i,t.mc(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function dd(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ir||e instanceof Xh||e instanceof Gh||e instanceof Mh||e instanceof Qh||e instanceof Jh)}function fd(e,t,n){if(!dd(n)||!Js(n)){const i=Ys(n);throw"an object"===i?t.Sc(e+" a custom object"):t.Sc(e+" "+i)}}function pd(e,t,n){if((t=R(t))instanceof Wh)return t._internalPath;if("string"==typeof t)return gd(e,t);throw yd("Field path arguments must be of type string or ",e,!1,void 0,n)}const md=new RegExp("[~\\*/\\[\\]]");function gd(e,t,n){if(t.search(md)>=0)throw yd("Invalid field path (".concat(t,"). Paths must not contain '~', '*', '/', '[', or ']'"),e,!1,void 0,n);try{return new Wh(...t.split("."))._internalPath}catch(i){throw yd("Invalid field path (".concat(t,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"),e,!1,void 0,n)}}function yd(e,t,n,i,s){const r=i&&!i.isEmpty(),o=void 0!==s;let a="Function ".concat(t,"() called with invalid data");n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=" in field ".concat(i)),o&&(c+=" in document ".concat(s)),c+=")"),new Is(Ts.INVALID_ARGUMENT,a+e+c)}function vd(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Mh(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new bd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(_d("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class bd extends wd{data(){return super.data()}}function _d(e,t){return"string"==typeof t?gd(e,t):t instanceof Wh?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{}class Id extends Td{}function xd(e,t,...n){let i=[];t instanceof Td&&i.push(t),i=i.concat(n),function(e){const t=e.filter(e=>e instanceof Sd).length,n=e.filter(e=>e instanceof Ed).length;if(t>1||t>0&&n>0)throw new Is(Ts.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)e=s._apply(e);return e}class Ed extends Id{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ed(e,t,n)}_apply(e){const t=this._parse(e);return Pd(e._query,t),new Lh(e.firestore,e.converter,Ko(e._query,t))}_parse(e){const t=id(e.firestore),n=function(e,t,n,i,s,r,o){let a;if(s.isKeyField()){if("array-contains"===r||"array-contains-any"===r)throw new Is(Ts.INVALID_ARGUMENT,"Invalid Query. You can't perform '".concat(r,"' queries on documentId()."));if("in"===r||"not-in"===r){Rd(o,r);const t=[];for(const n of o)t.push(Dd(i,e,n));a={arrayValue:{values:t}}}else a=Dd(i,e,o)}else"in"!==r&&"not-in"!==r&&"array-contains-any"!==r||Rd(o,r),a=function(e,t,n,i=!1){return ud(n,e.Cc(i?4:3,t))}(n,t,o,"in"===r||"not-in"===r);return wo.create(s,r,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class Sd extends Td{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Sd(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:bo.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const i=t.getFlattenedFilters();for(const s of i)Pd(n,s),n=Ko(n,s)}(e._query,t),new Lh(e.firestore,e.converter,Ko(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class kd extends Id{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new kd(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new go(t,n)}(e._query,this._field,this._direction);return new Lh(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Uo(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function Cd(e,t="asc"){const n=t,i=_d("orderBy",e);return kd._create(i,n)}class Nd extends Id{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Nd(e,t,n)}_apply(e){return new Lh(e.firestore,e.converter,Go(e._query,this._limit,this._limitType))}}function Ad(e){return function(e,t){if(t<=0)throw new Is(Ts.INVALID_ARGUMENT,"Function ".concat(e,"() requires a positive number, but it was: ").concat(t,"."))}("limit",e),Nd._create("limit",e,"F")}function Dd(e,t,n){if("string"==typeof(n=R(n))){if(""===n)throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Bo(t)&&-1!==n.indexOf("/"))throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(n,"' contains a '/' character."));const i=t.path.child(zs.fromString(n));if(!Gs.isDocumentKey(i))throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(i,"' is not because it has an odd number of segments (").concat(i.length,")."));return no(e,new Gs(i))}if(n instanceof Mh)return no(e,n._key);throw new Is(Ts.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(Ys(n),"."))}function Rd(e,t){if(!Array.isArray(e)||0===e.length)throw new Is(Ts.INVALID_ARGUMENT,"Invalid Query. A non-empty array is required for '".concat(t.toString(),"' filters."))}function Pd(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Is(Ts.INVALID_ARGUMENT,"Invalid query. You cannot use more than one '".concat(t.op.toString(),"' filter.")):new Is(Ts.INVALID_ARGUMENT,"Invalid query. You cannot use '".concat(t.op.toString(),"' filters with '").concat(n.toString(),"' filters."))}class Od{convertValue(e,t="none"){switch(Wr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ar(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw vs(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return vr(e,(e,i)=>{n[e]=this.convertValue(i,t)}),n}convertVectorValue(e){var t,n,i;const s=null==(i=null==(n=null==(t=e.fields)?void 0:t[Gr].arrayValue)?void 0:n.values)?void 0:i.map(e=>Ar(e.doubleValue));return new Jh(s)}convertGeoPoint(e){return new Xh(Ar(e.latitude),Ar(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=jr(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Vr(e));default:return null}}convertTimestamp(e){const t=Nr(e);return new ir(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=zs.fromString(e);bs(Fc(n),9688,{name:e});const i=new qr(n.get(1),n.get(3)),s=new Gs(n.popFirst(5));return i.isEqual(t)||ms("Document ".concat(s," contains a document reference within a different database (").concat(i.projectId,"/").concat(i.database,") which is not supported. It will be treated as a reference in the current database (").concat(t.projectId,"/").concat(t.database,") instead.")),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Md extends wd{constructor(e,t,n,i,s,r){super(e,t,n,i,r),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new jd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(_d("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Is(Ts.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Md._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}Md._jsonSchemaVersion="firestore/documentSnapshot/1.0",Md._jsonSchema={type:$s("string",Md._jsonSchemaVersion),bundleSource:$s("string","DocumentSnapshot"),bundleName:$s("string"),bundle:$s("string")};class jd extends Md{data(e={}){return super.data(e)}}class Vd{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ld(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new jd(this._firestore,this._userDataWriter,n.key,n,new Ld(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Is(Ts.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const i=new jd(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Ld(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:i,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const i=new jd(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Ld(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,r=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),r=n.indexOf(t.doc.key)),{type:Ud(t.type),doc:i,oldIndex:s,newIndex:r}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Is(Ts.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Vd._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Os.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],i=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),i.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Ud(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return vs(61501,{type:e})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(e){e=Zs(e,Mh);const t=Zs(e.firestore,Hh);return function(e,t,n={}){const i=new xs;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,i,s){const r=new _h({next:a=>{r.Nu(),t.enqueueAndForget(()=>Mu(e,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new Is(Ts.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&i&&"server"===i.source?s.reject(new Is(Ts.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new Bu(Fo(n.path),r,{includeMetadataChanges:!0,qa:!0});return Lu(e,o)}(await kh(e),e.asyncQueue,t,n,i)),i.promise}(Kh(t),e._key).then(n=>Gd(t,e,n))}Vd._jsonSchemaVersion="firestore/querySnapshot/1.0",Vd._jsonSchema={type:$s("string",Vd._jsonSchemaVersion),bundleSource:$s("string","QuerySnapshot"),bundleName:$s("string"),bundle:$s("string")};class qd extends Od{constructor(e){super(),this.firestore=e}convertBytes(e){return new Gh(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Mh(this.firestore,null,t)}}function Bd(e,t,n,...i){e=Zs(e,Mh);const s=Zs(e.firestore,Hh),r=id(s);let o;return o="string"==typeof(t=R(t))||t instanceof Wh?function(e,t,n,i,s,r){const o=e.Cc(1,t,n),a=[pd(t,i,n)],c=[s];if(r.length%2!=0)throw new Is(Ts.INVALID_ARGUMENT,"Function ".concat(t,"() needs to be called with an even number of arguments that alternate between field names and values."));for(let d=0;d<r.length;d+=2)a.push(pd(t,r[d])),c.push(r[d+1]);const l=[],u=lo.empty();for(let d=a.length-1;d>=0;--d)if(!vd(l,a[d])){const e=a[d];let t=c[d];t=R(t);const n=o.yc(e);if(t instanceof rd)l.push(e);else{const i=ud(t,n);null!=i&&(l.push(e),u.set(e,i))}}const h=new Er(l);return new $h(u,h,o.fieldTransforms)}(r,"updateDoc",e._key,t,n,i):function(e,t,n,i){const s=e.Cc(1,t,n);fd("Data must be an object, but it was:",s,i);const r=[],o=lo.empty();vr(i,(e,i)=>{const a=gd(t,e,n);i=R(i);const c=s.yc(a);if(i instanceof rd)r.push(a);else{const e=ud(i,c);null!=e&&(r.push(a),o.set(a,e))}});const a=new Er(r);return new $h(o,a,s.fieldTransforms)}(r,"updateDoc",e._key,t),Kd(s,[o.toMutation(e._key,Na.exists(!0))])}function zd(e,t){const n=Zs(e.firestore,Hh),i=Uh(e),s=function(e,t){let n;return n=e?e.toFirestore(t):t,n}(e.converter,t);return Kd(n,[sd(id(e.firestore),"addDoc",i._key,s,null!==e.converter,{}).toMutation(i._key,Na.exists(!1))]).then(()=>i)}function Hd(e,...t){var n,i,s;e=R(e);let r={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||zh(t[o])||(r=t[o++]);const a={includeMetadataChanges:r.includeMetadataChanges,source:r.source};if(zh(t[o])){const e=t[o];t[o]=null==(n=e.next)?void 0:n.bind(e),t[o+1]=null==(i=e.error)?void 0:i.bind(e),t[o+2]=null==(s=e.complete)?void 0:s.bind(e)}let c,l,u;if(e instanceof Mh)l=Zs(e.firestore,Hh),u=Fo(e._key.path),c={next:n=>{t[o]&&t[o](Gd(l,e,n))},error:t[o+1],complete:t[o+2]};else{const n=Zs(e,Lh);l=Zs(n.firestore,Hh),u=n._query;const i=new qd(l);c={next:e=>{t[o]&&t[o](new Vd(l,i,n,e))},error:t[o+1],complete:t[o+2]},function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Is(Ts.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query)}return function(e,t,n,i){const s=new _h(i),r=new Bu(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>Lu(await kh(e),r)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>Mu(await kh(e),r))}}(Kh(l),u,a,c)}function Kd(e,t){return function(e,t){const n=new xs;return e.asyncQueue.enqueueAndForget(async()=>th(await function(e){return Sh(e).then(e=>e.syncEngine)}(e),t,n)),n.promise}(Kh(e),t)}function Gd(e,t,n){const i=n.docs.get(t._key),s=new qd(e);return new Md(e,s,t._key,i,new Ld(n.hasPendingWrites,n.fromCache),t.converter)}function Wd(...e){return new ad("arrayUnion",e)}function Qd(...e){return new cd("arrayRemove",e)}!function(e,t=!0){hs=Xe,He(new P("firestore",(e,{instanceIdentifier:n,options:i})=>{const s=e.getProvider("app").getImmediate(),r=new Hh(new Cs(e.getProvider("auth-internal")),new Rs(s,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Is(Ts.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qr(e.options.projectId,t)}(s,n),s);return i={useFetchStreams:t,...i},r._setSettings(i),r},"PUBLIC").setMultipleInstances(!0)),Ze(cs,ls,e),Ze(cs,ls,"esm2020")}();const Xd="@firebase/installations",Jd="0.6.19",Yd=1e4,Zd="w:".concat(Jd),$d="FIS_v2",ef=36e5,tf=new E("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function nf(e){return e instanceof x&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf({projectId:e}){return"".concat("https://firebaseinstallations.googleapis.com/v1","/projects/").concat(e,"/installations")}function rf(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function of(e,t){const n=(await t.json()).error;return tf.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function af({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function cf(e,{refreshToken:t}){const n=af(e);return n.append("Authorization",function(e){return"".concat($d," ").concat(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function lf(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function uf(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const hf=/^[cdef][\w-]{21}$/;function df(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return hf.test(t)?t:""}catch(e){return""}}function ff(e){return"".concat(e.appName,"!").concat(e.appId)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=new Map;function mf(e,t){const n=ff(e);gf(n,t),function(e,t){const n=function(){!yf&&"BroadcastChannel"in self&&(yf=new BroadcastChannel("[Firebase] FID Change"),yf.onmessage=e=>{gf(e.data.key,e.data.fid)});return yf}();n&&n.postMessage({key:e,fid:t});0===pf.size&&yf&&(yf.close(),yf=null)}(n,t)}function gf(e,t){const n=pf.get(e);if(n)for(const i of n)i(t)}let yf=null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vf="firebase-installations-store";let wf=null;function bf(){return wf||(wf=ne("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(vf)}})),wf}async function _f(e,t){const n=ff(e),i=(await bf()).transaction(vf,"readwrite"),s=i.objectStore(vf),r=await s.get(n);return await s.put(t,n),await i.done,r&&r.fid===t.fid||mf(e,t.fid),t}async function Tf(e){const t=ff(e),n=(await bf()).transaction(vf,"readwrite");await n.objectStore(vf).delete(t),await n.done}async function If(e,t){const n=ff(e),i=(await bf()).transaction(vf,"readwrite"),s=i.objectStore(vf),r=await s.get(n),o=t(r);return void 0===o?await s.delete(n):await s.put(o,n),await i.done,!o||r&&r.fid===o.fid||mf(e,o.fid),o}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xf(e){let t;const n=await If(e.appConfig,n=>{const i=function(e){const t=e||{fid:df(),registrationStatus:0};return kf(t)}(n),s=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(tf.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=sf(e),s=af(e),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&s.append("x-firebase-client",e)}const o={fid:n,authVersion:$d,appId:e.appId,sdkVersion:Zd},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await lf(()=>fetch(i,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:rf(e.authToken)}}throw await of("Create Installation",c)}(e,t);return _f(e.appConfig,n)}catch(n){throw nf(n)&&409===n.customData.serverCode?await Tf(e.appConfig):await _f(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Ef(e)}:{installationEntry:t}}(e,i);return t=s.registrationPromise,s.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Ef(e){let t=await Sf(e.appConfig);for(;1===t.registrationStatus;)await uf(100),t=await Sf(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await xf(e);return n||t}return t}function Sf(e){return If(e,e=>{if(!e)throw tf.create("installation-not-found");return kf(e)})}function kf(e){return 1===(t=e).registrationStatus&&t.registrationTime+Yd<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function Cf({appConfig:e,heartbeatServiceProvider:t},n){const i=function(e,{fid:t}){return"".concat(sf(e),"/").concat(t,"/authTokens:generate")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),s=cf(e,n),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&s.append("x-firebase-client",e)}const o={installation:{sdkVersion:Zd,appId:e.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await lf(()=>fetch(i,a));if(c.ok){return rf(await c.json())}throw await of("Generate Auth Token",c)}async function Nf(e,t=!1){let n;const i=await If(e.appConfig,i=>{if(!Df(i))throw tf.create("not-registered");const s=i.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ef}(e)}(s))return i;if(1===s.requestStatus)return n=async function(e,t){let n=await Af(e.appConfig);for(;1===n.authToken.requestStatus;)await uf(100),n=await Af(e.appConfig);const i=n.authToken;return 0===i.requestStatus?Nf(e,t):i}(e,t),i;{if(!navigator.onLine)throw tf.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(i);return n=async function(e,t){try{const n=await Cf(e,t),i={...t,authToken:n};return await _f(e.appConfig,i),n}catch(n){if(!nf(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await _f(e.appConfig,n)}else await Tf(e.appConfig);throw n}}(e,t),t}});return n?await n:i.authToken}function Af(e){return If(e,e=>{if(!Df(e))throw tf.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Yd<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})}function Df(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Rf(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await xf(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n);return(await Nf(n,t)).token}function Pf(e){return tf.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="installations",Lf=e=>{const t=Ke(e.getProvider("app").getImmediate(),Of).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:i}=await xf(t);return i?i.catch(console.error):Nf(t).catch(console.error),n.fid}(t),getToken:e=>Rf(t,e)}};He(new P(Of,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Pf("App Configuration");if(!e.name)throw Pf("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Pf(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Ke(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),He(new P("installations-internal",Lf,"PRIVATE")),Ze(Xd,Jd),Ze(Xd,Jd,"esm2020");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Mf="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",jf="google.c.a.c_id",Vf=1e4;var Uf,Ff,qf;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Bf(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function zf(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let s=0;s<n.length;++s)i[s]=n.charCodeAt(s);return i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(Ff=Uf||(Uf={}))[Ff.DATA_MESSAGE=1]="DATA_MESSAGE",Ff[Ff.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(qf||(qf={}));const Hf="fcm_token_details_db",Kf="fcm_token_object_Store";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Gf="firebase-messaging-store";let Wf=null;function Qf(){return Wf||(Wf=ne("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(Gf)}})),Wf}async function Xf(e){const t=Yf(e),n=await Qf(),i=await n.transaction(Gf).objectStore(Gf).get(t);if(i)return i;{const t=await async function(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(e=>e.name).includes(Hf))return null;let t=null;return(await ne(Hf,5,{upgrade:async(n,i,s,r)=>{var o;if(i<2)return;if(!n.objectStoreNames.contains(Kf))return;const a=r.objectStore(Kf),c=await a.index("fcmSenderId").get(e);if(await a.clear(),c)if(2===i){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!=(o=e.createTime)?o:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:Bf(e.vapidKey)}}}else if(3===i){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:Bf(e.auth),p256dh:Bf(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:Bf(e.vapidKey)}}}else if(4===i){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:Bf(e.auth),p256dh:Bf(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:Bf(e.vapidKey)}}}}})).close(),await ie(Hf),await ie("fcm_vapid_details_db"),await ie("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await Jf(e,t),t}}async function Jf(e,t){const n=Yf(e),i=(await Qf()).transaction(Gf,"readwrite");return await i.objectStore(Gf).put(t,n),await i.done,t}function Yf({appConfig:e}){return e.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new E("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function $f({projectId:e}){return"".concat("https://fcmregistrations.googleapis.com/v1","/projects/").concat(e,"/registrations")}async function ep({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":"FIS ".concat(n)})}function tp({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:t,p256dh:e}};return i!==Mf&&(s.web.applicationPubKey=i),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function np(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:zf(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:Bf(t.getKey("auth")),p256dh:Bf(t.getKey("p256dh"))},i=await Xf(e.firebaseDependencies);if(i){if(function(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,s=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&i&&s&&r}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await ep(e),i=tp(t.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{const n=await fetch("".concat($f(e.appConfig),"/").concat(t.token),s);r=await n.json()}catch(o){throw Zf.create("token-update-failed",{errorInfo:null==o?void 0:o.toString()})}if(r.error){const e=r.error.message;throw Zf.create("token-update-failed",{errorInfo:e})}if(!r.token)throw Zf.create("token-update-no-token");return r.token}(e.firebaseDependencies,t),i={...t,token:n,createTime:Date.now()};return await Jf(e.firebaseDependencies,i),n}catch(n){throw n}}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await async function(e,t){const n={method:"DELETE",headers:await ep(e)};try{const i=await fetch("".concat($f(e.appConfig),"/").concat(t),n),s=await i.json();if(s.error){const e=s.error.message;throw Zf.create("token-unsubscribe-failed",{errorInfo:e})}}catch(i){throw Zf.create("token-unsubscribe-failed",{errorInfo:null==i?void 0:i.toString()})}}(e.firebaseDependencies,i.token)}catch(s){console.warn(s)}return ip(e.firebaseDependencies,n)}return ip(e.firebaseDependencies,n)}async function ip(e,t){const n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const n=await ep(e),i=tp(t),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{const t=await fetch($f(e.appConfig),s);r=await t.json()}catch(o){throw Zf.create("token-subscribe-failed",{errorInfo:null==o?void 0:o.toString()})}if(r.error){const e=r.error.message;throw Zf.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw Zf.create("token-subscribe-no-token");return r.token}(e,t),i={token:n,createTime:Date.now(),subscriptionOptions:t};return await Jf(e,i),i.token}function sp(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const s=t.notification.image;s&&(e.notification.image=s);const r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,i,s,r,o;if(!t.fcmOptions&&!(null==(n=t.notification)?void 0:n.click_action))return;e.fcmOptions={};const a=null!=(r=null==(i=t.fcmOptions)?void 0:i.link)?r:null==(s=t.notification)?void 0:s.click_action;a&&(e.fcmOptions.link=a);const c=null==(o=t.fcmOptions)?void 0:o.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t,e),t}function rp(e){return Zf.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){if(!e||!e.options)throw rp("App Configuration Object");if(!e.name)throw rp("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const i of t)if(!n[i])throw rp(i);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ap(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const i=setTimeout(()=>n(new Error("Service worker not registered after ".concat(Vf," ms"))),Vf),s=e.installing||e.waiting;e.active?(clearTimeout(i),t()):s?s.onstatechange=e=>{var n;"activated"===(null==(n=e.target)?void 0:n.state)&&(s.onstatechange=null,clearTimeout(i),t())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.swRegistration)}catch(t){throw Zf.create("failed-service-worker-registration",{browserErrorMessage:null==t?void 0:t.message})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function cp(e,t){if(!navigator)throw Zf.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw Zf.create("permission-blocked");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Mf)}(e,null==t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await ap(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw Zf.create("invalid-sw-registration");e.swRegistration=t}}(e,null==t?void 0:t.serviceWorkerRegistration),np(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lp(e,t,n){const i=function(e){switch(e){case qf.NOTIFICATION_CLICKED:return"notification_open";case qf.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[jf],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function up(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===qf.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(sp(n)):e.onMessageHandler.next(sp(n)));const i=n.data;var s;"object"==typeof(s=i)&&s&&jf in s&&"1"===i["google.c.a.e"]&&await lp(e,n.messageType,i)}const hp="@firebase/messaging",dp="0.12.23",fp=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>cp(t,e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function pp(){try{await I()}catch(e){return!1}return"undefined"!=typeof window&&T()&&!("undefined"==typeof navigator||!navigator.cookieEnabled)&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */He(new P("messaging",e=>{const t=new op(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>up(t,e)),t},"PUBLIC")),He(new P("messaging-internal",fp,"PRIVATE")),Ze(hp,dp),Ze(hp,dp,"esm2020");const mp=Je({apiKey:"AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s",authDomain:"phtv-12f95.firebaseapp.com",projectId:"phtv-12f95",storageBucket:"phtv-12f95.firebasestorage.app",messagingSenderId:"284029899446",appId:"1:284029899446:web:e35d687e96984da208cc17",measurementId:"G-Q8VZEWTV71"}),gp=function(e=Ye()){const t=Ke(e,"auth");if(t.isInitialized())return t.getImmediate();const n=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){const n=Ke(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(k(n.getOptions(),null!=t?t:{}))return e;pt(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:zi,persistence:[si,qn,zn]}),i=f("authTokenSyncURL");if(i&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(i,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Wi)return;const i=null==t?void 0:t.token;Qi!==i&&(Qi=i,await fetch(s,{method:i?"POST":"DELETE",headers:i?{Authorization:"Bearer ".concat(i)}:{}}))});!function(e,t,n){R(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,i){R(e).onIdTokenChanged(t,n,i)}(n,e=>t(e))}}var s;const r=h("auth");return r&&_n(n,"http://".concat(r)),n}(mp),yp=new An,vp=function(e){const t="object"==typeof e?e:Ye(),n="string"==typeof e?e:Fr,i=Ke(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const e=(e=>{const t=h(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error("Invalid host ".concat(t," with no separate hostname and port!"));const i=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),i]:[t.substring(0,n),i]})("firestore");e&&Oh(i,...e)}return i}(mp);let wp=null;try{"undefined"!=typeof window&&"serviceWorker"in navigator&&(wp=function(e=Ye()){return pp().then(e=>{if(!e)throw Zf.create("unsupported-browser")},e=>{throw Zf.create("indexed-db-unsupported")}),Ke(R(e),"messaging").getImmediate()}(mp))}catch(Hp){console.warn("Firebase Messaging not supported in this environment",Hp)}const bp=wp,_p=async()=>{if(!bp)return null;try{if("granted"===await Notification.requestPermission()){const e=await async function(e,t){return cp(e=R(e),t)}(bp,{vapidKey:"BBRYtxAxyPFsNig0j0PfS9j9PPkK5mKkUr6dZ3QcMYgYNYnD1RGDVBdbt6TlxAbt_FnDbPv6MKOnBMlTtN1Jjqo"});return console.log("FCM Token:",e),e}}catch(e){console.error("An error occurred while retrieving token:",e)}};class Tp{constructor(e=0,t="Network Error"){this.status=e,this.text=t}}const Ip={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},xp=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},Ep=async(e,t,n={})=>{const i=await fetch(Ip.origin+e,{method:"POST",headers:n,body:t}),s=await i.text(),r=new Tp(i.status,s);if(i.ok)return r;throw r},Sp=(e,t,n)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n||"string"!=typeof n)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},kp=e=>e.webdriver||!e.languages||0===e.languages.length,Cp=()=>new Tp(451,"Unavailable For Headless Browser"),Np=(e,t)=>{if((e=>{var t;return!(null==(t=e.list)?void 0:t.length)||!e.watchVariable})(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const n=(i=t,s=e.watchVariable,i instanceof FormData?i.get(s):i[s]);var i,s;return"string"==typeof n&&e.list.includes(n)},Ap=()=>new Tp(403,"Forbidden"),Dp=async(e,t,n)=>{if(!t.throttle||!n)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"})(t.throttle,t.id);const i=t.id||e,s=await(async(e,t,n)=>{const i=Number(await n.get(e)||0);return t-Date.now()+i})(i,t.throttle,n);return s>0||(await n.set(i,Date.now().toString()),!1)},Rp=()=>new Tp(429,"Too Many Requests"),Pp=(e,t="https://api.emailjs.com")=>{if(!e)return;const n=xp(e);Ip.publicKey=n.publicKey,Ip.blockHeadless=n.blockHeadless,Ip.storageProvider=n.storageProvider,Ip.blockList=n.blockList,Ip.limitRate=n.limitRate,Ip.origin=n.origin||t},Op=async(e,t,n,i)=>{const s=xp(i),r=s.publicKey||Ip.publicKey,o=s.blockHeadless||Ip.blockHeadless,a=s.storageProvider||Ip.storageProvider,c={...Ip.blockList,...s.blockList},l={...Ip.limitRate,...s.limitRate};if(o&&kp(navigator))return Promise.reject(Cp());if(Sp(r,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(n),n&&Np(c,n))return Promise.reject(Ap());if(await Dp(location.pathname,l,a))return Promise.reject(Rp());const u={lib_version:"4.4.1",user_id:r,service_id:e,template_id:t,template_params:n};return Ep("/api/v1.0/email/send",JSON.stringify(u),{"Content-type":"application/json"})},Lp=[{id:"bug",label:"Bug",color:"text-white",bg:"bg-red-600 shadow-lg shadow-red-900/40"},{id:"enhancement",label:"Enhancement",color:"text-white",bg:"bg-rose-500 shadow-lg shadow-rose-900/40"},{id:"feature",label:"Feature",color:"text-white",bg:"bg-blue-600 shadow-lg shadow-blue-900/40"},{id:"question",label:"Question",color:"text-white",bg:"bg-emerald-600 shadow-lg shadow-emerald-900/40"},{id:"help",label:"Help Wanted",color:"text-white",bg:"bg-orange-600 shadow-lg shadow-orange-900/40"}],Mp=["admin@phtv.com","phamhungtien.contact@gmail.com","hungtien10a7@gmail.com"],jp=["pham hung tien"],Vp=(e,t,n)=>{if(n)return!0;const i=(t||"").toLowerCase().trim();if(i&&Mp.includes(i))return!0;const s=(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return!!s&&jp.includes(s)},Up=e=>{var t;if(!e)return"...";const n="number"==typeof e?e:(null==(t=e.toMillis)?void 0:t.call(e))||Date.now(),i=Date.now()-n,s=Math.floor(i/1e3),r=Math.floor(s/60),o=Math.floor(r/60),a=Math.floor(o/24);return s<60?"Vừa xong":r<60?"".concat(r,"p"):o<24?"".concat(o,"h"):a<7?"".concat(a," ngày"):new Date(n).toLocaleDateString("vi-VN")},Fp=(e,t=180)=>{const n=e.replace(/\s+/g," ").trim();return n.length<=t?n:"".concat(n.slice(0,t).trimEnd(),"...")},qp=e=>{var t;return null!=(t=[...e.replies||[]].filter(e=>Vp(e.author,e.authorEmail,e.isAdmin)).sort((e,t)=>t.timestamp-e.timestamp)[0])?t:null},Bp=({content:n,className:i})=>{const s=n.split(/(`[^`]+`|@[a-zA-Z0-9_]+|https?:\/\/[^\s]+)/g);return e.jsx("div",{className:"min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed ".concat(i),children:s.map((n,i)=>n.startsWith("`")&&n.endsWith("`")?e.jsx("code",{className:"inline max-w-full break-all rounded border border-white/5 bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-rose-300 [overflow-wrap:anywhere]",children:n.slice(1,-1)},i):n.startsWith("@")?e.jsx("span",{className:"break-all font-black text-rose-400 [overflow-wrap:anywhere] hover:underline cursor-pointer",children:n},i):n.startsWith("http")?e.jsxs("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"inline break-all text-blue-400 underline [overflow-wrap:anywhere] transition-colors hover:text-blue-300",children:[n.length>40?n.substring(0,40)+"...":n," ",e.jsx(t.ExternalLink,{size:10,className:"ml-1 inline-block align-baseline"})]},i):e.jsx("span",{className:"text-slate-200 [overflow-wrap:anywhere]",children:n},i))})},zp=()=>{const[i,s]=n.useState([]),[r,o]=n.useState([]),[a,c]=n.useState(null),[l,u]=n.useState(""),[h,d]=n.useState(null),[f,p]=n.useState("newest"),[m,g]=n.useState("all"),[y,v]=n.useState(""),[w,b]=n.useState(new Set),[_,T]=n.useState(!1),[I,x]=n.useState(!1),[E,S]=n.useState(!1),[k,C]=n.useState(""),[N,A]=n.useState(!1),[D,P]=n.useState(0),[O,L]=n.useState({show:!1,message:""}),[M,j]=n.useState(15),[V,U]=n.useState(!0),[F,q]=n.useState(!0),[B,z]=n.useState(null),[H,K]=n.useState(""),[G,W]=n.useState(null),[Q,X]=n.useState(null),[J,Y]=n.useState(""),Z=n.useRef(new Set);n.useEffect(()=>{Pp("BaMMIrujdXkrbCwLH")},[]),n.useEffect(()=>{const e=(t=e=>{var t;if(e){const n=Mp.includes(e.email||"");c({uid:e.uid,username:"phamhungtien.contact@gmail.com"===e.email?"Phạm Hùng Tiến":e.displayName||(null==(t=e.email)?void 0:t.split("@")[0])||"User",email:e.email||"",photoURL:e.photoURL||void 0,isAdmin:n})}else c(null)},R(gp).onAuthStateChanged(t,n,i));var t,n,i;return()=>e()},[]),n.useEffect(()=>{if(!a)return;const e=Hd(xd(Vh(vp,"notifications"),function(e,t,n){const i=t,s=_d("where",e);return Ed._create(s,i,n)}("recipientId","==",a.uid),Cd("timestamp","desc"),Ad(20)),e=>{o(e.docs.map(e=>({id:e.id,...e.data()})))});return()=>e()},[a]),n.useEffect(()=>{const e=Hd(xd(Vh(vp,"questions"),Cd("timestamp","desc"),Ad(M)),e=>{let t=e.docs.map(e=>({id:e.id,...e.data()}));"popular"===f?t=t.sort((e,t)=>{var n,i;return((null==(n=t.likedBy)?void 0:n.length)||0)-((null==(i=e.likedBy)?void 0:i.length)||0)}):"trending"===f&&(t=t.sort((e,t)=>{var n,i,s,r;const o=((null==(n=e.likedBy)?void 0:n.length)||0)+2*((null==(i=e.replies)?void 0:i.length)||0)+.5*(e.viewCount||0);return((null==(s=t.likedBy)?void 0:s.length)||0)+2*((null==(r=t.replies)?void 0:r.length)||0)+.5*(t.viewCount||0)-o}));const n=t.filter(e=>e.isPinned),i=t.filter(e=>!e.isPinned);s([...n,...i]),U(e.docs.length>=M),q(!1)});return()=>e()},[f,M]);const $=n.useMemo(()=>r.filter(e=>!e.isRead).length,[r]),ee=n.useMemo(()=>{let e=i;if("mine"===m&&a?e=e.filter(e=>e.authorId===a.uid):"reported"===m&&(null==a?void 0:a.isAdmin)?e=e.filter(e=>e.isReported):"unanswered"===m&&(e=e.filter(e=>!e.replies.some(e=>Vp(e.author,e.authorEmail,e.isAdmin)))),y.trim()){const t=y.toLowerCase();e=e.filter(e=>e.content.toLowerCase().includes(t)||e.author.toLowerCase().includes(t)||e.replies.some(e=>e.content.toLowerCase().includes(t)))}return e},[i,m,y,a]),te=n.useMemo(()=>{const e=i.filter(e=>e.replies.some(e=>Vp(e.author,e.authorEmail,e.isAdmin))).length,t=i.filter(e=>e.isLocked).length,n=Math.max(i.length-e,0),s=i.reduce((e,t)=>{var n;return e+((null==(n=t.replies)?void 0:n.length)||0)},0);return{total:i.length,responded:e,pending:n,locked:t,totalReplies:s}},[i]),ne=e=>{L({show:!0,message:e}),setTimeout(()=>L({show:!1,message:""}),3e3)},ie=async(e,t,n,i)=>{a&&e!==a.uid&&await zd(Vh(vp,"notifications"),{recipientId:e,senderName:a.username,senderPhoto:a.photoURL||null,type:t,questionId:n,content:i,timestamp:Date.now(),isRead:!1})},se=async e=>{var t;window.confirm("Xóa thảo luận này?")&&(await(t=Uh(vp,"questions",e),Kd(Zs(t.firestore,Hh),[new Ba(t._key,Na.none())])),ne("Đã xóa bài."))},re=(e,t)=>{if(!a)return void T(!0);if(e.isLocked&&!a.isAdmin)return void ne("Thảo luận này đã khóa.");b(t=>{const n=new Set(t);return n.add(e.id),n});const n={qId:e.id,rId:null==t?void 0:t.id,name:(null==t?void 0:t.author)||e.author,authorId:(null==t?void 0:t.authorId)||e.authorId,authorEmail:(null==t?void 0:t.authorEmail)||e.authorEmail};(null==B?void 0:B.qId)===n.qId&&(null==B?void 0:B.rId)===n.rId||K(""),z(n)},oe=e=>{var t;if(!(((null==(t=e.replies)?void 0:t.length)||0)>0))return void re(e);const n=w.has(e.id);b(t=>{const i=new Set(t);return n?i.delete(e.id):i.add(e.id),i}),n&&(null==B?void 0:B.qId)===e.id&&(z(null),K(""))},ae=({user:t,size:n="w-10 h-10",isAdmin:i})=>{var s;const r=null!=(s=t.isAdmin)?s:i;return e.jsx("div",{className:"".concat(n," rounded-2xl flex items-center justify-center text-white font-black overflow-hidden shadow-lg shrink-0 ").concat(r?"bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 ring-1 ring-rose-300/40":"bg-slate-800 border border-white/5"),children:t.photoURL?e.jsx("img",{src:t.photoURL,alt:t.username,className:"w-full h-full object-cover"}):e.jsx("span",{className:n.includes("w-8")?"text-[9px]":"text-sm",children:(o=t.username,o?o.split(" ").map(e=>e[0]).join("").toUpperCase().substring(0,2):"??")})});var o},ce=()=>e.jsxs("div",{className:"rounded-[1.5rem] p-6 md:p-8 bg-white/[0.018] border border-white/5 animate-pulse space-y-6",children:[e.jsxs("div",{className:"flex gap-6",children:[e.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 shrink-0"}),e.jsxs("div",{className:"flex-1 space-y-3 pt-2",children:[e.jsx("div",{className:"h-3 bg-white/10 rounded-full w-1/4"}),e.jsx("div",{className:"h-2 bg-white/5 rounded-full w-1/6"})]})]}),e.jsxs("div",{className:"space-y-2 pl-16",children:[e.jsx("div",{className:"h-3 bg-white/5 rounded-full w-full"}),e.jsx("div",{className:"h-3 bg-white/5 rounded-full w-5/6"})]})]});return e.jsxs("div",{className:"phtv-community mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-6 md:py-10",children:[e.jsxs("div",{className:"phtv-community-layout grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start",children:[e.jsxs("aside",{className:"phtv-community-aside order-2 space-y-4 lg:order-1 lg:sticky lg:top-24",children:[e.jsxs("section",{className:"rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-[0.24em] text-slate-500",children:"Tổng quan"}),e.jsx("h3",{className:"mt-1 text-lg font-black tracking-tight text-white",children:"Tình trạng thảo luận"})]}),e.jsx("span",{className:"rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300",children:"Live"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[e.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Tổng bài"}),e.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.total})]}),e.jsxs("div",{className:"rounded-2xl border border-emerald-400/12 bg-emerald-400/[0.045] p-3",children:[e.jsx("p",{className:"text-[10px] font-semibold text-emerald-200",children:"Đã phản hồi"}),e.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.responded})]}),e.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[e.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Đang chờ"}),e.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.pending})]}),e.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[e.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Phản hồi"}),e.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.totalReplies})]})]}),e.jsxs("div",{className:"mt-4 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold text-white",children:[e.jsx(t.ShieldCheck,{size:15,className:"text-rose-400"}),"Lưu ý ngắn"]}),e.jsx("p",{className:"mt-2 text-sm leading-6 text-slate-400",children:"Ưu tiên mô tả rõ lỗi, bước tái hiện và phiên bản đang dùng để admin phản hồi nhanh hơn."})]})]}),e.jsxs("section",{className:"rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300",children:e.jsx(t.MessageSquare,{size:18})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-base font-black tracking-tight text-white",children:"Kênh hỗ trợ"}),e.jsx("p",{className:"text-sm text-slate-400",children:"Cần trao đổi nhanh hơn thì vào Discord."})]})]}),e.jsxs("a",{href:"https://discord.gg/hm2C4tbaDz",target:"_blank",rel:"noopener noreferrer",className:"mt-4 flex items-center justify-between rounded-2xl border border-[#5865F2]/25 bg-[#5865F2]/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5865F2]/15",children:[e.jsx("span",{children:"Vào Discord hỗ trợ"}),e.jsx(t.ArrowRight,{size:15,className:"text-[#aeb7ff]"})]})]})]}),e.jsxs("main",{className:"phtv-community-main order-1 space-y-5 lg:order-2",children:[e.jsxs("section",{className:"phtv-community-toolbar rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6",children:[e.jsxs("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400",children:[e.jsx(t.Info,{size:12,className:"text-rose-400"}),"Thảo luận PHTV"]}),e.jsx("div",{children:e.jsx("h2",{className:"text-3xl font-black tracking-tight text-white md:text-[2.15rem]",children:"Thảo luận PHTV"})})]}),e.jsx("div",{className:"flex flex-wrap items-center gap-3 lg:justify-end",children:a?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:()=>S(!E),className:"relative flex h-11 w-11 items-center justify-center rounded-2xl border transition ".concat(E?"border-white bg-white text-slate-950":"border-white/[0.055] bg-white/[0.022] text-slate-300 hover:bg-white/[0.04] hover:text-white"),"aria-label":"Xem thông báo",children:[e.jsx(t.Bell,{size:16}),$>0&&e.jsx("span",{className:"absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white",children:$})]}),E&&e.jsxs("div",{className:"fixed inset-x-4 top-24 z-[150] overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-14 sm:w-[340px]",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 px-4 py-3",children:[e.jsx("span",{className:"text-sm font-semibold text-white",children:"Thông báo"}),e.jsx("button",{onClick:()=>S(!1),className:"text-slate-500 transition hover:text-white",children:e.jsx(t.X,{size:16})})]}),e.jsx("div",{className:"max-h-[360px] overflow-y-auto custom-scrollbar",children:0===r.length?e.jsx("div",{className:"p-8 text-center text-sm text-slate-500",children:"Chưa có thông báo nào."}):r.map(t=>e.jsxs("button",{onClick:()=>{(async e=>{await Bd(Uh(vp,"notifications",e),{isRead:!0})})(t.id),S(!1)},className:"flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition ".concat(t.isRead?"bg-transparent opacity-60":"bg-rose-500/[0.04] hover:bg-rose-500/[0.08]"),children:[e.jsx(ae,{user:{username:t.senderName,photoURL:t.senderPhoto},size:"w-8 h-8"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("p",{className:"text-sm leading-5 text-white",children:[e.jsx("span",{className:"font-semibold",children:t.senderName})," ","reply"===t.type?"đã phản hồi bạn.":"đã tương tác với bài viết."]}),e.jsx("p",{className:"mt-1 text-xs text-slate-400",children:Up(t.timestamp)})]})]},t.id))})]})]}),e.jsxs("div",{className:"flex items-center gap-3 rounded-[1.4rem] border border-white/[0.055] bg-white/[0.022] px-3 py-2",children:[e.jsx(ae,{user:a,size:"w-9 h-9",isAdmin:a.isAdmin}),e.jsxs("div",{className:"min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"truncate text-sm font-semibold text-white",children:a.username}),a.isAdmin&&e.jsx(t.CheckCircle2,{size:14,className:"text-rose-400"})]}),e.jsxs("div",{className:"mt-1 flex items-center gap-3 text-xs text-slate-400",children:[e.jsx("button",{onClick:()=>{C(a.username),x(!0)},className:"transition hover:text-white",children:"Sửa tên"}),e.jsx("button",{onClick:()=>R(gp).signOut(),className:"transition hover:text-white",children:"Đăng xuất"})]})]})]})]}):e.jsxs("button",{onClick:()=>T(!0),className:"inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90",children:[e.jsx(t.User,{size:15}),"Đăng nhập Google"]})})]}),e.jsxs("div",{className:"mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto]",children:[e.jsxs("label",{className:"relative block",children:[e.jsx(t.Search,{className:"pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",size:16}),e.jsx("input",{id:"search-input",name:"search",type:"text",placeholder:"Tìm nội dung, thành viên hoặc tình trạng xử lý...",value:y,onChange:e=>v(e.target.value),className:"w-full rounded-2xl border border-white/[0.055] bg-white/[0.022] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-1 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-1",children:[{id:"newest",label:"Mới nhất",icon:t.RefreshCw},{id:"trending",label:"Xu hướng",icon:t.Sparkles},{id:"popular",label:"Yêu thích",icon:t.Award}].map(t=>e.jsxs("button",{onClick:()=>p(t.id),className:"flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ".concat(f===t.id?"bg-white text-slate-950":"text-slate-300 hover:bg-white/[0.04] hover:text-white"),children:[e.jsx(t.icon,{size:14}),e.jsx("span",{children:t.label})]},t.id))}),e.jsxs("label",{className:"flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm text-slate-300",children:[e.jsx(t.Filter,{size:14,className:"text-rose-400"}),e.jsxs("select",{id:"filter-select",name:"filter",value:m,onChange:e=>g(e.target.value),className:"w-full bg-transparent text-sm text-white outline-none",children:[e.jsx("option",{value:"all",className:"bg-slate-900",children:"Tất cả"}),e.jsx("option",{value:"mine",className:"bg-slate-900",children:"Bài của tôi"}),e.jsx("option",{value:"unanswered",className:"bg-slate-900",children:"Chưa có phản hồi admin"}),(null==a?void 0:a.isAdmin)&&e.jsx("option",{value:"reported",className:"bg-slate-900",children:"Bài bị báo cáo"})]})]})]})]}),e.jsx("section",{className:"phtv-community-composer rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6",children:e.jsxs("form",{onSubmit:async e=>{if(e.preventDefault(),!a)return void T(!0);if(!l.trim()||N)return;if(Date.now()-D<1e4&&!a.isAdmin)ne("Hãy chậm lại (10s)!");else{A(!0);try{await zd(Vh(vp,"questions"),{authorId:a.uid,authorEmail:a.email,author:a.username,authorPhoto:a.photoURL||null,content:l,timestamp:Date.now(),replies:[],likedBy:[],isPinned:!1,isReported:!1,isLocked:!1,viewCount:0,isAdmin:a.isAdmin,label:h}),u(""),d(null),P(Date.now()),ne("Đã đăng thảo luận!")}catch(t){alert("Lỗi!")}finally{A(!1)}}},className:"space-y-4",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ae,{user:{username:(null==a?void 0:a.username)||"User",photoURL:null==a?void 0:a.photoURL,isAdmin:null==a?void 0:a.isAdmin},size:"w-10 h-10",isAdmin:null==a?void 0:a.isAdmin}),e.jsx("div",{className:"min-w-0 flex-1",children:e.jsx("textarea",{id:"new-question-input",name:"question",placeholder:a?"Mô tả ngắn gọn vấn đề hoặc câu hỏi của bạn...":"Đăng nhập Google để bắt đầu thảo luận...",value:l,onChange:e=>u(e.target.value),disabled:N,className:"min-h-[110px] w-full resize-none rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30",required:!0})})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"mr-1 text-xs font-semibold text-slate-400",children:"Phân loại:"}),Lp.map(t=>e.jsx("button",{type:"button",onClick:()=>d(h===t.id?null:t.id),className:"rounded-full border px-3 py-1.5 text-xs font-semibold transition ".concat(h===t.id?"".concat(t.bg," ").concat(t.color," border-transparent"):"border-white/[0.06] bg-white/[0.022] text-slate-300 hover:bg-white/[0.05]"),children:t.label},t.id))]}),e.jsxs("div",{className:"flex flex-col gap-3 border-t border-white/[0.055] pt-4 sm:flex-row sm:items-center sm:justify-between",children:[e.jsx("p",{className:"text-sm text-slate-400",children:"Viết rõ lỗi, bước tái hiện hoặc phiên bản để người khác và admin dễ hỗ trợ hơn."}),e.jsxs("button",{type:"submit",disabled:N||!l.trim(),className:"inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",children:[N?e.jsx(t.RefreshCw,{className:"animate-spin",size:15}):e.jsx(t.Send,{size:15}),e.jsx("span",{children:"Đăng thảo luận"})]})]})]})}),e.jsxs("section",{className:"space-y-4 pb-20",children:[F?e.jsx("div",{className:"space-y-4",children:[1,2,3].map(t=>e.jsx(ce,{},t))}):0===ee.length?e.jsxs("div",{className:"rounded-[2rem] border border-dashed border-white/[0.06] bg-white/[0.018] px-6 py-20 text-center",children:[e.jsx(t.MessageSquare,{size:34,className:"mx-auto text-slate-600"}),e.jsx("p",{className:"mt-4 text-base font-semibold text-white",children:"Chưa có nội dung phù hợp."}),e.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Thử đổi bộ lọc hoặc đăng câu hỏi mới."})]}):ee.map(n=>{var i,s,r,o;const c=Lp.find(e=>e.id===n.label),l=qp(n),u=(e=>[...e.replies||[]].sort((e,t)=>e.timestamp-t.timestamp))(n),h=(e=>{const n=qp(e);return e.isLocked&&!n?{label:"Đã khóa",note:"Thảo luận đã khóa",icon:t.Lock,containerClassName:"border-white/[0.06] bg-white/[0.022]",badgeClassName:"border-white/[0.06] bg-white/[0.04] text-slate-300"}:n?/(đã fix|đã sửa|fixed|resolved|đã xử lý|đã khắc phục|đã cập nhật|đã release|đã ra bản)/i.test(n.content)?{label:"Đã xử lý",note:"Admin xác nhận đã xử lý",icon:t.CheckCircle2,containerClassName:"border-emerald-300/16 bg-emerald-400/[0.055]",badgeClassName:"border-emerald-300/16 bg-emerald-400/[0.12] text-emerald-200"}:{label:"Đã phản hồi",note:"Admin đã có cập nhật",icon:t.ShieldCheck,containerClassName:"border-rose-300/16 bg-rose-400/[0.055]",badgeClassName:"border-rose-300/16 bg-rose-400/[0.12] text-rose-200"}:{label:"Chưa phản hồi",note:"Đang chờ admin xem",icon:t.MessageSquareReply,containerClassName:"border-white/[0.055] bg-white/[0.022]",badgeClassName:"border-white/[0.06] bg-white/[0.04] text-slate-300"}})(n),d=h.icon,f=(null==(i=n.replies)?void 0:i.length)||0,p=w.has(n.id),m=Boolean((null==a?void 0:a.isAdmin)||(null==a?void 0:a.uid)===n.authorId),g=Vp(n.author,n.authorEmail,n.isAdmin);return e.jsx("article",{className:"phtv-discussion-card rounded-[2rem] border bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur transition md:p-6 ".concat(n.isPinned?"border-rose-300/16":"border-white/[0.055]"),onPointerEnter:()=>(async e=>{if(!Z.current.has(e)){Z.current.add(e);try{await Bd(Uh(vp,"questions",e),{viewCount:(t=1,new ld("increment",t))})}catch(n){Z.current.delete(e),console.error("Failed to increment question views",n)}var t}})(n.id),children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx(ae,{user:{username:n.author,photoURL:n.authorPhoto,isAdmin:g},size:"w-11 h-11",isAdmin:g}),e.jsxs("div",{className:"min-w-0 flex-1 space-y-4",children:[e.jsxs("div",{className:"flex flex-col gap-3 md:flex-row md:items-start md:justify-between",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("h3",{className:"text-base font-black tracking-tight ".concat(g?"text-rose-300":"text-white"),children:n.author}),g&&e.jsx("span",{className:"rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:"Admin"}),c&&e.jsx("span",{className:"rounded-full px-2.5 py-1 text-[10px] font-black uppercase ".concat(c.bg," ").concat(c.color),children:c.label}),n.isPinned&&e.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full border border-rose-300/16 bg-rose-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:[e.jsx(t.Paperclip,{size:11}),"Ghim"]})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400",children:[e.jsx("span",{children:Up(n.timestamp)}),e.jsxs("span",{className:"inline-flex items-center gap-1",children:[e.jsx(t.Eye,{size:13}),n.viewCount||0]}),e.jsx("button",{onClick:()=>(async e=>{window.confirm("Báo cáo nội dung này?")&&(await Bd(Uh(vp,"questions",e),{isReported:!0}),ne("Đã gửi báo cáo!"))})(n.id),className:"transition hover:text-white",children:"Báo cáo"})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[(null==a?void 0:a.isAdmin)&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>(async e=>{(null==a?void 0:a.isAdmin)&&(await Bd(Uh(vp,"questions",e.id),{isLocked:!e.isLocked}),ne(e.isLocked?"Đã mở khóa":"Đã khóa"))})(n),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":n.isLocked?"Mở khóa":"Khóa",children:n.isLocked?e.jsx(t.Lock,{size:14}):e.jsx(t.Unlock,{size:14})}),e.jsx("button",{onClick:()=>(async e=>{(null==a?void 0:a.isAdmin)&&(await Bd(Uh(vp,"questions",e.id),{isPinned:!e.isPinned}),ne(e.isPinned?"Đã bỏ ghim.":"Đã ghim thảo luận."))})(n),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":n.isPinned?"Bỏ ghim":"Ghim",children:e.jsx(t.Paperclip,{size:14})})]}),m&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>{W(n.id),Y(n.content)},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":"Sửa bài viết",children:e.jsx(t.Settings,{size:14})}),e.jsx("button",{onClick:()=>se(n.id),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300","aria-label":"Xóa bài viết",children:e.jsx(t.Trash2,{size:14})})]})]})]}),G===n.id?e.jsxs("div",{className:"space-y-3",children:[e.jsx("textarea",{value:J,onChange:e=>Y(e.target.value),className:"w-full rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{onClick:()=>(async e=>{J.trim()&&(await Bd(Uh(vp,"questions",e),{content:J}),W(null),ne("Đã lưu."))})(n.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Lưu"}),e.jsx("button",{onClick:()=>W(null),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):e.jsx("div",{className:"phtv-discussion-content rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4",children:e.jsx(Bp,{content:p?n.content:Fp(n.content,280),className:"text-sm leading-7 text-slate-200"})}),e.jsx("div",{className:"phtv-discussion-status rounded-[1.5rem] border p-4 ".concat(h.containerClassName),children:e.jsxs("div",{className:"flex flex-col gap-4 md:flex-row md:items-start md:justify-between",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ".concat(h.badgeClassName),children:[e.jsx(d,{size:14}),h.label]}),e.jsx("span",{className:"text-sm text-slate-300",children:h.note})]}),e.jsx("div",{className:"mt-3 space-y-2",children:l?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm leading-6 text-slate-200",children:Fp(l.content)}),e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-xs text-slate-400",children:[e.jsx("span",{className:"font-semibold text-white",children:l.author}),e.jsx("span",{children:Up(l.timestamp)})]})]}):e.jsx("p",{className:"text-sm leading-6 text-slate-400",children:"Admin chưa phản hồi trên thảo luận này."})})]}),e.jsxs("button",{onClick:()=>{p||oe(n)},className:"inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.055] bg-white/[0.022] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-white",children:[e.jsx(t.MessageSquareReply,{size:14}),f>0?"Mở thảo luận":"Phản hồi"]})]})}),e.jsxs("div",{className:"flex flex-wrap items-center gap-3 border-t border-white/[0.055] pt-1",children:[e.jsxs("button",{onClick:()=>(async e=>{var t;if(!a)return void T(!0);const n=Uh(vp,"questions",e.id),i=null==(t=e.likedBy)?void 0:t.includes(a.uid);await Bd(n,{likedBy:i?Qd(a.uid):Wd(a.uid)}),i||ie(e.authorId,"like",e.id,e.content.substring(0,50))})(n),className:"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ".concat((null==(s=n.likedBy)?void 0:s.includes((null==a?void 0:a.uid)||""))?"bg-rose-500/10 text-rose-300":"text-slate-400 hover:bg-white/[0.022] hover:text-white"),children:[e.jsx(t.ThumbsUp,{size:15,fill:(null==(r=n.likedBy)?void 0:r.includes((null==a?void 0:a.uid)||""))?"currentColor":"none"}),e.jsx("span",{children:(null==(o=n.likedBy)?void 0:o.length)||0})]}),e.jsxs("button",{onClick:()=>oe(n),className:"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ".concat(n.isLocked&&!(null==a?void 0:a.isAdmin)?"cursor-not-allowed text-slate-600":"text-slate-400 hover:bg-white/[0.022] hover:text-white"),children:[e.jsx(t.MessageSquareReply,{size:15}),e.jsx("span",{children:f>0?p?"Ẩn ".concat(f," phản hồi"):"Xem ".concat(f," phản hồi"):"Phản hồi"})]})]}),(p||(null==B?void 0:B.qId)===n.id)&&e.jsxs("div",{className:"space-y-4 border-t border-white/[0.055] pt-5",children:[u.length>0&&e.jsx("div",{className:"space-y-3",children:u.map(i=>{var s,r,o;const c=Vp(i.author,i.authorEmail,i.isAdmin);return e.jsxs("div",{className:"flex gap-3",children:[e.jsx(ae,{user:{username:i.author,photoURL:i.authorPhoto,isAdmin:c},size:"w-9 h-9",isAdmin:c}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"rounded-[1.4rem] border p-4 ".concat(c?"border-rose-300/16 bg-rose-400/[0.045]":"border-white/[0.055] bg-white/[0.022]"),children:[e.jsxs("div",{className:"mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:"font-semibold ".concat(c?"text-rose-200":"text-white"),children:i.author}),c&&e.jsx("span",{className:"rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:"Admin"}),i.replyToName&&e.jsxs("span",{className:"inline-flex items-center gap-1 text-xs text-slate-400",children:[e.jsx(t.ArrowRight,{size:12}),i.replyToName]}),e.jsx("span",{className:"text-xs text-slate-500",children:Up(i.timestamp)})]}),((null==a?void 0:a.isAdmin)||(null==a?void 0:a.uid)===i.authorId)&&e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>{X(i.id),Y(i.content)},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":"Sửa phản hồi",children:e.jsx(t.Settings,{size:13})}),e.jsx("button",{onClick:()=>(async(e,t)=>{if(!window.confirm("Xóa phản hồi này?"))return;const n=Uh(vp,"questions",e),i=await Fd(n);if(!i.exists())return;const s=i.data().replies.filter(e=>e.id!==t);await Bd(n,{replies:s}),ne("Đã xóa phản hồi.")})(n.id,i.id),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300","aria-label":"Xóa phản hồi",children:e.jsx(t.Trash2,{size:13})})]})]}),Q===i.id?e.jsxs("div",{className:"space-y-3",children:[e.jsx("textarea",{autoFocus:!0,value:J,onChange:e=>Y(e.target.value),className:"w-full rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{onClick:()=>(async(e,t)=>{if(!J.trim())return;const n=Uh(vp,"questions",e),i=await Fd(n);if(!i.exists())return;const s=i.data().replies.map(e=>e.id===t?{...e,content:J}:e);await Bd(n,{replies:s}),X(null),ne("Đã lưu.")})(n.id,i.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Lưu"}),e.jsx("button",{onClick:()=>X(null),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):e.jsx(Bp,{content:i.content,className:"text-sm leading-6 text-slate-200"})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap items-center gap-3 px-2",children:[e.jsxs("button",{onClick:()=>(async(e,t)=>{if(!a)return void T(!0);const n=Uh(vp,"questions",e),i=await Fd(n);if(!i.exists())return;let s;const r=i.data().replies.map(e=>{if(e.id===t){s=e;const t=e.likedBy||[],n=t.includes(a.uid);return{...e,likedBy:n?t.filter(e=>e!==a.uid):[...t,a.uid]}}return e});await Bd(n,{replies:r}),s&&!s.likedBy.includes(a.uid)&&ie(s.authorId,"like",e,s.content.substring(0,50))})(n.id,i.id),className:"inline-flex items-center gap-2 text-xs font-semibold transition ".concat((null==(s=i.likedBy)?void 0:s.includes((null==a?void 0:a.uid)||""))?"text-rose-300":"text-slate-400 hover:text-white"),children:[e.jsx(t.ThumbsUp,{size:13,fill:(null==(r=i.likedBy)?void 0:r.includes((null==a?void 0:a.uid)||""))?"currentColor":"none"}),e.jsx("span",{children:(null==(o=i.likedBy)?void 0:o.length)||0})]}),e.jsx("button",{onClick:()=>re(n,i),className:"text-xs font-semibold text-slate-400 transition hover:text-white",children:"Trả lời"})]})]})]},i.id)})}),(null==B?void 0:B.qId)===n.id?e.jsxs("div",{className:"rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4",children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between gap-3",children:[e.jsxs("p",{className:"text-sm font-semibold text-white",children:["Đang phản hồi ",B.name?"@".concat(B.name):"thảo luận này"]}),e.jsx("button",{onClick:()=>{z(null),K("")},className:"text-slate-500 transition hover:text-white",children:e.jsx(t.X,{size:14})})]}),e.jsx("textarea",{id:"reply-input",name:"reply",autoFocus:!0,value:H,onChange:e=>K(e.target.value),placeholder:"Viết phản hồi của bạn...",className:"min-h-[110px] w-full resize-none rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),e.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[e.jsx("button",{onClick:()=>(async e=>{var t;if(!a||!B)return void T(!0);if(!H.trim())return;const n=Uh(vp,"questions",e),i=await Fd(n);if(i.exists()&&i.data().isLocked&&!a.isAdmin)return void alert("Thảo luận này đã bị khóa!");const s={id:Date.now().toString(),parentId:B.rId||e,replyToName:B.name,authorId:a.uid,authorEmail:a.email,author:a.isAdmin?"Phạm Hùng Tiến":a.username,authorPhoto:a.photoURL||void 0,content:H,timestamp:Date.now(),isAdmin:a.isAdmin,likedBy:[]};await Bd(n,{replies:Wd(s)});const r=B.authorId||(null==(t=i.data())?void 0:t.authorId);r&&ie(r,"reply",e,H.substring(0,50));const o=B.authorEmail||"phamhungtien.contact@gmail.com";o!==a.email?(console.log("✉️ Attempting to send email to ".concat(o)),Op("PHTV Community","template_qd4vozb",{to_email:o,recipient_name:B.name||"Thành viên PHTV",recipient_email:o,sender_name:a.username,message:H,link:window.location.href}).then(()=>console.log("✅ Email sent successfully to:",o),e=>console.error("❌ Email failed to send:",e))):console.log("⏭️ Skipping email (Self-reply or current user)"),K("")})(n.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Gửi phản hồi"}),e.jsx("button",{onClick:()=>{z(null),K("")},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):e.jsxs("button",{onClick:()=>re(n),className:"inline-flex items-center gap-2 text-sm font-semibold text-rose-300 transition hover:text-rose-200",children:[e.jsx(t.MessageSquare,{size:15}),"Viết phản hồi"]})]})]})]})},n.id)}),V&&ee.length>=M&&e.jsx("div",{className:"pt-4 text-center",children:e.jsxs("button",{onClick:()=>j(e=>e+15),className:"inline-flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.04]",children:[e.jsx("span",{children:"Tải thêm thảo luận"}),e.jsx(t.ChevronDown,{size:15})]})})]})]})]}),_&&e.jsxs("div",{className:"fixed inset-0 z-[200] flex items-center justify-center p-6",children:[e.jsx("div",{className:"absolute inset-0 bg-slate-950/90 backdrop-blur-3xl",onClick:()=>T(!1)}),e.jsxs("div",{className:"relative w-full max-w-sm bg-slate-900 rounded-[3.5rem] p-12 border border-white/[0.06] shadow-2xl animate-in zoom-in-95",children:[e.jsx("button",{onClick:()=>T(!1),className:"absolute top-10 right-10 text-slate-600 p-2",children:e.jsx(t.X,{size:28})}),e.jsxs("div",{className:"text-center mb-10",children:[e.jsx("div",{className:"w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-rose-400 shadow-3xl",children:e.jsx(t.User,{size:48})}),e.jsx("h3",{className:"text-4xl font-black text-white tracking-tighter leading-none mb-4 uppercase",children:"Chào bạn!"}),e.jsx("p",{className:"text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-widest text-[9px]",children:"Cộng đồng PHTV Việt Nam"})]}),e.jsxs("button",{onClick:async()=>{try{const e=await di(gp,yp);T(!1),_p(),e.user.metadata.creationTime===e.user.metadata.lastSignInTime&&"phamhungtien.contact@gmail.com"!==e.user.email&&(C(e.user.displayName||""),x(!0))}catch(e){alert("Lỗi đăng nhập: "+e.message)}},className:"w-full py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl",children:[e.jsxs("svg",{className:"w-7 h-7",viewBox:"0 0 24 24",children:[e.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),e.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),e.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"}),e.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Đăng nhập ngay"]})]})]}),I&&e.jsxs("div",{className:"fixed inset-0 z-[250] flex items-center justify-center p-6",children:[e.jsx("div",{className:"absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-1000"}),e.jsxs("div",{className:"relative w-full max-w-lg bg-slate-900 rounded-[4rem] p-12 md:p-16 border border-white/[0.06] shadow-3xl animate-in zoom-in-95 duration-500",children:[e.jsxs("div",{className:"text-center mb-12 space-y-4",children:[e.jsx("div",{className:"w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3",children:e.jsx(t.UserCheck,{size:48,className:"text-white"})}),e.jsx("h3",{className:"text-4xl font-black text-white tracking-tighter uppercase italic leading-none",children:"Bạn là ai?"}),e.jsx("p",{className:"text-slate-500 text-lg font-medium italic",children:"Chọn một danh xưng thật đẳng cấp cho cộng đồng"})]}),e.jsx("input",{id:"username-input",name:"username",type:"text",value:k,onChange:e=>C(e.target.value),className:"w-full bg-slate-950 border border-white/[0.06] rounded-[2rem] py-6 px-10 text-white font-black mb-10 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner placeholder:text-slate-800",placeholder:"Nhập tên..."}),e.jsx("button",{onClick:async()=>{k.trim()&&gp.currentUser&&(await jn(gp.currentUser,{displayName:k}),c(e=>e?{...e,username:k}:null),x(!1),ne("Đã cập nhật danh tính!"))},className:"w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all transform hover:scale-[1.02]",children:"Bắt đầu ngay"})]})]}),O.show&&e.jsx("div",{className:"fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500",children:e.jsxs("div",{className:"bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black shadow-3xl flex items-center gap-5 border border-white/20",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl",children:e.jsx(t.Check,{size:22})}),e.jsx("span",{className:"tracking-tight text-xl italic",children:O.message})]})})]})};export{zp as QASection};
