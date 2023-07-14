<script setup>
import ComponentLayout from '@/components/layout/ComponentLayout.vue';
import CountdownHeader from '@/components/new-year-countdown/CountdownHeader.vue';
import CountdownSegment from '@/components/new-year-countdown/CountdownSegment.vue';
</script>

<template>
    <ComponentLayout>
        <div class="countdown-box">
            <CountdownHeader />
            <div class="flex justify-center">
                <CountdownSegment
                    data-test="days"
                    label="days"
                    number="0"
                />
                <CountdownSegment
                    data-test="hours"
                    label="hours"
                    number="0"
                />
                <CountdownSegment
                    data-test="minutes"
                    label="minutes"
                    number="0"
                />
                <CountdownSegment
                    data-test="seconds"
                    label="seconds"
                    number="0"
                />
            </div>
        </div>
    </ComponentLayout>
</template>

<style scoped>
.countdown-box {
    @apply shadow-md relative bg-white p-5 rounded-lg border-gray-100 border-[1px];
}
</style>
