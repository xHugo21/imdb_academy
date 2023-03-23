<!--Component that defines the search bar-->
<template>
    <input
      class="search_bar"
      type="search"
      placeholder="Search"
      autofocus
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
    background-color: #99aabb5a;
    border-radius: 25px;
    border: none;
    height: 30%;
    width: 45%;
    margin: 5%;
    padding: 1%;
    grid-area: 1 / 2 / 2 / 3;
    outline: 0;
    border: 2px solid rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, 0.717);
    font-weight: 700;
    transition: .5s;

  }

  .search_bar::placeholder{
    color: rgba(255, 255, 255, 0.717);
  }

  // Change color of the delete icon of the search bar
  .search_bar::-ms-clear {
    color: purple;
  }


  .search_bar:focus{
    border: 2px solid purple;
  }
  </style>
  