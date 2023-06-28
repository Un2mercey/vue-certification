<script setup>
import CustomDialog from '@/ui/CustomDialog.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import MovieForm from './MovieForm.vue';

const emit = defineEmits(['add:movie', 'edit:movie']);
const modalTitle = ref('Add new movie');

const formRef = ref(null);
const isFormValid = computed(() => formRef.value?.isFormValid);
const validate = computed(() => formRef.value?.validate);

const dialogRef = ref(null);
const openDialog = computed(() => dialogRef.value?.open);
const closeDialog = computed(() => dialogRef.value?.close);

function showModal(title) {
    modalTitle.value = title;
    openDialog.value();
}

function edit(movie) {
    showModal('Movie editing');
    setTimeout(() => formRef.value.setForm(movie));
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
        <template #activator>
            <button
                class="add-movie-btn"
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
                class="dialog-confirm-btn"
                :disabled="!isFormValid"
                @click="validate"
            >
                <span class="btn-content">save</span>
            </button>
        </template>
    </CustomDialog>
</template>

<style scoped>
.add-movie-btn {
    @apply bg-cyan-500 self-end justify-self-end;
    filter: drop-shadow(0px 0px 10px rgba(6, 182, 212, 0.25));
}

.dialog-cancel-btn {
    @apply bg-red-500 hover:bg-red-300 active:bg-red-300;
    filter: drop-shadow(0px 0px 10px rgba(239, 68, 68, 0.25));
}

.dialog-confirm-btn {
    @apply bg-green-500 hover:bg-green-300 active:bg-green-300;
    filter: drop-shadow(0px 0px 10px rgba(34, 197, 94, 0.25));
}
</style>
