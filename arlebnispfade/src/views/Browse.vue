<template>
  <div id="app">
    <HeaderComp title="ARlebnispfad wählen" back-button-link="/"/>
    <div class="browser">
      <div v-for="pfad in json" :key="pfad.name" class="option">
        <div class="gradient">
          <img :src="pfad.image" class="background">
        </div>
        <h2>{{pfad.name}}</h2>
        <img src="@/assets/icons/arrow_back.svg" class="arrow">
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
      json: json
    }
  },
  mounted() {
  },
  methods: {

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

.browser {
  display: flex;
  flex-direction: column;
}

.option {
  height: 200px;
  position: relative;
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.option .background {
  position:relative;
  z-index:-1;
  display:block;
  height: 200px;
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

</style>
