<script setup>
import CustomLoader from '@/ui/CustomLoader.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <section class="component-wrapper">
        <CustomLoader v-if="loading" />
        <slot />
    </section>
</template>

<style scoped>
.component-wrapper {
    @apply flex items-center justify-center p-4 m-0 h-full;
}
</style>
