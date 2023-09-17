<template>
  <div id="app">
    <HeaderComp title="AR-Erlebnis starten" back-button-link="/" v-if="!showGeoMarkers"/>
    <HeaderComp title="ARlebnisse in der Nähe" back-button-method="hideMarkers" v-if="showGeoMarkers" @hideMarkers="hideMarkers()"/>
    <div class="content">
      <div class="menu">
        <router-link class="button" id="button_startVR" :to="'/ar'">
          <img src="@/assets/icons/ar.svg">
          <h2>AR starten</h2>
        </router-link>
        <div class="button" id="button_nearby" @click="showMarkers">
          <img src="@/assets/icons/radar.svg">
          <h2>ARlebnisse in der Umgebung anzeigen</h2>
        </div>
      </div>
      <div class="pfad browser" :class="{active: showGeoMarkers}">
        <div class="arlebnis" v-for="arlebnis in geoMarkers ? geoMarkers : []" :key="arlebnis.name">
          <div>
            <h3>{{ arlebnis.name }}</h3>
            <h4>Pfad: {{arlebnis.pfad}}</h4>
          </div>
          <h3 style="white-space: nowrap;">{{ arlebnis.distance.toString().substring(0, 4) }} km</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from '../arlebnisse.json'

export default {
  name: 'App',
  data() {
    return {
      json: json,
      showGeoMarkers: false,
      geoMarkers: null,
      location: {
        lat: null,
        lon: null
      },
    }
  },
  mounted() {
    this.updatePosition()
  },
  methods: {
    showMarkers() {
      this.showGeoMarkers = true
      this.checkForGeoMarkers()
    },
    hideMarkers() {
      this.showGeoMarkers = false
    },
    updatePosition() {
      navigator.geolocation.getCurrentPosition((result) => {
        this.location.lat = result.coords.latitude
        this.location.lon = result.coords.longitude
      })
    },
    checkForGeoMarkers() {
      let arlebnisse = []

      this.json.forEach(pfad => {
        pfad.arlebnisse = pfad.arlebnisse.map(item => {return {...item, pfad: pfad.name}})
        arlebnisse = arlebnisse.concat(pfad.arlebnisse)
      })

      arlebnisse.forEach(geoMarker => {
        let R = 6378.137; // Radius of earth in KM
        let dLat = geoMarker.lat * Math.PI / 180 - this.location.lat * Math.PI / 180;
        let dLon = geoMarker.lon * Math.PI / 180 - this.location.lon * Math.PI / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.location.lat * Math.PI / 180) * Math.cos(geoMarker.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        geoMarker.distance = d;
      })

      arlebnisse.sort((a, b) => {
        return a.distance - b.distance
      })

      this.geoMarkers = arlebnisse
    },
  }
}
</script>

<style scoped>
#app {
  scroll-snap-type: y mandatory;
  max-width: 100vw;
  max-height: 100vh;
  height: 100vh;
  overflow: auto;
  scroll-behavior: smooth;
}

.content {
  position: relative;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 80vh;
}

.button {
  width: 80%;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
}

.button img {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(285deg) brightness(106%) contrast(104%);
  width: 100px;
}

.button h2 {
  text-align: center;
  color: white;
  font-weight: normal;
}

#button_nearby {
  background: black;
}

#button_startVR {
  background: var(--primary-color);
}

.pfad {
  position: absolute;
  height: 93vh;
  width: 100vw;
  background: white;
  top: 0;
  left: 100%;
  transition: 0.2s ease;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pfad.active {
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.2s ease;
}

.pfad .arlebnis {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  min-height: 100px;
  border-top: solid 1px var(--grey);
  border-bottom: solid 1px var(--grey);
}

.pfad .arlebnis h3, .pfad .arlebnis h4 {
  padding-left: 10px;
  padding-right: 10px;
  font-weight: normal;
}

.pfad .arlebnis h4 {
  color: #666666;
}

</style>
