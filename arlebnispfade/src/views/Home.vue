<template>
  <div id="app">
    <div id="start" class="fullscreen_view">
      <div class="title_text">
        <h1><b>AR</b>lebnispfade</h1>
        <h2>Oberbergischer Kreis</h2>
      </div>
      <video id="background-video" autoplay loop>
        <source src="@/assets/intro-video.mp4" type="video/mp4">
      </video>
      <a href="#menu-1" class="continue_bottom">
        <img src="@/assets/icons/arrow_back.svg">
      </a>
    </div>
    <div id="menu-1" class="fullscreen_view" style="background: red;">

    </div>
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

</style>
