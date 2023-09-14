<template>
  <div id="app">
    <HeaderComp title="ARlebnispfad wählen" back-button-link="/" v-if="!selectedPath"/>
    <HeaderComp :title="selectedPath.name" back-button-method="back" v-if="selectedPath" @back="back()"/>
    <div class="content">
      <div class="browser" :class="{background: selectedPath}">
        <div v-for="pfad in json" :key="pfad.name" class="option" @click="setSelectedPath(pfad.id)">
          <div class="gradient">
            <img :src="pfad.image" class="background">
          </div>
          <h2>{{pfad.name}}</h2>
          <img src="@/assets/icons/arrow_back.svg" class="arrow">
        </div>
      </div>
      <div class="pfad browser" :class="{active: selectedPath}">
          <div class="arlebnis" v-for="arlebnis in selectedPath ? selectedPath.arlebnisse : []" :key="arlebnis.name">
            <h3>{{arlebnis.name}}</h3>
            <h3 style="white-space: nowrap;">{{arlebnis.distance.toString().substring(0,4)}} km</h3>
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
      selectedPath: null,
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
    setSelectedPath(input){
      this.selectedPath = this.json.find(path => path.id === input)
      this.checkForGeoMarkers()
    },
    back(){
      this.selectedPath = null
    },
    updatePosition(){
      navigator.geolocation.getCurrentPosition((result) => {
        this.location.lat = result.coords.latitude
        this.location.lon = result.coords.longitude
      })
    },
    checkForGeoMarkers(){
      this.selectedPath.arlebnisse.forEach(geoMarker => {
        let R = 6378.137; // Radius of earth in KM
        let dLat = geoMarker.lat * Math.PI / 180 - this.location.lat * Math.PI / 180;
        let dLon = geoMarker.lon * Math.PI / 180 - this.location.lon * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.location.lat * Math.PI / 180) * Math.cos(geoMarker.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;

        geoMarker.distance = d;
      })

      this.selectedPath.arlebnisse.sort((a,b) => {
        return a.distance - b.distance
      })
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

.browser {
  display: flex;
  flex-direction: column;
}

.browser.background {
  height: 93vh;
  overflow: hidden;
}

.option {
  height: 180px;
  min-height: 180px;
  position: relative;
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.option .background {
  position:relative;
  z-index:-1;
  display:block;
  height: 180px;
  width: 100vw;
  object-fit: cover;
}

.option h2 {
  color: white;
  z-index: 2;
  padding-bottom: 10px;
  padding-left: 10px;
}

.gradient {
  display:inline-block;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%); /* W3C */
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.arrow {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(285deg) brightness(106%) contrast(104%);
  z-index: 2;
  transform: rotate(180deg);
  height: 30px;
  padding: 10px 10px 10px 10px;
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

.pfad .arlebnis h3 {
  padding-left: 10px;
  padding-right: 10px;
  font-weight: normal;
}

</style>
