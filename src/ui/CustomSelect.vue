<script setup>
import { useResizeObserver } from '@/composables/resizeObserver';
import { computed, onUpdated, ref, watch } from 'vue';

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
        default: '0',
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
const activator = ref(null);
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

const activatorRects = computed(() => {
    if (activator.value) return activator.value.getBoundingClientRect();

    return {
        left: 0,
        right: 0,
        top: 0,
        height: 0,
        width: 0,
    };
});

const topPosition = ref(activatorRects.value.top + activatorRects.value.height + Number(props.offsetY) + 'px');
const containerWidth = ref(activatorRects.value.width + 'px');
const leftPosition = ref(activatorRects.value.left + 'px');
const rightPosition = computed(() => activatorRects.value.right + 'px');

watch(
    () => availableItems.value.length,
    (newValue) => {
        if (!newValue) {
            isOpened.value = false;
        }
    },
);

const { observeResizeElement } = useResizeObserver();
onUpdated(() => {
    observeResizeElement(activator.value, (e) => {
        containerWidth.value = e.target.offsetWidth + 'px';
        leftPosition.value = e.target.offsetLeft + 'px';
        topPosition.value = e.target.offsetTop + e.target.offsetHeight + Number(props.offsetY) + 'px';
    });
});
</script>

<template>
    <div
        ref="activator"
        :class="{ active: isOpened, error: hasError, valid: touched && !hasError }"
        class="activator"
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
        <KeepAlive>
            <div
                v-if="isOpened && availableItems.length"
                id="select"
                class="overlay"
            >
                <div
                    class="overlay-content"
                    @click="isOpened = false"
                >
                    <div class="select-wrapper scrollbar-thin">
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
        </KeepAlive>
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
    @apply absolute inline-flex flex-col items-start p-4 gap-2 rounded-xl
    max-h-40 overflow-y-auto text-white;

    background: rgba(16, 24, 39);
    top: v-bind(topPosition);
    left: v-bind(leftPosition);
    right: v-bind(rightPosition);
    width: v-bind(containerWidth);
    box-shadow: 0 8px 24px 0 rgba(255, 255, 255, 0.12), 0 4px 4px 0 rgba(255, 255, 255, 0.04);
}

.select-option {
    @apply flex items-center self-stretch gap-2 py-2 px-4 cursor-pointer
    hover:bg-indigo-500 duration-150 rounded-xl;
}

.selected-item {
    @apply flex px-2 py-0.5 items-center rounded-full gap-2 text-white text-sm
    bg-indigo-500 hover:bg-indigo-400;
}
</style>
