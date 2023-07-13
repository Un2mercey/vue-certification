<script setup>
import { EyeIcon, PencilIcon, StarIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';
import { ROUTE_NAMES } from '@/utils';
import MovieGenres from '@/components/movie/MovieGenres.vue';
import MovieStarRating from '@/components/movie/MovieStarRating.vue';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['update:rating', 'remove:movie', 'edit:movie']);

/**
 * @type {ComputedRef<Movie>}
 */
const movie = computed(() => props.movie);

/**
 * @type {WritableComputedRef<number>}
 */
const rating = computed({
    get() {
        return movie.value.rating;
    },
    set(rating) {
        emit('update:rating', movie.value.id, rating);
    },
});

const hoveredRating = ref(0);

/**
 * @description Timing function to fill the stars
 */
function fillRating() {
    for (let i = 1; i <= rating.value + 1; i++) {
        setTimeout(() => {
            if (i === rating.value + 1) hoveredRating.value = 0;
            else hoveredRating.value = i;
        }, i * 200);
    }
}

const isHovered = ref(false);
onMounted(fillRating);
</script>

<template>
    <div
        class="movie-item"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div class="movie-item-image-wrapper">
            <img
                :alt="'The poster of the \'${movie.name}\' movie'"
                :src="movie.image"
                class="movie-item-image"
            />
            <MovieStarRating :rating="rating" />
        </div>
        <div class="movie-item-content-wrapper">
            <div class="movie-item-title-wrapper">
                <h3 class="movie-item-title">
                    {{ movie.name }}
                </h3>
                <MovieGenres :genres="movie.genres" />
            </div>
            <div class="movie-item-description-wrapper scrollbar-thin --light">
                <p class="movie-item-description">
                    {{ movie.description }}
                </p>
            </div>
            <div class="movie-item-rating-wrapper">
                <span class="movie-item-rating-text"> Rating: ({{ rating }}/5) </span>
                <div
                    class="movie-item-stars-wrapper"
                    @mouseleave="hoveredRating = 0"
                >
                    <StarIcon
                        v-for="star in 5"
                        :key="`${movie.id}-star-${star}`"
                        :class="{
                            '--starred': hoveredRating > 0 ? star <= hoveredRating : star <= rating,
                            '--disabled': star === rating,
                        }"
                        class="movie-item-star-icon"
                        @click="star !== rating && (rating = star)"
                        @mouseover="hoveredRating = star"
                    />
                </div>
                <Transition name="fade-fast">
                    <div
                        v-show="isHovered"
                        class="movie-item-actions-wrapper"
                    >
                        <button
                            class="btn-icon icon-m btn-edit"
                            @click="emit('edit:movie', movie.id)"
                        >
                            <span class="btn-content">
                                <PencilIcon />
                            </span>
                        </button>
                        <button
                            class="btn-icon icon-m btn-remove"
                            @click="emit('remove:movie', movie.id)"
                        >
                            <span class="btn-content">
                                <TrashIcon />
                            </span>
                        </button>
                        <RouterLink :to="{ name: ROUTE_NAMES.MOVIE, params: { id: movie.id } }">
                            <button class="btn-icon icon-m btn-link">
                                <span class="btn-content">
                                    <EyeIcon />
                                </span>
                            </button>
                        </RouterLink>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-item {
    @apply w-96 shrink-0 h-auto bg-white rounded-md flex flex-col items-center
    justify-start overflow-hidden shadow-2xl mr-8 mt-8;
}

.movie-item-image-wrapper {
    @apply h-[520px] overflow-hidden w-full relative;
}

.movie-item-image {
    @apply object-cover object-center h-[600px];
}

.movie-item-content-wrapper {
    @apply h-56 p-4 flex flex-col items-start justify-start w-full;
}

.movie-item-title-wrapper {
    @apply h-16 shrink-0 w-full flex-1;
}

.movie-item-title {
    @apply text-2xl;
}

.movie-item-description-wrapper {
    @apply h-24 overflow-auto flex-1;
}

.movie-item-description {
    @apply text-sm;
}

.movie-item-rating-wrapper {
    @apply w-full flex items-center justify-start h-8 shrink-0;
}

.movie-item-rating-text {
    @apply text-xs mr-2 leading-7;
}

.movie-item-stars-wrapper {
    @apply flex;
}

.movie-item-star-icon {
    @apply h-5 w-5 text-gray-500 cursor-pointer;
}

.--starred {
    @apply text-yellow-500;
}

.--disabled {
    @apply cursor-not-allowed;
}

.movie-item-actions-wrapper {
    @apply flex gap-3 justify-center items-center self-stretch ml-auto;
}
</style>
