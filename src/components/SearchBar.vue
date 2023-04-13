<!--Component that defines the search bar-->
<template>
    <input
        v-on:input="search($event.target)"
        class="search_bar"
        type="search"
        placeholder="Search"
        autofocus
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        search(target: any): void {
            const query = target.value;

            this.$store.dispatch('search/updateSearchBar', query)
            if (query === '') {
                this.$store.dispatch('films/fetchTrendingDaily')
            } else {
                this.$store.dispatch('films/fetchSearchBar')
            }
        }
    }
})
</script>

<style scoped lang="scss">
.search_bar {
    grid-area: search;
    background-color: #99aabb5a;
    border-radius: 25px;
    border: none;
    width: 50%;
    height: 40px;
    justify-self: center;
    align-self: center;
    padding: 1% 1% 1% 3%;
    grid-area: 1 / 2 / 2 / 3;
    outline: 0;
    border: 2px solid rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, 0.717);
    font-weight: 700;
    transition: 0.5s;
}

.search_bar::placeholder {
    color: rgba(255, 255, 255, 0.717);
}

.search_bar:focus {
    border: 2px solid purple;
}

@media screen and (max-width: 755px) {
    .search_bar {
        width: 90%;
    }
}
</style>
