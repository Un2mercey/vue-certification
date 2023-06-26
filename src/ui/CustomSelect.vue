<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    offsetY: {
        type: [String, Number],
        default: '4',
    },
    offsetX: {
        type: [String, Number],
        default: '0',
    },
    touched: {
        type: Boolean,
        default: false,
    },
    hasError: {
        type: Boolean,
        default: false,
    },
    validationFn: {
        type: Function,
        default: null,
    },
});

const emit = defineEmits(['update:modelValue', 'update:hasError', 'update:touched']);
const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        props.validationFn && emit('update:hasError', !props.validationFn(value));
        emit('update:modelValue', value);
    },
});
const touched = computed({
    get() {
        return props.touched;
    },
    set(value) {
        emit('update:touched', value);
    },
});

const isOpened = ref(false);
const activator = ref();
const availableItems = computed(() => {
    return props.items.filter((item) => !modelValue.value.includes(item));
});

function selectItem(item) {
    touched.value = true;
    modelValue.value = [...modelValue.value, item];
}

function removeItem(item) {
    modelValue.value = modelValue.value.filter((selectedItem) => selectedItem !== item);
}

const topPosition = computed(() => {
    if (!activator.value) return 0;
    const { y, height } = activator.value.getBoundingClientRect();
    return `${y + height + Number(props.offsetY)}px`;
});

const leftPosition = computed(() => {
    if (!activator.value) return 0;
    return `${activator.value.getBoundingClientRect().x + Number(props.offsetX)}px`;
});

const containerWidth = computed(() => {
    if (!activator.value) return 0;
    return `${activator.value.getBoundingClientRect().width}px`;
});

const stopWatch = watch(
    () => availableItems.value.length,
    (newValue) => {
        if (!newValue) {
            isOpened.value = false;
        }
    },
);
onBeforeUnmount(stopWatch);
</script>

<template>
    <div
        ref="activator"
        class="activator"
        :class="{ active: isOpened, error: hasError, valid: touched && !hasError }"
        @click="availableItems.length && (isOpened = true)"
    >
        <TransitionGroup name="list">
            <div
                v-for="item in modelValue"
                :key="`selected-item-${item}`"
                class="selected-item"
                @click.stop="removeItem(item)"
            >
                {{ item }}
            </div>
        </TransitionGroup>
    </div>
    <Teleport to="#overlay-container">
        <div
            v-if="isOpened && availableItems.length"
            id="select"
            class="overlay"
            aria-role="menu"
        >
            <div
                class="overlay-content"
                @click="isOpened = false"
            >
                <div class="select-wrapper">
                    <TransitionGroup name="list">
                        <div
                            v-for="item in availableItems"
                            :key="`select-item-${item}`"
                            class="select-option"
                            @click.stop="selectItem(item)"
                        >
                            {{ item }}
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.activator {
    @apply relative text-base box-border w-full p-2 gap-2.5 rounded-lg flex
        flex-row items-center flex-wrap hover:border-yellow-500 cursor-pointer
        min-h-[50px];

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
    border: 1px solid rgb(156 163 175);
    caret-color: rgb(234 179 8);
    transition: 0.3s;
    background: transparent;
}

.activator.active {
    @apply border-yellow-500;
}

.activator.valid {
    @apply border-green-400 text-green-400;
}

.activator.error {
    @apply border-red-500 caret-red-500 text-red-500;
}

.overlay {
    @apply z-[2401];
    backdrop-filter: unset;
}

.overlay-content {
    @apply block bg-transparent h-screen w-screen p-0 m-0;
}

.select-wrapper {
    @apply absolute flex flex-col px-4 py-2 gap-2 rounded-xl;
    background: rgba(234, 179, 8, 0.95);
    top: v-bind(topPosition);
    left: v-bind(leftPosition);
    width: v-bind(containerWidth);
}

.select-option {
    @apply cursor-pointer hover:text-gray-600;
}

.selected-item {
    @apply flex px-2 py-0.5 items-center rounded-full gap-2 text-white text-sm
        bg-indigo-500 hover:bg-indigo-400;
}
</style>
