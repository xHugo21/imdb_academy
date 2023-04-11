<template>
    <div class="range-slider">
        <input
            v-for="id in ids"
            v-on:change="updateRangeFilter"
            :id="id"
            type="range"
            :min="min"
            :max="max"
            step="1"
        />
    </div>
    <output class="filters__div__output" :id="output_id"></output>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        ids: {
            type: Array as () => string[],
            required: true
        },
        output_id: {
            type: String as () => string,
            required: true
        },
        min: {
            type: Number as () => number,
            required: true
        },
        max: {
            type: Number as () => number,
            required: true
        },
        initial_values: {
            type: Array as () => number[],
            required: true
        }
    },

    methods: {
        updateRangeFilter() {
            var inputs = []
            const output = document.getElementById(this.output_id) as HTMLInputElement
            output.innerHTML = ''

            // Loop that cycles through each id
            for (let i = 0; i < this.ids.length; i++) {
                // Append the input element to the inputs array
                inputs[i] = document.getElementById(this.ids[i]) as HTMLInputElement
                output.innerHTML += inputs[i].value
                if (i != this.ids.length - 1) {
                    output.innerHTML += ' - '
                }
            }
        }
    },

    mounted() {
        // Set the initial values of the inputs
        for (let i = 0; i < this.ids.length; i++) {
            const input = document.getElementById(this.ids[i]) as HTMLInputElement
            input.value = this.initial_values[i].toString()
        }
        // Update the output
        this.updateRangeFilter()
    }
})
</script>

<style scoped lang="scss">
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
</style>
