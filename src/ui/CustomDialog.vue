<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { toRefs } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['update:modelValue']);
const { modelValue, title } = toRefs(props);

function open() {
    emit('update:modelValue', true);
}
function close() {
    emit('update:modelValue', false);
}
</script>

<template>
    <div class="dialog-activator">
        <slot
            name="activator"
            :props="{
                onClick: open,
            }"
        />
    </div>
    <Teleport to="#overlay-container">
        <div
            v-if="modelValue"
            id="dialog"
            class="overlay"
            aria-role="dialog"
            aria-modal="true"
        >
            <div class="overlay-scrim" />
            <div class="overlay-content">
                <div class="dialog">
                    <div class="dialog-header">
                        <h3 class="dialog-header-title">
                            {{ title }}
                        </h3>
                        <button
                            class="dialog-close-btn"
                            @click="close"
                        >
                            <span class="btn-content">
                                <XMarkIcon />
                            </span>
                        </button>
                    </div>
                    <div class="dialog-content">
                        <slot name="content" />
                    </div>
                    <div class="dialog-actions">
                        <slot
                            name="actions"
                            :props="{ onClick: close }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.dialog-activator {
}

.dialog {
    @apply flex flex-col z-0 w-[36vw] min-h-[45vh] gap-8;
}

.dialog-header {
    @apply flex justify-between;
}

.dialog-header-title {
    @apply text-3xl text-yellow-600 overflow-hidden whitespace-nowrap;
}

.dialog-content {
    @apply flex flex-col gap-4;
}

.dialog-actions {
    @apply flex items-center justify-between mt-auto;
}

.dialog-close-btn {
    @apply p-0;
}

.dialog-close-btn span.btn-content {
    @apply text-yellow-500 hover:text-red-500 active:text-red-500;
}
</style>
