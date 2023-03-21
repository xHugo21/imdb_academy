<!--Component that defines each character card extracted from the Rick and Morty API-->
<template>
      <img
          class="film"
          v-bind:alt="'pelicula'"
          src='src/assets/default_poster.png'
      />
  </template>
  
  <script lang="ts">
  export default {
      props: ["film"],
      /*data(){
          return {
              hovering: false,
          }
      },
      methods: {
          toggleHover(){
              this.hovering = !this.hovering;
          }
      }*/
  };
  </script>
  
  <style scoped lang="scss">
    .film {
        width: 200px;
        height: 300px;
    }
  </style>
  