<script setup>
import CustomDialog from '@/ui/CustomDialog.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import AddMovieForm from '@/components/AddMovieForm.vue';

const emit = defineEmits(['add:movie']);
const isOpened = ref(false);

function close() {
    isOpened.value = false;
}
function save(form) {
    emit('add:movie', form);
    close();
}
</script>

<template>
    <CustomDialog
        v-model="isOpened"
        title="Add new movie"
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
                :save-fn="save"
                :close-fn="close"
            />
        </template>
    </CustomDialog>
</template>

<style scoped>
.add-movie-btn {
    @apply bg-cyan-500 self-end justify-self-end;
    filter: drop-shadow(0px 0px 10px rgba(6, 182, 212, 0.25));
}
</style>
