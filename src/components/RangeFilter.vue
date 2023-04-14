<template>
    <div class="range-slider">
        <input
            v-for="id in ids"
            
            v-on:change="updateRangeFilter"
            :id="id"
            type="range"
            :min="min"
            :max="max"
            :step="step"
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
        },
        step: {
            type: Number as () => number,
            required: false,
            default: 1
        }
    },

    methods: {
        /*updateRangeFilter() {
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
            this.applyRangeFilter(inputs);

            
        },*/

        updateRangeFilter():void{
            var inputs:Array<HTMLInputElement> = [];
            const output:HTMLInputElement = document.getElementById(this.output_id) as HTMLInputElement
            output.innerHTML = ''

            for (let i = 0; i < this.ids.length; i++) {
                // Append the input element to the inputs array
                inputs[i] = document.getElementById(this.ids[i]) as HTMLInputElement;

                var val:number = (parseInt(inputs[i].value) - this.min) / (this.max - this.min);
                val *= 100; // Convert to percentage

                // Modify css input type range class
                inputs[i].style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
                    'color-stop(' + val + '%, purple), ' +
                    'color-stop(' + val + '%, #434c54)' +
                    ')';

                inputs[i].style.backgroundImage = '-moz-linear-gradient(left center, purple 0%, purple ' + val + '%, #434c54 ' + val + '%, #434c54 100%)';

                output.innerHTML += inputs[i].value

                if (i != this.ids.length - 1) {
                    output.innerHTML += ' - '
                }
                
            }
            this.applyRangeFilter(inputs);
        },

        applyRangeFilter(inputs:Array<HTMLInputElement>):void{
            // Cycle through input and print its value
            for (let i = 0; i < inputs.length; i++) {
                console.log(this.output_id, inputs[i].value);
            }

            if (this.ids[0] === 'yearmin'){
                console.log("holaadfas");
                this.$store.dispatch('search/updateYear', inputs[1].value);
                this.$store.dispatch('films/fetchFromURL');
            }
            else if (this.ids[0] === 'duration'){

            }
            else if(this.ids[0] === 'rating'){

            }
        }
    },

    mounted() {
        // Set the initial values of the inputs
        for (let i = 0; i < this.ids.length; i++) {
            const input:HTMLInputElement = document.getElementById(this.ids[i]) as HTMLInputElement
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

/*input[type='range'] {
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
}*/

input[type=range] {

    -webkit-appearance: none;
    appearance: none;
    -moz-apperance: none;
    border-radius: 6px;
    height: 6px;
    
    background-image: -webkit-gradient(linear,
        left top, 
        right top, 
        color-stop(0%, purple),
        color-stop(50%, #434c54));
    
    background-image: -moz-linear-gradient(left center,
        purple 0%, purple 50%,
        #434c54 50%, #434c54 100%);
}

input[type="range"]::-moz-range-track {
    border: none;
    background: none;
    outline: none;
}

input[type=range]:focus {
    outline: none;
    border: none;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background-color: purple;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    z-index: 100;
}

input[type=range]::-moz-range-thumb {
    -moz-appearance: none !important;
    background-color: purple;
    border: none;
    height: 13px;
    width: 13px;
    border-radius: 50%;
}

.filters__div__output {
    color: #99aabb;
    font-weight: 700;
}
</style>
