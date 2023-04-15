<!--Component that displays the film card with its name and-->

<template>
    <div v-on:mouseenter="toggleHover" v-on:mouseleave="toggleHover" class="film__card">
        <div class="div__hovering__name" v-if="hovering">
            <p v-bind:class="['div__hovering__name__p' + '__' + isWandSelected]">
                {{ film.title }}
            </p>
        </div>

        <router-link :to="'/imdb_academy/filminfo/' + film.id" v-bind:class="{ 'disabled_link' : isWandSelected }"
            ><img
                v-bind:class="['film', 'film__hover__' + hovering + '__' + isWandSelected, {'light_mode': getColorMode==='light'}]"
                v-bind:alt="'Poster from ' + film.title"
                v-bind:src="getImageUrl"
        /></router-link>

        <div v-if="hovering" class="div__hovering__bookmark">
            <Bookmark v-bind:film="film"></Bookmark>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bookmark from '@/components/Bookmark.vue'
import type { Film } from '@/types'

export default defineComponent({
    components: {
        Bookmark
    },
    props: {
        film: {
            type: Object as () => Film,
            required: true
        }
    },
    data() {
        return {
            hovering: false as boolean,
        }
    },
    methods: {
        // Toggles the hovering state
        toggleHover(): void {
            this.hovering = !this.hovering
        },

        // Loads default image if the film doesn't have a poster
        loadDefaultImage(event: any): void {
            event.target.src = '/src/assets/default-movie.png'
        }
    },
    
    computed: {
        isWandSelected():boolean {
            return this.$store.getters['search/getWandSelected']
        },
        getColorMode():string{
            return this.$store.getters['search/getColorMode']
        },
        getImageUrl():string{
            if (this.film.poster_path === null || this.film.poster_path === undefined) {
                return '/src/assets/default-movie.png'
            } else {
                return 'https://image.tmdb.org/t/p/w500' + this.film.poster_path
            }
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

    .disabled_link {
        pointer-events: none;
    }
}
.film {
    width: 200px;
    height: 300px;
    border: 4px solid #99aabb5a;
    border-radius: 10px;
    transition: border .5s ease;
}

.light_mode{
    border: 4px solid black;
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
        text-align: center;
    }
    .div__hovering__name__p__false:link {
        text-decoration: none;
    }

    .div__hovering__name__p__true {
        color: yellow;
        font-size: 1.2rem;
        font-weight: 600;
        margin: 2% 2% 2% 2%;
        text-align: center;
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
}


</style>
