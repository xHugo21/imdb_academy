<!--Component that defines the search bar-->
<template>
    <input
        v-on:input="search($event.target)"
        v-bind:class="['search_bar', { light_mode: getColorMode === 'light' }]"
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
            const query: string = target.value

            this.$store.commit('search/setQuery', query)
            this.$store.dispatch('search/updateUrl')
            if (query === '') {
                this.$store.dispatch('films/fetchFilms', 'top_rated_movies')
            } else {
                this.$store.dispatch('films/fetchFilms')
            }
        }
    },

    computed: {
        getColorMode(): string {
            return this.$store.getters['search/getColorMode']
        }
    },

    mounted() {
        const search_bar: any = document.querySelector('.search_bar')
        search_bar.value = this.$store.getters['search/getQuery']
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
    transition: all 0.5s ease;
}

.search_bar::placeholder {
    color: rgba(255, 255, 255, 0.717);
}

.light_mode {
    border: 2px solid black;
    color: black;
}
.light_mode::placeholder {
    color: black;
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
