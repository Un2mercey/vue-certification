<script setup>
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    hasError: {
        type: Boolean,
        default: false,
    },
    touched: {
        type: Boolean,
        default: false,
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <fieldset class="form-control">
        <div
            v-if="props.label"
            :class="{ valid: props.touched && !props.hasError, error: props.hasError }"
            class="form-control-label"
        >
            {{ props.label }}
        </div>
        <div class="form-control-content">
            <slot />
        </div>
        <Transition name="slide-fade-bottom">
            <ul
                v-if="props.hasError"
                class="error-messages"
            >
                <li
                    v-for="message in props.errorMessages"
                    :key="message"
                    class="error-message"
                >
                    {{ message }}
                </li>
            </ul>
        </Transition>
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

.form-control-label.valid {
    @apply text-green-400;
}

.form-control-label.error {
    @apply text-red-500;
}
</style>
