<!--Component that defines each character card extracted from the Rick and Morty API-->
<template>
      <img
        v-on:mouseenter="toggleHover"
        v-on:mouseleave="toggleHover"
        :class="['film', 'film__'+hovering]"
        v-bind:alt="'pelicula'"
        src='src/assets/godfather.jpeg'
      />
  </template>
  
  <script lang="ts">
  export default {
      props: ["film"],
      data(){
          return {
              hovering: false as boolean,
          }
      },
      methods: {
          toggleHover(){
              this.hovering = !this.hovering;
          }
      }
  };
  </script>
  
  <style scoped lang="scss">
    .film {
        width: 200px;
        height: 300px;
    }
    .film__false {
        border: 4px solid #99aabb5a;
        border-radius: 10px;
    }
    .film__true {
        border: 4px solid purple;
        border-radius: 10px;
    }
  </style>
  