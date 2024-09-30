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
                                        <div class="total-earnings">{{ total_buys }}</div>
                                    </div>

                                    <img class="rub-icon" src="@/shared/svg/rub.svg" alt="rub">
                                </div>
                            </template>
                        </Card>

                        <Card class="bg-red">
                            <template #content>
                                <div class="d-flex ga-5">
                                    <div>
                                        <div>Новые пользователи</div>
                                        <div class="total-earnings">{{ total_users }}</div>
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
                    <Chart type="bar" :data="buys_data" />
                </template>
            </Card>

            <Card class="chart">
                <template #content>
                    <Chart type="bar" :data="new_users_data" />
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
import { statisticsGenerator } from "../libs";

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

const buys = ref<IStatistic[]>([])
const new_users = ref<IStatistic[]>([])
// const statistics = ref<IStatistic[]>([])
const total_buys = ref<number>(0)
const total_users = ref<number>(0)

watchEffect(async () => {
    if (date_range.value && date_range.value[0] && date_range.value[1]) {
        const params = new URLSearchParams()
        params.append('from', dateToString(date_range.value[0]))
        params.append('to', dateToString(date_range.value[1]))

        const { data } = await http.get<IFetchStatistics>('/admin/stats', { params })

        buys.value = data.buys ?? [];
        new_users.value = data.new_users ?? [];
        total_buys.value = data.total_buys;
        total_users.value = data.total_users;
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

// const statisticsGenerator = useStatisticsGenerator(statistics)


const buys_data = computed(() => statisticsGenerator('Покупки', buys))
const new_users_data = computed(() => statisticsGenerator('Пользователи', new_users))
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
.rub-icon {
    height: 28px;
}
</style>