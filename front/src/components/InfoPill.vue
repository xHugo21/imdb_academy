<template>
    <p class='left__tags__text'>
        <slot></slot>
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    computed: {
        getColorMode(): string {
            return this.$store.getters['search/getColorMode']
        }
    },
})
</script>

<style scoped lang="scss">


.left__tags__text {
                color: black;
                font-size: 1.2rem;
                border: 2px solid purple;
                background-color: purple;
                border-radius: 15px;
                padding: 1%;
                font-weight: 600;
                cursor: pointer;
                transition: 1s;
            }

            

            .left__tags__text:hover {
                -ms-transform: scale(1.1); /* IE 9 */
                -webkit-transform: scale(1.1); /* Safari 3-8 */
                transform: scale(1.1); /* Standard syntax */
            }

            
</style>
