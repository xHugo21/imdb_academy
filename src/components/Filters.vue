<!--Component that includes all the filters that can be used-->

<template>
    <img
        v-if="!show_filters"
        v-on:click="toggleFilters"
        class="filter_icon"
        src="/src/assets/filter.svg"
        alt="filter_icon"
    />
    <img
        v-else
        v-on:click="toggleFilters"
        class="filter_icon"
        src="/src/assets/filter_filled.svg"
        alt="filter_icon_filled"
    />

    <div class="filters" v-if="show_filters">
        <div class="filters__div">
            <label class="filters__div__label" for="year">Release Year</label>
            <input
                v-on:change="updateYearFilter"
                class="filters__div__range"
                type="range"
                id="year"
                name="year"
                min="1900"
                max="2023"
            />
            <output class="filters__div__output" id="valueyear"></output>
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="duration">Duration</label>
            <input
                v-on:change="updateDurationFilter"
                class="filters__div__range"
                type="range"
                id="duration"
                name="duration"
                min="0"
                max="300"
            />
            <output class="filters__div__output" id="valueduration"></output>
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="genre">Genre</label>
            <select class="filters__div__select">
                <option value=""> * Genre * </option>
                <option value="paris">Thriller</option>
                <option value="london">Drama</option>
                <option value="athens">Comedy</option>
                <option value="madrid">Action</option>
            </select>
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="rating">Rating</label>
            <select class="filters__div__select">
                <option value="rating_critics"> * Critics Rating * </option>
                <option value="paris">+ 1</option>
                <option value="london">+ 2</option>
                <option value="athens">+ 3</option>
                <option value="madrid">+ 4</option>
            </select>
            <select class="filters__div__select">
                <option value="rating_public"> * Public Rating * </option>
                <option value="paris">+ 1</option>
                <option value="london">+ 2</option>
                <option value="athens">+ 3</option>
                <option value="madrid">+ 4</option>
            </select>
        </div>
        <!--<div class="filters__div">
            <label class="filters__div__label" for="director">Director</label>
            <input class="filters__div__input" type="text" id="director" name="director" />
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="actor">Actor</label>
            <input class="filters__div__input" type="text" id="actor" name="actor" />
        </div>-->
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
            const value = document.getElementById('valueyear') as any

            value.textContent = input.value
        },
        updateDurationFilter(): void {
            const input = document.getElementById('duration') as any
            const value = document.getElementById('valueduration') as any

            value.textContent = input.value
        }
    }
})
</script>

<style scoped lang="scss">
.filter_icon {
    grid-area: filter_icon;
    justify-self: left;
    align-self: center;
    width: 15%;
    cursor: pointer;
}

.filters {
    grid-area: filters;
    padding: 5% 0 5% 0;
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
            color: #99aabb;
            margin-right: 5px;
            align-self: center;
        }

        .filters__div__range {
            cursor: pointer;
        }

        
        /*.filters__div__input {
            background-color: #99aabb5a;
            border-radius: 25px;
            border: none;
            padding: 1% 5% 1% 5%;
            outline: 0;
            border: 2px solid rgba(0, 0, 0, 0);
            color: rgba(255, 255, 255, 0.717);
            font-weight: 700;
            transition: 0.5s;
        }

        .filters__div__input::placeholder {
            color: rgba(255, 255, 255, 0.717);
        }

        .filters__div__input:focus {
            border: 2px solid purple;
        }*/
        .filters__div__output {
            color: #99aabb;
            font-weight: 700;
        }

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
    }
}
</style>
