(function(){var e={6143:function(e,t,s){"use strict";var n=s(144),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"startscreen"}},[t("div",{attrs:{id:"bg-image"}}),t("div",{attrs:{id:"content"}},[t("h1",[e._v("ARlebnispfade")]),t("button",{on:{click:e.activateXR}},[e._v("Start")]),t("button",{on:{click:e.updatePosition}},[e._v("test Geo")]),t("button",{on:{click:e.checkForGeoMarkers}},[e._v("check geomarkers in der nähe")]),t("p",[e._v(e._s(e.temp))])])]),t("div",{staticStyle:{display:"none","z-index":"10"},attrs:{id:"overlay"}},[t("div",{attrs:{id:"debug-info"}},[t("h1",[e._v("Debug-Info")]),t("p",[e._v("Position: "+e._s(e.location))]),t("p",[e._v("Nächster Marker: "+e._s(e.nearestMarker))]),t("p",[e._v("Letzte Abfrage: "+e._s(e.lastGeoUpdate))]),t("p",[e._v(e._s(e.error))])]),null!=e.nearestMarker?t("div",{attrs:{id:"add_marker"}},[t("h2",[e._v("Marker in der Nähe!")]),t("h3",[e._v(e._s(e.nearestMarker.name))])]):e._e()])])},o=[],a=(s(7658),s(1254),s(381)),i=s.n(a),l=s(1485),c={name:"App",data(){return{location:{lat:null,lon:null},geoMarkers:[{name:"Test-Marker Handy",lat:50.96562570818945,lon:7.501961930146564},{name:"Test-Marker Mac",lat:50.9655816,lon:7.5018389}],lastGeoUpdate:null,nearestMarker:null,lastMarkerPosition:null}},mounted(){window.onerror=this.log,window.setInterval((()=>{this.updatePosition(),this.checkForGeoMarkers()}),5e3)},methods:{updatePosition(){navigator.geolocation.getCurrentPosition((e=>{this.location.lat=e.coords.latitude,this.location.lon=e.coords.longitude,this.lastGeoUpdate=i()().format("h:m:s")}))},checkForGeoMarkers(){let e=!0;this.geoMarkers.forEach((t=>{let s=6378.137,n=t.lat*Math.PI/180-this.location.lat*Math.PI/180,r=t.lon*Math.PI/180-this.location.lon*Math.PI/180,o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.location.lat*Math.PI/180)*Math.cos(t.lat*Math.PI/180)*Math.sin(r/2)*Math.sin(r/2),a=2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)),i=s*a;this.nearestMarker=1e3*i,1e3*i<=5&&(this.nearestMarker=t,e=!1)})),e&&(this.nearestMarker=null)},async activateXR(){document.getElementById("startscreen").style.display="none",document.getElementById("overlay").style.display="block",document.getElementById("app").classList.add("running"),this.updatePosition();const e=document.createElement("canvas");document.body.appendChild(e);const t=e.getContext("webgl",{xrCompatible:!0});let s=new THREE.Scene;const n=new THREE.DirectionalLight(16777215,.3);n.position.set(10,15,10),s.add(n);const r=new THREE.WebGLRenderer({alpha:!0,preserveDrawingBuffer:!0,canvas:e,context:t});r.autoClear=!1;const o=new THREE.PerspectiveCamera;o.matrixAutoUpdate=!1;const a=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["hit-test"],optionalFeatures:["dom-overlay"],domOverlay:{root:document.body}});a.updateRenderState({baseLayer:new XRWebGLLayer(a,t)});const i=await a.requestReferenceSpace("local"),c=await a.requestReferenceSpace("viewer"),d=await a.requestHitTestSource({space:c}),u=new THREE.GLTFLoader;let j,h;u.load("/models/reticle/reticle.gltf",(function(e){j=e.scene,s.add(j)})),u.load("/models/pin/pin.gltf",(function(e){h=e.scene,h.scale.set(10,10,10)})),a.addEventListener("select",(e=>{if(h){const e=h.clone();e.position.copy(j.position),s.add(e)}if(null!=this.lastMarkerPosition){const e=new THREE.LineBasicMaterial({color:255}),t=[];t.push(new THREE.Vector3(this.lastMarkerPosition.x,this.lastMarkerPosition.y,this.lastMarkerPosition.z)),t.push(new THREE.Vector3(j.position.x,j.position.y,j.position.z));const n=(new THREE.BufferGeometry).setFromPoints(t),r=new THREE.Line(n,e);s.add(r)}this.lastMarkerPosition={x:j.position.x,y:j.position.y,z:j.position.z};try{const e=new l.xv;s.add(e),e.text="Hallo Arlebnispfade!",e.fontSize=.2,e.position.z=-2,e.color="ff0000",e.sync()}catch(t){this.log(t)}}));const p=(e,n)=>{a.requestAnimationFrame(p),t.bindFramebuffer(t.FRAMEBUFFER,a.renderState.baseLayer.framebuffer);const l=n.getViewerPose(i);if(l){const e=l.views[0];a.renderState.baseLayer.getViewport(e);r.setSize(Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)),o.matrix.fromArray(e.transform.matrix),o.projectionMatrix.fromArray(e.projectionMatrix),o.updateMatrixWorld(!0);const t=n.getHitTestResults(d);if(t.length>0&&j&&null!=this.nearestMarker){const e=t[0].getPose(i);j.visible=!0,j.position.set(e.transform.position.x,e.transform.position.y,e.transform.position.z),j.updateMatrixWorld(!0)}r.render(s,o)}};a.requestAnimationFrame(p)},log(e){const t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e})};fetch("http://192.168.2.140:3000/log",t)}}},d=c,u=s(1001),j=(0,u.Z)(d,r,o,!1,null,null,null),h=j.exports,p=s(8139);n.ZP.config.productionTip=!1,n.ZP.use(p.Z),n.ZP.loadScript("https://unpkg.com/three@0.126.0/build/three.js").then((()=>{n.ZP.loadScript("https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js").then((()=>{n.ZP.loadScript("webxr-geospatial.js").then((()=>{new n.ZP({render:e=>e(h)}).$mount("#app")}))}))}))},6700:function(e,t,s){var n={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":941,"./en-il.js":941,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":5251,"./es-do.js":5251,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":1793,"./ru.js":1793,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function r(e){var t=o(e);return s(t)}function o(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=6700}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,s),o.loaded=!0,o.exports}s.m=e,function(){var e=[];s.O=function(t,n,r,o){if(!n){var a=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],o=e[d][2];for(var i=!0,l=0;l<n.length;l++)(!1&o||a>=o)&&Object.keys(s.O).every((function(e){return s.O[e](n[l])}))?n.splice(l--,1):(i=!1,o<a&&(a=o));if(i){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,r,o]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,a=n[0],i=n[1],l=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var d=l(s)}for(t&&t(n);c<a.length;c++)o=a[c],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(d)},n=self["webpackChunkarlebnispfade"]=self["webpackChunkarlebnispfade"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(6143)}));n=s.O(n)})();
//# sourceMappingURL=app.bca3e896.js.map