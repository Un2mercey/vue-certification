<script setup>
import CustomInput from '@/ui/CustomInput.vue';
import CustomSelect from '@/ui/CustomSelect.vue';
import FormControl from '@/ui/FormControl.vue';
import { reactive } from 'vue';

const form = reactive({
    name: '',
    description: '',
    image: '',
    genre: [],
});
const errors = reactive({
    name: {
        hasError: false,
        errorMessages: ['The field is required'],
        validatorFn: (value) => !!value.length,
    },
    image: {
        hasError: false,
        errorMessages: ['The given URI is invalid'],
        validatorFn: validateImage,
    },
});
const genres = Object.freeze(['Drama', 'Crime', 'Action', 'Comedy', 'Biography', 'Thriller', 'Adventure']);
function validateImage(src) {
    if (!src.length) return true;
    const img = new Image();
    img.src = src;
    new Promise((resolve) => {
        img.onload = () => {
            errors.image.hasError = false;
            return resolve(true);
        };
        img.onerror = () => {
            errors.image.hasError = true;
            return resolve(false);
        };
    });
}

function validate() {
    console.log('validate');
}
</script>

<template>
    <form @submit.prevent="validate">
        <CustomInput
            key="form-name"
            v-model="form.name"
            v-model:has-error="errors.name.hasError"
            label="name"
            :validation-fn="errors.name.validatorFn"
            :error-messages="errors.name.errorMessages"
        />
        <CustomInput
            key="form-description"
            v-model="form.description"
            type="textarea"
            label="description"
        />
        <CustomInput
            key="form-image"
            v-model="form.image"
            v-model:has-error="errors.image.hasError"
            label="image"
            :validation-fn="errors.image.validatorFn"
            :error-messages="errors.image.errorMessages"
        />
        <FormControl
            key="genres"
            label="genres"
        >
            <CustomSelect
                v-model="form.genre"
                :items="genres"
            />
        </FormControl>
        <div>
            <input
                id="checkbox"
                type="checkbox"
            />
            <label for="checkbox">In theaters</label>
        </div>
    </form>
</template>

<style scoped>
form {
    @apply flex flex-col gap-6;
}
</style>
