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
            <div class="range-slider">
                <input
                    v-on:change="updateYearFilter"
                    id="yearmin"
                    type="range"
                    min="1900"
                    max="2023"
                    step="1"
                    v-model="sliderMin"
                />
                <input
                    v-on:change="updateYearFilter"
                    id="yearmax"
                    type="range"
                    min="1900"
                    max="2023"
                    step="1"
                    v-model="sliderMax"
                />
            </div>
            <output class="filters__div__output" id="valueyear"></output>
        </div>

        <div class="filters__div">
            <label class="filters__div__label" for="year">Duration</label>
            <div class="range-slider">
                <input
                    v-on:change="updateDurationFilter"
                    id="duration"
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                />
            </div>
            <output class="filters__div__output" id="valueduration"></output>
        </div>

        <div class="filters__div">
            <label class="filters__div__label" for="genre">Genre</label>
            <select class="filters__div__select">
                <option value="">* Genre *</option>
                <option value="paris">Thriller</option>
                <option value="london">Drama</option>
                <option value="athens">Comedy</option>
                <option value="madrid">Action</option>
            </select>
        </div>

        <div class="filters__div">
            <label class="filters__div__label" for="rating">Rating</label>
            <select class="filters__div__select">
                <option value="rating_critics">* Critics Rating *</option>
                <option value="paris">+ 1</option>
                <option value="london">+ 2</option>
                <option value="athens">+ 3</option>
                <option value="madrid">+ 4</option>
            </select>
            <select class="filters__div__select">
                <option value="rating_public">* Public Rating *</option>
                <option value="paris">+ 1</option>
                <option value="london">+ 2</option>
                <option value="athens">+ 3</option>
                <option value="madrid">+ 4</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            show_filters: false as boolean,
            minYear: 1900 as number,
            maxYear: 1970 as number
        }
    },
    methods: {
        toggleFilters(): void {
            this.show_filters = !this.show_filters
        },
        updateYearFilter(): void {
            const input1 = document.getElementById('yearmin') as HTMLInputElement
            const input2 = document.getElementById('yearmax') as HTMLInputElement
            const value = document.getElementById('valueyear') as HTMLInputElement

            value.textContent = input1.value + '-' + input2.value
        },
        updateDurationFilter(): void {
            const input = document.getElementById('duration') as HTMLInputElement
            const value = document.getElementById('valueduration') as HTMLInputElement

            value.textContent = input.value
        }
    },
    computed: {
        sliderMin: {
            get: function (): number {
                var val = this.minYear
                return val
            },
            set: function (val: number): void {
                if (val > this.maxYear) {
                    this.maxYear = val
                }
                this.minYear = val
            }
        },
        sliderMax: {
            get: function (): number {
                var val = this.maxYear
                return val
            },
            set: function (val: number): void {
                if (val < this.minYear) {
                    this.minYear = val
                }
                this.maxYear = val
            }
        }
    }
})
</script>

<style scoped lang="scss">
.filter_icon {
    grid-area: filter_icon;
    //justify-self: left;
    //align-self: center;
    height: 35px;
    cursor: pointer;
}

.filters {
    grid-area: filters;
    padding: 5% 0 5% 0;
    border-bottom: 3px solid #99aabb5a;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .filters__div {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 0 auto;
        .filters__div__label {
            font-weight: 700;
            color: #99aabb;
            margin-right: 5px;
            align-self: center;
        }

        .range-slider {
            width: 150px;
            text-align: center;
            position: relative;
            height: 1em;
        }

        .range-slider input[type='range'] {
            position: absolute;
            left: 0;
            bottom: 0;
        }

        input[type='range'] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
        }

        input[type='range']::-webkit-slider-runnable-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            background: #434c54;
        }

        input[type='range']::-webkit-slider-thumb {
            z-index: 2;
            position: relative;
            box-shadow: 0px 0px 0px #000;
            border: 1px solid #54056a;
            height: 18px;
            width: 18px;
            border-radius: 50px;
            background: purple;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -7px;
        }

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

// Add media queries for responsive design
@media screen and (max-width: 550px) {
    .filters {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 10%;
    }
}
</style>
