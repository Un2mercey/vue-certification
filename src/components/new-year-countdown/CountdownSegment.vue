<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div class="segment">
        <div class="number-wrapper">
            <span class="number">0</span>
        </div>
        <span class="block pt-2 label">{{ label }}</span>
    </div>
</template>
<style scoped>
.segment {
    @apply text-center w-[80px];
}

.number-wrapper {
    @apply relative pt-10 overflow-hidden;
}

.number {
    transform: translateX(-50%);
    font-size: 32px;
    @apply absolute top-0 left-[50%];
}

.label {
    font-size: 16px;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from {
    transform: translateY(-100%) translateX(-50%);
}

.v-leave-to {
    transform: translateY(100%) translateX(-50%);
}

.v-enter-to,
.v-leave-from {
    transform: translateY(0px) translateX(-50%);
}

.v-enter-from,
.v-leave-to {
    /* opacity: 0; */
}
</style>
