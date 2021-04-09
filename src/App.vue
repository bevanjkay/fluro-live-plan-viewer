<template>
  <div id="app" class="flex-column">
   <login v-if="!user"></login>

  <template v-else>
      <masthead/>
      <router-view class="flex-column"/>
  </template>

</div>
</template>


<script>

////////////////////////////////////////////////////////

document.addEventListener('touchmove', function(event) {
  event = event.originalEvent || event;
  if(event.scale > 1) {
    event.preventDefault();
  }
}, false);


////////////////////////////////////////////////////////


import Login from './components/Login.vue';
import Masthead from './components/Masthead.vue';

export default {
  components:{
    login:Login,
    masthead:Masthead,
  },
  data() {
    return {
      parent:'Hello',
    }
  },

}
</script>



<style lang="scss">




////////////////////////////////////////////////////////

//Import our variables
@import '@/_variables.scss';

////////////////////////////////////////////////////////

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

////////////////////////////////////////////////////////

#app {
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  left:0;
  right:0;
  top:0;
  bottom:0;
  width: 100vw;
  min-height:100vh;
}


/////////////////////////////////////////////////////////

// .flex-column {
//   display:flex;
//   flex:1;
//   flex-direction: column;
// }

// .flex-column-body {
//   flex:1;
//   overflow:auto;
//   -webkit-overflow-scrolling: touch;
// }





</style>
