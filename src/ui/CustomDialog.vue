<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
const isShown = ref(false);
const title = computed(() => props.title);

function open() {
    isShown.value = true;
}

function close() {
    isShown.value = false;
}

defineExpose({ open, close });
</script>

<template>
    <div class="dialog-activator">
        <slot name="activator" />
    </div>
    <Teleport to="#overlay-container">
        <Transition name="slide-fade-bottom">
            <div
                v-if="isShown"
                id="dialog"
                class="overlay"
                aria-role="dialog"
                aria-modal="true"
            >
                <div class="overlay-scrim" />
                <div class="overlay-content">
                    <div class="dialog">
                        <div class="dialog-header">
                            <h3
                                v-if="title"
                                class="dialog-header-title"
                            >
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
                        <div
                            v-if="$slots.actions"
                            class="dialog-actions"
                        >
                            <slot name="actions" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
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
