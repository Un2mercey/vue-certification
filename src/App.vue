<script setup>
import { items } from '@/mocks/movies.json';
import NavigationDrawer from '@/ui/NavigationDrawer.vue';
import { computed, ref } from 'vue';
import MainLayout from '@/components/layout/MainLayout.vue';

/**
 * Movie type declaration
 *
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {number} rating
 * @property {string[]} genres
 * @property {boolean} inTheaters
 */

/**
 * Usage of {@link Movie}
 *
 * @type {Movie[]}
 *
 * @joke Better to call Pinia
 */
const movies = ref(items);

const navRef = ref(null);
const paddingLeft = computed(() => navRef.value?.width || '0px');
</script>

<template>
    <MainLayout>
        <template #navigation-drawer>
            <NavigationDrawer ref="navRef" />
        </template>
        <RouterView #="{ Component, route }">
            <Transition
                name="fade"
                mode="out-in"
            >
                <div
                    :key="route.fullPath"
                    class="content-wrapper"
                >
                    <Component
                        :is="Component"
                        v-model="movies"
                    />
                </div>
            </Transition>
        </RouterView>
    </MainLayout>
</template>

<style scoped>
.content-wrapper {
    @apply max-w-full;
    flex: 1 0 auto;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    padding-left: v-bind(paddingLeft);
}
</style>
