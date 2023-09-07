<template>
  <div id="app">
    <HeaderComp title="ARlebnispfad wählen" back-button-link="/"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
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

.fullscreen_view {
  height: 100%;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
}

.title_text {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: "Open Sans", Verdana, Geneva, sans-serif;
}

.title_text h1 {
  font-weight: 600;
}

.title_text h2 {
  font-weight: 100;
}

.title_text b {
  color: #EB6A0A;
}

#background-video {
  margin-top: 2rem;
  width: 100vw;
}

.continue_bottom {
  position: absolute;
  bottom: 0;
  height: 40vh;
  width: 100vw;
  background: linear-gradient(0deg, rgba(0,0,0,1) 60%, rgba(0,212,255,0) 100%);
  display: flex;
  justify-content: center;
}

.continue_bottom img {
  margin-top: 150px;
  filter: invert(100%);
  transform: rotate(-90deg);
  width: 50px;
}

#menu-1 {
  background: linear-gradient(0deg,rgba(10,50,10, 1), rgba(10,100,10, 0.5)), url('@/assets/aggertalsperre.jpg');
  background-size: cover;
}

#menu-1 .buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  height: 100%;
  width: 100%;
}

#menu-1 .buttons .button {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: "Open Sans", Verdana, Geneva, sans-serif;
  padding: 10px;
}

#menu-1 .buttons .button b {
  font-size: 2rem;
}

</style>
