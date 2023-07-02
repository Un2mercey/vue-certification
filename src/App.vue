<script setup>
import { items } from '@/mocks/movies.json';
import { ref } from 'vue';
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
</script>

<template>
    <MainLayout>
        <RouterView #="{ Component, route }">
            <Transition name="fade">
                <Component
                    :is="Component"
                    :key="route.fullPath"
                    v-model="movies"
                />
            </Transition>
        </RouterView>
    </MainLayout>
</template>
