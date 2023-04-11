<!--Component that displays the film card with its name and-->

<template>
    <div v-on:mouseenter="toggleHover" v-on:mouseleave="toggleHover" class="film__card">
        <div class="div__hovering__name" v-if="hovering">
            <p v-bind:class="['div__hovering__name__p' + '__' + isWandSelected]">{{ film.title }}</p>
        </div>

        <router-link :to="'/imdb_academy/filminfo/' + film.id"
            ><img
                v-on:error="loadDefaultImage($event)"
                v-bind:class="['film', 'film__hover__' + hovering + '__' + isWandSelected]"
                v-bind:alt="'Poster from ' + film.title"
                v-bind:src="'https://image.tmdb.org/t/p/w500' + film.poster_path"
        /></router-link>

        <div v-on:click="saveRemoveFilm()" class="div__hovering__bookmark" v-if="hovering">
            <img
                v-if="!is_saved"
                src="../assets/bookmark.svg"
                alt="Bookmark Icon"
                class="bookmark"
            />
            <img v-else src="../assets/bookmark_filled.svg" class="bookmark" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Film } from '@/types'

export default defineComponent({
    props: {
        film: {
            type: Object as () => Film,
            required: true
        }
    },
    data() {
        return {
            hovering: false as boolean,
            is_saved: false as boolean
        }
    },
    methods: {
        // Toggles the hovering state
        toggleHover(): void {
            this.hovering = !this.hovering
        },

        // Saves or removes the film from the saved films
        saveRemoveFilm(): void {
            if (!this.is_saved) {
                this.$store.dispatch('films/saveFilm', this.film)
            } else {
                this.$store.dispatch('films/removeFilm', this.film)
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
            if (this.$store.getters['films/getSavedFilms'][i].id === this.film.id) {
                this.is_saved = true
            }
        }
    },

    computed: {
        isWandSelected() {
            return this.$store.getters['search/getWandSelected']
        }
    }
})
</script>

<style scoped lang="scss">
.film__card {
    position: relative;
    display: flex;
    justify-content: center;
    transition: transform 0.3s;
}
.film {
    width: 200px;
    height: 300px;
    border: 4px solid #99aabb5a;
    border-radius: 10px;
}

.film__card:hover {
    cursor: pointer;
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.film__hover__true__false {
    border: 4px solid purple;
    border-radius: 10px;
}

.film__hover__true__true {
    border: 4px solid yellow;
    border-radius: 10px;
}

.div__hovering__name {
    z-index: 100;
    position: absolute;
    background-color: #99aabb;
    top: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    min-height: 45px;

    .div__hovering__name__p__false {
        color: purple;
        font-size: 1.2rem;
        font-weight: 600;
        margin: 2% 2% 2% 2%;
        
    }
    .div__hovering__name__p__false:link {
        text-decoration: none;
    }

    .div__hovering__name__p__true {
        color: yellow;
        font-size: 1.2rem;
        font-weight: 600;
    }
    .div__hovering__name__p__true:link {
        text-decoration: none;
    }
}

.div__hovering__bookmark {
    z-index: 100;
    position: absolute;
    bottom: 10px;
    background-color: #99aabb;
    //border: 4px solid #99aabb;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 50px;
    .bookmark {
        width: 30px;
        height: 30px;
        // Align to the center of the div
        display: flex;
        justify-content: center;
    }
}
</style>
