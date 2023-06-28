<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
const isShown = ref(false);
const title = computed(() => props.title);
const DialogBody = defineAsyncComponent(() => import('./DialogBody.vue'));

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
            <DialogBody
                v-if="isShown"
                :title="title"
                @close="close"
            >
                <template #content>
                    <slot name="content" />
                </template>
                <template #actions>
                    <slot name="actions" />
                </template>
            </DialogBody>
        </Transition>
    </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active,
.v-enter-active :deep(.dialog),
.v-leave-active :deep(.dialog) {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-from :deep(.dialog),
.v-leave-to :deep(.dialog) {
    transform: translateY(-50px);
}
</style>
