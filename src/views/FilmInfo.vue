<template>
    <div v-if="fullSizePoster" v-on:click="toggleFullSizePoster($event)" class="fullSizePoster">
        <img class="fullSizePoster__image" src="/src/assets/godfather.jpeg" alt="poster" />
    </div>
    <header>
        <RouterLink to="/imdb_academy/">
            <img src="/src/assets/return.svg" alt="logo" />
        </RouterLink>
    </header>
    <main>
        <div class="left">
            <div class="left__div">
                <H1Title class="left__title" title="The Godfather - 1972"></H1Title>
                <p class="left__text">
                    Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.
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
                    src="/src/assets/godfather.jpeg"
                    alt="poster"
                />
            </div>
            <div class="right__div">
                <H1Title class="right__title" title="Where to watch"></H1Title>
                <div class="right__wheretowatch">
                    <div class="right__wheretowatch__div">
                        <img src="../assets/netflix.png" alt="netflix">
                    </div>
                    <div class="right__wheretowatch__div">
                    <img src="../assets/primevideo.png" alt="primevideo">
                    </div>
                    <div class="right__wheretowatch__div">
                    <img src="../assets/hbo.png" alt="hbo">
                    </div>
                </div>
            </div>
            <div class="right__div">
                <H1Title class="right__title" title="Ratings"></H1Title>
                <div class="right__ratings">
                    <p class="right__ratings__number">8/10</p>
                    <p class="right__ratings__number">7.5/10</p>
                    <p class="right__ratings__number">4/5</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from '@/components/SearchBar.vue'
import H1Title from '@/components/H1Title.vue'

export default defineComponent({
    components: {
        SearchBar,
        H1Title
    },
    data() {
        return {
            fullSizePoster: false as boolean
        }
    },
    methods: {
        toggleFullSizePoster(event: any): void {
            this.fullSizePoster = !this.fullSizePoster
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
    padding: 4% 0 4% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 150px;
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
            }
        }
    }

    .right {
        .right__div {
            margin-bottom: 10%;
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
            justify-content: space-evenly;
            gap: 10px;
            .right__wheretowatch__div {
                color: #99aabb5a;
                border: 2px solid purple;
                border-radius: 15px;
                padding: 1%;
                width: 80%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .right__ratings {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            gap: 10px;
            .right__ratings__number {
                color: black;
                font-size: 1.2rem;
                border: 2px solid purple;
                background-color: purple;
                border-radius: 15px;
                padding: 1% 3% 1% 3%;
                font-weight: 600;
            }
        }
    }
}
</style>
