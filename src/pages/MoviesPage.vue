<script setup>
import { computed, ref } from 'vue';
import ComponentLayout from '@/components/layout/ComponentLayout.vue';
import MovieList from '@/components/movie/MovieList.vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

/**
 * @type {WritableComputedRef<Movie[]>}
 */
const movies = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const isLoading = ref(false);
</script>

<template>
    <ComponentLayout :loading="isLoading">
        <MovieList
            v-model:is-loading="isLoading"
            v-model:movies="movies"
        />
    </ComponentLayout>
</template>
