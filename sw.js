!function(e){var t={};function __webpack_require__(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,s){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(__webpack_require__.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(s,r,function(t){return e[t]}.bind(null,r));return s},__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=6)}([function(e,t,s){"use strict";try{self["workbox:core:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:6.1.5"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const r=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class WorkboxError_WorkboxError extends Error{constructor(e,t){super(r(e,t)),this.name=e,this.details=t}}const a=new Set;const n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},i=e=>[n.prefix,e,n.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||i(n.precache),c=e=>e||i(n.runtime);function h(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}let l;function u(e){e.then((()=>{}))}class DBWrapper{constructor(e,t,{onupgradeneeded:s,onversionchange:r}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=r||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const r=indexedDB.open(this._name,this._version);r.onerror=()=>t(r.error),r.onupgradeneeded=e=>{s?(r.transaction.abort(),r.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},r.onsuccess=()=>{const t=r.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:s=null,direction:r="next",count:a,includeKeys:n=!1}={}){return await this.transaction([e],"readonly",((i,o)=>{const c=i.objectStore(e),h=t?c.index(t):c,l=[],u=h.openCursor(s,r);u.onsuccess=()=>{const e=u.result;e?(l.push(n?e:e.value),a&&l.length>=a?o(l):e.continue()):o(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((r,a)=>{const n=this._db.transaction(e,t);n.onabort=()=>a(n.error),n.oncomplete=()=>r(),s(n,(e=>r(e)))}))}async _call(e,t,s,...r){return await this.transaction([t],s,((s,a)=>{const n=s.objectStore(t),i=n[e].apply(n,r);i.onsuccess=()=>a(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}DBWrapper.prototype.OPEN_TIMEOUT=2e3;const d={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(d))for(const s of t)s in IDBObjectStore.prototype&&(DBWrapper.prototype[s]=async function(t,...r){return await this._call(s,t,e,...r)});class Deferred{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const p=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function _(e){return new Promise((t=>setTimeout(t,e)))}function f(e,t){const s=t();return e.waitUntil(s),s}async function g(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new WorkboxError_WorkboxError("cross-origin-copy-response",{origin:s});const r=e.clone(),a={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},n=t?t(a):a,i=function(){if(void 0===l){const e=new Response("");if("body"in e)try{new Response(e.body),l=!0}catch(e){l=!1}l=!1}return l}()?r.body:await r.blob();return new Response(i,n)}s(4);const y="cache-entries",w=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class CacheTimestampsModel_CacheTimestampsModel{constructor(e){this._cacheName=e,this._db=new DBWrapper("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(y,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const r=indexedDB.deleteDatabase(e);r.onerror=()=>{s(r.error)},r.onblocked=()=>{s(new Error("Delete blocked"))},r.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=w(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(y,s)}async getTimestamp(e){return(await this._db.get(y,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(y,"readwrite",((s,r)=>{const a=s.objectStore(y).index("timestamp").openCursor(null,"prev"),n=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const r=s.value;r.cacheName===this._cacheName&&(e&&r.timestamp<e||t&&i>=t?n.push(s.value):i++),s.continue()}else r(n)}})),r=[];for(const e of s)await this._db.delete(y,e.id),r.push(e.url);return r}_getId(e){return this._cacheName+"|"+w(e)}}class CacheExpiration_CacheExpiration{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new CacheTimestampsModel_CacheTimestampsModel(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,u(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class ExpirationPlugin_ExpirationPlugin{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:r})=>{if(!r)return null;const a=this._isResponseDateFresh(r),n=this._getCacheExpiration(s);u(n.expireEntries());const i=n.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){0}return a?r:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),a.add(t))}_getCacheExpiration(e){if(e===c())throw new WorkboxError_WorkboxError("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new CacheExpiration_CacheExpiration(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}s(1);function m(e){if(!e)throw new WorkboxError_WorkboxError("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new WorkboxError_WorkboxError("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(s,location.href),a=new URL(s,location.href);return r.searchParams.set("__WB_REVISION__",t),{cacheKey:r.href,url:a.href}}class PrecacheInstallReportPlugin{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class PrecacheCacheKeyPlugin{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}s(3);function b(e){return"string"==typeof e?new Request(e):e}class StrategyHandler_StrategyHandler{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new Deferred,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=b(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){throw new WorkboxError_WorkboxError("plugin-error-request-will-fetch",{thrownError:e})}const a=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:a,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:r.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=b(e);let s;const{cacheName:r,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i={...a,cacheName:r};s=await caches.match(n,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:r,matchOptions:a,cachedResponse:s,request:n,event:this.event})||void 0;return s}async cachePut(e,t){const s=b(e);await _(0);const r=await this.getCacheKey(s,"write");if(!t)throw new WorkboxError_WorkboxError("cache-put-with-no-response",{url:p(r.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:i,matchOptions:o}=this._strategy,c=await self.caches.open(i),l=this.hasCallback("cacheDidUpdate"),u=l?await async function(e,t,s,r){const a=h(t.url,s);if(t.url===a)return e.match(t,r);const n={...r,ignoreSearch:!0},i=await e.keys(t,n);for(const t of i)if(a===h(t.url,s))return e.match(t,r)}(c,r.clone(),["__WB_REVISION__"],o):null;try{await c.put(r,l?n.clone():n)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of a)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:i,oldResponse:u,newResponse:n.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=b(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),r=r=>{const a={...r,state:s};return t[e](a)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class Strategy_Strategy{constructor(e={}){this.cacheName=c(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,a=new StrategyHandler_StrategyHandler(this,{event:t,request:s,params:r}),n=this._getResponse(a,s,t);return[n,this._awaitComplete(n,a,s,t)]}async _getResponse(e,t,s){let r;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(r=await this._handle(t,e),!r||"error"===r.type)throw new WorkboxError_WorkboxError("no-response",{url:t.url})}catch(a){for(const n of e.iterateCallbacks("handlerDidError"))if(r=await n({error:a,event:s,request:t}),r)break;if(!r)throw a}for(const a of e.iterateCallbacks("handlerWillRespond"))r=await a({event:s,request:t,response:r});return r}async _awaitComplete(e,t,s,r){let a,n;try{a=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:a}),await t.doneWaiting()}catch(e){n=e}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:a,error:n}),t.destroy(),n)throw n}}class PrecacheStrategy_PrecacheStrategy extends Strategy_Strategy{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(PrecacheStrategy_PrecacheStrategy.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;if(!this._fallbackToNetwork)throw new WorkboxError_WorkboxError("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s=await t.fetch(e),s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new WorkboxError_WorkboxError("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,r]of this.plugins.entries())r!==PrecacheStrategy_PrecacheStrategy.copyRedirectedCacheableResponsesPlugin&&(r===PrecacheStrategy_PrecacheStrategy.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&t++);0===t?this.plugins.push(PrecacheStrategy_PrecacheStrategy.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}PrecacheStrategy_PrecacheStrategy.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},PrecacheStrategy_PrecacheStrategy.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await g(e):e};class PrecacheController_PrecacheController{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new PrecacheStrategy_PrecacheStrategy({cacheName:o(e),plugins:[...t,new PrecacheCacheKeyPlugin({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:r}=m(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new WorkboxError_WorkboxError("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new WorkboxError_WorkboxError("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return f(e,(async()=>{const t=new PrecacheInstallReportPlugin;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const r=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),n=new Request(t,{integrity:r,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=t;return{updatedURLs:s,notUpdatedURLs:r}}))}activate(e){return f(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),r=[];for(const a of t)s.has(a.url)||(await e.delete(a),r.push(a.url));return{deletedURLs:r}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new WorkboxError_WorkboxError("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params={cacheKey:t,...s.params},this.strategy.handle(s))}}let R;const x=()=>(R||(R=new PrecacheController_PrecacheController),R);s(2);const C=e=>e&&"object"==typeof e?e:{handle:e};class Route_Route{constructor(e,t,s="GET"){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class RegExpRoute_RegExpRoute extends Route_Route{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class Router_Router{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const r=s.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let i=n&&n.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:a})}catch(e){c=Promise.reject(e)}const h=n&&n.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async r=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(e){r=e}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const a=this._routes.get(s.method)||[];for(const n of a){let a;const i=n.match({url:e,sameOrigin:t,request:s,event:r});if(i)return a=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:n,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new WorkboxError_WorkboxError("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new WorkboxError_WorkboxError("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let k;const E=()=>(k||(k=new Router_Router,k.addFetchListener(),k.addCacheListener()),k);function v(e,t,s){let r;if("string"==typeof e){const a=new URL(e,location.href);0;r=new Route_Route((({url:e})=>e.href===a.href),t,s)}else if(e instanceof RegExp)r=new RegExpRoute_RegExpRoute(e,t,s);else if("function"==typeof e)r=new Route_Route(e,t,s);else{if(!(e instanceof Route_Route))throw new WorkboxError_WorkboxError("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return E().registerRoute(r),r}class PrecacheRoute_PrecacheRoute extends Route_Route{constructor(e,t){super((({request:s})=>{const r=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:r=!0,urlManipulation:a}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(n,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(r){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:n});for(const t of e)yield t.href}}(s.url,t)){const t=r.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}class CacheFirst_CacheFirst extends Strategy_Strategy{async _handle(e,t){let s,r=await t.cacheMatch(e);if(r)0;else{0;try{r=await t.fetchAndCachePut(e)}catch(e){s=e}0}if(!r)throw new WorkboxError_WorkboxError("no-response",{url:e.url,error:s});return r}}const P={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class StaleWhileRevalidate_StaleWhileRevalidate extends Strategy_Strategy{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(P)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch((()=>{}));let r,a=await t.cacheMatch(e);if(a)0;else{0;try{a=await s}catch(e){r=e}}if(!a)throw new WorkboxError_WorkboxError("no-response",{url:e.url,error:r});return a}}var q;s(5);class CacheableResponse{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class CacheableResponsePlugin_CacheableResponsePlugin{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new CacheableResponse(e)}}self.addEventListener("activate",(()=>self.clients.claim())),self.skipWaiting(),function(e){x().precache(e)}([{'revision':'ec3b00564dc9b34fa2093383c725b399','url':'assets/css/edit-story-rtl.css'},{'revision':'ec3b00564dc9b34fa2093383c725b399','url':'assets/css/edit-story.css'},{'revision':'aaad1aac58bc724881035afcefcb28d4','url':'assets/css/vendors-edit-story-rtl.css'},{'revision':'aaad1aac58bc724881035afcefcb28d4','url':'assets/css/vendors-edit-story.css'},{'revision':'ca61418f316ae64427e02f6c4c0d7e6a','url':'assets/images/editor/grid-placeholder.png'},{'revision':'0d1cd8008228a355b74cc4d62ccf9ae4','url':'assets/images/editor/logo192.png'},{'revision':'e04f5eff867b28e3427a0c3f28287562','url':'assets/images/editor/logo512.png'},{'revision':null,'url':'assets/js/chunk-fonts-1374a24202e995a046ec.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-0-30a02785350928cc09fe.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-10-10ed7542e2fbbe6c5b20.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-12-175fda0790cd7cafa214.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-16-504b1efc38fae2f29a78.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-18-8b779a5f95be426fd56e.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-22-e9e5e2c0aa0aa1f71f35.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-24-3bc3919709a5703e886b.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-28-817f53b0f5fef98dc8a4.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-30-a888763ec35a06bffdbd.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-34-d74effbf3d9e06a1ba2b.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-36-4c4e195af5d10b55bc35.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-4-ae3e07a22cfd5656912f.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-40-757e5b0b61007fde7373.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-42-5c1903d2e0ca113adb4a.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-46-8a72031b9f2fce60c755.js'},{'revision':null,'url':'assets/js/chunk-web-stories-template-6-df3fb09d6ffa559fad54.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-0-c78a4c48e3a44d18ed09.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-1-40e62382fe5ee4d779e6.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-2-5054cdf4149111836d0e.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-3-a5130c28a75160d11fc7.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-4-80991b893290787e6a25.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-5-af4aa2d422a98bc8a286.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-6-e7f0b4dde6b320f6ffc8.js'},{'revision':null,'url':'assets/js/chunk-web-stories-textset-7-c519f1b363d9d2ab29dd.js'},{'revision':'ff83e7a652239544cc8fb7338e865402','url':'assets/js/edit-story.js'},{'revision':null,'url':'assets/js/vendors-chunk-ffmpeg-ef29be67e7c7665d1241.js'},{'revision':null,'url':'assets/js/vendors-edit-story-330c67ce16cc9d79ab36.js'},{'revision':'8962cbc0005b82cb34dc2ffc76cce05d','url':'favicon.ico'},{'revision':'bb7c8be88aa033bf9c59301c50cc7b22','url':'index.html'},{'revision':'9f52d876c0984fbe7e2a51342bd79df2','url':'manifest.json'},{'revision':'177b5ee26a7a35ba2b9bf984c4d2765e','url':'preview/index.html'},{'revision':'1317cb89f6a0358cc8c93eb8f2b46d59','url':'preview/preview-frame.html'}]),function(e){const t=x();v(new PrecacheRoute_PrecacheRoute(t,e))}(q),v((({url:e})=>"https://fonts.googleapis.com"===e.origin),new StaleWhileRevalidate_StaleWhileRevalidate({cacheName:"google-fonts-stylesheets"})),v((({url:e})=>"https://fonts.gstatic.com"===e.origin),new CacheFirst_CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new CacheableResponsePlugin_CacheableResponsePlugin({statuses:[0,200]}),new ExpirationPlugin_ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:30})]})),v((({url:e})=>"https://wp.stories.google"===e.origin&&e.pathname.startsWith("/static/main/images/templates")),new StaleWhileRevalidate_StaleWhileRevalidate({cacheName:"image-templates",plugins:[new CacheableResponsePlugin_CacheableResponsePlugin({statuses:[0,200]}),new ExpirationPlugin_ExpirationPlugin({maxEntries:15})]})),v((({request:e})=>"image"===e.destination),new CacheFirst_CacheFirst({cacheName:"images",plugins:[new CacheableResponsePlugin_CacheableResponsePlugin({statuses:[0,200]}),new ExpirationPlugin_ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]})),v((({request:e})=>"script"===e.destination||"style"===e.destination),new StaleWhileRevalidate_StaleWhileRevalidate({cacheName:"static-resources"}))}]);