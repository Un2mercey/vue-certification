export const ROUTE_URLS = Object.freeze({
    HOME: '/',
    MOVIE: '/movie/:id(^0\\d+)',
    NEW_YEAR_COUNTDOWN: '/new-year-countdown',
    NOT_FOUND: '/:pathMatch(.*)*',
});

export const ROUTE_NAMES = Object.freeze({
    HOME: 'Home',
    MOVIE: 'Movie',
    NEW_YEAR_COUNTDOWN: 'NewYearCountdown',
    NOT_FOUND: 'NotFound',
});
