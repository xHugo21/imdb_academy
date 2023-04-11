<template>
    <label class="filters__div__label" :for="type">{{ type }}</label>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            type: {
                type: String as () => string,
                required: true
            }
        }
    })
</script>

<style scoped lang="scss">
.filters__div__label {
            font-weight: 700;
            color: #99aabb;
            margin-right: 5px;
            align-self: center;
        }

        
</style>
