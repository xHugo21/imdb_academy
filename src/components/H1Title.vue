<!--Component that defines each character card extracted from the Rick and Morty API-->
<template>
    <h1 class="main__title">{{ title }}</h1>
</template>

<script lang="ts">
export default {
    props: ["title"],
};
</script>

<style scoped lang="scss">
    .main__title{
		align-self: center;
		margin: 0 0 2% 3.5%;
		color: #99aabb5a;
		font-size: 2.5rem;
		font-weight: 700;
    }
</style>
