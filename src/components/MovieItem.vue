<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
    movie: {
        type: Object,
    },
});
defineEmits(['updateRating']);

const { movie } = toRefs(props);

const hoveredRating = ref(0);

function fillRating() {
    for (let i = 1; i <= movie.value.rating; i++) {
        setTimeout(() => {
            hoveredRating.value = i;
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
                <span class="movie-item-rating-text">
                    Rating: ({{ movie.rating }}/5)
                </span>
                <div
                    class="movie-item-stars-wrapper"
                    @mouseleave="hoveredRating = 0"
                >
                    <StarIcon
                        v-for="star in 5"
                        :key="`${movie.id}-star-${star}`"
                        class="movie-item-star-icon"
                        :class="{
                            '--starred':
                                hoveredRating > 0
                                    ? star <= hoveredRating
                                    : star <= movie.rating,
                        }"
                        @mouseover="hoveredRating = star"
                        @click="$emit('updateRating', star)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
