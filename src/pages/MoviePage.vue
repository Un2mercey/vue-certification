<script setup>
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_NAMES } from '@/utils';
import MovieGenres from '@/components/MovieGenres.vue';
import MovieModal from '@/components/MovieModal.vue';
import MovieStarRating from '@/components/MovieStarRating.vue';
import ComponentLayout from '@/components/layout/ComponentLayout.vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:isLoading', 'update:movies']);

const route = useRoute();
const movieId = Number(route.params.id);

/**
 * @type {Ref<HTMLDialogElement | null>}
 */
const movieModalRef = ref(null);

/**
 * @description Opens the modal, changes the title
 */
function openEditModal() {
    movieModalRef.value.edit(movie.value);
}

/**
 * @type {WritableComputedRef<Movie[]>}
 */
const movies = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:movies', value);
    },
});

/**
 * @type {ComputedRef<Movie>}
 */
let movie = computed({
    get() {
        return movies.value.find(({ id }) => id === movieId);
    },
    set(value) {
        movies.value.splice(curMovieIdx.value, 1, value);
    },
});

/**
 * @type {ComputedRef<number>}
 */
const curMovieIdx = computed(() => movies.value.findIndex(({ id }) => id === movieId));

/**
 * @type {ComputedRef<number | undefined>}
 */
const prevMovieId = computed(() => {
    if (curMovieIdx.value === 0) return;

    return movies.value[curMovieIdx.value - 1].id;
});

/**
 * @type {ComputedRef<number | undefined>}
 */
const nextMovieId = computed(() => {
    if (curMovieIdx.value === props.modelValue.length - 1) return;

    return movies.value[curMovieIdx.value + 1].id;
});

/**
 * @description Edits the movie of {@link movies} list
 *
 * @param {Movie} form
 */
function editMovie(form) {
    movie.value = form;
}
</script>

<template>
    <ComponentLayout>
        <div class="top-wrapper">
            <div class="btn-home-wrapper">
                <RouterLink :to="{ name: ROUTE_NAMES.HOME }">
                    <button class="btn-primary btn-icon icon-m">
                        <span class="btn-content">
                            <HomeIcon />
                        </span>
                    </button>
                </RouterLink>
            </div>
            <button
                class="btn-primary btn-icon icon-m"
                @click="openEditModal"
            >
                <span class="btn-content">
                    <PencilIcon />
                </span>
            </button>
        </div>
        <div
            class="btn-back-wrapper"
            :class="{ '--disabled': !prevMovieId }"
        >
            <RouterLink :to="{ name: ROUTE_NAMES.MOVIE, params: { id: prevMovieId } }">
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
            :class="{ '--disabled': !nextMovieId }"
        >
            <RouterLink :to="{ name: ROUTE_NAMES.MOVIE, params: { id: nextMovieId } }">
                <button class="btn-icon icon-m btn-link">
                    <span class="btn-content">
                        <ArrowRightIcon />
                    </span>
                </button>
            </RouterLink>
        </div>
        <MovieModal
            ref="movieModalRef"
            hide-activator
            @edit:movie="editMovie"
        />
    </ComponentLayout>
</template>

<style scoped>
.top-wrapper {
    @apply absolute flex top-4 gap-4 items-center justify-center flex-1;
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
