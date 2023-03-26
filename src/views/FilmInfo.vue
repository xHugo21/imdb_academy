<template>
    <header>
        <router-link to="/">
            <img src="/src/assets/logo.png" alt="logo" />
        </router-link>
    </header>
    <main>
        <H1Title title="Film Info"></H1Title>
    </main>
</template>

<script lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import H1Title from '@/components/H1Title.vue'
export default {
    components: {
        SearchBar,
        H1Title
    }
}
</script>

<style scoped lang="scss">
header {
    padding: 4% 0 4% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
