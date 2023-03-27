<template>
    <header>
        <RouterLink to="/imdb_academy/">
            <img src="/src/assets/return.svg" alt="logo" />
        </RouterLink>
    </header>
    <main>
        <H1Title class="title__saved" title="Saved"></H1Title>
        <FilmsGrid></FilmsGrid>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import H1Title from '@/components/H1Title.vue'
import FilmsGrid from '@/components/FilmsGrid.vue'

export default defineComponent({
    components: {
        H1Title,
        FilmsGrid
    }
})
</script>

<style scoped lang="scss">
header {
    padding: 4% 0 4% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

main{
    .title__saved{
        margin-left: 10%;
    }
}
</style>
