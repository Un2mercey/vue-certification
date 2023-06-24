<script setup>
import { onBeforeMount, ref } from 'vue';
import MovieList from '@/components/MovieList.vue';
import { items } from './mocks/movies.json';

const movies = ref([]);

onBeforeMount(async () => {
    const imagesToLoad = items.map(({ image }) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            img.onerror = reject;
        });
    });

    try {
        await Promise.all(imagesToLoad);
        movies.value = [...items];
    } catch {
        console.error("Some of images hasn't been loaded!");
    }
});
</script>

<template>
    <Suspense>
        <MovieList :movies="movies" />
    </Suspense>
</template>
