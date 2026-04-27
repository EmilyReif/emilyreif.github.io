function e(e,t,i,n){var r,s=arguments.length,a=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(a=(s<3?r(a):s>3?r(t,i,a):r(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}Object.create;Object.create;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}}const a=(e,n)=>{i?e.adoptedStyleSheets=n.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):n.forEach((i=>{const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,e.appendChild(n)}))},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",p=c.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:u},f="finalized";class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const n=this._$Ep(i,t);void 0!==n&&(this._$Ev.set(n,i),e.push(n))})),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var n;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:m).toAttribute(t,i.type);this._$El=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const n=this.constructor,r=n._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=n.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:m;this._$El=r,this[r]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $;v[f]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,_=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",k=`lit$${(Math.random()+"").slice(9)}$`,x="?"+k,A=`<${x}>`,E=document,S=()=>E.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,C=e=>P(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),j="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,R=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,T=/^(?:script|style|textarea|title)$/i,U=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),O=U(1),F=U(2),B=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),D=new WeakMap,W=E.createTreeWalker(E,129,null,!1);function V(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,n=[];let r,s=2===t?"<svg>":"",a=I;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===I?"!--"===l[1]?a=L:void 0!==l[1]?a=N:void 0!==l[2]?(T.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=null!=r?r:I,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?R:'"'===l[3]?z:H):a===z||a===H?a=R:a===L||a===N?a=I:(a=R,r=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";s+=a===I?i+A:c>=0?(n.push(o),i.slice(0,c)+w+i.slice(c)+k+h):i+k+(-2===c?(n.push(void 0),t):h)}return[V(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),n]};class q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,s=0;const a=e.length-1,o=this.parts,[l,c]=G(e,t);if(this.el=q.createElement(l,i),W.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=W.nextNode())&&o.length<a;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith(w)||t.startsWith(k)){const i=c[s++];if(e.push(t),void 0!==i){const e=n.getAttribute(i.toLowerCase()+w).split(k),t=/([.?@])?(.*)/.exec(i);o.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?X:"?"===t[1]?te:"@"===t[1]?ie:Z})}else o.push({type:6,index:r})}for(const t of e)n.removeAttribute(t)}if(T.test(n.tagName)){const e=n.textContent.split(k),t=e.length-1;if(t>0){n.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],S()),W.nextNode(),o.push({type:2,index:++r});n.append(e[t],S())}}}else if(8===n.nodeType)if(n.data===x)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(k,e+1));)o.push({type:7,index:r}),e+=k.length-1}r++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,n){var r,s,a,o;if(t===B)return t;let l=void 0!==n?null===(r=i._$Co)||void 0===r?void 0:r[n]:i._$Cl;const c=M(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,n)),void 0!==n?(null!==(a=(o=i)._$Co)&&void 0!==a?a:o._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(t=K(e,l._$AS(e,t.values),l,n)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:E).importNode(i,!0);W.currentNode=r;let s=W.nextNode(),a=0,o=0,l=n[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new Q(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new ne(s,this,e)),this._$AV.push(t),l=n[++o]}a!==(null==l?void 0:l.index)&&(s=W.nextNode(),a++)}return W.currentNode=E,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{constructor(e,t,i,n){var r;this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=null===(r=null==n?void 0:n.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),M(e)?e===Y||null==e||""===e?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):C(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Y&&M(this._$AH)?this._$AA.nextSibling.data=e:this.$(E.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,r="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=q.createElement(V(n.h,n.h[0]),this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new J(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new q(e)),t}T(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new Q(this.k(S()),this.k(S()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,n,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const r=this.strings;let s=!1;if(void 0===r)e=K(this,e,t,0),s=!M(e)||e!==this._$AH&&e!==B,s&&(this._$AH=e);else{const n=e;let a,o;for(e=r[0],a=0;a<r.length-1;a++)o=K(this,n[i+a],t,a),o===B&&(o=this._$AH[a]),s||(s=!M(o)||o!==this._$AH[a]),o===Y?e=Y:e!==Y&&(e+=(null!=o?o:"")+r[a+1]),this._$AH[a]=o}s&&!n&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class X extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}}const ee=b?b.emptyScript:"";class te extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Y?this.element.setAttribute(this.name,ee):this.element.removeAttribute(this.name)}}class ie extends Z{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=K(this,e,t,0))&&void 0!==i?i:Y)===B)return;const n=this._$AH,r=e===Y&&n!==Y||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==Y&&(n===Y||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const re={O:w,P:k,A:x,C:1,M:G,L:J,R:C,D:K,I:Q,V:Z,H:te,N:ie,U:X,F:ne},se=y.litHtmlPolyfillSupport;null==se||se(q,Q),(null!==($=y.litHtmlVersions)&&void 0!==$?$:y.litHtmlVersions=[]).push("2.8.0");const ae=(e,t,i)=>{var n,r;const s=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:t;let a=s._$litPart$;if(void 0===a){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;s._$litPart$=a=new Q(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a};
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
 */const{I:$e}=re,ye=()=>document.createComment(""),be=(e,t,i)=>{var n;const r=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=r.insertBefore(ye(),s),n=r.insertBefore(ye(),s);i=new $e(t,n,e,e.options)}else{const t=i._$AB.nextSibling,a=i._$AM,o=a!==e;if(o){let t;null===(n=i._$AQ)||void 0===n||n.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==a._$AU&&i._$AP(t)}if(t!==s||o){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;r.insertBefore(e,s),e=t}}}return i},_e=(e,t,i=e)=>(e._$AI(t,i),e),we={},ke=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const n=e._$AB.nextSibling;for(;i!==n;){const e=i.nextSibling;i.remove(),i=e}},xe=(e,t,i)=>{const n=new Map;for(let r=t;r<=i;r++)n.set(e[r],r);return n},Ae=(Ee=class extends ve{constructor(e){if(super(e),e.type!==fe.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let n;void 0===i?i=t:void 0!==t&&(n=t);const r=[],s=[];let a=0;for(const t of e)r[a]=n?n(t,a):a,s[a]=i(t,a),a++;return{values:s,keys:r}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,n]){var r;const s=e._$AH,{values:a,keys:o}=this.ct(t,i,n);if(!Array.isArray(s))return this.ut=o,a;const l=null!==(r=this.ut)&&void 0!==r?r:this.ut=[],c=[];let d,h,p=0,m=s.length-1,u=0,g=a.length-1;for(;p<=m&&u<=g;)if(null===s[p])p++;else if(null===s[m])m--;else if(l[p]===o[u])c[u]=_e(s[p],a[u]),p++,u++;else if(l[m]===o[g])c[g]=_e(s[m],a[g]),m--,g--;else if(l[p]===o[g])c[g]=_e(s[p],a[g]),be(e,c[g+1],s[p]),p++,g--;else if(l[m]===o[u])c[u]=_e(s[m],a[u]),be(e,s[p],s[m]),m--,u++;else if(void 0===d&&(d=xe(o,u,g),h=xe(l,p,m)),d.has(l[p]))if(d.has(l[m])){const t=h.get(o[u]),i=void 0!==t?s[t]:null;if(null===i){const t=be(e,s[p]);_e(t,a[u]),c[u]=t}else c[u]=_e(i,a[u]),be(e,s[p],i),s[t]=null;u++}else ke(s[m]),m--;else ke(s[p]),p++;for(;u<=g;){const t=be(e,c[g+1]);_e(t,a[u]),c[u++]=t}for(;p<=m;){const e=s[p++];null!==e&&ke(e)}return this.ut=o,((e,t=we)=>{e._$AH=t})(e,c),B}},(...e)=>({_$litDirective$:Ee,values:e}));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ee;const Se=["llms_and_data","visualization","interpretability","experts_using_ai","kyd","embeddings"];new Map(["research","tools","creative_work"].map(((e,t)=>[e,t]))),new Map(Se.map(((e,t)=>[e,t])));const Me={llms_and_data:"LLMs and data",visualization:"Visualization",interpretability:"Interpretability",experts_using_ai:"Applications",kyd:"KYD",embeddings:"Embeddings"},Pe={"palm scaling language modeling with pathways":{year:2023,citations:2500,aliases:["palm palm2 rai data analysis"]},"palm 2 technical report":{year:2023,citations:1200,aliases:["palm + palm2 rai data analysis"]},"visualizing and understanding the geometry of bert":{year:2019,month:12,citations:650},"embedding projector":{year:2016,month:11,citations:2100},"language interpretability tool":{year:2020,month:11,citations:420},"a gentle introduction to graph neural networks":{year:2021,month:9,citations:520},"wordcraft story writing with large language models":{year:2022,citations:180,aliases:["wordcraft writers workshop"]},"a recipe for arbitrary text style transfer with large language models":{year:2022,citations:110,aliases:["a recipe for arbitrary text style transfer with llms"]},"a pretrainer s guide to training data measuring the effects of data age domain coverage quality toxicity":{year:2024,month:7,citations:65,aliases:["a pretrainer s guide to training data"]},"llm comparator interactive analysis of side by side evaluation of large language models":{year:2025,month:1,citations:55,aliases:["llm comparator"]},"automatic histograms leveraging language models for text dataset exploration":{year:2024,month:5,citations:18,aliases:["automatic histograms"]},"data similarity is not enough to explain language model performance":{year:2023,month:12,citations:28},"an interpretability illusion for bert":{year:2021,citations:95},"evaluating attribution for graph neural networks":{year:2020,month:12,citations:135},"so und framework analyzing so cial representation in un structured d ata":{year:2024,citations:15,aliases:["sound analyzing social representation in unstructured data","developing a conceptual framework for analyzing people in unstructured data"]},"understanding the dataset practitioners behind large language models":{year:2024,citations:12,aliases:["understanding the dataset practitioners behind large language model development"]},"llm adoption in industry data curation practices":{year:2024,citations:16,aliases:["the evolution of llm adoption in industry data curation practices","llm adoption in data curation workflows industry practices and insights","llm adoption in data curation workflows: industry practices and insights"]},"who s asking user personas and the mechanics of latent misalignment":{year:2024,citations:10,aliases:["who s asking user personas and the mechanics of latent misalignment"]},"rdoflow automatically assessing under specified statistical analyses in hci":{year:2026,month:7,citations:2,aliases:["rdoflow automatically assessing under specified statistical analyses in hci"]},"the case for a single model that can both generate continuations and fill in the blank":{year:2022,citations:90},smily:{year:2019,citations:240,aliases:["smily hitl tool for pathologists"]},"neural networks trained on natural scenes exhibit gestalt closure":{year:2021,citations:95,aliases:["nns and gestalt"]},"developing a conceptual framework for analyzing people in unstructured data":{year:2023,month:10,citations:10},"know your data":{year:2021,month:5,citations:10},"moodboard search":{year:2023,month:1,citations:10,aliases:["mood board search enabling ai powered creative expression"]},"probing pretraining data":{year:2024,month:7,citations:10,aliases:["probing heterogeneous pretraining datasets with small curated datasets"]},"reverse rorschach":{year:2023,month:6,citations:10},"superlative instruments":{year:2019,month:11,citations:10},"improving solar panel efficiency using reinforcement learning":{year:2017,citations:10,aliases:["bandit-based solar panel control","toward improving solar panel efficiency using reinforcement learning","solar panel tracking and control reinforcement learning"]},toymaker:{year:2017,month:11,citations:10},"waterfall of meaning":{year:2019,month:6,citations:10}},Ce=[{name:"Visualizing Distributions of Language Model Generations",description:"Visualizations to explore, compare, and reason about distributions of language model outputs for a single input.",links:[{link:"https://arxiv.org/pdf/2604.18724",name:"paper"},{link:"https://emilyreif.com/llm-consistency-vis/interactive_article",name:"article"},{link:"https://emilyreif.com/llm-consistency-vis/",name:"demo"}],image:"llm_consistency_vis.png",categories:["research","tools"],networks:["llms_and_data","visualization","interpretability"]},{name:"PALM + PALM2: RAI data analysis",description:"Responsible AI analysis on PaLM and PaLM2 pre-training data",links:[{link:"https://arxiv.org/abs/2204.02311",name:"PaLM paper"},{link:"https://arxiv.org/abs/2305.10403",name:"PaLM2 technical report"}],image:"topics.png",categories:["research"],networks:["llms_and_data","kyd"]},{name:"A pretrainer's guide to training data",description:"What happens when you systematically vary time, quality, toxicity, and domain of pre-training data for LLMs?",links:[{link:"https://aclanthology.org/2024.naacl-long.179/",name:"paper"}],image:"pretraining.jpg",categories:["research"],networks:["llms_and_data","kyd"]},{name:"A recipe for arbitrary text style transfer with LLMs",description:"Using LLMs for arbitrary text style transfer, with a natural language interface",links:[{link:"https://arxiv.org/abs/2109.03910",name:"paper"},{link:"https://storage.googleapis.com/style-transfer-paper-123/index.html",name:"styled text"}],image:"style_transfer.png",categories:["research"],networks:["llms_and_data"]},{name:"A gentle introduction to graph neural networks",description:"Visualization-based distill.pub article on understanding GNNs",links:[{link:"https://distill.pub/2021/gnn-intro",name:"paper"}],image:"gnn.png",categories:["research"],networks:["visualization"]},{name:"Visualizing and understanding the geometry of BERT",description:"How are syntax and semantics are encoded in transformers?",links:[{link:"https://proceedings.neurips.cc/paper_files/paper/2019/hash/159c1ffe5b61b41b3c4d8f4c2150f6c4-Abstract.html",name:"Paper"},{link:"https://pair-code.github.io/interpretability/context-atlas/blogpost/",name:"tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/context-atlas",name:"code"}],image:"bert.png",categories:["research"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Waterfall of meaning",description:"Art piece exploring the internals of LMs. Shown with the Barbican AI - More Than Human exhibit in  London, China, and Spain",links:[{link:"https://artsandculture.google.com/story/xgVxw84BWGgnLg",name:"article"},{link:"https://storage.googleapis.com/waterfall-of-meaning/demo/standalone.html",name:"online piece"},{link:"https://github.com/PAIR-code/waterfall-of-meaning",name:"code"}],image:"waterfall_of_meaning.png",categories:["creative_work"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Linguistic Lens",description:"Interactive visualization tool for understanding grammatical diversity in LLM-generated text",links:[{link:"https://arxiv.org/pdf/2305.11364.pdf",name:"paper"},{link:"https://storage.googleapis.com/data-synth-trees/demo/index.html",name:"Tool"},{link:"https://github.com/PAIR-code/interpretability/tree/master/data-synth-syntax",name:"code"}],image:"linguisticlens.png",categories:["research","tools"],networks:["llms_and_data","visualization"]},{name:"Know Your Data",description:O`Tool for understanding large datasets using data augmentation and visualization <br><br> (I led the text version, which was internal to Google)`,links:[{link:"https://knowyourdata.withgoogle.com/",name:"KnowYourData"}],image:"knowyourdata.png",categories:["tools"],networks:["llms_and_data","visualization","kyd"]},{name:"LLM Comparator",description:"Interactive side-by-side comparison of llm-generated datasets",links:[{link:"https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10670495",name:"paper"}],image:"llm_comp.png",categories:["research","tools"],networks:["llms_and_data","visualization"]},{name:"Embedding projector",description:"A tool for interactive visualization and interpretation of embeddings",links:[{link:"https://arxiv.org/abs/1611.05469",name:"paper"},{link:"https://projector.tensorflow.org/",name:"Tool"}],image:"embeddingprojector.png",categories:["research","tools"],networks:["llms_and_data","visualization","interpretability","embeddings"]},{name:"Automatic Histograms",description:"Leveraging language models for text dataset exploration by creating entity-based features on-the-fly.",links:[{link:"https://dl.acm.org/doi/pdf/10.1145/3613905.3650798",name:"paper"}],image:"ah.png",categories:["research","tools"],networks:["llms_and_data","visualization","kyd"]},{name:"Wordcraft writers workshop",description:"LLM-powered writing assistant for a workshop with professional writers including Ken Lui and Robin Sloan. Illustrated with a generative image model",links:[{link:"https://wordcraft-writers-workshop.appspot.com/",name:"stories"},{link:"https://arxiv.org/abs/2107.07430",name:"paper"}],image:"wordcraft.jpg",categories:["research","tools","creative_work"],networks:["experts_using_ai"]},{name:"Language interpretability tool",description:"Open-source platform for visualizing and understanding language models",links:[{link:"https://pair-code.github.io/lit/",name:"site"},{link:"https://arxiv.org/abs/2008.05122",name:"paper"}],image:"lit.png",categories:["research","tools"],networks:["interpretability"]},{name:"Probing pretraining data",description:"Probing heterogeneous pretraining datasets with small curated datasets",links:[{link:"https://gyauney.github.io/papers/probing-heterogeneous-datasets_poster.pdf",name:"poster"}],image:"probing.png",categories:["research"],networks:["llms_and_data","interpretability","kyd","embeddings"]},{name:"NNs and gestalt",description:"Neural networks trained on natural scenes exhibit gestalt closure",links:[{link:"https://link.springer.com/article/10.1007/s42113-021-00100-7",name:"paper"}],image:"gestalt.png",categories:["research"],networks:["interpretability"]},{name:"Moodboard search",description:O`AI-powered creative expression using subjective concepts and embeddings<br><br>Winner of 2023 interaction award`,links:[{link:"https://awards.ixda.org/projects/mood-board-search-enabling-ai-powered-creative-expression.html",name:"site"}],image:"cavcam.png",categories:["creative_work"],networks:["embeddings","experts_using_ai"]},{name:"Reverse rorschach",description:O`Installation by artist Shahryar Nashat using text-to-image generation model. <br><br>helped with intial brainstorming + proof of concepts, and got the technical pieces working`,links:[{link:"https://sylviakouvali.com/exhibitions/reverse-rorschach/",name:"site"}],image:"rorsch.png",categories:["creative_work"],networks:["experts_using_ai"]},{name:"SMILY: HITL tool for pathologists",description:"Human-centered tools for coping with imperfect algorithms during medical decision-making",links:[{link:"https://dl.acm.org/doi/abs/10.1145/3290605.3300234",name:"paper"}],image:"smily.png",categories:["research","tools"],networks:["experts_using_ai","embeddings"]},{name:"Superlative Instruments",description:"Synthesizers, not AI research. implemented the website, helped with company ops, etc",links:[{link:"https://playsuperlative.com/",name:"site"}],image:"superlative.png",categories:["creative_work"],networks:[]},{name:"Evaluating attribution for graph neural networks",description:"Quantitative evaluation of attribution methods for GNNs with synthetic ground truth",links:[{link:"https://proceedings.neurips.cc/paper_files/paper/2020/hash/417fbbf2e9d5a28a855a11894b2e795a-Abstract.html",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability"]},{name:"An interpretability illusion for BERT",description:"Phenomena that can make BERT-based interpretability tools appear more reliable than they are",links:[{link:"https://arxiv.org/abs/2104.07143",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability","embeddings"]},{name:"Who's asking? User personas and the mechanics of latent misalignment",description:"How implicit user personas affect model behavior and safety",links:[{link:"https://arxiv.org/abs/2406.12094",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["interpretability","embeddings"]},{name:"Understanding the dataset practitioners behind large language model development",description:"Interviews and analysis of data practitioners in LLM development (CHI 2024 extended abstract)",links:[{link:"https://arxiv.org/abs/2402.16611",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data"]},{name:"Data similarity is not enough to explain language model performance",description:"Similarity to pretraining data often does not track downstream task accuracy",links:[{link:"https://aclanthology.org/2023.emnlp-main.695/",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","interpretability","embeddings","kyd"]},{name:"LLM adoption in industry data curation practices",description:"Survey, interviews, and user studies on how data teams adopt LLMs in curation workflows (2024 paper), plus a CHI 2025 extended abstract with further industry insights.",links:[{link:"https://arxiv.org/abs/2412.16089",name:"paper (2024)"},{link:"https://researchr.org/publication/QianLRSHCWCTK25",name:"CHI 2025 extended abstract"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","experts_using_ai","kyd"]},{name:"SoUnD: analyzing social representation in unstructured data",description:"Framework for RAI analysis of who and what is represented in foundation model training data (AIES 2024). Builds on an earlier workshop paper developing the conceptual framework.",links:[{link:"https://arxiv.org/abs/2311.17259",name:"paper (SoUnD)"},{link:"https://openreview.net/forum?id=QSPHfgw5fp",name:"workshop paper (framework)"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data","kyd"]},{name:"RDoFlow: automatically assessing under-specified statistical analyses in HCI",description:"IUI 2026",links:[{link:"https://iui.acm.org/2026/accepted-papers/",name:"venue"}],hide_in_main_list:!0,categories:["research"],networks:[]},{name:"The case for a single model that can both generate continuations and fill-in-the-blank",description:"Pretraining and fine-tuning for both continuation and fit-b (NAACL 2022 findings)",links:[{link:"https://aclanthology.org/2022.findings-naacl.185/",name:"paper"}],hide_in_main_list:!0,categories:["research"],networks:["llms_and_data"]},{name:"Solar panel tracking and control (reinforcement learning)",description:"Brown MS work on reinforcement learning for solar tracking and control: RLDM 2017 and EnviroInfo 2017 on efficiency improvements, AAAI 2018 on bandit-based control, plus a related write-up on improving efficiency.",links:[{link:"http://cs.brown.edu/~dabel/papers/solarl.pdf",name:"RLDM 2017 paper"},{link:"http://cs.brown.edu/~dabel/papers/solarl_enviro_info.pdf",name:"EnviroInfo 2017 paper"},{link:"https://aaai.org/papers/11415-bandit-based-solar-panel-control",name:"AAAI 2018 (bandit control)"}],hide_in_main_list:!0,categories:["research"],networks:["experts_using_ai"]},{name:"Toymaker",description:O`Animated short, not AI research. character animation lead / cloth sim lead / shading / modeling. <br><br> Screened at festivals including KIDS FIRST!, Green Bay, LA Int'l Children's, and PA Indie Shorts (2018–2019)`,links:[{link:"https://vimeo.com/242488116",name:"video"}],image:"toymaker.png",categories:["creative_work"],networks:[]}],je=Ce.filter((e=>!e.hide_in_main_list)),Ie=Se.filter((e=>"kyd"!==e)),Le=700,Ne=170,Re=150,He=26,ze=2016,Te=2026.7,Ue={research:"#e4a823",tools:"#A52A2A",creative_work:"#2F4F4F"},Oe={research:"research",tools:"tools",creative_work:"creative_work"},Fe=["research","tools","creative_work"],Be={research:"Research",tools:"Tools",creative_work:"Art etc"};function Ye(e){return e.toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function De(e){const t=Ye(e);for(const[e,i]of Object.entries(Pe)){if(Ye(e)===t)return i;if((i.aliases??[]).some((e=>Ye(e)===t)))return i}}function We(e){const t=(e.match(/(19|20)\d{2}/g)??[]).map((e=>Number(e))).filter((e=>e>=1990&&e<=2035));if(t.length>0)return t[t.length-1];const i=e.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);return i?2e3+Number(i[1]):void 0}function Ve(e){const t=e.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\./i);if(t)return{year:2e3+Number(t[1]),month:Number(t[2])};const i=e.match(/((?:19|20)\d{2})[\/\-_\.](0[1-9]|1[0-2])(?:[\/\-_\.]|$)/);return i?{year:Number(i[1]),month:Number(i[2])}:void 0}function Ge(e,t){return!t||t<1||t>12?e+.5:e+(t-1)/12}function qe(e){const t=e.replace("#","");return[Number.parseInt(t.slice(0,2),16),Number.parseInt(t.slice(2,4),16),Number.parseInt(t.slice(4,6),16)]}function Ke([e,t,i]){const n=e=>e.toString(16).padStart(2,"0");return`#${n(Math.round(e))}${n(Math.round(t))}${n(Math.round(i))}`}let Je=class extends ce{constructor(){super(),this.sizeMode="importance",this.timelineWidth=1500,this.hoveredProjectName=null,this.hoveredNetworkId=null,this.hoveredCardHeight=0}createRenderRoot(){return this}firstUpdated(){const e=this.querySelector(".timeline-scroll");if(!e)return;const t=()=>{this.timelineWidth=Math.max(e.clientWidth,320)};t(),this.resizeObserver=new ResizeObserver((()=>{t()})),this.resizeObserver.observe(e)}disconnectedCallback(){this.resizeObserver?.disconnect(),super.disconnectedCallback()}updated(e){if(e.has("hoveredProjectName"))if(this.hoveredProjectName){const e=this.querySelector(".timeline-hover-card.hovered");e&&(this.hoveredCardHeight=e.offsetHeight)}else this.hoveredCardHeight=0}xForYear(e){const t=this.timelineWidth-Ne-50;return Ne+(e-ze)/10.700000000000045*t}importanceRadiusForItem(e){if(e.hiddenFromMain)return 4;const t=e.preferenceFraction??.5;return 4+24*Math.pow(t,2.4)}publicationRadiusForItem(e,t){const i=t.map((e=>e.citationCount)),n=Math.min(...i),r=Math.max(...i);if(r===n)return 10;return 5+25*((Math.sqrt(e.citationCount)-Math.sqrt(n))/(Math.sqrt(r)-Math.sqrt(n)))}scaleForItem(e,t){const i=this.importanceRadiusForItem(e);return"importance"===this.sizeMode?1:this.publicationRadiusForItem(e,t)/Math.max(i,.1)}preferredProjectLink(e){const t=e.links.find((e=>{const t=e.name.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")}));return t?.link??e.links[0]?.link}shortPersistentLabelTitle(e){if(e.length>58&&e.includes(":")){const t=e.split(":")[0].trim();if(t.length>=16)return t}return e.length<=58?e:`${e.slice(0,55).replace(/\s+$/,"")}...`}wrapTextByWords(e,t,i){const n=e.split(/\s+/).filter(Boolean);if(0===n.length)return[""];const r=[];let s="";for(const e of n){const n=s?`${s} ${e}`:e;if(n.length<=t?s=n:(r.push(s||e),s=s&&s!==e?e:""),r.length===i)break}r.length<i&&s&&r.push(s),r.length>i&&(r.length=i);return r.join(" ").split(/\s+/).filter(Boolean).length<n.length&&r.length>0&&(r[r.length-1]=`${r[r.length-1].replace(/\.\.\.$/,"")}...`),r}rectsOverlap(e,t){return e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.y+e.height>t.y}hashedBit(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return 0==(1&t)}layoutPersistentLabels(e){const t=Re,i=t-30,n=Re+(Fe.length-1)*He+30,r=[],s=[],a=[];for(const o of e){const e=this.shortPersistentLabelTitle(o.project.name),l=this.wrapTextByWords(e,18,4),c=l.reduce(((e,t)=>Math.max(e,t.length)),0),d=Math.min(100,Math.max(40,Math.ceil(5.2*c))),h=4+11*l.length,p=o.isPublication?"paper":"proj",m=t+(Fe.length-1.5)*He,u=o.laneY>=m?"down":"up",g=this.hashedBit("h:"+o.project.name)?"right":"left",f="right"===g?"left":"right",v=[{direction:u,side:g},{direction:u,side:f}],$=h+5;let y,b,_;for(let e=0;e<80&&!y;e++){const t=e*$;for(const e of[!0,!1]){for(const r of v){const{direction:c,side:m}=r,u="up"===c?i-h-t:n+t;if("up"===c&&u<42)continue;if("down"===c&&u+h>692)continue;const g={x:"right"===m?o.x:o.x-d,y:u,width:d,height:h},f={x:g.x-3,y:g.y-3,width:g.width+6,height:g.height+6};if(s.some((e=>this.rectsOverlap(f,e))))continue;const v={x:o.x,y1:"down"===c?o.laneY:u,y2:"down"===c?u+h:o.laneY};if(e){if(s.some((e=>v.x>e.x&&v.x<e.x+e.width&&v.y1<e.y+e.height&&v.y2>e.y)))continue;if(a.some((e=>e.x>g.x&&e.x<g.x+g.width&&e.y1<g.y+g.height&&e.y2>g.y)))continue}y={item:o,x:o.x,y:u,width:d,height:h,direction:c,side:m,lines:l,kindText:p},b=g,_=v;break}if(y)break}}const w="up"===u?"down":"up",k=[{direction:w,side:g},{direction:w,side:f}];for(let e=0;e<40&&!y;e++){const t=e*$;for(const e of[!0,!1]){for(const r of k){const{direction:c,side:m}=r,u="up"===c?i-h-t:n+t;if("up"===c&&u<42)continue;if("down"===c&&u+h>692)continue;const g={x:"right"===m?o.x:o.x-d,y:u,width:d,height:h},f={x:g.x-3,y:g.y-3,width:g.width+6,height:g.height+6};if(s.some((e=>this.rectsOverlap(f,e))))continue;const v={x:o.x,y1:"down"===c?o.laneY:u,y2:"down"===c?u+h:o.laneY};if(e){if(s.some((e=>v.x>e.x&&v.x<e.x+e.width&&v.y1<e.y+e.height&&v.y2>e.y)))continue;if(a.some((e=>e.x>g.x&&e.x<g.x+g.width&&e.y1<g.y+g.height&&e.y2>g.y)))continue}y={item:o,x:o.x,y:u,width:d,height:h,direction:c,side:m,lines:l,kindText:p},b=g,_=v;break}if(y)break}}y&&b&&_&&(s.push(b),a.push(_)),y&&r.push(y)}for(let e=0;e<r.length;e++){const t=r[e],i=s[e];if(!a.some(((t,n)=>n!==e&&t.x>i.x&&t.x<i.x+i.width&&t.y1<i.y+i.height&&t.y2>i.y)))continue;const n="right"===t.side?"left":"right",o={x:"right"===n?t.item.x:t.item.x-t.width,y:i.y,width:i.width,height:i.height},l={x:o.x-3,y:o.y-3,width:o.width+6,height:o.height+6};if(s.some(((t,i)=>i!==e&&this.rectsOverlap(l,t))))continue;a.some(((t,i)=>i!==e&&t.x>o.x&&t.x<o.x+o.width&&t.y1<o.y+o.height&&t.y2>o.y))||(s[e]=o,r[e]={...t,side:n})}return r}itemOpacity(e){return"publication"!==this.sizeMode||e.isPublication?.68:.35}networkHighlightFactor(e){return this.hoveredNetworkId?e.networks.includes(this.hoveredNetworkId)?1:.12:1}computeTimelineItems(){const e=new Map;let t=0;for(const i of Ce)i.hide_in_main_list||(e.set(i.name,t),t+=1);const i=t,n=Ce.map((t=>{const n=De(t.name),r=(s=function(e){const t=[...e.links.filter((e=>{const t=e.name.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")})),...e.links];for(const e of t){const t=Ve(e.link);if(t)return Ge(t.year,t.month)}const i=De(e.name);if(i)return Ge(i.year,i.month);for(const t of e.links){const e=We(t.link);if(e)return Ge(e)}const n=e.name.match(/(19|20)\d{2}/);return Ge(n?Number(n[0]):2024)}(t),a=2016.02,o=2026.68,Math.min(o,Math.max(a,s)));var s,a,o;const l=function(e){return e.links.some((e=>{const t=e.name.toLowerCase(),i=e.link.toLowerCase();return t.includes("paper")||t.includes("publication")||t.includes("venue")||i.includes("arxiv.org")||i.includes("aclanthology.org")||i.includes("ieeexplore.ieee.org")||i.includes("dl.acm.org")||i.includes("proceedings.neurips.cc")}))}(t),c=n?.citations??10,d=function(e){const t=e.map((e=>qe(Ue[e]))),[i,n,r]=t.reduce(((e,[t,i,n])=>[e[0]+t,e[1]+i,e[2]+n]),[0,0,0]),s=Math.max(t.length,1);return Ke([i/s,n/s,r/s])}(t.categories),h=function(e,t=.7){const[i,n,r]=qe(e);return Ke([i*t,n*t,r*t])}(d),p=function(e){const t=Array.from(new Set(e.map((e=>Oe[e])).map((e=>Fe.indexOf(e)))));if(0===t.length)return Re;const i=t.reduce(((e,t)=>e+t),0)/t.length;return Re+i*He}(t.categories),m=this.xForYear(r),u=Boolean(t.hide_in_main_list),g=e.get(t.name);return{project:t,decimalYear:r,isPublication:l,citationCount:c,dotColor:d,strokeColor:h,laneY:p,x:m,hiddenFromMain:u,preferenceFraction:u||void 0===g?null:i<=1?1:1-g/(i-1)}})),r=new Map;for(const e of n){const t=`${Math.round(e.x/5)}|${Math.round(e.laneY/5)}`,i=r.get(t);i?i.push(e):r.set(t,[e])}return Array.from(r.values()).forEach((e=>{if(e.length<2)return;e.sort(((e,t)=>e.project.name.localeCompare(t.project.name)));const t=(e.length-1)/2;e.forEach(((e,i)=>{e.x+=6*(i-t)}))})),n}stepAreaPathFlatBottom(e,t,i){const n=e.length-1;if(n<0)return"";const r=t=>this.xForYear(e[t]),s=[];for(let i=0;i<n;i++){const n=(e[i]+e[i+1])/2;s.push(t(n))}let a=`M ${r(0)} ${s[0]}`;for(let e=0;e<n-1;e++)a+=` L ${r(e+1)} ${s[e]} L ${r(e+1)} ${s[e+1]}`;return a+=` L ${r(n)} ${s[n-1]}`,a+=` L ${r(n)} ${i} L ${r(0)} ${i} Z`,a}stepAreaPathVariableBottom(e,t,i){const n=e.length-1;if(n<0)return"";const r=t=>this.xForYear(e[t]),s=[],a=[];for(let r=0;r<n;r++){const n=(e[r]+e[r+1])/2;s.push(t(n)),a.push(i(n))}let o=`M ${r(0)} ${s[0]}`;for(let e=0;e<n-1;e++)o+=` L ${r(e+1)} ${s[e]} L ${r(e+1)} ${s[e+1]}`;o+=` L ${r(n)} ${s[n-1]}`,o+=` L ${r(n)} ${a[n-1]}`;for(let e=n-1;e>=1;e--)o+=` L ${r(e)} ${a[e]} L ${r(e)} ${a[e-1]}`;return o+=` L ${r(0)} ${a[0]} Z`,o}render(){const e=this.computeTimelineItems(),t=[...e].sort(((t,i)=>{const n=this.importanceRadiusForItem(t)*this.scaleForItem(t,e),r=this.importanceRadiusForItem(i)*this.scaleForItem(i,e);return r!==n?r-n:t.project.name.localeCompare(i.project.name)})),i=this.layoutPersistentLabels(e),n=500,r=480,s=[];for(let e=Math.ceil(ze);e<=Math.floor(Te);e++)s.push(e);const a=2016+5/12,o=2016+5/12,l=2016.75,c=l,d=2017+5/12,h=2017+8/12,p=2024+4/12,m=2024+8/12,u=Array.from(new Set([ze,a,l,d,h,p,m,Te])).sort(((e,t)=>e-t)),g=e=>e>=o&&e<l||e>=h&&e<p?1:e>=p?.2:0,f=e=>(e=>n-g(e)*r)(e)-2,v=497,$=this.xForYear(2016.5833333333335),y=this.xForYear(2018.8333333333335),b=this.xForYear(2022.1666666666665),_=this.xForYear(2025.5166666666667),w=this.xForYear(2021.5583333333334),k=2016.2083333333335,x=2017.0833333333335,A=2025.6833333333334,E=f(x)-11-5-11,S=f(A)-11-5-11,M=this.stepAreaPathFlatBottom(u,(e=>n-g(e)*r),n),P=this.stepAreaPathVariableBottom(u,(e=>{const t=g(e),i=(s=e)>=2016&&s<a||s>=c&&s<d?1:s>=m?.8:0;var s;return n-t*r-i*r}),(e=>n-g(e)*r));return O`
      <div class='timeline-scroll'>
        <svg class='timeline-svg' viewBox='0 0 ${this.timelineWidth} ${Le}' role='img'>
          <desc>Timeline of projects and publications by theme and time.</desc>

          <defs>
            <linearGradient
              id='area-edge-fade'
              gradientUnits='userSpaceOnUse'
              x1=${this.xForYear(ze)}
              y1='0'
              x2=${this.xForYear(Te)}
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
              height=${Le}
            >
              <rect
                x='0'
                y='0'
                width=${this.timelineWidth}
                height=${Le}
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
                    values=${function(e){const[t,i,n]=qe(e),r=t/255,s=i/255,a=n/255,o=.2126,l=.7152,c=.0722;return[o*r,l*r,c*r,0,0,o*s,l*s,c*s,0,0,o*a,l*a,c*a,0,0,0,0,0,1,0].map((e=>e.toFixed(5))).join(" ")}(e.dotColor)}
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

          <rect x='0' y='0' width='${this.timelineWidth}' height='${Le}' fill='#ffffff'></rect>

          <g mask='url(#area-edge-fade-mask)'>
            <path
              d=${M}
              fill='#7289a8'
              fill-opacity='0.2'
              stroke='#ffffff'
              stroke-opacity='0.95'
              stroke-width='2.5'
              stroke-linejoin='miter'
            ></path>
            <path
              d=${P}
              fill='#7289a8'
              fill-opacity='0.1'
              stroke='#ffffff'
              stroke-opacity='0.95'
              stroke-width='2.5'
              stroke-linejoin='miter'
            ></path>
          </g>

          ${s.map((e=>F`
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
                x=${w}
                y=${470}
                text-anchor='middle'
                dominant-baseline='middle'
              >
                Google
              </text>
              <text
                class='timeline-area-subln'
                x=${$}
                y=${v}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                intern
              </text>
              <text
                class='timeline-area-subln'
                x=${y}
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
                x=${this.xForYear(k)}
                y=${f(k)}
                text-anchor='middle'
                dominant-baseline='auto'
              >
                BS
              </text>
              <text
                class='timeline-area-hero'
                x=${this.xForYear(x)}
                y=${E}
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
                y=${S}
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
                y1=${Re+t*He}
                x2=${this.timelineWidth-50}
                y2=${Re+t*He}
                stroke='#4e4e4e'
                stroke-opacity='0.1'
                stroke-width='3.2'
              ></line>
              <text
                class='timeline-lane-label'
                x=${158}
                y=${Re+t*He+4}
                text-anchor='end'
              >
                ${Be[e].toUpperCase()}
              </text>
            `))}

          ${Ae(t,(e=>e.project.name),((t,i)=>{const n=this.importanceRadiusForItem(t),r=(()=>(t.project.name===this.hoveredProjectName?Math.min(1,this.itemOpacity(t)+.32):this.itemOpacity(t))*this.networkHighlightFactor(t.project))(),s=Boolean(t.project.image);return F`
              <g
                class='timeline-dot-group'
                transform='translate(${t.x} ${t.laneY})'
                @mouseenter=${()=>{this.hoveredProjectName=t.project.name}}
                @mouseleave=${()=>{this.hoveredProjectName=null}}
                @click=${()=>{const e=this.preferredProjectLink(t.project);e&&window.open(e,"_blank","noopener")}}
              >
                <g
                  class='timeline-dot-scale'
                  transform='scale(${this.scaleForItem(t,e)})'
                  opacity=${r}
                >
                  ${s?F`
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
                  <title>${t.project.name}</title>
                </g>
              </g>
            `}))}

          ${i.map((t=>{const i=this.scaleForItem(t.item,e),n=this.importanceRadiusForItem(t.item)*i+3,r=t.item.x,s=t.item.laneY,a=t.item.project.name===this.hoveredProjectName,o=t.y+t.height,l=a?Math.max(o,t.y+this.hoveredCardHeight):o,c=t.y,d=a?Math.min(c,o-this.hoveredCardHeight):c,h="down"===t.direction?s+n:d,p="down"===t.direction?l:s-n,m=["timeline-persistent-line","down"===t.direction?"down":"",a?"hovered":""].filter(Boolean).join(" "),u=["timeline-persistent-ring",t.direction,"down"===t.direction?"down":"",a?"hovered":""].filter(Boolean).join(" "),g=`M ${r-n} ${s} A ${n} ${n} 0 0 ${"down"===t.direction?0:1} ${r+n} ${s}`,f=this.networkHighlightFactor(t.item.project),v=`stroke-opacity: ${(a?1:"down"===t.direction?.35:.75)*f}`;return F`
              <line
                class=${m}
                style=${v}
                x1=${r}
                y1=${h}
                x2=${r}
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
                cx=${r}
                cy=${s}
                r=${n}
                fill='none'
                stroke=${t.item.dotColor}
                pathLength='100'
                stroke-linecap='round'
              ></circle>
            `:null}
            `}))}

          ${i.map((e=>{const t="right"===e.side?"start":"end",i="right"===e.side?e.x+3:e.x-3,n=e.item.project.name===this.hoveredProjectName?"timeline-persistent-label hovered":"timeline-persistent-label",r=this.networkHighlightFactor(e.item.project);return F`
            <g
              class=${n}
              opacity=${r}
              @mouseenter=${()=>{this.hoveredProjectName=e.item.project.name}}
              @mouseleave=${()=>{this.hoveredProjectName=null}}
              @click=${()=>{const t=this.preferredProjectLink(e.item.project);t&&window.open(t,"_blank","noopener")}}
            >
              ${e.lines.map(((n,r)=>F`
                  <text
                    class='timeline-persistent-label-text'
                    x=${i}
                    y=${e.y+2+8+11*r}
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
              ${Ie.map((e=>O`
                  <button
                    type='button'
                    class=${"timeline-network-chip"+(this.hoveredNetworkId===e?" active":"")}
                    @mouseenter=${()=>{this.hoveredNetworkId=e}}
                    @focus=${()=>{this.hoveredNetworkId=e}}
                    @blur=${()=>{this.hoveredNetworkId=null}}
                  >
                    ${Me[e]}
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
        ${i.map((e=>{const t=e.item.project.name===this.hoveredProjectName,i=e.item.isPublication?"paper":"project",n=e.item.project.venue,r="right"===e.side,s="up"===e.direction,a=e.y+2,o=a+11*Math.max(1,e.lines.length),l=[];r?l.push(`left:${e.x+1}px`):l.push(`right:calc(100% - ${Math.max(0,e.x-1)}px)`),s?l.push(`bottom:calc(100% - ${o}px)`):l.push(`top:${a-2}px`),l.push(`transform-origin:${r?"left":"right"} ${s?"bottom":"top"}`),l.push("text-align:"+(r?"left":"right"));return O`
            <div
              class=${`timeline-hover-card ${r?"anchor-right":"anchor-left"} ${s?"grow-up":"grow-down"} ${t?"hovered":""}`}
              style=${l.join(";")}
              @mouseenter=${()=>{this.hoveredProjectName=e.item.project.name}}
              @mouseleave=${()=>{this.hoveredProjectName=null}}
              @click=${()=>{const t=this.preferredProjectLink(e.item.project);t&&window.open(t,"_blank","noopener")}}
            >
              <div class='timeline-hover-card-body'>
                <div class='timeline-hover-card-title'>
                  ${e.item.project.name}
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
                  ${e.item.project.description}
                </div>
              </div>
            </div>
          `}))}
      </div>
    `}};e([ue()],Je.prototype,"sizeMode",void 0),e([ue()],Je.prototype,"timelineWidth",void 0),e([ue()],Je.prototype,"hoveredProjectName",void 0),e([ue()],Je.prototype,"hoveredNetworkId",void 0),e([ue()],Je.prototype,"hoveredCardHeight",void 0),Je=e([he("timeline-component")],Je);let Qe=class extends ce{createRenderRoot(){return this}render(){return O`
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
    `}link(e,t){return O`<a class='upper' href=${t} target="_blank">${e}</a>`}renderProjects(){return Ae(je,(e=>e.name),(e=>this.renderProject(e)))}renderProject(e){const t=e.links.map((e=>O`<div>${this.link(e.name,e.link)}</div>`));return O`
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
    `}};Qe=e([he("index-component")],Qe);
//# sourceMappingURL=index.cb1a16d7.js.map
