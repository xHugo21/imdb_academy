<!--Component that defines a default H1 title tag with a custom style-->
<template>
    <h1 v-bind:class="{'light_mode': getColorMode==='light'}">{{ title }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        title: String
    },

    computed: {
        getColorMode():string{
            return this.$store.getters['search/getColorMode'];
        }
    }
})
</script>

<style scoped lang="scss">
h1 {
    align-self: center;
    margin: 0 0 2% 0;
    color: #99aabb;
    font-size: 2.5rem;
    font-weight: 700;
    transition: color .5s ease;
}

.light_mode {
    color: black;
}
</style>
