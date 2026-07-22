System.register(["./index-legacy-fWxlBESm.js","./vendor-legacy-D4vY2eeH.js"],function(e,t){"use strict";var n,s,i;return{setters:[e=>{n=e.j,s=e.I},e=>{i=e.x}],execute:function(){var t={};
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
             */const r=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&s+1<e.length&&56320==(64512&e.charCodeAt(s+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++s)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<e.length;i+=3){const t=e[i],r=i+1<e.length,o=r?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,l=t>>2,u=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,r||(h=64)),s.push(n[l],n[u],n[h],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,s=0;for(;n<e.length;){const i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=e[n++];t[s++]=String.fromCharCode((31&i)<<6|63&r)}else if(i>239&&i<365){const r=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[s++]=String.fromCharCode(55296+(r>>10)),t[s++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[s++]=String.fromCharCode((15&i)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],r=i<e.length?n[e.charAt(i)]:0;++i;const o=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==r||null==o||null==c)throw new a;const l=t<<2|r>>4;if(s.push(l),64!==o){const e=r<<4&240|o>>2;if(s.push(e),64!==c){const e=o<<6&192|c;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){return function(e){const t=r(e);return o.encodeByteArray(t,!0)}(e).replace(/\./g,"")},l=function(e){try{return o.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null},u=()=>
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
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
             */().__FIREBASE_DEFAULTS__,h=()=>{try{return u()||(()=>{if("undefined"==typeof process)return;const e=t.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&l(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},d=e=>h()?.emulatorHosts?.[e],f=()=>h()?.config,p=e=>h()?.[`_${e}`];
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
class m{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
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
             */function g(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function y(e){return(await fetch(e,{credentials:"include"})).ok}
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
             */const w={};let v=!1;function b(e,t){if("undefined"==typeof window||"undefined"==typeof document||!g(window.location.host)||w[e]===t||w[e]||v)return;function n(e){return`__firebase__banner__${e}`}w[e]=t;const s="__firebase__banner",i=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(w))w[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function r(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{v=!0,function(){const e=document.getElementById(s);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(s),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),l=n("preprendIcon"),u=document.getElementById(l)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=r();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(u,l),t.append(u,o,c,n),document.body.appendChild(t)}i?(o.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
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
             */function _(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function T(){return!function(){const e=h()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(t){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function I(){try{return"object"==typeof indexedDB}catch(e){return!1}}function x(){return new Promise((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}class E extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,E.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,S.prototype.create)}}class S{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],r=i?function(e,t){return e.replace(k,(e,n)=>{const s=t[n];return null!=s?String(s):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${r} (${s}).`;return new E(s,o,n)}}const k=/\{\$([^}]+)}/g;function C(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const i of n){if(!s.includes(i))return!1;const n=e[i],r=t[i];if(N(n)&&N(r)){if(!C(n,r))return!1}else if(n!==r)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function N(e){return null!==e&&"object"==typeof e}
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
             */function A(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}class D{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");s=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===s.next&&(s.next=R),void 0===s.error&&(s.error=R),void 0===s.complete&&(s.complete=R);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(e){}}),this.observers.push(s),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function R(){}
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
             */function P(e){return e&&e._delegate?e._delegate:e}class O{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
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
             */const L="[DEFAULT]";
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
             */class M{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new m;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
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
             */(e))try{this.getOrInitializeService({instanceIdentifier:L})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:s});n.resolve(e)}catch(t){}}}}clearInstance(e=L){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=L){return this.instances.has(e)}getOptions(e=L){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,r]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(i)&&r.resolve(s);return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=e,s===L?void 0:s),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var s;return n||null}normalizeInstanceIdentifier(e=L){return this.component?this.component.multipleInstances?e:L:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class j{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new M(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
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
             */var V;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(V||(V={}));const U={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},F=V.INFO,q={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},B=(e,t,...n)=>{if(t<e.logLevel)return;const s=(new Date).toISOString(),i=q[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${s}]  ${e.name}:`,...n)};class z{constructor(e){this.name=e,this._logLevel=F,this._logHandler=B,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?U[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}let $,H;const K=new WeakMap,G=new WeakMap,W=new WeakMap,Q=new WeakMap,X=new WeakMap;let J={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return G.get(e);if("objectStoreNames"===t)return e.objectStoreNames||W.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ee(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Y(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(H||(H=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(te(this),t),ee(K.get(this))}:function(...t){return ee(e.apply(te(this),t))}:function(t,...n){const s=e.call(te(this),t,...n);return W.set(s,t.sort?t.sort():[t]),ee(s)}}function Z(e){return"function"==typeof e?Y(e):(e instanceof IDBTransaction&&function(e){if(G.has(e))return;const t=new Promise((t,n)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",r),e.removeEventListener("abort",r)},i=()=>{t(),s()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",r),e.addEventListener("abort",r)});G.set(e,t)}(e),t=e,($||($=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,J):e);var t}function ee(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",r)},i=()=>{t(ee(e.result)),s()},r=()=>{n(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",r)});return t.then(t=>{t instanceof IDBCursor&&K.set(t,e)}).catch(()=>{}),X.set(t,e),t}(e);if(Q.has(e))return Q.get(e);const t=Z(e);return t!==e&&(Q.set(e,t),X.set(t,e)),t}const te=e=>X.get(e);function ne(e,t,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(e,t),a=ee(o);return s&&o.addEventListener("upgradeneeded",e=>{s(ee(o.result),e.oldVersion,e.newVersion,ee(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{r&&e.addEventListener("close",()=>r()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}function se(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",e=>t(e.oldVersion,e)),ee(n).then(()=>{})}const ie=["get","getKey","getAll","getAllKeys","count"],re=["put","add","delete","clear"],oe=new Map;function ae(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(oe.get(t))return oe.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,i=re.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!i&&!ie.includes(n))return;const r=async function(e,...t){const r=this.transaction(e,i?"readwrite":"readonly");let o=r.store;return s&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&r.done]))[0]};return oe.set(t,r),r}var ce;ce=J,J={...ce,get:(e,t,n)=>ae(e,t)||ce.get(e,t,n),has:(e,t)=>!!ae(e,t)||ce.has(e,t)};
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
class le{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const ue="@firebase/app",he="0.14.6",de=new z("@firebase/app"),fe="@firebase/app-compat",pe="@firebase/analytics-compat",me="@firebase/analytics",ge="@firebase/app-check-compat",ye="@firebase/app-check",we="@firebase/auth",ve="@firebase/auth-compat",be="@firebase/database",_e="@firebase/data-connect",Te="@firebase/database-compat",Ie="@firebase/functions",xe="@firebase/functions-compat",Ee="@firebase/installations",Se="@firebase/installations-compat",ke="@firebase/messaging",Ce="@firebase/messaging-compat",Ne="@firebase/performance",Ae="@firebase/performance-compat",De="@firebase/remote-config",Re="@firebase/remote-config-compat",Pe="@firebase/storage",Oe="@firebase/storage-compat",Le="@firebase/firestore",Me="@firebase/ai",je="@firebase/firestore-compat",Ve="firebase",Ue="[DEFAULT]",Fe={[ue]:"fire-core",[fe]:"fire-core-compat",[me]:"fire-analytics",[pe]:"fire-analytics-compat",[ye]:"fire-app-check",[ge]:"fire-app-check-compat",[we]:"fire-auth",[ve]:"fire-auth-compat",[be]:"fire-rtdb",[_e]:"fire-data-connect",[Te]:"fire-rtdb-compat",[Ie]:"fire-fn",[xe]:"fire-fn-compat",[Ee]:"fire-iid",[Se]:"fire-iid-compat",[ke]:"fire-fcm",[Ce]:"fire-fcm-compat",[Ne]:"fire-perf",[Ae]:"fire-perf-compat",[De]:"fire-rc",[Re]:"fire-rc-compat",[Pe]:"fire-gcs",[Oe]:"fire-gcs-compat",[Le]:"fire-fst",[je]:"fire-fst-compat",[Me]:"fire-vertex","fire-js":"fire-js",[Ve]:"fire-js-all"},qe=new Map,Be=new Map,ze=new Map;function $e(e,t){try{e.container.addComponent(t)}catch(n){de.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function He(e){const t=e.name;if(ze.has(t))return de.debug(`There were multiple attempts to register component ${t}.`),!1;ze.set(t,e);for(const n of qe.values())$e(n,e);for(const n of Be.values())$e(n,e);return!0}function Ke(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ge(e){return null!=e&&void 0!==e.settings}
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
             */const We=new S("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
class Qe{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new O("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}
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
             */const Xe="12.6.0";function Je(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});const s={name:Ue,automaticDataCollectionEnabled:!0,...t},i=s.name;if("string"!=typeof i||!i)throw We.create("bad-app-name",{appName:String(i)});if(n||(n=f()),!n)throw We.create("no-options");const r=qe.get(i);if(r){if(C(n,r.options)&&C(s,r.config))return r;throw We.create("duplicate-app",{appName:i})}const o=new j(i);for(const c of ze.values())o.addComponent(c);const a=new Qe(n,s,o);return qe.set(i,a),a}function Ye(e=Ue){const t=qe.get(e);if(!t&&e===Ue&&f())return Je();if(!t)throw We.create("no-app",{appName:e});return t}function Ze(e,t,n){let s=Fe[e]??e;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=t.match(/\s|\//);if(i||r){const e=[`Unable to register library "${s}" with version "${t}":`];return i&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&e.push("and"),r&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void de.warn(e.join(" "))}He(new O(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}
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
             */const et="firebase-heartbeat-store";let tt=null;function nt(){return tt||(tt=ne("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(et)}catch(n){console.warn(n)}}}).catch(e=>{throw We.create("idb-open",{originalErrorMessage:e.message})})),tt}async function st(e,t){try{const n=(await nt()).transaction(et,"readwrite"),s=n.objectStore(et);await s.put(t,it(e)),await n.done}catch(n){if(n instanceof E)de.warn(n.message);else{const e=We.create("idb-set",{originalErrorMessage:n?.message});de.warn(e.message)}}}function it(e){return`${e.name}!${e.options.appId}`}
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
             */class rt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new at(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=ot();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let s=1;s<e.length;s++)e[s].date<n&&(n=e[s].date,t=s);return t}
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
             */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){de.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=ot(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let s=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),ct(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),ct(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),s=c(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return de.warn(e),""}}}function ot(){return(new Date).toISOString().substring(0,10)}class at{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!I()&&x().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await nt()).transaction(et),n=await t.objectStore(et).get(it(e));return await t.done,n}catch(t){if(t instanceof E)de.warn(t.message);else{const e=We.create("idb-get",{originalErrorMessage:t?.message});de.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return st(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return st(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function ct(e){return c(JSON.stringify({version:2,heartbeats:e})).length}var lt;function ut(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}lt="",He(new O("platform-logger",e=>new le(e),"PRIVATE")),He(new O("heartbeat",e=>new rt(e),"PRIVATE")),Ze(ue,he,lt),Ze(ue,he,"esm2020"),Ze("fire-js",""),
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
Ze("firebase","12.7.0","app");const ht=ut,dt=new S("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),ft=new z("@firebase/auth");function pt(e,...t){ft.logLevel<=V.ERROR&&ft.error(`Auth (${Xe}): ${e}`,...t)}
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
             */function mt(e,...t){throw vt(e,...t)}function gt(e,...t){return vt(e,...t)}function yt(e,t,n){const s={...ht(),[t]:n};return new S("auth","Firebase",s).create(t,{appName:e.name})}function wt(e){return yt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vt(e,...t){if("string"!=typeof e){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return dt.create(e,...t)}function bt(e,t,...n){if(!e)throw vt(t,...n)}function _t(e){const t="INTERNAL ASSERTION FAILED: "+e;throw pt(t),new Error(t)}function Tt(e,t){e||_t(t)}
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
             */function It(){return"undefined"!=typeof self&&self.location?.href||""}function xt(){return"undefined"!=typeof self&&self.location?.protocol||null}
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
             */function Et(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==xt()&&"https:"!==xt()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
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
class St{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tt(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return Et()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
             */function kt(e,t){Tt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
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
             */class Ct{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void _t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void _t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void _t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
             */const Nt={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},At=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dt=new St(3e4,6e4);
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
             */function Rt(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Pt(e,t,n,s,i={}){return Ot(e,i,async()=>{let i={},r={};s&&("GET"===t?r=s:i={body:JSON.stringify(s)});const o=A({key:e.config.apiKey,...r}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...i};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&g(e.emulatorConfig.host)&&(c.credentials="include"),Ct.fetch()(await Lt(e,e.config.apiHost,n,o),c)})}async function Ot(e,t,n){e._canInitEmulator=!1;const s={...Nt,...t};try{const t=new Mt(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw jt(e,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const t=i.ok?r.errorMessage:r.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw jt(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===n)throw jt(e,"email-already-in-use",r);if("USER_DISABLED"===n)throw jt(e,"user-disabled",r);const a=s[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw yt(e,a,o);mt(e,a)}}catch(i){if(i instanceof E)throw i;mt(e,"network-request-failed",{message:String(i)})}}async function Lt(e,t,n,s){const i=`${t}${n}?${s}`,r=e,o=r.config.emulator?kt(e.config,i):`${e.config.apiScheme}://${i}`;return At.includes(n)&&(await r._persistenceManagerAvailable,"COOKIE"===r._getPersistenceType())?r._getPersistence()._getFinalTarget(o).toString():o}class Mt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(gt(this.auth,"network-request-failed")),Dt.get())})}}function jt(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=gt(e,t,s);return i.customData._tokenResponse=n,i}
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
             */async function Vt(e,t){return Pt(e,"POST","/v1/accounts:lookup",t)}
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
             */function Ut(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function Ft(e){return 1e3*Number(e)}function qt(e){const[t,n,s]=e.split(".");if(void 0===t||void 0===n||void 0===s)return pt("JWT malformed, contained fewer than 3 sections"),null;try{const e=l(n);return e?JSON.parse(e):(pt("Failed to decode base64 JWT payload"),null)}catch(i){return pt("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Bt(e){const t=qt(e);return bt(t,"internal-error"),bt(void 0!==t.exp,"internal-error"),bt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
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
             */async function zt(e,t,n=!1){if(n)return t;try{return await t}catch(s){throw s instanceof E&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
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
             */(s)&&e.auth.currentUser===e&&await e.auth.signOut(),s}}class $t{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
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
             */class Ht{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ut(this.lastLoginAt),this.creationTime=Ut(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
             */async function Kt(e){const t=e.auth,n=await e.getIdToken(),s=await zt(e,Vt(t,{idToken:n}));bt(s?.users.length,t,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const r=i.providerUserInfo?.length?Gt(i.providerUserInfo):[],o=(a=e.providerData,c=r,[...a.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var a,c;const l=e.isAnonymous,u=!(e.email&&i.passwordHash||o?.length),h=!!l&&u,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ht(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(e,d)}function Gt(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
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
class Wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){bt(e.idToken,"internal-error"),bt(void 0!==e.idToken,"internal-error"),bt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Bt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){bt(0!==e.length,"internal-error");const t=Bt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(bt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await async function(e,t){const n=await Ot(e,{},async()=>{const n=A({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=e.config,r=await Lt(e,s,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&g(e.emulatorConfig.host)&&(a.credentials="include"),Ct.fetch()(r,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,r=new Wt;return n&&(bt("string"==typeof n,"internal-error",{appName:e}),r.refreshToken=n),s&&(bt("string"==typeof s,"internal-error",{appName:e}),r.accessToken=s),i&&(bt("number"==typeof i,"internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wt,this.toJSON())}_performRefresh(){return _t("not implemented")}}
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
             */function Qt(e,t){bt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Xt{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new $t(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ht(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await zt(this,this.stsTokenManager.getToken(this.auth,e));return bt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=P(e),s=await n.getIdToken(t),i=qt(s);bt(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r="object"==typeof i.firebase?i.firebase:void 0,o=r?.sign_in_provider;return{claims:i,token:s,authTime:Ut(Ft(i.auth_time)),issuedAtTime:Ut(Ft(i.iat)),expirationTime:Ut(Ft(i.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=P(e);await Kt(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(bt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){bt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Kt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(wt(this.auth));const e=await this.getIdToken();return await zt(this,async function(e,t){return Pt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,r=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,l=t.lastLoginAt??void 0,{uid:u,emailVerified:h,isAnonymous:d,providerData:f,stsTokenManager:p}=t;bt(u&&p,e,"internal-error");const m=Wt.fromJSON(this.name,p);bt("string"==typeof u,e,"internal-error"),Qt(n,e.name),Qt(s,e.name),bt("boolean"==typeof h,e,"internal-error"),bt("boolean"==typeof d,e,"internal-error"),Qt(i,e.name),Qt(r,e.name),Qt(o,e.name),Qt(a,e.name),Qt(c,e.name),Qt(l,e.name);const g=new Xt({uid:u,auth:e,email:s,emailVerified:h,displayName:n,isAnonymous:d,photoURL:r,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:l});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const s=new Wt;s.updateFromServerResponse(t);const i=new Xt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Kt(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];bt(void 0!==s.localId,"internal-error");const i=void 0!==s.providerUserInfo?Gt(s.providerUserInfo):[],r=!(s.email&&s.passwordHash||i?.length),o=new Wt;o.updateFromIdToken(n);const a=new Xt({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:r}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ht(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash||i?.length)};return Object.assign(a,c),a}}
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
             */const Jt=new Map;function Yt(e){Tt(e instanceof Function,"Expected a class definition");let t=Jt.get(e);return t?(Tt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Jt.set(e,t),t)}
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
             */class Zt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zt.type="NONE";const en=Zt;
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
             */function tn(e,t,n){return`firebase:${e}:${t}:${n}`}class nn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=tn(this.userKey,s.apiKey,i),this.fullPersistenceKey=tn("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await Vt(this.auth,{idToken:e}).catch(()=>{});return t?Xt._fromGetAccountInfoResponse(this.auth,t,e):null}return Xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new nn(Yt(en),e,n);const s=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=s[0]||Yt(en);const r=tn(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(r);if(t){let n;if("string"==typeof t){const s=await Vt(e,{idToken:t}).catch(()=>{});if(!s)break;n=await Xt._fromGetAccountInfoResponse(e,s,t)}else n=Xt._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=s.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(r,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(r)}catch{}})),new nn(i,e,n)):new nn(i,e,n)}}
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
             */function sn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(cn(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(rn(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(un(t))return"Blackberry";if(hn(t))return"Webos";if(on(t))return"Safari";if((t.includes("chrome/")||an(t))&&!t.includes("edge/"))return"Chrome";if(ln(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function rn(e=_()){return/firefox\//i.test(e)}function on(e=_()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function an(e=_()){return/crios\//i.test(e)}function cn(e=_()){return/iemobile/i.test(e)}function ln(e=_()){return/android/i.test(e)}function un(e=_()){return/blackberry/i.test(e)}function hn(e=_()){return/webos/i.test(e)}function dn(e=_()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function fn(){return function(){const e=_();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function pn(e=_()){return dn(e)||ln(e)||hn(e)||un(e)||/windows phone/i.test(e)||cn(e)}
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
             */function mn(e,t=[]){let n;switch(e){case"Browser":n=sn(_());break;case"Worker":n=`${sn(_())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Xe}/${s}`}
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
             */class gn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,s)=>{try{n(e(t))}catch(i){s(i)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(s){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}
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
             */class yn{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
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
             */class wn{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bn(this),this.idTokenSubscription=new bn(this),this.beforeStateQueue=new gn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dt,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Yt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await nn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await Vt(this,{idToken:e}),n=await Xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ge(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,r=await this.tryRedirectSignIn(e);t&&t!==i||!r?.user||(n=r.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return bt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Kt(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(wt(this));const t=e?P(e):null;return t&&bt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&bt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Yt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Pt(e,"GET","/v2/passwordPolicy",Rt(e,t))}
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
             */(this),t=new yn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new S("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Pt(e,"POST","/v2/accounts:revokeToken",Rt(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Yt(e)||this._popupRedirectResolver;bt(t,this,"argument-error"),this.redirectPersistenceManager=await nn.create(this,[Yt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t);let r=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(bt(o,this,"internal-error"),o.then(()=>{r||i(this.currentUser)}),"function"==typeof t){const i=e.addObserver(t,n,s);return()=>{r=!0,i()}}{const n=e.addObserver(t);return()=>{r=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return bt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e,...t){ft.logLevel<=V.WARN&&ft.warn(`Auth (${Xe}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function vn(e){return P(e)}class bn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new D(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return bt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
             */let _n={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tn(e,t,n){const s=vn(e);bt(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const i=In(t),{host:r,port:o}=function(e){const t=In(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const e=i[1];return{host:e,port:xn(s.substr(e.length+1))}}{const[e,t]=s.split(":");return{host:e,port:xn(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${i}//${r}${a}/`},l=Object.freeze({host:r,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!s._canInitEmulator)return bt(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),void bt(C(c,s.config.emulator)&&C(l,s.emulatorConfig),s,"emulator-config-failed");s.config.emulator=c,s.emulatorConfig=l,s.settings.appVerificationDisabledForTesting=!0,g(r)?(y(`${i}//${r}${a}`),b("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
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
             */()}function In(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function xn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class En{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _t("not implemented")}_getIdTokenResponse(e){return _t("not implemented")}_linkToIdToken(e,t){return _t("not implemented")}_getReauthenticationResolver(e){return _t("not implemented")}}
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
             */async function Sn(e,t){return async function(e,t,n,s,i={}){const r=await Pt(e,t,n,s,i);return"mfaPendingCredential"in r&&mt(e,"multi-factor-auth-required",{_serverResponse:r}),r}(e,"POST","/v1/accounts:signInWithIdp",Rt(e,t))}
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
             */class kn extends En{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new kn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):mt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const r=new kn(n,s);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){return Sn(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Sn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Sn(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=A(t)}return e}}
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
             */class Cn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
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
             */class Nn extends Cn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
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
             */class An extends Nn{constructor(){super("facebook.com")}static credential(e){return kn._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return An.credential(e.oauthAccessToken)}catch{return null}}}An.FACEBOOK_SIGN_IN_METHOD="facebook.com",An.PROVIDER_ID="facebook.com";
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
class Dn extends Nn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return kn._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Dn.credential(t,n)}catch{return null}}}Dn.GOOGLE_SIGN_IN_METHOD="google.com",Dn.PROVIDER_ID="google.com";
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
class Rn extends Nn{constructor(){super("github.com")}static credential(e){return kn._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Rn.credential(e.oauthAccessToken)}catch{return null}}}Rn.GITHUB_SIGN_IN_METHOD="github.com",Rn.PROVIDER_ID="github.com";
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
class Pn extends Nn{constructor(){super("twitter.com")}static credential(e,t){return kn._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Pn.credentialFromTaggedObject(e)}static credentialFromError(e){return Pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Pn.credential(t,n)}catch{return null}}}Pn.TWITTER_SIGN_IN_METHOD="twitter.com",Pn.PROVIDER_ID="twitter.com";
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
class On{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Xt._fromIdTokenResponse(e,n,s),r=Ln(n);return new On({user:i,providerId:r,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Ln(n);return new On({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Ln(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
             */class Mn extends E{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Mn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Mn(e,t,n,s)}}function jn(e,t,n,s){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Mn._fromErrorAndOperation(e,n,t,s);throw n})}
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
async function Vn(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const s=P(e),i={idToken:await s.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},r=await zt(s,
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
async function(e,t){return Pt(e,"POST","/v1/accounts:update",t)}(s.auth,i));s.displayName=r.displayName||null,s.photoURL=r.photoUrl||null;const o=s.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=s.displayName,o.photoURL=s.photoURL),await s._updateTokensIfNecessary(r)}const Un="__sak";
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
             */class Fn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Un,"1"),this.storage.removeItem(Un),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
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
             */class qn extends Fn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);fn()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}qn.type="LOCAL";const Bn=qn;
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
             */class zn extends Fn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}zn.type="SESSION";const $n=zn;
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
class Hn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Hn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,r=this.handlersMap[s];if(!r?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const o=Array.from(r).map(async e=>e(t.origin,i)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
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
function Kn(e="",t=10){let n="";for(let s=0;s<t;s++)n+=Math.floor(10*Math.random());return e+n}
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
             */Hn.receivers=[];class Gn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,r;return new Promise((o,a)=>{const c=Kn("",20);s.port1.start();const l=setTimeout(()=>{a(new Error("unsupported_event"))},n);r={messageChannel:s,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(r),s.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}
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
const Xn="firebaseLocalStorageDb",Jn="firebaseLocalStorage",Yn="fbase_key";class Zn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function es(e,t){return e.transaction([Jn],t?"readwrite":"readonly").objectStore(Jn)}function ts(){const e=indexedDB.open(Xn,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Jn,{keyPath:Yn})}catch(s){n(s)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(Jn)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Xn);return new Zn(e).toPromise()}(),t(await ts()))})})}async function ns(e,t,n){const s=es(e,!0).put({[Yn]:t,value:n});return new Zn(s).toPromise()}function ss(e,t){const n=es(e,!0).delete(t);return new Zn(n).toPromise()}class is{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await ts()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hn._getInstance(Qn()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new Gn(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ts();return await ns(e,Un,"1"),await ss(e,Un),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ns(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=es(e,!1).get(t),s=await new Zn(n).toPromise();return void 0===s?null:s.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ss(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=es(e,!1).getAll();return new Zn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}is.type="LOCAL";const rs=is;
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
function os(e,t){return t?Yt(t):(bt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
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
             */new St(3e4,6e4);class as extends En{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Sn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Sn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Sn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cs(e){
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
             */return async function(e,t,n=!1){if(Ge(e.app))return Promise.reject(wt(e));const s="signIn",i=await jn(e,s,t),r=await On._fromIdTokenResponse(e,s,i);return n||await e._updateCurrentUser(r.user),r}(e.auth,new as(e),e.bypassAuthState)}function ls(e){const{auth:t,user:n}=e;return bt(n,t,"internal-error"),
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
async function(e,t,n=!1){const{auth:s}=e;if(Ge(s.app))return Promise.reject(wt(s));const i="reauthenticate";try{const r=await zt(e,jn(s,i,t,e),n);bt(r.idToken,s,"internal-error");const o=qt(r.idToken);bt(o,s,"internal-error");const{sub:a}=o;return bt(e.uid===a,s,"user-mismatch"),On._forOperation(e,i,r)}catch(r){throw"auth/user-not-found"===r?.code&&mt(s,"user-mismatch"),r}}(n,new as(e),e.bypassAuthState)}async function us(e){const{auth:t,user:n}=e;return bt(n,t,"internal-error"),async function(e,t,n=!1){const s=await zt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return On._forOperation(e,"link",s)}(n,new as(e),e.bypassAuthState)}
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
             */class hs{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cs;case"linkViaPopup":case"linkViaRedirect":return us;case"reauthViaPopup":case"reauthViaRedirect":return ls;default:mt(this.auth,"internal-error")}}resolve(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
             */const ds=new St(2e3,1e4);async function fs(e,t,n){if(Ge(e.app))return Promise.reject(gt(e,"operation-not-supported-in-this-environment"));const s=vn(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&mt(e,"argument-error"),yt(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,Cn);const i=os(s,n);return new ps(s,"signInViaPopup",t,i).executeNotNull()}class ps extends hs{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,ps.currentPopupAction&&ps.currentPopupAction.cancel(),ps.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return bt(e,this.auth,"internal-error"),e}async onExecution(){Tt(1===this.filter.length,"Popup operations only handle one event");const e=Kn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ps.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(gt(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,ds.get())};e()}}ps.currentPopupAction=null;
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
const ms="pendingRedirect",gs=new Map;class ys extends hs{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=gs.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return tn(ms,e.config.apiKey,e.name)}(t),s=function(e){return Yt(e._redirectPersistence)}(e);if(!(await s._isAvailable()))return!1;const i="true"===await s._get(n);return await s._remove(n),i}(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}gs.set(this.auth._key(),e)}return this.bypassAuthState||gs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function ws(e,t){gs.set(e._key(),t)}async function vs(e,t,n=!1){if(Ge(e.app))return Promise.reject(wt(e));const s=vn(e),i=os(s,t),r=new ys(s,i,n),o=await r.execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}
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
             */class bs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ts(e);default:return!1}}
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
             */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ts(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(gt(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(_s(e))}saveEventToCache(e){this.cachedEventUids.add(_s(e)),this.lastProcessedEventTime=Date.now()}}function _s(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Ts({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}
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
const Is=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xs=/^https?/;async function Es(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Pt(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(Ss(n))return}catch{}mt(e,"unauthorized-domain")}function Ss(e){const t=It(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===s?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===s}if(!xs.test(n))return!1;if(Is.test(e))return s===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}
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
             */const ks=new St(3e4,6e4);function Cs(){const e=Wn().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function Ns(e){return new Promise((t,n)=>{function s(){Cs(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Cs(),n(gt(e,"network-request-failed"))},timeout:ks.get()})}if(Wn().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!Wn().gapi?.load){const t=`__iframefcb${Math.floor(1e6*Math.random())}`;return Wn()[t]=()=>{gapi.load?s():n(gt(e,"network-request-failed"))},(i=`${_n.gapiScript}?onload=${t}`,_n.loadJS(i)).catch(e=>n(e))}s()}var i}).catch(e=>{throw As=null,e})}let As=null;
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
const Ds=new St(5e3,15e3),Rs={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ps=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Os(e){const t=e.config;bt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?kt(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:Xe},i=Ps.get(e.config.apiHost);i&&(s.eid=i);const r=e._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${A(s).slice(1)}`}async function Ls(e){const t=await function(e){return As=As||Ns(e),As}(e),n=Wn().gapi;return bt(n,e,"internal-error"),t.open({where:document.body,url:Os(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Rs,dontclear:!0},t=>new Promise(async(n,s)=>{await t.restyle({setHideOnLeave:!1});const i=gt(e,"network-request-failed"),r=Wn().setTimeout(()=>{s(i)},Ds.get());function o(){Wn().clearTimeout(r),n(t)}t.ping(o).then(o,()=>{s(i)})}))}
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
             */const Ms={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class js{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Vs(e,t,n,s=500,i=600){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...Ms,width:s.toString(),height:i.toString(),top:r,left:o},l=_().toLowerCase();n&&(a=an(l)?"_blank":n),rn(l)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=_()){return dn(e)&&!!window.navigator?.standalone}(l)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}
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
             */(t||"",a),new js(null);const h=window.open(t||"",a,u);bt(h,e,"popup-blocked");try{h.focus()}catch(d){}return new js(h)}const Us="__/auth/handler",Fs="emulator/auth/handler",qs=encodeURIComponent("fac");async function Bs(e,t,n,s,i,r){bt(e.config.authDomain,e,"auth-domain-config-required"),bt(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:Xe,eventId:i};if(t instanceof Cn){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Nn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))void 0===a[u]&&delete a[u];const c=await e._getAppCheckToken(),l=c?`#${qs}=${encodeURIComponent(c)}`:"";return`${function({config:e}){return e.emulator?kt(e,Fs):`https://${e.authDomain}/${Us}`}
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
             */(e)}?${A(a).slice(1)}${l}`}const zs="webStorageSupport",$s=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$n,this._completeRedirectFn=vs,this._overrideRedirectResult=ws}async _openPopup(e,t,n,s){return Tt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()"),Vs(e,await Bs(e,t,n,It(),s),Kn())}async _openRedirect(e,t,n,s){return await this._originValidation(e),function(e){Wn().location.href=e}(await Bs(e,t,n,It(),s)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Tt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Ls(e),n=new bs(e);return t.register("authEvent",t=>(bt(t?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(zs,{type:zs},n=>{const s=n?.[0]?.[zs];void 0!==s&&t(!!s),mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Es(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pn()||on()||dn()}};var Hs="@firebase/auth",Ks="1.12.0";
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
class Gs{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){bt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
const Ws=p("authIdTokenMaxAge")||300;let Qs=null;var Xs;_n={loadJS:e=>new Promise((t,n)=>{const s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{const t=gt("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},Xs="Browser",He(new O("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:r,authDomain:o}=n.options;bt(r&&!r.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:r,authDomain:o,clientPlatform:Xs,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mn(Xs)},c=new wn(n,s,i,a);return function(e,t){const n=t?.persistence||[],s=(Array.isArray(n)?n:[n]).map(Yt);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,t?.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),He(new O("auth-internal",e=>(e=>new Gs(e))(vn(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),Ze(Hs,Ks,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(Xs)),Ze(Hs,Ks,"esm2020");var Js,Ys,Zs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
            Copyright The Closure Library Authors.
            SPDX-License-Identifier: Apache-2.0
            */(function(){var e;
/** @license

             Copyright The Closure Library Authors.
             SPDX-License-Identifier: Apache-2.0
            */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const s=Array(16);if("string"==typeof t)for(var i=0;i<16;++i)s[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;i<16;++i)s[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];let r,o=e.g[3];r=t+(o^n&(i^o))+s[0]+3614090360&4294967295,r=o+(i^(t=n+(r<<7&4294967295|r>>>25))&(n^i))+s[1]+3905402710&4294967295,o=t+(r<<12&4294967295|r>>>20),r=i+(n^o&(t^n))+s[2]+606105819&4294967295,r=n+(t^(i=o+(r<<17&4294967295|r>>>15))&(o^t))+s[3]+3250441966&4294967295,r=t+(o^(n=i+(r<<22&4294967295|r>>>10))&(i^o))+s[4]+4118548399&4294967295,r=o+(i^(t=n+(r<<7&4294967295|r>>>25))&(n^i))+s[5]+1200080426&4294967295,o=t+(r<<12&4294967295|r>>>20),r=i+(n^o&(t^n))+s[6]+2821735955&4294967295,r=n+(t^(i=o+(r<<17&4294967295|r>>>15))&(o^t))+s[7]+4249261313&4294967295,r=t+(o^(n=i+(r<<22&4294967295|r>>>10))&(i^o))+s[8]+1770035416&4294967295,r=o+(i^(t=n+(r<<7&4294967295|r>>>25))&(n^i))+s[9]+2336552879&4294967295,o=t+(r<<12&4294967295|r>>>20),r=i+(n^o&(t^n))+s[10]+4294925233&4294967295,r=n+(t^(i=o+(r<<17&4294967295|r>>>15))&(o^t))+s[11]+2304563134&4294967295,r=t+(o^(n=i+(r<<22&4294967295|r>>>10))&(i^o))+s[12]+1804603682&4294967295,r=o+(i^(t=n+(r<<7&4294967295|r>>>25))&(n^i))+s[13]+4254626195&4294967295,o=t+(r<<12&4294967295|r>>>20),r=i+(n^o&(t^n))+s[14]+2792965006&4294967295,r=n+(t^(i=o+(r<<17&4294967295|r>>>15))&(o^t))+s[15]+1236535329&4294967295,r=t+(i^o&((n=i+(r<<22&4294967295|r>>>10))^i))+s[1]+4129170786&4294967295,r=o+(n^i&((t=n+(r<<5&4294967295|r>>>27))^n))+s[6]+3225465664&4294967295,o=t+(r<<9&4294967295|r>>>23),r=i+(t^n&(o^t))+s[11]+643717713&4294967295,r=n+(o^t&((i=o+(r<<14&4294967295|r>>>18))^o))+s[0]+3921069994&4294967295,r=t+(i^o&((n=i+(r<<20&4294967295|r>>>12))^i))+s[5]+3593408605&4294967295,r=o+(n^i&((t=n+(r<<5&4294967295|r>>>27))^n))+s[10]+38016083&4294967295,o=t+(r<<9&4294967295|r>>>23),r=i+(t^n&(o^t))+s[15]+3634488961&4294967295,r=n+(o^t&((i=o+(r<<14&4294967295|r>>>18))^o))+s[4]+3889429448&4294967295,r=t+(i^o&((n=i+(r<<20&4294967295|r>>>12))^i))+s[9]+568446438&4294967295,r=o+(n^i&((t=n+(r<<5&4294967295|r>>>27))^n))+s[14]+3275163606&4294967295,o=t+(r<<9&4294967295|r>>>23),r=i+(t^n&(o^t))+s[3]+4107603335&4294967295,r=n+(o^t&((i=o+(r<<14&4294967295|r>>>18))^o))+s[8]+1163531501&4294967295,r=t+(i^o&((n=i+(r<<20&4294967295|r>>>12))^i))+s[13]+2850285829&4294967295,r=o+(n^i&((t=n+(r<<5&4294967295|r>>>27))^n))+s[2]+4243563512&4294967295,o=t+(r<<9&4294967295|r>>>23),r=i+(t^n&(o^t))+s[7]+1735328473&4294967295,r=n+(o^t&((i=o+(r<<14&4294967295|r>>>18))^o))+s[12]+2368359562&4294967295,r=t+((n=i+(r<<20&4294967295|r>>>12))^i^o)+s[5]+4294588738&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^i)+s[8]+2272392833&4294967295,o=t+(r<<11&4294967295|r>>>21),r=i+(o^t^n)+s[11]+1839030562&4294967295,r=n+((i=o+(r<<16&4294967295|r>>>16))^o^t)+s[14]+4259657740&4294967295,r=t+((n=i+(r<<23&4294967295|r>>>9))^i^o)+s[1]+2763975236&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^i)+s[4]+1272893353&4294967295,o=t+(r<<11&4294967295|r>>>21),r=i+(o^t^n)+s[7]+4139469664&4294967295,r=n+((i=o+(r<<16&4294967295|r>>>16))^o^t)+s[10]+3200236656&4294967295,r=t+((n=i+(r<<23&4294967295|r>>>9))^i^o)+s[13]+681279174&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^i)+s[0]+3936430074&4294967295,o=t+(r<<11&4294967295|r>>>21),r=i+(o^t^n)+s[3]+3572445317&4294967295,r=n+((i=o+(r<<16&4294967295|r>>>16))^o^t)+s[6]+76029189&4294967295,r=t+((n=i+(r<<23&4294967295|r>>>9))^i^o)+s[9]+3654602809&4294967295,r=o+((t=n+(r<<4&4294967295|r>>>28))^n^i)+s[12]+3873151461&4294967295,o=t+(r<<11&4294967295|r>>>21),r=i+(o^t^n)+s[15]+530742520&4294967295,r=n+((i=o+(r<<16&4294967295|r>>>16))^o^t)+s[2]+3299628645&4294967295,r=t+(i^((n=i+(r<<23&4294967295|r>>>9))|~o))+s[0]+4096336452&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~i))+s[7]+1126891415&4294967295,o=t+(r<<10&4294967295|r>>>22),r=i+(t^(o|~n))+s[14]+2878612391&4294967295,r=n+(o^((i=o+(r<<15&4294967295|r>>>17))|~t))+s[5]+4237533241&4294967295,r=t+(i^((n=i+(r<<21&4294967295|r>>>11))|~o))+s[12]+1700485571&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~i))+s[3]+2399980690&4294967295,o=t+(r<<10&4294967295|r>>>22),r=i+(t^(o|~n))+s[10]+4293915773&4294967295,r=n+(o^((i=o+(r<<15&4294967295|r>>>17))|~t))+s[1]+2240044497&4294967295,r=t+(i^((n=i+(r<<21&4294967295|r>>>11))|~o))+s[8]+1873313359&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~i))+s[15]+4264355552&4294967295,o=t+(r<<10&4294967295|r>>>22),r=i+(t^(o|~n))+s[6]+2734768916&4294967295,r=n+(o^((i=o+(r<<15&4294967295|r>>>17))|~t))+s[13]+1309151649&4294967295,r=t+(i^((n=i+(r<<21&4294967295|r>>>11))|~o))+s[4]+4149444226&4294967295,r=o+(n^((t=n+(r<<6&4294967295|r>>>26))|~i))+s[11]+3174756917&4294967295,o=t+(r<<10&4294967295|r>>>22),r=i+(t^(o|~n))+s[2]+718787259&4294967295,r=n+(o^((i=o+(r<<15&4294967295|r>>>17))|~t))+s[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(r<<21&4294967295|r>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+o&4294967295}function s(e,t){this.h=t;const n=[];let s=!0;for(let i=e.length-1;i>=0;i--){const r=0|e[i];s&&r==t||(n[i]=r,s=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const s=t-this.blockSize,i=this.C;let r=this.h,o=0;for(;o<t;){if(0==r)for(;o<=s;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(i[r++]=e.charCodeAt(o++),r==this.blockSize){n(this,i),r=0;break}}else for(;o<t;)if(i[r++]=e[o++],r==this.blockSize){n(this,i),r=0;break}}this.h=r,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let s=0;s<32;s+=8)e[t++]=this.g[n]>>>s&255;return e};var i={};function r(e){return-128<=e&&e<128?function(e,t){var n=i;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new s([0|e],e<0?-1:0)}):new s([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let s=0;e>=n;s++)t[s]=e/n|0,n*=4294967296;return new s(t,0)}var a=r(0),c=r(1),l=r(16777216);function u(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let s=0;s<t;s++)n[s]=~e.g[s];return new s(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(u(t))throw Error("division by zero");if(u(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=t;s.l(e)<=0;)n=y(n),s=y(s);var i=w(n,1),r=w(s,1);for(s=w(s,2),n=w(n,2);!u(s);){var l=r.add(s);l.l(e)<=0&&(i=i.add(n),r=l),s=w(s,1),n=w(n,1)}return t=f(e,i.j(t)),new m(i,t)}for(i=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),s=(s=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,s-48),l=(r=o(n)).j(t);h(l)||l.l(e)>0;)l=(r=o(n-=s)).j(t);u(r)&&(r=c),i=i.add(r),e=f(e,l)}return new m(i,e)}function y(e){const t=e.g.length+1,n=[];for(let s=0;s<t;s++)n[s]=e.i(s)<<1|e.i(s-1)>>>31;return new s(n,e.h)}function w(e,t){const n=t>>5;t%=32;const i=e.g.length-n,r=[];for(let s=0;s<i;s++)r[s]=t>0?e.i(s+n)>>>t|e.i(s+n+1)<<32-t:e.i(s+n);return new s(r,e.h)}(e=s.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const s=this.i(n);e+=(s>=0?s:4294967296+s)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(u(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let s="";for(;;){const i=g(n,t).g;let r=(((n=f(n,i.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(u(n=i))return r+s;for(;r.length<6;)r="0"+r;s=r+s}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:u(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let i=0;for(let s=0;s<=t;s++){let t=i+(65535&this.i(s))+(65535&e.i(s)),r=(t>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);i=r>>>16,t&=65535,r&=65535,n[s]=r<<16|t}return new s(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(u(this)||u(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(l)<0&&e.l(l)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(let t=0;t<e.g.length;t++){const s=this.i(i)>>>16,r=65535&this.i(i),o=e.i(t)>>>16,a=65535&e.i(t);n[2*i+2*t]+=r*a,p(n,2*i+2*t),n[2*i+2*t+1]+=s*a,p(n,2*i+2*t+1),n[2*i+2*t+1]+=r*o,p(n,2*i+2*t+1),n[2*i+2*t+2]+=s*o,p(n,2*i+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new s(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let s=0;s<t;s++)n[s]=this.i(s)&e.i(s);return new s(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let s=0;s<t;s++)n[s]=this.i(s)|e.i(s);return new s(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let s=0;s<t;s++)n[s]=this.i(s)^e.i(s);return new s(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,Ys=t,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.B,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const s=o(Math.pow(n,8));let i=a;for(let a=0;a<t.length;a+=8){var r=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+r),n);r<8?(r=o(Math.pow(n,r)),i=i.j(r).add(o(e))):(i=i.j(s),i=i.add(o(e)))}return i},Js=s}).apply(void 0!==Zs?Zs:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var ei,ti,ni,si,ii,ri,oi,ai,ci="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
            Copyright The Closure Library Authors.
            SPDX-License-Identifier: Apache-2.0
            */(function(){var e,t=Object.defineProperty,n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof ci&&ci];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function s(e,s){if(s)e:{var i=n;e=e.split(".");for(var r=0;r<e.length-1;r++){var o=e[r];if(!(o in i))break e;i=i[o]}(s=s(r=i[e=e[e.length-1]]))!=r&&null!=s&&t(i,e,{configurable:!0,writable:!0,value:s})}}s("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license

             Copyright The Closure Library Authors.
             SPDX-License-Identifier: Apache-2.0
            */
var i=i||{},r=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function u(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function f(e,t){for(let s=1;s<arguments.length;s++){const t=arguments[s];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const s=t.length||0;e.length=n+s;for(let i=0;i<s;i++)e[n+i]=t[i]}else e.push(t)}}function p(e){r.setTimeout(()=>{throw e},0)}function m(){var e=b;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let w,v=!1,b=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},_=()=>{const e=Promise.resolve(void 0);w=()=>{e.then(T)}};function T(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}v=!1}function I(){this.u=this.u,this.C=this.C}function x(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},x.prototype.h=function(){this.defaultPrevented=!0};var E=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};r.addEventListener("test",e,t),r.removeEventListener("test",e,t)}catch(n){}return e}();function S(e){return/^[\s\xa0]*$/.test(e)}function k(e,t){x.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}u(k,x),k.prototype.init=function(e,t){const n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&k.Z.h.call(this)},k.prototype.h=function(){k.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var C="closure_listenable_"+(1e6*Math.random()|0),N=0;function A(e,t,n,s,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ha=i,this.key=++N,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function R(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const O="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function L(e,t){let n,s;for(let i=1;i<arguments.length;i++){for(n in s=arguments[i],s)e[n]=s[n];for(let t=0;t<O.length;t++)n=O[t],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function M(e){this.src=e,this.g={},this.h=0}function j(e,t){const n=t.type;if(n in e.g){var s,i=e.g[n],r=Array.prototype.indexOf.call(i,t,void 0);(s=r>=0)&&Array.prototype.splice.call(i,r,1),s&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function V(e,t,n,s){for(let i=0;i<e.length;++i){const r=e[i];if(!r.da&&r.listener==t&&r.capture==!!n&&r.ha==s)return i}return-1}M.prototype.add=function(e,t,n,s,i){const r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);const o=V(e,t,s,i);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new A(t,this.src,r,!!s,i)).fa=n,e.push(t)),t};var U="closure_lm_"+(1e6*Math.random()|0),F={};function q(e,t,n,s,i){if(Array.isArray(t)){for(let r=0;r<t.length;r++)q(e,t[r],n,s,i);return null}return n=W(n),e&&e[C]?e.J(t,n,!!o(s)&&!!s.capture,i):function(e,t,n,s,i,r){if(!t)throw Error("Invalid event type");const a=o(i)?!!i.capture:!!i;let c=K(e);if(c||(e[U]=c=new M(e)),(n=c.add(t,n,s,a,r)).proxy)return n;if(s=function(){function e(n){return t.call(e.src,e.listener,n)}const t=H;return e}(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)E||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),s,i);else if(e.attachEvent)e.attachEvent($(t.toString()),s);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(s)}return n}(e,t,n,!1,s,i)}function B(e,t,n,s,i){if(Array.isArray(t))for(var r=0;r<t.length;r++)B(e,t[r],n,s,i);else s=o(s)?!!s.capture:!!s,n=W(n),e&&e[C]?(e=e.i,(r=String(t).toString())in e.g&&(n=V(t=e.g[r],n,s,i))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[r],e.h--))):e&&(e=K(e))&&(t=e.g[t.toString()],e=-1,t&&(e=V(t,n,s,i)),(n=e>-1?t[e]:null)&&z(n))}function z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[C])j(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent($(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=K(t))?(j(n,e),0==n.h&&(n.src=null,t[U]=null)):D(e)}}}function $(e){return e in F?F[e]:F[e]="on"+e}function H(e,t){if(e.da)e=!0;else{t=new k(t,this);const n=e.listener,s=e.ha||e.src;e.fa&&z(e),e=n.call(s,t)}return e}function K(e){return(e=e[U])instanceof M?e:null}var G="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[G]||(e[G]=function(t){return e.handleEvent(t)}),e[G])}function Q(){I.call(this),this.i=new M(this),this.M=this,this.G=null}function X(e,t){var n,s=e.G;if(s)for(n=[];s;s=s.G)n.push(s);if(e=e.M,s=t.type||t,"string"==typeof t)t=new x(t,e);else if(t instanceof x)t.target=t.target||e;else{var i=t;L(t=new x(s,e),i)}let r,o;if(i=!0,n)for(o=n.length-1;o>=0;o--)r=t.g=n[o],i=J(r,s,!0,t)&&i;if(r=t.g=e,i=J(r,s,!0,t)&&i,i=J(r,s,!1,t)&&i,n)for(o=0;o<n.length;o++)r=t.g=n[o],i=J(r,s,!1,t)&&i}function J(e,t,n,s){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let i=!0;for(let r=0;r<t.length;++r){const o=t[r];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&j(e.i,o),i=!1!==t.call(n,s)&&i}}return i&&!s.defaultPrevented}function Y(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:r.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,Y(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}u(Q,I),Q.prototype[C]=!0,Q.prototype.removeEventListener=function(e,t,n,s){B(this,e,t,n,s)},Q.prototype.N=function(){if(Q.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},Q.prototype.J=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)},Q.prototype.K=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};class Z extends I{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Y(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){I.call(this),this.h=e,this.g={}}u(ee,I);var te=[];function ne(e){R(e.g,function(e,t){this.g.hasOwnProperty(t)&&z(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var se=r.JSON.stringify,ie=r.JSON.parse,re=class{stringify(e){return r.JSON.stringify(e,void 0)}parse(e){return r.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function le(){x.call(this,"d")}function ue(){x.call(this,"c")}u(le,x),u(ue,x);var he={},de=null;function fe(){return de=de||new Q}function pe(e){x.call(this,he.Ia,e)}function me(e){const t=fe();X(t,new pe(t))}function ge(e,t){x.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();X(t,new ge(t,e))}function we(e,t){x.call(this,he.Ja,e),this.size=t}function ve(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){e()},t)}function be(){this.g=!0}function _e(e,t,n,s){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const r=JSON.parse(t);if(r)for(e=0;e<r.length;e++)if(Array.isArray(r[e])){var n=r[e];if(!(n.length<2)){var s=n[1];if(Array.isArray(s)&&!(s.length<1)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<s.length;e++)s[e]=""}}}return se(r)}catch(r){return t}}(e,n)+(s?" "+s:"")})}he.Ia="serverreachability",u(pe,x),he.STAT_EVENT="statevent",u(ge,x),he.Ja="timingevent",u(we,x),be.prototype.ua=function(){this.g=!1},be.prototype.info=function(){};var Te,Ie={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},xe={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Ee(){}function Se(e){return encodeURIComponent(String(e))}function ke(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function Ce(e,t,n,s){this.j=e,this.i=t,this.l=n,this.S=s||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}u(Ee,oe),Ee.prototype.g=function(){return new XMLHttpRequest},Te=new Ee;var Ae={},De={};function Re(e,t,n){e.M=1,e.A=st(Ye(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),Me(e),e.B=Ye(e.A);var n=e.B,s=e.S;Array.isArray(s)||(s=[String(s)]),yt(n.i,"t",s),e.C=0,n=e.j.L,e.h=new Ne,e.g=sn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,s=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(te[0]=i.toString()),i=te);for(let r=0;r<i.length;r++){const e=q(n,i[r],s||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,s,i,r){e.info(function(){if(e.g)if(r){var o="",a=r.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Oe(e){return!!e.g&&"GET"==e.v&&2!=e.M&&e.j.Aa}function Le(e,t){var n=e.C,s=t.indexOf("\n",n);return-1==s?De:(n=Number(t.substring(n,s)),isNaN(n)?Ae:(s+=1)+n>t.length?De:(t=t.slice(s,s+n),e.C=s+n,t))}function Me(e){e.T=Date.now()+e.H,je(e,e.H)}function je(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=ve(c(e.aa,e),t)}function Ve(e){e.D&&(r.clearTimeout(e.D),e.D=null)}function Ue(e){0==e.j.I||e.K||Yt(e.j,e)}function Fe(e){Ve(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function qe(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ke(n.h,e)))if(!e.L&&Ke(n.h,e)&&3==n.I){try{var s=n.Ba.g.parse(t)}catch(u){s=null}if(Array.isArray(s)&&3==s.length){var i=s;if(0==i[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Jt(n),qt(n)}Wt(n),ye(18)}}else n.xa=i[1],0<n.xa-n.K&&i[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=ve(c(n.Va,n),6e3));He(n.h)<=1&&n.ta&&(n.ta=void 0)}else en(n,11)}else if((e.L||n.g==e)&&Jt(n),!S(t))for(i=n.Ba.g.parse(t),t=0;t<i.length;t++){let c=i[t];const u=c[0];if(!(u<=n.K))if(n.K=u,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const i=c[4];null!=i&&(n.za=i,n.j.info("SVER="+n.za));const u=c[5];null!=u&&"number"==typeof u&&u>0&&(s=1.5*u,n.O=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=s.h;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(Ge(r,r.h),r.h=null))}if(s.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(s.wa=e,nt(s.J,s.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((s=n).na=nn(s,s.L?s.ba:null,s.W),o.L){We(s.h,o);var a=o,l=s.O;l&&(a.H=l),a.D&&(Ve(a),Me(a)),s.g=o}else Gt(s);n.i.length>0&&zt(n)}else"stop"!=c[0]&&"close"!=c[0]||en(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?en(n,7):Ft(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(u){}}Ce.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Mt(e)?t.j():this.Y(e)},Ce.prototype.Y=function(e){try{if(e==this.g)e:{const c=Mt(this.g),l=this.g.ya();if(this.g.ca(),!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||jt(this.g)))){this.K||4!=c||7==l||me(),Ve(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Oe(e))return e.g.la();const t=jt(e.g);if(""===t)return"";let n="";const s=t.length,i=4==Mt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return Fe(e),Ue(e),"";e.h.i=new r.TextDecoder}for(let r=0;r<s;r++)e.h.h=!0,n+=e.h.i.decode(t[r],{stream:!(i&&r==s-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,s,i,r,o){e.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+r+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var s,i=this.g;if((s=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(s)){var o=s;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),Fe(this),Ue(this);break e}_e(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,qe(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Le(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),_e(this.i,this.l,null,"[Incomplete Response]");break}if(t==Ae){this.m=4,ye(15),_e(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}_e(this.i,this.l,t,null),qe(this,t)}if(Oe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Qt(a),a.P=!0,ye(11))}}else _e(this.i,this.l,n,"[Invalid Chunked Response]"),Fe(this),Ue(this)}else _e(this.i,this.l,n,null),qe(this,n);4==c&&Fe(this),this.o&&!this.K&&(4==c?Yt(this.j,this):(this.o=!1,Me(this)))}else(function(e){const t={};e=(e.g&&Mt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<e.length;s++){if(S(e[s]))continue;var n=ke(e[s]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const r=t[i]||[];t[i]=r,r.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),Fe(this),Ue(this)}}}catch(Bi){}},Ce.prototype.cancel=function(){this.K=!0,Fe(this)},Ce.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),Fe(this),this.m=2,Ue(this)):je(this,this.T-e)};var Be=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,e=r.PerformanceNavigationTiming?(e=r.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $e(e){return!!e.h||!!e.g&&e.g.size>=e.j}function He(e){return e.h?1:e.g?e.g.size:0}function Ke(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ge(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Qe(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}ze.prototype.cancel=function(){if(this.i=Qe(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Xe=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Je(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Je?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,wt(e.i)),this.m=e.m):e&&(t=String(e).match(Xe))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=it(t[2]||""),this.g=it(t[3]||"",!0),et(this,t[4]),this.h=it(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=it(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Ye(e){return new Je(e)}function Ze(e,t,n){e.j=n?it(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=rt(t,ut)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function st(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function it(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function rt(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Je.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(rt(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(rt(t,at,!0),"@"),e.push(Se(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(rt(n,"/"==n.charAt(0)?lt:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",rt(n,ht)),e.join("")},Je.prototype.resolve=function(e){const t=Ye(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var s=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=s.charAt(0))if(this.g&&!this.h)s="/"+s;else{var i=t.h.lastIndexOf("/");-1!=i&&(s=t.h.slice(0,i+1)+s)}if(".."==(i=s)||"."==i)s="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){s=0==i.lastIndexOf("/",0),i=i.split("/");const e=[];for(let t=0;t<i.length;){const n=i[t++];"."==n?s&&t==i.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),s&&t==i.length&&e.push("")):(e.push(n),s=!0)}s=e.join("/")}else s=i}return n?t.h=s:n=""!==e.i.toString(),n?tt(t,wt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,lt=/[#\?]/g,ut=/[#\?@]/g,ht=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const s=e[n].indexOf("=");let i,r=null;s>=0?(i=e[n].substring(0,s),r=e[n].substring(s+1)):i=e[n],t(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=vt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=vt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(vt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(vt(e,t),d(n)),e.h+=n.length)}function wt(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function vt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function bt(e,t,n,s,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),s(n)}catch(r){}}function _t(){this.g=new re}function Tt(e){this.i=e.Sb||null,this.h=e.ab||!1}function It(e,t){Q.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function xt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Et(e){e.readyState=4,e.l=null,e.j=null,e.B=null,St(e)}function St(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function kt(e){let t="";return R(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Ct(e,t,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=kt(n),"string"==typeof e?null!=n&&Se(n):nt(e,t,n))}function Nt(e){Q.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=vt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,s){n.forEach(function(n){e.call(t,n,s,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=vt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let s=0;s<t.length;s++){var n=t[s];const i=Se(n);n=gt(this,n);for(let t=0;t<n.length;t++){let s=i;""!==n[t]&&(s+="="+Se(n[t])),e.push(s)}}return this.i=e.join("&")},u(Tt,oe),Tt.prototype.g=function(){return new It(this.i,this.h)},u(It,Q),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,St(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||r).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Et(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,St(this)),this.g&&(this.readyState=3,St(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;xt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Et(this):St(this),3==this.readyState&&xt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,Et(this))},e.Na=function(e){this.g&&(this.response=e,Et(this))},e.ga=function(){this.g&&Et(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),u(Nt,Q);var At=/^https?$/i,Dt=["POST","PUT"];function Rt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Pt(e),Lt(e)}function Pt(e){e.A||(e.A=!0,X(e,"complete"),X(e,"error"))}function Ot(e){if(e.h&&void 0!==i)if(e.v&&4==Mt(e))setTimeout(e.Ca.bind(e),0);else if(X(e,"readystatechange"),4==Mt(e)){e.h=!1;try{const i=e.ca();e:switch(i){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var s;if(s=0===i){let t=String(e.D).match(Xe)[1]||null;!t&&r.self&&r.self.location&&(t=r.self.location.protocol.slice(0,-1)),s=!At.test(t?t.toLowerCase():"")}n=s}if(n)X(e,"complete"),X(e,"success");else{e.o=6;try{var o=Mt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Pt(e)}}finally{Lt(e)}}}function Lt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const s=e.g;e.g=null,t||X(e,"ready");try{s.onreadystatechange=null}catch(n){}}}function Mt(e){return e.g?e.g.readyState:0}function jt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ut(e){this.za=0,this.i=[],this.j=new be,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Vt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Vt("baseRetryDelayMs",5e3,e),this.Za=Vt("retryDelaySeedMs",1e4,e),this.Ta=Vt("forwardChannelMaxRetries",2,e),this.va=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ze(e&&e.concurrentRequestLimit),this.Ba=new _t,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function Ft(e){if(Bt(e),3==e.I){var t=e.V++,n=Ye(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),Ht(e,n),(t=new Ce(e,e.j,t)).M=2,t.A=st(Ye(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(t.A.toString(),"")}catch(s){}!n&&r.Image&&((new Image).src=t.A,n=!0),n||(t.g=sn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Me(t)}tn(e)}function qt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function Bt(e){qt(e),e.v&&(r.clearTimeout(e.v),e.v=null),Jt(e),e.h.cancel(),e.m&&("number"==typeof e.m&&r.clearTimeout(e.m),e.m=null)}function zt(e){if(!$e(e.h)&&!e.m){e.m=!0;var t=e.Ea;w||_(),v||(w(),v=!0),b.add(t,e),e.D=0}}function $t(e,t){var n;n=t?t.l:e.V++;const s=Ye(e.J);nt(s,"SID",e.M),nt(s,"RID",n),nt(s,"AID",e.K),Ht(e,s),e.u&&e.o&&Ct(s,e.u,e.o),n=new Ce(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=Kt(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),Ge(e.h,n),Re(n,s,t)}function Ht(e,t){e.H&&R(e.H,function(e,n){nt(t,n,e)}),e.l&&R({},function(e,n){nt(t,n,e)})}function Kt(e,t,n){n=Math.min(e.i.length,n);const s=e.l?c(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let l=0;l<n;l++){var r=i[l].g;const n=i[l].map;if((r-=t)<0)t=Math.max(0,i[l].g-100),c=!1;else try{r="req"+r+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let s=n;o(n)&&(s=se(n)),e.push(r+t+"="+encodeURIComponent(s))}}catch(ui){throw e.push(r+"type="+encodeURIComponent("_badmap")),ui}}catch(ui){s&&s(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function Gt(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;w||_(),v||(w(),v=!0),b.add(t,e),e.A=0}}function Wt(e){return!(e.g||e.v||e.A>=3||(e.Y++,e.v=ve(c(e.Da,e),Zt(e,e.A)),e.A++,0))}function Qt(e){null!=e.B&&(r.clearTimeout(e.B),e.B=null)}function Xt(e){e.g=new Ce(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Ye(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),Ht(e,t),e.u&&e.o&&Ct(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=st(Ye(t)),n.u=null,n.R=!0,Pe(n,e)}function Jt(e){null!=e.C&&(r.clearTimeout(e.C),e.C=null)}function Yt(e,t){var n=null;if(e.g==t){Jt(e),Qt(e),e.g=null;var s=2}else{if(!Ke(e.h,t))return;n=t.G,We(e.h,t),s=1}if(0!=e.I)if(t.o)if(1==s){n=t.u?t.u.length:0,t=Date.now()-t.F;var i=e.D;X(s=fe(),new we(s,n)),zt(e)}else Gt(e);else if(3==(i=t.m)||0==i&&t.X>0||!(1==s&&function(e,t){return!(He(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=ve(c(e.Ea,e,t),Zt(e,e.D)),e.D++,0)))}(e,t)||2==s&&Wt(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),i){case 1:en(e,5);break;case 4:en(e,10);break;case 3:en(e,6);break;default:en(e,2)}}function Zt(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function en(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),s=e.Ua;const t=!s;s=new Je(s||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||Ze(s,"https"),st(s),t?function(e,t){const n=new be;if(r.Image){const s=new Image;s.onload=l(bt,n,"TestLoadImage: loaded",!0,t,s),s.onerror=l(bt,n,"TestLoadImage: error",!1,t,s),s.onabort=l(bt,n,"TestLoadImage: abort",!1,t,s),s.ontimeout=l(bt,n,"TestLoadImage: timeout",!1,t,s),r.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=e}else t(!1)}(s.toString(),n):function(e,t){new be;const n=new AbortController,s=setTimeout(()=>{n.abort(),bt(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(s),e.ok?bt(0,0,!0,t):bt(0,0,!1,t)}).catch(()=>{clearTimeout(s),bt(0,0,!1,t)})}(s.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),tn(e),Bt(e)}function tn(e){if(e.I=0,e.ja=[],e.l){const t=Qe(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function nn(e,t,n){var s=n instanceof Je?Ye(n):new Je(n);if(""!=s.g)t&&(s.g=t+"."+s.g),et(s,s.u);else{var i=r.location;s=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;const e=new Je(null);s&&Ze(e,s),t&&(e.g=t),i&&et(e,i),n&&(e.h=n),s=e}return n=e.G,t=e.wa,n&&t&&nt(s,n,t),nt(s,"VER",e.ka),Ht(e,s),s}function sn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new Tt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function rn(){}function on(){}function an(e,t){Q.call(this),this.g=new Ut(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!S(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!S(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new un(this)}function cn(e){le.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function ln(){ue.call(this),this.status=1}function un(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=h(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Rt(this,o)}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const e of s.keys())n.set(e,s.get(e))}s=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=r.FormData&&e instanceof r.FormData,!(Array.prototype.indexOf.call(Dt,t,void 0)>=0)||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,a]of n)this.g.setRequestHeader(r,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Rt(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,X(this,"complete"),X(this,"abort"),Lt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Lt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?Ot(this):this.Xa())},e.Xa=function(){Ot(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Mt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ie(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ut.prototype).ka=8,e.I=1,e.connect=function(e,t,n,s){ye(0),this.W=e,this.H=t||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.J=nn(this,null,this.W),zt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new Ce(this,this.j,e);let r=this.o;if(this.U&&(r?(r=P(r),L(r,this.U)):r=this.U),null!==this.u||this.R||(i.J=r,r=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if((t+=s)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Kt(this,i,t),nt(n=Ye(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),Ht(this,n),r&&(this.R?t="headers="+Se(kt(r))+"&"+t:this.u&&Ct(n,this.u,r)),Ge(this.h,i),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),i.U=!0,Re(i,n,null)):Re(i,n,t),this.I=2}}else 3==this.I&&(e?$t(this,e):0==this.i.length||$e(this.h)||$t(this))},e.Da=function(){if(this.v=null,Xt(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=ve(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),qt(this),Xt(this))},e.Va=function(){null!=this.C&&(this.C=null,qt(this),Wt(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=rn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},on.prototype.g=function(e,t){return new an(e,t)},u(an,Q),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){Ft(this.g)},an.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=se(e),e=n);t.i.push(new Be(t.Ya++,e)),3==t.I&&zt(t)},an.prototype.N=function(){this.g.l=null,delete this.j,Ft(this.g),delete this.g,an.Z.N.call(this)},u(cn,le),u(ln,ue),u(un,rn),un.prototype.ra=function(){X(this.g,"a")},un.prototype.qa=function(e){X(this.g,new cn(e))},un.prototype.pa=function(e){X(this.g,new ln)},un.prototype.oa=function(){X(this.g,"b")},on.prototype.createWebChannel=on.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,ai=function(){return new on},oi=function(){return fe()},ri=he,ii={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,si=Ie,xe.COMPLETE="complete",ni=xe,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Q.prototype.listen=Q.prototype.J,ti=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,ei=Nt}).apply(void 0!==ci?ci:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const li="@firebase/firestore",ui="4.9.3";
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
             */class hi{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}hi.UNAUTHENTICATED=new hi(null),hi.GOOGLE_CREDENTIALS=new hi("google-credentials-uid"),hi.FIRST_PARTY=new hi("first-party-uid"),hi.MOCK_USER=new hi("mock-user");
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
let di="12.7.0";
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
             */const fi=new z("@firebase/firestore");function pi(){return fi.logLevel}function mi(e,...t){if(fi.logLevel<=V.DEBUG){const n=t.map(wi);fi.debug(`Firestore (${di}): ${e}`,...n)}}function gi(e,...t){if(fi.logLevel<=V.ERROR){const n=t.map(wi);fi.error(`Firestore (${di}): ${e}`,...n)}}function yi(e,...t){if(fi.logLevel<=V.WARN){const n=t.map(wi);fi.warn(`Firestore (${di}): ${e}`,...n)}}function wi(e){if("string"==typeof e)return e;try{
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
             */return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
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
             */function vi(e,t,n){let s="Unexpected state";"string"==typeof t?s=t:n=t,bi(e,s,n)}function bi(e,t,n){let s=`FIRESTORE (${di}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{s+=" CONTEXT: "+JSON.stringify(n)}catch(e){s+=" CONTEXT: "+n}throw gi(s),new Error(s)}function _i(e,t,n,s){let i="Unexpected state";"string"==typeof n?i=n:s=n,e||bi(t,i,s)}function Ti(e,t){return e}
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
             */const Ii={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class xi extends E{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
             */class Ei{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
             */class Si{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ki{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(hi.UNAUTHENTICATED))}shutdown(){}}class Ci{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ni{constructor(e){this.t=e,this.currentUser=hi.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){_i(void 0===this.o,42304);let n=this.i;const s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new Ei;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ei,e.enqueueRetryable(()=>s(this.currentUser))};const r=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await s(this.currentUser)})},o=e=>{mi("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(mi("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ei)}},0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(mi("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(_i("string"==typeof t.accessToken,31837,{l:t}),new Si(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return _i(null===e||"string"==typeof e,2055,{h:e}),new hi(e)}}class Ai{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=hi.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Di{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Ai(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(hi.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ri{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Pi{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ge(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){_i(void 0===this.o,3512);const n=e=>{null!=e.error&&mi("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,mi("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const s=e=>{mi("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>s(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?s(e):mi("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ri(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(_i("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new Ri(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
             */function Oi(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let s=0;s<e;s++)n[s]=Math.floor(256*Math.random());return n}
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
             */class Li{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Oi(40);for(let s=0;s<n.length;++s)t.length<20&&n[s]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[s]%62))}return t}}function Mi(e,t){return e<t?-1:e>t?1:0}function ji(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=e.charAt(s),i=t.charAt(s);if(n!==i)return Fi(n)===Fi(i)?Mi(n,i):Fi(n)?1:-1}return Mi(e.length,t.length)}const Vi=55296,Ui=57343;function Fi(e){const t=e.charCodeAt(0);return t>=Vi&&t<=Ui}function qi(e,t,n){return e.length===t.length&&e.every((e,s)=>n(e,t[s]))}
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
             */const Bi="__name__";class zi{constructor(e,t,n){void 0===t?t=0:t>e.length&&vi(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&vi(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===zi.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof zi?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=zi.compareSegments(e.get(s),t.get(s));if(0!==n)return n}return Mi(e.length,t.length)}static compareSegments(e,t){const n=zi.isNumericId(e),s=zi.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?zi.extractNumericId(e).compare(zi.extractNumericId(t)):ji(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Js.fromString(e.substring(4,e.length-2))}}class $i extends zi{construct(e,t,n){return new $i(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new xi(Ii.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new $i(t)}static emptyPath(){return new $i([])}}const Hi=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ki extends zi{construct(e,t,n){return new Ki(e,t,n)}static isValidIdentifier(e){return Hi.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ki.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Bi}static keyField(){return new Ki([Bi])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(0===n.length)throw new xi(Ii.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let r=!1;for(;s<e.length;){const t=e[s];if("\\"===t){if(s+1===e.length)throw new xi(Ii.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new xi(Ii.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(r=!r,s++):"."!==t||r?(n+=t,s++):(i(),s++)}if(i(),r)throw new xi(Ii.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ki(t)}static emptyPath(){return new Ki([])}}
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
             */class Gi{constructor(e){this.path=e}static fromPath(e){return new Gi($i.fromString(e))}static fromName(e){return new Gi($i.fromString(e).popFirst(5))}static empty(){return new Gi($i.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===$i.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return $i.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Gi(new $i(e.slice()))}}
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
             */function Wi(e,t,n){if(!n)throw new xi(Ii.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Qi(e){if(!Gi.isDocumentKey(e))throw new xi(Ii.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Xi(e){if(Gi.isDocumentKey(e))throw new xi(Ii.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Ji(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function Yi(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":vi(12329,{type:typeof e})}function Zi(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new xi(Ii.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Yi(e);throw new xi(Ii.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
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
function er(e,t){const n={typeString:e};return t&&(n.value=t),n}function tr(e,t){if(!Ji(e))throw new xi(Ii.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in t)if(t[s]){const i=t[s].typeString,r="value"in t[s]?{value:t[s].value}:void 0;if(!(s in e)){n=`JSON missing required field: '${s}'`;break}const o=e[s];if(i&&typeof o!==i){n=`JSON field '${s}' must be a ${i}.`;break}if(void 0!==r&&o!==r.value){n=`Expected '${s}' field to equal '${r.value}'`;break}}if(n)throw new xi(Ii.INVALID_ARGUMENT,n);return!0}
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
             */const nr=-62135596800,sr=1e6;class ir{static now(){return ir.fromMillis(Date.now())}static fromDate(e){return ir.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*sr);return new ir(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new xi(Ii.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new xi(Ii.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<nr)throw new xi(Ii.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new xi(Ii.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sr}_compareTo(e){return this.seconds===e.seconds?Mi(this.nanoseconds,e.nanoseconds):Mi(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ir._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(tr(e,ir._jsonSchema))return new ir(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-nr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ir._jsonSchemaVersion="firestore/timestamp/1.0",ir._jsonSchema={type:er("string",ir._jsonSchemaVersion),seconds:er("number"),nanoseconds:er("number")};
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
class rr{static fromTimestamp(e){return new rr(e)}static min(){return new rr(new ir(0,0))}static max(){return new rr(new ir(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
             */function or(e){return new ar(e.readTime,e.key,-1)}class ar{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new ar(rr.min(),Gi.empty(),-1)}static max(){return new ar(rr.max(),Gi.empty(),-1)}}function cr(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=Gi.comparator(e.documentKey,t.documentKey),0!==n?n:Mi(e.largestBatchId,t.largestBatchId)
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
             */)}class lr{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
             */async function ur(e){if(e.code!==Ii.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;mi("LocalStore","Unexpectedly lost primary lease")}
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
             */class hr{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&vi(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new hr((n,s)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,s)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof hr?t:hr.resolve(t)}catch(e){return hr.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):hr.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):hr.reject(t)}static resolve(e){return new hr((t,n)=>{t(e)})}static reject(e){return new hr((t,n)=>{n(e)})}static waitFor(e){return new hr((t,n)=>{let s=0,i=0,r=!1;e.forEach(e=>{++s,e.next(()=>{++i,r&&i===s&&t()},e=>n(e))}),r=!0,i===s&&t()})}static or(e){let t=hr.resolve(!1);for(const n of e)t=t.next(e=>e?hr.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,s)=>{n.push(t.call(this,e,s))}),this.waitFor(n)}static mapArray(e,t){return new hr((n,s)=>{const i=e.length,r=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{r[c]=e,++o,o===i&&n(r)},e=>s(e))}})}static doWhile(e,t){return new hr((n,s)=>{const i=()=>{!0===e()?t().next(()=>{i()},s):n()};i()})}}function dr(e){return"IndexedDbTransactionError"===e.name}
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
             */class fr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}function pr(e){return null==e}function mr(e){return 0===e&&1/e==-1/0}function gr(e,t){let n=t;const s=e.length;for(let i=0;i<s;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function yr(e){return e+""}
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
             */function wr(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function vr(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function br(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
             */fr.ce=-1;class _r{constructor(e,t){this.comparator=e,this.root=t||Ir.EMPTY}insert(e,t){return new _r(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ir.BLACK,null,null))}remove(e){return new _r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ir.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(0===s)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Tr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Tr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Tr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Tr(this.root,e,this.comparator,!0)}}class Tr{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ir{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=null!=n?n:Ir.RED,this.left=null!=s?s:Ir.EMPTY,this.right=null!=i?i:Ir.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Ir(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):0===i?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ir.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===t(e,s.key)){if(s.right.isEmpty())return Ir.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ir.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ir.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw vi(43730,{key:this.key,value:this.value});if(this.right.isRed())throw vi(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw vi(27949);return e+(this.isRed()?0:1)}}Ir.EMPTY=null,Ir.RED=!0,Ir.BLACK=!1,Ir.EMPTY=new class{constructor(){this.size=0}get key(){throw vi(57766)}get value(){throw vi(16141)}get color(){throw vi(16727)}get left(){throw vi(29726)}get right(){throw vi(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Ir(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class xr{constructor(e){this.comparator=e,this.data=new _r(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Er(this.data.getIterator())}getIteratorFrom(e){return new Er(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof xr))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(0!==this.comparator(e,s))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new xr(this.comparator);return t.data=e,t}}class Er{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
             */class Sr{constructor(e){this.fields=e,e.sort(Ki.comparator)}static empty(){return new Sr([])}unionWith(e){let t=new xr(Ki.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Sr(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return qi(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
             */class kr extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
             */class Cr{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new kr("Invalid base64 string: "+e):e}}(e);return new Cr(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Cr(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
             */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Mi(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Cr.EMPTY_BYTE_STRING=new Cr("");const Nr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ar(e){if(_i(!!e,39018),"string"==typeof e){let t=0;const n=Nr.exec(e);if(_i(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:Dr(e.seconds),nanos:Dr(e.nanos)}}function Dr(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Rr(e){return"string"==typeof e?Cr.fromBase64String(e):Cr.fromUint8Array(e)}
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
             */const Pr="server_timestamp",Or="__type__",Lr="__previous_value__",Mr="__local_write_time__";function jr(e){const t=(e?.mapValue?.fields||{})[Or]?.stringValue;return t===Pr}function Vr(e){const t=e.mapValue.fields[Lr];return jr(t)?Vr(t):t}function Ur(e){const t=Ar(e.mapValue.fields[Mr].timestampValue);return new ir(t.seconds,t.nanos)}
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
             */class Fr{constructor(e,t,n,s,i,r,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=l}}const qr="(default)";class Br{constructor(e,t){this.projectId=e,this.database=t||qr}static empty(){return new Br("","")}get isDefaultDatabase(){return this.database===qr}isEqual(e){return e instanceof Br&&e.projectId===this.projectId&&e.database===this.database}}
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
             */const zr="__type__",$r="__max__",Hr={},Kr="__vector__",Gr="value";function Wr(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?jr(e)?4:function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===$r}
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
             */(e)?9007199254740991:function(e){const t=(e?.mapValue?.fields||{})[zr]?.stringValue;return t===Kr}(e)?10:11:vi(28295,{value:e})}function Qr(e,t){if(e===t)return!0;const n=Wr(e);if(n!==Wr(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ur(e).isEqual(Ur(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Ar(e.timestampValue),s=Ar(t.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Rr(e.bytesValue).isEqual(Rr(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Dr(e.geoPointValue.latitude)===Dr(t.geoPointValue.latitude)&&Dr(e.geoPointValue.longitude)===Dr(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Dr(e.integerValue)===Dr(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Dr(e.doubleValue),s=Dr(t.doubleValue);return n===s?mr(n)===mr(s):isNaN(n)&&isNaN(s)}return!1}(e,t);case 9:return qi(e.arrayValue.values||[],t.arrayValue.values||[],Qr);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(wr(n)!==wr(s))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===s[i]||!Qr(n[i],s[i])))return!1;return!0}(e,t);default:return vi(52216,{left:e})}}function Xr(e,t){return void 0!==(e.values||[]).find(e=>Qr(e,t))}function Jr(e,t){if(e===t)return 0;const n=Wr(e),s=Wr(t);if(n!==s)return Mi(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Mi(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Dr(e.integerValue||e.doubleValue),s=Dr(t.integerValue||t.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(e,t);case 3:return Yr(e.timestampValue,t.timestampValue);case 4:return Yr(Ur(e),Ur(t));case 5:return ji(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Rr(e),s=Rr(t);return n.compareTo(s)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),s=t.split("/");for(let i=0;i<n.length&&i<s.length;i++){const e=Mi(n[i],s[i]);if(0!==e)return e}return Mi(n.length,s.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Mi(Dr(e.latitude),Dr(t.latitude));return 0!==n?n:Mi(Dr(e.longitude),Dr(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Zr(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},s=t.fields||{},i=n[Gr]?.arrayValue,r=s[Gr]?.arrayValue,o=Mi(i?.values?.length||0,r?.values?.length||0);return 0!==o?o:Zr(i,r)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Hr&&t===Hr)return 0;if(e===Hr)return 1;if(t===Hr)return-1;const n=e.fields||{},s=Object.keys(n),i=t.fields||{},r=Object.keys(i);s.sort(),r.sort();for(let o=0;o<s.length&&o<r.length;++o){const e=ji(s[o],r[o]);if(0!==e)return e;const t=Jr(n[s[o]],i[r[o]]);if(0!==t)return t}return Mi(s.length,r.length)}(e.mapValue,t.mapValue);default:throw vi(23264,{he:n})}}function Yr(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Mi(e,t);const n=Ar(e),s=Ar(t),i=Mi(n.seconds,s.seconds);return 0!==i?i:Mi(n.nanos,s.nanos)}function Zr(e,t){const n=e.values||[],s=t.values||[];for(let i=0;i<n.length&&i<s.length;++i){const e=Jr(n[i],s[i]);if(e)return e}return Mi(n.length,s.length)}function eo(e){return to(e)}function to(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Ar(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return Rr(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return Gi.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const s of e.values||[])n?n=!1:t+=",",t+=to(s);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",s=!0;for(const i of t)s?s=!1:n+=",",n+=`${i}:${to(e.fields[i])}`;return n+"}"}(e.mapValue):vi(61005,{value:e})}function no(e){switch(Wr(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Vr(e);return t?16+no(t):16;case 5:return 2*e.stringValue.length;case 6:return Rr(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+no(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return vr(e.fields,(e,n)=>{t+=e.length+no(n)}),t}(e.mapValue);default:throw vi(13486,{value:e})}}function so(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function io(e){return!!e&&"integerValue"in e}function ro(e){return!!e&&"arrayValue"in e}function oo(e){return!!e&&"nullValue"in e}function ao(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function co(e){return!!e&&"mapValue"in e}function lo(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return vr(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=lo(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=lo(e.arrayValue.values[n]);return t}return{...e}}class uo{constructor(e){this.value=e}static empty(){return new uo({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!co(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=lo(t)}setAll(e){let t=Ki.emptyPath(),n={},s=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,s),n={},s=[],t=i.popLast()}e?n[i.lastSegment()]=lo(e):s.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());co(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];co(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){vr(t,(t,n)=>e[t]=n);for(const s of n)delete e[s]}clone(){return new uo(lo(this.value))}}function ho(e){const t=[];return vr(e.fields,(e,n)=>{const s=new Ki([e]);if(co(n)){const e=ho(n.mapValue).fields;if(0===e.length)t.push(s);else for(const n of e)t.push(s.child(n))}else t.push(s)}),new Sr(t)
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
             */}class fo{constructor(e,t,n,s,i,r,o){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=r,this.documentState=o}static newInvalidDocument(e){return new fo(e,0,rr.min(),rr.min(),rr.min(),uo.empty(),0)}static newFoundDocument(e,t,n,s){return new fo(e,1,t,rr.min(),n,s,0)}static newNoDocument(e,t){return new fo(e,2,t,rr.min(),rr.min(),uo.empty(),0)}static newUnknownDocument(e,t){return new fo(e,3,t,rr.min(),rr.min(),uo.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(rr.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=uo.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=uo.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=rr.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof fo&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fo(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
             */class po{constructor(e,t){this.position=e,this.inclusive=t}}function mo(e,t,n){let s=0;for(let i=0;i<e.position.length;i++){const r=t[i],o=e.position[i];if(s=r.field.isKeyField()?Gi.comparator(Gi.fromName(o.referenceValue),n.key):Jr(o,n.data.field(r.field)),"desc"===r.dir&&(s*=-1),0!==s)break}return s}function go(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Qr(e.position[n],t.position[n]))return!1;return!0}
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
             */class yo{constructor(e,t="asc"){this.field=e,this.dir=t}}function wo(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
             */class vo{}class bo extends vo{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new ko(e,t,n):"array-contains"===t?new Do(e,n):"in"===t?new Ro(e,n):"not-in"===t?new Po(e,n):"array-contains-any"===t?new Oo(e,n):new bo(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Co(e,n):new No(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Jr(t,this.value)):null!==t&&Wr(this.value)===Wr(t)&&this.matchesComparison(Jr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return vi(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class _o extends vo{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new _o(e,t)}matches(e){return To(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function To(e){return"and"===e.op}function Io(e){return function(e){for(const t of e.filters)if(t instanceof _o)return!1;return!0}(e)&&To(e)}function xo(e){if(e instanceof bo)return e.field.canonicalString()+e.op.toString()+eo(e.value);if(Io(e))return e.filters.map(e=>xo(e)).join(",");{const t=e.filters.map(e=>xo(e)).join(",");return`${e.op}(${t})`}}function Eo(e,t){return e instanceof bo?function(e,t){return t instanceof bo&&e.op===t.op&&e.field.isEqual(t.field)&&Qr(e.value,t.value)}(e,t):e instanceof _o?function(e,t){return t instanceof _o&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,s)=>e&&Eo(n,t.filters[s]),!0)}(e,t):void vi(19439)}function So(e){return e instanceof bo?function(e){return`${e.field.canonicalString()} ${e.op} ${eo(e.value)}`}(e):e instanceof _o?function(e){return e.op.toString()+" {"+e.getFilters().map(So).join(" ,")+"}"}(e):"Filter"}class ko extends bo{constructor(e,t,n){super(e,t,n),this.key=Gi.fromName(n.referenceValue)}matches(e){const t=Gi.comparator(e.key,this.key);return this.matchesComparison(t)}}class Co extends bo{constructor(e,t){super(e,"in",t),this.keys=Ao(0,t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class No extends bo{constructor(e,t){super(e,"not-in",t),this.keys=Ao(0,t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ao(e,t){return(t.arrayValue?.values||[]).map(e=>Gi.fromName(e.referenceValue))}class Do extends bo{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ro(t)&&Xr(t.arrayValue,this.value)}}class Ro extends bo{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Xr(this.value.arrayValue,t)}}class Po extends bo{constructor(e,t){super(e,"not-in",t)}matches(e){if(Xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Xr(this.value.arrayValue,t)}}class Oo extends bo{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ro(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Xr(this.value.arrayValue,e))}}
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
             */class Lo{constructor(e,t=null,n=[],s=[],i=null,r=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=r,this.endAt=o,this.Te=null}}function Mo(e,t=null,n=[],s=[],i=null,r=null,o=null){return new Lo(e,t,n,s,i,r,o)}function jo(e){const t=Ti(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>xo(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),pr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>eo(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>eo(e)).join(",")),t.Te=e}return t.Te}function Vo(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!wo(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Eo(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!go(e.startAt,t.startAt)&&go(e.endAt,t.endAt)}function Uo(e){return Gi.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
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
             */class Fo{constructor(e,t=null,n=[],s=[],i=null,r="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function qo(e){return new Fo(e)}function Bo(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function zo(e){return null!==e.collectionGroup}function $o(e){const t=Ti(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",s=function(e){let t=new xr(Ki.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);s.forEach(s=>{e.has(s.canonicalString())||s.isKeyField()||t.Ie.push(new yo(s,n))}),e.has(Ki.keyField().canonicalString())||t.Ie.push(new yo(Ki.keyField(),n))}return t.Ie}function Ho(e){const t=Ti(e);return t.Ee||(t.Ee=function(e,t){if("F"===e.limitType)return Mo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new yo(e.field,t)});const n=e.endAt?new po(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new po(e.startAt.position,e.startAt.inclusive):null;return Mo(e.path,e.collectionGroup,t,e.filters,e.limit,n,s)}}(t,$o(e))),t.Ee}function Ko(e,t){const n=e.filters.concat([t]);return new Fo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Go(e,t,n){return new Fo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Wo(e,t){return Vo(Ho(e),Ho(t))&&e.limitType===t.limitType}function Qo(e){return`${jo(Ho(e))}|lt:${e.limitType}`}function Xo(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>So(e)).join(", ")}]`),pr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>eo(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>eo(e)).join(",")),`Target(${t})`}(Ho(e))}; limitType=${e.limitType})`}function Jo(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Gi.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of $o(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const s=mo(e,t,n);return e.inclusive?s<=0:s<0}(e.startAt,$o(e),t)||e.endAt&&!function(e,t,n){const s=mo(e,t,n);return e.inclusive?s>=0:s>0}(e.endAt,$o(e),t))}(e,t)}function Yo(e){return(t,n)=>{let s=!1;for(const i of $o(e)){const e=Zo(i,t,n);if(0!==e)return e;s=s||i.field.isKeyField()}return 0}}function Zo(e,t,n){const s=e.field.isKeyField()?Gi.comparator(t.key,n.key):function(e,t,n){const s=t.data.field(e),i=n.data.field(e);return null!==s&&null!==i?Jr(s,i):vi(42886)}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return vi(19790,{direction:e.dir})}}
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
             */class ea{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[s,i]of n)if(this.equalsFn(s,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(void 0===s)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return 1===n.length?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){vr(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return br(this.inner)}size(){return this.innerSize}}
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
             */const ta=new _r(Gi.comparator);function na(){return ta}const sa=new _r(Gi.comparator);function ia(...e){let t=sa;for(const n of e)t=t.insert(n.key,n);return t}function ra(e){let t=sa;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function oa(){return ca()}function aa(){return ca()}function ca(){return new ea(e=>e.toString(),(e,t)=>e.isEqual(t))}const la=new _r(Gi.comparator),ua=new xr(Gi.comparator);function ha(...e){let t=ua;for(const n of e)t=t.add(n);return t}const da=new xr(Mi);
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
function fa(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:mr(t)?"-0":t}}function pa(e){return{integerValue:""+e}}function ma(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!mr(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
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
             */(t)?pa(t):fa(e,t)}
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
             */class ga{constructor(){this._=void 0}}function ya(e,t,n){return e instanceof ba?function(e,t){const n={fields:{[Or]:{stringValue:Pr},[Mr]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&jr(t)&&(t=Vr(t)),t&&(n.fields[Lr]=t),{mapValue:n}}(n,t):e instanceof _a?Ta(e,t):e instanceof Ia?xa(e,t):function(e,t){const n=va(e,t),s=Sa(n)+Sa(e.Ae);return io(n)&&io(e.Ae)?pa(s):fa(e.serializer,s)}(e,t)}function wa(e,t,n){return e instanceof _a?Ta(e,t):e instanceof Ia?xa(e,t):n}function va(e,t){return e instanceof Ea?function(e){return io(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class ba extends ga{}class _a extends ga{constructor(e){super(),this.elements=e}}function Ta(e,t){const n=ka(t);for(const s of e.elements)n.some(e=>Qr(e,s))||n.push(s);return{arrayValue:{values:n}}}class Ia extends ga{constructor(e){super(),this.elements=e}}function xa(e,t){let n=ka(t);for(const s of e.elements)n=n.filter(e=>!Qr(e,s));return{arrayValue:{values:n}}}class Ea extends ga{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Sa(e){return Dr(e.integerValue||e.doubleValue)}function ka(e){return ro(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
             */class Ca{constructor(e,t){this.field=e,this.transform=t}}class Na{constructor(e,t){this.version=e,this.transformResults=t}}class Aa{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Aa}static exists(e){return new Aa(void 0,e)}static updateTime(e){return new Aa(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Da(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Ra{}function Pa(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new za(e.key,Aa.none()):new Va(e.key,e.data,Aa.none());{const n=e.data,s=uo.empty();let i=new xr(Ki.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?s.delete(e):s.set(e,t),i=i.add(e)}return new Ua(e.key,s,new Sr(i.toArray()),Aa.none())}}function Oa(e,t,n){e instanceof Va?function(e,t,n){const s=e.value.clone(),i=qa(e.fieldTransforms,t,n.transformResults);s.setAll(i),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):e instanceof Ua?function(e,t,n){if(!Da(e.precondition,t))return void t.convertToUnknownDocument(n.version);const s=qa(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Fa(e)),i.setAll(s),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function La(e,t,n,s){return e instanceof Va?function(e,t,n,s){if(!Da(e.precondition,t))return n;const i=e.value.clone(),r=Ba(e.fieldTransforms,s,t);return i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,s):e instanceof Ua?function(e,t,n,s){if(!Da(e.precondition,t))return n;const i=Ba(e.fieldTransforms,s,t),r=t.data;return r.setAll(Fa(e)),r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,s):function(e,t,n){return Da(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Ma(e,t){let n=null;for(const s of e.fieldTransforms){const e=t.data.field(s.field),i=va(s.transform,e||null);null!=i&&(null===n&&(n=uo.empty()),n.set(s.field,i))}return n||null}function ja(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&qi(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof _a&&t instanceof _a||e instanceof Ia&&t instanceof Ia?qi(e.elements,t.elements,Qr):e instanceof Ea&&t instanceof Ea?Qr(e.Ae,t.Ae):e instanceof ba&&t instanceof ba}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Va extends Ra{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ua extends Ra{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fa(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}}),t}function qa(e,t,n){const s=new Map;_i(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let i=0;i<n.length;i++){const r=e[i],o=r.transform,a=t.data.field(r.field);s.set(r.field,wa(o,a,n[i]))}return s}function Ba(e,t,n){const s=new Map;for(const i of e){const e=i.transform,r=n.data.field(i.field);s.set(i.field,ya(e,r,t))}return s}class za extends Ra{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class $a extends Ra{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
             */class Ha{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const t=this.mutations[s];t.key.isEqual(e.key)&&Oa(t,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=La(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=La(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=aa();return this.mutations.forEach(s=>{const i=e.get(s.key),r=i.overlayedDocument;let o=this.applyToLocalView(r,i.mutatedFields);o=t.has(s.key)?null:o;const a=Pa(r,o);null!==a&&n.set(s.key,a),r.isValidDocument()||r.convertToNoDocument(rr.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ha())}isEqual(e){return this.batchId===e.batchId&&qi(this.mutations,e.mutations,(e,t)=>ja(e,t))&&qi(this.baseMutations,e.baseMutations,(e,t)=>ja(e,t))}}class Ka{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){_i(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=la;const i=e.mutations;for(let r=0;r<i.length;r++)s=s.insert(i[r].key,n[r].version);return new Ka(e,t,n,s)}}
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
             */class Ga{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
             */var Qa,Xa;function Ja(e){if(void 0===e)return gi("GRPC error has no .code"),Ii.UNKNOWN;switch(e){case Qa.OK:return Ii.OK;case Qa.CANCELLED:return Ii.CANCELLED;case Qa.UNKNOWN:return Ii.UNKNOWN;case Qa.DEADLINE_EXCEEDED:return Ii.DEADLINE_EXCEEDED;case Qa.RESOURCE_EXHAUSTED:return Ii.RESOURCE_EXHAUSTED;case Qa.INTERNAL:return Ii.INTERNAL;case Qa.UNAVAILABLE:return Ii.UNAVAILABLE;case Qa.UNAUTHENTICATED:return Ii.UNAUTHENTICATED;case Qa.INVALID_ARGUMENT:return Ii.INVALID_ARGUMENT;case Qa.NOT_FOUND:return Ii.NOT_FOUND;case Qa.ALREADY_EXISTS:return Ii.ALREADY_EXISTS;case Qa.PERMISSION_DENIED:return Ii.PERMISSION_DENIED;case Qa.FAILED_PRECONDITION:return Ii.FAILED_PRECONDITION;case Qa.ABORTED:return Ii.ABORTED;case Qa.OUT_OF_RANGE:return Ii.OUT_OF_RANGE;case Qa.UNIMPLEMENTED:return Ii.UNIMPLEMENTED;case Qa.DATA_LOSS:return Ii.DATA_LOSS;default:return vi(39323,{code:e})}}(Xa=Qa||(Qa={}))[Xa.OK=0]="OK",Xa[Xa.CANCELLED=1]="CANCELLED",Xa[Xa.UNKNOWN=2]="UNKNOWN",Xa[Xa.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Xa[Xa.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Xa[Xa.NOT_FOUND=5]="NOT_FOUND",Xa[Xa.ALREADY_EXISTS=6]="ALREADY_EXISTS",Xa[Xa.PERMISSION_DENIED=7]="PERMISSION_DENIED",Xa[Xa.UNAUTHENTICATED=16]="UNAUTHENTICATED",Xa[Xa.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Xa[Xa.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Xa[Xa.ABORTED=10]="ABORTED",Xa[Xa.OUT_OF_RANGE=11]="OUT_OF_RANGE",Xa[Xa.UNIMPLEMENTED=12]="UNIMPLEMENTED",Xa[Xa.INTERNAL=13]="INTERNAL",Xa[Xa.UNAVAILABLE=14]="UNAVAILABLE",Xa[Xa.DATA_LOSS=15]="DATA_LOSS";
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
const Ya=new Js([4294967295,4294967295],0);function Za(e){const t=(new TextEncoder).encode(e),n=new Ys;return n.update(t),new Uint8Array(n.digest())}function ec(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),s=t.getUint32(4,!0),i=t.getUint32(8,!0),r=t.getUint32(12,!0);return[new Js([n,s],0),new Js([i,r],0)]}class tc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new nc(`Invalid padding: ${t}`);if(n<0)throw new nc(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new nc(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new nc(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Js.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Js.fromNumber(n)));return 1===s.compare(Ya)&&(s=new Js([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Za(e),[n,s]=ec(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,s,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),r=new tc(i,s,t);return n.forEach(e=>r.insert(e)),r}insert(e){if(0===this.ge)return;const t=Za(e),[n,s]=ec(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,s,i);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class nc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
             */class sc{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,ic.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new sc(rr.min(),s,new _r(Mi),na(),ha())}}class ic{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ic(n,t,ha(),ha(),ha())}}
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
             */class rc{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class oc{constructor(e,t){this.targetId=e,this.Ce=t}}class ac{constructor(e,t,n=Cr.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class cc{constructor(){this.ve=0,this.Fe=hc(),this.Me=Cr.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ha(),t=ha(),n=ha();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:vi(38017,{changeType:i})}}),new ic(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=hc()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,_i(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class lc{constructor(e){this.Ge=e,this.ze=new Map,this.je=na(),this.Je=uc(),this.He=uc(),this.Ye=new _r(Mi)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:vi(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Uo(i))if(0===n){const e=new Gi(i.path);this.et(t,e,fo.newNoDocument(e,rr.min()))}else _i(1===n,20013,{expectedCount:n});else{const s=this._t(t);if(s!==n){const n=this.ut(e),i=n?this.ct(n,e,s):1;if(0!==i){this.it(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let r,o;try{r=Rr(n).toUint8Array()}catch(e){if(e instanceof kr)return yi("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new tc(r,s,i)}catch(e){return yi(e instanceof nc?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach(n=>{const i=this.Ge.ht(),r=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(r)||(this.et(t,n,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((n,s)=>{const i=this.ot(s);if(i){if(n.current&&Uo(i.target)){const t=new Gi(i.target.path);this.It(t).has(s)||this.Et(s,t)||this.et(s,t,fo.newNoDocument(t,e))}n.Be&&(t.set(s,n.ke()),n.qe())}});let n=ha();this.He.forEach((e,t)=>{let s=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(s=!1,!1)}),s&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const s=new sc(e,t,this.Ye,this.je,n);return this.je=na(),this.Je=uc(),this.He=uc(),this.Ye=new _r(Mi),s}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new cc,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new xr(Mi),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new xr(Mi),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||mi("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new cc),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function uc(){return new _r(Gi.comparator)}function hc(){return new _r(Gi.comparator)}const dc={asc:"ASCENDING",desc:"DESCENDING"},fc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},pc={and:"AND",or:"OR"};class mc{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gc(e,t){return e.useProto3Json||pr(t)?t:{value:t}}function yc(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function wc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function vc(e,t){return yc(e,t.toTimestamp())}function bc(e){return _i(!!e,49232),rr.fromTimestamp(function(e){const t=Ar(e);return new ir(t.seconds,t.nanos)}(e))}function _c(e,t){return Tc(e,t).canonicalString()}function Tc(e,t){const n=function(e){return new $i(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Ic(e){const t=$i.fromString(e);return _i(qc(t),10190,{key:t.toString()}),t}function xc(e,t){return _c(e.databaseId,t.path)}function Ec(e,t){const n=Ic(t);if(n.get(1)!==e.databaseId.projectId)throw new xi(Ii.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new xi(Ii.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Gi(Cc(n))}function Sc(e,t){return _c(e.databaseId,t)}function kc(e){return new $i(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Cc(e){return _i(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Nc(e,t,n){return{name:xc(e,t),fields:n.value.mapValue.fields}}function Ac(e,t){return{documents:[Sc(e,t.path)]}}function Dc(e,t){const n={structuredQuery:{}},s=t.path;let i;null!==t.collectionGroup?(i=s,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=Sc(e,i);const r=function(e){if(0!==e.length)return Uc(_o.create(e,"and"))}(t.filters);r&&(n.structuredQuery.where=r);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:jc(e.field),direction:Oc(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=gc(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i}}function Rc(e){let t=function(e){const t=Ic(e);return 4===t.length?$i.emptyPath():Cc(t)}(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let i=null;if(s>0){_i(1===s,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let r=[];n.where&&(r=function(e){const t=Pc(e);return t instanceof _o&&Io(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new yo(Vc(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,pr(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new po(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){const t=!e.before,n=e.values||[];return new po(n,t)}(n.endAt)),function(e,t,n,s,i,r,o,a){return new Fo(e,t,n,s,i,r,o,a)}(t,i,o,r,a,"F",c,l)}function Pc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Vc(e.unaryFilter.field);return bo.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Vc(e.unaryFilter.field);return bo.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Vc(e.unaryFilter.field);return bo.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Vc(e.unaryFilter.field);return bo.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return vi(61313);default:return vi(60726)}}(e):void 0!==e.fieldFilter?function(e){return bo.create(Vc(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return vi(58110);default:return vi(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return _o.create(e.compositeFilter.filters.map(e=>Pc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return vi(1026)}}(e.compositeFilter.op))}(e):vi(30097,{filter:e})}function Oc(e){return dc[e]}function Lc(e){return fc[e]}function Mc(e){return pc[e]}function jc(e){return{fieldPath:e.canonicalString()}}function Vc(e){return Ki.fromServerFormat(e.fieldPath)}function Uc(e){return e instanceof bo?function(e){if("=="===e.op){if(ao(e.value))return{unaryFilter:{field:jc(e.field),op:"IS_NAN"}};if(oo(e.value))return{unaryFilter:{field:jc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ao(e.value))return{unaryFilter:{field:jc(e.field),op:"IS_NOT_NAN"}};if(oo(e.value))return{unaryFilter:{field:jc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jc(e.field),op:Lc(e.op),value:e.value}}}(e):e instanceof _o?function(e){const t=e.getFilters().map(e=>Uc(e));return 1===t.length?t[0]:{compositeFilter:{op:Mc(e.op),filters:t}}}(e):vi(54877,{filter:e})}function Fc(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function qc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
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
             */class Bc{constructor(e,t,n,s,i=rr.min(),r=rr.min(),o=Cr.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new Bc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Bc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Bc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Bc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
             */class zc{constructor(e){this.yt=e}}function $c(e){const t=Rc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Go(t,t.limit,"L"):t}
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
             */class Hc{constructor(){this.Cn=new Kc}addToCollectionParentIndex(e,t){return this.Cn.add(t),hr.resolve()}getCollectionParents(e,t){return hr.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return hr.resolve()}deleteFieldIndex(e,t){return hr.resolve()}deleteAllFieldIndexes(e){return hr.resolve()}createTargetIndexes(e,t){return hr.resolve()}getDocumentsMatchingTarget(e,t){return hr.resolve(null)}getIndexType(e,t){return hr.resolve(0)}getFieldIndexes(e,t){return hr.resolve([])}getNextCollectionGroupToUpdate(e){return hr.resolve(null)}getMinOffset(e,t){return hr.resolve(ar.min())}getMinOffsetFromCollectionGroup(e,t){return hr.resolve(ar.min())}updateCollectionGroup(e,t,n){return hr.resolve()}updateIndexEntries(e,t){return hr.resolve()}}class Kc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new xr($i.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new xr($i.comparator)).toArray()}}
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
             */const Jc="LruGarbageCollector";function Yc([e,t],[n,s]){const i=Mi(e,n);return 0===i?Mi(t,s):i}class Zc{constructor(e){this.Ir=e,this.buffer=new xr(Yc),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Yc(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class el{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){mi(Jc,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){dr(e)?mi(Jc,"Ignoring IndexedDB error during garbage collection: ",e):await ur(e)}await this.Vr(3e5)})}}class tl{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return hr.resolve(fr.ce);const n=new Zc(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(mi("LruGarbageCollector","Garbage collection skipped; disabled"),hr.resolve(Gc)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(mi("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Gc):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,s,i,r,o,a,c;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(mi("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),s=this.params.maximumSequenceNumbersToCollect):s=t,r=Date.now(),this.nthSequenceNumber(e,s))).next(s=>(n=s,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),pi()<=V.DEBUG&&mi("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${r-l}ms\n\tDetermined least recently used ${s} in `+(o-r)+"ms\n"+`\tRemoved ${i} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-l}ms`),hr.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:e})))}}
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
class nl{constructor(){this.changes=new ea(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fo.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?hr.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
             */class sl{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
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
             */class il{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&La(n.mutation,e,Sr.empty(),ir.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ha()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ha()){const s=oa();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(e=>{let t=ia();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=oa();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ha()))}populateOverlays(e,t,n){const s=[];return n.forEach(e=>{t.has(e)||s.push(e)}),this.documentOverlayCache.getOverlays(e,s).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,s){let i=na();const r=ca(),o=ca();return t.forEach((e,t)=>{const o=n.get(t.key);s.has(t.key)&&(void 0===o||o.mutation instanceof Ua)?i=i.insert(t.key,t):void 0!==o?(r.set(t.key,o.mutation.getFieldMask()),La(o.mutation,t,o.mutation.getFieldMask(),ir.now())):r.set(t.key,Sr.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>r.set(e,t)),t.forEach((e,t)=>o.set(e,new sl(t,r.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=ca();let s=new _r((e,t)=>e-t),i=ha();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const r=t.get(e);if(null===r)return;let o=n.get(e)||Sr.empty();o=i.applyToLocalView(r,o),n.set(e,o);const a=(s.get(i.batchId)||ha()).add(e);s=s.insert(i.batchId,a)})}).next(()=>{const r=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,l=aa();c.forEach(e=>{if(!i.has(e)){const s=Pa(t.get(e),n.get(e));null!==s&&l.set(e,s),i=i.add(e)}}),r.push(this.documentOverlayCache.saveOverlays(e,a,l))}return hr.waitFor(r)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,s){return function(e){return Gi.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const r=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):hr.resolve(oa());let o=-1,a=i;return r.next(t=>hr.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?hr.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,ha())).next(e=>({batchId:o,changes:ra(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Gi(t)).next(e=>{let t=ia();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let r=ia();return this.indexManager.getCollectionParents(e,i).next(o=>hr.forEach(o,o=>{const a=function(e,t){return new Fo(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,a,n,s).next(e=>{e.forEach((e,t)=>{r=r.insert(e,t)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(r=>(i=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(e=>{i.forEach((t,n)=>{const s=n.getKey();null===e.get(s)&&(e=e.insert(s,fo.newInvalidDocument(s)))});let n=ia();return e.forEach((e,s)=>{const r=i.get(e);void 0!==r&&La(r.mutation,s,Sr.empty(),ir.now()),Jo(t,s)&&(n=n.insert(e,s))}),n})}}
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
             */class rl{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return hr.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:bc(e.createTime)}}(t)),hr.resolve()}getNamedQuery(e,t){return hr.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(e){return{name:e.name,query:$c(e.bundledQuery),readTime:bc(e.readTime)}}(t)),hr.resolve()}}
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
             */class ol{constructor(){this.overlays=new _r(Gi.comparator),this.qr=new Map}getOverlay(e,t){return hr.resolve(this.overlays.get(t))}getOverlays(e,t){const n=oa();return hr.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,s)=>{this.St(e,t,s)}),hr.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.qr.get(n);return void 0!==s&&(s.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),hr.resolve()}getOverlaysForCollection(e,t,n){const s=oa(),i=t.length+1,r=new Gi(t.child("")),o=this.overlays.getIteratorFrom(r);for(;o.hasNext();){const e=o.getNext().value,r=e.getKey();if(!t.isPrefixOf(r.path))break;r.path.length===i&&e.largestBatchId>n&&s.set(e.getKey(),e)}return hr.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new _r((e,t)=>e-t);const r=this.overlays.getIterator();for(;r.hasNext();){const e=r.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=oa(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=oa(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=s)););return hr.resolve(o)}St(e,t,n){const s=this.overlays.get(n.key);if(null!==s){const e=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Ga(t,n));let i=this.qr.get(t);void 0===i&&(i=ha(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}
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
             */class al{constructor(){this.sessionToken=Cr.EMPTY_BYTE_STRING}getSessionToken(e){return hr.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,hr.resolve()}}
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
             */class cl{constructor(){this.Qr=new xr(ll.$r),this.Ur=new xr(ll.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new ll(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new ll(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new Gi(new $i([])),n=new ll(t,e),s=new ll(t,e+1),i=[];return this.Ur.forEachInRange([n,s],e=>{this.Gr(e),i.push(e.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new Gi(new $i([])),n=new ll(t,e),s=new ll(t,e+1);let i=ha();return this.Ur.forEachInRange([n,s],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new ll(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class ll{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return Gi.comparator(e.key,t.key)||Mi(e.Yr,t.Yr)}static Kr(e,t){return Mi(e.Yr,t.Yr)||Gi.comparator(e.key,t.key)}}
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
             */class ul{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new xr(ll.$r)}checkEmpty(e){return hr.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Ha(i,t,n,s);this.mutationQueue.push(r);for(const o of s)this.Zr=this.Zr.add(new ll(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return hr.resolve(r)}lookupMutationBatch(e,t){return hr.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ei(n),i=s<0?0:s;return hr.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return hr.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return hr.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ll(t,0),s=new ll(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],e=>{const t=this.Xr(e.Yr);i.push(t)}),hr.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new xr(Mi);return t.forEach(e=>{const t=new ll(e,0),s=new ll(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,s],e=>{n=n.add(e.Yr)})}),hr.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;Gi.isDocumentKey(i)||(i=i.child(""));const r=new ll(new Gi(i),0);let o=new xr(Mi);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===s&&(o=o.add(e.Yr)),!0)},r),hr.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){_i(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return hr.forEach(t.mutations,s=>{const i=new ll(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new ll(t,0),s=this.Zr.firstAfterOrEqual(n);return hr.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,hr.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
             */class hl{constructor(e){this.ri=e,this.docs=new _r(Gi.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,r=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return hr.resolve(n?n.document.mutableCopy():fo.newInvalidDocument(t))}getEntries(e,t){let n=na();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():fo.newInvalidDocument(e))}),hr.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=na();const r=t.path,o=new Gi(r.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!r.isPrefixOf(e.path))break;e.path.length>r.length+1||cr(or(o),n)<=0||(s.has(o.key)||Jo(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return hr.resolve(i)}getAllFromCollectionGroup(e,t,n,s){vi(9500)}ii(e,t){return hr.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new dl(this)}getSize(e){return hr.resolve(this.size)}}class dl extends nl{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(n)}),hr.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
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
             */class fl{constructor(e){this.persistence=e,this.si=new ea(e=>jo(e),Vo),this.lastRemoteSnapshotVersion=rr.min(),this.highestTargetId=0,this.oi=0,this._i=new cl,this.targetCount=0,this.ai=Xc.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),hr.resolve()}getLastRemoteSnapshotVersion(e){return hr.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return hr.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),hr.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),hr.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Xc(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,hr.resolve()}updateTargetData(e,t){return this.Pr(t),hr.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,hr.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.si.forEach((r,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(r),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),s++)}),hr.waitFor(i).next(()=>s)}getTargetCount(e){return hr.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return hr.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),hr.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(t=>{i.push(s.markPotentiallyOrphaned(e,t))}),hr.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),hr.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return hr.resolve(n)}containsKey(e,t){return hr.resolve(this._i.containsKey(t))}}
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
             */class pl{constructor(e,t){this.ui={},this.overlays={},this.ci=new fr(0),this.li=!1,this.li=!0,this.hi=new al,this.referenceDelegate=e(this),this.Pi=new fl(this),this.indexManager=new Hc,this.remoteDocumentCache=function(e){return new hl(e)}(e=>this.referenceDelegate.Ti(e)),this.serializer=new zc(t),this.Ii=new rl(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ol,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new ul(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){mi("MemoryPersistence","Starting transaction:",e);const s=new ml(this.ci.next());return this.referenceDelegate.Ei(),n(s).next(e=>this.referenceDelegate.di(s).next(()=>e)).toPromise().then(e=>(s.raiseOnCommittedEvent(),e))}Ai(e,t){return hr.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class ml extends lr{constructor(e){super(),this.currentSequenceNumber=e}}class gl{constructor(e){this.persistence=e,this.Ri=new cl,this.Vi=null}static mi(e){return new gl(e)}get fi(){if(this.Vi)return this.Vi;throw vi(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),hr.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),hr.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),hr.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return hr.forEach(this.fi,n=>{const s=Gi.fromPath(n);return this.gi(e,s).next(e=>{e||t.removeEntry(s,rr.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return hr.or([()=>hr.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class yl{constructor(e,t){this.persistence=e,this.pi=new ea(e=>function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=yr(t)),t=gr(e.get(n),t);return yr(t)}(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=function(e,t){return new tl(e,t)}(this,t)}static mi(e,t){return new yl(e,t)}Ei(){}di(e){return hr.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return hr.forEach(this.pi,(n,s)=>this.br(e,n,s).next(e=>e?hr.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,s=>this.br(e,s,t).next(e=>{e||(n++,i.removeEntry(s,rr.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),hr.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),hr.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),hr.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),hr.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=no(e.data.value)),t}br(e,t,n){return hr.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return hr.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
             */class wl{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=s}static As(e,t){let n=ha(),s=ha();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wl(e,t.fromCache,n,s)}}
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
             */class bl{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=T()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(_())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ys(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ws(e,t,s,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new vl;return this.Ss(e,t,n).next(s=>{if(i.result=s,this.Vs)return this.bs(e,t,n,s.size)})}).next(()=>i.result)}bs(e,t,n,s){return n.documentReadCount<this.fs?(pi()<=V.DEBUG&&mi("QueryEngine","SDK will not create cache indexes for query:",Xo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),hr.resolve()):(pi()<=V.DEBUG&&mi("QueryEngine","Query:",Xo(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(pi()<=V.DEBUG&&mi("QueryEngine","The SDK decides to create cache indexes for query:",Xo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ho(t))):hr.resolve())}ys(e,t){if(Bo(t))return hr.resolve(null);let n=Ho(t);return this.indexManager.getIndexType(e,n).next(s=>0===s?null:(null!==t.limit&&1===s&&(t=Go(t,null,"F"),n=Ho(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{const i=ha(...s);return this.ps.getDocuments(e,i).next(s=>this.indexManager.getMinOffset(e,n).next(n=>{const r=this.Ds(t,s);return this.Cs(t,r,i,n.readTime)?this.ys(e,Go(t,null,"F")):this.vs(e,r,t,n)}))})))}ws(e,t,n,s){return Bo(t)||s.isEqual(rr.min())?hr.resolve(null):this.ps.getDocuments(e,n).next(i=>{const r=this.Ds(t,i);return this.Cs(t,r,n,s)?hr.resolve(null):(pi()<=V.DEBUG&&mi("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Xo(t)),this.vs(e,r,t,function(e,t){const n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,i=rr.fromTimestamp(1e9===s?new ir(n+1,0):new ir(n,s));return new ar(i,Gi.empty(),t)}(s,-1)).next(e=>e))})}Ds(e,t){let n=new xr(Yo(e));return t.forEach((t,s)=>{Jo(e,s)&&(n=n.add(s))}),n}Cs(e,t,n,s){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,n){return pi()<=V.DEBUG&&mi("QueryEngine","Using full collection scan to execute query:",Xo(t)),this.ps.getDocumentsMatchingQuery(e,t,ar.min(),n)}vs(e,t,n,s){return this.ps.getDocumentsMatchingQuery(e,n,s).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
             */const _l="LocalStore";class Tl{constructor(e,t,n,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new _r(Mi),this.xs=new ea(e=>jo(e),Vo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new il(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function Il(e,t){const n=Ti(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let s;return n.mutationQueue.getAllMutationBatches(e).next(i=>(s=i,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],r=[];let o=ha();for(const e of s){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){r.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:i,addedBatchIds:r}))})})}function xl(e){const t=Ti(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function El(e,t){const n=Ti(e),s=t.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const r=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const o=[];t.targetChanges.forEach((r,a)=>{const c=i.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,r.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,r.addedDocuments,a)));let l=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?l=l.withResumeToken(Cr.EMPTY_BYTE_STRING,rr.min()).withLastLimboFreeSnapshotVersion(rr.min()):r.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(r.resumeToken,s)),i=i.insert(a,l),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,l,r)&&o.push(n.Pi.updateTargetData(e,l))});let a=na(),c=ha();if(t.documentUpdates.forEach(s=>{t.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,s))}),o.push(function(e,t,n){let s=ha(),i=ha();return n.forEach(e=>s=s.add(e)),t.getEntries(e,s).next(e=>{let s=na();return n.forEach((n,r)=>{const o=e.get(n);r.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),r.isNoDocument()&&r.version.isEqual(rr.min())?(t.removeEntry(n,r.readTime),s=s.insert(n,r)):!o.isValidDocument()||r.version.compareTo(o.version)>0||0===r.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(r),s=s.insert(n,r)):mi(_l,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",r.version)}),{ks:s,qs:i}})}(e,r,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!s.isEqual(rr.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,s));o.push(t)}return hr.waitFor(o).next(()=>r.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=i,e))}function Sl(e,t){const n=Ti(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function kl(e,t,n){const s=Ti(e),i=s.Ms.get(t),r=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",r,e=>s.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!dr(e))throw e;mi(_l,`Failed to update sequence numbers for target ${t}: ${e}`)}s.Ms=s.Ms.remove(t),s.xs.delete(i.target)}function Cl(e,t,n){const s=Ti(e);let i=rr.min(),r=ha();return s.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const s=Ti(e),i=s.xs.get(n);return void 0!==i?hr.resolve(s.Ms.get(i)):s.Pi.getTargetData(t,n)}(s,e,Ho(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,s.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{r=e})}).next(()=>s.Fs.getDocumentsMatchingQuery(e,t,n?i:rr.min(),n?r:ha())).next(e=>(function(e,t,n){let s=e.Os.get(t)||rr.min();n.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.Os.set(t,s)}(s,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Qs:r})))}class Nl{constructor(){this.activeTargetIds=da}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Al{constructor(){this.Mo=new Nl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Nl,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
             */class Dl{Oo(e){}shutdown(){}}
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
             */const Rl="ConnectivityMonitor";class Pl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){mi(Rl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){mi(Rl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
             */let Ol=null;function Ll(){return null===Ol?Ol=268435456+Math.round(2147483648*Math.random()):Ol++,"0x"+Ol.toString(16)
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
             */}const Ml="RestConnection",jl={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Vl{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===qr?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(e,t,n,s,i){const r=Ll(),o=this.zo(e,t.toUriEncodedString());mi(Ml,`Sending RPC '${e}' ${r}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,s,i);const{host:c}=new URL(o),l=g(c);return this.Jo(e,o,a,n,l).then(t=>(mi(Ml,`Received RPC '${e}' ${r}: `,t),t),t=>{throw yi(Ml,`RPC '${e}' ${r} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,s,i,r){return this.Go(e,t,n,s,i)}jo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+di,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=jl[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
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
             */class Ul{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
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
             */const Fl="WebChannelConnection";class ql extends Vl{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,s,i){const r=Ll();return new Promise((i,o)=>{const a=new ei;a.setWithCredentials(!0),a.listenOnce(ni.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case si.NO_ERROR:const t=a.getResponseJson();mi(Fl,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(t)),i(t);break;case si.TIMEOUT:mi(Fl,`RPC '${e}' ${r} timed out`),o(new xi(Ii.DEADLINE_EXCEEDED,"Request time out"));break;case si.HTTP_ERROR:const n=a.getStatus();if(mi(Fl,`RPC '${e}' ${r} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Ii).indexOf(t)>=0?t:Ii.UNKNOWN}(t.status);o(new xi(e,t.message))}else o(new xi(Ii.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new xi(Ii.UNAVAILABLE,"Connection failed."));break;default:vi(9055,{l_:e,streamId:r,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{mi(Fl,`RPC '${e}' ${r} completed.`)}});const c=JSON.stringify(s);mi(Fl,`RPC '${e}' ${r} sending request:`,s),a.send(t,"POST",c,n,15)})}T_(e,t,n){const s=Ll(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=ai(),o=oi(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const l=i.join("");mi(Fl,`Creating RPC '${e}' stream ${s}: ${l}`,a);const u=r.createWebChannel(l,a);this.I_(u);let h=!1,d=!1;const f=new Ul({Yo:t=>{d?mi(Fl,`Not sending because RPC '${e}' stream ${s} is closed:`,t):(h||(mi(Fl,`Opening RPC '${e}' stream ${s} transport.`),u.open(),h=!0),mi(Fl,`RPC '${e}' stream ${s} sending:`,t),u.send(t))},Zo:()=>u.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return p(u,ti.EventType.OPEN,()=>{d||(mi(Fl,`RPC '${e}' stream ${s} transport opened.`),f.o_())}),p(u,ti.EventType.CLOSE,()=>{d||(d=!0,mi(Fl,`RPC '${e}' stream ${s} transport closed`),f.a_(),this.E_(u))}),p(u,ti.EventType.ERROR,t=>{d||(d=!0,yi(Fl,`RPC '${e}' stream ${s} transport errored. Name:`,t.name,"Message:",t.message),f.a_(new xi(Ii.UNAVAILABLE,"The operation could not be completed")))}),p(u,ti.EventType.MESSAGE,t=>{if(!d){const n=t.data[0];_i(!!n,16349);const i=n,r=i?.error||i[0]?.error;if(r){mi(Fl,`RPC '${e}' stream ${s} received error:`,r);const t=r.status;let n=function(e){const t=Qa[e];if(void 0!==t)return Ja(t)}(t),i=r.message;void 0===n&&(n=Ii.INTERNAL,i="Unknown error status: "+t+" with message "+r.message),d=!0,f.a_(new xi(n,i)),u.close()}else mi(Fl,`RPC '${e}' stream ${s} received:`,n),f.u_(n)}}),p(o,ri.STAT_EVENT,t=>{t.stat===ii.PROXY?mi(Fl,`RPC '${e}' stream ${s} detected buffering proxy`):t.stat===ii.NOPROXY&&mi(Fl,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{f.__()},0),f}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Bl(){return"undefined"!=typeof document?document:null}
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
             */function zl(e){return new mc(e,!0)}
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
             */class $l{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&mi("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
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
             */const Hl="PersistentStream";class Kl{constructor(e,t,n,s,i,r,o,a){this.Mi=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new $l(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===Ii.RESOURCE_EXHAUSTED?(gi(t.toString()),gi("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===Ii.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new xi(Ii.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return mi(Hl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(mi(Hl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Gl extends Kl{constructor(e,t,n,s,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,r),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:vi(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],r=function(e,t){return e.useProto3Json?(_i(void 0===t||"string"==typeof t,58123),Cr.fromBase64String(t||"")):(_i(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Cr.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?Ii.UNKNOWN:Ja(e.code);return new xi(t,e.message||"")}(o);n=new ac(s,i,r,a||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const i=Ec(e,s.document.name),r=bc(s.document.updateTime),o=s.document.createTime?bc(s.document.createTime):rr.min(),a=new uo({mapValue:{fields:s.document.fields}}),c=fo.newFoundDocument(i,r,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new rc(l,u,c.key,c)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const i=Ec(e,s.document),r=s.readTime?bc(s.readTime):rr.min(),o=fo.newNoDocument(i,r),a=s.removedTargetIds||[];n=new rc([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const i=Ec(e,s.document),r=s.removedTargetIds||[];n=new rc([],r,i,null)}else{if(!("filter"in t))return vi(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:s=0,unchangedNames:i}=e,r=new Wa(s,i),o=e.targetId;n=new oc(o,r)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return rr.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?rr.min():t.readTime?bc(t.readTime):rr.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=kc(this.serializer),t.addTarget=function(e,t){let n;const s=t.target;if(n=Uo(s)?{documents:Ac(e,s)}:{query:Dc(e,s).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=wc(e,t.resumeToken);const s=gc(e,t.expectedCount);null!==s&&(n.expectedCount=s)}else if(t.snapshotVersion.compareTo(rr.min())>0){n.readTime=yc(e,t.snapshotVersion.toTimestamp());const s=gc(e,t.expectedCount);null!==s&&(n.expectedCount=s)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return vi(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=kc(this.serializer),t.removeTarget=e,this.q_(t)}}class Wl extends Kl{constructor(e,t,n,s,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,r),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return _i(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,_i(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){_i(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(_i(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?bc(e.updateTime):bc(t);return n.isEqual(rr.min())&&(n=bc(t)),new Na(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=bc(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=kc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>function(e,t){let n;if(t instanceof Va)n={update:Nc(e,t.key,t.value)};else if(t instanceof za)n={delete:xc(e,t.key)};else if(t instanceof Ua)n={update:Nc(e,t.key,t.data),updateMask:Fc(t.fieldMask)};else{if(!(t instanceof $a))return vi(16599,{Vt:t.type});n={verify:xc(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof ba)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof _a)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ia)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ea)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw vi(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:vc(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:vi(27497)}(e,t.precondition)),n}(this.serializer,e))};this.q_(t)}}
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
             */class Ql{}class Xl extends Ql{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new xi(Ii.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.connection.Go(e,Tc(t,n),s,i,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Ii.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new xi(Ii.UNKNOWN,e.toString())})}Ho(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Ho(e,Tc(t,n),s,r,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Ii.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new xi(Ii.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Jl{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(gi(t),this.aa=!1):mi("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
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
             */const Yl="RemoteStore";class Zl{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{cu(this)&&(mi(Yl,"Restarting streams for network reachability change."),await async function(e){const t=Ti(e);t.Ea.add(4),await tu(t),t.Ra.set("Unknown"),t.Ea.delete(4),await eu(t)}(this))})}),this.Ra=new Jl(n,s)}}async function eu(e){if(cu(e))for(const t of e.da)await t(!0)}async function tu(e){for(const t of e.da)await t(!1)}function nu(e,t){const n=Ti(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),au(n)?ou(n):Su(n).O_()&&iu(n,t))}function su(e,t){const n=Ti(e),s=Su(n);n.Ia.delete(t),s.O_()&&ru(n,t),0===n.Ia.size&&(s.O_()?s.L_():cu(n)&&n.Ra.set("Unknown"))}function iu(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(rr.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Su(e).Y_(t)}function ru(e,t){e.Va.Ue(t),Su(e).Z_(t)}function ou(e){e.Va=new lc({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Su(e).start(),e.Ra.ua()}function au(e){return cu(e)&&!Su(e).x_()&&e.Ia.size>0}function cu(e){return 0===Ti(e).Ea.size}function lu(e){e.Va=void 0}async function uu(e){e.Ra.set("Online")}async function hu(e){e.Ia.forEach((t,n)=>{iu(e,t)})}async function du(e,t){lu(e),au(e)?(e.Ra.ha(t),ou(e)):e.Ra.set("Unknown")}async function fu(e,t,n){if(e.Ra.set("Online"),t instanceof ac&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const s of t.targetIds)e.Ia.has(s)&&(await e.remoteSyncer.rejectListen(s,n),e.Ia.delete(s),e.Va.removeTarget(s))}(e,t)}catch(n){mi(Yl,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await pu(e,n)}else if(t instanceof rc?e.Va.Ze(t):t instanceof oc?e.Va.st(t):e.Va.tt(t),!n.isEqual(rr.min()))try{const t=await xl(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ia.get(s);i&&e.Ia.set(s,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const s=e.Ia.get(t);if(!s)return;e.Ia.set(t,s.withResumeToken(Cr.EMPTY_BYTE_STRING,s.snapshotVersion)),ru(e,t);const i=new Bc(s.target,t,n,s.sequenceNumber);iu(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){mi(Yl,"Failed to raise snapshot:",t),await pu(e,t)}}async function pu(e,t,n){if(!dr(t))throw t;e.Ea.add(1),await tu(e),e.Ra.set("Offline"),n||(n=()=>xl(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{mi(Yl,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await eu(e)})}function mu(e,t){return t().catch(n=>pu(e,n,t))}async function gu(e){const t=Ti(e),n=ku(t);let s=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:-1;for(;yu(t);)try{const e=await Sl(t.localStore,s);if(null===e){0===t.Ta.length&&n.L_();break}s=e.batchId,wu(t,e)}catch(e){await pu(t,e)}vu(t)&&bu(t)}function yu(e){return cu(e)&&e.Ta.length<10}function wu(e,t){e.Ta.push(t);const n=ku(e);n.O_()&&n.X_&&n.ea(t.mutations)}function vu(e){return cu(e)&&!ku(e).x_()&&e.Ta.length>0}function bu(e){ku(e).start()}async function _u(e){ku(e).ra()}async function Tu(e){const t=ku(e);for(const n of e.Ta)t.ea(n.mutations)}async function Iu(e,t,n){const s=e.Ta.shift(),i=Ka.from(s,t,n);await mu(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await gu(e)}async function xu(e,t){t&&ku(e).X_&&await async function(e,t){if(function(e){return function(e){switch(e){case Ii.OK:return vi(64938);case Ii.CANCELLED:case Ii.UNKNOWN:case Ii.DEADLINE_EXCEEDED:case Ii.RESOURCE_EXHAUSTED:case Ii.INTERNAL:case Ii.UNAVAILABLE:case Ii.UNAUTHENTICATED:return!1;case Ii.INVALID_ARGUMENT:case Ii.NOT_FOUND:case Ii.ALREADY_EXISTS:case Ii.PERMISSION_DENIED:case Ii.FAILED_PRECONDITION:case Ii.ABORTED:case Ii.OUT_OF_RANGE:case Ii.UNIMPLEMENTED:case Ii.DATA_LOSS:return!0;default:return vi(15467,{code:e})}}(e)&&e!==Ii.ABORTED}(t.code)){const n=e.Ta.shift();ku(e).B_(),await mu(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await gu(e)}}(e,t),vu(e)&&bu(e)}async function Eu(e,t){const n=Ti(e);n.asyncQueue.verifyOperationInProgress(),mi(Yl,"RemoteStore received new credentials");const s=cu(n);n.Ea.add(3),await tu(n),s&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await eu(n)}function Su(e){return e.ma||(e.ma=function(e,t,n){const s=Ti(e);return s.sa(),new Gl(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)
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
             */}(e.datastore,e.asyncQueue,{Xo:uu.bind(null,e),t_:hu.bind(null,e),r_:du.bind(null,e),H_:fu.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),au(e)?ou(e):e.Ra.set("Unknown")):(await e.ma.stop(),lu(e))})),e.ma}function ku(e){return e.fa||(e.fa=function(e,t,n){const s=Ti(e);return s.sa(),new Wl(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:_u.bind(null,e),r_:xu.bind(null,e),ta:Tu.bind(null,e),na:Iu.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await gu(e)):(await e.fa.stop(),e.Ta.length>0&&(mi(Yl,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
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
             */}class Cu{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ei,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const r=Date.now()+n,o=new Cu(e,t,r,s,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new xi(Ii.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Nu(e,t){if(gi("AsyncQueue",`${t}: ${e}`),dr(e))return new xi(Ii.UNAVAILABLE,`${t}: ${e}`);throw e}
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
             */class Au{static emptySet(e){return new Au(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||Gi.comparator(t.key,n.key):(e,t)=>Gi.comparator(e.key,t.key),this.keyedMap=ia(),this.sortedSet=new _r(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Au))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(!e.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Au;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
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
             */class Du{constructor(){this.ga=new _r(Gi.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):vi(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Ru{constructor(e,t,n,s,i,r,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,s,i){const r=[];return t.forEach(e=>{r.push({type:0,doc:e})}),new Ru(e,t,Au.emptySet(t),r,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Wo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}
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
             */class Pu{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Ou{constructor(){this.queries=Lu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=Ti(e),s=n.queries;n.queries=Lu(),s.forEach((e,n)=>{for(const s of n.Sa)s.onError(t)})}(this,new xi(Ii.ABORTED,"Firestore shutting down"))}}function Lu(){return new ea(e=>Qo(e),Wo)}async function Mu(e,t){const n=Ti(e);let s=3;const i=t.query;let r=n.queries.get(i);r?!r.ba()&&t.Da()&&(s=2):(r=new Pu,s=t.Da()?0:1);try{switch(s){case 0:r.wa=await n.onListen(i,!0);break;case 1:r.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=Nu(e,`Initialization of query '${Xo(t.query)}' failed`);return void t.onError(n)}n.queries.set(i,r),r.Sa.push(t),t.va(n.onlineState),r.wa&&t.Fa(r.wa)&&Fu(n)}async function ju(e,t){const n=Ti(e),s=t.query;let i=3;const r=n.queries.get(s);if(r){const e=r.Sa.indexOf(t);e>=0&&(r.Sa.splice(e,1),0===r.Sa.length?i=t.Da()?0:1:!r.ba()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function Vu(e,t){const n=Ti(e);let s=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(i)&&(s=!0);t.wa=i}}s&&Fu(n)}function Uu(e,t,n){const s=Ti(e),i=s.queries.get(t);if(i)for(const r of i.Sa)r.onError(n);s.queries.delete(t)}function Fu(e){e.Ca.forEach(e=>{e.next()})}var qu,Bu;(Bu=qu||(qu={})).Ma="default",Bu.Cache="cache";class zu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Ru(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Ru.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==qu.Cache}}
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
             */class $u{constructor(e){this.key=e}}class Hu{constructor(e){this.key=e}}class Ku{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ha(),this.mutatedKeys=ha(),this.eu=Yo(e),this.tu=new Au(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Du,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,r=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((e,t)=>{const l=s.get(e),u=Jo(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.su(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.eu(u,a)>0||c&&this.eu(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(r=r.add(u),i=d?i.add(e):i.delete(e)):(r=r.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;r.size>this.query.limit;){const e="F"===this.query.limitType?r.last():r.first();r=r.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:r,iu:n,Cs:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return vi(20277,{Rt:e})}};return n(e)-n(t)}
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
             */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),s=s??!1;const o=t&&!s?this._u():[],a=0===this.Xa.size&&this.current&&!s?1:0,c=a!==this.Za;return this.Za=a,0!==r.length||c?{snapshot:new Ru(this.query,e.tu,i,r,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Du,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ha(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new Hu(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new $u(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=ha();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ru.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const Gu="SyncEngine";class Wu{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Qu{constructor(e){this.key=e,this.hu=!1}}class Xu{constructor(e,t,n,s,i,r){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new ea(e=>Qo(e),Wo),this.Iu=new Map,this.Eu=new Set,this.du=new _r(Gi.comparator),this.Au=new Map,this.Ru=new cl,this.Vu={},this.mu=new Map,this.fu=Xc.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function Ju(e,t,n=!0){const s=wh(e);let i;const r=s.Tu.get(t);return r?(s.sharedClientState.addLocalQueryTarget(r.targetId),i=r.view.lu()):i=await Zu(s,t,n,!0),i}async function Yu(e,t){const n=wh(e);await Zu(n,t,!0,!1)}async function Zu(e,t,n,s){const i=await function(e,t){const n=Ti(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let s;return n.Pi.getTargetData(e,t).next(i=>i?(s=i,hr.resolve(s)):n.Pi.allocateTargetId(e).next(i=>(s=new Bc(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,s).next(()=>s))))}).then(e=>{const s=n.Ms.get(e.targetId);return(null===s||e.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}(e.localStore,Ho(t)),r=i.targetId,o=e.sharedClientState.addLocalQueryTarget(r,n);let a;return s&&(a=await async function(e,t,n,s,i){e.pu=(t,n,s)=>async function(e,t,n,s){let i=t.view.ru(n);i.Cs&&(i=await Cl(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));const r=s&&s.targetChanges.get(t.targetId),o=s&&null!=s.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,r,o);return dh(e,t.targetId,a.au),a.snapshot}(e,t,n,s);const r=await Cl(e.localStore,t,!0),o=new Ku(t,r.Qs),a=o.ru(r.documents),c=ic.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==e.onlineState,i),l=o.applyChanges(a,e.isPrimaryClient,c);dh(e,n,l.au);const u=new Wu(t,n,o);return e.Tu.set(t,u),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),l.snapshot}(e,t,r,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&nu(e.remoteStore,i),a}async function eh(e,t,n){const s=Ti(e),i=s.Tu.get(t),r=s.Iu.get(i.targetId);if(r.length>1)return s.Iu.set(i.targetId,r.filter(e=>!Wo(e,t))),void s.Tu.delete(t);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(i.targetId),s.sharedClientState.isActiveQueryTarget(i.targetId)||await kl(s.localStore,i.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(i.targetId),n&&su(s.remoteStore,i.targetId),uh(s,i.targetId)}).catch(ur)):(uh(s,i.targetId),await kl(s.localStore,i.targetId,!0))}async function th(e,t){const n=Ti(e),s=n.Tu.get(t),i=n.Iu.get(s.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),su(n.remoteStore,s.targetId))}async function nh(e,t,n){const s=function(e){const t=Ti(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=oh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=ah.bind(null,t),t}(e);try{const e=await function(e,t){const n=Ti(e),s=ir.now(),i=t.reduce((e,t)=>e.add(t.key),ha());let r,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=na(),c=ha();return n.Ns.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{r=i;const o=[];for(const e of t){const t=Ma(e,r.get(e.key).overlayedDocument);null!=t&&o.push(new Ua(e.key,t,ho(t.value.mapValue),Aa.exists(!0)))}return n.mutationQueue.addMutationBatch(e,s,o,t)}).next(t=>{o=t;const s=t.applyToLocalDocumentSet(r,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,s)})}).then(()=>({batchId:o.batchId,changes:ra(r)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let s=e.Vu[e.currentUser.toKey()];s||(s=new _r(Mi)),s=s.insert(t,n),e.Vu[e.currentUser.toKey()]=s}(s,e.batchId,n),await mh(s,e.changes),await gu(s.remoteStore)}catch(e){const t=Nu(e,"Failed to persist write");n.reject(t)}}async function sh(e,t){const n=Ti(e);try{const e=await El(n.localStore,t);t.targetChanges.forEach((e,t)=>{const s=n.Au.get(t);s&&(_i(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?s.hu=!0:e.modifiedDocuments.size>0?_i(s.hu,14607):e.removedDocuments.size>0&&(_i(s.hu,42227),s.hu=!1))}),await mh(n,e,t)}catch(e){await ur(e)}}function ih(e,t,n){const s=Ti(e);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const e=[];s.Tu.forEach((n,s)=>{const i=s.view.va(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=Ti(e);n.onlineState=t;let s=!1;n.queries.forEach((e,n)=>{for(const i of n.Sa)i.va(t)&&(s=!0)}),s&&Fu(n)}(s.eventManager,t),e.length&&s.Pu.H_(e),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function rh(e,t,n){const s=Ti(e);s.sharedClientState.updateQueryState(t,"rejected",n);const i=s.Au.get(t),r=i&&i.key;if(r){let e=new _r(Gi.comparator);e=e.insert(r,fo.newNoDocument(r,rr.min()));const n=ha().add(r),i=new sc(rr.min(),new Map,new _r(Mi),e,n);await sh(s,i),s.du=s.du.remove(r),s.Au.delete(t),ph(s)}else await kl(s.localStore,t,!1).then(()=>uh(s,t,n)).catch(ur)}async function oh(e,t){const n=Ti(e),s=t.batch.batchId;try{const e=await function(e,t){const n=Ti(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const s=t.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,s){const i=n.batch,r=i.keys();let o=hr.resolve();return r.forEach(e=>{o=o.next(()=>s.getEntry(t,e)).next(t=>{const r=n.docVersions.get(e);_i(null!==r,48541),t.version.compareTo(r)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),s.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ha();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,s))})}(n.localStore,t);lh(n,s,null),ch(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await mh(n,e)}catch(e){await ur(e)}}async function ah(e,t,n){const s=Ti(e);try{const e=await function(e,t){const n=Ti(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let s;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(_i(null!==t,37113),s=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,s)).next(()=>n.localDocuments.getDocuments(e,s))})}(s.localStore,t);lh(s,t,n),ch(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await mh(s,e)}catch(n){await ur(n)}}function ch(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function lh(e,t,n){const s=Ti(e);let i=s.Vu[s.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),s.Vu[s.currentUser.toKey()]=i}}function uh(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e.Iu.get(t))e.Tu.delete(s),n&&e.Pu.yu(s,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||hh(e,t)})}function hh(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(su(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),ph(e))}function dh(e,t,n){for(const s of n)s instanceof $u?(e.Ru.addReference(s.key,t),fh(e,s)):s instanceof Hu?(mi(Gu,"Document no longer in limbo: "+s.key),e.Ru.removeReference(s.key,t),e.Ru.containsKey(s.key)||hh(e,s.key)):vi(19791,{wu:s})}function fh(e,t){const n=t.key,s=n.path.canonicalString();e.du.get(n)||e.Eu.has(s)||(mi(Gu,"New document in limbo: "+n),e.Eu.add(s),ph(e))}function ph(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new Gi($i.fromString(t)),s=e.fu.next();e.Au.set(s,new Qu(n)),e.du=e.du.insert(n,s),nu(e.remoteStore,new Bc(Ho(qo(n.path)),s,"TargetPurposeLimboResolution",fr.ce))}}async function mh(e,t,n){const s=Ti(e),i=[],r=[],o=[];s.Tu.isEmpty()||(s.Tu.forEach((e,a)=>{o.push(s.pu(a,t,n).then(e=>{if((e||n)&&s.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;s.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){i.push(e);const t=wl.As(a.targetId,e);r.push(t)}}))}),await Promise.all(o),s.Pu.H_(i),await async function(e,t){const n=Ti(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>hr.forEach(t,t=>hr.forEach(t.Es,s=>n.persistence.referenceDelegate.addReference(e,t.targetId,s)).next(()=>hr.forEach(t.ds,s=>n.persistence.referenceDelegate.removeReference(e,t.targetId,s)))))}catch(e){if(!dr(e))throw e;mi(_l,"Failed to update sequence numbers: "+e)}for(const s of t){const e=s.targetId;if(!s.fromCache){const t=n.Ms.get(e),s=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(s);n.Ms=n.Ms.insert(e,i)}}}(s.localStore,r))}async function gh(e,t){const n=Ti(e);if(!n.currentUser.isEqual(t)){mi(Gu,"User change. New user:",t.toKey());const e=await Il(n.localStore,t);n.currentUser=t,function(e,t){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new xi(Ii.CANCELLED,t))})}),e.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await mh(n,e.Ls)}}function yh(e,t){const n=Ti(e),s=n.Au.get(t);if(s&&s.hu)return ha().add(s.key);{let e=ha();const s=n.Iu.get(t);if(!s)return e;for(const t of s){const s=n.Tu.get(t);e=e.unionWith(s.view.nu)}return e}}function wh(e){const t=Ti(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=sh.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=yh.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=rh.bind(null,t),t.Pu.H_=Vu.bind(null,t.eventManager),t.Pu.yu=Uu.bind(null,t.eventManager),t}class vh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=zl(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return function(e,t,n,s){return new Tl(e,t,n,s)}(this.persistence,new bl,e.initialUser,this.serializer)}Cu(e){return new pl(gl.mi,this.serializer)}Du(e){return new Al}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vh.provider={build:()=>new vh};class bh extends vh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){_i(this.persistence.referenceDelegate instanceof yl,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new el(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?Qc.withCacheSize(this.cacheSizeBytes):Qc.DEFAULT;return new pl(e=>yl.mi(e,t),this.serializer)}}class _h{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ih(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=gh.bind(null,this.syncEngine),await async function(e,t){const n=Ti(e);t?(n.Ea.delete(2),await eu(n)):t||(n.Ea.add(2),await tu(n),n.Ra.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Ou}createDatastore(e){const t=zl(e.databaseInfo.databaseId),n=function(e){return new ql(e)}(e.databaseInfo);return function(e,t,n,s){return new Xl(e,t,n,s)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,s,i){return new Zl(e,t,n,s,i)}(this.localStore,this.datastore,e.asyncQueue,e=>ih(this.syncEngine,e,0),Pl.v()?new Pl:new Dl)}createSyncEngine(e,t){return function(e,t,n,s,i,r,o){const a=new Xu(e,t,n,s,i,r);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=Ti(e);mi(Yl,"RemoteStore shutting down."),t.Ea.add(5),await tu(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}_h.provider={build:()=>new _h};
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
class Th{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):gi("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
             */const Ih="FirestoreClient";class xh{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=hi.UNAUTHENTICATED,this.clientId=Li.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{mi(Ih,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(mi(Ih,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ei;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Nu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Eh(e,t){e.asyncQueue.verifyOperationInProgress(),mi(Ih,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener(async e=>{s.isEqual(e)||(await Il(t.localStore,e),s=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Sh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){mi(Ih,"Using user provided OfflineComponentProvider");try{await Eh(e,e._uninitializedComponentsProvider._offline)}catch(t){const s=t;if(!function(e){return"FirebaseError"===e.name?e.code===Ii.FAILED_PRECONDITION||e.code===Ii.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(s))throw s;yi("Error using user provided cache. Falling back to memory cache: "+s),await Eh(e,new vh)}}else mi(Ih,"Using default OfflineComponentProvider"),await Eh(e,new bh(void 0));return e._offlineComponents}(e);mi(Ih,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Eu(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Eu(t.remoteStore,n)),e._onlineComponents=t}async function kh(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(mi(Ih,"Using user provided OnlineComponentProvider"),await Sh(e,e._uninitializedComponentsProvider._online)):(mi(Ih,"Using default OnlineComponentProvider"),await Sh(e,new _h))),e._onlineComponents}async function Ch(e){const t=await kh(e),n=t.eventManager;return n.onListen=Ju.bind(null,t.syncEngine),n.onUnlisten=eh.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Yu.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=th.bind(null,t.syncEngine),n}
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
function Nh(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
             */}const Ah=new Map,Dh="firestore.googleapis.com",Rh=!0;
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
             */class Ph{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new xi(Ii.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Dh,this.ssl=Rh}else this.host=e.host,this.ssl=e.ssl??Rh;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Wc;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new xi(Ii.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,s){if(!0===t&&!0===s)throw new xi(Ii.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Nh(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new xi(Ii.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new xi(Ii.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new xi(Ii.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
             */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Oh{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ph({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new xi(Ii.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new xi(Ii.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ph(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new ki;switch(e.type){case"firstParty":return new Di(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new xi(Ii.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Ah.get(e);t&&(mi("ComponentProvider","Removing Datastore"),Ah.delete(e),t.terminate())}(this),Promise.resolve()}}function Lh(e,t,n,s={}){e=Zi(e,Oh);const i=g(t),r=e._getSettings(),o={...r,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;i&&(y(`https://${a}`),b("Firestore",!0)),r.host!==Dh&&r.host!==a&&yi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...r,host:a,ssl:i,emulatorOptions:s};if(!C(l,o)&&(e._setSettings(l),s.mockUserToken)){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=hi.MOCK_USER;else{t=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[c(JSON.stringify({alg:"none",type:"JWT"})),c(JSON.stringify(r)),""].join(".")}(s.mockUserToken,e._app?.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new xi(Ii.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new hi(i)}e._authCredentials=new Ci(new Si(t,n))}}
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
             */class Mh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Mh(this.firestore,e,this._query)}}class jh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new jh(this.firestore,e,this._key)}toJSON(){return{type:jh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(tr(t,jh._jsonSchema))return new jh(e,n||null,new Gi($i.fromString(t.referencePath)))}}jh._jsonSchemaVersion="firestore/documentReference/1.0",jh._jsonSchema={type:er("string",jh._jsonSchemaVersion),referencePath:er("string")};class Vh extends Mh{constructor(e,t,n){super(e,t,qo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new jh(this.firestore,null,new Gi(e))}withConverter(e){return new Vh(this.firestore,e,this._path)}}function Uh(e,t,...n){if(e=P(e),Wi("collection","path",t),e instanceof Oh){const s=$i.fromString(t,...n);return Xi(s),new Vh(e,null,s)}{if(!(e instanceof jh||e instanceof Vh))throw new xi(Ii.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child($i.fromString(t,...n));return Xi(s),new Vh(e.firestore,null,s)}}function Fh(e,t,...n){if(e=P(e),1===arguments.length&&(t=Li.newId()),Wi("doc","path",t),e instanceof Oh){const s=$i.fromString(t,...n);return Qi(s),new jh(e,null,new Gi(s))}{if(!(e instanceof jh||e instanceof Vh))throw new xi(Ii.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child($i.fromString(t,...n));return Qi(s),new jh(e.firestore,e instanceof Vh?e.converter:null,new Gi(s))}}
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
             */const qh="AsyncQueue";class Bh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new $l(this,"async_queue_retry"),this._c=()=>{const e=Bl();e&&mi(qh,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=Bl();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Bl();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ei;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!dr(e))throw e;mi(qh,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,gi("INTERNAL UNHANDLED ERROR: ",zh(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Cu.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(s),s}uc(){this.nc&&vi(47125,{Pc:zh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function zh(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
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
             */}function $h(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const s of t)if(s in n&&"function"==typeof n[s])return!0;return!1}
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
             */(e,["next","error","complete"])}class Hh extends Oh{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Bh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Bh(e),this._firestoreClient=void 0,await e}}}function Kh(e){if(e._terminated)throw new xi(Ii.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){const t=e._freezeSettings(),n=function(e,t,n,s){return new Fr(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Nh(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator)}(e._databaseId,e._app?.options.appId||"",e._persistenceKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new xh(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
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
             */(e),e._firestoreClient}class Gh{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Gh(Cr.fromBase64String(e))}catch(e){throw new xi(Ii.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Gh(Cr.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Gh._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(tr(e,Gh._jsonSchema))return Gh.fromBase64String(e.bytes)}}Gh._jsonSchemaVersion="firestore/bytes/1.0",Gh._jsonSchema={type:er("string",Gh._jsonSchemaVersion),bytes:er("string")};
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
class Wh{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new xi(Ii.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ki(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
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
             */class Xh{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new xi(Ii.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new xi(Ii.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Mi(this._lat,e._lat)||Mi(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Xh._jsonSchemaVersion}}static fromJSON(e){if(tr(e,Xh._jsonSchema))return new Xh(e.latitude,e.longitude)}}Xh._jsonSchemaVersion="firestore/geoPoint/1.0",Xh._jsonSchema={type:er("string",Xh._jsonSchemaVersion),latitude:er("number"),longitude:er("number")};
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
class Jh{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Jh._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(tr(e,Jh._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Jh(e.vectorValues);throw new xi(Ii.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Jh._jsonSchemaVersion="firestore/vectorValue/1.0",Jh._jsonSchema={type:er("string",Jh._jsonSchemaVersion),vectorValues:er("object")};
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
const Yh=/^__.*__$/;class Zh{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Ua(e,this.data,this.fieldMask,t,this.fieldTransforms):new Va(e,this.data,t,this.fieldTransforms)}}class ed{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Ua(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function td(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw vi(40011,{Ac:e})}}class nd{constructor(e,t,n,s,i,r){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,void 0===i&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new nd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return wd(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(td(this.Ac)&&Yh.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class sd{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||zl(e)}Cc(e,t,n,s=!1){return new nd({Ac:e,methodName:t,Dc:n,path:Ki.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function id(e){const t=e._freezeSettings(),n=zl(e._databaseId);return new sd(e._databaseId,!!t.ignoreUndefinedProperties,n)}function rd(e,t,n,s,i,r={}){const o=e.Cc(r.merge||r.mergeFields?2:0,t,n,i);pd("Data must be an object, but it was:",o,s);const a=dd(s,o);let c,l;if(r.merge)c=new Sr(o.fieldMask),l=o.fieldTransforms;else if(r.mergeFields){const e=[];for(const s of r.mergeFields){const i=md(t,s,n);if(!o.contains(i))throw new xi(Ii.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);vd(e,i)||e.push(i)}c=new Sr(e),l=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,l=o.fieldTransforms;return new Zh(new uo(a),c,l)}class od extends Qh{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof od}}function ad(e,t,n){return new nd({Ac:3,Dc:t.settings.Dc,methodName:e._methodName,fc:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class cd extends Qh{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=ad(this,e,!0),n=this.vc.map(e=>hd(e,t)),s=new _a(n);return new Ca(e.path,s)}isEqual(e){return e instanceof cd&&C(this.vc,e.vc)}}class ld extends Qh{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=ad(this,e,!0),n=this.vc.map(e=>hd(e,t)),s=new Ia(n);return new Ca(e.path,s)}isEqual(e){return e instanceof ld&&C(this.vc,e.vc)}}class ud extends Qh{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Ea(e.serializer,ma(e.serializer,this.Fc));return new Ca(e.path,t)}isEqual(e){return e instanceof ud&&this.Fc===e.Fc}}function hd(e,t){if(fd(e=P(e)))return pd("Unsupported field value:",t,e),dd(e,t);if(e instanceof Qh)return function(e,t){if(!td(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let s=0;for(const i of e){let e=hd(i,t.wc(s));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),s++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=P(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return ma(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ir.fromDate(e);return{timestampValue:yc(t.serializer,n)}}if(e instanceof ir){const n=new ir(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:yc(t.serializer,n)}}if(e instanceof Xh)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Gh)return{bytesValue:wc(t.serializer,e._byteString)};if(e instanceof jh){const n=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(n))throw t.Sc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:_c(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Jh)return function(e,t){return{mapValue:{fields:{[zr]:{stringValue:Kr},[Gr]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return fa(t.serializer,e)})}}}}}}(e,t);throw t.Sc(`Unsupported field value: ${Yi(e)}`)}(e,t)}function dd(e,t){const n={};return br(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):vr(e,(e,s)=>{const i=hd(s,t.mc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function fd(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ir||e instanceof Xh||e instanceof Gh||e instanceof jh||e instanceof Qh||e instanceof Jh)}function pd(e,t,n){if(!fd(n)||!Ji(n)){const s=Yi(n);throw"an object"===s?t.Sc(e+" a custom object"):t.Sc(e+" "+s)}}function md(e,t,n){if((t=P(t))instanceof Wh)return t._internalPath;if("string"==typeof t)return yd(e,t);throw wd("Field path arguments must be of type string or ",e,!1,void 0,n)}const gd=new RegExp("[~\\*/\\[\\]]");function yd(e,t,n){if(t.search(gd)>=0)throw wd(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Wh(...t.split("."))._internalPath}catch(s){throw wd(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function wd(e,t,n,s,i){const r=s&&!s.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${s}`),o&&(c+=` in document ${i}`),c+=")"),new xi(Ii.INVALID_ARGUMENT,a+e+c)}function vd(e,t){return e.some(e=>e.isEqual(t))}
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
             */class bd{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new jh(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new _d(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Td("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class _d extends bd{data(){return super.data()}}function Td(e,t){return"string"==typeof t?yd(e,t):t instanceof Wh?t._internalPath:t._delegate._internalPath}
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
             */class Id{}class xd extends Id{}function Ed(e,t,...n){let s=[];t instanceof Id&&s.push(t),s=s.concat(n),function(e){const t=e.filter(e=>e instanceof kd).length,n=e.filter(e=>e instanceof Sd).length;if(t>1||t>0&&n>0)throw new xi(Ii.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
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
             */(s);for(const i of s)e=i._apply(e);return e}class Sd extends xd{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Sd(e,t,n)}_apply(e){const t=this._parse(e);return Od(e._query,t),new Mh(e.firestore,e.converter,Ko(e._query,t))}_parse(e){const t=id(e.firestore),n=function(e,t,n,s,i,r,o){let a;if(i.isKeyField()){if("array-contains"===r||"array-contains-any"===r)throw new xi(Ii.INVALID_ARGUMENT,`Invalid Query. You can't perform '${r}' queries on documentId().`);if("in"===r||"not-in"===r){Pd(o,r);const t=[];for(const n of o)t.push(Rd(s,e,n));a={arrayValue:{values:t}}}else a=Rd(s,e,o)}else"in"!==r&&"not-in"!==r&&"array-contains-any"!==r||Pd(o,r),a=function(e,t,n,s=!1){return hd(n,e.Cc(s?4:3,t))}(n,t,o,"in"===r||"not-in"===r);return bo.create(i,r,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class kd extends Id{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new kd(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:_o.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const s=t.getFlattenedFilters();for(const i of s)Od(n,i),n=Ko(n,i)}(e._query,t),new Mh(e.firestore,e.converter,Ko(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class Cd extends xd{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Cd(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new xi(Ii.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new xi(Ii.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new yo(t,n)}(e._query,this._field,this._direction);return new Mh(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Fo(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function Nd(e,t="asc"){const n=t,s=Td("orderBy",e);return Cd._create(s,n)}class Ad extends xd{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Ad(e,t,n)}_apply(e){return new Mh(e.firestore,e.converter,Go(e._query,this._limit,this._limitType))}}function Dd(e){return function(e,t){if(t<=0)throw new xi(Ii.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),Ad._create("limit",e,"F")}function Rd(e,t,n){if("string"==typeof(n=P(n))){if(""===n)throw new xi(Ii.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zo(t)&&-1!==n.indexOf("/"))throw new xi(Ii.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=t.path.child($i.fromString(n));if(!Gi.isDocumentKey(s))throw new xi(Ii.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return so(e,new Gi(s))}if(n instanceof jh)return so(e,n._key);throw new xi(Ii.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Yi(n)}.`)}function Pd(e,t){if(!Array.isArray(e)||0===e.length)throw new xi(Ii.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Od(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new xi(Ii.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new xi(Ii.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class Ld{convertValue(e,t="none"){switch(Wr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Dr(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Rr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw vi(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return vr(e,(e,s)=>{n[e]=this.convertValue(s,t)}),n}convertVectorValue(e){const t=e.fields?.[Gr].arrayValue?.values?.map(e=>Dr(e.doubleValue));return new Jh(t)}convertGeoPoint(e){return new Xh(Dr(e.latitude),Dr(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Vr(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Ur(e));default:return null}}convertTimestamp(e){const t=Ar(e);return new ir(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=$i.fromString(e);_i(qc(n),9688,{name:e});const s=new Br(n.get(1),n.get(3)),i=new Gi(n.popFirst(5));return s.isEqual(t)||gi(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
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
             */class Md{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class jd extends bd{constructor(e,t,n,s,i,r){super(e,t,n,s,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Vd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Td("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new xi(Ii.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=jd._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}jd._jsonSchemaVersion="firestore/documentSnapshot/1.0",jd._jsonSchema={type:er("string",jd._jsonSchemaVersion),bundleSource:er("string","DocumentSnapshot"),bundleName:er("string"),bundle:er("string")};class Vd extends jd{data(e={}){return super.data(e)}}class Ud{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Md(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Vd(this._firestore,this._userDataWriter,n.key,n,new Md(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new xi(Ii.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const s=new Vd(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Md(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:s,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const s=new Vd(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Md(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,r=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),r=n.indexOf(t.doc.key)),{type:Fd(t.type),doc:s,oldIndex:i,newIndex:r}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new xi(Ii.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ud._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Li.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),s.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Fd(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return vi(61501,{type:e})}}
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
             */function qd(e){e=Zi(e,jh);const t=Zi(e.firestore,Hh);return function(e,t,n={}){const s=new Ei;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,s,i){const r=new Th({next:a=>{r.Nu(),t.enqueueAndForget(()=>ju(e,o));const c=a.docs.has(n);!c&&a.fromCache?i.reject(new xi(Ii.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&s&&"server"===s.source?i.reject(new xi(Ii.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new zu(qo(n.path),r,{includeMetadataChanges:!0,qa:!0});return Mu(e,o)}(await Ch(e),e.asyncQueue,t,n,s)),s.promise}(Kh(t),e._key).then(n=>Gd(t,e,n))}Ud._jsonSchemaVersion="firestore/querySnapshot/1.0",Ud._jsonSchema={type:er("string",Ud._jsonSchemaVersion),bundleSource:er("string","QuerySnapshot"),bundleName:er("string"),bundle:er("string")};class Bd extends Ld{constructor(e){super(),this.firestore=e}convertBytes(e){return new Gh(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new jh(this.firestore,null,t)}}function zd(e,t,n,...s){e=Zi(e,jh);const i=Zi(e.firestore,Hh),r=id(i);let o;return o="string"==typeof(t=P(t))||t instanceof Wh?function(e,t,n,s,i,r){const o=e.Cc(1,t,n),a=[md(t,s,n)],c=[i];if(r.length%2!=0)throw new xi(Ii.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<r.length;d+=2)a.push(md(t,r[d])),c.push(r[d+1]);const l=[],u=uo.empty();for(let d=a.length-1;d>=0;--d)if(!vd(l,a[d])){const e=a[d];let t=c[d];t=P(t);const n=o.yc(e);if(t instanceof od)l.push(e);else{const s=hd(t,n);null!=s&&(l.push(e),u.set(e,s))}}const h=new Sr(l);return new ed(u,h,o.fieldTransforms)}(r,"updateDoc",e._key,t,n,s):function(e,t,n,s){const i=e.Cc(1,t,n);pd("Data must be an object, but it was:",i,s);const r=[],o=uo.empty();vr(s,(e,s)=>{const a=yd(t,e,n);s=P(s);const c=i.yc(a);if(s instanceof od)r.push(a);else{const e=hd(s,c);null!=e&&(r.push(a),o.set(a,e))}});const a=new Sr(r);return new ed(o,a,i.fieldTransforms)}(r,"updateDoc",e._key,t),Kd(i,[o.toMutation(e._key,Aa.exists(!0))])}function $d(e,t){const n=Zi(e.firestore,Hh),s=Fh(e),i=function(e,t){let n;return n=e?e.toFirestore(t):t,n}(e.converter,t);return Kd(n,[rd(id(e.firestore),"addDoc",s._key,i,null!==e.converter,{}).toMutation(s._key,Aa.exists(!1))]).then(()=>s)}function Hd(e,...t){e=P(e);let n={includeMetadataChanges:!1,source:"default"},s=0;"object"!=typeof t[s]||$h(t[s])||(n=t[s++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if($h(t[s])){const e=t[s];t[s]=e.next?.bind(e),t[s+1]=e.error?.bind(e),t[s+2]=e.complete?.bind(e)}let r,o,a;if(e instanceof jh)o=Zi(e.firestore,Hh),a=qo(e._key.path),r={next:n=>{t[s]&&t[s](Gd(o,e,n))},error:t[s+1],complete:t[s+2]};else{const n=Zi(e,Mh);o=Zi(n.firestore,Hh),a=n._query;const i=new Bd(o);r={next:e=>{t[s]&&t[s](new Ud(o,i,n,e))},error:t[s+1],complete:t[s+2]},function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new xi(Ii.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query)}return function(e,t,n,s){const i=new Th(s),r=new zu(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Mu(await Ch(e),r)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>ju(await Ch(e),r))}}(Kh(o),a,i,r)}function Kd(e,t){return function(e,t){const n=new Ei;return e.asyncQueue.enqueueAndForget(async()=>nh(await function(e){return kh(e).then(e=>e.syncEngine)}(e),t,n)),n.promise}(Kh(e),t)}function Gd(e,t,n){const s=n.docs.get(t._key),i=new Bd(e);return new jd(e,i,t._key,s,new Md(n.hasPendingWrites,n.fromCache),t.converter)}function Wd(...e){return new cd("arrayUnion",e)}function Qd(...e){return new ld("arrayRemove",e)}!function(e,t=!0){!function(e){di=e}(Xe),He(new O("firestore",(e,{instanceIdentifier:n,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new Hh(new Ni(e.getProvider("auth-internal")),new Pi(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new xi(Ii.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Br(e.options.projectId,t)}(i,n),i);return s={useFetchStreams:t,...s},r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),Ze(li,ui,e),Ze(li,ui,"esm2020")}();const Xd="@firebase/installations",Jd="0.6.19",Yd=1e4,Zd=`w:${Jd}`,ef="FIS_v2",tf=36e5,nf=new S("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function sf(e){return e instanceof E&&e.code.includes("request-failed")}
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
             */function rf({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function of(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function af(e,t){const n=(await t.json()).error;return nf.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function cf({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function lf(e,{refreshToken:t}){const n=cf(e);return n.append("Authorization",function(e){return`${ef} ${e}`}
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
             */(t)),n}async function uf(e){const t=await e();return t.status>=500&&t.status<600?e():t}
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
             */function hf(e){return new Promise(t=>{setTimeout(t,e)})}
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
const df=/^[cdef][\w-]{21}$/;function ff(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
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
             */(e);return df.test(t)?t:""}catch{return""}}function pf(e){return`${e.appName}!${e.appId}`}
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
             */const mf=new Map;function gf(e,t){const n=pf(e);yf(n,t),function(e,t){const n=(!wf&&"BroadcastChannel"in self&&(wf=new BroadcastChannel("[Firebase] FID Change"),wf.onmessage=e=>{yf(e.data.key,e.data.fid)}),wf);n&&n.postMessage({key:e,fid:t}),0===mf.size&&wf&&(wf.close(),wf=null)}(n,t)}function yf(e,t){const n=mf.get(e);if(n)for(const s of n)s(t)}let wf=null;
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
const vf="firebase-installations-store";let bf=null;function _f(){return bf||(bf=ne("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(vf)}})),bf}async function Tf(e,t){const n=pf(e),s=(await _f()).transaction(vf,"readwrite"),i=s.objectStore(vf),r=await i.get(n);return await i.put(t,n),await s.done,r&&r.fid===t.fid||gf(e,t.fid),t}async function If(e){const t=pf(e),n=(await _f()).transaction(vf,"readwrite");await n.objectStore(vf).delete(t),await n.done}async function xf(e,t){const n=pf(e),s=(await _f()).transaction(vf,"readwrite"),i=s.objectStore(vf),r=await i.get(n),o=t(r);return void 0===o?await i.delete(n):await i.put(o,n),await s.done,!o||r&&r.fid===o.fid||gf(e,o.fid),o}
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
             */async function Ef(e){let t;const n=await xf(e.appConfig,n=>{const s=function(e){const t=e||{fid:ff(),registrationStatus:0};return Cf(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(nf.create("app-offline"))};const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},s=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const s=rf(e),i=cf(e),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:ef,appId:e.appId,sdkVersion:Zd},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await uf(()=>fetch(s,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:of(e.authToken)}}throw await af("Create Installation",c)}(e,t);return Tf(e.appConfig,n)}catch(n){throw sf(n)&&409===n.customData.serverCode?await If(e.appConfig):await Tf(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:s}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Sf(e)}:{installationEntry:t}}(e,s);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Sf(e){let t=await kf(e.appConfig);for(;1===t.registrationStatus;)await hf(100),t=await kf(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Ef(e);return n||t}return t}function kf(e){return xf(e,e=>{if(!e)throw nf.create("installation-not-found");return Cf(e)})}function Cf(e){return 1===(t=e).registrationStatus&&t.registrationTime+Yd<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
             */}async function Nf({appConfig:e,heartbeatServiceProvider:t},n){const s=function(e,{fid:t}){return`${rf(e)}/${t}/authTokens:generate`}
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
             */(e,n),i=lf(e,n),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:Zd,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await uf(()=>fetch(s,a));if(c.ok)return of(await c.json());throw await af("Generate Auth Token",c)}async function Af(e,t=!1){let n;const s=await xf(e.appConfig,s=>{if(!Rf(s))throw nf.create("not-registered");const i=s.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+tf}(e)}(i))return s;if(1===i.requestStatus)return n=async function(e,t){let n=await Df(e.appConfig);for(;1===n.authToken.requestStatus;)await hf(100),n=await Df(e.appConfig);const s=n.authToken;return 0===s.requestStatus?Af(e,t):s}(e,t),s;{if(!navigator.onLine)throw nf.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(s);return n=async function(e,t){try{const n=await Nf(e,t),s={...t,authToken:n};return await Tf(e.appConfig,s),n}catch(n){if(!sf(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await Tf(e.appConfig,n)}else await If(e.appConfig);throw n}}(e,t),t}});return n?await n:s.authToken}function Df(e){return xf(e,e=>{if(!Rf(e))throw nf.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Yd<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
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
             */})}function Rf(e){return void 0!==e&&2===e.registrationStatus}
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
async function Pf(e,t=!1){const n=e;return await async function(e){const{registrationPromise:t}=await Ef(e);t&&await t}
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
             */(n),(await Af(n,t)).token}function Of(e){return nf.create("missing-app-config-values",{valueName:e})}
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
             */const Lf="installations",Mf=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Of("App Configuration");if(!e.name)throw Of("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Of(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Ke(t,"heartbeat"),_delete:()=>Promise.resolve()}},jf=e=>{const t=Ke(e.getProvider("app").getImmediate(),Lf).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:s}=await Ef(t);return s?s.catch(console.error):Af(t).catch(console.error),n.fid}(t),getToken:e=>Pf(t,e)}};He(new O(Lf,Mf,"PUBLIC")),He(new O("installations-internal",jf,"PRIVATE")),Ze(Xd,Jd),Ze(Xd,Jd,"esm2020");
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
const Vf="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Uf="google.c.a.c_id",Ff=1e4;var qf,Bf;
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
function zf(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function $f(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),s=new Uint8Array(n.length);for(let i=0;i<n.length;++i)s[i]=n.charCodeAt(i);return s}
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
             */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(qf||(qf={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(Bf||(Bf={}));const Hf="fcm_token_details_db",Kf="fcm_token_object_Store",Gf="firebase-messaging-store";let Wf=null;function Qf(){return Wf||(Wf=ne("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(Gf)}})),Wf}async function Xf(e){const t=Yf(e),n=await Qf(),s=await n.transaction(Gf).objectStore(Gf).get(t);if(s)return s;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(Hf))return null}let t=null;return(await ne(Hf,5,{upgrade:async(n,s,i,r)=>{if(s<2)return;if(!n.objectStoreNames.contains(Kf))return;const o=r.objectStore(Kf),a=await o.index("fcmSenderId").get(e);if(await o.clear(),a)if(2===s){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:zf(e.vapidKey)}}}else if(3===s){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:zf(e.auth),p256dh:zf(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:zf(e.vapidKey)}}}else if(4===s){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:zf(e.auth),p256dh:zf(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:zf(e.vapidKey)}}}}})).close(),await se(Hf),await se("fcm_vapid_details_db"),await se("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
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
             */(t)?t:null}(e.appConfig.senderId);if(t)return await Jf(e,t),t}}async function Jf(e,t){const n=Yf(e),s=(await Qf()).transaction(Gf,"readwrite");return await s.objectStore(Gf).put(t,n),await s.done,t}function Yf({appConfig:e}){return e.appId}
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
             */const Zf=new S("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function ep({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function tp({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function np({p256dh:e,auth:t,endpoint:n,vapidKey:s}){const i={web:{endpoint:n,auth:t,p256dh:e}};return s!==Vf&&(i.web.applicationPubKey=s),i}
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
             */async function sp(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:$f(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:zf(t.getKey("auth")),p256dh:zf(t.getKey("p256dh"))},s=await Xf(e.firebaseDependencies);if(s){if(function(e,t){const n=t.vapidKey===e.vapidKey,s=t.endpoint===e.endpoint,i=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&s&&i&&r}
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
             */(s.subscriptionOptions,n))return Date.now()>=s.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await tp(e),s=np(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(s)};let r;try{const n=await fetch(`${ep(e.appConfig)}/${t.token}`,i);r=await n.json()}catch(o){throw Zf.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const e=r.error.message;throw Zf.create("token-update-failed",{errorInfo:e})}if(!r.token)throw Zf.create("token-update-no-token");return r.token}(e.firebaseDependencies,t),s={...t,token:n,createTime:Date.now()};return await Jf(e.firebaseDependencies,s),n}catch(n){throw n}}(e,{token:s.token,createTime:Date.now(),subscriptionOptions:n}):s.token;try{await async function(e,t){const n={method:"DELETE",headers:await tp(e)};try{const s=await fetch(`${ep(e.appConfig)}/${t}`,n),i=await s.json();if(i.error){const e=i.error.message;throw Zf.create("token-unsubscribe-failed",{errorInfo:e})}}catch(s){throw Zf.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}(e.firebaseDependencies,s.token)}catch(i){console.warn(i)}return ip(e.firebaseDependencies,n)}return ip(e.firebaseDependencies,n)}async function ip(e,t){const n=
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
             */await async function(e,t){const n=await tp(e),s=np(t),i={method:"POST",headers:n,body:JSON.stringify(s)};let r;try{const t=await fetch(ep(e.appConfig),i);r=await t.json()}catch(o){throw Zf.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const e=r.error.message;throw Zf.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw Zf.create("token-subscribe-no-token");return r.token}(e,t),s={token:n,createTime:Date.now(),subscriptionOptions:t};return await Jf(e,s),s.token}function rp(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const s=t.notification.body;s&&(e.notification.body=s);const i=t.notification.image;i&&(e.notification.image=i);const r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const s=t.fcmOptions?.analytics_label;s&&(e.fcmOptions.analyticsLabel=s)}
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
             */(t,e),t}function op(e){return Zf.create("missing-app-config-values",{valueName:e})}
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
             */class ap{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=
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
function(e){if(!e||!e.options)throw op("App Configuration Object");if(!e.name)throw op("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const s of t)if(!n[s])throw op(s);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:s,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
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
             */async function cp(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const s=setTimeout(()=>n(new Error("Service worker not registered after 10000 ms")),Ff),i=e.installing||e.waiting;e.active?(clearTimeout(s),t()):i?i.onstatechange=e=>{"activated"===e.target?.state&&(i.onstatechange=null,clearTimeout(s),t())}:(clearTimeout(s),n(new Error("No incoming service worker found.")))})}
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
             */(e.swRegistration)}catch(t){throw Zf.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}
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
async function lp(e,t){if(!navigator)throw Zf.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw Zf.create("permission-blocked");
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
             */return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Vf)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await cp(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw Zf.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),sp(e)}
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
             */async function up(e,t,n){const s=function(e){switch(e){case Bf.NOTIFICATION_CLICKED:return"notification_open";case Bf.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
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
             */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:n[Uf],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function hp(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===Bf.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(rp(n)):e.onMessageHandler.next(rp(n)));const s=n.data;var i;"object"==typeof(i=s)&&i&&Uf in i&&"1"===s["google.c.a.e"]&&await up(e,n.messageType,s)}const dp="@firebase/messaging",fp="0.12.23",pp=e=>{const t=new ap(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>hp(t,e)),t},mp=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>lp(t,e)}};
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
async function gp(){try{await x()}catch(e){return!1}return"undefined"!=typeof window&&I()&&!("undefined"==typeof navigator||!navigator.cookieEnabled)&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
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
             */He(new O("messaging",pp,"PUBLIC")),He(new O("messaging-internal",mp,"PRIVATE")),Ze(dp,fp),Ze(dp,fp,"esm2020");const yp=Je({apiKey:"AIzaSyC9n94D10gIhWOcMDIxY9VGVd74Z_KwV9s",authDomain:"phtv-12f95.firebaseapp.com",projectId:"phtv-12f95",storageBucket:"phtv-12f95.firebasestorage.app",messagingSenderId:"284029899446",appId:"1:284029899446:web:e35d687e96984da208cc17",measurementId:"G-Q8VZEWTV71"}),wp=function(e=Ye()){const t=Ke(e,"auth");if(t.isInitialized())return t.getImmediate();const n=
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
function(e,t){const n=Ke(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(C(n.getOptions(),t??{}))return e;mt(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:$s,persistence:[rs,Bn,$n]}),s=p("authTokenSyncURL");if(s&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=(i=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Ws)return;const s=t?.token;Qs!==s&&(Qs=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))});!function(e,t,n){P(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,s){P(e).onIdTokenChanged(t,n,s)}(n,e=>t(e))}}var i;const r=d("auth");return r&&Tn(n,`http://${r}`),n}(yp),vp=new Dn,bp=function(e){const t="object"==typeof e?e:Ye(),n="string"==typeof e?e:qr,s=Ke(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const e=(e=>{const t=d(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),s]:[t.substring(0,n),s]})("firestore");e&&Lh(s,...e)}return s}(yp);let _p=null;try{"undefined"!=typeof window&&"serviceWorker"in navigator&&(_p=function(e=Ye()){return gp().then(e=>{if(!e)throw Zf.create("unsupported-browser")},e=>{throw Zf.create("indexed-db-unsupported")}),Ke(P(e),"messaging").getImmediate()}(yp))}catch(Kp){console.warn("Firebase Messaging not supported in this environment",Kp)}const Tp=_p,Ip=async()=>{if(!Tp)return null;try{if("granted"===await Notification.requestPermission()){const e=await async function(e,t){return lp(e=P(e),t)}(Tp,{vapidKey:"BBRYtxAxyPFsNig0j0PfS9j9PPkK5mKkUr6dZ3QcMYgYNYnD1RGDVBdbt6TlxAbt_FnDbPv6MKOnBMlTtN1Jjqo"});return console.log("FCM Token:",e),e}}catch(e){console.error("An error occurred while retrieving token:",e)}};class xp{constructor(e=0,t="Network Error"){this.status=e,this.text=t}}const Ep={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},Sp=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},kp=async(e,t,n={})=>{const s=await fetch(Ep.origin+e,{method:"POST",headers:n,body:t}),i=await s.text(),r=new xp(s.status,i);if(s.ok)return r;throw r},Cp=(e,t,n)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n||"string"!=typeof n)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},Np=e=>e.webdriver||!e.languages||0===e.languages.length,Ap=()=>new xp(451,"Unavailable For Headless Browser"),Dp=(e,t)=>{if((e=>!e.list?.length||!e.watchVariable)(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const n=((e,t)=>e instanceof FormData?e.get(t):e[t])(t,e.watchVariable);return"string"==typeof n&&e.list.includes(n)},Rp=()=>new xp(403,"Forbidden"),Pp=async(e,t,n)=>{if(!t.throttle||!n)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"})(t.throttle,t.id);const s=t.id||e,i=await(async(e,t,n)=>{const s=Number(await n.get(e)||0);return t-Date.now()+s})(s,t.throttle,n);return i>0||(await n.set(s,Date.now().toString()),!1)},Op=()=>new xp(429,"Too Many Requests"),Lp=(e,t="https://api.emailjs.com")=>{if(!e)return;const n=Sp(e);Ep.publicKey=n.publicKey,Ep.blockHeadless=n.blockHeadless,Ep.storageProvider=n.storageProvider,Ep.blockList=n.blockList,Ep.limitRate=n.limitRate,Ep.origin=n.origin||t},Mp=async(e,t,n,s)=>{const i=Sp(s),r=i.publicKey||Ep.publicKey,o=i.blockHeadless||Ep.blockHeadless,a=i.storageProvider||Ep.storageProvider,c={...Ep.blockList,...i.blockList},l={...Ep.limitRate,...i.limitRate};if(o&&Np(navigator))return Promise.reject(Ap());if(Cp(r,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(n),n&&Dp(c,n))return Promise.reject(Rp());if(await Pp(location.pathname,l,a))return Promise.reject(Op());const u={lib_version:"4.4.1",user_id:r,service_id:e,template_id:t,template_params:n};return kp("/api/v1.0/email/send",JSON.stringify(u),{"Content-type":"application/json"})},jp=[{id:"bug",label:"Bug",color:"text-white",bg:"bg-red-600 shadow-lg shadow-red-900/40"},{id:"enhancement",label:"Enhancement",color:"text-white",bg:"bg-rose-500 shadow-lg shadow-rose-900/40"},{id:"feature",label:"Feature",color:"text-white",bg:"bg-blue-600 shadow-lg shadow-blue-900/40"},{id:"question",label:"Question",color:"text-white",bg:"bg-emerald-600 shadow-lg shadow-emerald-900/40"},{id:"help",label:"Help Wanted",color:"text-white",bg:"bg-orange-600 shadow-lg shadow-orange-900/40"}],Vp=["admin@phtv.com","phamhungtien.contact@gmail.com","hungtien10a7@gmail.com"],Up=["pham hung tien"],Fp=(e,t,n)=>{if(n)return!0;const s=(t||"").toLowerCase().trim();if(s&&Vp.includes(s))return!0;const i=(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return!!i&&Up.includes(i)},qp=e=>e?e.split(" ").map(e=>e[0]).join("").toUpperCase().substring(0,2):"??",Bp=e=>{if(!e)return"...";const t="number"==typeof e?e:e.toMillis?.()||Date.now(),n=Date.now()-t,s=Math.floor(n/1e3),i=Math.floor(s/60),r=Math.floor(i/60),o=Math.floor(r/24);return s<60?"Vừa xong":i<60?`${i}p`:r<24?`${r}h`:o<7?`${o} ngày`:new Date(t).toLocaleDateString("vi-VN")},zp=(e,t=180)=>{const n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t).trimEnd()}...`},$p=e=>[...e.replies||[]].filter(e=>Fp(e.author,e.authorEmail,e.isAdmin)).sort((e,t)=>t.timestamp-e.timestamp)[0]??null,Hp=({content:e,className:t})=>{const i=e.split(/(`[^`]+`|@[a-zA-Z0-9_]+|https?:\/\/[^\s]+)/g);return n.jsx("div",{className:`min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed ${t}`,children:i.map((e,t)=>e.startsWith("`")&&e.endsWith("`")?n.jsx("code",{className:"inline max-w-full break-all rounded border border-white/5 bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-rose-300 [overflow-wrap:anywhere]",children:e.slice(1,-1)},t):e.startsWith("@")?n.jsx("span",{className:"break-all font-black text-rose-400 [overflow-wrap:anywhere] hover:underline cursor-pointer",children:e},t):e.startsWith("http")?n.jsxs("a",{href:e,target:"_blank",rel:"noopener noreferrer",className:"inline break-all text-blue-400 underline [overflow-wrap:anywhere] transition-colors hover:text-blue-300",children:[e.length>40?e.substring(0,40)+"...":e," ",n.jsx(s.ExternalLink,{size:10,className:"ml-1 inline-block align-baseline"})]},t):n.jsx("span",{className:"text-slate-200 [overflow-wrap:anywhere]",children:e},t))})};e("QASection",()=>{const[e,t]=i.useState([]),[r,o]=i.useState([]),[a,c]=i.useState(null),[l,u]=i.useState(""),[h,d]=i.useState(null),[f,p]=i.useState("newest"),[m,g]=i.useState("all"),[y,w]=i.useState(""),[v,b]=i.useState(new Set),[_,T]=i.useState(!1),[I,x]=i.useState(!1),[E,S]=i.useState(!1),[k,C]=i.useState(""),[N,A]=i.useState(!1),[D,R]=i.useState(0),[O,L]=i.useState({show:!1,message:""}),[M,j]=i.useState(15),[V,U]=i.useState(!0),[F,q]=i.useState(!0),[B,z]=i.useState(null),[$,H]=i.useState(""),[K,G]=i.useState(null),[W,Q]=i.useState(null),[X,J]=i.useState(""),Y=i.useRef(new Set);i.useEffect(()=>{Lp("BaMMIrujdXkrbCwLH")},[]),i.useEffect(()=>{const e=function(e,t,n,s){return P(e).onAuthStateChanged(t,n,s)}(wp,e=>{if(e){const t=Vp.includes(e.email||"");c({uid:e.uid,username:"phamhungtien.contact@gmail.com"===e.email?"Phạm Hùng Tiến":e.displayName||e.email?.split("@")[0]||"User",email:e.email||"",photoURL:e.photoURL||void 0,isAdmin:t})}else c(null)});return()=>e()},[]),i.useEffect(()=>{if(!a)return;const e=Hd(Ed(Uh(bp,"notifications"),function(e,t,n){const s=t,i=Td("where",e);return Sd._create(i,s,n)}("recipientId","==",a.uid),Nd("timestamp","desc"),Dd(20)),e=>{o(e.docs.map(e=>({id:e.id,...e.data()})))});return()=>e()},[a]),i.useEffect(()=>{const e=Hd(Ed(Uh(bp,"questions"),Nd("timestamp","desc"),Dd(M)),e=>{let n=e.docs.map(e=>({id:e.id,...e.data()}));"popular"===f?n=n.sort((e,t)=>(t.likedBy?.length||0)-(e.likedBy?.length||0)):"trending"===f&&(n=n.sort((e,t)=>{const n=(e.likedBy?.length||0)+2*(e.replies?.length||0)+.5*(e.viewCount||0);return(t.likedBy?.length||0)+2*(t.replies?.length||0)+.5*(t.viewCount||0)-n}));const s=n.filter(e=>e.isPinned),i=n.filter(e=>!e.isPinned);t([...s,...i]),U(e.docs.length>=M),q(!1)});return()=>e()},[f,M]);const Z=i.useMemo(()=>r.filter(e=>!e.isRead).length,[r]),ee=i.useMemo(()=>{let t=e;if("mine"===m&&a?t=t.filter(e=>e.authorId===a.uid):"reported"===m&&a?.isAdmin?t=t.filter(e=>e.isReported):"unanswered"===m&&(t=t.filter(e=>!e.replies.some(e=>Fp(e.author,e.authorEmail,e.isAdmin)))),y.trim()){const e=y.toLowerCase();t=t.filter(t=>t.content.toLowerCase().includes(e)||t.author.toLowerCase().includes(e)||t.replies.some(t=>t.content.toLowerCase().includes(e)))}return t},[e,m,y,a]),te=i.useMemo(()=>{const t=e.filter(e=>e.replies.some(e=>Fp(e.author,e.authorEmail,e.isAdmin))).length,n=e.filter(e=>e.isLocked).length,s=Math.max(e.length-t,0),i=e.reduce((e,t)=>e+(t.replies?.length||0),0);return{total:e.length,responded:t,pending:s,locked:n,totalReplies:i}},[e]),ne=e=>{L({show:!0,message:e}),setTimeout(()=>L({show:!1,message:""}),3e3)},se=async(e,t,n,s)=>{a&&e!==a.uid&&await $d(Uh(bp,"notifications"),{recipientId:e,senderName:a.username,senderPhoto:a.photoURL||null,type:t,questionId:n,content:s,timestamp:Date.now(),isRead:!1})},ie=async e=>{var t;window.confirm("Xóa thảo luận này?")&&(await(t=Fh(bp,"questions",e),Kd(Zi(t.firestore,Hh),[new za(t._key,Aa.none())])),ne("Đã xóa bài."))},re=(e,t)=>{if(!a)return void T(!0);if(e.isLocked&&!a.isAdmin)return void ne("Thảo luận này đã khóa.");b(t=>{const n=new Set(t);return n.add(e.id),n});const n={qId:e.id,rId:t?.id,name:t?.author||e.author,authorId:t?.authorId||e.authorId,authorEmail:t?.authorEmail||e.authorEmail};B?.qId===n.qId&&B?.rId===n.rId||H(""),z(n)},oe=e=>{if(!((e.replies?.length||0)>0))return void re(e);const t=v.has(e.id);b(n=>{const s=new Set(n);return t?s.delete(e.id):s.add(e.id),s}),t&&B?.qId===e.id&&(z(null),H(""))},ae=({user:e,size:t="w-10 h-10",isAdmin:s})=>{const i=e.isAdmin??s;return n.jsx("div",{className:`${t} rounded-2xl flex items-center justify-center text-white font-black overflow-hidden shadow-lg shrink-0 ${i?"bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 ring-1 ring-rose-300/40":"bg-slate-800 border border-white/5"}`,children:e.photoURL?n.jsx("img",{src:e.photoURL,alt:e.username,className:"w-full h-full object-cover"}):n.jsx("span",{className:t.includes("w-8")?"text-[9px]":"text-sm",children:qp(e.username)})})},ce=()=>n.jsxs("div",{className:"rounded-[1.5rem] p-6 md:p-8 bg-white/[0.018] border border-white/5 animate-pulse space-y-6",children:[n.jsxs("div",{className:"flex gap-6",children:[n.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 shrink-0"}),n.jsxs("div",{className:"flex-1 space-y-3 pt-2",children:[n.jsx("div",{className:"h-3 bg-white/10 rounded-full w-1/4"}),n.jsx("div",{className:"h-2 bg-white/5 rounded-full w-1/6"})]})]}),n.jsxs("div",{className:"space-y-2 pl-16",children:[n.jsx("div",{className:"h-3 bg-white/5 rounded-full w-full"}),n.jsx("div",{className:"h-3 bg-white/5 rounded-full w-5/6"})]})]});return n.jsxs("div",{className:"phtv-community mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-6 md:py-10",children:[n.jsxs("div",{className:"phtv-community-layout grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start",children:[n.jsxs("aside",{className:"phtv-community-aside order-2 space-y-4 lg:order-1 lg:sticky lg:top-24",children:[n.jsxs("section",{className:"rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur",children:[n.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("p",{className:"text-[10px] font-black uppercase tracking-[0.24em] text-slate-500",children:"Tổng quan"}),n.jsx("h3",{className:"mt-1 text-lg font-black tracking-tight text-white",children:"Tình trạng thảo luận"})]}),n.jsx("span",{className:"rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300",children:"Live"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[n.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Tổng bài"}),n.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.total})]}),n.jsxs("div",{className:"rounded-2xl border border-emerald-400/12 bg-emerald-400/[0.045] p-3",children:[n.jsx("p",{className:"text-[10px] font-semibold text-emerald-200",children:"Đã phản hồi"}),n.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.responded})]}),n.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[n.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Đang chờ"}),n.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.pending})]}),n.jsxs("div",{className:"rounded-2xl border border-white/[0.055] bg-white/[0.022] p-3",children:[n.jsx("p",{className:"text-[10px] font-semibold text-slate-400",children:"Phản hồi"}),n.jsx("p",{className:"mt-2 text-2xl font-black text-white tabular-nums",children:te.totalReplies})]})]}),n.jsxs("div",{className:"mt-4 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-4",children:[n.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold text-white",children:[n.jsx(s.ShieldCheck,{size:15,className:"text-rose-400"}),"Lưu ý ngắn"]}),n.jsx("p",{className:"mt-2 text-sm leading-6 text-slate-400",children:"Ưu tiên mô tả rõ lỗi, bước tái hiện và phiên bản đang dùng để admin phản hồi nhanh hơn."})]})]}),n.jsxs("section",{className:"rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300",children:n.jsx(s.MessageSquare,{size:18})}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-base font-black tracking-tight text-white",children:"Kênh hỗ trợ"}),n.jsx("p",{className:"text-sm text-slate-400",children:"Cần trao đổi nhanh hơn thì vào Discord."})]})]}),n.jsxs("a",{href:"https://discord.gg/hm2C4tbaDz",target:"_blank",rel:"noopener noreferrer",className:"mt-4 flex items-center justify-between rounded-2xl border border-[#5865F2]/25 bg-[#5865F2]/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5865F2]/15",children:[n.jsx("span",{children:"Vào Discord hỗ trợ"}),n.jsx(s.ArrowRight,{size:15,className:"text-[#aeb7ff]"})]})]})]}),n.jsxs("main",{className:"phtv-community-main order-1 space-y-5 lg:order-2",children:[n.jsxs("section",{className:"phtv-community-toolbar rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6",children:[n.jsxs("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",children:[n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full border border-white/[0.055] bg-white/[0.022] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400",children:[n.jsx(s.Info,{size:12,className:"text-rose-400"}),"Thảo luận PHTV"]}),n.jsx("div",{children:n.jsx("h2",{className:"text-3xl font-black tracking-tight text-white md:text-[2.15rem]",children:"Thảo luận PHTV"})})]}),n.jsx("div",{className:"flex flex-wrap items-center gap-3 lg:justify-end",children:a?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"relative",children:[n.jsxs("button",{onClick:()=>S(!E),className:"relative flex h-11 w-11 items-center justify-center rounded-2xl border transition "+(E?"border-white bg-white text-slate-950":"border-white/[0.055] bg-white/[0.022] text-slate-300 hover:bg-white/[0.04] hover:text-white"),"aria-label":"Xem thông báo",children:[n.jsx(s.Bell,{size:16}),Z>0&&n.jsx("span",{className:"absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white",children:Z})]}),E&&n.jsxs("div",{className:"fixed inset-x-4 top-24 z-[150] overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-14 sm:w-[340px]",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 px-4 py-3",children:[n.jsx("span",{className:"text-sm font-semibold text-white",children:"Thông báo"}),n.jsx("button",{onClick:()=>S(!1),className:"text-slate-500 transition hover:text-white",children:n.jsx(s.X,{size:16})})]}),n.jsx("div",{className:"max-h-[360px] overflow-y-auto custom-scrollbar",children:0===r.length?n.jsx("div",{className:"p-8 text-center text-sm text-slate-500",children:"Chưa có thông báo nào."}):r.map(e=>n.jsxs("button",{onClick:()=>{(async e=>{await zd(Fh(bp,"notifications",e),{isRead:!0})})(e.id),S(!1)},className:"flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition "+(e.isRead?"bg-transparent opacity-60":"bg-rose-500/[0.04] hover:bg-rose-500/[0.08]"),children:[n.jsx(ae,{user:{username:e.senderName,photoURL:e.senderPhoto},size:"w-8 h-8"}),n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsxs("p",{className:"text-sm leading-5 text-white",children:[n.jsx("span",{className:"font-semibold",children:e.senderName})," ","reply"===e.type?"đã phản hồi bạn.":"đã tương tác với bài viết."]}),n.jsx("p",{className:"mt-1 text-xs text-slate-400",children:Bp(e.timestamp)})]})]},e.id))})]})]}),n.jsxs("div",{className:"flex items-center gap-3 rounded-[1.4rem] border border-white/[0.055] bg-white/[0.022] px-3 py-2",children:[n.jsx(ae,{user:a,size:"w-9 h-9",isAdmin:a.isAdmin}),n.jsxs("div",{className:"min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("p",{className:"truncate text-sm font-semibold text-white",children:a.username}),a.isAdmin&&n.jsx(s.CheckCircle2,{size:14,className:"text-rose-400"})]}),n.jsxs("div",{className:"mt-1 flex items-center gap-3 text-xs text-slate-400",children:[n.jsx("button",{onClick:()=>{C(a.username),x(!0)},className:"transition hover:text-white",children:"Sửa tên"}),n.jsx("button",{onClick:()=>function(e){return P(e).signOut()}(wp),className:"transition hover:text-white",children:"Đăng xuất"})]})]})]})]}):n.jsxs("button",{onClick:()=>T(!0),className:"inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90",children:[n.jsx(s.User,{size:15}),"Đăng nhập Google"]})})]}),n.jsxs("div",{className:"mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_auto]",children:[n.jsxs("label",{className:"relative block",children:[n.jsx(s.Search,{className:"pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",size:16}),n.jsx("input",{id:"search-input",name:"search",type:"text",placeholder:"Tìm nội dung, thành viên hoặc tình trạng xử lý...",value:y,onChange:e=>w(e.target.value),className:"w-full rounded-2xl border border-white/[0.055] bg-white/[0.022] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30"})]}),n.jsx("div",{className:"grid grid-cols-3 gap-1 rounded-2xl border border-white/[0.055] bg-white/[0.022] p-1",children:[{id:"newest",label:"Mới nhất",icon:s.RefreshCw},{id:"trending",label:"Xu hướng",icon:s.Sparkles},{id:"popular",label:"Yêu thích",icon:s.Award}].map(e=>n.jsxs("button",{onClick:()=>p(e.id),className:"flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition "+(f===e.id?"bg-white text-slate-950":"text-slate-300 hover:bg-white/[0.04] hover:text-white"),children:[n.jsx(e.icon,{size:14}),n.jsx("span",{children:e.label})]},e.id))}),n.jsxs("label",{className:"flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm text-slate-300",children:[n.jsx(s.Filter,{size:14,className:"text-rose-400"}),n.jsxs("select",{id:"filter-select",name:"filter",value:m,onChange:e=>g(e.target.value),className:"w-full bg-transparent text-sm text-white outline-none",children:[n.jsx("option",{value:"all",className:"bg-slate-900",children:"Tất cả"}),n.jsx("option",{value:"mine",className:"bg-slate-900",children:"Bài của tôi"}),n.jsx("option",{value:"unanswered",className:"bg-slate-900",children:"Chưa có phản hồi admin"}),a?.isAdmin&&n.jsx("option",{value:"reported",className:"bg-slate-900",children:"Bài bị báo cáo"})]})]})]})]}),n.jsx("section",{className:"phtv-community-composer rounded-[2rem] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur md:p-6",children:n.jsxs("form",{onSubmit:async e=>{if(e.preventDefault(),a){if(l.trim()&&!N)if(Date.now()-D<1e4&&!a.isAdmin)ne("Hãy chậm lại (10s)!");else{A(!0);try{await $d(Uh(bp,"questions"),{authorId:a.uid,authorEmail:a.email,author:a.username,authorPhoto:a.photoURL||null,content:l,timestamp:Date.now(),replies:[],likedBy:[],isPinned:!1,isReported:!1,isLocked:!1,viewCount:0,isAdmin:a.isAdmin,label:h}),u(""),d(null),R(Date.now()),ne("Đã đăng thảo luận!")}catch(t){alert("Lỗi!")}finally{A(!1)}}}else T(!0)},className:"space-y-4",children:[n.jsxs("div",{className:"flex items-start gap-3",children:[n.jsx(ae,{user:{username:a?.username||"User",photoURL:a?.photoURL,isAdmin:a?.isAdmin},size:"w-10 h-10",isAdmin:a?.isAdmin}),n.jsx("div",{className:"min-w-0 flex-1",children:n.jsx("textarea",{id:"new-question-input",name:"question",placeholder:a?"Mô tả ngắn gọn vấn đề hoặc câu hỏi của bạn...":"Đăng nhập Google để bắt đầu thảo luận...",value:l,onChange:e=>u(e.target.value),disabled:N,className:"min-h-[110px] w-full resize-none rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400/30",required:!0})})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[n.jsx("span",{className:"mr-1 text-xs font-semibold text-slate-400",children:"Phân loại:"}),jp.map(e=>n.jsx("button",{type:"button",onClick:()=>d(h===e.id?null:e.id),className:"rounded-full border px-3 py-1.5 text-xs font-semibold transition "+(h===e.id?`${e.bg} ${e.color} border-transparent`:"border-white/[0.06] bg-white/[0.022] text-slate-300 hover:bg-white/[0.05]"),children:e.label},e.id))]}),n.jsxs("div",{className:"flex flex-col gap-3 border-t border-white/[0.055] pt-4 sm:flex-row sm:items-center sm:justify-between",children:[n.jsx("p",{className:"text-sm text-slate-400",children:"Viết rõ lỗi, bước tái hiện hoặc phiên bản để người khác và admin dễ hỗ trợ hơn."}),n.jsxs("button",{type:"submit",disabled:N||!l.trim(),className:"inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",children:[N?n.jsx(s.RefreshCw,{className:"animate-spin",size:15}):n.jsx(s.Send,{size:15}),n.jsx("span",{children:"Đăng thảo luận"})]})]})]})}),n.jsxs("section",{className:"space-y-4 pb-20",children:[F?n.jsx("div",{className:"space-y-4",children:[1,2,3].map(e=>n.jsx(ce,{},e))}):0===ee.length?n.jsxs("div",{className:"rounded-[2rem] border border-dashed border-white/[0.06] bg-white/[0.018] px-6 py-20 text-center",children:[n.jsx(s.MessageSquare,{size:34,className:"mx-auto text-slate-600"}),n.jsx("p",{className:"mt-4 text-base font-semibold text-white",children:"Chưa có nội dung phù hợp."}),n.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Thử đổi bộ lọc hoặc đăng câu hỏi mới."})]}):ee.map(e=>{const t=jp.find(t=>t.id===e.label),i=$p(e),r=(e=>[...e.replies||[]].sort((e,t)=>e.timestamp-t.timestamp))(e),o=(e=>{const t=$p(e);return e.isLocked&&!t?{label:"Đã khóa",note:"Thảo luận đã khóa",icon:s.Lock,containerClassName:"border-white/[0.06] bg-white/[0.022]",badgeClassName:"border-white/[0.06] bg-white/[0.04] text-slate-300"}:t?/(đã fix|đã sửa|fixed|resolved|đã xử lý|đã khắc phục|đã cập nhật|đã release|đã ra bản)/i.test(t.content)?{label:"Đã xử lý",note:"Admin xác nhận đã xử lý",icon:s.CheckCircle2,containerClassName:"border-emerald-300/16 bg-emerald-400/[0.055]",badgeClassName:"border-emerald-300/16 bg-emerald-400/[0.12] text-emerald-200"}:{label:"Đã phản hồi",note:"Admin đã có cập nhật",icon:s.ShieldCheck,containerClassName:"border-rose-300/16 bg-rose-400/[0.055]",badgeClassName:"border-rose-300/16 bg-rose-400/[0.12] text-rose-200"}:{label:"Chưa phản hồi",note:"Đang chờ admin xem",icon:s.MessageSquareReply,containerClassName:"border-white/[0.055] bg-white/[0.022]",badgeClassName:"border-white/[0.06] bg-white/[0.04] text-slate-300"}})(e),c=o.icon,l=e.replies?.length||0,u=v.has(e.id),h=Boolean(a?.isAdmin||a?.uid===e.authorId),d=Fp(e.author,e.authorEmail,e.isAdmin);return n.jsx("article",{className:"phtv-discussion-card rounded-[2rem] border bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(8,11,18,0.66))] p-5 shadow-[0_18px_52px_rgba(2,6,23,0.34)] backdrop-blur transition md:p-6 "+(e.isPinned?"border-rose-300/16":"border-white/[0.055]"),onPointerEnter:()=>(async e=>{if(!Y.current.has(e)){Y.current.add(e);try{await zd(Fh(bp,"questions",e),{viewCount:(t=1,new ud("increment",t))})}catch(n){Y.current.delete(e),console.error("Failed to increment question views",n)}var t}})(e.id),children:n.jsxs("div",{className:"flex gap-4",children:[n.jsx(ae,{user:{username:e.author,photoURL:e.authorPhoto,isAdmin:d},size:"w-11 h-11",isAdmin:d}),n.jsxs("div",{className:"min-w-0 flex-1 space-y-4",children:[n.jsxs("div",{className:"flex flex-col gap-3 md:flex-row md:items-start md:justify-between",children:[n.jsxs("div",{className:"min-w-0",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[n.jsx("h3",{className:"text-base font-black tracking-tight "+(d?"text-rose-300":"text-white"),children:e.author}),d&&n.jsx("span",{className:"rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:"Admin"}),t&&n.jsx("span",{className:`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${t.bg} ${t.color}`,children:t.label}),e.isPinned&&n.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full border border-rose-300/16 bg-rose-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:[n.jsx(s.Paperclip,{size:11}),"Ghim"]})]}),n.jsxs("div",{className:"mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400",children:[n.jsx("span",{children:Bp(e.timestamp)}),n.jsxs("span",{className:"inline-flex items-center gap-1",children:[n.jsx(s.Eye,{size:13}),e.viewCount||0]}),n.jsx("button",{onClick:()=>(async e=>{window.confirm("Báo cáo nội dung này?")&&(await zd(Fh(bp,"questions",e),{isReported:!0}),ne("Đã gửi báo cáo!"))})(e.id),className:"transition hover:text-white",children:"Báo cáo"})]})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[a?.isAdmin&&n.jsxs(n.Fragment,{children:[n.jsx("button",{onClick:()=>(async e=>{a?.isAdmin&&(await zd(Fh(bp,"questions",e.id),{isLocked:!e.isLocked}),ne(e.isLocked?"Đã mở khóa":"Đã khóa"))})(e),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":e.isLocked?"Mở khóa":"Khóa",children:e.isLocked?n.jsx(s.Lock,{size:14}):n.jsx(s.Unlock,{size:14})}),n.jsx("button",{onClick:()=>(async e=>{a?.isAdmin&&(await zd(Fh(bp,"questions",e.id),{isPinned:!e.isPinned}),ne(e.isPinned?"Đã bỏ ghim.":"Đã ghim thảo luận."))})(e),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":e.isPinned?"Bỏ ghim":"Ghim",children:n.jsx(s.Paperclip,{size:14})})]}),h&&n.jsxs(n.Fragment,{children:[n.jsx("button",{onClick:()=>{G(e.id),J(e.content)},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":"Sửa bài viết",children:n.jsx(s.Settings,{size:14})}),n.jsx("button",{onClick:()=>ie(e.id),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300","aria-label":"Xóa bài viết",children:n.jsx(s.Trash2,{size:14})})]})]})]}),K===e.id?n.jsxs("div",{className:"space-y-3",children:[n.jsx("textarea",{value:X,onChange:e=>J(e.target.value),className:"w-full rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),n.jsxs("div",{className:"flex flex-wrap gap-2",children:[n.jsx("button",{onClick:()=>(async e=>{X.trim()&&(await zd(Fh(bp,"questions",e),{content:X}),G(null),ne("Đã lưu."))})(e.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Lưu"}),n.jsx("button",{onClick:()=>G(null),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):n.jsx("div",{className:"phtv-discussion-content rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4",children:n.jsx(Hp,{content:u?e.content:zp(e.content,280),className:"text-sm leading-7 text-slate-200"})}),n.jsx("div",{className:`phtv-discussion-status rounded-[1.5rem] border p-4 ${o.containerClassName}`,children:n.jsxs("div",{className:"flex flex-col gap-4 md:flex-row md:items-start md:justify-between",children:[n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[n.jsxs("span",{className:`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${o.badgeClassName}`,children:[n.jsx(c,{size:14}),o.label]}),n.jsx("span",{className:"text-sm text-slate-300",children:o.note})]}),n.jsx("div",{className:"mt-3 space-y-2",children:i?n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"text-sm leading-6 text-slate-200",children:zp(i.content)}),n.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-xs text-slate-400",children:[n.jsx("span",{className:"font-semibold text-white",children:i.author}),n.jsx("span",{children:Bp(i.timestamp)})]})]}):n.jsx("p",{className:"text-sm leading-6 text-slate-400",children:"Admin chưa phản hồi trên thảo luận này."})})]}),n.jsxs("button",{onClick:()=>{u||oe(e)},className:"inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.055] bg-white/[0.022] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-white",children:[n.jsx(s.MessageSquareReply,{size:14}),l>0?"Mở thảo luận":"Phản hồi"]})]})}),n.jsxs("div",{className:"flex flex-wrap items-center gap-3 border-t border-white/[0.055] pt-1",children:[n.jsxs("button",{onClick:()=>(async e=>{if(!a)return void T(!0);const t=Fh(bp,"questions",e.id),n=e.likedBy?.includes(a.uid);await zd(t,{likedBy:n?Qd(a.uid):Wd(a.uid)}),n||se(e.authorId,"like",e.id,e.content.substring(0,50))})(e),className:"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition "+(e.likedBy?.includes(a?.uid||"")?"bg-rose-500/10 text-rose-300":"text-slate-400 hover:bg-white/[0.022] hover:text-white"),children:[n.jsx(s.ThumbsUp,{size:15,fill:e.likedBy?.includes(a?.uid||"")?"currentColor":"none"}),n.jsx("span",{children:e.likedBy?.length||0})]}),n.jsxs("button",{onClick:()=>oe(e),className:"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition "+(e.isLocked&&!a?.isAdmin?"cursor-not-allowed text-slate-600":"text-slate-400 hover:bg-white/[0.022] hover:text-white"),children:[n.jsx(s.MessageSquareReply,{size:15}),n.jsx("span",{children:l>0?u?`Ẩn ${l} phản hồi`:`Xem ${l} phản hồi`:"Phản hồi"})]})]}),(u||B?.qId===e.id)&&n.jsxs("div",{className:"space-y-4 border-t border-white/[0.055] pt-5",children:[r.length>0&&n.jsx("div",{className:"space-y-3",children:r.map(t=>{const i=Fp(t.author,t.authorEmail,t.isAdmin);return n.jsxs("div",{className:"flex gap-3",children:[n.jsx(ae,{user:{username:t.author,photoURL:t.authorPhoto,isAdmin:i},size:"w-9 h-9",isAdmin:i}),n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsxs("div",{className:"rounded-[1.4rem] border p-4 "+(i?"border-rose-300/16 bg-rose-400/[0.045]":"border-white/[0.055] bg-white/[0.022]"),children:[n.jsxs("div",{className:"mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[n.jsx("span",{className:"font-semibold "+(i?"text-rose-200":"text-white"),children:t.author}),i&&n.jsx("span",{className:"rounded-full border border-rose-300/16 bg-rose-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200",children:"Admin"}),t.replyToName&&n.jsxs("span",{className:"inline-flex items-center gap-1 text-xs text-slate-400",children:[n.jsx(s.ArrowRight,{size:12}),t.replyToName]}),n.jsx("span",{className:"text-xs text-slate-500",children:Bp(t.timestamp)})]}),(a?.isAdmin||a?.uid===t.authorId)&&n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("button",{onClick:()=>{Q(t.id),J(t.content)},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:bg-white/[0.04] hover:text-white","aria-label":"Sửa phản hồi",children:n.jsx(s.Settings,{size:13})}),n.jsx("button",{onClick:()=>(async(e,t)=>{if(!window.confirm("Xóa phản hồi này?"))return;const n=Fh(bp,"questions",e),s=await qd(n);if(!s.exists())return;const i=s.data().replies.filter(e=>e.id!==t);await zd(n,{replies:i}),ne("Đã xóa phản hồi.")})(e.id,t.id),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] p-2 text-slate-300 transition hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-300","aria-label":"Xóa phản hồi",children:n.jsx(s.Trash2,{size:13})})]})]}),W===t.id?n.jsxs("div",{className:"space-y-3",children:[n.jsx("textarea",{autoFocus:!0,value:X,onChange:e=>J(e.target.value),className:"w-full rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),n.jsxs("div",{className:"flex flex-wrap gap-2",children:[n.jsx("button",{onClick:()=>(async(e,t)=>{if(!X.trim())return;const n=Fh(bp,"questions",e),s=await qd(n);if(!s.exists())return;const i=s.data().replies.map(e=>e.id===t?{...e,content:X}:e);await zd(n,{replies:i}),Q(null),ne("Đã lưu.")})(e.id,t.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Lưu"}),n.jsx("button",{onClick:()=>Q(null),className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):n.jsx(Hp,{content:t.content,className:"text-sm leading-6 text-slate-200"})]}),n.jsxs("div",{className:"mt-2 flex flex-wrap items-center gap-3 px-2",children:[n.jsxs("button",{onClick:()=>(async(e,t)=>{if(!a)return void T(!0);const n=Fh(bp,"questions",e),s=await qd(n);if(!s.exists())return;let i;const r=s.data().replies.map(e=>{if(e.id===t){i=e;const t=e.likedBy||[],n=t.includes(a.uid);return{...e,likedBy:n?t.filter(e=>e!==a.uid):[...t,a.uid]}}return e});await zd(n,{replies:r}),i&&!i.likedBy.includes(a.uid)&&se(i.authorId,"like",e,i.content.substring(0,50))})(e.id,t.id),className:"inline-flex items-center gap-2 text-xs font-semibold transition "+(t.likedBy?.includes(a?.uid||"")?"text-rose-300":"text-slate-400 hover:text-white"),children:[n.jsx(s.ThumbsUp,{size:13,fill:t.likedBy?.includes(a?.uid||"")?"currentColor":"none"}),n.jsx("span",{children:t.likedBy?.length||0})]}),n.jsx("button",{onClick:()=>re(e,t),className:"text-xs font-semibold text-slate-400 transition hover:text-white",children:"Trả lời"})]})]})]},t.id)})}),B?.qId===e.id?n.jsxs("div",{className:"rounded-[1.5rem] border border-white/[0.055] bg-white/[0.022] p-4",children:[n.jsxs("div",{className:"mb-3 flex items-center justify-between gap-3",children:[n.jsxs("p",{className:"text-sm font-semibold text-white",children:["Đang phản hồi ",B.name?`@${B.name}`:"thảo luận này"]}),n.jsx("button",{onClick:()=>{z(null),H("")},className:"text-slate-500 transition hover:text-white",children:n.jsx(s.X,{size:14})})]}),n.jsx("textarea",{id:"reply-input",name:"reply",autoFocus:!0,value:$,onChange:e=>H(e.target.value),placeholder:"Viết phản hồi của bạn...",className:"min-h-[110px] w-full resize-none rounded-[1.25rem] border border-white/[0.055] bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-rose-400/30"}),n.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[n.jsx("button",{onClick:()=>(async e=>{if(!a||!B)return void T(!0);if(!$.trim())return;const t=Fh(bp,"questions",e),n=await qd(t);if(n.exists()&&n.data().isLocked&&!a.isAdmin)return void alert("Thảo luận này đã bị khóa!");const s={id:Date.now().toString(),parentId:B.rId||e,replyToName:B.name,authorId:a.uid,authorEmail:a.email,author:a.isAdmin?"Phạm Hùng Tiến":a.username,authorPhoto:a.photoURL||void 0,content:$,timestamp:Date.now(),isAdmin:a.isAdmin,likedBy:[]};await zd(t,{replies:Wd(s)});const i=B.authorId||n.data()?.authorId;i&&se(i,"reply",e,$.substring(0,50));const r=B.authorEmail||"phamhungtien.contact@gmail.com";r!==a.email?(console.log(`✉️ Attempting to send email to ${r}`),Mp("PHTV Community","template_qd4vozb",{to_email:r,recipient_name:B.name||"Thành viên PHTV",recipient_email:r,sender_name:a.username,message:$,link:window.location.href}).then(()=>console.log("✅ Email sent successfully to:",r),e=>console.error("❌ Email failed to send:",e))):console.log("⏭️ Skipping email (Self-reply or current user)"),H("")})(e.id),className:"rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950",children:"Gửi phản hồi"}),n.jsx("button",{onClick:()=>{z(null),H("")},className:"rounded-xl border border-white/[0.055] bg-white/[0.022] px-4 py-2 text-sm text-slate-300",children:"Hủy"})]})]}):n.jsxs("button",{onClick:()=>re(e),className:"inline-flex items-center gap-2 text-sm font-semibold text-rose-300 transition hover:text-rose-200",children:[n.jsx(s.MessageSquare,{size:15}),"Viết phản hồi"]})]})]})]})},e.id)}),V&&ee.length>=M&&n.jsx("div",{className:"pt-4 text-center",children:n.jsxs("button",{onClick:()=>j(e=>e+15),className:"inline-flex items-center gap-2 rounded-2xl border border-white/[0.055] bg-white/[0.022] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.04]",children:[n.jsx("span",{children:"Tải thêm thảo luận"}),n.jsx(s.ChevronDown,{size:15})]})})]})]})]}),_&&n.jsxs("div",{className:"fixed inset-0 z-[200] flex items-center justify-center p-6",children:[n.jsx("div",{className:"absolute inset-0 bg-slate-950/90 backdrop-blur-3xl",onClick:()=>T(!1)}),n.jsxs("div",{className:"relative w-full max-w-sm bg-slate-900 rounded-[3.5rem] p-12 border border-white/[0.06] shadow-2xl animate-in zoom-in-95",children:[n.jsx("button",{onClick:()=>T(!1),className:"absolute top-10 right-10 text-slate-600 p-2",children:n.jsx(s.X,{size:28})}),n.jsxs("div",{className:"text-center mb-10",children:[n.jsx("div",{className:"w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-rose-400 shadow-3xl",children:n.jsx(s.User,{size:48})}),n.jsx("h3",{className:"text-4xl font-black text-white tracking-tighter leading-none mb-4 uppercase",children:"Chào bạn!"}),n.jsx("p",{className:"text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-widest text-[9px]",children:"Cộng đồng PHTV Việt Nam"})]}),n.jsxs("button",{onClick:async()=>{try{const e=await fs(wp,vp);T(!1),Ip(),e.user.metadata.creationTime===e.user.metadata.lastSignInTime&&"phamhungtien.contact@gmail.com"!==e.user.email&&(C(e.user.displayName||""),x(!0))}catch(e){alert("Lỗi đăng nhập: "+e.message)}},className:"w-full py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl",children:[n.jsxs("svg",{className:"w-7 h-7",viewBox:"0 0 24 24",children:[n.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),n.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),n.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"}),n.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Đăng nhập ngay"]})]})]}),I&&n.jsxs("div",{className:"fixed inset-0 z-[250] flex items-center justify-center p-6",children:[n.jsx("div",{className:"absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-1000"}),n.jsxs("div",{className:"relative w-full max-w-lg bg-slate-900 rounded-[4rem] p-12 md:p-16 border border-white/[0.06] shadow-3xl animate-in zoom-in-95 duration-500",children:[n.jsxs("div",{className:"text-center mb-12 space-y-4",children:[n.jsx("div",{className:"w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3",children:n.jsx(s.UserCheck,{size:48,className:"text-white"})}),n.jsx("h3",{className:"text-4xl font-black text-white tracking-tighter uppercase italic leading-none",children:"Bạn là ai?"}),n.jsx("p",{className:"text-slate-500 text-lg font-medium italic",children:"Chọn một danh xưng thật đẳng cấp cho cộng đồng"})]}),n.jsx("input",{id:"username-input",name:"username",type:"text",value:k,onChange:e=>C(e.target.value),className:"w-full bg-slate-950 border border-white/[0.06] rounded-[2rem] py-6 px-10 text-white font-black mb-10 text-center text-3xl focus:border-brand-500/50 outline-none transition-all shadow-inner placeholder:text-slate-800",placeholder:"Nhập tên..."}),n.jsx("button",{onClick:async()=>{k.trim()&&wp.currentUser&&(await Vn(wp.currentUser,{displayName:k}),c(e=>e?{...e,username:k}:null),x(!1),ne("Đã cập nhật danh tính!"))},className:"w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all transform hover:scale-[1.02]",children:"Bắt đầu ngay"})]})]}),O.show&&n.jsx("div",{className:"fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500",children:n.jsxs("div",{className:"bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black shadow-3xl flex items-center gap-5 border border-white/20",children:[n.jsx("div",{className:"w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl",children:n.jsx(s.Check,{size:22})}),n.jsx("span",{className:"tracking-tight text-xl italic",children:O.message})]})})]})})}}});
