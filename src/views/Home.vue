<template>
    <header>
        <router-link class="router_link" to="/imdb_academy/saved"
            ><img class="saved_icon" src="@/assets/bookmark.svg" alt=""
        /></router-link>
        <SearchBar v-on:input="setViewMode()"/>
        <Filters></Filters>
    </header>
    <main>
        <div v-if="view_trending" class="trending">
            <H1Title class="title__component" title="Trending Now"></H1Title>
            <FilmsGrid>
                <FilmCard
                    v-for="film in films"
                    v-bind:key="film.id"
                    v-bind:character="film.name"
                ></FilmCard>
            </FilmsGrid>
        </div>
        <div v-else class="searchresults">
            <H1Title class="title__component" :title="'Found '+results_count+' search results'"></H1Title>
            <FilmsGrid>
                <FilmCard
                    v-for="film in films"
                    v-bind:key="film.id"
                    v-bind:character="film.name"
                ></FilmCard>
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
            results_count: 0 as number,
            films: [
                {
                    id: 1,
                    name: 'A New Hope',
                    image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
                },
                {
                    id: 2,
                    name: 'The Empire Strikes Back',
                    image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
                },
                {
                    id: 3,
                    name: 'Return of the Jedi',
                    image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
                },
                {
                    id: 4,
                    name: 'The Phantom Menace',
                    image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
                },
                {
                    id: 5,
                    name: 'Attack of the Clones',
                    image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Star_Wars_Episode_II_Attack_of_the_Clones.jpg'
                },
                {
                    id: 6,
                    name: 'Revenge of the Sith',
                    image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
                },
                {
                    id: 7,
                    name: 'The Force Awakens',
                    image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
                },
                {
                    id: 8,
                    name: 'The Last Jedi',
                    image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
                },
                {
                    id: 9,
                    name: 'The Rise of Skywalker',
                    image: 'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker.jpg'
                },
                {
                    id: 10,
                    name: 'A New Hope',
                    image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
                },
                {
                    id: 11,
                    name: 'The Empire Strikes Back',
                    image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
                },
                {
                    id: 12,
                    name: 'Return of the Jedi',
                    image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
                },
                {
                    id: 13,
                    name: 'The Phantom Menace',
                    image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
                },
                {
                    id: 14,
                    name: 'Attack of the Clones',
                    image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Star_Wars_Episode_II_Attack_of_the_Clones.jpg'
                },
                {
                    id: 15,
                    name: 'Revenge of the Sith',
                    image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
                },
                {
                    id: 16,
                    name: 'The Force Awakens',
                    image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
                },
                {
                    id: 17,
                    name: 'The Last Jedi',
                    image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
                },
                {
                    id: 18,
                    name: 'The Rise of Skywalker',
                    image: 'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker.jpg'
                },
                {
                    id: 19,
                    name: 'A New Hope',
                    image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
                },
                {
                    id: 20,
                    name: 'The Empire Strikes Back',
                    image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
                }
            ] as any
        }
    },

    methods: {
        // Changes view mode depending on the query. If query is empty it shows trending films, otherwise it shows search results
        setViewMode(){
            if (this.$store.getters['search/getQuery'] === ''){
                this.view_trending = true;
            }
            else{
                this.view_trending = false;
                this.countResults();
            }

        },

        countResults(){
            this.results_count = 0;
            for (let i = 0; i < this.films.length; i++){
                this.results_count++;
            }

            
        },
    },

    mounted() {
        // Add infinite scroll using observer API
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
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
    display: grid;
    grid-template-areas:
        'saved_icon search filter_icon'
        'filters filters filters';
    grid-template-columns: 2fr 3fr 2fr;

    .router_link {
        grid-area: saved_icon;
        display: flex;
        justify-content: right;
        .saved_icon {
            width: 15%;
            cursor: pointer;
        }
    }
}

main {
    .title__component {
        margin-left: 10%;
    }
}
</style>
