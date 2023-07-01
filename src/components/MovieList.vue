<script setup>
import { ChartBarIcon } from '@heroicons/vue/24/outline';
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue';
import MovieModal from '@/components/MovieModal.vue';
import MovieItem from './MovieItem.vue';

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
const movieModalRef = ref(null);
const movies = computed({
    get() {
        return props.movies;
    },
    set(value) {
        emit('update:movies', value);
    },
});
const avgRating = computed(() => {
    const sum = movies.value.reduce((acc, { rating }) => acc + rating, 0);
    return (sum / movies.value.length).toFixed(1);
});

function updateMovieRating(id, rating) {
    movies.value = movies.value.map((movie) => {
        if (movie.id === id) movie.rating = rating;
        return movie;
    });
}

function removeRatings() {
    movies.value = movies.value.map((movie) => {
        movie.rating = null;
        return movie;
    });
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

function editMovie(form) {
    movies.value = movies.value.map((movie) => {
        if (movie.id === form.id) return form;
        return movie;
    });
}

function openEditModal(id) {
    const movie = movies.value.find((movie) => movie.id === id);
    movieModalRef.value.edit(movie);
}

function removeMovie(id) {
    movies.value = movies.value.filter((movie) => movie.id !== id);
}

async function loadImages() {
    emit('update:isLoading', true);
    const imagesToLoad = movies.value.map(({ image }) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            img.onerror = reject;
        });
    });

    try {
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
            <div class="movie-list-header-title">
                total movies: {{ movies.length }}
                <template v-if="movies.length">
                    <span>/</span>
                    average rating: {{ avgRating }}
                </template>
            </div>
            <div class="spacer" />
            <div class="movie-list-header-actions">
                <button
                    class="btn-primary"
                    @click="removeRatings"
                >
                    <span class="btn-content">
                        <ChartBarIcon />
                        remove ratings
                    </span>
                </button>
                <MovieModal
                    ref="movieModalRef"
                    @add:movie="addMovie"
                    @edit:movie="editMovie"
                />
            </div>
        </div>
        <div class="movie-list scrollbar-thin">
            <MovieItem
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @update:rating="updateMovieRating"
                @remove:movie="removeMovie"
                @edit:movie="openEditModal"
            />
        </div>
    </section>
</template>

<style scoped>
.movie-list-wrapper {
    @apply flex flex-col gap-2;
}

.movie-list-header {
    @apply flex items-center justify-between w-full max-w-7xl pr-8;
}

.movie-list-header-title {
    @apply text-white text-xl capitalize flex gap-8;
}

.movie-list-header-actions {
    @apply flex items-center justify-between space-x-8;
}

.movie-list {
    @apply flex flex-wrap items-center justify-between max-w-7xl overflow-auto h-[860px];
}

.spacer {
    @apply w-full flex-1 mx-8;
}
</style>
