<script setup>
import { CheckIcon, StopIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['update:modelValue']);
const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
const checkboxId = computed(() => `checkbox-${props.label}-${new Date().getTime()}`);
</script>

<template>
    <div class="checkbox-wrapper">
        <div class="checkbox-control">
            <div class="checkbox-btn">
                <div class="selection-wrapper">
                    <StopIcon :class="{ checked: modelValue }" />
                    <Transition
                        mode="in-out"
                        name="fade-fast"
                    >
                        <CheckIcon
                            v-show="modelValue"
                            class="icon-check"
                        />
                    </Transition>
                    <input
                        :id="checkboxId"
                        :value="modelValue"
                        class="checkbox-input"
                        type="checkbox"
                        @input="modelValue = !modelValue"
                    />
                </div>
                <label
                    :for="checkboxId"
                    class="label"
                >
                    {{ props.label }}
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checkbox-wrapper {
    @apply grid;
    grid-template-areas: 'prepend control append' 'a messages b';
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    grid-template-rows: auto auto;
    flex: 1 1 auto;
}

.checkbox-control {
    @apply flex;
    grid-area: control;
}

.checkbox-btn {
    @apply inline-flex min-w-0 max-w-full h-7 items-center relative;
    flex: 1 0;
    contain: layout;
    user-select: none;
}

.selection-wrapper {
    @apply inline-flex items-center relative justify-center flex-none h-full;
}

.label {
    @apply w-full h-full ml-2 py-3 pr-2 opacity-100 cursor-pointer text-white
    inline-flex items-center min-w-0 overflow-hidden text-ellipsis
    hover:text-yellow-500 text-base;

    white-space: normal;
    word-break: break-word;
}

svg {
    @apply h-full w-full text-white;
}

.checked {
    @apply text-green-400;
}

.icon-check {
    @apply absolute h-[73%] w-auto left-1 bottom-1 text-green-400;
}

.checkbox-input {
    @apply absolute w-full h-full left-0 top-0 cursor-pointer opacity-0;
}
</style>
