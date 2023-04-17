<!--Component that defines the bookmark icon and functionality to save films-->
<template>
    <img
        v-on:click="saveRemoveFilm()"
        v-if="!is_saved"
        src="../assets/bookmark.svg"
        alt="Bookmark Icon"
        class="bookmark"
    />
    <img
        v-else
        v-on:click="saveRemoveFilm()"
        src="../assets/bookmark_filled.svg"
        class="bookmark"
    />
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
            is_saved: false as boolean
        }
    },

    methods: {
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
    }
})
</script>

<style scoped lang="scss">
.bookmark {
    z-index: 1000;
    cursor: pointer;
    width: 30px;
    height: 30px;
}
</style>
