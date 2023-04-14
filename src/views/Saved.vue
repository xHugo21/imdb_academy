<!--Saved view that displays all the films that the user has bookmarked-->

<template>
    <header>
        <RouterLink to="/imdb_academy/">
            <img src="/src/assets/return.svg" alt="logo" />
        </RouterLink>
    </header>
    <main>
        <H1Title class="title__saved" title="Saved"></H1Title>
        <FilmsGrid>
            <FilmCard v-for="film in savedFilms" v-bind:film="film" v-bind:key="film.id"></FilmCard>
        </FilmsGrid>
        <div class="observer_trigger">
        </div>
        <TopButton></TopButton>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import H1Title from '@/components/H1Title.vue'
import FilmsGrid from '@/components/FilmsGrid.vue'
import FilmCard from '@/components/FilmCard.vue'
import TopButton from '@/components/TopButton.vue'
import type { Film } from '@/types'

export default defineComponent({
    components: {
        H1Title,
        FilmsGrid,
        FilmCard,
        TopButton
    },
    computed: {
        savedFilms(): Array<Film> {
            return this.$store.getters['films/getSavedFilms']
        }
    },
    mounted() {
        // Add infinite scroll using observer API
        const observer: IntersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
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
    padding: 4% 0 4% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

main {
    .title__saved {
        margin-left: 10%;
    }
}
</style>
