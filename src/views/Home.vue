<!--Home page of the web. It displays trending results when opened. If the user searchs anything the view mode is changed -->

<template>
    <header>
        <router-link class="router_link" to="/imdb_academy/saved"
            ><img class="saved_icon" src="/src/assets/bookmark.svg" alt="bookmark"
        /></router-link>
        <SearchBar v-on:input="setViewMode()" />
        <Filters></Filters>
    </header>

    <main>
        <div v-if="view_trending" class="trending">
            <H1Title class="title__component" title="Trending"></H1Title>
            <FilmsGrid>
                <FilmCard v-for="film in films" v-bind:film="film" v-bind:key="film.id"></FilmCard>
            </FilmsGrid>
        </div>
        <div v-else class="searchresults">
            <H1Title
                class="title__component"
                :title="'Found ' + results_count + ' search results'"
            ></H1Title>
            <FilmsGrid>
                <FilmCard v-for="film in films" v-bind:film="film" v-bind:key="film.id"></FilmCard>
            </FilmsGrid>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from '@/components/SearchBar.vue'
import FilmsGrid from '@/components/FilmsGrid.vue'
import FilmCard from '@/components/FilmCard.vue'
import H1Title from '@/components/H1Title.vue'
import Filters from '@/components/Filters.vue'

import type { Film } from '@/types'

export default defineComponent({
    components: {
        SearchBar,
        FilmsGrid,
        FilmCard,
        H1Title,
        Filters
    },
    data() {
        return {
            view_trending: true as boolean,
            results_count: 0 as number
        }
    },

    methods: {
        // Changes view mode depending on the query. If query is empty it shows trending films, otherwise it shows search results
        setViewMode(): void {
            if (this.$store.getters['search/getQuery'] === '') {
                this.view_trending = true
            } else {
                this.view_trending = false
                this.countResults()
            }
        },
        // Counts the number of search results
        countResults(): void {
            this.results_count = 0
            for (let i = 0; i < this.films.length; i++) {
                this.results_count++
            }
        }
    },

    computed: {
        films(): Array<Film> {
            return this.$store.getters['films/getFilms']
        }
    },

    mounted() {
        // Add infinite scroll using observer API
        const observer: any = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.view_trending){
                //this.loadMoreResults();
            }
        })
        // Call observer through footer element. Each time the footer is in the viewport, the loadMoreResults() function is called
        //observer.observe(document.querySelector('footer'));
    }
})
</script>

<style scoped lang="scss">


header {
    margin: 3% 0 3% 0;
    height: 20%;
    display: grid;
    grid-template-areas:
        'saved_icon search filter_icon'
        'filters filters filters';
    grid-template-columns: 1fr 5fr 1fr;

    .router_link {
        grid-area: saved_icon;
        display: flex;
        justify-content: flex-end;
        height: 30px;
        .saved_icon {
            cursor: pointer;
        }
    }

    /*.right_icons {
        grid-area: right_icons;
        display: flex;
        flex-direction: row;
        gap: 10px;

        .wand_icon {
            cursor: pointer;
            width: 35px;
        }
        
    }*/
}

@media screen and (max-width: 465px) {
    header {
        grid-template-areas:
            'saved_icon filter_icon'
            'search search'
            'filters filters';
        grid-template-columns: 1fr 1fr;
    }
}

main {
    .title__component {
        margin-left: 10%;
    }
}
</style>
