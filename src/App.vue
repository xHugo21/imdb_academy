<!--Main page of the web. It displays the current view depending on the route and the footer.-->

<template>
    <RouterView></RouterView>
    <footer v-bind:class="{'light_mode': getColorMode==='light'}">
        <h1>IMDb Project</h1>
        <h2>Frontend fellow: Hugo García Cuesta</h2>
        <h2>Backend fellow: Juan Manuel Manga</h2>
        <h2>All rights reserved</h2>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        getColorMode():string{
            return this.$store.getters['search/getColorMode'];
        }
    }
})
</script>

<style scoped lang="scss">
footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #99aabb5a;
    border-top: 1px solid #99aabb5a;
    padding: 2% 0 2% 0;
    bottom: 0;
    width: 100%;
    height: 60px;

    h1 {
        font-weight: 700;
    }
    h2 {
        font-weight: 700;
    }
}

.light_mode {
    color: black;
    border-color: black;
}

@media screen and (max-width: 465px) {
    footer {
        height: 150px;
        padding: 10% 0 10% 0;
    }
}
</style>
