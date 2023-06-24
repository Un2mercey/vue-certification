<script setup>
import MovieItem from '@/components/MovieItem.vue';

defineProps(['movies']);
defineEmits(['updateRating']);
</script>

<template>
    <section class="movie-list">
        <MovieItem
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @update-rating="$emit('updateRating', movie.id, $event)"
        />
    </section>
</template>
