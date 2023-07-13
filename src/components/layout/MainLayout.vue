<template>
    <div class="main">
        <slot name="navigation-drawer" />
        <slot />
    </div>
</template>

<style scoped>
.main {
    @apply p-0 m-0 flex flex-col max-w-full min-h-screen relative;
    backface-visibility: hidden;
    flex: 1 1 auto;
}
</style>
