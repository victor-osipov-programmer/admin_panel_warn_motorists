<template>
    <div class="statistics pa-5">
        <div class="d-flex justify-center mb-8">
            <DatePicker inline v-on:today-click="todayClick"  selectionMode="range" v-model="date_range"
                :max-date="max_date">
                <template #footer>
                    <div class="d-flex justify-space-between pt-1">
                        <Button severity="secondary" @click="todayClick" text size="small">Сегодня</Button>
                        <Button severity="secondary" @click="clearClick" text size="small">Очистить</Button>
                    </div>
                </template>
            </DatePicker>
        </div>

        <Card class="mb-8">
            <template #content>
                <Chart type="line" :data="total_earnings" />
            </template>
        </Card>

        <Card>
            <template #content>
                <Chart type="line" :data="count_subscribers" />
            </template>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const date = new Date();
const max_offset_date = ref(30)
date.setDate(date.getDate() - max_offset_date.value)

const date_range = ref([date, new Date()])

function todayClick() {
    // @ts-ignore
    date_range.value = [new Date(), null]
}
function clearClick() {
    // @ts-ignore
    date_range.value = null
}

interface IStatistic {
    date: string,
    count: number,
    total_earnings: number
}
const statistics = ref < IStatistic[] > ([
    {
        date: new Date().toDateString(),
        count: 2,
        total_earnings: 200
    },
    {
        date: new Date().toDateString(),
        count: 5,
        total_earnings: 500
    },
    {
        date: new Date().toDateString(),
        count: 3,
        total_earnings: 300
    },
    {
        date: new Date().toDateString(),
        count: 1,
        total_earnings: 100
    },
    {
        date: new Date().toDateString(),
        count: 6,
        total_earnings: 600
    },
])

const max_date = computed(() => {
    if (date_range.value && date_range.value[0]) {
        const min_date = new Date(date_range.value[0])
        min_date.setDate(new Date(min_date).getDate() + max_offset_date.value)

        return new Date(Math.min(+min_date, +new Date()));
    } else {
        return new Date();
    }
})

const total_earnings = computed(() => {
    const label = 'Доход'
    const labels: string[] = []
    const data: number[] = []

    statistics.value.forEach(el => {
        labels.push(new Date(el.date).toLocaleDateString())
        data.push(el.total_earnings)
    })

    return {
        labels,
        datasets: [
            {
                label,
                data,
            }
        ]
    }
})

const count_subscribers = computed(() => {
    const label = 'Количество подписок'
    const labels: string[] = []
    const data: number[] = []

    statistics.value.forEach(el => {
        labels.push(new Date(el.date).toLocaleDateString())
        data.push(el.count)
    })

    return {
        labels,
        datasets: [
            {
                label,
                data,
            }
        ]
    }
})
</script>

<style lang="scss" scoped></style>