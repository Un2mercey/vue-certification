<script setup>
defineProps({
    genres: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <div class="genres-wrapper">
        <span
            v-for="(genre, index) in genres"
            :key="`${index}-${genre}`"
            class="genre-tag"
        >
            {{ genre }}
        </span>
    </div>
</template>

<style scoped>
.genres-wrapper {
    @apply flex flex-wrap items-center justify-start gap-1;
}

.genre-tag {
    @apply text-xs bg-indigo-500 text-white py-0.5 px-2 rounded-full;
}
</style>
