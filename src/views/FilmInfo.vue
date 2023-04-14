<!--View that displays all the info related to the film selected-->

<template>
    <div v-if="full_size_poster" v-on:click="toggleFullSizePoster" class="fullSizePoster">
        <img
            v-on:error="loadDefaultImage($event)"
            class="fullSizePoster__image"
            :src="'https://image.tmdb.org/t/p/w500' + getFilm.poster_path"
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
                <H1Title class="left__title" :title="getFilm.title"></H1Title>
                <p class="left__text">
                    {{ getFilm.overview }}
                </p>
            </div>
            <div class="left__div">
                <H1Title class="left__title" title="Cast"></H1Title>
                <p class="left__text">Director - Francis Ford Coppola</p>
                <p class="left__text">Cast - Marlon Brando | Al Pacino</p>
                <p class="left__text">Producer - Albert S. Ruddy</p>
            </div>
            <div class="left__div">
                <H1Title class="left__title" title="Tags"></H1Title>
                <div class="left__tags">
                    <p class="left__tags__text">Release Date: {{ getFilm.release_date }}</p>
                    <p class="left__tags__text">Original Language: {{ getFilm.original_language }}</p>
                    <p class="left__tags__text">Popularity: {{ getFilm.popularity }}</p>
                    <p class="left__tags__text">Genres: {{ getFilm.genre_ids }}</p>
                </div>
            </div>
        </div>

        <div class="right">
            <div class="right__div">
                <img
                    v-on:error="loadDefaultImage($event)"
                    class="right__image"
                    v-on:click="toggleFullSizePoster"
                    :src="'https://image.tmdb.org/t/p/w500' + getFilm.poster_path"
                    alt="poster"
                />
            </div>

            <div class="right__div">
                <Bookmark v-bind:film="getFilm"></Bookmark>
            </div>

            <div class="right_div">
                <H1Title class="right__title" title="Trailer"></H1Title>
                <div class="right__wheretowatch">
                    <div class="right__trailer__div">
                        <a href="https://www.youtube.com/"
                            ><img src="../assets/youtube.png" alt="youtube"
                        /></a>
                    </div>
                </div>
            </div>

            <div class="right__div">
                <H1Title class="right__title" title="Where to watch"></H1Title>
                <div class="right__wheretowatch">
                    <div class="right__wheretowatch__div">
                        <a href="https://www.netflix.com/es-en/"
                            ><img src="../assets/netflix.png" alt="netflix"
                        /></a>
                    </div>
                    <div class="right__wheretowatch__div">
                        <a href="https://www.primevideo.com/"
                            ><img src="../assets/primevideo.png" alt="primevideo"
                        /></a>
                    </div>
                    <div class="right__wheretowatch__div">
                        <a href="https://www.hbomax.com/es/es"
                            ><img src="../assets/hbo.png" alt="hbo"
                        /></a>
                    </div>
                </div>
            </div>


            <div class="right__div">
                <H1Title class="right__title" title="Ratings"></H1Title>
                <div class="right__ratings">
                    <p class="right__ratings__number">Critics: {{ getFilm.vote_average }}</p>
                    <p class="right__ratings__number">Public: 4/5</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from '@/components/SearchBar.vue'
import H1Title from '@/components/H1Title.vue'
import Bookmark from '@/components/Bookmark.vue'

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
        Bookmark
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
                if (this.$store.getters['films/getFilms'][i].id === parseInt(this.id)) {
                    return this.$store.getters['films/getFilms'][i]
                }
            }
            // TODO Change
            return {
                adult: false,
                backdrop_path: '',
                genre_ids: [],
                id: 0,
                original_language: '',
                original_title: '',
                overview: '',
                popularity: 0,
                poster_path: '',
                release_date: '',
                title: '',
                video: false,
                vote_average: 0,
                vote_count: 0
            }
        }
    }
})
</script>

<style scoped lang="scss">

/*.zoom-fade-enter-active {
    transition: opacity 3s ease;
}

.zoom-fade-leave-active {
    transition: opacity 3s ease;
}

.zoom-fade-enter-from {
    opacity: 0;
}
.zoom-fade-leave-to {
    opacity: 0;
}*/

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
        .left__tags {
            display: flex;
            flex-direction: row;
            gap: 10px;

            .left__tags__text {
                color: black;
                font-size: 1.2rem;
                border: 2px solid purple;
                background-color: purple;
                border-radius: 15px;
                padding: 1%;
                font-weight: 600;
                cursor: pointer;
                transition: 1s;
            }

            .left__tags__text:hover {
                -ms-transform: scale(1.1); /* IE 9 */
                -webkit-transform: scale(1.1); /* Safari 3-8 */
                transform: scale(1.1); /* Standard syntax */
            }
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        .left {
            margin-bottom: 5%;
        }
    }

    .right {
        grid-area: 'right';
        display: flex;
        flex-direction: column;
        align-items: center ;
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
        .right__ratings {
            display: flex;
            flex-direction: row;
            gap: 10px;

            .right__ratings__number {
                width: 100px;
                color: black;
                font-size: 1.2rem;
                border: 2px solid purple;
                background-color: purple;
                border-radius: 15px;
                padding: 1% 3% 1% 3%;
                font-weight: 600;
                cursor: pointer;
                transition: 1s;
            }

            .right__ratings__number:hover {
                -ms-transform: scale(1.1); /* IE 9 */
                -webkit-transform: scale(1.1); /* Safari 3-8 */
                transform: scale(1.1); /* Standard syntax */
            }
        }
    }
}
</style>
