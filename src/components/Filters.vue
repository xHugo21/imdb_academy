<template>
    <img v-on:click="toggleFilters" class="filter_icon" src="@/assets/filter.svg" alt="" />

    <div class="filters" v-if="show_filters">
        <div class="filters__div">
            <label class="filters__div__label" for="year">Year</label>
            <input class="filters__div__input" type="text" id="year" name="year" />
        </div>
        <div class="filters__div">
            <label class="filters__div__label" for="genre">Genre</label>
            <input class="filters__div__input" type="text" id="genre" name="genre" />
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
        }
    }
})
</script>

<style scoped lang="scss">
.filter_icon {
    width: 5%;
    cursor: pointer;
}

.filters {
    padding: 10% 0 10% 0;
    margin-bottom: 5%;
    width: 100%;
    border: 3px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10%;

    .filters__div {
        .filters__div__label {
            font-weight: 700;
            color: white;
        }

        .filters__div__input {
            border-radius: 15px;
            outline: 0;
        }
    }
}
</style>
