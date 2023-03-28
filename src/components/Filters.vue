<template>
    <img v-on:click="toggleFilters" class="filter_icon" src="@/assets/filter.svg" alt="" />

    <div class="filters" v-if="show_filters">
        <div class="filters__div">
            <label class="filters__div__label" for="year">Year</label>
            <input
                v-on:change="updateYearFilter"
                class="filters__div__input"
                type="range"
                id="year"
                name="year"
                min="1900"
                max="2023"
            />
            <output class="filters__div__output" id="value"></output>
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="genre">Genre</label>
            <select multiple class="filters__div__select">
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Western">Western</option>
            </select>
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="director">Director</label>
            <input class="filters__div__input" type="text" id="director" name="director" />
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="actor">Actor</label>
            <input class="filters__div__input" type="text" id="actor" name="actor" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            show_filters: false as boolean
        }
    },
    methods: {
        toggleFilters(): void {
            this.show_filters = !this.show_filters
        },
        updateYearFilter(): void {
            const input = document.getElementById('year') as any
            const value = document.getElementById('value') as any

            value.textContent = input.value
        }
    },
    mounted() {}
})
</script>

<style scoped lang="scss">
.filter_icon {
    grid-area: filter_icon;
    justify-self: left;
    align-self: center;
    width: 20%;
    cursor: pointer;
}

.filters {
    grid-area: filters;
    padding: 5% 0 10% 0;
    margin: 3% 0 0 0;
    width: 100%;
    border-bottom: 3px solid #99aabb5a;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10%;

    .filters__div {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .filters__div__label {
            font-weight: 700;
            color: #99aabb5a;
            margin-right: 5px;
        }
        .filters__div__input {
            background-color: #99aabb5a;
            border-radius: 15px;
            outline: 0;
        }

        /*.filters__div__input::-webkit-slider-runnable-track {
            background: purple;
            border-radius: 25px;
        }*/

        /*.filters__div__input::-webkit-slider-thumb{
            background: #99aabb5a;
        }*/
        .filters__div__output {
            color: #99aabb5a;
            font-weight: 700;
        }

        .filters__div__select{
            background-color: #99aabb5a;
            outline: 0;
            border: 3px solid #99aabb5a;
            height: 10em;

            option{
                font-weight: 600;
                color: #99aabb5a;
            }            
        }
    }
}
</style>
