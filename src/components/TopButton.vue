<template>
    <img v-on:click="goToTop" class="img_top" src="/src/assets/arrow_top.png" alt="return image">
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {
        goToTop():void{
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }
})
</script>

<style scoped lang="scss">
    .img_top {
    position: fixed; /* Fixed/sticky position */
    width: 20px;
    height: 20px;
    bottom: 50px; /* Place the button at the bottom of the page */
    right: 50px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: #99aabb; /* Set a background color */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    border-radius: 100px; /* Rounded corners */
}

.img_top:hover {
    background-color: purple; 
    transition: background-color 0.5s ease;
}
</style>


