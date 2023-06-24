<script setup>
import MovieItem from '@/components/MovieItem.vue';

const props = defineProps(['movies']);
</script>

<template>
    <section class="movie-list">
        <MovieItem
            v-for="movie in props.movies"
            :key="movie.id"
            :movie="movie"
        />
    </section>
</template>
