<!--View that displays all the info related to the film selected-->

<template>
    <div v-if="full_size_poster" v-on:click="toggleFullSizePoster" class="fullSizePoster">
        <img
            v-on:error="loadDefaultImage($event)"
            class="fullSizePoster__image"
            :src="'https://image.tmdb.org/t/p/w500' + getFilm.posterPath"
            alt="poster"
        />
    </div>
    <header>
        <router-link to="/imdb_academy/">
            <img src="/src/assets/return.svg" alt="logo" />
        </router-link>
    </header>
    <main>
        <div class="left">
            <div class="left__div">
                <H1Title class="left__title" :title="getFilm.primaryTitle + ' - ' + getFilm.startYear"></H1Title>
                <p v-bind:class="['left__text', { light_mode: getColorMode === 'light' }]">
                    {{ getFilm.overview }}
                </p>
            </div>

            <!--<div class="left__div">
                <H1Title class="left__title" title="Cast"></H1Title>
                <p v-bind:class="['left__text', { light_mode: getColorMode === 'light' }]">
                    Director - {{ getFilm.directors }}
                </p>
            </div>-->
            <div class="left__div">
                <H1Title class="left__title" title="Genres"></H1Title>
                <div class="left__pills">
                    <InfoPill v-for="genre in getFilm.genres">{{ genre }}</InfoPill>
                </div>
            </div>

            <div class="left__div">
                <H1Title class="left__title" title="Rating"></H1Title>
                <div v-if="getFilm.averageRating !== 0" class="left__pills">
                    <InfoPill>Rating: {{ getFilm.averageRating }}</InfoPill>
                    <InfoPill>Votes: {{ getFilm.numVotes }}</InfoPill>
                </div>

                <p v-else v-bind:class="['left__text', { light_mode: getColorMode === 'light' }]">
                        No rating available
                </p>
            </div>

            <div class="left__div">
                <H1Title class="left__title" title="Tags"></H1Title>
                <div class="left__pills">
                    <InfoPill>Media type: {{ getFilm.titleType }}</InfoPill>
                    <InfoPill>Duration: {{ getFilm.runtimeMinutes }} minutes</InfoPill>
                    <InfoPill>Adult restriction: {{ getAdultRestriction }}</InfoPill>

                </div>
            </div>
        </div>

        <div class="right">
            <div class="right__div">
                <img
                    v-on:error="loadDefaultImage($event)"
                    v-bind:class="['right__image', { light_mode_img: getColorMode === 'light' }]"
                    v-on:click="toggleFullSizePoster"
                    :src="'https://image.tmdb.org/t/p/w500' + getFilm.posterPath"
                    alt="poster"
                />
            </div>

            <div class="right__div">
                <Bookmark v-bind:film="getFilm"></Bookmark>
            </div>

            <div class="right_div">
                <H1Title class="right__title" title="Trailer"></H1Title>
                <div v-if="getFilm.trailer" class="right__wheretowatch">
                    <div  class="right__trailer__div">
                        <a :href="getFilm.trailer"
                            ><img src="../assets/youtube.png" alt="youtube"
                        /></a>
                    </div>
                    
                </div>
                <p v-else v-bind:class="['right__text', { light_mode: getColorMode === 'light' }]">
                        No trailer available
                </p>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from '@/components/SearchBar.vue'
import H1Title from '@/components/H1Title.vue'
import Bookmark from '@/components/Bookmark.vue'
import InfoPill from '@/components/InfoPill.vue'

