<script setup>
import CustomDialog from '@/ui/CustomDialog.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import AddMovieForm from '@/components/AddMovieForm.vue';

const emit = defineEmits(['add:movie', 'edit:movie']);
const isOpened = ref(false);
const formRef = ref(null);
const modalTitle = ref('Add new movie');

const isFormValid = computed(() => formRef.value?.isFormValid);
const validate = computed(() => formRef.value?.validate);

function edit(movie) {
    modalTitle.value = 'Movie editing';
    isOpened.value = true;
    setTimeout(() => formRef.value.setForm(movie));
}

function close() {
    isOpened.value = false;
    modalTitle.value = 'Add new movie';
}
function save(form) {
    if (form.id) {
        emit('edit:movie', form);
    } else {
        emit('add:movie', form);
    }
    close();
}

defineExpose({ edit });
</script>

<template>
    <CustomDialog
        v-model="isOpened"
        :title="modalTitle"
    >
        <template #activator="{ props }">
            <button
                class="add-movie-btn"
                v-bind="props"
            >
                <span class="btn-content">
                    <PlusIcon />
                    add movie
                </span>
            </button>
        </template>
        <template #content>
            <AddMovieForm
                ref="formRef"
                @submit="save"
            />
        </template>
        <template #actions>
            <button
                class="dialog-cancel-btn"
                @click="close"
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
