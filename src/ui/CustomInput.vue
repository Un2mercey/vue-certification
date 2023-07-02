<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'input',
    },
    hasError: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    placeholderText: {
        type: String,
        default: '',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    validationFn: {
        type: Function,
        default: null,
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
    autofocus: {
        type: Boolean,
    },
});
const emit = defineEmits(['update:modelValue', 'update:hasError']);
const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        props.validationFn && emit('update:hasError', !props.validationFn(value));
        emit('update:modelValue', value);
    },
});
const inputId = ref(`${props.label || 'input'}-${new Date().getTime()}`);
const isFocused = ref(false);
const isPlaceholderVisible = computed(() => props.placeholderText && !(isFocused.value || modelValue.value.length));
const isValidClassName = computed(() => props.validationFn && !props.hasError && modelValue.value.length);
const inputClassNames = computed(() => ({
    'placeholder-visible': isPlaceholderVisible,
    disabled: props.isDisabled,
}));

const inputRef = ref(null);
const textareaRef = ref(null);

onMounted(() => {
    if (props.autofocus) {
        if (props.type === 'input') {
            inputRef.value.focus();
        } else {
            textareaRef.value.focus();
        }
    }
});
</script>

<template>
    <fieldset
        :class="{ error: hasError }"
        class="input-container-wrapper"
    >
        <div class="input-container">
            <label
                v-if="label"
                :class="{ valid: isValidClassName }"
                :for="inputId"
                class="label"
            >
                {{ label }}
            </label>
            <div
                :class="inputClassNames"
                class="input-wrapper"
            >
                <input
                    v-if="props.type === 'input'"
                    :id="inputId"
                    ref="inputRef"
                    v-model.trim="modelValue"
                    :class="{ valid: isValidClassName }"
                    :disabled="props.isDisabled"
                    class="input"
                    type="text"
                    @blur="isFocused = false"
                    @focus="isFocused = true"
                />
                <textarea
                    v-else
                    :id="inputId"
                    ref="textareaRef"
                    v-model.trim="modelValue"
                    :class="{ valid: isValidClassName }"
                    :disabled="props.isDisabled"
                    class="textarea"
                    type="text"
                    @blur="isFocused = false"
                    @focus="isFocused = true"
                />
                <span
                    v-if="isPlaceholderVisible"
                    class="placeholder"
                >
                    {{ placeholderText }}
                </span>
            </div>
        </div>
        <Transition name="slide-fade-bottom">
            <ul
                v-if="hasError"
                class="error-messages"
            >
                <li
                    v-for="message in errorMessages"
                    :key="message"
                    class="error-message"
                >
                    {{ message }}
                </li>
            </ul>
        </Transition>
    </fieldset>
</template>

<style scoped>
.input-container-wrapper {
    @apply flex flex-col items-start gap-1;
}

.label {
    @apply text-white text-base capitalize;
}

.input-container {
    @apply flex items-start flex-col relative justify-center w-full flex-grow-0 flex-shrink-0 gap-1;
}

.input-wrapper {
    @apply flex w-full items-center relative;
}

.input,
.textarea {
    @apply relative text-base box-border w-full p-3 gap-2.5 rounded-lg flex flex-row items-start text-yellow-500 disabled:text-gray-500;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
    border: 1px solid rgb(156 163 175);
    caret-color: rgb(234 179 8);
    transition: 0.3s;
    background: transparent;
}

.input::selection,
.textarea::selection {
    @apply bg-cyan-900;
}

.placeholder {
    @apply absolute pl-3 text-gray-500 pointer-events-none;
}

input:focus,
textarea:focus-visible {
    border-color: rgb(234 179 8);
    outline: none;
}

.input.valid,
.textarea.valid {
    @apply border-green-400 text-green-400;
}

.label.valid {
    @apply text-green-400;
}

.input-container-wrapper.error .label {
    @apply text-red-500;
}

.input-container-wrapper.error .input {
    @apply border-red-500 caret-red-500 text-red-500;
}
</style>
