<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
</script>

<template>
    <MainLayout>
        <RouterView #="{ Component, route }">
            <Transition name="fade">
                <Component
                    :is="Component"
                    :key="route.fullPath"
                />
            </Transition>
        </RouterView>
    </MainLayout>
</template>
