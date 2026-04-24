function t(t,e,i,n){var a,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(r=(s<3?a(r):s>3?a(e,i,r):a(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}Object.create;Object.create;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;class s{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const r=(t,n)=>{i?t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),a=e.litNonce;void 0!==a&&n.setAttribute("nonce",a),n.textContent=i.cssText,t.appendChild(n)}))},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const d=window,c=d.trustedTypes,h=c?c.emptyScript:"",p=d.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:m},f="finalized";class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const a=this[t];this[e]=n,this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var n;const a=this.constructor._$Ep(t,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,a=n._$Ev.get(t);if(void 0!==a&&this._$El!==a){const t=n.getPropertyOptions(a),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=a,this[a]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;v[f]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:v}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,k="?"+x,w=`<${k}>`,E=document,S=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,P=t=>M(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),L="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,N=/>/g,j=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,z=/"/g,U=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),O=H(1),B=H(2),F=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),D=new WeakMap,W=E.createTreeWalker(E,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,n=[];let a,s=2===e?"<svg>":"",r=I;for(let e=0;e<i;e++){const i=t[e];let o,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===I?"!--"===l[1]?r=R:void 0!==l[1]?r=N:void 0!==l[2]?(U.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=null!=a?a:I,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?j:'"'===l[3]?z:T):r===z||r===T?r=j:r===R||r===N?r=I:(r=j,a=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";s+=r===I?i+w:d>=0?(n.push(o),i.slice(0,d)+A+i.slice(d)+x+h):i+x+(-2===d?(n.push(void 0),e):h)}return[V(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class G{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let a=0,s=0;const r=t.length-1,o=this.parts,[l,d]=q(t,e);if(this.el=G.createElement(l,i),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=W.nextNode())&&o.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(A)||e.startsWith(x)){const i=d[s++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+A).split(x),e=/([.?@])?(.*)/.exec(i);o.push({type:1,index:a,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?et:"@"===e[1]?it:Z})}else o.push({type:6,index:a})}for(const e of t)n.removeAttribute(e)}if(U.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],S()),W.nextNode(),o.push({type:2,index:++a});n.append(t[e],S())}}}else if(8===n.nodeType)if(n.data===k)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)o.push({type:7,index:a}),t+=x.length-1}a++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,n){var a,s,r,o;if(e===F)return e;let l=void 0!==n?null===(a=i._$Co)||void 0===a?void 0:a[n]:i._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,n)),void 0!==n?(null!==(r=(o=i)._$Co)&&void 0!==r?r:o._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(e=J(t,l._$AS(t,e.values),l,n)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,a=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);W.currentNode=a;let s=W.nextNode(),r=0,o=0,l=n[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new Q(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new nt(s,this,t)),this._$AV.push(e),l=n[++o]}r!==(null==l?void 0:l.index)&&(s=W.nextNode(),r++)}return W.currentNode=E,a}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{constructor(t,e,i,n){var a;this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=null===(a=null==n?void 0:n.isConnected)||void 0===a||a}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),C(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):P(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Y&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,a="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=G.createElement(V(n.h,n.h[0]),this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===a)this._$AH.v(i);else{const t=new K(a,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=D.get(t.strings);return void 0===e&&D.set(t.strings,e=new G(t)),e}T(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const a of t)n===e.length?e.push(i=new Q(this.k(S()),this.k(S()),this,this.options)):i=e[n],i._$AI(a),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,n,a){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const a=this.strings;let s=!1;if(void 0===a)t=J(this,t,e,0),s=!C(t)||t!==this._$AH&&t!==F,s&&(this._$AH=t);else{const n=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=J(this,n[i+r],e,r),o===F&&(o=this._$AH[r]),s||(s=!C(o)||o!==this._$AH[r]),o===Y?t=Y:t!==Y&&(t+=(null!=o?o:"")+a[r+1]),this._$AH[r]=o}s&&!n&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}const tt=$?$.emptyScript:"";class et extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Y?this.element.setAttribute(this.name,tt):this.element.removeAttribute(this.name)}}class it extends Z{constructor(t,e,i,n,a){super(t,e,i,n,a),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=J(this,t,e,0))&&void 0!==i?i:Y)===F)return;const n=this._$AH,a=t===Y&&n!==Y||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,s=t!==Y&&(n===Y||a);a&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const at={O:A,P:x,A:k,C:1,M:q,L:K,R:P,D:J,I:Q,V:Z,H:et,N:it,U:X,F:nt},st=y.litHtmlPolyfillSupport;null==st||st(G,Q),(null!==(_=y.litHtmlVersions)&&void 0!==_?_:y.litHtmlVersions=[]).push("2.8.0");const rt=(t,e,i)=>{var n,a;const s=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=s._$litPart$;if(void 0===r){const t=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:null;s._$litPart$=r=new Q(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot,lt;class dt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return F}}dt.finalized=!0,dt._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:dt});const ct=globalThis.litElementPolyfillSupport;null==ct||ct({LitElement:dt});(null!==(lt=globalThis.litElementVersions)&&void 0!==lt?lt:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,pt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},ut=(t,e,i)=>{e.constructor.createProperty(i,t)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function mt(t){return e={...t,state:!0},(t,i)=>void 0!==i?ut(e,t,i):pt(e,t);var e}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var gt;null===(gt=window.HTMLSlotElement)||void 0===gt||gt.prototype.assignedElements;new Map(["llms_and_data","people_and_data","pretraining_data","visualization","interpretability","art","real_people_using_ai","not_ai"].map(((t,e)=>[t,e])));const ft={"palm scaling language modeling with pathways":{year:2023,citations:2500,aliases:["palm palm2 rai data analysis"]},"palm 2 technical report":{year:2023,citations:1200,aliases:["palm + palm2 rai data analysis"]},"visualizing and understanding the geometry of bert":{year:2019,month:12,citations:650},"embedding projector":{year:2016,month:11,citations:2100},"language interpretability tool":{year:2020,month:11,citations:420},"a gentle introduction to graph neural networks":{year:2021,month:9,citations:520},"wordcraft story writing with large language models":{year:2022,citations:180,aliases:["wordcraft writers workshop"]},"a recipe for arbitrary text style transfer with large language models":{year:2022,citations:110,aliases:["a recipe for arbitrary text style transfer with llms"]},"a pretrainer s guide to training data measuring the effects of data age domain coverage quality toxicity":{year:2024,month:7,citations:65,aliases:["a pretrainer s guide to training data"]},"llm comparator interactive analysis of side by side evaluation of large language models":{year:2025,month:1,citations:55,aliases:["llm comparator"]},"automatic histograms leveraging language models for text dataset exploration":{year:2024,month:5,citations:18,aliases:["automatic histograms"]},"data similarity is not enough to explain language model performance":{year:2023,month:12,citations:28},"an interpretability illusion for bert":{year:2021,citations:95},"evaluating attribution for graph neural networks":{year:2020,month:12,citations:135},"so und framework analyzing so cial representation in un structured d ata":{year:2024,citations:15,aliases:["sound analyzing social representation in unstructured data"]},"understanding the dataset practitioners behind large language models":{year:2024,citations:12,aliases:["understanding the dataset practitioners behind large language model development"]},"the evolution of llm adoption in industry data curation practices":{year:2024,citations:9},"llm adoption in data curation workflows industry practices and insights":{year:2025,citations:7},"who s asking user personas and the mechanics of latent misalignment":{year:2024,citations:10,aliases:["who s asking user personas and the mechanics of latent misalignment"]},"rdoflow automatically assessing under specified statistical analyses in hci":{year:2026,month:7,citations:2,aliases:["rdoflow automatically assessing under specified statistical analyses in hci"]},"the case for a single model that can both generate continuations and fill in the blank":{year:2022,citations:90},smily:{year:2019,citations:240,aliases:["smily hitl tool for pathologists"]},"neural networks trained on natural scenes exhibit gestalt closure":{year:2021,citations:95,aliases:["nns and gestalt"]},"developing a conceptual framework for analyzing people in unstructured data":{year:2023,month:10,citations:10},"know your data":{year:2021,month:5,citations:10},"moodboard search":{year:2023,month:1,citations:10,aliases:["mood board search enabling ai powered creative expression"]},"probing pretraining data":{year:2024,month:7,citations:10,aliases:["probing heterogeneous pretraining datasets with small curated datasets"]},"reverse rorschach":{year:2023,month:6,citations:10},"superlative instruments":{year:2021,citations:10},"improving solar panel efficiency using reinforcement learning":{year:2017,citations:10},toymaker:{year:2017,month:11,citations:10},"waterfall of meaning":{year:2019,month:6,citations:10}},vt=[{name:"Visualizing Distributions of Language Model Generations",description:"Visualizations to explore, compare, and reason about distributions of language model outputs for a single input.",links:[{link:"https://arxiv.org/pdf/2604.18724",name:"paper"},{link:"https://emilyreif.com/llm-consistency-vis/interactive_article",name:"article"},{link:"https://emilyreif.com/llm-consistency-vis/",name:"demo"}],image:"llm_consistency_vis.png",tags:["llms_and_data","visualization","interpretability"]},{name:"PALM + PALM2: RAI data analysis",description:"Responsible AI analysis on PaLM and PaLM2 pre-training data",links:[{link:"https://arxiv.org/abs/2204.02311",name:"PaLM paper"},{link:"https://arxiv.org/abs/2305.10403",name:"PaLM2 technical report"}],image:"topics.png",tags:["llms_and_data","people_and_data","pretraining_data"]},{name:"A pretrainer's guide to training data",description:"What happens when you systematically vary time, quality, toxicity, and domain of pre-training data for LLMs?",links:[{link:"https://aclanthology.org/2024.naacl-long.179/",name:"paper"}],image:"pretraining.jpg",tags:["llms_and_data","pretraining_data"]},{name:"A recipe for arbitrary text style transfer with LLMs",description:"Using LLMs for arbitrary text style transfer, with a natural language interface",links:[{link:"https://arxiv.org/abs/2109.03910",name:"paper"},{link:"https://storage.googleapis.com/style-transfer-paper-123/index.html",name:"styled text"}],image:"style_transfer.png",tags:["llms_and_data"]},{name:"A gentle introduction to graph neural networks",description:"Visualization-based distill.pub article on understanding GNNs",links:[{link:"https://distill.pub/2021/gnn-intro",name:"paper"}],image:"gnn.png",tags:["visualization"]},{name:"LLM Comparator",description:"Interactive side-by-side comparison of llm-generated datasets",links:[{link:"https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10670495",name:"paper"}],image:"llm_comp.png",tags:["llms_and_data","visualization"]},{name:"Linguistic Lens",description:"Interactive visualization tool for understanding grammatical diversity in LLM-generated text",links:[{link:"https://arxiv.org/pdf/2305.11364.pdf",name:"paper"},{link:"https://storage.googleapis.com/data-synth-trees/demo/index.html",name:"Tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/data-synth-syntax",name:"code"}],image:"linguisticlens.png",tags:["llms_and_data","visualization"]},{name:"Know Your Data",description:O`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was internal to Google)`,links:[{link:"https://knowyourdata.withgoogle.com/",name:"KnowYourData"}],image:"knowyourdata.png",tags:["llms_and_data","visualization"]},{name:"Visualizing and understanding the geometry of BERT",description:"How are syntax and semantics are encoded in transformers?",links:[{link:"https://proceedings.neurips.cc/paper_files/paper/2019/hash/159c1ffe5b61b41b3c4d8f4c2150f6c4-Abstract.html",name:"Paper"},{link:"https://pair-code.github.io/interpretability/context-atlas/blogpost/",name:"tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/context-atlas",name:"code"}],image:"bert.png",tags:["visualization","interpretability"]},{name:"Waterfall of meaning",description:"Art piece exploring the internals of LMs. Shown with the Barbican AI - More Than Human exhibit in  London, China, and Spain",links:[{link:"https://artsandculture.google.com/story/xgVxw84BWGgnLg",name:"article"},{link:"https://storage.googleapis.com/waterfall-of-meaning/demo/standalone.html",name:"online piece"},{link:"https://github.com/PAIR-code/waterfall-of-meaning",name:"code"}],image:"waterfall_of_meaning.png",tags:["llms_and_data","visualization","interpretability","art","real_people_using_ai"]},{name:"Embedding projector",description:"A tool for interactive visualization and interpretation of embeddings",links:[{link:"https://arxiv.org/abs/1611.05469",name:"paper"},{link:"https://projector.tensorflow.org/",name:"Tool"}],image:"embeddingprojector.png",tags:["llms_and_data","visualization","interpretability"]},{name:"Automatic Histograms",description:"Leveraging language models for text dataset exploration by creating entity-based features on-the-fly.",links:[{link:"https://dl.acm.org/doi/pdf/10.1145/3613905.3650798",name:"paper"}],image:"ah.png",tags:["llms_and_data","visualization"]},{name:"Wordcraft writers workshop",description:"LLM-powered writing assistant for a workshop with professional writers including Ken Lui and Robin Sloan. Illustrated with a generative image model",links:[{link:"https://wordcraft-writers-workshop.appspot.com/",name:"stories"},{link:"https://arxiv.org/abs/2107.07430",name:"paper"}],image:"wordcraft.jpg",tags:["llms_and_data","real_people_using_ai"]},{name:"Language interpretability tool",description:"Open-source platform for visualizing and understanding language models",links:[{link:"https://pair-code.github.io/lit/",name:"site"},{link:"https://arxiv.org/abs/2008.05122",name:"paper"}],image:"lit.png",tags:["visualization","interpretability"]},{name:"Probing pretraining data",description:"Probing heterogeneous pretraining datasets with small curated datasets",links:[{link:"https://gyauney.github.io/papers/probing-heterogeneous-datasets_poster.pdf",name:"poster"}],image:"probing.png",tags:["llms_and_data","pretraining_data","interpretability"]},{name:"NNs and gestalt",description:"Neural networks trained on natural scenes exhibit gestalt closure",links:[{link:"https://link.springer.com/article/10.1007/s42113-021-00100-7",name:"paper"}],image:"gestalt.png",tags:["interpretability"]},{name:"Moodboard search",description:O`AI-powered creative expression using subjective concepts and embeddings<br><br>Winner of 2023 interaction award`,links:[{link:"https://awards.ixda.org/projects/mood-board-search-enabling-ai-powered-creative-expression.html",name:"site"}],image:"cavcam.png",tags:["art","real_people_using_ai"]},{name:"Reverse rorschach",description:O`Installation by artist Shahryar Nashat using text-to-image generation model. <br><br>helped with intial brainstorming + proof of concepts, and got the technical pieces working`,links:[{link:"https://sylviakouvali.com/exhibitions/reverse-rorschach/",name:"site"}],image:"rorsch.png",tags:["art","real_people_using_ai"]},{name:"SMILY: HITL tool for pathologists",description:"Human-centered tools for coping with imperfect algorithms during medical decision-making",links:[{link:"https://dl.acm.org/doi/abs/10.1145/3290605.3300234",name:"paper"}],image:"smily.png",tags:["real_people_using_ai","not_ai"]},{name:"Superlative Instruments",description:"Synthesizers, not AI research. implemented the website, helped with company ops, etc",links:[{link:"https://playsuperlative.com/",name:"site"}],image:"superlative.png",tags:["not_ai"]},{name:"Evaluating attribution for graph neural networks",description:"Quantitative evaluation of attribution methods for GNNs with synthetic ground truth",links:[{link:"https://proceedings.neurips.cc/paper/2020/hash/417fbbf2e9d5a28a855a11894b2e795a-Abstract.html",name:"paper"}],hide_in_main_list:!0,tags:["interpretability"]},{name:"An interpretability illusion for BERT",description:"Phenomena that can make BERT-based interpretability tools appear more reliable than they are",links:[{link:"https://arxiv.org/abs/2104.07143",name:"paper"}],hide_in_main_list:!0,tags:["interpretability"]},{name:"Who's asking? User personas and the mechanics of latent misalignment",description:"How implicit user personas affect model behavior and safety",links:[{link:"https://arxiv.org/abs/2406.12094",name:"paper"}],hide_in_main_list:!0,tags:["interpretability"]},{name:"Understanding the dataset practitioners behind large language model development",description:"Interviews and analysis of data practitioners in LLM development (CHI 2024 extended abstract)",links:[{link:"https://arxiv.org/abs/2402.16611",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data","people_and_data"]},{name:"Data similarity is not enough to explain language model performance",description:"Similarity to pretraining data often does not track downstream task accuracy",links:[{link:"https://aclanthology.org/2023.emnlp-main.695/",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data","pretraining_data","interpretability"]},{name:"The evolution of LLM adoption in industry data curation practices",description:"Survey, interviews, and user studies on how data teams adopt LLMs in curation workflows",links:[{link:"https://arxiv.org/abs/2412.16089",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data","people_and_data"]},{name:"LLM adoption in data curation workflows: industry practices and insights",description:"CHI 2025 extended abstract; related follow-on to the industry adoption work",links:[{link:"https://researchr.org/publication/QianLRSHCWCTK25",name:"publication"}],hide_in_main_list:!0,tags:["llms_and_data","people_and_data"]},{name:"SoUnD: analyzing social representation in unstructured data",description:"Framework for RAI analysis of who and what is represented in foundation model training data (AIES 2024)",links:[{link:"https://arxiv.org/abs/2311.17259",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data","people_and_data","pretraining_data"]},{name:"Developing a conceptual framework for analyzing people in unstructured data",description:"Workshop version (SoLaR / NeurIPS workshops 2023) of ideas later expanded in SoUnD",links:[{link:"https://openreview.net/forum?id=QSPHfgw5fp",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data","people_and_data","pretraining_data"]},{name:"RDoFlow: automatically assessing under-specified statistical analyses in HCI",description:"IUI 2026",links:[{link:"https://iui.acm.org/2026/accepted-papers/",name:"venue"}],hide_in_main_list:!0,tags:["not_ai"]},{name:"The case for a single model that can both generate continuations and fill-in-the-blank",description:"Pretraining and fine-tuning for both continuation and fit-b (NAACL 2022 findings)",links:[{link:"https://aclanthology.org/2022.findings-naacl.185/",name:"paper"}],hide_in_main_list:!0,tags:["llms_and_data"]},{name:"Improving solar panel efficiency using reinforcement learning",description:"RLDM 2017 version of the solar tracking work, with related EnviroInfo 2017 and AAAI 2018 follow-ons.",links:[{link:"http://cs.brown.edu/~dabel/papers/solarl.pdf",name:"RLDM 2017 paper"},{link:"http://cs.brown.edu/~dabel/papers/solarl_enviro_info.pdf",name:"EnviroInfo 2017 paper"},{link:"https://aaai.org/papers/11415-bandit-based-solar-panel-control",name:"AAAI 2018 paper"}],hide_in_main_list:!0,tags:["real_people_using_ai","not_ai"]},{name:"Toymaker",description:O`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> (digital animation wasn't great back then...)`,links:[{link:"https://vimeo.com/242488116",name:"video"}],image:"toymaker.png",tags:["art","not_ai"]}],_t=vt.filter((t=>!t.hide_in_main_list)),yt=580,$t=170,bt=145,At=38,xt=2016,kt=2026.7,wt={llms_and_data:"#e4a823",people_and_data:"#f1c245",pretraining_data:"#dc8a22",visualization:"#8c1d18",interpretability:"#7344ad",art:"#3f78bf",real_people_using_ai:"#2f8c54",not_ai:"#8ecf8b"},Et={llms_and_data:"data",people_and_data:"data",pretraining_data:"data",visualization:"visualization",interpretability:"interpretability",art:"art",real_people_using_ai:"real_people_using_ai",not_ai:"not_ai"},St=["data","visualization","interpretability","art","real_people_using_ai","not_ai"],Ct={data:"llms and data",visualization:"visualization",interpretability:"interpretability",art:"art",real_people_using_ai:"real people using AI",not_ai:"not AI"};function Mt(t){return t.toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function Pt(t){const e=Mt(t);for(const[t,i]of Object.entries(ft)){if(Mt(t)===e)return i;if((i.aliases??[]).some((t=>Mt(t)===e)))return i}}function Lt(t){const e=(t.match(/(19|20)\d{2}/g)??[]).map((t=>Number(t))).filter((t=>t>=1990&&t<=2035));if(e.length>0)return e[e.length-1];const i=t.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);return i?2e3+Number(i[1]):void 0}function It(t){const e=t.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);if(e)return{year:2e3+Number(e[1]),month:Number(e[2])};const i=t.match(/((?:19|20)\d{2})[\/\-_\.](0[1-9]|1[0-2])(?:[\/\-_\.]|$)/);return i?{year:Number(i[1]),month:Number(i[2])}:void 0}function Rt(t,e){return!e||e<1||e>12?t+.5:t+(e-1)/12}function Nt(t){const e=t.replace("#","");return[Number.parseInt(e.slice(0,2),16),Number.parseInt(e.slice(2,4),16),Number.parseInt(e.slice(4,6),16)]}function jt([t,e,i]){const n=t=>t.toString(16).padStart(2,"0");return`#${n(Math.round(t))}${n(Math.round(e))}${n(Math.round(i))}`}function Tt(t,e,i){return Math.min(i,Math.max(e,t))}let zt=class extends dt{constructor(){super(),this.sizeMode="importance",this.timelineWidth=1500,this.hoveredProjectName=null}createRenderRoot(){return this}firstUpdated(){const t=this.querySelector(".timeline-scroll");if(!t)return;const e=()=>{this.timelineWidth=Math.max(t.clientWidth,320)};e(),this.resizeObserver=new ResizeObserver((()=>{e()})),this.resizeObserver.observe(t)}disconnectedCallback(){this.resizeObserver?.disconnect(),super.disconnectedCallback()}xForYear(t){const e=this.timelineWidth-$t-50;return $t+(t-xt)/10.700000000000045*e}importanceRadiusForItem(t){return t.hiddenFromMain?4:16}publicationRadiusForItem(t,e){const i=e.map((t=>t.citationCount)),n=Math.min(...i),a=Math.max(...i);if(a===n)return 10;return 5+25*((Math.sqrt(t.citationCount)-Math.sqrt(n))/(Math.sqrt(a)-Math.sqrt(n)))}scaleForItem(t,e){const i=this.importanceRadiusForItem(t);return"importance"===this.sizeMode?1:this.publicationRadiusForItem(t,e)/Math.max(i,.1)}preferredProjectLink(t){const e=t.links.find((t=>{const e=t.name.toLowerCase();return e.includes("paper")||e.includes("publication")||e.includes("venue")}));return e?.link??t.links[0]?.link}hoverInfoStyle(t){const e=t<.6*this.timelineWidth;return`left:${Tt(e?t+10:t-500-10,8,this.timelineWidth-500-8)}px;text-align:${e?"left":"right"};`}wrappedLineCount(t,e){return t.split("\n").map((t=>Math.max(1,Math.ceil(t.length/e)))).reduce(((t,e)=>t+e),0)}hoverLineEndY(t){const e=bt+(St.length-1)*At,i=22*this.wrappedLineCount(t.project.name,30)+18*("string"==typeof t.project.description?this.wrappedLineCount(t.project.description,46):4)+14+8;return Math.min(570,e+i)}shortPersistentLabelTitle(t){if(t.length>58&&t.includes(":")){const e=t.split(":")[0].trim();if(e.length>=16)return e}return t.length<=58?t:`${t.slice(0,55).replace(/\s+$/,"")}...`}wrapTextByWords(t,e,i){const n=t.split(/\s+/).filter(Boolean);if(0===n.length)return[""];const a=[];let s="";for(const t of n){const n=s?`${s} ${t}`:t;if(n.length<=e?s=n:(a.push(s||t),s=s&&s!==t?t:""),a.length===i)break}a.length<i&&s&&a.push(s),a.length>i&&(a.length=i);return a.join(" ").split(/\s+/).filter(Boolean).length<n.length&&a.length>0&&(a[a.length-1]=`${a[a.length-1].replace(/\.\.\.$/,"")}...`),a}rectsOverlap(t,e){return t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y}layoutPersistentLabels(t){const e=186,i=[],n=[],a=this.timelineWidth-50-6,s=bt-26,r=bt+(St.length-1)*At+26,o=[...t].sort(((t,e)=>{const i=(t.hiddenFromMain?0:1e3)+t.citationCount;return(e.hiddenFromMain?0:1e3)+e.citationCount-i}));for(const t of o){const o=this.shortPersistentLabelTitle(t.project.name),l=this.wrapTextByWords(o,30,3),d=17+11*l.length,c=t.isPublication?"paper":"proj";let h;const p=t.laneY<=bt+2*At?["down","up"]:["up","down"];for(let i=0;i<36&&!h;i++){for(const o of p){for(const p of["right","left"]){let u="down"===o?t.laneY+12+i*(d+8):t.laneY-12-d-i*(d+8);u="down"===o?Math.max(u,r+8):Math.min(u,s-d-8),u=Tt(u,6,572-d);const m={x:Tt("right"===p?t.x+8:t.x-e-8,176,a-e),y:u,width:e,height:d};if(!n.some((t=>this.rectsOverlap({x:m.x-6,y:m.y-6,width:m.width+12,height:m.height+12},t)))){h={item:t,x:t.x,y:u,width:e,height:d,direction:o,side:p,lines:l,kindText:c},n.push(m);break}}if(h)break}if(h)break}if(!h){const n=t.x<.58*this.timelineWidth?"right":"left",a=t.laneY<=bt+2*At?r+16+6*i.length:s-d-16-6*i.length;h={item:t,x:t.x,y:Tt(a,6,572-d),width:e,height:d,direction:a>t.laneY?"down":"up",side:n,lines:l,kindText:c}}i.push(h)}return i}itemOpacity(t){return"publication"!==this.sizeMode||t.isPublication?.68:.35}computeTimelineItems(){return vt.map((t=>{const e=Pt(t.name),i=Tt(function(t){const e=[...t.links.filter((t=>{const e=t.name.toLowerCase();return e.includes("paper")||e.includes("publication")||e.includes("venue")})),...t.links];for(const t of e){const e=It(t.link);if(e)return Rt(e.year,e.month)}const i=Pt(t.name);if(i)return Rt(i.year,i.month);for(const e of t.links){const t=Lt(e.link);if(t)return Rt(t)}const n=t.name.match(/(19|20)\d{2}/);return Rt(n?Number(n[0]):2024)}(t),2016.02,2026.68),n=function(t){return t.links.some((t=>{const e=t.name.toLowerCase(),i=t.link.toLowerCase();return e.includes("paper")||e.includes("publication")||e.includes("venue")||i.includes("arxiv.org")||i.includes("aclanthology.org")||i.includes("ieeexplore.ieee.org")||i.includes("dl.acm.org")||i.includes("proceedings.neurips.cc")}))}(t),a=e?.citations??10,s=function(t){const e=t.map((t=>Nt(wt[t]))),[i,n,a]=e.reduce(((t,[e,i,n])=>[t[0]+e,t[1]+i,t[2]+n]),[0,0,0]),s=Math.max(e.length,1);return jt([i/s,n/s,a/s])}(t.tags),r=function(t,e=.7){const[i,n,a]=Nt(t);return jt([i*e,n*e,a*e])}(s),o=bt+St.indexOf("art")*At,l=t.tags.includes("art")?o:function(t){const e=Array.from(new Set(t.map((t=>Et[t])).map((t=>St.indexOf(t))))),i=e.reduce(((t,e)=>t+e),0)/Math.max(e.length,1);return bt+i*At}(t.tags)+function(t,e){let i=0;for(let e=0;e<t.length;e++)i=(i<<5)-i+t.charCodeAt(e),i|=0;return i%(2*e+1)-e}(`${t.name}-y`,6);return{project:t,decimalYear:i,isPublication:n,citationCount:a,dotColor:s,strokeColor:r,laneY:l,x:this.xForYear(i),hiddenFromMain:Boolean(t.hide_in_main_list)}}))}smoothCurveCommands(t){if(t.length<2)return"";const e=[];for(let i=1;i<t.length-1;i++){const n=t[i],a=t[i+1],s=(n.x+a.x)/2,r=(n.y+a.y)/2;e.push(`Q ${n.x} ${n.y} ${s} ${r}`)}const i=t[t.length-1],n=t[t.length-2];return e.push(`Q ${n.x} ${n.y} ${i.x} ${i.y}`),e.join(" ")}smoothAreaPath(t,e){if(t.length<2||e.length<2)return"";const i=[...e].reverse();return[`M ${t[0].x} ${t[0].y}`,this.smoothCurveCommands(t),`L ${i[0].x} ${i[0].y}`,this.smoothCurveCommands(i),"Z"].join(" ")}renderAreaLabel(t,e,i,n){return B`
      <text class='timeline-area-label' x=${t} y=${e} text-anchor='middle'>
        <tspan class='timeline-area-main'>${i}:</tspan>
        <tspan class='timeline-area-rest'> ${n}</tspan>
      </text>
    `}render(){const t=this.computeTimelineItems(),e=this.layoutPersistentLabels(t),i=this.hoveredProjectName?t.find((t=>t.project.name===this.hoveredProjectName)):void 0,n=i?this.scaleForItem(i,t):1,a=(i?this.importanceRadiusForItem(i)*n:0)+7,s=76,r=[];for(let t=Math.ceil(xt);t<=Math.floor(kt);t++)r.push(t);const o=2016+5/12,l=2016.75,d=l,c=2017+5/12,h=2017+8/12,p=2024+4/12,u=2024+8/12,m=[];for(let t=xt;t<=2026.701;t+=1/12)m.push(t);const g=t=>t>=o&&t<l||t>=h&&t<p?1:t>=p?.2:0,f=m.map((t=>{const e=g(t);return{x:this.xForYear(t),y:s-34*e}})),v=m.map((t=>({x:this.xForYear(t),y:s}))),_=m.map((t=>{const e=g(t),i=(t=>t>=d&&t<c?1:t>=u?.8:0)(t),n=s-34*e;return{x:this.xForYear(t),y:n-34*i}})),y=m.map((t=>{const e=g(t);return{x:this.xForYear(t),y:s-34*e}})),$=this.smoothAreaPath(f,v),b=this.smoothAreaPath(_,y);return O`
      <div class='timeline-controls font-sm'>
        <span class='timeline-control-label'>dot size:</span>
        <span class=${"importance"===this.sizeMode?"timeline-mode active":"timeline-mode"}>
          importance
        </span>
        <label class='timeline-switch'>
          <input
            type='checkbox'
            ?checked=${"publication"===this.sizeMode}
            @change=${t=>{const e=t.target.checked;this.sizeMode=e?"publication":"importance"}}
          />
          <span class='timeline-switch-track'></span>
        </label>
        <span class=${"publication"===this.sizeMode?"timeline-mode active":"timeline-mode"}>
          citations
        </span>
      </div>
      <div class='timeline-scroll'>
        <svg class='timeline-svg' viewBox='0 0 ${this.timelineWidth} ${yt}' role='img'>
          <desc>Timeline of projects and publications by theme and time.</desc>

          <rect x='0' y='0' width='${this.timelineWidth}' height='${yt}' fill='#ffffff'></rect>

          <path
            d=${$}
            fill='#7289a8'
            fill-opacity='0.36'
            stroke='#ffffff'
            stroke-opacity='0.95'
            stroke-width='2.5'
            stroke-linejoin='round'
          ></path>
          <path
            d=${b}
            fill='#9eb2ca'
            fill-opacity='0.42'
            stroke='#ffffff'
            stroke-opacity='0.95'
            stroke-width='2.5'
            stroke-linejoin='round'
          ></path>

          ${r.map((t=>B`
              <line
                x1=${this.xForYear(t)}
                y1='38'
                x2=${this.xForYear(t)}
                y2='385'
                stroke='#1a1a1a'
                stroke-opacity='0.05'
                stroke-width='1'
              ></line>
              <text
                class='timeline-year-label'
                x=${this.xForYear(t)}
                y=${16}
                text-anchor='middle'
              >
                ${t}
              </text>
            `))}

          ${this.renderAreaLabel(this.xForYear(2016.5833333333335),82,"Google","internship")}
          ${this.renderAreaLabel(this.xForYear(2018.8333333333335),82,"Google","Brain")}
          ${this.renderAreaLabel(this.xForYear(2022.1666666666665),82,"Google","Responsible AI")}
          ${this.renderAreaLabel(this.xForYear(2025.5166666666667),82,"Google","DeepMind")}
          ${this.renderAreaLabel(this.xForYear(2017.0833333333335),6,"Brown","Masters")}
          ${this.renderAreaLabel(this.xForYear(2025.6833333333334),6,"UW","PhD")}

          ${St.map(((t,e)=>B`
              <line
                x1=${165}
                y1=${bt+e*At}
                x2=${this.timelineWidth-50}
                y2=${bt+e*At}
                stroke='#4e4e4e'
                stroke-opacity='0.5'
                stroke-width='1.2'
              ></line>
              <text
                class='timeline-lane-label'
                x=${158}
                y=${bt+e*At+4}
                text-anchor='end'
              >
                ${Ct[t]}
              </text>
            `))}

          ${e.map((e=>{const i=this.scaleForItem(e.item,t),n=this.importanceRadiusForItem(e.item)*i,a="down"===e.direction?e.item.laneY+n+2:e.item.laneY-n-2,s="down"===e.direction?e.y:e.y+e.height;return B`
              <line
                class='timeline-persistent-line'
                x1=${e.item.x}
                y1=${a}
                x2=${e.item.x}
                y2=${s}
              ></line>
            `}))}

          ${i?B`
                <line
                  class='timeline-hover-line'
                  x1=${i.x}
                  y1=${i.laneY+a}
                  x2=${i.x}
                  y2=${this.hoverLineEndY(i)}
                ></line>
                <circle
                  class='timeline-hover-ring'
                  cx=${i.x}
                  cy=${i.laneY}
                  r=${a}
                ></circle>
              `:null}

          ${t.map((e=>B`
              <g
                class='timeline-dot-group'
                transform='translate(${e.x} ${e.laneY})'
                @mouseenter=${()=>{this.hoveredProjectName=e.project.name}}
                @mouseleave=${()=>{this.hoveredProjectName=null}}
                @click=${()=>{const t=this.preferredProjectLink(e.project);t&&window.open(t,"_blank","noopener")}}
              >
                <g
                  class='timeline-dot-scale'
                  transform='scale(${this.scaleForItem(e,t)})'
                >
                  <circle
                    class='timeline-dot'
                    cx='0'
                    cy='0'
                    r=${this.importanceRadiusForItem(e)}
                    fill=${e.dotColor}
                    fill-opacity=${this.itemOpacity(e)}
                    stroke=${e.isPublication?e.strokeColor:"none"}
                    stroke-width=${e.isPublication?2:0}
                  >
                    <title>${e.project.name}</title>
                  </circle>
                </g>
              </g>
            `))}

          ${e.map((t=>B`
            <g class='timeline-persistent-label'>
              <text
                class='timeline-persistent-icon'
                x=${"right"===t.side?t.x+8:t.x-8}
                y=${t.y+10}
                text-anchor=${"right"===t.side?"start":"end"}
              >
                ${"paper"===t.kindText?"[*]":"[+]"}
              </text>
              <text
                class='timeline-persistent-kind-text'
                x=${"right"===t.side?t.x+36:t.x-36}
                y=${t.y+10}
                text-anchor='middle'
              >
                ${t.kindText}
              </text>
              ${t.lines.map(((e,i)=>B`
                  <text
                    class='timeline-persistent-label-text'
                    x=${"right"===t.side?t.x+8:t.x-8}
                    y=${t.y+24+11*i}
                    text-anchor=${"right"===t.side?"start":"end"}
                  >
                    ${e}
                  </text>
                `))}
            </g>
          `))}
        </svg>
        ${i?O`
              <div class='timeline-hover-anchor' style=${this.hoverInfoStyle(i.x)}>
                <div class='timeline-hover-title'>${i.project.name}</div>
                <div class='timeline-hover-description'>${i.project.description}</div>
              </div>
            `:null}
      </div>
    `}};t([mt()],zt.prototype,"sizeMode",void 0),t([mt()],zt.prototype,"timelineWidth",void 0),t([mt()],zt.prototype,"hoveredProjectName",void 0),zt=t([ht("timeline-component")],zt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6};class Ht{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Ot}=at,Bt=()=>document.createComment(""),Ft=(t,e,i)=>{var n;const a=t._$AA.parentNode,s=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=a.insertBefore(Bt(),s),n=a.insertBefore(Bt(),s);i=new Ot(e,n,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,o=r!==t;if(o){let e;null===(n=i._$AQ)||void 0===n||n.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==s||o){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;a.insertBefore(t,s),t=e}}}return i},Yt=(t,e,i=t)=>(t._$AI(e,i),t),Dt={},Wt=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const n=t._$AB.nextSibling;for(;i!==n;){const t=i.nextSibling;i.remove(),i=t}},Vt=(t,e,i)=>{const n=new Map;for(let a=e;a<=i;a++)n.set(t[a],a);return n},qt=(Gt=class extends Ht{constructor(t){if(super(t),t.type!==Ut.CHILD)throw Error("repeat() can only be used in text expressions")}ct(t,e,i){let n;void 0===i?i=e:void 0!==e&&(n=e);const a=[],s=[];let r=0;for(const e of t)a[r]=n?n(e,r):r,s[r]=i(e,r),r++;return{values:s,keys:a}}render(t,e,i){return this.ct(t,e,i).values}update(t,[e,i,n]){var a;const s=t._$AH,{values:r,keys:o}=this.ct(e,i,n);if(!Array.isArray(s))return this.ut=o,r;const l=null!==(a=this.ut)&&void 0!==a?a:this.ut=[],d=[];let c,h,p=0,u=s.length-1,m=0,g=r.length-1;for(;p<=u&&m<=g;)if(null===s[p])p++;else if(null===s[u])u--;else if(l[p]===o[m])d[m]=Yt(s[p],r[m]),p++,m++;else if(l[u]===o[g])d[g]=Yt(s[u],r[g]),u--,g--;else if(l[p]===o[g])d[g]=Yt(s[p],r[g]),Ft(t,d[g+1],s[p]),p++,g--;else if(l[u]===o[m])d[m]=Yt(s[u],r[m]),Ft(t,s[p],s[u]),u--,m++;else if(void 0===c&&(c=Vt(o,m,g),h=Vt(l,p,u)),c.has(l[p]))if(c.has(l[u])){const e=h.get(o[m]),i=void 0!==e?s[e]:null;if(null===i){const e=Ft(t,s[p]);Yt(e,r[m]),d[m]=e}else d[m]=Yt(i,r[m]),Ft(t,s[p],i),s[e]=null;m++}else Wt(s[u]),u--;else Wt(s[p]),p++;for(;m<=g;){const e=Ft(t,d[g+1]);Yt(e,r[m]),d[m++]=e}for(;p<=u;){const t=s[p++];null!==t&&Wt(t)}return this.ut=o,((t,e=Dt)=>{t._$AH=e})(t,d),F}},(...t)=>({_$litDirective$:Gt,values:t}));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Gt;let Jt=class extends dt{createRenderRoot(){return this}render(){return O`
    <div class='topbar'>
      ${this.renderNav("about","#about")}
      ${null}
      ${this.renderNav("projects","#projects")}
      ${this.renderNav("papers [↗]","https://scholar.google.com/citations?user=J1hMgtAAAAAJ")}
    </div>
    <div class='about-holder'>
      <div class='content'>
        <h1 class='font-lg' id='about'>Emily Reif</h1>
        ${this.renderAbout()}
      </div>
    </div>
    ${null}
    <div class='content'>
      <h1 class='font-lg'  id='projects'>Projects</h1>
      ${this.renderProjects()}
    </div> 
    `}renderExternal(){const t=(t,e)=>O`
        <a href=${e} target="_blank" class='icon-link'><img src='./images/${t}'></img></a>
      `;return O`
    <div class='external'>
      ${t("twitter.png","https://twitter.com/emilyrreif")}
      ${t("github.png","https://github.com/EmilyReif")}
      ${t("scholar.png","https://scholar.google.com/citations?user=J1hMgtAAAAAJ")}
    </div> `}renderNav(t,e){return O`<div class='nav'> <a href=${e}>${t}</a></div>`}renderAbout(){return O`
    <div>
    I'm currently a PhD student at the University of Washington, advised by <a href=https://nasmith.github.io/ target="_blank"> Noah Smith</a> and <a href=https://homes.cs.washington.edu/~jheer/ target="_blank"> Jeff Heer</a>. 
    I'm also a research scientist on Google DeepMind's <a href=https://pair.withgoogle.com/ target="_blank"> People + AI Research</a> team. 
    <br>
    <br>

    I want to understand why machine learning models (mostly language models) do what they do.
    
    <br>
    <br>
    <i>"The model is an artifact of the data is an artifact of the model is…"</i>
    <br>
    <br>

    I'm especially interested in using visualization to understand pretraining/finetuning/evaluation data, and how those data curation choices impact the model.

    <br>
    <br>

    I also create new interfaces to explore the boundaries of these models’ capabilities, for a wide range of users from pathologists, to creative writers, to visual artists.
    <br>
    <br>
    <br>
    <div class='email font-sm'> 
      ereif[@]google.com // emreif[@]cs.washington.edu
      <br>
      <a href='Reif Resume.pdf' target="_blank"> resume </a> </div>
    ${this.renderExternal()}
    </div>
    `}link(t,e){return O`<a class='upper' href=${e} target="_blank">${t}</a>`}renderProjects(){return qt(_t,(t=>t.name),(t=>this.renderProject(t)))}renderProject(t){const e=t.links.map((t=>O`<div>${this.link(t.name,t.link)}</div>`));return O`
    <div class='title'>${t.name}</div>
    <div class='project'>
      <a class='img-holder'  href=${t.links[0].link} target="_blank"> <img src="./images/${t.image}"></img></a>

      <div class='info font-sm'>
        <div>${t.description}</div>
        <div class='project-links'>
          ${e}
        </div>
      </div>
    </div>
    `}};Jt=t([ht("index-component")],Jt);
//# sourceMappingURL=index.66135f6d.js.map
