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

    <Transition name="slide-fade">
        <div class="filters" v-if="show_filters">
            <div class="filters__div">
                <LabelFilter v-bind:type="'Release Year'"></LabelFilter>
                <RangeFilter
                    v-bind:ids="['yearmin', 'yearmax']"
                    v-bind:output_id="'yearvalue'"
                    v-bind:min="1900"
                    v-bind:max="2023"
                    v-bind:initial_values="[1900, 2023]"
                ></RangeFilter>
            </div>

            <div class="filters__div">
                <LabelFilter v-bind:type="'Max Duration'"></LabelFilter>
                <RangeFilter
                    v-bind:ids="['durationmin', 'durationmax']"
                    v-bind:output_id="'durationvalue'"
                    v-bind:min="0"
                    v-bind:max="300"
                    v-bind:initial_values="[0, 300]"
                ></RangeFilter>
            </div>

            <div class="filters__div">
                <LabelFilter v-bind:type="'Genre Selection'"></LabelFilter>
                <SelectFilter
                    v-bind:id="'Genre'"
                    v-bind:options="[
                        'Any',
                        'Drama',
                        'Comedy',
                        'Documentary',
                        'Action',
                        'Crime',
                        'Romance',
                        'Thriller',
                        'Adventure',
                        'Biography',
                        'N/A'
                    ]"
                ></SelectFilter>
            </div>

            <div class="filters__div">
                <LabelFilter v-bind:type="'Media Type'"></LabelFilter>
                <SelectFilter
                    v-bind:id="'Type'"
                    v-bind:options="['Movie', 'tvSeries']"
                ></SelectFilter>
            </div>

            <div class="filters__div">
                <LabelFilter v-bind:type="'Min Rating'"></LabelFilter>
                <RangeFilter
                    v-bind:ids="['rating']"
                    v-bind:output_id="'ratingvalue'"
                    v-bind:min="0"
                    v-bind:max="10"
                    v-bind:initial_values="[0]"
                    v-bind:step="0.1"
                ></RangeFilter>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LabelFilter from '@/components/LabelFilter.vue'
import RangeFilter from '@/components/RangeFilter.vue'
import SelectFilter from '@/components/SelectFilter.vue'

export default defineComponent({
    components: {
        LabelFilter,
        RangeFilter,
        SelectFilter
    },

    data() {
        return {
            show_filters: false as boolean
        }
    },
    methods: {
        toggleFilters(): void {
            this.show_filters = !this.show_filters
        }
    }
})
</script>

<style scoped lang="scss">
.filter_icon {
    grid-area: filter_icon;
    height: 40px;
    margin-top: 2px;
    cursor: pointer;
}

.filters {
    grid-area: filters;
    padding: 5% 0 4% 0;
    border-bottom: 3px solid #99aabb5a;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .filters__div {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 0 auto;
    }
}

.slide-fade-enter-active {
    transition: all 0.8s ease;
}

.slide-fade-leave-active {
    transition: all 0.8s ease;
}

.slide-fade-enter-from {
    transform: translateY(-30px);
    opacity: 0;
}
.slide-fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

// Add media queries for responsive design
@media screen and (max-width: 750px) {
    .filters {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 10%;
    }
}
</style>
