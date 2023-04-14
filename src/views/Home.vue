<!--Home page of the web. It displays trending results when opened. If the user searchs anything the view mode is changed -->

<template>
    <header>
        <router-link class="router_link" to="/imdb_academy/saved"
            ><img class="saved_icon" src="/src/assets/bookmark.svg" alt="bookmark"
        /></router-link>
        <SearchBar v-on:input="setViewSearch" />
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
            <H1Title v-if="view === 'trendingdaily'" v-on:click="setViewTrending" class="title__component" title="Trending Daily"></H1Title>
            <H1Title v-else-if="view === 'trendingweekly'" v-on:click="setViewTrending" class="title__component" title="Trending Weekly"></H1Title>
            <H1Title
                v-else-if="view === 'searchresults'"
                class="title__component"
                :title="'Found ' + totalResults + ' search results'"
            ></H1Title>

            <FilmsGrid>
                <FilmCard v-for="film in films" v-bind:film="film" v-bind:key="film.id"></FilmCard>
            </FilmsGrid>
        <div class="observer_trigger">
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
            view: 'trendingdaily' as string
        }
    },

    methods: {
        // Changes view mode depending on the query. If query is empty it shows trending films, otherwise it shows search results
        setViewSearch(): void {
            if (this.$store.getters['search/getQuery'] === '') {
                this.view = 'trendingdaily'
            } else {
                this.view = 'searchresults'
            }
        },

        setViewTrending():void {
            if (this.view === 'trendingdaily') {
                this.view = 'trendingweekly'
                this.$store.dispatch('films/fetchTrendingWeekly')
            } else if (this.view === 'trendingweekly') {
                this.view = 'trendingdaily'
                this.$store.dispatch('films/fetchTrendingDaily')
            }
        },

        setWandMode(): void {
            this.$store.commit(
                'search/setWandSelected',
                !this.$store.getters['search/getWandSelected']
            )
        }
    },
    

    computed: {
        films(): Array<Film> {
            return this.$store.getters['films/getFilms']
        },
        totalResults(): number {
            return this.$store.getters['films/getTotalResults']
        },
        isWandSelected(): boolean {
            return this.$store.getters['search/getWandSelected']
        },
        moreResults(): boolean {
            return this.$store.getters['films/getMoreResults']
        }
    },

    mounted() {
        // Set trending results
        this.$store.dispatch('films/fetchTrendingDaily')

        // Add infinite scroll using observer API
        const observer: IntersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && this.view === 'searchresults') {
                this.$store.dispatch('films/loadMoreResults')
            }
        })
        // Call observer through footer element. Each time the footer is in the viewport,  the loadMoreResults() function is called
        observer.observe(document.getElementsByClassName("observer_trigger")[0]);
    }
})
</script>

<style scoped lang="scss">
header {
    margin: 3% 0 3% 0;
    height: 20%;
    display: grid;
    grid-template-areas:
        'saved_icon search wand_icon filter_icon'
        'filters filters filters filters';
    grid-template-columns: 2fr 10fr 1fr 2fr;

    .router_link {
        grid-area: saved_icon;
        display: flex;
        justify-content: flex-end;
        height: 30px;
        .saved_icon {
            cursor: pointer;
        }
    }

    .wand_icon {
        grid-area: wand_icon;
        // Move wand icon to the right
        margin-left: 3vw;
        cursor: pointer;
        width: 35px;
    }
}

main {
    .title__component {
        margin-left: 10%;
        cursor: pointer;
    }
}

// Add media queries for responsive design
@media screen and (max-width: 890px) {
    .wand_icon {
        margin-left: 0%;
    }
}
</style>
