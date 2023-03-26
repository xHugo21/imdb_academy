<template>
    <RouterView></RouterView>
    <footer>
        <h1>IMDb Project</h1>
        <h2>Authors: Juan Manuel Manga and Hugo García Cuesta</h2>
        <h2>All rights reserved</h2>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
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
</style>