import type { Film } from '@/types'

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        SearchBar,
        H1Title,
        Bookmark,
        InfoPill
    },
    data() {
        return {
            full_size_poster: false as boolean,
            is_saved: false as boolean
        }
    },
    methods: {
        // Toggles the full size poster
        toggleFullSizePoster(): void {
            this.full_size_poster = !this.full_size_poster
        },

        // Saves or removes the film from the saved films
        saveRemoveFilm(): void {
            if (!this.is_saved) {
                this.$store.dispatch('films/saveFilm', this.getFilm)
            } else {
                this.$store.dispatch('films/removeFilm', this.getFilm)
            }
            this.is_saved = !this.is_saved
        },

        // Loads default image if the film doesn't have a poster
        loadDefaultImage(event: any): void {
            event.target.src = '/src/assets/default-movie.png'
        }
    },
    mounted() {
        // Checks if film is saved on load
        for (let i = 0; i < this.$store.getters['films/getSavedFilms'].length; i++) {
            if (this.$store.getters['films/getSavedFilms'][i].id === this.getFilm.id) {
                this.is_saved = true
            }
        }
    },
    computed: {
        getFilm(): Film {
            // Loop through all films in the store and return the one that matches the id
            for (let i = 0; i < this.$store.getters['films/getFilms'].length; i++) {
                if (this.$store.getters['films/getFilms'][i].id === this.id) {
                    return this.$store.getters['films/getFilms'][i]
                }
            }
            return {
                id: '',
                tconst: '',
                titleType: '',
                primaryTitle: '',
                originalTitle: '',
                startYear: 0,
                endYear: 0,
                runtimeMinutes: 0,
                genres: [],
                averageRating: 0,
                numVotes: 0,
                akas: [],
                directors: [],
                starring: [],
                isAdult: false,
                overview: '',
                posterPath: ''
            }
        },

        getAdultRestriction(): string {
            if (this.getFilm.isAdult) {
                return 'Yes'
            } else {
                return 'No'
            }
        },

        

        getColorMode(): string {
            return this.$store.getters['search/getColorMode']
        }
    }
})
</script>

<style scoped lang="scss">

.fullSizePoster {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.552);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .fullSizePoster__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}



header {
    padding: 2% 0 2% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

main {
    display: grid;
    grid-template-areas: 'left right';
    grid-template-columns: 7fr 3fr;
    margin: 0 10% 0 10%;
    padding-bottom: 7%;
    .left {
        grid-area: 'left';
        .left__div {
            margin-bottom: 5%;
        }
        .left__text {
            font-size: 1.5rem;
            color: #99aabb5a;
            text-align: justify;
        }

        .light_mode {
            color: black;
        }

        .left__pills {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;  
        }

    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        .left {
            margin-bottom: 5%;
        }
    }

    .right {
        grid-area: 'right';
        display: flex;
        flex-direction: column;
        align-items: center;
        .right__div {
            margin-bottom: 5%;

            .right__div__bookmark {
                width: 50px;
                height: 50px;
                cursor: pointer;
            }
        }

        .right__title {
            text-align: center;
            margin-bottom: 5%;
        }
        .right__image {
            width: 200px;
            height: 300px;
            border: 4px solid #99aabb5a;
            border-radius: 10px;
            transition: transform 0.3s;
        }

        .right__image:hover{
            border: 4px solid purple;
        }

        .light_mode_img {
            border: 4px solid black;
        }

        .right__image:hover {
            cursor: pointer;
            -ms-transform: scale(1.1); /* IE 9 */
            -webkit-transform: scale(1.1); /* Safari 3-8 */
            transform: scale(1.1);
        }

        .right__wheretowatch {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 5%;
            width: 60%;
            margin: 0 auto;
            margin-bottom: 3%;

            .right__trailer__div {
                color: #99aabb5a;
                border-radius: 15px;
                width: 35%;
                img {
                    border-radius: 15px;
                    width: 100%;
                    height: 100%;
                }
            }

            .right__wheretowatch__div {
                color: #99aabb5a;
                border-radius: 15px;
                width: 80%;
                img {
                    border-radius: 15px;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .right__text {
            font-size: 1.5rem;
            color: #99aabb5a;
        }

        .light_mode {
            color: black;
        }
        
    }
}

</style>
