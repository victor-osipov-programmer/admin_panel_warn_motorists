<template>
    <div class="statistics pa-5">
        <h2 class="statistics__header mb-5 text-grey">Статистика</h2>

        <Card class="mb-8">
            <template #content>
                <div class="d-flex justify-space-between align-center">
                    <DatePicker dateFormat="dd.mm.yy" v-on:today-click="todayClick" selectionMode="range" v-model="date_range"
                        :max-date="max_date">
                        <template #footer>
                            <div class="d-flex justify-space-between pt-1">
                                <Button severity="secondary" @click="todayClick" text size="small">Сегодня</Button>
                                <Button severity="secondary" @click="clearClick" text size="small">Очистить</Button>
                            </div>
                        </template>
                    </DatePicker>

                    <div class="d-flex ga-3">
                        <Card class="bg-blue">
                            <template #content>
                                <div class="d-flex ga-5">
                                    <div>
                                        <div>Общий доход</div>
                                        <div class="total-earnings">{{ total_earnings }}</div>
                                    </div>

                                    <i class="symbol pi pi-dollar"></i>
                                </div>
                            </template>
                        </Card>

                        <Card class="bg-red">
                            <template #content>
                                <div class="d-flex ga-5">
                                    <div>
                                        <div>Всего купленных подписок</div>
                                        <div class="total-earnings">{{ total_count }}</div>
                                    </div>

                                    <i class="symbol pi pi-credit-card"></i>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>
        </Card>

        <div class="charts d-flex ga-5">
            <Card class="chart">
                <template #content>
                    <Chart type="bar" :data="total_earnings_data" />
                </template>
            </Card>

            <Card class="chart">
                <template #content>
                    <Chart type="bar" :data="count_subscribers_data" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { http } from "@/shared/api";
import { dateToString } from "@/shared/libs";
import { ref, computed, watchEffect } from "vue";
import type { IFetchStatistics, IStatistic } from "../types";
import { useStatisticsGenerator } from "../libs";

const date = new Date();
const max_offset_date = ref(30)
date.setDate(date.getDate() - 9)

const date_range = ref([date, new Date()])

function todayClick() {
    // @ts-ignore
    date_range.value = [new Date(), null]
}
function clearClick() {
    // @ts-ignore
    date_range.value = null
}

const statistics = ref<IStatistic[]>([])
const total_earnings = ref<number>(0)
const total_count = ref<number>(0)

watchEffect(async () => {
    if (date_range.value && date_range.value[0] && date_range.value[1]) {
        const params = new URLSearchParams()
        params.append('start_date', dateToString(date_range.value[0]))
        params.append('end_date', dateToString(date_range.value[1]))

        const { data } = await http.get<IFetchStatistics>('/admin/stats', { params })

        statistics.value = data.daily_stats;
        total_earnings.value = data.total_earnings;
        total_count.value = data.total_count;
    }
})

const max_date = computed(() => {
    if (date_range.value && date_range.value[0]) {
        const min_date = new Date(date_range.value[0])
        min_date.setDate(new Date(min_date).getDate() + max_offset_date.value)

        return new Date(Math.min(+min_date, +new Date()));
    } else {
        return new Date();
    }
})

const statisticsGenerator = useStatisticsGenerator(statistics)

const total_earnings_data = computed(() => statisticsGenerator('Доход', 'total_earnings'))
const count_subscribers_data = computed(() => statisticsGenerator('Количество купленных подписок', 'count'))
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
}

.total-earnings {
    font-size: 2rem;
    line-height: 1.2;
}
.symbol {
    font-size: 2rem;
}
</style>