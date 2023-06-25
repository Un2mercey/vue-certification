<script setup>
defineProps({
    label: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <fieldset class="form-control">
        <div
            v-if="label"
            class="form-control-label"
        >
            {{ label }}
        </div>
        <div class="form-control-content">
            <slot />
        </div>
    </fieldset>
</template>

<style scoped>
.form-control {
    @apply flex flex-col gap-2;
}

.form-control-label {
    @apply text-white text-base capitalize;
}

.form-control-content {
    @apply flex flex-1;
}
</style>
