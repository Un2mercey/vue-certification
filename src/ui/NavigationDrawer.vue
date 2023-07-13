<script setup>
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, FilmIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ROUTE_NAMES } from '@/utils';

const rail = ref(false);
const width = computed(() => {
    if (rail.value) return '216px';
    else return '72px';
});

const railIcon = computed(() => (rail.value && ChevronDoubleLeftIcon) || ChevronDoubleRightIcon);
const links = ref([
    {
        icon: FilmIcon,
        text: 'Movie App',
        routeName: ROUTE_NAMES.HOME,
        path: { to: ROUTE_NAMES.HOME },
    },
]);

const route = useRoute();
function toggleRail() {
    rail.value = !rail.value;
}
defineExpose({ width });
</script>

<template>
    <div
        class="navigation-drawer"
        :class="{ opened: rail }"
    >
        <div
            class="nav-header"
            @click="toggleRail"
        >
            <Component :is="railIcon" />
        </div>
        <ul class="nav-list">
            <li
                v-for="{ text, icon, routeName } in links"
                :key="text"
                class="nav-list-item"
                :class="{ active: route.name === routeName }"
            >
                <RouterLink :to="{ name: routeName }">
                    <Component :is="icon" />
                    <template v-if="rail">
                        {{ text }}
                    </template>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.navigation-drawer {
    @apply bg-gray-900 flex flex-col h-full max-w-full gap-8 text-gray-400;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    position: fixed;
    width: v-bind(width);
    overflow-scrolling: touch;
    pointer-events: auto;
    transition-duration: 0.2s;
    transition-property: transform, visibility, width, height, left, right, top, bottom;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}

.navigation-drawer.opened {
    @apply bg-gray-800;
}

.navigation-drawer.opened .nav-header {
    @apply justify-end;
}

.navigation-drawer.opened .nav-list-item,
.navigation-drawer.opened .nav-list-item a {
    @apply justify-start;
}

.nav-header {
    @apply px-4 pt-4 flex items-center justify-center cursor-pointer transition-colors hover:text-green-400;
}

.nav-list-item svg {
    @apply w-6 h-6;
}

.nav-header svg {
    @apply w-4 h-4;
}

.nav-list {
    @apply px-4 pb-4 flex flex-col gap-2;
}

.nav-list-item {
    @apply flex justify-center items-center;
}

.nav-list-item a {
    @apply flex justify-center items-center gap-4 w-full hover:text-green-400 transition-colors relative;
}

.nav-list-item.active a {
    @apply text-green-400 pointer-events-none;
}

.nav-list-item.active a:before {
    @apply bg-green-400;
    content: '';
    display: block;
    height: 100%;
    width: 4px;
    border-radius: 0 2px 2px 0;
    position: absolute;
    top: 0;
    left: -16px;
}
</style>
