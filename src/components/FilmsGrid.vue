<!--Component that defines the section where the characters cards are placed-->
<template>
    <section class="filmsgrid">
      <slot></slot>
    </section> 
  </template>
  
  <script lang="ts">
  export default{
  }
  </script>
  
  <style scoped lang="scss">
    .filmsgrid {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 0 3% 3% 3%;
        gap: 25px;
        justify-content: center;

    }
  </style>
  