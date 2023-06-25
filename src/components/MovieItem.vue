<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['update:rating']);
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
    for (let i = 1; i <= rating.value; i++) {
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
            <div class="movie-item-top-rating-wrapper">
                <StarIcon
                    id="top-rating"
                    :class="[
                        'movie-item-top-rating-icon',
                        rating ? 'text-yellow-500' : 'text-gray-500',
                    ]"
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
                <span class="movie-item-rating-text">
                    Rating: ({{ rating }}/5)
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
                                    : star <= rating,
                            '--disabled': star === rating,
                        }"
                        @mouseover="hoveredRating = star"
                        @click="star !== rating && (rating = star)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
