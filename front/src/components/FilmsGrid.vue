<!--Component that makes a simple grid using flex to display the film cards-->
<template>
    <section class="filmsgrid">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped lang="scss">
.filmsgrid {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 3% 3% 3%;
    gap: 25px;
    justify-content: center;
}
</style>
