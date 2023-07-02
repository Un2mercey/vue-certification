<script setup>
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_NAMES } from '@/utils';
import MovieGenres from '@/components/MovieGenres.vue';
import MovieStarRating from '@/components/MovieStarRating.vue';
import ComponentLayout from '@/components/layout/ComponentLayout.vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const route = useRoute();
const movieId = Number(route.params.id);

/**
 * @type {ComputedRef<Movie | undefined>}
 */
const movie = computed(() => props.modelValue.find(({ id }) => id === movieId));

/**
 * @type {ComputedRef<number>}
 */
const lastMovieId = computed(() => props.modelValue.at(-1).id);

/**
 * @type {ComputedRef<number>}
 */
const firstMovieId = computed(() => props.modelValue[0].id);
</script>

<template>
    <ComponentLayout>
        <div class="btn-home-wrapper">
            <RouterLink :to="{ name: ROUTE_NAMES.HOME }">
                <button class="btn-primary btn-icon icon-m">
                    <span class="btn-content">
                        <HomeIcon />
                    </span>
                </button>
            </RouterLink>
        </div>
        <div
            class="btn-back-wrapper"
            :class="{ '--disabled': movieId === firstMovieId }"
        >
            <RouterLink :to="{ name: ROUTE_NAMES.MOVIE, params: { id: movieId - 1 } }">
                <button class="btn-icon icon-m btn-link">
                    <span class="btn-content">
                        <ArrowLeftIcon />
                    </span>
                </button>
            </RouterLink>
        </div>
        <div class="container flex items-center max-w-6xl gap-4 p-10 m-auto dark:text-white">
            <figure class="relative">
                <img
                    :alt="'The poster of the \'${movie.name}\' movie'"
                    :src="movie.image"
                    class="movie-image"
                />
                <MovieStarRating :rating="movie.rating" />
            </figure>
            <div>
                <h1 class="mb-4 text-5xl">{{ movie.name }}</h1>
                <MovieGenres
                    :genres="movie.genres"
                    class="mb-3"
                />
                <p class="text-xl">{{ movie.description }}</p>
            </div>
        </div>
        <div
            class="btn-forward-wrapper"
            :class="{ '--disabled': movieId === lastMovieId }"
        >
            <RouterLink :to="{ name: ROUTE_NAMES.MOVIE, params: { id: movieId + 1 } }">
                <button class="btn-icon icon-m btn-link">
                    <span class="btn-content">
                        <ArrowRightIcon />
                    </span>
                </button>
            </RouterLink>
        </div>
    </ComponentLayout>
</template>

<style scoped>
.btn-home-wrapper {
    @apply absolute top-4;
}

.btn-back-wrapper,
.btn-forward-wrapper {
    @apply relative;
}

.--disabled {
    @apply pointer-events-none;
}

.movie-image {
    @apply object-cover object-center h-auto max-w-[40vw] max-h-[60vh];
}
</style>
