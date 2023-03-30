<!--Component that displays the film card with its name and-->

<template>
    <router-link
        class="film__card"
        :to="'/imdb_academy/filminfo/' + film.id + '?film=' + film"
    >

        <div class="div__hovering__name" v-if="hovering">
            <p>{{ film.name }}</p>
        </div>

        <img  v-on:mouseenter="toggleHover" v-on:mouseleave="toggleHover" :class="['film', 'film__' + hovering]" v-bind:alt="'Poster from ' + film.name" :src="film.image" />

        <div v-on:click="saveRemoveFilm()" class="div__hovering__bookmark" v-if="hovering">
            <img src="../assets/bookmark.svg" alt="Bookmark Icon" class="bookmark">
            <!--<img src="../assets/bookmark_filled.svg" class="bookmark">-->
        </div>
        
    </router-link>
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
})
</script>

<style scoped lang="scss">

.film__card {
    position: relative;
    display: flex;
    justify-content: center;
}
.film {
    width: 200px;
    height: 300px;
    transition: transform 0.3s;
}

.film:hover {
    cursor: pointer;
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.film__false {
    border: 4px solid #99aabb5a;
    border-radius: 10px;
}
.film__true {
    border: 4px solid purple;
    border-radius: 10px;
}

.div__hovering__name {
    z-index: 100;
    position: absolute;
    background-color: #99aabb;
    //border: 4px solid #99aabb;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 208px;
    height: 50px;
    p {
        color: purple;
        font-size: 1.2rem;
        font-weight: 600;
    }
    p:link {
        text-decoration: none;
    }
}

.div__hovering__bookmark {
    z-index: 100;
    position: absolute;
    bottom: 0;
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
