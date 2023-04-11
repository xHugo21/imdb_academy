<template>
    <div class="range-slider">
                    <input
                        v-on:change="updateYearFilter"
                        :id="id1"
                        type="range"
                        :min="min"
                        :max="max"
                        step="1"
                        v-model="sliderMin"
                    />
                    <input
                        v-on:change="updateYearFilter"
                        :id="id2"
                        type="range"
                        :min="min"
                        :max="max"
                        step="1"
                        v-model="sliderMax"
                    />
                </div>
                <output class="filters__div__output" id="valueyear"></output>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            id1: {
                type: String as () => string,
                required: true
            },
            id2:{  
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
        data() {
        return {
            minYear: 1900 as number,
            maxYear: 1970 as number
        }
        },
    
        methods: {
            updateYearFilter(): void {
                const input1 = document.getElementById(this.id1) as HTMLInputElement
                const input2 = document.getElementById(this.id2) as HTMLInputElement
                const value = document.getElementById('valueyear') as HTMLInputElement

                value.textContent = input1.value + '-' + input2.value
            },
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