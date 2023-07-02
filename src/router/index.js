import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES, ROUTE_URLS } from '@/utils';

/**
 * Type defs from 'vue-router'
 *
 * @typedef {import("vue-router").RouteRecordRaw} RouteRecordRaw
 * @typedef {import("vue-router").RouteComponent} RouteComponent
 */

/**
 * Async component
 *
 * @type {() => Promise<RouteComponent>}
 */
const HomePage = () => import('@/pages/MoviesPage.vue');

/**
 * Async component
 *
 * @type {() => Promise<RouteComponent>}
 */
const MoviePage = () => import('@/pages/MoviePage.vue');

/**
 * Initializing the routes
 *
 *
 * @type {Readonly<RouteRecordRaw[]>}
 *
 * Readonly array of {@link RouteRecordRaw}
 */
const routes = Object.freeze([
    {
        path: ROUTE_URLS.HOME,
        name: ROUTE_NAMES.HOME,
        component: HomePage,
    },
    {
        path: ROUTE_URLS.MOVIE,
        name: ROUTE_NAMES.MOVIE,
        component: MoviePage,
    },
    {
        path: ROUTE_URLS.NOT_FOUND,
        name: ROUTE_NAMES.NOT_FOUND,
        redirect: () => ROUTE_URLS.HOME,
    },
]);

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

export default router;
