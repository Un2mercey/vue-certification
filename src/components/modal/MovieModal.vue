<script setup>
import CustomDialog from '@/ui/CustomDialog.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { computed, defineAsyncComponent, ref } from 'vue';

defineProps({
    hideActivator: {
        type: Boolean,
        default: false,
    },
});

/**
 * @description Async Component
 */
const MovieForm = defineAsyncComponent(() => import('../movie/MovieForm.vue'));
const emit = defineEmits(['add:movie', 'edit:movie']);
const modalTitle = ref('Add new movie');

/**
 * @type {Ref<HTMLFormElement | null>}
 */
const formRef = ref(null);

/**
 * @type {Ref<Movie | undefined>}
 */
const prefillForm = ref();

const isFormValid = computed(() => Boolean(formRef.value?.isFormValid));

/**
 * @type {ComputedRef<Function | undefined>}
 */
const validate = computed(() => formRef.value?.validate);

/**
 * @type {Ref<HTMLDialogElement | null>}
 */
const dialogRef = ref(null);

/**
 * @type {ComputedRef<Function | undefined>}
 */
const openDialog = computed(() => dialogRef.value?.open);

/**
 * @type {ComputedRef<Function | undefined>}
 */
const closeDialog = computed(() => dialogRef.value?.close);

function showModal(title) {
    modalTitle.value = title;
    openDialog.value();
}

function edit(movie) {
    showModal('Movie editing');
    prefillForm.value = movie;
}

function save(form) {
    if (form.id) {
        emit('edit:movie', form);
    } else {
        emit('add:movie', form);
    }
    closeDialog.value();
}

defineExpose({ edit });
</script>

<template>
    <CustomDialog
        ref="dialogRef"
        :title="modalTitle"
    >
        <template
            v-if="!hideActivator"
            #activator
        >
            <button
                class="btn-primary"
                @click="showModal('Add new movie')"
            >
                <span class="btn-content">
                    <PlusIcon />
                    add movie
                </span>
            </button>
        </template>
        <template #content>
            <MovieForm
                ref="formRef"
                v-model:prefill="prefillForm"
                @submit="save"
            />
        </template>
        <template #actions>
            <button
                class="dialog-cancel-btn"
                @click="closeDialog"
            >
                <span class="btn-content">cancel</span>
            </button>
            <button
                :disabled="!isFormValid"
                class="dialog-confirm-btn"
                @click="validate"
            >
                <span class="btn-content">save</span>
            </button>
        </template>
    </CustomDialog>
</template>

<style scoped>
.dialog-cancel-btn {
    @apply bg-red-500 hover:bg-red-300 active:bg-red-300;
    filter: drop-shadow(0px 0px 10px rgba(239, 68, 68, 0.25));
}

.dialog-confirm-btn {
    @apply bg-green-500 hover:bg-green-300 active:bg-green-300;
    filter: drop-shadow(0px 0px 10px rgba(34, 197, 94, 0.25));
}
</style>
