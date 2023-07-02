<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = Number(route.params.id);
</script>

<template>
    <div>{{ movieId }}</div>
</template>
