<script setup>
import CustomCheckbox from '@/ui/CustomCheckbox.vue';
import CustomInput from '@/ui/CustomInput.vue';
import CustomSelect from '@/ui/CustomSelect.vue';
import FormControl from '@/ui/FormControl.vue';
import { computed, onMounted, reactive } from 'vue';

const props = defineProps({
    prefill: {
        type: Object,
        default: undefined,
    },
});
const emit = defineEmits(['update:prefill', 'submit']);
const prefill = computed({
    get() {
        return props.prefill;
    },
    set(value) {
        emit('update:prefill', value);
    },
});

const emptyForm = Object.freeze({
    id: 0,
    name: '',
    description: '',
    image: '',
    genres: [],
    inTheaters: false,
});
const form = reactive({ ...emptyForm });
const errors = reactive({
    name: {
        hasError: false,
        touched: false,
        errorMessages: ['The field is required'],
        validatorFn: (value) => !!value.length,
    },
    image: {
        hasError: false,
        touched: false,
        errorMessages: ['The given URI is invalid'],
        validatorFn: validateImage,
    },
    genres: {
        hasError: false,
        touched: false,
        errorMessages: ['The field is required'],
        validatorFn: (value) => !!value.length,
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

const isFormValid = computed(() => {
    return (
        Object.keys(errors)
            .map((key) => {
                if (key === 'image') return !errors[key].hasError;
                return !errors[key].hasError && errors[key].validatorFn(form[key]);
            })
            .filter(Boolean).length === Object.keys(errors).length
    );
});

function validate() {
    if (isFormValid.value) {
        emit('submit', form);
        return;
    }

    Object.keys(errors).forEach((key) => {
        if (!errors[key].validatorFn(form[key])) {
            errors[key].hasError = true;
        }
    });
}

function setForm(newForm = emptyForm) {
    Object.keys(newForm).forEach((key) => {
        form[key] = newForm[key];
    });

    Object.keys(errors).forEach((key) => (errors[key].touched = !!newForm.id));
}

defineExpose({ isFormValid, validate });
onMounted(() => {
    setForm(prefill.value);
    prefill.value = undefined;
});
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
            autofocus
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
            placeholder-text="Give me a link"
            :validation-fn="errors.image.validatorFn"
            :error-messages="errors.image.errorMessages"
        />
        <FormControl
            label="genres"
            :has-error="errors.genres.hasError"
            :touched="errors.genres.touched"
            :error-messages="errors.genres.errorMessages"
        >
            <CustomSelect
                v-model="form.genres"
                v-model:has-error="errors.genres.hasError"
                v-model:touched="errors.genres.touched"
                :items="genres"
                :validation-fn="errors.genres.validatorFn"
            />
        </FormControl>
        <CustomCheckbox
            v-model="form.inTheaters"
            label="In theaters"
        />
        <button
            v-show="false"
            type="submit"
        />
    </form>
</template>

<style scoped>
form {
    @apply flex flex-col gap-6;
}
</style>
