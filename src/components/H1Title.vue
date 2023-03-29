<!--Component that defines a default H1 title tag with a custom style-->
<template>
    <h1 class="main__title">{{ title }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        title: String
    }
})
</script>

<style scoped lang="scss">
.main__title {
    align-self: center;
    margin: 0 0 2% 0;
    color: #99aabb5a;
    font-size: 2.5rem;
    font-weight: 700;
}
</style>
