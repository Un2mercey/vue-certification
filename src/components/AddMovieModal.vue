<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import CustomDialog from '@/components/CustomDialog.vue';

const isOpened = ref(false);

function cancel() {
    isOpened.value = false;
}
function save() {
    isOpened.value = false;
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
            <div>C1</div>
            <div>C2</div>
            <div>C3</div>
            <div>C4</div>
            <div>C5</div>
        </template>
        <template #actions>
            <button @click="cancel">Cancel</button>
            <button @click="save">Save</button>
        </template>
    </CustomDialog>
</template>
