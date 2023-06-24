<script setup>
import { toRefs } from 'vue';
import MovieItem from '@/components/MovieItem.vue';

const props = defineProps({
    movies: {
        type: Array,
        default: [],
    },
});
defineEmits(['updateRating']);

const { movies } = toRefs(props);
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
