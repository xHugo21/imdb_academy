<template>
    <router-link :to="'/imdb_academy/filminfo'">
        <!--Add specific route with id of the film-->
        <img
            v-on:mouseenter="toggleHover"
            v-on:mouseleave="toggleHover"
            :class="['film', 'film__' + hovering]"
            v-bind:alt="'pelicula'"
            src="/src/assets/godfather.jpeg"
        />
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        film: Object
    },
    data() {
        return {
            hovering: false as boolean
        }
    },
    methods: {
        toggleHover(): void {
            this.hovering = !this.hovering
        }
    }
})
</script>

<style scoped lang="scss">
.film {
    width: 200px;
    height: 300px;
    transition: transform 0.3s;
}

.film:hover {
    cursor: pointer;
    -ms-transform: scale(1.1); /* IE 9 */
    -webkit-transform: scale(1.1); /* Safari 3-8 */
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
</style>
