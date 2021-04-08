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



.flex-column {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;

    &[center] {
      align-items: center;
      justify-content: center;
    }
}

.flex-column-body {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    overscroll-behavior-x: none !important;
    // overscroll-behavior-y: none !important;
    // overscroll-behavior: none !important;
}


.flex-column-header,
.flex-column-footer {
    flex: none;
}


.border-top {
  border-top:1px solid rgba(#000,0.1);
}

.border-bottom {
  border-bottom:1px solid rgba(#000,0.1);
}


/////////////////////////////////////////////////////////

.bg-white {
  background: #fff;
}

/////////////////////////////////////////////////////////


.container {
  padding: 0 15px;
}

.text-center {
  text-align:center;
}

.text-wrap {
  margin: auto;
  max-width: 700px;
}

.wrapper {
  padding: 5% 0;
}

.fa-spin {
  animation-duration: 0.4s !important;
}

.button {
  font-weight:600;
}

////////////////////////////////////////////////////////

h1, h2, h3, h4, h5 {
  font-weight:600;
  margin: 0.5em 0 1em;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 2em;
}






</style>
