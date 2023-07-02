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
        <Transition>
            <div
                v-if="isShown"
                id="dialog"
                aria-modal="true"
                class="overlay"
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
.v-enter-active,
.v-leave-active,
.v-enter-active .dialog,
.v-leave-active .dialog {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-from .dialog,
.v-leave-to .dialog {
    transform: translateY(-50px);
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
