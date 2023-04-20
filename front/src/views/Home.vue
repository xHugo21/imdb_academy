<!--Home page of the web. It displays trending results when opened. If the user searchs anything the view mode is changed -->

<template>
    <header>
        <router-link class="router_link" to="/imdb_academy/saved"
            ><img class="saved_icon" src="/src/assets/bookmark.svg" alt="bookmark"
        /></router-link>
        <SearchBar v-on:input="setViewSearch" />
        <img
            v-if="getColorMode === 'dark'"
            v-on:click="changeColorMode"
            class="color_icon"
            src="/src/assets/color_icon_fill.png"
        />
        <img
            v-else
            v-on:click="changeColorMode"
            class="color_icon"
            src="/src/assets/color_icon_empty.png"
        />

        <img
            v-if="!isWandSelected"
            v-on:click="setWandMode"
            class="wand_icon"
            src="/src/assets/wand.svg"
            alt="wand"
        />
        <img
            v-else
            v-on:click="setWandMode"
            class="wand_icon"
            src="/src/assets/wand_selected.svg"
            alt="wand"
        />
        <Filters></Filters>
    </header>

    <main>
        <!--<div v-if="view_trending" class="trending">-->
        <H1Title
            v-if="view === 'top_rated_movies'"
            v-on:click="setViewType"
            class="title__component"
            title="Top Rated Movies"
        ></H1Title>
        <H1Title
            v-else-if="view === 'top_rated_tv'"
            v-on:click="setViewType"
            class="title__component"
            title="Top Rated TV Shows"
        ></H1Title>
        <H1Title
            v-else-if="view === 'magic_wand'"
            v-on:click="setViewType"
            class="title__component"
            title="Magic Wand"
        ></H1Title>
        <H1Title
            v-else-if="view === 'searchresults'"
            class="title__component"
            :title="'Found ' + totalResults + ' search results'"
        ></H1Title>

        <FilmsGrid>
            <FilmCard v-for="film in films" v-bind:film="film" v-bind:key="film.id"></FilmCard>
        </FilmsGrid>
        <div class="observer_trigger">
            <p v-if="!moreResults" class="no_more_results">THERE AREN'T MORE RESULTS TO DISPLAY</p>
        </div>
        <TopButton></TopButton>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from '@/components/SearchBar.vue'
import FilmsGrid from '@/components/FilmsGrid.vue'
import FilmCard from '@/components/FilmCard.vue'
import H1Title from '@/components/H1Title.vue'
import Filters from '@/components/Filters.vue'
import TopButton from '@/components/TopButton.vue'

import type { Film } from '@/types'

export default defineComponent({
    components: {
        SearchBar,
        FilmsGrid,
        FilmCard,
        H1Title,
        Filters,
        TopButton
    },
    data() {
        return {
            view: 'top_rated_movies' as string
        }
    },

    methods: {
        // Changes view mode depending on the query. If query is empty it shows trending films, otherwise it shows search results
        setViewSearch(): void {
            if (this.$store.getters['search/getQuery'] === '') {
                this.view = 'top_rated_movies'
            } else {
                this.view = 'searchresults'
            }
        },

        setViewType(): void {
            if (this.view === 'top_rated_tv') {
                this.view = 'top_rated_movies'
                this.$store.dispatch('films/fetchFilms', 'top_rated_movies')
            } else if (this.view === 'top_rated_movies') {
                this.view = 'top_rated_tv'
                this.$store.dispatch('films/fetchFilms', 'top_rated_tv')
            }
        },

        setWandMode(): void {
            this.$store.commit(
                'search/setWandSelected',
                !this.isWandSelected
            )
            if (this.isWandSelected){
                this.view = 'magic_wand'
            }
            else{
                this.view = 'top_rated_movies'
            }
        },

        changeColorMode(): void {
            if (this.$store.getters['search/getColorMode'] === 'dark') {
                document.body.style.backgroundColor = 'white'
                this.$store.commit('search/setColorMode', 'light')
            } else {
                document.body.style.backgroundColor = '#14181c'
                this.$store.commit('search/setColorMode', 'dark')
            }
        }
    },

    computed: {
        films(): Array<Film> {
            return this.$store.getters['films/getFilms']
        },
        totalResults(): string {
            if (this.$store.getters['films/getTotalResults'] === undefined) {
                return '0'
            } else if (this.$store.getters['films/getTotalResults'] === 20) {
                return '20+'
            }
            return this.$store.getters['films/getTotalResults']
        },
        isWandSelected(): boolean {
            return this.$store.getters['search/getWandSelected']
        },
        moreResults(): boolean {
            return this.$store.getters['films/getMoreResults']
        },
        getColorMode(): string {
            return this.$store.getters['search/getColorMode']
        }
    },

    mounted() {
        // Set trending results
        if (this.$store.getters['search/getQuery'] === '') {
            this.view = 'top_rated_movies'
            this.$store.dispatch('films/fetchFilms', 'top_rated_movies')
        } else {
            this.view = 'searchresults'
            this.$store.dispatch('films/fetchFilms')
        }

        // Add infinite scroll using observer API
        const observer: IntersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && this.view === 'searchresults') {
                this.$store.dispatch('films/loadMoreResults')
            }
        })
        // Call observer through footer element. Each time the footer is in the viewport,  the loadMoreResults() function is called
        observer.observe(document.getElementsByClassName('observer_trigger')[0])
    }
})
</script>

<style scoped lang="scss">
header {
    margin: 3% 0 3% 0;
    height: 20%;
    display: grid;
    grid-template-areas:
        'saved_icon search color_icon wand_icon filter_icon'
        'filters filters filters filters filters';
    grid-template-columns: 2fr 10fr 1fr 1fr 2fr;

    .router_link {
        grid-area: saved_icon;
        display: flex;
        justify-content: flex-end;
        height: 35px;
        margin-top: 3px;
        .saved_icon {
            cursor: pointer;
        }
    }

    .color_icon {
        grid-area: color_icon;
        margin-left: 3vw;
        margin-top: 4px;
        cursor: pointer;
        width: 37px;
    }

    .wand_icon {
        grid-area: wand_icon;
        margin-left: 1.7vw;
        margin-top: 2px;
        cursor: pointer;
        width: 38px;
    }
}

main {
    .title__component {
        margin-left: 10%;
        cursor: pointer;
    }

    .observer_trigger {
        display: flex;
        justify-content: center;
        .no_more_results {
            color: purple;
            font-size: 1.5em;
            text-align: center;
            margin-bottom: 3%;
            font-weight: 700;
            border: 3px solid purple;
            border-radius: 15px;
            width: 35%;
            padding: 1% 0 1% 0;
        }
    }
}

// Add media queries for responsive design
@media screen and (max-width: 890px) {
    .wand_icon {
        margin-left: 0%;
    }
}
</style>
