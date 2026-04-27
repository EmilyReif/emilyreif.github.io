function e(e,t,i,n){var s,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(r<3?s(a):r>3?s(t,i,a):s(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}Object.create;Object.create;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;class r{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}}const a=(e,n)=>{i?e.adoptedStyleSheets=n.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}))},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,n))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",p=c.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:u},f="finalized";class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const n=this._$Ep(i,t);void 0!==n&&(this._$Ev.set(n,i),e.push(n))})),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const s=this[e];this[t]=n,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var n;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:m).toAttribute(t,i.type);this._$El=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$El=null}}_$AK(e,t){var i;const n=this.constructor,s=n._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=n.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:m;this._$El=s,this[s]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;v[f]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const $=window,b=$.trustedTypes,_=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,A=`<${x}>`,M=document,E=()=>M.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,C=e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),L="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,T=/>/g,N=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,U=/^(?:script|style|textarea|title)$/i,j=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),O=j(1),F=j(2),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),D=new WeakMap,Y=M.createTreeWalker(M,129,null,!1);function W(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,n=[];let s,r=2===t?"<svg>":"",a=P;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===P?"!--"===l[1]?a=R:void 0!==l[1]?a=T:void 0!==l[2]?(U.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=N):void 0!==l[3]&&(a=N):a===N?">"===l[0]?(a=null!=s?s:P,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?N:'"'===l[3]?z:H):a===z||a===H?a=N:a===R||a===T?a=P:(a=N,s=void 0);const h=a===N&&e[t+1].startsWith("/>")?" ":"";r+=a===P?i+A:c>=0?(n.push(o),i.slice(0,c)+k+i.slice(c)+w+h):i+w+(-2===c?(n.push(void 0),t):h)}return[W(e,r+(e[i]||"<?>")+(2===t?"</svg>":"")),n]};class G{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const a=e.length-1,o=this.parts,[l,c]=V(e,t);if(this.el=G.createElement(l,i),Y.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=Y.nextNode())&&o.length<a;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith(k)||t.startsWith(w)){const i=c[r++];if(e.push(t),void 0!==i){const e=n.getAttribute(i.toLowerCase()+k).split(w),t=/([.?@])?(.*)/.exec(i);o.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?X:"?"===t[1]?te:"@"===t[1]?ie:Z})}else o.push({type:6,index:s})}for(const t of e)n.removeAttribute(t)}if(U.test(n.tagName)){const e=n.textContent.split(w),t=e.length-1;if(t>0){n.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],E()),Y.nextNode(),o.push({type:2,index:++s});n.append(e[t],E())}}}else if(8===n.nodeType)if(n.data===x)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(w,e+1));)o.push({type:7,index:s}),e+=w.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function q(e,t,i=e,n){var s,r,a,o;if(t===B)return t;let l=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const c=I(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,n)),void 0!==n?(null!==(a=(o=i)._$Co)&&void 0!==a?a:o._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,n)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:M).importNode(i,!0);Y.currentNode=s;let r=Y.nextNode(),a=0,o=0,l=n[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new Q(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new ne(r,this,e)),this._$AV.push(t),l=n[++o]}a!==(null==l?void 0:l.index)&&(r=Y.nextNode(),a++)}return Y.currentNode=M,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{constructor(e,t,i,n){var s;this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),I(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):C(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,s="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=G.createElement(W(n.h,n.h[0]),this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new J(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new G(e)),t}T(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new Q(this.k(E()),this.k(E()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(void 0===s)e=q(this,e,t,0),r=!I(e)||e!==this._$AH&&e!==B,r&&(this._$AH=e);else{const n=e;let a,o;for(e=s[0],a=0;a<s.length-1;a++)o=q(this,n[i+a],t,a),o===B&&(o=this._$AH[a]),r||(r=!I(o)||o!==this._$AH[a]),o===K?e=K:e!==K&&(e+=(null!=o?o:"")+s[a+1]),this._$AH[a]=o}r&&!n&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class X extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}const ee=b?b.emptyScript:"";class te extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==K?this.element.setAttribute(this.name,ee):this.element.removeAttribute(this.name)}}class ie extends Z{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=q(this,e,t,0))&&void 0!==i?i:K)===B)return;const n=this._$AH,s=e===K&&n!==K||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==K&&(n===K||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const se={O:k,P:w,A:x,C:1,M:V,L:J,R:C,D:q,I:Q,V:Z,H:te,N:ie,U:X,F:ne},re=$.litHtmlPolyfillSupport;null==re||re(G,Q),(null!==(y=$.litHtmlVersions)&&void 0!==y?y:$.litHtmlVersions=[]).push("2.8.0");const ae=(e,t,i)=>{var n,s;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:t;let a=r._$litPart$;if(void 0===a){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=a=new Q(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe,le;class ce extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return B}}ce.finalized=!0,ce._$litElement$=!0,null===(oe=globalThis.litElementHydrateSupport)||void 0===oe||oe.call(globalThis,{LitElement:ce});const de=globalThis.litElementPolyfillSupport;null==de||de({LitElement:ce});(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,pe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}},me=(e,t,i)=>{t.constructor.createProperty(i,e)};
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
function ue(e){return t={...e,state:!0},(e,i)=>void 0!==i?me(t,e,i):pe(t,e);var t}
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
var ge;null===(ge=window.HTMLSlotElement)||void 0===ge||ge.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6};class ve{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:ye}=se,$e=()=>document.createComment(""),be=(e,t,i)=>{var n;const s=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore($e(),r),n=s.insertBefore($e(),r);i=new ye(t,n,e,e.options)}else{const t=i._$AB.nextSibling,a=i._$AM,o=a!==e;if(o){let t;null===(n=i._$AQ)||void 0===n||n.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==a._$AU&&i._$AP(t)}if(t!==r||o){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,r),e=t}}}return i},_e=(e,t,i=e)=>(e._$AI(t,i),e),ke={},we=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const n=e._$AB.nextSibling;for(;i!==n;){const e=i.nextSibling;i.remove(),i=e}},xe=(e,t,i)=>{const n=new Map;for(let s=t;s<=i;s++)n.set(e[s],s);return n},Ae=(Me=class extends ve{constructor(e){if(super(e),e.type!==fe.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let n;void 0===i?i=t:void 0!==t&&(n=t);const s=[],r=[];let a=0;for(const t of e)s[a]=n?n(t,a):a,r[a]=i(t,a),a++;return{values:r,keys:s}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,n]){var s;const r=e._$AH,{values:a,keys:o}=this.ct(t,i,n);if(!Array.isArray(r))return this.ut=o,a;const l=null!==(s=this.ut)&&void 0!==s?s:this.ut=[],c=[];let d,h,p=0,m=r.length-1,u=0,g=a.length-1;for(;p<=m&&u<=g;)if(null===r[p])p++;else if(null===r[m])m--;else if(l[p]===o[u])c[u]=_e(r[p],a[u]),p++,u++;else if(l[m]===o[g])c[g]=_e(r[m],a[g]),m--,g--;else if(l[p]===o[g])c[g]=_e(r[p],a[g]),be(e,c[g+1],r[p]),p++,g--;else if(l[m]===o[u])c[u]=_e(r[m],a[u]),be(e,r[p],r[m]),m--,u++;else if(void 0===d&&(d=xe(o,u,g),h=xe(l,p,m)),d.has(l[p]))if(d.has(l[m])){const t=h.get(o[u]),i=void 0!==t?r[t]:null;if(null===i){const t=be(e,r[p]);_e(t,a[u]),c[u]=t}else c[u]=_e(i,a[u]),be(e,r[p],i),r[t]=null;u++}else we(r[m]),m--;else we(r[p]),p++;for(;u<=g;){const t=be(e,c[g+1]);_e(t,a[u]),c[u++]=t}for(;p<=m;){const e=r[p++];null!==e&&we(e)}return this.ut=o,((e,t=ke)=>{e._$AH=t})(e,c),B}},(...e)=>({_$litDirective$:Me,values:e}));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Me;const Ee=["llms_and_data","visualization","interpretability","experts_using_ai","kyd","embeddings"];new Map(["research","tools","creative_work"].map(((e,t)=>[e,t]))),new Map(Ee.map(((e,t)=>[e,t])));const Ie={llms_and_data:"LLMs and data",visualization:"Visualization",interpretability:"Interpretability",experts_using_ai:"Applications",kyd:"KYD",embeddings:"Embeddings"},Se={"palm scaling language modeling with pathways":{year:2023,citations:2500,aliases:["palm palm2 rai data analysis"]},"palm 2 technical report":{year:2023,citations:1200,aliases:["palm + palm2 rai data analysis"]},"visualizing and understanding the geometry of bert":{year:2019,month:12,citations:650},"embedding projector":{year:2016,month:11,citations:2100},"language interpretability tool":{year:2020,month:11,citations:420},"a gentle introduction to graph neural networks":{year:2021,month:9,citations:520},"wordcraft story writing with large language models":{year:2022,citations:180,aliases:["wordcraft writers workshop"]},"a recipe for arbitrary text style transfer with large language models":{year:2021,month:11,citations:110,aliases:["a recipe for arbitrary text style transfer with llms"]},"a pretrainer s guide to training data measuring the effects of data age domain coverage quality toxicity":{year:2024,month:7,citations:65,aliases:["a pretrainer s guide to training data"]},"llm comparator interactive analysis of side by side evaluation of large language models":{year:2025,month:1,citations:55,aliases:["llm comparator"]},"automatic histograms leveraging language models for text dataset exploration":{year:2024,month:5,citations:18,aliases:["automatic histograms"]},"data similarity is not enough to explain language model performance":{year:2023,month:12,citations:28},"an interpretability illusion for bert":{year:2021,citations:95},"evaluating attribution for graph neural networks":{year:2020,month:12,citations:135},"so und framework analyzing so cial representation in un structured d ata":{year:2024,citations:15,aliases:["sound analyzing social representation in unstructured data","developing a conceptual framework for analyzing people in unstructured data"]},"understanding the dataset practitioners behind large language models":{year:2024,citations:12,aliases:["understanding the dataset practitioners behind large language model development"]},"llm adoption in industry data curation practices":{year:2024,citations:16,aliases:["the evolution of llm adoption in industry data curation practices","llm adoption in data curation workflows industry practices and insights","llm adoption in data curation workflows: industry practices and insights"]},"who s asking user personas and the mechanics of latent misalignment":{year:2024,citations:10,aliases:["who s asking user personas and the mechanics of latent misalignment"]},"rdoflow automatically assessing under specified statistical analyses in hci":{year:2026,month:7,citations:2,aliases:["rdoflow automatically assessing under specified statistical analyses in hci"]},"the case for a single model that can both generate continuations and fill in the blank":{year:2022,citations:90},smily:{year:2019,citations:240,aliases:["smily hitl tool for pathologists"]},"neural networks trained on natural scenes exhibit gestalt closure":{year:2021,citations:95,aliases:["nns and gestalt"]},"developing a conceptual framework for analyzing people in unstructured data":{year:2023,month:10,citations:10},"know your data":{year:2021,month:5,citations:10},"moodboard search":{year:2023,month:1,citations:10,aliases:["mood board search enabling ai powered creative expression"]},"probing pretraining data":{year:2024,month:7,citations:10,aliases:["probing heterogeneous pretraining datasets with small curated datasets"]},"reverse rorschach":{year:2023,month:6,citations:10},"superlative instruments":{year:2019,month:11,citations:10},"improving solar panel efficiency using reinforcement learning":{year:2017,citations:10,aliases:["bandit-based solar panel control","toward improving solar panel efficiency using reinforcement learning","solar panel tracking and control reinforcement learning"]},toymaker:{year:2017,month:11,citations:10},"waterfall of meaning":{year:2019,month:6,citations:10}},Ce=[{name:"Visualizing Distributions of Language Model Generations",description:"Visualizations to explore, compare, and reason about distributions of language model outputs for a single input.",links:[{link:"https://arxiv.org/pdf/2604.18724",name:"paper"},{link:"https://emilyreif.com/llm-consistency-vis/interactive_article",name:"article"},{link:"https://emilyreif.com/llm-consistency-vis/",name:"demo"}],image:"llm_consistency_vis.png",categories:["research","tools"],networks:["llms_and_data","visualization","interpretability"]},{name:"PALM + PALM2: RAI data analysis",description:"Responsible AI analysis on PaLM and PaLM2 pre-training data",links:[{link:"https://arxiv.org/abs/2204.02311",name:"PaLM paper"},{link:"https://arxiv.org/abs/2305.10403",name:"PaLM2 technical report"}],image:"topics.png",categories:["research"],networks:["llms_and_data","kyd"],timelineVariants:[{key:"palm-rai-data",labelTitle:"PaLM RAI data",cardTitle:"PaLM: RAI data analysis",description:"Responsible AI analysis on PaLM pre-training data",linkIndex:0,timelineMetaKey:"palm scaling language modeling with pathways"},{key:"palm2-rai-data",labelTitle:"PaLM 2 RAI data",cardTitle:"PaLM 2: RAI data analysis",description:"Responsible AI analysis on PaLM 2 pre-training data",linkIndex:1,timelineMetaKey:"palm 2 technical report"}]},{name:"A pretrainer's guide to training data",description:"What happens when you systematically vary time, quality, toxicity, and domain of pre-training data for LLMs?",links:[{link:"https://aclanthology.org/2024.naacl-long.179/",name:"paper"}],image:"pretraining.jpg",categories:["research"],networks:["llms_and_data","kyd"]},{name:"A recipe for arbitrary text style transfer with LLMs",description:"Using LLMs for arbitrary text style transfer, with a natural language interface",links:[{link:"https://arxiv.org/abs/2109.03910",name:"paper"},{link:"https://storage.googleapis.com/style-transfer-paper-123/index.html",name:"styled text"}],image:"style_transfer.png",categories:["research"],networks:["llms_and_data"]},{name:"A gentle introduction to graph neural networks",description:"Visualization-based distill.pub article on understanding GNNs",links:[{link:"https://distill.pub/2021/gnn-intro",name:"paper"}],image:"gnn.png",categories:["research"],networks:["visualization"]},{name:"Visualizing and understanding the geometry of BERT",description:"How are syntax and semantics are encoded in transformers?",links:[{link:"https://proceedings.neurips.cc/paper_files/paper/2019/hash/159c1ffe5b61b41b3c4d8f4c2150f6c4-Abstract.html",name:"Paper"},{link:"https://pair-code.github.io/interpretability/context-atlas/blogpost/",name:"tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/context-atlas",name:"code"}],image:"bert.png",categories:["research"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Waterfall of meaning",description:"Art piece exploring the internals of LMs. Shown with the Barbican AI - More Than Human exhibit in  London, China, and Spain",links:[{link:"https://artsandculture.google.com/story/xgVxw84BWGgnLg",name:"article"},{link:"https://storage.googleapis.com/waterfall-of-meaning/demo/standalone.html",name:"online piece"},{link:"https://github.com/PAIR-code/waterfall-of-meaning",name:"code"}],image:"waterfall_of_meaning.png",categories:["creative_work"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Linguistic Lens",description:"Interactive visualization tool for understanding grammatical diversity in LLM-generated text",links:[{link:"https://arxiv.org/pdf/2305.11364.pdf",name:"paper"},{link:"https://storage.googleapis.com/data-synth-trees/demo/index.html",name:"Tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/data-synth-syntax",name:"code"}],image:"linguisticlens.png",categories:["research","tools"],networks:["llms_and_data","visualization"]},{name:"Know Your Data",description:O`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was internal to Google)`,links:[{link:"https://knowyourdata.withgoogle.com/",name:"KnowYourData"}],image:"knowyourdata.png",categories:["tools"],networks:["llms_and_data","visualization","kyd"]},{name:"LLM Comparator",description:"Interactive side-by-side comparison of llm-generated datasets",links:[{link:"https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10670495",name:"paper"}],image:"llm_comp.png",categories:["research","tools"],networks:["llms_and_data","visualization"]},{name:"Embedding projector",description:"A tool for interactive visualization and interpretation of embeddings",links:[{link:"https://arxiv.org/abs/1611.05469",name:"paper"},{link:"https://projector.tensorflow.org/",name:"Tool"}],image:"embeddingprojector.png",categories:["research","tools"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Automatic Histograms",description:"Leveraging language models for text dataset exploration by creating entity-based features on-the-fly.",links:[{link:"https://dl.acm.org/doi/pdf/10.1145/3613905.3650798",name:"paper"}],image:"ah.png",categories:["research","tools"],networks:["llms_and_data","visualization","kyd"]},{name:"Wordcraft writers workshop",description:"LLM-powered writing assistant for a workshop with professional writers including Ken Lui and Robin Sloan. Illustrated with a generative image model",links:[{link:"https://wordcraft-writers-workshop.appspot.com/",name:"stories"},{link:"https://arxiv.org/abs/2107.07430",name:"paper"}],image:"wordcraft.jpg",categories:["research","tools","creative_work"],networks:["experts_using_ai"]},{name:"Language interpretability tool",description:"Open-source platform for visualizing and understanding language models",links:[{link:"https://pair-code.github.io/lit/",name:"site"},{link:"https://arxiv.org/abs/2008.05122",name:"paper"}],image:"lit.png",categories:["research","tools"],networks:["interpretability"]},{name:"Probing pretraining data",description:"Probing heterogeneous pretraining datasets with small curated datasets",links:[{link:"https://gyauney.github.io/papers/probing-heterogeneous-datasets_poster.pdf",name:"poster"}],image:"probing.png",categories:["research"],networks:["llms_and_data","interpretability","kyd","embeddings"]},{name:"NNs and gestalt",description:"Neural networks trained on natural scenes exhibit gestalt closure",links:[{link:"https://link.springer.com/article/10.1007/s42113-021-00100-7",name:"paper"}],image:"gestalt.png",categories:["research"],networks:["interpretability"]},{name:"Moodboard search",description:O`AI-powered creative expression using subjective concepts and embeddings<br><br>Winner of 2023 interaction award`,links:[{link:"https://awards.ixda.org/projects/mood-board-search-enabling-ai-powered-creative-expression.html",name:"site"}],image:"cavcam.png",categories:["creative_work"],networks:["embeddings","experts_using_ai"]},{name:"Reverse rorschach",description:O`Installation by artist Shahryar Nashat using text-to-image generation model. <br><br>helped with intial brainstorming + proof of concepts, and got the technical pieces working`,links:[{link:"https://sylviakouvali.com/exhibitions/reverse-rorschach/",name:"site"}],image:"rorsch.png",categories:["creative_work"],networks:["experts_using_ai"]},{name:"SMILY: HITL tool for pathologists",description:"Human-centered tools for coping with imperfect algorithms during medical decision-making",links:[{link:"https://dl.acm.org/doi/abs/10.1145/3290605.3300234",name:"paper"}],image:"smily.png",categories:["research","tools"],networks:["experts_using_ai","embeddings"]},{name:"Superlative Instruments",description:"Synthesizers, not AI research. implemented the website, helped with company ops, etc",links:[{link:"https://playsuperlative.com/",name:"site"}],image:"superlative.png",categories:["creative_work"],networks:[]},{name:"Evaluating attribution for graph neural networks",description:"Quantitative evaluation of attribution methods for GNNs with synthetic ground truth",links:[{link:"https://proceedings.neurips.cc/paper_files/paper/2020/hash/417fbbf2e9d5a28a855a11894b2e795a-Abstract.html",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability"]},{name:"An interpretability illusion for BERT",description:"Phenomena that can make BERT-based interpretability tools appear more reliable than they are",links:[{link:"https://arxiv.org/abs/2104.07143",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability","embeddings"]},{name:"Who's asking? User personas and the mechanics of latent misalignment",description:"How implicit user personas affect model behavior and safety",links:[{link:"https://arxiv.org/abs/2406.12094",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability","embeddings"]},{name:"Understanding the dataset practitioners behind large language model development",description:"Interviews and analysis of data practitioners in LLM development (CHI 2024 extended abstract)",links:[{link:"https://arxiv.org/abs/2402.16611",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data"]},{name:"Data similarity is not enough to explain language model performance",description:"Similarity to pretraining data often does not track downstream task accuracy",links:[{link:"https://aclanthology.org/2023.emnlp-main.695/",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","interpretability","embeddings","kyd"]},{name:"LLM adoption in industry data curation practices",description:"Survey, interviews, and user studies on how data teams adopt LLMs in curation workflows (2024 paper), plus a CHI 2025 extended abstract with further industry insights.",links:[{link:"https://arxiv.org/abs/2412.16089",name:"paper (2024)"},{link:"https://researchr.org/publication/QianLRSHCWCTK25",name:"CHI 2025 extended abstract"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","experts_using_ai","kyd"]},{name:"SoUnD: analyzing social representation in unstructured data",description:"Framework for RAI analysis of who and what is represented in foundation model training data (AIES 2024). Builds on an earlier workshop paper developing the conceptual framework.",links:[{link:"https://arxiv.org/abs/2311.17259",name:"paper (SoUnD)"},{link:"https://openreview.net/forum?id=QSPHfgw5fp",name:"workshop paper (framework)"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","kyd"]},{name:"RDoFlow: automatically assessing under-specified statistical analyses in HCI",description:"IUI 2026",links:[{link:"https://iui.acm.org/2026/accepted-papers/",name:"venue"}],hide_in_main_list:!0,categories:["research"],networks:[]},{name:"The case for a single model that can both generate continuations and fill-in-the-blank",description:"Pretraining and fine-tuning for both continuation and fit-b (NAACL 2022 findings)",links:[{link:"https://aclanthology.org/2022.findings-naacl.185/",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data"]},{name:"Solar panel tracking and control (reinforcement learning)",description:"Brown MS work on reinforcement learning for solar tracking and control: RLDM 2017 and EnviroInfo 2017 on efficiency improvements, AAAI 2018 on bandit-based control, plus a related write-up on improving efficiency.",links:[{link:"http://cs.brown.edu/~dabel/papers/solarl.pdf",name:"RLDM 2017 paper"},{link:"http://cs.brown.edu/~dabel/papers/solarl_enviro_info.pdf",name:"EnviroInfo 2017 paper"},{link:"https://aaai.org/papers/11415-bandit-based-solar-panel-control",name:"AAAI 2018 (bandit control)"}],hide_in_main_list:!0,categories:["research"],networks:["experts_using_ai"]},{name:"Toymaker",description:O`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> Screened at festivals including KIDS FIRST!, Green Bay, LA Int'l Children's, and PA Indie Shorts (2018–2019)`,links:[{link:"https://vimeo.com/242488116",name:"video"}],image:"toymaker.png",categories:["creative_work"],networks:[]}],Le=Ce.filter((e=>!e.hide_in_main_list)),Pe=Ee.filter((e=>"kyd"!==e)),Re=700,Te=170,Ne=150,He=26,ze=2016,Ue=2026.7,je={research:"#e4a823",tools:"#A52A2A",creative_work:"#2F4F4F"},Oe={research:"research",tools:"tools",creative_work:"creative_work"},Fe=["research","tools","creative_work"],Be={research:"Research",tools:"Tools",creative_work:"Art etc"};function Ke(e){return e.toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function De(e){const t=Ke(e);for(const[e,i]of Object.entries(Se)){if(Ke(e)===t)return i;if((i.aliases??[]).some((e=>Ke(e)===t)))return i}}function Ye(e){const t=(e.match(/(19|20)\d{2}/g)??[]).map((e=>Number(e))).filter((e=>e>=1990&&e<=2035));if(t.length>0)return t[t.length-1];const i=e.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);return i?2e3+Number(i[1]):void 0}function We(e){const t=e.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);if(t)return{year:2e3+Number(t[1]),month:Number(t[2])};const i=e.match(/((?:19|20)\d{2})[\/\-_\.](0[1-9]|1[0-2])(?:[\/\-_\.]|$)/);return i?{year:Number(i[1]),month:Number(i[2])}:void 0}function Ve(e,t){return!t||t<1||t>12?e+.5:e+(t-1)/12}function Ge(e){const t=e.links.find((e=>{const t=e.name.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")}));return t?.link??e.links[0]?.link}function qe(e){const t=[...e.links.filter((e=>{const t=e.name.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")})),...e.links];for(const e of t){const t=We(e.link);if(t)return Ve(t.year,t.month)}const i=De(e.name);if(i)return Ve(i.year,i.month);for(const t of e.links){const e=Ye(t.link);if(e)return Ve(e)}const n=e.name.match(/(19|20)\d{2}/);return Ve(n?Number(n[0]):2024)}function Je(e,t){const i=e.links[t];if(i){const e=We(i.link);if(e)return Ve(e.year,e.month);const t=Ye(i.link);if(void 0!==t)return Ve(t)}return qe(e)}function Qe(e){return e.links.some((e=>{const t=e.name.toLowerCase(),i=e.link.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")||i.includes("arxiv.org")||i.includes("aclanthology.org")||i.includes("ieeexplore.ieee.org")||i.includes("dl.acm.org")||i.includes("proceedings.neurips.cc")}))}function Ze(e){const t=Array.from(new Set(e.map((e=>Oe[e])).map((e=>Fe.indexOf(e)))));if(0===t.length)return Ne;const i=t.reduce(((e,t)=>e+t),0)/t.length;return Ne+i*He}function Xe(e){const t=e.replace("#","");return[Number.parseInt(t.slice(0,2),16),Number.parseInt(t.slice(2,4),16),Number.parseInt(t.slice(4,6),16)]}function et([e,t,i]){const n=e=>e.toString(16).padStart(2,"0");return`#${n(Math.round(e))}${n(Math.round(t))}${n(Math.round(i))}`}function tt(e){const t=e.map((e=>Xe(je[e]))),[i,n,s]=t.reduce(((e,[t,i,n])=>[e[0]+t,e[1]+i,e[2]+n]),[0,0,0]),r=Math.max(t.length,1);return et([i/r,n/r,s/r])}function it(e,t=.7){const[i,n,s]=Xe(e);return et([i*t,n*t,s*t])}let nt=class extends ce{constructor(){super(),this.sizeMode="importance",this.timelineWidth=1500,this.hoveredInstanceKey=null,this.hoveredNetworkId=null,this.hoveredCardHeight=0}createRenderRoot(){return this}firstUpdated(){const e=this.querySelector(".timeline-scroll");if(!e)return;const t=()=>{this.timelineWidth=Math.max(e.clientWidth,320)};t(),this.resizeObserver=new ResizeObserver((()=>{t()})),this.resizeObserver.observe(e)}disconnectedCallback(){this.resizeObserver?.disconnect(),super.disconnectedCallback()}updated(e){if(e.has("hoveredInstanceKey"))if(this.hoveredInstanceKey){const e=this.querySelector(".timeline-hover-card.hovered");e&&(this.hoveredCardHeight=e.offsetHeight)}else this.hoveredCardHeight=0}xForYear(e){const t=this.timelineWidth-Te-50;return Te+(e-ze)/10.700000000000045*t}importanceRadiusForItem(e){if(e.hiddenFromMain)return 4;const t=e.preferenceFraction??.5;return 4+24*Math.pow(t,2.4)}publicationRadiusForItem(e,t){const i=t.map((e=>e.citationCount)),n=Math.min(...i),s=Math.max(...i);if(s===n)return 10;return 5+25*((Math.sqrt(e.citationCount)-Math.sqrt(n))/(Math.sqrt(s)-Math.sqrt(n)))}scaleForItem(e,t){const i=this.importanceRadiusForItem(e);return"importance"===this.sizeMode?1:this.publicationRadiusForItem(e,t)/Math.max(i,.1)}shortPersistentLabelTitle(e){if(e.length>58&&e.includes(":")){const t=e.split(":")[0].trim();if(t.length>=16)return t}return e.length<=58?e:`${e.slice(0,55).replace(/\s+$/,"")}...`}wrapTextByWords(e,t,i){const n=e.split(/\s+/).filter(Boolean);if(0===n.length)return[""];const s=[];let r="";for(const e of n){const n=r?`${r} ${e}`:e;if(n.length<=t?r=n:(s.push(r||e),r=r&&r!==e?e:""),s.length===i)break}s.length<i&&r&&s.push(r),s.length>i&&(s.length=i);return s.join(" ").split(/\s+/).filter(Boolean).length<n.length&&s.length>0&&(s[s.length-1]=`${s[s.length-1].replace(/\.\.\.$/,"")}...`),s}rectsOverlap(e,t){return e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.y+e.height>t.y}hashedBit(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return 0==(1&t)}layoutPersistentLabels(e){const t=Ne,i=t-30,n=Ne+(Fe.length-1)*He+30,s=[],r=[],a=[];for(const o of e){const e=this.shortPersistentLabelTitle(o.labelTitle),l=this.wrapTextByWords(e,18,4),c=l.reduce(((e,t)=>Math.max(e,t.length)),0),d=Math.min(100,Math.max(40,Math.ceil(5.2*c))),h=4+11*l.length,p=o.isPublication?"paper":"proj",m=t+(Fe.length-1.5)*He,u=o.laneY>=m?"down":"up",g=this.hashedBit("h:"+o.instanceKey)?"right":"left",f="right"===g?"left":"right",v=[{direction:u,side:g},{direction:u,side:f}],y=h+5;let $,b,_;for(let e=0;e<80&&!$;e++){const t=e*y;for(const e of[!0,!1]){for(const s of v){const{direction:c,side:m}=s,u="up"===c?i-h-t:n+t;if("up"===c&&u<42)continue;if("down"===c&&u+h>692)continue;const g={x:"right"===m?o.x:o.x-d,y:u,width:d,height:h},f={x:g.x-3,y:g.y-3,width:g.width+6,height:g.height+6};if(r.some((e=>this.rectsOverlap(f,e))))continue;const v={x:o.x,y1:"down"===c?o.laneY:u,y2:"down"===c?u+h:o.laneY};if(e){if(r.some((e=>v.x>e.x&&v.x<e.x+e.width&&v.y1<e.y+e.height&&v.y2>e.y)))continue;if(a.some((e=>e.x>g.x&&e.x<g.x+g.width&&e.y1<g.y+g.height&&e.y2>g.y)))continue}$={item:o,x:o.x,y:u,width:d,height:h,direction:c,side:m,lines:l,kindText:p},b=g,_=v;break}if($)break}}const k="up"===u?"down":"up",w=[{direction:k,side:g},{direction:k,side:f}];for(let e=0;e<40&&!$;e++){const t=e*y;for(const e of[!0,!1]){for(const s of w){const{direction:c,side:m}=s,u="up"===c?i-h-t:n+t;if("up"===c&&u<42)continue;if("down"===c&&u+h>692)continue;const g={x:"right"===m?o.x:o.x-d,y:u,width:d,height:h},f={x:g.x-3,y:g.y-3,width:g.width+6,height:g.height+6};if(r.some((e=>this.rectsOverlap(f,e))))continue;const v={x:o.x,y1:"down"===c?o.laneY:u,y2:"down"===c?u+h:o.laneY};if(e){if(r.some((e=>v.x>e.x&&v.x<e.x+e.width&&v.y1<e.y+e.height&&v.y2>e.y)))continue;if(a.some((e=>e.x>g.x&&e.x<g.x+g.width&&e.y1<g.y+g.height&&e.y2>g.y)))continue}$={item:o,x:o.x,y:u,width:d,height:h,direction:c,side:m,lines:l,kindText:p},b=g,_=v;break}if($)break}}$&&b&&_&&(r.push(b),a.push(_)),$&&s.push($)}for(let e=0;e<s.length;e++){const t=s[e],i=r[e];if(!a.some(((t,n)=>n!==e&&t.x>i.x&&t.x<i.x+i.width&&t.y1<i.y+i.height&&t.y2>i.y)))continue;const n="right"===t.side?"left":"right",o={x:"right"===n?t.item.x:t.item.x-t.width,y:i.y,width:i.width,height:i.height},l={x:o.x-3,y:o.y-3,width:o.width+6,height:o.height+6};if(r.some(((t,i)=>i!==e&&this.rectsOverlap(l,t))))continue;a.some(((t,i)=>i!==e&&t.x>o.x&&t.x<o.x+o.width&&t.y1<o.y+o.height&&t.y2>o.y))||(r[e]=o,s[e]={...t,side:n})}return s}itemOpacity(e){return"publication"!==this.sizeMode||e.isPublication?.68:.35}networkHighlightFactor(e){return this.hoveredNetworkId?e.networks.includes(this.hoveredNetworkId)?1:.12:1}computeTimelineItems(){const e=new Map;let t=0;for(const i of Ce)i.hide_in_main_list||(e.set(i.name,t),t+=1);const i=t,n=[];for(const t of Ce){const s=Boolean(t.hide_in_main_list),r=e.get(t.name),a=s||void 0===r?null:i<=1?1:1-r/(i-1),o=tt(t.categories),l=it(o),c=Ze(t.categories),d=Qe(t),h=(e,i,n,r,h,p,m)=>{const u=(g=e,f=2016.02,v=2026.68,Math.min(v,Math.max(f,g)));var g,f,v;return{project:t,instanceKey:i,labelTitle:n,cardTitle:r,cardDescription:h,preferredLink:p,decimalYear:u,isPublication:d,citationCount:m,dotColor:o,strokeColor:l,laneY:c,x:this.xForYear(u),hiddenFromMain:s,preferenceFraction:a}},p=t.timelineVariants;if(p&&p.length>0){for(const e of p){const i=Je(t,e.linkIndex),s=Se[e.timelineMetaKey],r=s?s.citations:10,a=t.links[e.linkIndex]?t.links[e.linkIndex].link:void 0;n.push(h(i,e.key,e.labelTitle,e.cardTitle,e.description,a,r))}continue}const m=De(t.name),u=qe(t);n.push(h(u,t.name,t.name,t.name,t.description,Ge(t),m?m.citations:10))}const s=new Map;for(const e of n){const t=`${Math.round(e.x/5)}|${Math.round(e.laneY/5)}`,i=s.get(t);i?i.push(e):s.set(t,[e])}return Array.from(s.values()).forEach((e=>{if(e.length<2)return;e.sort(((e,t)=>e.instanceKey.localeCompare(t.instanceKey)));const t=(e.length-1)/2;e.forEach(((e,i)=>{e.x+=6*(i-t)}))})),n}stepAreaPathFlatBottom(e,t,i){const n=e.length-1;if(n<0)return"";const s=t=>this.xForYear(e[t]),r=[];for(let i=0;i<n;i++){const n=(e[i]+e[i+1])/2;r.push(t(n))}let a=`M ${s(0)} ${r[0]}`;for(let e=0;e<n-1;e++)a+=` L ${s(e+1)} ${r[e]} L ${s(e+1)} ${r[e+1]}`;return a+=` L ${s(n)} ${r[n-1]}`,a+=` L ${s(n)} ${i} L ${s(0)} ${i} Z`,a}stepAreaPathVariableBottom(e,t,i){const n=e.length-1;if(n<0)return"";const s=t=>this.xForYear(e[t]),r=[],a=[];for(let s=0;s<n;s++){const n=(e[s]+e[s+1])/2;r.push(t(n)),a.push(i(n))}let o=`M ${s(0)} ${r[0]}`;for(let e=0;e<n-1;e++)o+=` L ${s(e+1)} ${r[e]} L ${s(e+1)} ${r[e+1]}`;o+=` L ${s(n)} ${r[n-1]}`,o+=` L ${s(n)} ${a[n-1]}`;for(let e=n-1;e>=1;e--)o+=` L ${s(e)} ${a[e]} L ${s(e)} ${a[e-1]}`;return o+=` L ${s(0)} ${a[0]} Z`,o}render(){const e=this.computeTimelineItems(),t=[...e].sort(((t,i)=>{const n=this.importanceRadiusForItem(t)*this.scaleForItem(t,e),s=this.importanceRadiusForItem(i)*this.scaleForItem(i,e);return s!==n?s-n:t.instanceKey.localeCompare(i.instanceKey)})),i=this.layoutPersistentLabels(e),n=500,s=480,r=[];for(let e=Math.ceil(ze);e<=Math.floor(Ue);e++)r.push(e);const a=2016+5/12,o=2016+5/12,l=2016.75,c=l,d=2017+5/12,h=2017+8/12,p=2024+4/12,m=2024+8/12,u=Array.from(new Set([ze,a,l,d,h,p,m,Ue])).sort(((e,t)=>e-t)),g=e=>e>=o&&e<l||e>=h&&e<p?1:e>=p?.2:0,f=e=>(e=>n-g(e)*s)(e)-2,v=497,y=this.xForYear(2016.5833333333335),$=this.xForYear(2018.8333333333335),b=this.xForYear(2022.1666666666665),_=this.xForYear(2025.5166666666667),k=this.xForYear(2021.5583333333334),w=2016.2083333333335,x=2017.0833333333335,A=2025.6833333333334,M=f(x)-11-5-11,E=f(A)-11-5-11,I=this.stepAreaPathFlatBottom(u,(e=>n-g(e)*s),n),S=this.stepAreaPathVariableBottom(u,(e=>{const t=g(e),i=(r=e)>=2016&&r<a||r>=c&&r<d?1:r>=m?.8:0;var r;return n-t*s-i*s}),(e=>n-g(e)*s));return O`
      <div class='timeline-scroll'>
        <svg class='timeline-svg' viewBox='0 0 ${this.timelineWidth} ${Re}' role='img'>
          <desc>Timeline of projects and publications by theme and time.</desc>

          <defs>
            <linearGradient
              id='area-edge-fade'
              gradientUnits='userSpaceOnUse'
              x1=${this.xForYear(ze)}
              y1='0'
              x2=${this.xForYear(Ue)}
              y2='0'
            >
              <stop offset=${-.031152647975070665} stop-color='black'></stop>
              <stop offset=${.03894080996885427} stop-color='white'></stop>
              <stop offset=${.9345794392523324} stop-color='white'></stop>
              <stop offset='1' stop-color='black'></stop>
            </linearGradient>
            <mask
              id='area-edge-fade-mask'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width=${this.timelineWidth}
              height=${Re}
            >
              <rect
                x='0'
                y='0'
                width=${this.timelineWidth}
                height=${Re}
                fill='url(#area-edge-fade)'
              ></rect>
            </mask>
            ${t.map(((e,t)=>e.project.image?F`
                <filter
                  id='timeline-dot-duotone-${t}'
                  x='-25%'
                  y='-25%'
                  width='150%'
                  height='150%'
                  color-interpolation-filters='sRGB'
                >
                  <feColorMatrix
                    in='SourceGraphic'
                    type='matrix'
                    values=${function(e){const[t,i,n]=Xe(e),s=t/255,r=i/255,a=n/255,o=.2126,l=.7152,c=.0722;return[o*s,l*s,c*s,0,0,o*r,l*r,c*r,0,0,o*a,l*a,c*a,0,0,0,0,0,1,0].map((e=>e.toFixed(5))).join(" ")}(e.dotColor)}
                  ></feColorMatrix>
                </filter>
                <clipPath id='timeline-dot-clip-${t}'>
                  <circle
                    cx='0'
                    cy='0'
                    r=${this.importanceRadiusForItem(e)}
                  ></circle>
                </clipPath>
              `:null))}
          </defs>

          <rect x='0' y='0' width='${this.timelineWidth}' height='${Re}' fill='#ffffff'></rect>

          <g mask='url(#area-edge-fade-mask)'>
            <path
              d=${I}
              fill='#7289a8'
              fill-opacity='0.2'
              stroke='#ffffff'
              stroke-opacity='0.95'
              stroke-width='2.5'
              stroke-linejoin='miter'
            ></path>
            <path
              d=${S}
              fill='#7289a8'
              fill-opacity='0.1'
              stroke='#ffffff'
              stroke-opacity='0.95'
              stroke-width='2.5'
              stroke-linejoin='miter'
            ></path>
          </g>

          ${r.map((e=>F`
              <line
                x1=${this.xForYear(e)}
                y1=${20}
                x2=${this.xForYear(e)}
                y2=${n}
                stroke='#1a1a1a'
                stroke-opacity='0.05'
                stroke-width='1'
              ></line>
              <text
                class='timeline-year-label'
                x=${this.xForYear(e)}
                y=${16}
                text-anchor='middle'
              >
                ${e}
              </text>
            `))}

          ${F`
            <g class='timeline-area-annotations'>
              <text
                class='timeline-area-hero'
                x=${k}
                y=${470}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                Google
              </text>
              <text
                class='timeline-area-subln'
                x=${y}
                y=${v}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                intern
              </text>
              <text
                class='timeline-area-subln'
                x=${$}
                y=${v}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                Brain
              </text>
              <text
                class='timeline-area-subln'
                x=${b}
                y=${v}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                Responsible AI
              </text>
              <text
                class='timeline-area-subln'
                x=${_}
                y=${v}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                DeepMind
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(w)}
                y=${f(w)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                BS
              </text>
              <text
                class='timeline-area-hero'
                x=${this.xForYear(x)}
                y=${M}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                Brown
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(x)}
                y=${f(x)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                MS
              </text>
              <text
                class='timeline-area-hero'
                x=${this.xForYear(A)}
                y=${E}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                UW
              </text>
              <text
                class='timeline-area-tag'
                x=${this.xForYear(A)}
                y=${f(A)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                phD
              </text>
            </g>
          `}

          ${Fe.map(((e,t)=>F`
              <line
                x1=${165}
                y1=${Ne+t*He}
                x2=${this.timelineWidth-50}
                y2=${Ne+t*He}
                stroke='#4e4e4e'
                stroke-opacity='0.1'
                stroke-width='3.2'
              ></line>
              <text
                class='timeline-lane-label'
                x=${158}
                y=${Ne+t*He+4}
                text-anchor='end'
              >
                ${Be[e].toUpperCase()}
              </text>
            `))}

          ${Ae(t,(e=>e.instanceKey),((t,i)=>{const n=this.importanceRadiusForItem(t),s=(()=>(t.instanceKey===this.hoveredInstanceKey?Math.min(1,this.itemOpacity(t)+.32):this.itemOpacity(t))*this.networkHighlightFactor(t.project))(),r=Boolean(t.project.image);return F`
              <g
                class='timeline-dot-group'
                transform='translate(${t.x} ${t.laneY})'
                @mouseenter=${()=>{this.hoveredInstanceKey=t.instanceKey}}
                @mouseleave=${()=>{this.hoveredInstanceKey=null}}
                @click=${()=>{const e=t.preferredLink;e&&window.open(e,"_blank","noopener")}}
              >
                <g
                  class='timeline-dot-scale'
                  transform='scale(${this.scaleForItem(t,e)})'
                  opacity=${s}
                >
                  ${r?F`
                  <g clip-path='url(#timeline-dot-clip-${i})'>
                    <image
                      href='./images/${t.project.image}'
                      x=${-n}
                      y=${-n}
                      width=${2*n}
                      height=${2*n}
                      preserveAspectRatio='xMidYMid slice'
                      filter='url(#timeline-dot-duotone-${i})'
                    ></image>
                  </g>
                `:F`
                  <circle
                    class='timeline-dot'
                    cx='0'
                    cy='0'
                    r=${n}
                    fill=${t.dotColor}
                    fill-opacity='1'
                    stroke='none'
                    stroke-width='0'
                  ></circle>
                `}
                  <title>${t.labelTitle}</title>
                </g>
              </g>
            `}))}

          ${i.map((t=>{const i=this.scaleForItem(t.item,e),n=this.importanceRadiusForItem(t.item)*i+3,s=t.item.x,r=t.item.laneY,a=t.item.instanceKey===this.hoveredInstanceKey,o=t.y+t.height,l=a?Math.max(o,t.y+this.hoveredCardHeight):o,c=t.y,d=a?Math.min(c,o-this.hoveredCardHeight):c,h="down"===t.direction?r+n:d,p="down"===t.direction?l:r-n,m=["timeline-persistent-line","down"===t.direction?"down":"",a?"hovered":""].filter(Boolean).join(" "),u=["timeline-persistent-ring",t.direction,"down"===t.direction?"down":"",a?"hovered":""].filter(Boolean).join(" "),g=`M ${s-n} ${r} A ${n} ${n} 0 0 ${"down"===t.direction?0:1} ${s+n} ${r}`,f=this.networkHighlightFactor(t.item.project),v=`stroke-opacity: ${(a?1:"down"===t.direction?.35:.75)*f}`;return F`
              <line
                class=${m}
                style=${v}
                x1=${s}
                y1=${h}
                x2=${s}
                y2=${p}
                stroke=${t.item.dotColor}
              ></line>
              <path
                class=${u}
                style=${v}
                d=${g}
                fill='none'
                stroke=${t.item.dotColor}
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>
              ${a?F`
              <circle
                class=${[u,"timeline-persistent-ring-full"].join(" ")}
                style=${v}
                cx=${s}
                cy=${r}
                r=${n}
                fill='none'
                stroke=${t.item.dotColor}
                pathLength='100'
                stroke-linecap='round'
              ></circle>
            `:null}
            `}))}

          ${i.map((e=>{const t="right"===e.side?"start":"end",i="right"===e.side?e.x+3:e.x-3,n=e.item.instanceKey===this.hoveredInstanceKey?"timeline-persistent-label hovered":"timeline-persistent-label",s=this.networkHighlightFactor(e.item.project);return F`
            <g
              class=${n}
              opacity=${s}
              @mouseenter=${()=>{this.hoveredInstanceKey=e.item.instanceKey}}
              @mouseleave=${()=>{this.hoveredInstanceKey=null}}
              @click=${()=>{const t=e.item.preferredLink;t&&window.open(t,"_blank","noopener")}}
            >
              ${e.lines.map(((n,s)=>F`
                  <text
                    class='timeline-persistent-label-text'
                    x=${i}
                    y=${e.y+2+8+11*s}
                    text-anchor=${t}
                  >
                    ${n}
                  </text>
                `))}
            </g>
          `}))}
        </svg>
        <div class='timeline-bottom-controls'>
          <div class='timeline-tags-block'>
            <div class='timeline-network-chips-label' id='timeline-themes-label'>
              Themes
            </div>
            <div
              class='timeline-network-chips'
              role='group'
              aria-labelledby='timeline-themes-label'
              @mouseleave=${()=>{this.hoveredNetworkId=null}}
            >
              ${Pe.map((e=>O`
                  <button
                    type='button'
                    class=${"timeline-network-chip"+(this.hoveredNetworkId===e?" active":"")}
                    @mouseenter=${()=>{this.hoveredNetworkId=e}}
                    @focus=${()=>{this.hoveredNetworkId=e}}
                    @blur=${()=>{this.hoveredNetworkId=null}}
                  >
                    ${Ie[e]}
                  </button>
                `))}
            </div>
          </div>
          <div
            class='timeline-dot-size-row'
            role='group'
            aria-label='Dot size: favorites or citations'
          >
            <span class='timeline-dot-size-heading'>Dot size</span>
            <div class='timeline-dot-size-toggle'>
              <span
                class=${"importance"===this.sizeMode?"timeline-dot-size-option active":"timeline-dot-size-option"}
              >
                favorites
              </span>
              <label class='timeline-switch timeline-switch--chip-scale'>
                <input
                  type='checkbox'
                  ?checked=${"publication"===this.sizeMode}
                  @change=${e=>{const t=e.target.checked;this.sizeMode=t?"publication":"importance"}}
                />
                <span class='timeline-switch-track'></span>
              </label>
              <span
                class=${"publication"===this.sizeMode?"timeline-dot-size-option active":"timeline-dot-size-option"}
              >
                citations
              </span>
            </div>
          </div>
        </div>
        ${i.map((e=>{const t=e.item.instanceKey===this.hoveredInstanceKey,i=e.item.isPublication?"paper":"project",n=e.item.project.venue,s="right"===e.side,r="up"===e.direction,a=e.y+2,o=a+11*Math.max(1,e.lines.length),l=[];s?l.push(`left:${e.x+1}px`):l.push(`right:calc(100% - ${Math.max(0,e.x-1)}px)`),r?l.push(`bottom:calc(100% - ${o}px)`):l.push(`top:${a-2}px`),l.push(`transform-origin:${s?"left":"right"} ${r?"bottom":"top"}`),l.push("text-align:"+(s?"left":"right"));return O`
            <div
              class=${`timeline-hover-card ${s?"anchor-right":"anchor-left"} ${r?"grow-up":"grow-down"} ${t?"hovered":""}`}
              style=${l.join(";")}
              @mouseenter=${()=>{this.hoveredInstanceKey=e.item.instanceKey}}
              @mouseleave=${()=>{this.hoveredInstanceKey=null}}
              @click=${()=>{const t=e.item.preferredLink;t&&window.open(t,"_blank","noopener")}}
            >
              <div class='timeline-hover-card-body'>
                <div class='timeline-hover-card-title'>
                  ${e.item.cardTitle}
                </div>
                <div class='timeline-hover-card-meta'>
                  <span class=${`timeline-hover-card-chip ${i}`}
                    >${i}</span
                  >
                  ${n?O`<span class='timeline-hover-card-venue'
                        >${n}</span
                      >`:null}
                </div>
                <div class='timeline-hover-card-description'>
                  ${e.item.cardDescription}
                </div>
              </div>
            </div>
          `}))}
      </div>
    `}};e([ue()],nt.prototype,"sizeMode",void 0),e([ue()],nt.prototype,"timelineWidth",void 0),e([ue()],nt.prototype,"hoveredInstanceKey",void 0),e([ue()],nt.prototype,"hoveredNetworkId",void 0),e([ue()],nt.prototype,"hoveredCardHeight",void 0),nt=e([he("timeline-component")],nt);let st=class extends ce{createRenderRoot(){return this}render(){return O`
    <div class='topbar'>
      ${this.renderNav("about","#about")}
      ${this.renderNav("timeline","#timeline")}
      ${this.renderNav("projects","#projects")}
      ${this.renderNav("papers [↗]","https://scholar.google.com/citations?user=J1hMgtAAAAAJ")}
    </div>
    <div class='about-holder'>
      <div class='content'>
        <h1 class='font-lg' id='about'>Emily Reif</h1>
        ${this.renderAbout()}
      </div>
    </div>
    ${O`
    <div class='content timeline-content'>
      <div class='timeline-title-wrap'>
        <h1 class='font-lg' id='timeline'>Professional timeline</h1>
      </div>
      <timeline-component></timeline-component>
    </div>
    `}
    <div class='content'>
      <h1 class='font-lg'  id='projects'>Projects</h1>
      ${this.renderProjects()}
    </div> 
    `}renderExternal(){const e=(e,t)=>O`
        <a href=${t} target="_blank" class='icon-link'><img src='./images/${e}'></img></a>
      `;return O`
    <div class='external'>
      ${e("twitter.png","https://twitter.com/emilyrreif")}
      ${e("github.png","https://github.com/EmilyReif")}
      ${e("scholar.png","https://scholar.google.com/citations?user=J1hMgtAAAAAJ")}
    </div> `}renderNav(e,t){return O`<div class='nav'> <a href=${t}>${e}</a></div>`}renderAbout(){return O`
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
    `}link(e,t){return O`<a class='upper' href=${t} target="_blank">${e}</a>`}renderProjects(){return Ae(Le,(e=>e.name),(e=>this.renderProject(e)))}renderProject(e){const t=e.links.map((e=>O`<div>${this.link(e.name,e.link)}</div>`));return O`
    <div class='title'>${e.name}</div>
    <div class='project'>
      <a class='img-holder'  href=${e.links[0].link} target="_blank"> <img src="./images/${e.image}"></img></a>

      <div class='info font-sm'>
        <div>${e.description}</div>
        <div class='project-links'>
          ${t}
        </div>
      </div>
    </div>
    `}};st=e([he("index-component")],st);
//# sourceMappingURL=index.c083d765.js.map
