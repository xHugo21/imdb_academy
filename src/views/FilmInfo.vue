<!--View that displays all the info related to the film selected-->

<template>
    <div v-if="full_size_poster" v-on:click="toggleFullSizePoster($event)" class="fullSizePoster">
        <img class="fullSizePoster__image" :src="getFilm.image" alt="poster" />
    </div>
    <header>
        <router-link to="/imdb_academy/">
            <img src="/src/assets/return.svg" alt="logo" />
        </router-link>
    </header>
    <main>
        <div class="left">
            <div class="left__div">
                <H1Title class="left__title" :title="getFilm.name + ' - 1972'"></H1Title>
                <p class="left__text">
                    Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American
                    Corleone crime family. When organized crime family patriarch, Vito Corleone
                    barely survives an attempt on his life, his youngest son, Michael steps in to
                    take care of the would-be killers, launching a campaign of bloody revenge.
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
                    <p class="left__tags__text">Must Watch</p>
                    <p class="left__tags__text">Thriller</p>
                    <p class="left__tags__text">Top 5 All Time</p>
                </div>
            </div>
        </div>

        <div class="right">
            <div class="right__div">
                <img
                    class="right__image"
                    v-on:click="toggleFullSizePoster($event)"
                    :src="getFilm.image"
                    alt="poster"
                />
            </div>

            <div class="right__div">
                <img
                    v-if="!is_saved"
                    v-on:click="saveRemoveFilm()"
                    class="right__div__bookmark"
                    src="../assets/bookmark.svg"
                    alt="bookmark"
                />
                <img
                    v-else
                    v-on:click="saveRemoveFilm()"
                    class="right__div__bookmark"
                    src="../assets/bookmark_filled.svg"
                    alt="bookmark"
                />
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
                    <p class="right__ratings__number">Critics: 8/10</p>
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
        H1Title
    },
    data() {
        return {
            full_size_poster: false as boolean,
            is_saved: false as boolean
        }
    },
    methods: {
        // Toggles the full size poster
        toggleFullSizePoster(event: any): void {
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
            return {
                id: 0,
                name: 'Error',
                image: 'Error'
            }
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
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 5%;
    margin: 0 10% 0 10%;
    .left {
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
        display: flex;
        justify-content: center;
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
