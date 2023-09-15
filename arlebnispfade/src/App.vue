<template>
  <router-view/>
</template>

<style>
/* GLOBAL CSS VARIABLES */
:root {
  --font-family: "Open Sans", Verdana, Geneva, sans-serif;

  --primary-color: #EB6A0A;
  --background: rgb(255,255,255);
  --secondary-color: rgb(10,50,10);
  --warning: #aa5555;
  --grey: #dedede;

  --header-title-color: #ffffff;
}

* {
  margin: 0;
  font-family: var(--font-family);
}

a {
  text-decoration: none;
}

h2 {
  font-weight: normal;
}
</style>
