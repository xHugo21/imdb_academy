<!--Component that defines the search bar-->
<template>
    <input
      class="search_bar"
      type="search"
      placeholder="Search film"
    />
  </template>
  
  <script lang="ts">
  export default{
      /*methods: {
          search(target:any):void{
        let query = target.value;
  
        this.$store.commit('filters/setCheckedStatus', '');
        this.$store.commit('filters/setCheckedSpecies', '');
        this.$store.commit('filters/setCheckedGender', '');
  
        document.querySelectorAll('.checkboxfilter').forEach((el:any) => {
          el.checked = false;
        });
  
              this.$store.commit('filters/setQuery', query);
              this.$store.dispatch('characters/fetchCharacters');
        this.$store.dispatch('filters/setFiltersFromResults');
          },
      },*/
  
  
  };
  </script>
  
  <style scoped lang="scss">
  .search_bar {
    display: flex;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
    border-color: black;
    width: 40%;
    height: 100%;
    padding: 0.8%;
  }
  </style>
  