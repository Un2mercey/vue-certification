<script setup>
import { PencilIcon, StarIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    movie: {
        type: Object,
        default: () => ({}),
    },
});
const emit = defineEmits(['update:rating', 'remove:movie', 'edit:movie']);
const movie = computed(() => props.movie);
const rating = computed({
    get() {
        return movie.value.rating;
    },
    set(rating) {
        emit('update:rating', rating);
    },
});

const hoveredRating = ref(0);

function fillRating() {
    for (let i = 1; i <= rating.value + 1; i++) {
        setTimeout(() => {
            if (i === rating.value + 1) hoveredRating.value = 0;
            else hoveredRating.value = i;
        }, i * 200);
    }
}

onMounted(fillRating);
</script>

<template>
    <div class="movie-item">
        <div class="movie-item-image-wrapper">
            <img
                :src="movie.image"
                :alt="`The poster of the \`${movie.name}\` movie`"
                class="movie-item-image"
            />
            <div class="movie-item-top-rating-wrapper">
                <StarIcon
                    id="top-rating"
                    :class="['movie-item-top-rating-icon', rating ? 'text-yellow-500' : 'text-gray-500']"
                />
                <span
                    class="movie-item-top-rating-text"
                    :class="{ '--rated': rating }"
                >
                    {{ rating || '-' }}
                </span>
            </div>
        </div>
        <div class="movie-item-content-wrapper">
            <div class="movie-item-title-wrapper">
                <h3 class="movie-item-title">
                    {{ movie.name }}
                </h3>
                <div class="movie-item-genres-wrapper">
                    <span
                        v-for="genre in movie.genres"
                        :key="`${movie.id}-${genre}`"
                        class="movie-item-genre-tag"
                    >
                        {{ genre }}
                    </span>
                </div>
            </div>
            <div class="movie-item-description-wrapper">
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
                        class="movie-item-star-icon"
                        :class="{
                            '--starred': hoveredRating > 0 ? star <= hoveredRating : star <= rating,
                            '--disabled': star === rating,
                        }"
                        @mouseover="hoveredRating = star"
                        @click="star !== rating && (rating = star)"
                    />
                </div>
                <div class="movie-item-actions-wrapper">
                    <button
                        class="btn-icon icon-m btn-edit"
                        @click="emit('edit:movie')"
                    >
                        <span class="btn-content">
                            <PencilIcon />
                        </span>
                    </button>
                    <button
                        class="btn-icon icon-m btn-remove"
                        @click="emit('remove:movie')"
                    >
                        <span class="btn-content">
                            <TrashIcon />
                        </span>
                    </button>
                </div>
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

.movie-item-top-rating-wrapper {
    @apply absolute top-1 right-1 flex justify-center items-center;
}

.movie-item-top-rating-icon {
    @apply h-16 w-16;
}

.movie-item-top-rating-text {
    @apply absolute font-bold text-xl text-gray-400;
}

.--rated {
    @apply text-yellow-800;
}

.movie-item-image {
    @apply object-cover object-center h-[600px];
}

.movie-item-content-wrapper {
    @apply h-56 p-4 flex flex-col items-start justify-start w-full;
}

.movie-item-title-wrapper {
    @apply h-16 shrink-0 w-full;
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

.movie-item-genres-wrapper {
    @apply flex items-center justify-start space-x-1;
}

.movie-item-genre-tag {
    @apply text-xs bg-indigo-500 text-white py-0.5 px-2 rounded-full;
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

.btn-edit {
    @apply hover:bg-violet-400 active:bg-violet-400;
}

.btn-remove {
    @apply hover:bg-red-400 active:bg-red-400;
}
</style>
