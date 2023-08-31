<template>
  <div id="app">
    <div id="startscreen">
        <div id="bg-image"></div>
        <div id="content">
        <h1>ARlebnispfade</h1>
        <button @click="activateXR">Start</button>
        <button @click="updatePosition">test Geo</button>
        <button @click="checkForGeoMarkers">check nearby geomarkers</button>
        <p>{{temp}}</p>
      </div>
    </div>
    <div id="overlay" style="display: none; z-index: 10;">
      <div id="debug-info">
        <h1>Debug-Info</h1>
        <p>Position: {{ location }}</p>
        <p>Nächster Marker: {{ nearestMarker }}</p>
        <p>Letzte Abfrage: {{ lastGeoUpdate }}</p>
      </div>
      <div id="add_marker" v-if="nearestMarker != null">
        <h2>{{ nearestMarker.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script src="../node_modules/cesium/Source/Cesium.js"></script>
<script>
import * as cesium from "cesium"
import moment from "moment"

export default {
  name: 'AR',
  head: {
    script: [
      {
        type: 'text/javascript', src:'webxr-geospatial.js', async: true, body: true
      }
    ]
  },
  data() {
    return {
      location: {
        lat: null,
        lon: null
      },
      geoMarkers: [
        {
          name: "Test-Marker",
          lat: 50.96562570818945,
          lon: 7.501961930146564
        }
      ],
      lastGeoUpdate : null,
      nearestMarker: null
    }
  },
  mounted() {
    window.setInterval(() => {
    this.updatePosition()
    this.checkForGeoMarkers()
  }, 5000)
  },
  methods: {
    updatePosition(){
      navigator.geolocation.getCurrentPosition((result) => {
          this.location.lat = result.coords.latitude
          this.location.lon = result.coords.longitude
          this.lastGeoUpdate = moment().format("m:s");
        })
    },
    checkForGeoMarkers(){
      let noMarkersNearby = false
      this.geoMarkers.forEach(geoMarker => {
        let R = 6378.137; // Radius of earth in KM
        let dLat = geoMarker.lat * Math.PI / 180 - this.location.lat * Math.PI / 180;
        let dLon = geoMarker.lon * Math.PI / 180 - this.location.lon * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.location.lat * Math.PI / 180) * Math.cos(geoMarker.lat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        this.nearestMarker = d * 1000
        if((d * 1000) <= 5 ){ // if the user is near a geomarker by 5 meters
          this.nearestMarker = geoMarker
        }
      })
      if (noMarkersNearby) this.nearestMarker = null
    },
    async activateXR(){
      document.getElementById("startscreen").style.display = "none";
      document.getElementById("overlay").style.display = "block";
      document.getElementById("app").classList.add("running");
      this.updatePosition();

       // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const gl = canvas.getContext("webgl", { xrCompatible: true });

        let scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(10, 15, 10);
        scene.add(directionalLight);

        // Set up the WebGLRenderer, which handles rendering to the session's base layer.
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          preserveDrawingBuffer: true,
          canvas: canvas,
          context: gl,
        });
        renderer.autoClear = false;

        // The API directly updates the camera matrices.
        // Disable matrix auto updates so three.js doesn't attempt
        // to handle the matrices independently.
        const camera = new THREE.PerspectiveCamera();
        camera.matrixAutoUpdate = false;

        // Initialize a WebXR session using "immersive-ar".
        const session = await navigator.xr.requestSession("immersive-ar", {
          requiredFeatures: ["hit-test"],
          optionalFeatures: ["dom-overlay"],
          domOverlay: {root: document.body}
        });
        session.updateRenderState({
          baseLayer: new XRWebGLLayer(session, gl),
        });

        // A 'local' reference space has a native origin that is located
        // near the viewer's position at the time the session was created.
        const referenceSpace = await session.requestReferenceSpace("local");

        // Create another XRReferenceSpace that has the viewer as the origin.
        const viewerSpace = await session.requestReferenceSpace("viewer");
        // Perform hit testing using the viewer as origin.
        const hitTestSource = await session.requestHitTestSource({
          space: viewerSpace,
        });

        const loader = new THREE.GLTFLoader();
        let reticle;
        loader.load(
          "/models/reticle/reticle.gltf",
          function (gltf) {
            reticle = gltf.scene;
            scene.add(reticle);
          }
        );

        let pin;
        loader.load("/models/pin/pin.gltf", function (gltf) {
          pin = gltf.scene;
          pin.scale.set(10,10,10);
        });

        session.addEventListener("select", (event) => {
          if (pin) {
            const clone = pin.clone();
            clone.position.copy(reticle.position);
            scene.add(clone);
          }
        });

        /*
        // Initialize Geospatial positioning
        let myGeoLoc = cartographic
        alert(myGeoLoc)

        */


        try{
          XRGeospatialAnchor.getDeviceCartographic()
          XRGeospatialAnchor.getDeviceElevation().then(altitude => {
            let geoAlt = altitude
            XRGeospatialAnchor.createGeoAnchor(new cesium.Cartographic(50.96562995732577,7.50190944425779, geoAlt)).then(object => {
              const clone = pin.clone();
              clone.position.copy(object.position);
              scene.add(clone);
            this.log(toString(object))
        })
          })
        } catch(e){
          this.log(e.message)
        }




        // Create a render loop that allows us to draw on the AR view.
        const onXRFrame = (time, frame) => {
          // Queue up the next draw request.
          session.requestAnimationFrame(onXRFrame);

          // Bind the graphics framebuffer to the baseLayer's framebuffer
          gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            session.renderState.baseLayer.framebuffer
          );

          // Retrieve the pose of the device.
          // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
          const pose = frame.getViewerPose(referenceSpace);
          if (pose) {
            // In mobile AR, we only have one view.
            const view = pose.views[0];

            const viewport = session.renderState.baseLayer.getViewport(view);
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
        session.requestAnimationFrame(onXRFrame);
    },
    log(message){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({content: message})
      };
      fetch("http://192.168.2.140:3000/log", requestOptions)
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

#bg-image {
  background: linear-gradient(0deg,rgba(10,50,10, 1), rgba(10,100,10, 0.5)), url('@/assets/aggertalsperre.jpg');
  filter: blur(8px);
  -webkit-filter: blur(8px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

#app {
    background: rgba(10,50,10, 1);
    height: 100vh;
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
  background: rgba(10,50,10, 0.5);
  width: 100%;
  position: absolute;
  bottom: 0;
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
