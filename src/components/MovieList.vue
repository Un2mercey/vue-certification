<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue';
import AddMovieModal from '@/components/AddMovieModal.vue';
import MovieItem from '@/components/MovieItem.vue';

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false,
    },
    movies: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['update:isLoading', 'update:movies']);
const movies = computed({
    get() {
        return props.movies;
    },
    set(value) {
        emit('update:movies', value);
    },
});

function updateMovieRating(index, newRating) {
    movies.value[index].rating = newRating;
}

function addMovie(movie) {
    movies.value = [
        ...movies.value,
        {
            ...movie,
            id: movies.value.at(-1).id + 1,
            rating: null,
        },
    ];
}

async function loadImages() {
    const imagesToLoad = movies.value.map(({ image }) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            img.onerror = reject;
        });
    });

    try {
        emit('update:isLoading', true);
        await Promise.all(imagesToLoad);
        emit('update:isLoading', false);
    } catch {
        console.error("Some of images hasn't been loaded!");
        emit('update:isLoading', false);
    }
}

const stopWatch = watchEffect(loadImages);
onBeforeUnmount(stopWatch);
</script>

<template>
    <section class="movie-list-wrapper">
        <div class="movie-list-header">
            <div class="spacer" />
            <div class="movie-list-header-actions">
                <AddMovieModal @add:movie="addMovie" />
            </div>
        </div>
        <div class="movie-list scrollbar-thin">
            <MovieItem
                v-for="(movie, index) in movies"
                :key="movie.id"
                :movie="movie"
                @update:rating="updateMovieRating(index, $event)"
            />
        </div>
    </section>
</template>

<style scoped>
.movie-list-wrapper {
    @apply flex flex-col gap-2;
}

.movie-list-header {
    @apply flex items-center justify-between w-full max-w-7xl px-8;
}

.movie-list-header-actions {
    @apply flex items-center justify-between space-x-8;
}

.movie-list {
    @apply flex flex-wrap items-center justify-between max-w-7xl overflow-auto h-[860px];
}

.spacer {
    @apply w-full flex-1;
}
</style>
