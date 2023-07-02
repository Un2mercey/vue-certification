export const ROUTE_URLS = Object.freeze({
    HOME: '/',
    MOVIE: '/movie/:id(\\d+)',
    NOT_FOUND: '/:pathMatch(.*)*',
});

export const ROUTE_NAMES = Object.freeze({
    HOME: 'Home',
    MOVIE: 'Movie',
    NOT_FOUND: 'NotFound',
});
