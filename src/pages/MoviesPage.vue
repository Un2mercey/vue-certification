<script setup>
import { items } from '@/mocks/movies.json';
import { ref } from 'vue';
import MovieList from '@/components/MovieList.vue';
import ComponentLayout from '@/components/layout/ComponentLayout.vue';

const movies = ref(items);
const isLoading = ref(false);
</script>

<template>
    <ComponentLayout :loading="isLoading">
        <MovieList
            v-model:is-loading="isLoading"
            v-model:movies="movies"
        />
    </ComponentLayout>
</template>
