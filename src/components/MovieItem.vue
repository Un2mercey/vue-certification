<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import { toRefs } from 'vue';

const props = defineProps(['movie']);
const { id, name, description, image, rating, genres } = toRefs(props.movie);
</script>

<template>
    <div class="movie-item">
        <div class="movie-item-image-wrapper">
            <img
                :src="image"
                :alt="`The poster of the \`${name}\` movie`"
                class="movie-item-image"
            />
        </div>
        <div class="movie-item-content-wrapper">
            <div class="movie-item-title-wrapper">
                <h3 class="movie-item-title">
                    {{ name }}
                </h3>
                <div class="movie-item-genres-wrapper">
                    <span
                        v-for="genre in genres"
                        :key="`${id}-${genre}`"
                        class="movie-item-genre-tag"
                    >
                        {{ genre }}
                    </span>
                </div>
            </div>
            <div class="movie-item-description-wrapper">
                <p class="movie-item-description">
                    {{ description }}
                </p>
            </div>
            <div class="movie-item-rating-wrapper">
                <span class="movie-item-rating-text">
                    Rating: ({{ rating }}/5)
                </span>
                <StarIcon
                    v-for="star in rating"
                    :key="`${id}-star-${star}`"
                    class="movie-item-star-icon"
                />
            </div>
        </div>
    </div>
</template>
