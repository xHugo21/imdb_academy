<template>
    <select :id="id" v-on:change="applySelectFilter($event)" class="filters__div__select">
        <option v-for="option in options" v-bind:value="option">{{ option }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        id: {
            type: String as () => string,
            required: true
        },
        options: {
            type: Array as () => string[],
            required: true
        }
    },

    methods: {
        applySelectFilter(event: any): void {

            if (this.id === 'Genre') {
                this.$store.commit('search/setGenre', event.target.value)
            } else if (this.id === 'Type') {
                if (event.target.value === 'tvSeries') {
                    this.$store.commit('search/setMediaType', event.target.value)
                } else {
                    this.$store.commit('search/setMediaType', event.target.value.toLowerCase())
                }
            }
            this.$store.dispatch('search/updateUrl')
            this.$store.dispatch('films/fetchFilms')
        }
    },

    mounted() {
        // Set select value to store value
        const select: HTMLInputElement = document.getElementById(this.id) as HTMLInputElement
        if (this.id === 'Genre'){
            if (this.$store.getters['search/getGenre'] === '') {
                select.value = 'Any'
            }
            else{
                select.value = this.$store.getters['search/getGenre']
            }
        }
        else if (this.id === 'Type'){
            if (this.$store.getters['search/getMediaType'] === 'tvseries')
                select.value = 'tvSeries'
            else
                select.value = 'Movie'
        }
    }
})
</script>

<style scoped lang="scss">
.filters__div__select {
    cursor: pointer;
    background-color: #99aabb5a;
    width: 110%;
    border-radius: 25px;
    border: none;
    padding: 1% 5% 1% 5%;
    outline: 0;
    border: 2px solid rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, 0.717);
    font-weight: 700;
    transition: 0.5s;

    option {
        font-weight: 600;
        color: #99aabb;
    }
}
</style>
