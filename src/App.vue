<template>
  <div id="app">
    <router-view @change-style="removeBG" @add-style="restoreBG"/>
  </div>
</template>

<script>
import {getObj, setObj} from './refresh.js'
export default {
  name: 'App',
  created(){
    // Store state in localStorage before unload
    if (getObj('store')){
      this.$store.replaceState(Object.assign(
        {}, getObj('store')
      ));
      setObj('store', null);
    }
  },
  methods: {
    removeBG(){
      var root = document.querySelector('#app');
      root.style.backgroundImage = 'url()';
    },
    restoreBG(){
      var root = document.querySelector('#app');
      root.style.backgroundImage = "url('bg.png')";
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
