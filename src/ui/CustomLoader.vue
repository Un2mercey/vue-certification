<template>
    <Teleport to="#overlay-container">
        <div
            id="loader"
            aria-modal="true"
            class="overlay"
        >
            <div class="overlay-scrim" />
            <div class="overlay-content">
                <div class="loader">
                    <div />
                    <div />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.loader {
    @apply inline-block relative;
    width: 160px;
    height: 160px;
}

.loader div {
    @apply absolute opacity-100;
    border: 4px solid rgb(6, 182, 212);
    border-radius: 50%;
    animation: loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.loader div:nth-child(2) {
    animation-delay: -0.5s;
}

@keyframes loader {
    0% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 0;
    }
    4.9% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 0;
    }
    5% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0;
        left: 0;
        width: 144px;
        height: 144px;
        opacity: 0;
    }
}

.overlay-content {
    background-color: unset;
}
</style>
