<template>
    <div class="range-slider">
        <input
            v-on:change="updateDurationFilter"
            :id="id"
            type="range"
            :min="min"
            :max="max"
            step="1"
        />
    </div>
    <output class="filters__div__output" :id="'value' + id"></output>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            id: {
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
        },
    
        methods: {
            updateDurationFilter() {
                const slider = document.getElementById(this.id) as HTMLInputElement
                const output = document.getElementById('value' + this.id) as HTMLInputElement
                output.innerHTML = slider.value
            }
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
