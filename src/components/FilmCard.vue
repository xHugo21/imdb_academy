<template>
    <router-link v-on:mouseenter="toggleHover"
            v-on:mouseleave="toggleHover" :to="'/imdb_academy/filminfo/'">
        <!--Add specific route with id of the film-->
        <div class="div__hovering" v-if="hovering">
            <p>The Godfather</p>
        </div>
        <img
            
            :class="['film', 'film__' + hovering]"
            v-bind:alt="'pelicula'"
            src="/src/assets/godfather.jpeg"
        />
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    props: ['film'],
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

.div__hovering {
    z-index: 100;
    position: absolute;
    background-color: #99aabb;
    border: 4px solid #99aabb;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
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
</style>
