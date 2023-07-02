<template>
    <div class="main-layout">
        <slot />
    </div>
</template>

<style scoped>
.main-layout {
    @apply block p-0 m-0;

    width: inherit;
    height: inherit;
    overflow: hidden;
}
</style>
