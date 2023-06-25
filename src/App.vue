<script setup>
import { ref } from 'vue';
import CustomLoader from '@/components/CustomLoader.vue';
import MovieList from '@/components/MovieList.vue';
import { items } from './mocks/movies.json';

const movies = ref(items);
const isLoading = ref(false);
</script>

<template>
    <CustomLoader v-if="isLoading" />
    <MovieList
        v-model:is-loading="isLoading"
        v-model:movies="movies"
    />
</template>
