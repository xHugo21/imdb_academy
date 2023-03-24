<template>
    <header>
        <img class="saved_icon" src="@/assets/bookmark.svg" alt="" />
        <SearchBar />
        <Filters></Filters>
    </header>
    <main>
        <H1Title title="Trending Now"></H1Title>
        <FilmsGrid>
            <FilmCard
                v-for="film in getFilms"
                v-bind:key="film.id"
                v-bind:character="film.name"
            ></FilmCard>
        </FilmsGrid>
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
                    id: 1,
                    name: 'A New Hope',
                    image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
                },
                {
                    id: 2,
                    name: 'The Empire Strikes Back',
                    image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
                }
            ] as any
        }
    },

    

    computed: {
        getFilms(): any {
            return this.films
        }
    }
})
</script>

<style scoped lang="scss">
header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .saved_icon {
        width: 5%;
        cursor: pointer;
    }
}
</style>
