<template>
  <div id="app">
    <HeaderComp title="AR" back-button-method="stopXR" @stopXR="stopXR"/>
    <div id="overlay" style="display: none; z-index: 10;">
      <div id="debug-info" v-if="showDebug">
        <h1>Debug-Info</h1>
        <p>Position: {{ location }}</p>
        <p>Nächster Marker: {{ nearestMarker }}</p>
        <p>Letzte Abfrage: {{ lastGeoUpdate }}</p>
        <p>{{error}}</p>
        <p>{{camera ? camera.position : null}}</p>
      </div>
      <div id="add_marker" v-if="nearestMarker != null">
        <h2>Marker in der Nähe!</h2>
        <h3>{{ nearestMarker.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script src=".././node_modules/cesium/Source/Cesium.js"></script>
<script src=".././node_modules/eruda/eruda.js"></script>
<script src="https://cdn.jsdelivr.net/npm/resonance-audio/build/resonance-audio.min.js"></script>
<script>
import * as cesium from "cesium"
import moment from "moment"
import json from '../arlebnisse.json'

export default {
  name: 'AR',
  data() {
    return {
      location: {
        lat: null,
        lon: null
      },
      geoMarkers: json,
      lastGeoUpdate : null,
      nearestMarker: null,
      lastMarkerPosition: null,
      scene: null,
      session: null,
      canvas: null,
      camera: null,
      showDebug: false,
      audioContext: new AudioContext()
    }
  },
  mounted() {
    window.onerror = this.log;

    window.setInterval(() => {
      this.updatePosition()
      this.checkForGeoMarkers()
    }, 5000)

    this.testGLTF()
    this.activateXR()

    document.getElementById("header_title").addEventListener("click", this.toggleDebug)
  },
  methods: {
    toggleDebug(){
      this.showDebug = !this.showDebug
    },
    testGLTF(){
      const loader = new THREE.GLTFLoader();
      let sunflower;
      loader.load(process.env.NODE_ENV === "production"
          ? "./mi-web-technologien-beiboot-ss2023-sebastianbroc/models/sunflower/sunflower.gltf" : "./models/sunflower/sunflower.gltf", (gltf) => {
        sunflower = gltf.scene;
        console.log(sunflower)
      })
    },
    updatePosition(){
      navigator.geolocation.getCurrentPosition((result) => {
        this.location.lat = result.coords.latitude
        this.location.lon = result.coords.longitude
        this.lastGeoUpdate = moment().format("h:m:s");
      })
    },
    checkForGeoMarkers(){
      let noMarkersNearby = true
      this.geoMarkers.forEach(geoMarker => {
        let R = 6378.137; // Radius of earth in KM
        let dLat = geoMarker.lat * Math.PI / 180 - this.location.lat * Math.PI / 180;
        let dLon = geoMarker.lon * Math.PI / 180 - this.location.lon * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.location.lat * Math.PI / 180) * Math.cos(geoMarker.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;

        if((d) <= 0.05 ){ // if the user is near a geomarker by 5 meters
          this.nearestMarker = geoMarker
          noMarkersNearby = false
        }
      })
      if (noMarkersNearby) this.nearestMarker = null
      this.renderGeoMarkers()
    },
    renderGeoMarkers(){
      if(this.scene && this.nearestMarker !== null && this.nearestMarker.isRendered != true){
        this.error = "geomarker wird jetzt gerendert"
        try {
          const loader = new THREE.GLTFLoader();
          let sunflower;
          loader.load(process.env.NODE_ENV === "production"
              ? "./mi-web-technologien-beiboot-ss2023-sebastianbroc/models/sunflower/sunflower.gltf" : "./models/sunflower/sunflower.gltf", (gltf) => {
            sunflower = gltf.scene;
            let clone = sunflower.clone()
            clone.scale.set(0.1,0.1,0.1);
            clone.position.copy(this.camera.position)
            sunflower.name = "geomarker"
            sunflower.visible = true
            //this.nearestMarker.isRendered = true
            this.scene.add(clone)


            try{
              this.setupAudio({
                url: 'https://github.com/immersive-web/webxr-samples/raw/main/media/sound/guitar.ogg',
                position: [0, 1.5, -1],
                rotateY: 0
              }).then((sources) => {
                this.playAudio()
              })
            } catch(e){
              this.log(e.message)
              this.error = e.message
            }
          });
        } catch(e){
          this.error = e.message
        }
      } else if (this.scene && this.nearestMarker === null) {
        this.scene.children.forEach(object => {
          if(object.name == "geomarker"){
            object.visibility = false
          }
        })
      }
    },
    async stopXR(){
      try{
        await this.session.end()
        this.canvas.remove()
      } catch(e){

      }
      this.$router.push("/start")
    },
    async activateXR(){
      let arlebnisse = []
      this.geoMarkers.forEach(pfad => {
        pfad.arlebnisse = pfad.arlebnisse.map(pfad => {return {...pfad, isRendered: false}})
        arlebnisse = arlebnisse.concat(pfad.arlebnisse)
      })
      this.geoMarkers = arlebnisse

      document.getElementById("overlay").style.display = "block";
      document.getElementById("app").classList.add("running");
      this.updatePosition();

      // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
      this.canvas = document.createElement("canvas");
      document.body.appendChild(this.canvas);
      const gl = this.canvas.getContext("webgl", { xrCompatible: true });

      let scene = new THREE.Scene();

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
      directionalLight.position.set(10, 15, 10);
      scene.add(directionalLight);

      // Set up the WebGLRenderer, which handles rendering to the session's base layer.
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: this.canvas,
        context: gl,
      });
      renderer.autoClear = false;

      // The API directly updates the camera matrices.
      // Disable matrix auto updates so three.js doesn't attempt
      // to handle the matrices independently.
      const camera = new THREE.PerspectiveCamera();
      camera.matrixAutoUpdate = false;

      // Initialize a WebXR session using "immersive-ar".
      this.session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: {root: document.body}
      });
      this.session.updateRenderState({
        baseLayer: new XRWebGLLayer(this.session, gl),
      });

      // A 'local' reference space has a native origin that is located
      // near the viewer's position at the time the session was created.
      const referenceSpace = await this.session.requestReferenceSpace("local");

      // Create another XRReferenceSpace that has the viewer as the origin.
      const viewerSpace = await this.session.requestReferenceSpace("viewer");
      // Perform hit testing using the viewer as origin.
      const hitTestSource = await this.session.requestHitTestSource({
        space: viewerSpace,
      });

      const loader = new THREE.GLTFLoader();
      let reticle;
      loader.load(
          process.env.NODE_ENV === "production"
              ? "./mi-web-technologien-beiboot-ss2023-sebastianbroc/models/reticle/reticle.gltf" : "./models/reticle/reticle.gltf",
          function (gltf) {
            reticle = gltf.scene;
            scene.add(reticle);
          }
      );

      let pin;
      loader.load(process.env.NODE_ENV === "production"
          ? "./mi-web-technologien-beiboot-ss2023-sebastianbroc/models/pin/pin.gltf" : "./models/pin/pin.gltf", function (gltf) {
        pin = gltf.scene;
        pin.scale.set(10,10,10);
      });

      this.session.addEventListener("select", (event) => {
        if (pin) {
          const clone = pin.clone();
          clone.position.copy(reticle.position);
          scene.add(clone);
        }
      });


      // Create a render loop that allows us to draw on the AR view.
      const onXRFrame = (time, frame) => {
        // Queue up the next draw request.
        this.session.requestAnimationFrame(onXRFrame);

        // Bind the graphics framebuffer to the baseLayer's framebuffer
        gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            this.session.renderState.baseLayer.framebuffer
        );

        // Retrieve the pose of the device.
        // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
          // In mobile AR, we only have one view.
          const view = pose.views[0];

          const viewport = this.session.renderState.baseLayer.getViewport(view);
          renderer.setSize(
              Math.max(
                  document.documentElement.clientWidth || 0,
                  window.innerWidth || 0
              ),
              Math.max(
                  document.documentElement.clientHeight || 0,
                  window.innerHeight || 0
              )
          );

          // Use the view's transform matrix and projection matrix to configure the THREE.camera.
          camera.matrix.fromArray(view.transform.matrix);
          camera.projectionMatrix.fromArray(view.projectionMatrix);
          camera.updateMatrixWorld(true);

          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length > 0 && reticle) {
            const hitPose = hitTestResults[0].getPose(referenceSpace);
            reticle.visible = true;
            reticle.position.set(
                hitPose.transform.position.x,
                hitPose.transform.position.y,
                hitPose.transform.position.z
            );
            reticle.updateMatrixWorld(true);
          }

          // Render the scene with THREE.WebGLRenderer.
          renderer.render(scene, camera);
        }
      };
      this.session.requestAnimationFrame(onXRFrame);
    },
    setupAudio(options){
      let resonance = new ResonanceAudio(audioContext);
      resonance.output.connect(this.audioContext.destination);

      this.audioContext.suspend()

      // Create a Resonance source and set its position in space.
      let source = resonance.createSource();
      let pos = options.position;
      source.setPosition(pos[0], pos[1], pos[2]);

      // Connect an analyser. This is only for visualization of the audio, and
      // in most cases you won't want it.
      let analyser = this.audioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.lastRMSdB = 0;

      return fetch(options.url)
          .then((response) => response.arrayBuffer())
          .then((buffer) => this.audioContext.decodeAudioData(buffer))
          .then((decodedBuffer) => {
            let bufferSource = createBufferSource(
                source, decodedBuffer, analyser);

            return {
              buffer: decodedBuffer,
              bufferSource: bufferSource,
              source: source,
              analyser: analyser,
              position: pos,
              rotateY: options.rotateY,
              node: null
            };
          });
    },
    createBufferSource(source, buffer, analyser) {
      // Create a buffer source. This will need to be recreated every time
      // we wish to start the audio, see
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode
      let bufferSource = this.audioContext.createBufferSource();
      bufferSource.loop = true;
      bufferSource.connect(source.input);
      bufferSource.connect(analyser);
      bufferSource.buffer = buffer;
      return bufferSource;
    },
    getLoudnessScale(analyser) {
      let fftBuffer = new Float32Array(1024);
      analyser.getFloatTimeDomainData(fftBuffer);
      let sum = 0;
      for (let i = 0; i < fftBuffer.length; ++i)
        sum += fftBuffer[i] * fftBuffer[i];

      // Calculate RMS and convert it to DB for perceptual loudness.
      let rms = Math.sqrt(sum / fftBuffer.length);
      let db = 30 + 10 / Math.LN10 * Math.log(rms <= 0 ? 0.0001 : rms);

      // Moving average with the alpha of 0.525. Experimentally determined.
      analyser.lastRMSdB += 0.525 * ((db < 0 ? 0 : db) - analyser.lastRMSdB);

      // Scaling by 1/30 is also experimentally determined. Max is to present
      // objects from disappearing entirely.
      return Math.max(0.3, analyser.lastRMSdB / 30.0);
    },
    updateAudioNodes() {
      this.scene.children.forEach(object => {
        if(object.name == "geomarker"){
          let source = object

          if (!source.node) {
            source.node = stereo.clone();
            source.node.visible = true;
            source.node.selectable = true;
            this.scene.addNode(source.node);
          }

          let node = source.node;
          let matrix = node.matrix;

          // Move the node to the right location.
          mat4.identity(matrix);
          mat4.translate(matrix, matrix, source.position);
          mat4.rotateY(matrix, matrix, source.rotateY);

          // Scale it based on loudness of the audio channel
          let scale = getLoudnessScale(source.analyser);
          mat4.scale(matrix, matrix, [scale, scale, scale]);
        }
      })
    },
    playAudio() {
      if (this.audioContext.state === 'running')
        return;

      this.audioContext.resume();

      this.scene.children.forEach(object => {
        if (object.name === "geomarker") {
          object.bufferSource.start(0);
        }
      })
    },
    pauseAudio() {
      if (this.audioContext.state == 'suspended')
        return;

      this.scene.children.forEach(object => {
        if (object.name === "geomarker") {
          object.bufferSource.stop(0);
          object.bufferSource = createBufferSource(
              object.source, object.buffer, object.analyser);
        }
      })

      this.audioContext.suspend();
    },
    log(message){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({content: message})
      };
      fetch("http://192.168.2.152:3001/log", requestOptions)
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

#app.running {
  background: none;
}

#app h1 {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

#content {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
  position: absolute;
  top: 25%;
  left: 25%;
}

#content button {
  appearance: button;
  background-color: #1899D6;
  border: none;
  border-radius: 16px;
  color: #FFFFFF;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
}

#add_marker {
  background: white;
  border-radius: 5px 5px 0 0 ;
  width: 100vw;
  position: absolute;
  bottom: 100px;
}

#add_marker h2, #add_marker h3 {
  font-family: sans-serif;
  padding: 10px;
  margin: 0;
}

#debug-info {
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
  width: 70%;
}

#debug-info h1 {
  color: black;
}
</style>
