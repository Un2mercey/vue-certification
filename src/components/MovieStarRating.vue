<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';

defineProps({
    rating: {
        type: Number,
        default: null,
    },
});
</script>

<template>
    <div class="movie-item-top-rating-wrapper">
        <StarIcon
            id="top-rating"
            :class="['movie-item-top-rating-icon', rating ? 'text-yellow-500' : 'text-gray-500']"
        />
        <span
            :class="{ '--rated': rating }"
            class="movie-item-top-rating-text"
        >
            {{ rating || '-' }}
        </span>
    </div>
</template>

<style scoped>
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
</style>
