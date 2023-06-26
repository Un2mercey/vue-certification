<script setup>
import { ChartBarIcon } from '@heroicons/vue/24/outline';
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue';
import MovieItem from '@/components/MovieItem.vue';
import MovieModal from '@/components/MovieModal.vue';

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
    if (!movies.value.length) return 0;

    const sum = movies.value.reduce((acc, { rating }) => acc + rating, 0);
    return (sum / movies.value.length).toFixed(1);
});

function updateMovieRating(index, newRating) {
    movies.value[index].rating = newRating;
}

function removeRatings() {
    movies.value.forEach((_, idx) => {
        updateMovieRating(idx, 0);
    });
}

function addMovie(movie) {
    movies.value = [
        ...movies.value,
        {
            ...movie,
            id: movies.value.at(-1).id + 1,
            rating: 0,
        },
    ];
}

function editMovie(form) {
    let movieIdx = movies.value.findIndex(({ id }) => id === form.id);
    movies.value.splice(movieIdx, 1, { ...movies.value[movieIdx], ...form });
}

function openEditModal(index) {
    movieModalRef.value.edit(movies.value[index]);
}

function removeMovie(index) {
    movies.value.splice(index, 1);
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
            <div class="movie-list-header-title">
                total movies: {{ movies.length }}
                <span>/</span>
                average rating: {{ avgRating }}
            </div>
            <div class="spacer" />
            <div class="movie-list-header-actions">
                <button
                    class="remove-ratings-btn"
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
                v-for="(movie, index) in movies"
                :key="movie.id"
                :movie="movie"
                @update:rating="updateMovieRating(index, $event)"
                @remove:movie="removeMovie(index)"
                @edit:movie="openEditModal(index)"
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

.remove-ratings-btn {
    @apply bg-orange-500 self-end justify-self-end;
    filter: drop-shadow(0px 0px 10px rgba(249, 115, 22, 0.25));
}
</style>
